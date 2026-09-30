/* ── MongoDB In-Memory Engine ────────────────────────────────────────────────
   Simulates MongoDB shell-style queries against in-memory JSON collections.
   No real database or network required — runs entirely in the browser.
   ──────────────────────────────────────────────────────────────────────────── */

/* ── Utilities ────────────────────────────────────────────────────────────── */

function deepClone(val) {
  if (val === null || typeof val !== 'object') return val;
  if (Array.isArray(val)) return val.map(deepClone);
  const out = {};
  for (const k of Object.keys(val)) out[k] = deepClone(val[k]);
  return out;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function attachPreview(result, preview) {
  Object.defineProperty(result, '_preview', {
    value: preview,
    enumerable: false,
    configurable: true,
  });
  return result;
}

function getNestedValue(doc, path) {
  const parts = path.split('.');
  let cur = doc;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[p];
  }
  return cur;
}

function setNestedValue(doc, path, value) {
  const parts = path.split('.');
  let cur = doc;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] === undefined || cur[parts[i]] === null || typeof cur[parts[i]] !== 'object') {
      cur[parts[i]] = {};
    }
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function deleteNestedValue(doc, path) {
  const parts = path.split('.');
  let cur = doc;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur || typeof cur !== 'object') return;
    cur = cur[parts[i]];
  }
  if (cur && typeof cur === 'object') delete cur[parts[parts.length - 1]];
}

let _idCounter = 1000;
function generateId() { return ++_idCounter; }

/* ── Filter Matching ──────────────────────────────────────────────────────── */

function matchesCondition(docVal, cond) {
  if (cond === null || typeof cond !== 'object' || Array.isArray(cond)) {
    if (Array.isArray(docVal)) return docVal.includes(cond);
    return docVal === cond;
  }
  const keys = Object.keys(cond);
  const isOperator = keys.every(k => k.startsWith('$'));
  if (!isOperator) {
    if (Array.isArray(docVal)) return docVal.includes(cond);
    return JSON.stringify(docVal) === JSON.stringify(cond);
  }
  for (const op of keys) {
    const opVal = cond[op];
    switch (op) {
      case '$eq':  { const match = Array.isArray(docVal) ? docVal.includes(opVal) : docVal === opVal; if (!match) return false; break; }
      case '$ne':  { const match = Array.isArray(docVal) ? !docVal.includes(opVal) : docVal !== opVal; if (!match) return false; break; }
      case '$gt':  if (!(docVal > opVal)) return false; break;
      case '$gte': if (!(docVal >= opVal)) return false; break;
      case '$lt':  if (!(docVal < opVal)) return false; break;
      case '$lte': if (!(docVal <= opVal)) return false; break;
      case '$in': {
        if (!Array.isArray(opVal)) return false;
        const found = Array.isArray(docVal)
          ? docVal.some(v => opVal.includes(v))
          : opVal.includes(docVal);
        if (!found) return false;
        break;
      }
      case '$nin': {
        if (!Array.isArray(opVal)) return false;
        const found = Array.isArray(docVal)
          ? docVal.some(v => opVal.includes(v))
          : opVal.includes(docVal);
        if (found) return false;
        break;
      }
      case '$exists': {
        const exists = docVal !== undefined;
        if (opVal && !exists) return false;
        if (!opVal && exists) return false;
        break;
      }
      case '$regex': {
        const flags = cond['$options'] || '';
        const rx = opVal instanceof RegExp ? opVal : new RegExp(opVal, flags);
        if (!rx.test(String(docVal === undefined ? '' : docVal))) return false;
        break;
      }
      case '$options': break; // handled with $regex
      case '$size': {
        if (!Array.isArray(docVal)) return false;
        if (docVal.length !== opVal) return false;
        break;
      }
      case '$all': {
        if (!Array.isArray(docVal) || !Array.isArray(opVal)) return false;
        if (!opVal.every(v => docVal.includes(v))) return false;
        break;
      }
      case '$elemMatch': {
        if (!Array.isArray(docVal)) return false;
        if (!docVal.some(elem => matchesFilter(elem, opVal))) return false;
        break;
      }
      case '$not': {
        if (matchesCondition(docVal, opVal)) return false;
        break;
      }
      default: break;
    }
  }
  return true;
}

function matchesFilter(doc, filter) {
  if (!filter || typeof filter !== 'object') return true;
  for (const key of Object.keys(filter)) {
    const val = filter[key];
    if (key === '$and') {
      if (!Array.isArray(val)) return false;
      if (!val.every(f => matchesFilter(doc, f))) return false;
    } else if (key === '$or') {
      if (!Array.isArray(val)) return false;
      if (!val.some(f => matchesFilter(doc, f))) return false;
    } else if (key === '$nor') {
      if (!Array.isArray(val)) return false;
      if (val.some(f => matchesFilter(doc, f))) return false;
    } else {
      const docVal = getNestedValue(doc, key);
      if (!matchesCondition(docVal, val)) return false;
    }
  }
  return true;
}

/* ── Projection ───────────────────────────────────────────────────────────── */

function applyProjection(doc, projection) {
  if (!projection || Object.keys(projection).length === 0) return deepClone(doc);
  const keys = Object.keys(projection).filter(k => k !== '_id');
  if (keys.length === 0) {
    // Only _id modification
    const clone = deepClone(doc);
    if (projection['_id'] === 0) delete clone._id;
    return clone;
  }
  const firstVal = projection[keys[0]];
  const isInclusion = firstVal === 1 || firstVal === true;
  const clone = deepClone(doc);
  if (isInclusion) {
    const out = {};
    if (projection['_id'] !== 0) out._id = clone._id;
    for (const k of keys) {
      if (projection[k]) {
        const v = getNestedValue(clone, k);
        if (v !== undefined) setNestedValue(out, k, v);
      }
    }
    return out;
  } else {
    // exclusion
    if (projection['_id'] === 0) delete clone._id;
    for (const k of keys) {
      if (!projection[k]) deleteNestedValue(clone, k);
    }
    return clone;
  }
}

/* ── Sort comparator ──────────────────────────────────────────────────────── */

function makeComparator(sortSpec) {
  const entries = Object.entries(sortSpec);
  return (a, b) => {
    for (const [field, dir] of entries) {
      const av = getNestedValue(a, field);
      const bv = getNestedValue(b, field);
      if (av === bv) continue;
      if (av === undefined || av === null) return dir;
      if (bv === undefined || bv === null) return -dir;
      if (typeof av === 'string' && typeof bv === 'string') {
        const cmp = av.localeCompare(bv);
        if (cmp !== 0) return cmp * dir;
      } else {
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
      }
    }
    return 0;
  };
}

/* ── MongoCursor ──────────────────────────────────────────────────────────── */

class MongoCursor {
  constructor(docs) {
    this._docs = docs;
    this._sortSpec = null;
    this._limitN = null;
    this._skipN = 0;
    this._projection = null;
  }

  sort(spec) {
    this._sortSpec = spec;
    return this;
  }

  limit(n) {
    this._limitN = n;
    return this;
  }

  skip(n) {
    this._skipN = n;
    return this;
  }

  project(proj) {
    this._projection = proj;
    return this;
  }

  toArray() {
    let docs = this._docs.slice();
    if (this._sortSpec) docs = docs.sort(makeComparator(this._sortSpec));
    docs = docs.slice(this._skipN);
    if (this._limitN !== null) docs = docs.slice(0, this._limitN);
    if (this._projection) docs = docs.map(d => applyProjection(d, this._projection));
    return docs;
  }

  count() {
    return this.toArray().length;
  }

  // Make cursor serializable — calling JSON.stringify on a cursor will render toArray()
  toJSON() { return this.toArray(); }
}

/* ── Update operators ─────────────────────────────────────────────────────── */

function applyUpdate(doc, update) {
  const ops = Object.keys(update).filter(k => k.startsWith('$'));
  if (ops.length === 0) {
    throw new Error('MongoDB update documents must use update operators like $set, $inc, or $push. Use replaceOne() to replace an entire document.');
  }
  for (const op of ops) {
    const fields = update[op];
    switch (op) {
      case '$set':
        for (const [k, v] of Object.entries(fields)) setNestedValue(doc, k, deepClone(v));
        break;
      case '$unset':
        for (const k of Object.keys(fields)) deleteNestedValue(doc, k);
        break;
      case '$inc':
        for (const [k, v] of Object.entries(fields)) {
          const cur = getNestedValue(doc, k) || 0;
          setNestedValue(doc, k, cur + v);
        }
        break;
      case '$mul':
        for (const [k, v] of Object.entries(fields)) {
          const cur = getNestedValue(doc, k) || 0;
          setNestedValue(doc, k, cur * v);
        }
        break;
      case '$push':
        for (const [k, v] of Object.entries(fields)) {
          let arr = getNestedValue(doc, k);
          if (!Array.isArray(arr)) arr = [];
          arr.push(deepClone(v));
          setNestedValue(doc, k, arr);
        }
        break;
      case '$pull':
        for (const [k, v] of Object.entries(fields)) {
          let arr = getNestedValue(doc, k);
          if (!Array.isArray(arr)) break;
          if (typeof v === 'object' && v !== null) {
            const isOperator = Object.keys(v).every(key => key.startsWith('$'));
            arr = arr.filter(item => {
              if (isOperator) return !matchesCondition(item, v);
              if (item && typeof item === 'object') return !matchesFilter(item, v);
              return !deepEqual(item, v);
            });
          } else {
            arr = arr.filter(item => !deepEqual(item, v));
          }
          setNestedValue(doc, k, arr);
        }
        break;
      case '$addToSet':
        for (const [k, v] of Object.entries(fields)) {
          let arr = getNestedValue(doc, k);
          if (!Array.isArray(arr)) arr = [];
          if (!arr.some(item => deepEqual(item, v))) arr.push(deepClone(v));
          setNestedValue(doc, k, arr);
        }
        break;
      case '$pop':
        for (const [k, v] of Object.entries(fields)) {
          let arr = getNestedValue(doc, k);
          if (!Array.isArray(arr)) break;
          if (v === 1) arr.pop();
          else if (v === -1) arr.shift();
          setNestedValue(doc, k, arr);
        }
        break;
      case '$rename':
        for (const [k, newK] of Object.entries(fields)) {
          const v = getNestedValue(doc, k);
          if (v !== undefined) {
            setNestedValue(doc, newK, v);
            deleteNestedValue(doc, k);
          }
        }
        break;
      case '$min':
        for (const [k, v] of Object.entries(fields)) {
          const cur = getNestedValue(doc, k);
          if (cur === undefined || v < cur) setNestedValue(doc, k, v);
        }
        break;
      case '$max':
        for (const [k, v] of Object.entries(fields)) {
          const cur = getNestedValue(doc, k);
          if (cur === undefined || v > cur) setNestedValue(doc, k, v);
        }
        break;
      default: break;
    }
  }
}

/* ── Aggregation expression evaluator ────────────────────────────────────── */

function evaluateExpr(expr, doc) {
  if (typeof expr === 'string' && expr.startsWith('$')) {
    return getNestedValue(doc, expr.slice(1));
  }
  if (expr === null || typeof expr !== 'object' || Array.isArray(expr)) {
    return expr;
  }
  const keys = Object.keys(expr);
  if (keys.length === 0) return expr;
  const op = keys[0];
  const args = expr[op];
  switch (op) {
    case '$add': return (Array.isArray(args) ? args : [args]).reduce((s, a) => s + evaluateExpr(a, doc), 0);
    case '$subtract': { const [a, b] = args; return evaluateExpr(a, doc) - evaluateExpr(b, doc); }
    case '$multiply': return (Array.isArray(args) ? args : [args]).reduce((s, a) => s * evaluateExpr(a, doc), 1);
    case '$divide': { const [a, b] = args; const dv = evaluateExpr(b, doc); return dv === 0 ? null : evaluateExpr(a, doc) / dv; }
    case '$concat': return (Array.isArray(args) ? args : [args]).map(a => { const v = evaluateExpr(a, doc); return v === null || v === undefined ? '' : String(v); }).join('');
    case '$toLower': { const v = evaluateExpr(args, doc); return v === null || v === undefined ? '' : String(v).toLowerCase(); }
    case '$toUpper': { const v = evaluateExpr(args, doc); return v === null || v === undefined ? '' : String(v).toUpperCase(); }
    case '$toString': { const v = evaluateExpr(args, doc); return v === null || v === undefined ? '' : String(v); }
    case '$size': { const v = evaluateExpr(args, doc); return Array.isArray(v) ? v.length : null; }
    case '$round': {
      const [valExpr, placeExpr] = Array.isArray(args) ? args : [args, 0];
      const v = evaluateExpr(valExpr, doc);
      const p = placeExpr !== undefined ? evaluateExpr(placeExpr, doc) : 0;
      const factor = Math.pow(10, p || 0);
      return Math.round(v * factor) / factor;
    }
    case '$cond': {
      if (Array.isArray(args)) {
        const [ifExpr, thenExpr, elseExpr] = args;
        return evaluateExpr(ifExpr, doc) ? evaluateExpr(thenExpr, doc) : evaluateExpr(elseExpr, doc);
      }
      return evaluateExpr(args.if, doc) ? evaluateExpr(args.then, doc) : evaluateExpr(args.else, doc);
    }
    default: return expr;
  }
}

/* ── Aggregation pipeline runner ──────────────────────────────────────────── */

function runAggregationStage(docs, stage, context) {
  const op = Object.keys(stage)[0];
  const arg = stage[op];
  switch (op) {
    case '$match':
      return docs.filter(d => matchesFilter(d, arg));

    case '$limit':
      return docs.slice(0, arg);

    case '$skip':
      return docs.slice(arg);

    case '$sort':
      return docs.slice().sort(makeComparator(arg));

    case '$count': {
      const result = {};
      result[arg] = docs.length;
      return [result];
    }

    case '$unwind': {
      const field = typeof arg === 'string' ? arg : arg.path;
      const preserve = typeof arg === 'object' && arg.preserveNullAndEmptyArrays;
      const fieldName = field.startsWith('$') ? field.slice(1) : field;
      const out = [];
      for (const doc of docs) {
        const val = getNestedValue(doc, fieldName);
        if (!Array.isArray(val)) {
          if (preserve || val !== undefined) out.push(deepClone(doc));
          continue;
        }
        if (val.length === 0 && preserve) { out.push(deepClone(doc)); continue; }
        for (const item of val) {
          const clone = deepClone(doc);
          setNestedValue(clone, fieldName, item);
          out.push(clone);
        }
      }
      return out;
    }

    case '$group': {
      const { _id: idExpr, ...accumulators } = arg;
      const groups = new Map();
      for (const doc of docs) {
        const key = idExpr === null ? null : evaluateExpr(idExpr, doc);
        const keyStr = JSON.stringify(key);
        if (!groups.has(keyStr)) groups.set(keyStr, { _id: key, _docs: [] });
        groups.get(keyStr)._docs.push(doc);
      }
      const out = [];
      for (const { _id, _docs } of groups.values()) {
        const result = { _id };
        for (const [field, accExpr] of Object.entries(accumulators)) {
          const accOp = Object.keys(accExpr)[0];
          const accArg = accExpr[accOp];
          switch (accOp) {
            case '$sum': {
              if (typeof accArg === 'number') { result[field] = accArg * _docs.length; }
              else { result[field] = _docs.reduce((s, d) => s + (evaluateExpr(accArg, d) || 0), 0); }
              break;
            }
            case '$avg': {
              const vals = _docs.map(d => evaluateExpr(accArg, d)).filter(v => typeof v === 'number');
              result[field] = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : null;
              break;
            }
            case '$min': {
              const vals = _docs.map(d => evaluateExpr(accArg, d)).filter(v => v !== undefined && v !== null);
              result[field] = vals.length ? vals.reduce((m, v) => v < m ? v : m) : null;
              break;
            }
            case '$max': {
              const vals = _docs.map(d => evaluateExpr(accArg, d)).filter(v => v !== undefined && v !== null);
              result[field] = vals.length ? vals.reduce((m, v) => v > m ? v : m) : null;
              break;
            }
            case '$count': result[field] = _docs.length; break;
            case '$push': result[field] = _docs.map(d => evaluateExpr(accArg, d)); break;
            case '$addToSet': {
              const seen = new Set();
              const arr = [];
              for (const d of _docs) {
                const v = evaluateExpr(accArg, d);
                const vk = JSON.stringify(v);
                if (!seen.has(vk)) { seen.add(vk); arr.push(v); }
              }
              result[field] = arr;
              break;
            }
            case '$first': result[field] = _docs.length ? evaluateExpr(accArg, _docs[0]) : null; break;
            case '$last':  result[field] = _docs.length ? evaluateExpr(accArg, _docs[_docs.length - 1]) : null; break;
            default: result[field] = null;
          }
        }
        out.push(result);
      }
      return out;
    }

    case '$project': {
      return docs.map(doc => {
        const keys = Object.keys(arg);
        const inclKeys = keys.filter(k => k !== '_id' && (arg[k] === 1 || arg[k] === true || (arg[k] !== 0 && arg[k] !== false && typeof arg[k] === 'object')));
        const exclKeys = keys.filter(k => k !== '_id' && (arg[k] === 0 || arg[k] === false));
        const isInclusion = inclKeys.length > 0;
        if (isInclusion) {
          const out = {};
          if (arg['_id'] !== 0) out._id = doc._id;
          for (const k of inclKeys) {
            const spec = arg[k];
            if (spec === 1 || spec === true) out[k] = getNestedValue(doc, k);
            else out[k] = evaluateExpr(spec, doc);
          }
          // handle computed fields (neither 0 nor 1)
          for (const k of keys) {
            if (k === '_id') continue;
            if (arg[k] !== 0 && arg[k] !== false && arg[k] !== 1 && arg[k] !== true && typeof arg[k] === 'object') {
              out[k] = evaluateExpr(arg[k], doc);
            }
          }
          return out;
        } else {
          const clone = deepClone(doc);
          if (arg['_id'] === 0) delete clone._id;
          for (const k of exclKeys) deleteNestedValue(clone, k);
          return clone;
        }
      });
    }

    case '$addFields':
    case '$set':
      return docs.map(doc => {
        const clone = deepClone(doc);
        for (const [k, expr] of Object.entries(arg)) {
          setNestedValue(clone, k, evaluateExpr(expr, clone));
        }
        return clone;
      });

    case '$replaceRoot':
    case '$replaceWith': {
      const newRootExpr = op === '$replaceRoot' ? arg.newRoot : arg;
      return docs.map(doc => {
        const val = evaluateExpr(newRootExpr, doc);
        return typeof val === 'object' && val !== null ? deepClone(val) : {};
      });
    }

    case '$lookup': {
      const foreign = context && context[arg.from];
      if (!foreign) throw new Error('$lookup could not find collection "' + arg.from + '".');
      if (!arg.localField || !arg.foreignField || !arg.as) {
        throw new Error('$lookup in this playground supports { from, localField, foreignField, as }.');
      }
      const foreignDocs = foreign._allDocs();
      return docs.map(doc => {
        const localValue = getNestedValue(doc, arg.localField);
        const matches = foreignDocs
          .filter(foreignDoc => {
            const foreignValue = getNestedValue(foreignDoc, arg.foreignField);
            if (Array.isArray(localValue)) return localValue.some(v => deepEqual(v, foreignValue));
            if (Array.isArray(foreignValue)) return foreignValue.some(v => deepEqual(localValue, v));
            return deepEqual(localValue, foreignValue);
          })
          .map(deepClone);
        const clone = deepClone(doc);
        setNestedValue(clone, arg.as, matches);
        return clone;
      });
    }

    default:
      return docs;
  }
}

/* ── MongoCollection ──────────────────────────────────────────────────────── */

class MongoCollection {
  constructor(docs, getCollections) {
    this._docs = docs.map(d => deepClone(d));
    this._getCollections = getCollections;
  }

  _allDocs() {
    return this._docs.map(deepClone);
  }

  find(filter, projection) {
    const matched = this._docs.filter(d => matchesFilter(d, filter || {}));
    const cursor = new MongoCursor(matched);
    if (projection) cursor.project(projection);
    return cursor;
  }

  findOne(filter, projection) {
    const doc = this._docs.find(d => matchesFilter(d, filter || {}));
    if (!doc) return null;
    return projection ? applyProjection(deepClone(doc), projection) : deepClone(doc);
  }

  countDocuments(filter) {
    if (!filter || Object.keys(filter).length === 0) return this._docs.length;
    return this._docs.filter(d => matchesFilter(d, filter)).length;
  }

  distinct(field, filter) {
    const docs = filter ? this._docs.filter(d => matchesFilter(d, filter)) : this._docs;
    const seen = new Set();
    const result = [];
    for (const doc of docs) {
      const val = getNestedValue(doc, field);
      if (Array.isArray(val)) {
        for (const v of val) {
          const k = JSON.stringify(v);
          if (!seen.has(k)) { seen.add(k); result.push(v); }
        }
      } else {
        const k = JSON.stringify(val);
        if (!seen.has(k)) { seen.add(k); result.push(val); }
      }
    }
    return result.sort((a, b) => {
      if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
      if (a < b) return -1; if (a > b) return 1; return 0;
    });
  }

  insertOne(doc) {
    const newDoc = deepClone(doc);
    if (newDoc._id === undefined) newDoc._id = generateId();
    this._docs.push(newDoc);
    return attachPreview(
      { acknowledged: true, insertedId: newDoc._id },
      { inserted: [deepClone(newDoc)] }
    );
  }

  insertMany(docs) {
    const insertedIds = {};
    const inserted = [];
    for (let i = 0; i < docs.length; i++) {
      const newDoc = deepClone(docs[i]);
      if (newDoc._id === undefined) newDoc._id = generateId();
      this._docs.push(newDoc);
      inserted.push(deepClone(newDoc));
      insertedIds[i] = newDoc._id;
    }
    return attachPreview(
      { acknowledged: true, insertedCount: docs.length, insertedIds },
      { inserted }
    );
  }

  updateOne(filter, update) {
    const idx = this._docs.findIndex(d => matchesFilter(d, filter || {}));
    if (idx === -1) return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
    const before = deepClone(this._docs[idx]);
    applyUpdate(this._docs[idx], update);
    const after = deepClone(this._docs[idx]);
    const changed = !deepEqual(before, after);
    return attachPreview(
      { acknowledged: true, matchedCount: 1, modifiedCount: changed ? 1 : 0 },
      { before: [before], after: [after] }
    );
  }

  updateMany(filter, update) {
    const before = [];
    const after = [];
    let matched = 0;
    let modified = 0;
    for (const doc of this._docs) {
      if (matchesFilter(doc, filter || {})) {
        matched++;
        const beforeDoc = deepClone(doc);
        applyUpdate(doc, update);
        const afterDoc = deepClone(doc);
        if (!deepEqual(beforeDoc, afterDoc)) {
          modified++;
          before.push(beforeDoc);
          after.push(afterDoc);
        }
      }
    }
    return attachPreview(
      { acknowledged: true, matchedCount: matched, modifiedCount: modified },
      { before, after }
    );
  }

  replaceOne(filter, replacement) {
    const idx = this._docs.findIndex(d => matchesFilter(d, filter || {}));
    if (idx === -1) return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
    const before = deepClone(this._docs[idx]);
    const id = this._docs[idx]._id;
    const newDoc = deepClone(replacement);
    newDoc._id = id;
    this._docs[idx] = newDoc;
    const after = deepClone(newDoc);
    const changed = !deepEqual(before, after);
    return attachPreview(
      { acknowledged: true, matchedCount: 1, modifiedCount: changed ? 1 : 0 },
      { before: [before], after: [after] }
    );
  }

  deleteOne(filter) {
    const idx = this._docs.findIndex(d => matchesFilter(d, filter || {}));
    if (idx === -1) return { acknowledged: true, deletedCount: 0 };
    const deleted = deepClone(this._docs[idx]);
    this._docs.splice(idx, 1);
    return attachPreview(
      { acknowledged: true, deletedCount: 1 },
      { deleted: [deleted] }
    );
  }

  deleteMany(filter) {
    const deleted = this._docs.filter(d => matchesFilter(d, filter || {})).map(deepClone);
    this._docs = this._docs.filter(d => !matchesFilter(d, filter || {}));
    return attachPreview(
      { acknowledged: true, deletedCount: deleted.length },
      { deleted }
    );
  }

  aggregate(pipeline) {
    let docs = this._docs.map(deepClone);
    const context = this._getCollections ? this._getCollections() : {};
    for (const stage of pipeline) docs = runAggregationStage(docs, stage, context);
    return docs;
  }

  drop() {
    this._docs = [];
    return true;
  }
}

/* ── Sample Data ──────────────────────────────────────────────────────────── */

export const SAMPLE_DATA = {
  employees: [
    { _id: 1, name: 'Alice Chen',    dept: 'Engineering', role: 'Senior Engineer',    salary: 118000, age: 34, city: 'San Francisco', skills: ['JavaScript', 'React', 'Node.js', 'Python'], remote: true,  hiredYear: 2019 },
    { _id: 2, name: 'Bob Martinez',  dept: 'Engineering', role: 'Software Engineer',  salary: 95000,  age: 29, city: 'Austin',         skills: ['Python', 'Django', 'PostgreSQL'],            remote: false, hiredYear: 2021 },
    { _id: 3, name: 'Carol Johnson', dept: 'Design',      role: 'UX Designer',        salary: 88000,  age: 31, city: 'New York',        skills: ['Figma', 'Sketch', 'CSS'],                   remote: true,  hiredYear: 2020 },
    { _id: 4, name: 'David Kim',     dept: 'Engineering', role: 'Staff Engineer',     salary: 130000, age: 38, city: 'Seattle',         skills: ['Go', 'Kubernetes', 'Python', 'Rust'],        remote: true,  hiredYear: 2017 },
    { _id: 5, name: 'Eva Patel',     dept: 'Marketing',   role: 'Marketing Manager',  salary: 76000,  age: 35, city: 'Chicago',         skills: ['SEO', 'Analytics', 'Copywriting'],           remote: false, hiredYear: 2022 },
    { _id: 6, name: 'Frank Lee',     dept: 'Sales',       role: 'Sales Rep',          salary: 62000,  age: 27, city: 'Dallas',          skills: ['CRM', 'Salesforce', 'Negotiation'],          remote: false, hiredYear: 2023 },
    { _id: 7, name: 'Grace Wang',    dept: 'Engineering', role: 'Frontend Engineer',  salary: 98000,  age: 26, city: 'San Francisco',   skills: ['Vue', 'TypeScript', 'CSS', 'JavaScript'],   remote: true,  hiredYear: 2022 },
    { _id: 8, name: 'Henry Brown',   dept: 'Design',      role: 'Graphic Designer',   salary: 72000,  age: 30, city: 'Los Angeles',     skills: ['Photoshop', 'Illustrator', 'Figma'],         remote: false, hiredYear: 2021 },
    { _id: 9, name: 'Iris Davis',    dept: 'Sales',       role: 'Sales Manager',      salary: 84000,  age: 41, city: 'New York',        skills: ['CRM', 'Leadership', 'Negotiation'],          remote: true,  hiredYear: 2018 },
    { _id:10, name: 'Jake Wilson',   dept: 'Marketing',   role: 'Content Strategist', salary: 58000,  age: 24, city: 'Chicago',         skills: ['Copywriting', 'SEO', 'Analytics'],           remote: true,  hiredYear: 2024 },
  ],

  products: [
    { _id: 1, name: 'Wireless Headphones',  category: 'Electronics',  price: 149.99, stock: 85,  rating: 4.6, tags: ['audio', 'wireless', 'noise-cancelling'], brand: 'SoundWave', inStock: true  },
    { _id: 2, name: 'Ergonomic Chair',       category: 'Furniture',    price: 389.00, stock: 22,  rating: 4.8, tags: ['ergonomic', 'office', 'adjustable'],      brand: 'ComfortPro', inStock: true  },
    { _id: 3, name: 'USB-C Hub',             category: 'Electronics',  price: 49.99,  stock: 200, rating: 4.3, tags: ['usb', 'connectivity', 'portable'],        brand: 'TechLink',  inStock: true  },
    { _id: 4, name: 'Standing Desk',         category: 'Furniture',    price: 599.00, stock: 8,   rating: 4.7, tags: ['ergonomic', 'office', 'adjustable'],      brand: 'DeskRise',  inStock: true  },
    { _id: 5, name: 'Mechanical Keyboard',   category: 'Electronics',  price: 119.00, stock: 0,   rating: 4.5, tags: ['mechanical', 'typing', 'backlit'],        brand: 'KeyMaster', inStock: false },
    { _id: 6, name: 'Monitor Arm',           category: 'Accessories',  price: 75.00,  stock: 56,  rating: 4.2, tags: ['ergonomic', 'desk', 'adjustable'],        brand: 'FlexMount', inStock: true  },
    { _id: 7, name: 'Webcam HD',             category: 'Electronics',  price: 89.00,  stock: 44,  rating: 4.1, tags: ['video', 'streaming', 'remote-work'],      brand: 'ClearVision',inStock: true  },
    { _id: 8, name: 'Desk Organizer',        category: 'Accessories',  price: 29.99,  stock: 130, rating: 3.9, tags: ['organization', 'desk', 'office'],          brand: 'NeatDesk',  inStock: true  },
  ],

  orders: [
    { _id: 1,  customerId: 'C001', product: 'Wireless Headphones', qty: 1, total: 149.99, status: 'delivered', date: '2026-01-15', city: 'New York'      },
    { _id: 2,  customerId: 'C002', product: 'Ergonomic Chair',      qty: 1, total: 389.00, status: 'delivered', date: '2026-01-18', city: 'San Francisco' },
    { _id: 3,  customerId: 'C001', product: 'USB-C Hub',            qty: 2, total: 99.98,  status: 'shipped',   date: '2026-02-03', city: 'New York'      },
    { _id: 4,  customerId: 'C003', product: 'Standing Desk',        qty: 1, total: 599.00, status: 'pending',   date: '2026-02-10', city: 'Chicago'       },
    { _id: 5,  customerId: 'C004', product: 'Mechanical Keyboard',  qty: 1, total: 119.00, status: 'cancelled', date: '2026-02-14', city: 'Austin'        },
    { _id: 6,  customerId: 'C002', product: 'Monitor Arm',          qty: 2, total: 150.00, status: 'delivered', date: '2026-02-20', city: 'San Francisco' },
    { _id: 7,  customerId: 'C005', product: 'Webcam HD',            qty: 1, total: 89.00,  status: 'delivered', date: '2026-03-01', city: 'Seattle'       },
    { _id: 8,  customerId: 'C003', product: 'Wireless Headphones',  qty: 2, total: 299.98, status: 'shipped',   date: '2026-03-05', city: 'Chicago'       },
    { _id: 9,  customerId: 'C006', product: 'Desk Organizer',       qty: 3, total: 89.97,  status: 'delivered', date: '2026-03-12', city: 'Dallas'        },
    { _id: 10, customerId: 'C004', product: 'Ergonomic Chair',      qty: 1, total: 389.00, status: 'pending',   date: '2026-03-18', city: 'Austin'        },
    { _id: 11, customerId: 'C007', product: 'USB-C Hub',            qty: 1, total: 49.99,  status: 'delivered', date: '2026-04-02', city: 'Los Angeles'   },
    { _id: 12, customerId: 'C005', product: 'Standing Desk',        qty: 1, total: 599.00, status: 'shipped',   date: '2026-04-08', city: 'Seattle'       },
  ],

  reviews: [
    { _id: 1, productId: 1, customerId: 'C001', rating: 5, comment: 'Amazing sound quality, very comfortable.',      verified: true,  date: '2026-01-20', helpful: 24 },
    { _id: 2, productId: 2, customerId: 'C002', rating: 5, comment: 'Best chair I have ever owned. Worth every cent.',verified: true,  date: '2026-01-25', helpful: 41 },
    { _id: 3, productId: 3, customerId: 'C001', rating: 4, comment: 'Works well with my MacBook. Compact and reliable.',verified: true, date: '2026-02-08', helpful: 12 },
    { _id: 4, productId: 5, customerId: 'C004', rating: 3, comment: 'Nice keyboard but too loud for office use.',      verified: true,  date: '2026-02-18', helpful: 8  },
    { _id: 5, productId: 4, customerId: 'C003', rating: 5, comment: 'Standing desk changed my workday completely.',    verified: false, date: '2026-02-22', helpful: 19 },
    { _id: 6, productId: 7, customerId: 'C005', rating: 4, comment: 'Clear video, easy setup. Happy with it.',         verified: true,  date: '2026-03-05', helpful: 7  },
    { _id: 7, productId: 8, customerId: 'C006', rating: 2, comment: 'Flimsy material, does not hold much.',            verified: true,  date: '2026-03-15', helpful: 3  },
    { _id: 8, productId: 1, customerId: 'C007', rating: 4, comment: 'Good noise cancelling but battery could be better.',verified: true,date: '2026-03-20', helpful: 15 },
  ],
};

/* ── createDatabase ───────────────────────────────────────────────────────── */

export function createDatabase() {
  const collections = {};
  const getCollections = () => collections;

  collections.employees = new MongoCollection(SAMPLE_DATA.employees, getCollections);
  collections.products = new MongoCollection(SAMPLE_DATA.products, getCollections);
  collections.orders = new MongoCollection(SAMPLE_DATA.orders, getCollections);
  collections.reviews = new MongoCollection(SAMPLE_DATA.reviews, getCollections);

  return {
    ...collections,
    getCollectionNames() { return Object.keys(collections); },
  };
}
