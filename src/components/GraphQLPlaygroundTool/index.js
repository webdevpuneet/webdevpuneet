'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

const LS_LESSON = 'fwd-graphql-playground-lesson';
const ACCENT = '#E10098';

/* ── Tokenizer ──────────────────────────────────────────────────────────── */
const TT = {
  BRACE_OPEN: 'BRACE_OPEN', BRACE_CLOSE: 'BRACE_CLOSE',
  PAREN_OPEN: 'PAREN_OPEN', PAREN_CLOSE: 'PAREN_CLOSE',
  BRACKET_OPEN: 'BRACKET_OPEN', BRACKET_CLOSE: 'BRACKET_CLOSE',
  COLON: 'COLON', DOLLAR: 'DOLLAR', BANG: 'BANG', ELLIPSIS: 'ELLIPSIS',
  AT: 'AT', EQUALS: 'EQUALS', PIPE: 'PIPE',
  NAME: 'NAME', STRING: 'STRING', INT: 'INT', FLOAT: 'FLOAT',
  BOOL: 'BOOL', NULL: 'NULL', EOF: 'EOF',
};

function tokenize(src) {
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    // skip whitespace + commas
    if (/[\s,]/.test(src[i])) { i++; continue; }
    // skip comments
    if (src[i] === '#') { while (i < src.length && src[i] !== '\n') i++; continue; }
    const c = src[i];
    if (c === '{') { tokens.push({ type: TT.BRACE_OPEN }); i++; continue; }
    if (c === '}') { tokens.push({ type: TT.BRACE_CLOSE }); i++; continue; }
    if (c === '(') { tokens.push({ type: TT.PAREN_OPEN }); i++; continue; }
    if (c === ')') { tokens.push({ type: TT.PAREN_CLOSE }); i++; continue; }
    if (c === '[') { tokens.push({ type: TT.BRACKET_OPEN }); i++; continue; }
    if (c === ']') { tokens.push({ type: TT.BRACKET_CLOSE }); i++; continue; }
    if (c === ':') { tokens.push({ type: TT.COLON }); i++; continue; }
    if (c === '$') { tokens.push({ type: TT.DOLLAR }); i++; continue; }
    if (c === '!') { tokens.push({ type: TT.BANG }); i++; continue; }
    if (c === '@') { tokens.push({ type: TT.AT }); i++; continue; }
    if (c === '=') { tokens.push({ type: TT.EQUALS }); i++; continue; }
    if (c === '|') { tokens.push({ type: TT.PIPE }); i++; continue; }
    if (src.slice(i, i + 3) === '...') { tokens.push({ type: TT.ELLIPSIS }); i += 3; continue; }
    // block string
    if (src.slice(i, i + 3) === '"""') {
      i += 3;
      let str = '';
      while (i < src.length && src.slice(i, i + 3) !== '"""') { str += src[i++]; }
      i += 3;
      tokens.push({ type: TT.STRING, value: str.trim() });
      continue;
    }
    // regular string
    if (c === '"') {
      i++;
      let str = '';
      while (i < src.length && src[i] !== '"') {
        if (src[i] === '\\') { i++; str += src[i++]; } else { str += src[i++]; }
      }
      i++; // closing "
      tokens.push({ type: TT.STRING, value: str });
      continue;
    }
    // number
    if (c === '-' || /\d/.test(c)) {
      let num = '';
      if (c === '-') { num += src[i++]; }
      while (i < src.length && /\d/.test(src[i])) num += src[i++];
      if (i < src.length && src[i] === '.') {
        num += src[i++];
        while (i < src.length && /\d/.test(src[i])) num += src[i++];
        tokens.push({ type: TT.FLOAT, value: parseFloat(num) });
      } else {
        tokens.push({ type: TT.INT, value: parseInt(num, 10) });
      }
      continue;
    }
    // name / keyword
    if (/[A-Za-z_]/.test(c)) {
      let name = '';
      while (i < src.length && /[A-Za-z_0-9]/.test(src[i])) name += src[i++];
      if (name === 'true' || name === 'false') tokens.push({ type: TT.BOOL, value: name === 'true' });
      else if (name === 'null') tokens.push({ type: TT.NULL });
      else tokens.push({ type: TT.NAME, value: name });
      continue;
    }
    // skip unknown
    i++;
  }
  tokens.push({ type: TT.EOF });
  return tokens;
}

/* ── Parser ─────────────────────────────────────────────────────────────── */
class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }
  peek() { return this.tokens[this.pos]; }
  next() { return this.tokens[this.pos++]; }
  expect(type) {
    const t = this.next();
    if (t.type !== type) throw new Error('Expected ' + type + ' but got ' + t.type + ' (' + JSON.stringify(t.value) + ')');
    return t;
  }
  eat(type) {
    if (this.peek().type === type) { this.next(); return true; }
    return false;
  }

  parseDocument() {
    const operations = [];
    const fragments = {};
    while (this.peek().type !== TT.EOF) {
      if (this.peek().type === TT.NAME && this.peek().value === 'fragment') {
        const frag = this.parseFragment();
        fragments[frag.name] = frag;
      } else {
        operations.push(this.parseOperation());
      }
    }
    return { operations, fragments };
  }

  parseOperation() {
    let opType = 'query';
    let name = null;
    const variables = [];
    if (this.peek().type === TT.NAME && ['query', 'mutation', 'subscription'].includes(this.peek().value)) {
      opType = this.next().value;
      if (this.peek().type === TT.NAME) name = this.next().value;
      if (this.peek().type === TT.PAREN_OPEN) {
        this.next();
        while (this.peek().type !== TT.PAREN_CLOSE) {
          variables.push(this.parseVarDef());
        }
        this.next();
      }
    }
    const selectionSet = this.parseSelectionSet();
    return { type: opType, name, variables, selectionSet };
  }

  parseVarDef() {
    this.expect(TT.DOLLAR);
    const name = this.expect(TT.NAME).value;
    this.expect(TT.COLON);
    const { typeName, required, isList } = this.parseTypeRef();
    let defaultValue = undefined;
    if (this.eat(TT.EQUALS)) defaultValue = this.parseValue(true);
    return { name, typeName, required, isList, defaultValue };
  }

  parseTypeRef() {
    let isList = false;
    if (this.peek().type === TT.BRACKET_OPEN) {
      isList = true;
      this.next();
      const inner = this.parseTypeRef();
      this.expect(TT.BRACKET_CLOSE);
      const required = this.eat(TT.BANG);
      return { typeName: inner.typeName, required, isList };
    }
    const typeName = this.expect(TT.NAME).value;
    const required = this.eat(TT.BANG);
    return { typeName, required, isList };
  }

  parseSelectionSet() {
    this.expect(TT.BRACE_OPEN);
    const selections = [];
    while (this.peek().type !== TT.BRACE_CLOSE) {
      selections.push(this.parseSelection());
    }
    this.expect(TT.BRACE_CLOSE);
    return selections;
  }

  parseSelection() {
    // inline fragment or spread
    if (this.peek().type === TT.ELLIPSIS) {
      this.next();
      // inline fragment: ... on TypeName { }
      if (this.peek().type === TT.NAME && this.peek().value === 'on') {
        this.next();
        const onType = this.expect(TT.NAME).value;
        const selectionSet = this.parseSelectionSet();
        return { kind: 'inlineFragment', onType, selectionSet };
      }
      // named fragment spread: ...FragmentName
      const fragName = this.expect(TT.NAME).value;
      return { kind: 'fragmentSpread', name: fragName };
    }
    // field (possibly aliased)
    let alias = null;
    let name = this.expect(TT.NAME).value;
    if (this.peek().type === TT.COLON) {
      this.next();
      alias = name;
      name = this.expect(TT.NAME).value;
    }
    // arguments
    const args = {};
    if (this.peek().type === TT.PAREN_OPEN) {
      this.next();
      while (this.peek().type !== TT.PAREN_CLOSE) {
        const key = this.expect(TT.NAME).value;
        this.expect(TT.COLON);
        args[key] = this.parseValue(false);
      }
      this.next();
    }
    // directives
    const directives = [];
    while (this.peek().type === TT.AT) {
      this.next();
      const dname = this.expect(TT.NAME).value;
      const dargs = {};
      if (this.peek().type === TT.PAREN_OPEN) {
        this.next();
        while (this.peek().type !== TT.PAREN_CLOSE) {
          const k = this.expect(TT.NAME).value;
          this.expect(TT.COLON);
          dargs[k] = this.parseValue(false);
        }
        this.next();
      }
      directives.push({ name: dname, args: dargs });
    }
    // nested selection set
    let selectionSet = null;
    if (this.peek().type === TT.BRACE_OPEN) {
      selectionSet = this.parseSelectionSet();
    }
    return { kind: 'field', alias, name, args, directives, selectionSet };
  }

  parseValue(isConst) {
    const t = this.peek();
    if (t.type === TT.DOLLAR && !isConst) {
      this.next();
      const name = this.expect(TT.NAME).value;
      return { kind: 'variable', name };
    }
    if (t.type === TT.INT)    { this.next(); return t.value; }
    if (t.type === TT.FLOAT)  { this.next(); return t.value; }
    if (t.type === TT.STRING) { this.next(); return t.value; }
    if (t.type === TT.BOOL)   { this.next(); return t.value; }
    if (t.type === TT.NULL)   { this.next(); return null; }
    if (t.type === TT.NAME)   { this.next(); return t.value; } // enum value
    if (t.type === TT.BRACKET_OPEN) {
      this.next();
      const values = [];
      while (this.peek().type !== TT.BRACKET_CLOSE) values.push(this.parseValue(isConst));
      this.next();
      return { kind: 'list', values };
    }
    if (t.type === TT.BRACE_OPEN) {
      this.next();
      const fields = {};
      while (this.peek().type !== TT.BRACE_CLOSE) {
        const k = this.expect(TT.NAME).value;
        this.expect(TT.COLON);
        fields[k] = this.parseValue(isConst);
      }
      this.next();
      return { kind: 'object', fields };
    }
    throw new Error('Unexpected token in value: ' + t.type + ' ' + JSON.stringify(t.value));
  }

  parseFragment() {
    this.expect(TT.NAME); // 'fragment'
    const name = this.expect(TT.NAME).value;
    this.expect(TT.NAME); // 'on'
    const onType = this.expect(TT.NAME).value;
    const selectionSet = this.parseSelectionSet();
    return { name, onType, selectionSet };
  }
}

/* ── Executor ────────────────────────────────────────────────────────────── */
class GraphQLExecutor {
  constructor(schemaObj, resolvers) {
    this.schemaObj = schemaObj;
    this.resolvers = resolvers;
  }

  execute(queryString, variables = {}) {
    let doc;
    try {
      const tokens = tokenize(queryString);
      const parser = new Parser(tokens);
      doc = parser.parseDocument();
    } catch (e) {
      return { errors: [{ message: 'Parse error: ' + e.message }] };
    }

    if (doc.operations.length === 0) return { errors: [{ message: 'No operations found' }] };

    const operation = doc.operations[0];
    const fragments = doc.fragments;

    // resolve variable defaults
    const resolvedVars = { ...variables };
    for (const varDef of (operation.variables || [])) {
      if (!(varDef.name in resolvedVars) && varDef.defaultValue !== undefined) {
        resolvedVars[varDef.name] = this._resolveValue(varDef.defaultValue, resolvedVars);
      }
    }

    try {
      const rootType = operation.type === 'mutation' ? 'Mutation' : operation.type === 'subscription' ? 'Subscription' : 'Query';
      const data = this._executeSelectionSet(operation.selectionSet, rootType, null, resolvedVars, fragments);
      return { data };
    } catch (e) {
      return { errors: [{ message: e.message }] };
    }
  }

  _resolveValue(value, variables) {
    if (value === null || value === undefined) return value;
    if (typeof value !== 'object') return value;
    if (value.kind === 'variable') return variables[value.name];
    if (value.kind === 'list') return value.values.map(v => this._resolveValue(v, variables));
    if (value.kind === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(value.fields)) out[k] = this._resolveValue(v, variables);
      return out;
    }
    return value;
  }

  _resolveArgs(args, variables) {
    const out = {};
    for (const [k, v] of Object.entries(args)) out[k] = this._resolveValue(v, variables);
    return out;
  }

  _checkDirectives(directives, variables) {
    for (const dir of (directives || [])) {
      const args = this._resolveArgs(dir.args, variables);
      if (dir.name === 'skip' && args.if === true) return false;
      if (dir.name === 'include' && args.if === false) return false;
    }
    return true;
  }

  _expandFragments(selections, fragments) {
    const expanded = [];
    for (const sel of selections) {
      if (sel.kind === 'fragmentSpread') {
        const frag = fragments[sel.name];
        if (frag) expanded.push(...this._expandFragments(frag.selectionSet, fragments));
      } else {
        expanded.push(sel);
      }
    }
    return expanded;
  }

  _executeSelectionSet(selectionSet, typeName, parent, variables, fragments) {
    const expanded = this._expandFragments(selectionSet, fragments);
    const result = {};

    for (const sel of expanded) {
      if (sel.kind === 'fragmentSpread') continue;

      if (sel.kind === 'inlineFragment') {
        // apply if parent's __typename matches
        const parentTypeName = parent && parent.__typename;
        if (!parentTypeName || parentTypeName === sel.onType) {
          const subResult = this._executeSelectionSet(sel.selectionSet, sel.onType, parent, variables, fragments);
          Object.assign(result, subResult);
        }
        continue;
      }

      // field
      if (!this._checkDirectives(sel.directives, variables)) continue;

      const responseKey = sel.alias || sel.name;
      const fieldName = sel.name;

      // introspection
      if (fieldName === '__schema') {
        result[responseKey] = this._resolveSchema(sel.selectionSet, variables, fragments);
        continue;
      }
      if (fieldName === '__type') {
        const args = this._resolveArgs(sel.args, variables);
        result[responseKey] = this._resolveType(args.name, sel.selectionSet, variables, fragments);
        continue;
      }
      if (fieldName === '__typename') {
        result[responseKey] = typeName;
        continue;
      }

      // resolve the field
      const resolvedArgs = this._resolveArgs(sel.args, variables);
      let fieldValue;

      const typeResolvers = this.resolvers[typeName];
      if (typeResolvers && typeof typeResolvers[fieldName] === 'function') {
        fieldValue = typeResolvers[fieldName](parent, resolvedArgs);
      } else if (parent && fieldName in parent) {
        fieldValue = parent[fieldName];
      } else {
        fieldValue = null;
      }

      if (sel.selectionSet && sel.selectionSet.length > 0) {
        if (Array.isArray(fieldValue)) {
          result[responseKey] = fieldValue.map(item => {
            if (item === null || item === undefined) return null;
            const itemTypeName = item.__typename || this._guessTypeName(typeName, fieldName);
            return this._executeSelectionSet(sel.selectionSet, itemTypeName, item, variables, fragments);
          });
        } else if (fieldValue !== null && fieldValue !== undefined) {
          const nestedTypeName = (fieldValue && fieldValue.__typename) || this._guessTypeName(typeName, fieldName);
          result[responseKey] = this._executeSelectionSet(sel.selectionSet, nestedTypeName, fieldValue, variables, fragments);
        } else {
          result[responseKey] = null;
        }
      } else {
        result[responseKey] = fieldValue;
      }
    }
    return result;
  }

  _guessTypeName(parentType, fieldName) {
    if (!this.schemaObj) return fieldName;
    const fields = this.schemaObj.types && this.schemaObj.types[parentType];
    if (fields && fields[fieldName]) {
      const t = fields[fieldName];
      return t.replace(/[\[\]!]/g, '');
    }
    // check all resolver keys
    for (const key of Object.keys(this.resolvers)) {
      if (key !== 'Query' && key !== 'Mutation' && key !== 'Subscription') {
        const r = this.resolvers[key];
        if (r && typeof r[fieldName] === 'function') return key;
      }
    }
    return fieldName;
  }

  _resolveSchema(selectionSet, variables, fragments) {
    if (!this.schemaObj) return null;
    const expanded = this._expandFragments(selectionSet || [], fragments);
    const result = {};
    for (const sel of expanded) {
      if (sel.kind !== 'field') continue;
      const key = sel.alias || sel.name;
      if (sel.name === 'queryType') result[key] = { name: this.schemaObj.queryType || 'Query' };
      else if (sel.name === 'mutationType') result[key] = this.schemaObj.mutationType ? { name: this.schemaObj.mutationType } : null;
      else if (sel.name === 'subscriptionType') result[key] = null;
      else if (sel.name === 'types') {
        const builtins = ['String', 'Int', 'Float', 'Boolean', 'ID', '__Schema', '__Type', '__Field', '__InputValue', '__EnumValue', '__Directive'];
        const userTypes = Object.keys(this.schemaObj.types || {});
        const allTypes = [...new Set([...userTypes, ...builtins])];
        result[key] = allTypes.map(name => {
          const isBuiltin = builtins.includes(name);
          const isScalar = ['String', 'Int', 'Float', 'Boolean', 'ID'].includes(name);
          let kind = 'OBJECT';
          if (isScalar) kind = 'SCALAR';
          else if (name.startsWith('__')) kind = 'OBJECT';
          else if (this.schemaObj.inputTypes && this.schemaObj.inputTypes.includes(name)) kind = 'INPUT_OBJECT';
          else if (this.schemaObj.enumTypes && this.schemaObj.enumTypes.includes(name)) kind = 'ENUM';
          else if (this.schemaObj.unionTypes && this.schemaObj.unionTypes.includes(name)) kind = 'UNION';
          if (sel.selectionSet) {
            return this._resolveType(name, sel.selectionSet, variables, fragments, kind);
          }
          return { name, kind };
        });
      }
    }
    return result;
  }

  _resolveType(typeName, selectionSet, variables, fragments, kindHint) {
    if (!typeName) return null;
    const expanded = this._expandFragments(selectionSet || [], fragments);
    const result = {};
    const builtins = ['String', 'Int', 'Float', 'Boolean', 'ID'];
    const isScalar = builtins.includes(typeName);
    let kind = kindHint || (isScalar ? 'SCALAR' : 'OBJECT');
    if (this.schemaObj) {
      if (this.schemaObj.inputTypes && this.schemaObj.inputTypes.includes(typeName)) kind = 'INPUT_OBJECT';
      if (this.schemaObj.enumTypes && this.schemaObj.enumTypes.includes(typeName)) kind = 'ENUM';
      if (this.schemaObj.unionTypes && this.schemaObj.unionTypes.includes(typeName)) kind = 'UNION';
    }
    for (const sel of expanded) {
      if (sel.kind !== 'field') continue;
      const key = sel.alias || sel.name;
      if (sel.name === 'name') result[key] = typeName;
      else if (sel.name === 'kind') result[key] = kind;
      else if (sel.name === 'description') result[key] = null;
      else if (sel.name === 'fields') {
        const typeFields = this.schemaObj && this.schemaObj.types && this.schemaObj.types[typeName];
        if (typeFields && sel.selectionSet) {
          result[key] = Object.entries(typeFields).map(([fname, ftype]) => {
            const fExpanded = this._expandFragments(sel.selectionSet, fragments);
            const fResult = {};
            for (const fsel of fExpanded) {
              if (fsel.kind !== 'field') continue;
              const fkey = fsel.alias || fsel.name;
              if (fsel.name === 'name') fResult[fkey] = fname;
              else if (fsel.name === 'description') fResult[fkey] = null;
              else if (fsel.name === 'type') fResult[fkey] = { name: ftype.replace(/[\[\]!]/g, ''), kind: builtins.includes(ftype.replace(/[\[\]!]/g, '')) ? 'SCALAR' : 'OBJECT' };
              else if (fsel.name === 'args') fResult[fkey] = [];
            }
            return fResult;
          });
        } else {
          result[key] = null;
        }
      }
    }
    return result;
  }
}

/* ── Sample data shared across lessons ─────────────────────────────────── */
const USERS = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: '2', name: 'Bob',   email: 'bob@example.com',   role: 'user'  },
  { id: '3', name: 'Carol', email: 'carol@example.com', role: 'user'  },
];

const POSTS = [
  { id: 'p1', title: 'Hello GraphQL',    body: 'Getting started with GraphQL.', authorId: '1', publishedAt: '2024-01-10' },
  { id: 'p2', title: 'Resolvers deep dive', body: 'How resolvers work.',         authorId: '1', publishedAt: '2024-02-15' },
  { id: 'p3', title: 'Variables & types', body: 'Using variables in queries.',   authorId: '2', publishedAt: '2024-03-20' },
  { id: 'p4', title: 'Fragments guide',  body: 'Reusing field sets.',            authorId: '2', publishedAt: '2024-04-01' },
];

/* ── Lessons ─────────────────────────────────────────────────────────────── */
const CHAPTERS = [
  'Your First Query',
  'Nested & Lists',
  'Aliases & Meta Fields',
  'Filtering, Sorting & Pagination',
  'Mutations',
  'Variables',
  'Fragments & Directives',
  'Enums & Interfaces',
  'Errors & Nullability',
  'Introspection & Tooling',
  'Auth & Context',
  'Performance & Production',
];

const LESSONS = [
  /* ─── Chapter: Your First Query ─── */
  {
    id: 'first-query',
    chapter: 'Your First Query',
    title: 'Select fields with a query',
    concept: 'A GraphQL query selects exactly the fields you need. The server returns only what you ask for — no more, no less. Wrap field names in `{}` to form a selection set. The root type is `Query`.\n\nEvery GraphQL request starts at the root `Query` type. From there you select fields, and for object fields you open another selection set `{}` to choose which sub-fields to return.',
    schema: `type Query {
  hello: String
  currentUser: User
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  hello
  currentUser {
    id
    name
    role
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { hello: 'String', currentUser: 'User' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        hello: () => 'Hello from GraphQL!',
        currentUser: () => ({ id: '1', name: 'Alice', role: 'admin', __typename: 'User' }),
      },
    },
    takeaways: [
      'GraphQL returns exactly the fields you request — nothing more',
      'Nested objects use their own selection set `{}`',
      'The root `Query` type is the entry point for all reads',
    ],
  },

  {
    id: 'arguments',
    chapter: 'Your First Query',
    title: 'Pass arguments to fields',
    concept: 'Fields can accept arguments in parentheses. Arguments are typed and validated by the schema. Use them to filter, find by ID, paginate, or sort results.\n\nRequired arguments are marked with `!` (non-null) in the schema. You can have multiple fields in one query — they execute and return results together.',
    schema: `type Query {
  hello: String
  user(id: ID!): User
  users(limit: Int): [User]
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  user(id: "2") {
    name
    role
  }
  users(limit: 2) {
    id
    name
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { hello: 'String', user: 'User', users: '[User]' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        hello: () => 'Hello from GraphQL!',
        user: (_, { id }) => { const u = USERS.find(u => u.id === id); return u ? { ...u, __typename: 'User' } : null; },
        users: (_, { limit }) => {
          let list = USERS.map(u => ({ ...u, __typename: 'User' }));
          if (limit) list = list.slice(0, limit);
          return list;
        },
      },
    },
    takeaways: [
      'Arguments are passed inside `()` after the field name',
      'Required arguments use `!` (non-null) in the schema',
      'Multiple fields in one query execute in parallel',
    ],
  },

  /* ─── Chapter: Nested & Lists ─── */
  {
    id: 'nested-objects',
    chapter: 'Nested & Lists',
    title: 'Query nested objects and relationships',
    concept: 'GraphQL traverses object relationships naturally. Each nested type has its own resolver that receives the parent object. This lets you fetch deeply related data in a single request.\n\nWhen resolving `User.posts`, the resolver receives the `user` object as its first argument (called the parent). It uses that to filter related posts. This pattern replaces multiple REST round-trips with one request.',
    schema: `type Query {
  users: [User]
}

type User {
  id: ID
  name: String
  posts: [Post]
}

type Post {
  id: ID
  title: String
  publishedAt: String
  author: User
}`,
    code: `{
  users {
    name
    posts {
      title
      publishedAt
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { users: '[User]' },
        User: { id: 'ID', name: 'String', posts: '[Post]' },
        Post: { id: 'ID', title: 'String', publishedAt: 'String', author: 'User' },
      },
    },
    resolvers: {
      Query: {
        users: () => USERS.map(u => ({ ...u, __typename: 'User' })),
      },
      User: {
        posts: (user) => POSTS.filter(p => p.authorId === user.id).map(p => ({ ...p, __typename: 'Post' })),
      },
      Post: {
        author: (post) => { const u = USERS.find(u => u.id === post.authorId); return u ? { ...u, __typename: 'User' } : null; },
      },
    },
    takeaways: [
      'Nested resolvers receive the parent object as their first argument',
      'You can traverse relationships to any depth',
      'GraphQL replaces multiple REST round-trips with one request',
    ],
  },

  {
    id: 'aliases',
    chapter: 'Nested & Lists',
    title: 'Alias fields to rename or request twice',
    concept: 'Aliases let you rename a field in the response or call the same field twice with different arguments. Add `alias:` before the field name.\n\nWithout aliases, requesting `user` twice would cause a key collision in the JSON response. Aliases give each result its own unique key, making it possible to fetch the same field multiple times in one query.',
    schema: `type Query {
  user(id: ID!): User
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  alice: user(id: "1") {
    name
    role
  }
  bob: user(id: "2") {
    name
    role
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { user: 'User' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        user: (_, { id }) => { const u = USERS.find(u => u.id === id); return u ? { ...u, __typename: 'User' } : null; },
      },
    },
    takeaways: [
      'Aliases rename the key in the JSON response',
      'Use aliases to call the same field with different arguments',
      'Aliases also avoid key collisions when querying the same field twice',
    ],
  },

  /* ─── Chapter: Mutations ─── */
  {
    id: 'basic-mutation',
    chapter: 'Mutations',
    title: 'Write data with a mutation',
    concept: 'Mutations modify server-side data. Use the `mutation` keyword instead of `query`. Like queries, mutations return fields — you specify exactly what you want back from the operation.\n\nUnlike queries (which can run in parallel), mutations execute sequentially. Each mutation resolver performs the write and returns the updated or newly created data.',
    schema: `type Query {
  users: [User]
}

type Mutation {
  createUser(name: String!, email: String!): User
}

type User {
  id: ID
  name: String
  email: String
}`,
    code: `mutation {
  createUser(name: "Carol", email: "carol@example.com") {
    id
    name
    email
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      mutationType: 'Mutation',
      types: {
        Query: { users: '[User]' },
        Mutation: { createUser: 'User' },
        User: { id: 'ID', name: 'String', email: 'String' },
      },
    },
    resolvers: {
      Query: {
        users: () => USERS.map(u => ({ ...u, __typename: 'User' })),
      },
      Mutation: {
        createUser: (_, { name, email }) => ({ id: String(Date.now()), name, email, __typename: 'User' }),
      },
    },
    takeaways: [
      'Use the `mutation` keyword for write operations',
      'Mutations return fields just like queries',
      'The resolver performs the write and returns the result',
    ],
  },

  {
    id: 'input-types',
    chapter: 'Mutations',
    title: 'Group mutation arguments with input types',
    concept: 'Input types bundle multiple arguments into a single typed object. They are the standard pattern for create and update mutations — cleaner than many separate arguments and reusable across operations.\n\nInput types are defined with the `input` keyword instead of `type`. They can only contain scalar fields and other input types — not regular object types. In the query, you pass an object literal `{ key: value }` as the argument value.',
    schema: `input CreatePostInput {
  title: String!
  body: String!
  authorId: ID!
}

type Query {
  posts: [Post]
}

type Mutation {
  createPost(input: CreatePostInput!): Post
}

type Post {
  id: ID
  title: String
  body: String
  author: User
}

type User {
  id: ID
  name: String
}`,
    code: `mutation {
  createPost(input: {
    title: "GraphQL is great",
    body: "Here is why...",
    authorId: "1"
  }) {
    id
    title
    author {
      name
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      mutationType: 'Mutation',
      inputTypes: ['CreatePostInput'],
      types: {
        Query: { posts: '[Post]' },
        Mutation: { createPost: 'Post' },
        Post: { id: 'ID', title: 'String', body: 'String', author: 'User' },
        User: { id: 'ID', name: 'String' },
        CreatePostInput: { title: 'String!', body: 'String!', authorId: 'ID!' },
      },
    },
    resolvers: {
      Query: {
        posts: () => POSTS.map(p => ({ ...p, __typename: 'Post' })),
      },
      Mutation: {
        createPost: (_, { input }) => ({
          id: String(Date.now()),
          title: input.title,
          body: input.body,
          authorId: input.authorId,
          __typename: 'Post',
        }),
      },
      Post: {
        author: (post) => { const u = USERS.find(u => u.id === post.authorId); return u ? { ...u, __typename: 'User' } : null; },
      },
    },
    takeaways: [
      'Input types group related mutation arguments into one object',
      'Input types are defined with the `input` keyword, not `type`',
      'They can be reused across multiple mutations',
    ],
  },

  /* ─── Chapter: Variables ─── */
  {
    id: 'variables',
    chapter: 'Variables',
    title: 'Use variables for dynamic queries',
    concept: 'Variables separate the query structure from the data it operates on. Declare them with `$name: Type` in the operation signature and pass them as a JSON object alongside the query. This is the safe, reusable way to parameterize queries.\n\nNever interpolate dynamic values directly into a query string — that is the GraphQL equivalent of SQL injection. Variables are the correct pattern: the query structure is fixed, only the variable JSON changes.',
    schema: `type Query {
  user(id: ID!): User
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `query GetUser($id: ID!) {
  user(id: $id) {
    name
    role
  }
}`,
    variables: '{"id": "2"}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { user: 'User' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        user: (_, { id }) => { const u = USERS.find(u => u.id === id); return u ? { ...u, __typename: 'User' } : null; },
      },
    },
    takeaways: [
      'Variables are declared in the operation signature with `$name: Type`',
      'Pass them as a separate JSON object — never interpolate into the query string',
      'Required variables use `!` — the server validates them before execution',
    ],
  },

  {
    id: 'default-variables',
    chapter: 'Variables',
    title: 'Provide default variable values',
    concept: 'Variables can have default values using `= value` in the declaration. If the variable is not provided in the variables object, the default is used. Defaults make variables optional without making the type nullable.\n\nIn the variables panel below, we pass `{}` — no variables at all. The query uses the defaults declared in the operation signature: `limit` defaults to 3 and `role` defaults to "user".',
    schema: `type Query {
  users(limit: Int, role: String): [User]
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `query GetUsers($limit: Int = 3, $role: String = "user") {
  users(limit: $limit, role: $role) {
    name
    role
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { users: '[User]' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        users: (_, { limit, role }) => {
          let list = USERS.map(u => ({ ...u, __typename: 'User' }));
          if (role) list = list.filter(u => u.role === role);
          if (limit) list = list.slice(0, limit);
          return list;
        },
      },
    },
    takeaways: [
      'Default values use `= value` after the type in the variable declaration',
      'Defaults make variables optional without making the schema type nullable',
      'The variables JSON can omit defaulted variables entirely',
    ],
  },

  /* ─── Chapter: Fragments & Directives ─── */
  {
    id: 'fragments',
    chapter: 'Fragments & Directives',
    title: 'Reuse field sets with fragments',
    concept: 'Fragments define a named, reusable selection set for a specific type. Use `...FragmentName` to spread a fragment wherever that type appears. This avoids duplicating the same field list across multiple queries.\n\nFragments are especially useful in large applications where many queries need the same set of fields from a type. Define the fields once in a fragment and spread it everywhere.',
    schema: `type Query {
  user(id: ID!): User
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `fragment UserFields on User {
  id
  name
  role
}

query {
  alice: user(id: "1") {
    ...UserFields
  }
  bob: user(id: "2") {
    ...UserFields
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { user: 'User' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        user: (_, { id }) => { const u = USERS.find(u => u.id === id); return u ? { ...u, __typename: 'User' } : null; },
      },
    },
    takeaways: [
      'Fragments are defined with `fragment Name on Type { ... }`',
      'Spread them with `...FragmentName` inside any compatible selection set',
      'Fragments prevent duplication and keep queries maintainable',
    ],
  },

  {
    id: 'directives',
    chapter: 'Fragments & Directives',
    title: 'Conditionally include fields with directives',
    concept: 'Directives modify execution behavior. `@include(if: Boolean)` includes a field only when true. `@skip(if: Boolean)` excludes a field when true. Both accept a Boolean variable or literal.\n\nIn the variables panel, try changing `showEmail` to false or `skipRole` to true and run again. The response will change based on those flags — this is how clients can control the response shape at query time.',
    schema: `type Query {
  users: [User]
}

type User {
  id: ID
  name: String
  email: String
  role: String
}`,
    code: `query($showEmail: Boolean!, $skipRole: Boolean!) {
  users {
    name
    email @include(if: $showEmail)
    role @skip(if: $skipRole)
  }
}`,
    variables: '{"showEmail": true, "skipRole": false}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { users: '[User]' },
        User: { id: 'ID', name: 'String', email: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        users: () => USERS.map(u => ({ ...u, __typename: 'User' })),
      },
    },
    takeaways: [
      '@include(if: true) includes the field; false omits it',
      '@skip(if: true) omits the field; false includes it',
      'Both accept a variable or Boolean literal',
    ],
  },

  /* ─── Chapter: Advanced ─── */
  {
    id: 'introspection',
    chapter: 'Introspection & Tooling',
    title: 'Explore the schema with introspection',
    concept: 'GraphQL schemas are self-documenting. The introspection system lets you query the schema itself — discover types, fields, and their descriptions at runtime. GraphiQL and other tools use introspection to power autocomplete.\n\nThe `__schema` field is a special system field available on every GraphQL server. It returns metadata about the schema itself — query type name, mutation type name, and the list of all defined types.',
    schema: `type Query {
  users: [User]
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      name
      kind
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { users: '[User]' },
        User: { id: 'ID', name: 'String', role: 'String' },
      },
    },
    resolvers: {
      Query: {
        users: () => USERS.map(u => ({ ...u, __typename: 'User' })),
      },
    },
    takeaways: [
      'GraphQL introspection uses `__schema` and `__type` system fields',
      'Every GraphQL server exposes its schema structure via introspection',
      'Tools like GraphiQL use introspection for autocomplete and documentation',
    ],
  },

  {
    id: 'inline-fragments',
    chapter: 'Enums & Interfaces',
    title: 'Handle union types with inline fragments',
    concept: 'Inline fragments select fields only when the result matches a specific type. They are used with union types and interfaces — asking "if this is a User, give me name; if it is a Post, give me title".\n\nThe `__typename` field tells you the concrete type of each item in the list. The executor checks each item\'s `__typename` against the inline fragment\'s type condition and applies only the matching selections.',
    schema: `union SearchResult = User | Post

type Query {
  search(term: String!): [SearchResult]
}

type User {
  id: ID
  name: String
  role: String
}

type Post {
  id: ID
  title: String
  body: String
}`,
    code: `{
  search(term: "a") {
    ... on User {
      name
      role
    }
    ... on Post {
      title
      body
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      unionTypes: ['SearchResult'],
      types: {
        Query: { search: '[SearchResult]' },
        User: { id: 'ID', name: 'String', role: 'String' },
        Post: { id: 'ID', title: 'String', body: 'String' },
        SearchResult: {},
      },
    },
    resolvers: {
      Query: {
        search: (_, { term }) => {
          const t = term.toLowerCase();
          const matchedUsers = USERS
            .filter(u => u.name.toLowerCase().includes(t))
            .map(u => ({ ...u, __typename: 'User' }));
          const matchedPosts = POSTS
            .filter(p => p.title.toLowerCase().includes(t))
            .map(p => ({ ...p, __typename: 'Post' }));
          return [...matchedUsers, ...matchedPosts];
        },
      },
    },
    takeaways: [
      'Inline fragments use `... on TypeName { }` syntax',
      'They select fields only when the result is that concrete type',
      'Use them with union types and interfaces to handle polymorphic results',
    ],
  },

  /* ─── Chapter: Aliases & Meta Fields ─── */
  {
    id: 'aliases',
    chapter: 'Aliases & Meta Fields',
    title: 'Rename fields with aliases',
    concept: 'An alias renames a field in the response. This lets you query the same field more than once with different arguments, or shape the response keys to match your UI.\n\nWrite `aliasName: fieldName(args)`. The server resolves `fieldName` but returns the data under `aliasName`. Without aliases, asking for `user` twice would collide on the same response key.',
    schema: `type Query {
  user(id: ID!): User
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  admin: user(id: "1") {
    name
    role
  }
  member: user(id: "2") {
    name
    role
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { user: 'User' }, User: { id: 'ID', name: 'String', role: 'String' } } },
    resolvers: {
      Query: {
        user: (_, { id }) => { const u = USERS.find(u => u.id === id); return u ? { ...u, __typename: 'User' } : null; },
      },
    },
    takeaways: [
      'Aliases use `aliasName: fieldName` syntax',
      'They let you query the same field multiple times with different arguments',
      'Aliases shape response keys to match your frontend',
    ],
  },

  {
    id: 'typename-meta',
    chapter: 'Aliases & Meta Fields',
    title: 'Discover types with __typename',
    concept: 'Every object in GraphQL exposes a meta field called `__typename` that returns the concrete type name. Clients use it to render polymorphic lists and to build normalized caches (Apollo and urql key entities by `__typename` + `id`).\n\nIt is always available without being defined in the schema. Add it to any selection set to see which type the server returned.',
    schema: `type Query {
  users: [User]
}

type User {
  id: ID
  name: String
}`,
    code: `{
  users {
    __typename
    id
    name
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { users: '[User]' }, User: { id: 'ID', name: 'String' } } },
    resolvers: {
      Query: { users: () => USERS.map(u => ({ ...u, __typename: 'User' })) },
    },
    takeaways: [
      '`__typename` returns the concrete type of any object',
      'It is available everywhere without being declared in the schema',
      'Client caches key entities by `__typename` + `id`',
    ],
  },

  /* ─── Chapter: Filtering, Sorting & Pagination ─── */
  {
    id: 'filtering',
    chapter: 'Filtering, Sorting & Pagination',
    title: 'Filter a list with arguments',
    concept: 'List fields commonly take arguments that filter results on the server. Instead of fetching everything and filtering on the client, you pass criteria like `role` or `search` and the resolver returns only matching rows.\n\nThis keeps payloads small and moves work to the server where the data lives. Arguments are optional unless marked non-null with `!`.',
    schema: `type Query {
  users(role: String, search: String): [User]
}

type User {
  id: ID
  name: String
  email: String
  role: String
}`,
    code: `{
  admins: users(role: "admin") {
    name
    email
  }
  matches: users(search: "ali") {
    name
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { users: '[User]' }, User: { id: 'ID', name: 'String', email: 'String', role: 'String' } } },
    resolvers: {
      Query: {
        users: (_, { role, search }) => {
          let list = USERS.slice();
          if (role) list = list.filter(u => u.role === role);
          if (search) list = list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
          return list.map(u => ({ ...u, __typename: 'User' }));
        },
      },
    },
    takeaways: [
      'Pass filter criteria as field arguments',
      'Filtering on the server keeps payloads small',
      'Optional arguments can be combined freely',
    ],
  },

  {
    id: 'sorting',
    chapter: 'Filtering, Sorting & Pagination',
    title: 'Sort results with arguments',
    concept: 'Sorting is just another argument. A common convention is a `sortBy` field plus an `order` of `ASC` or `DESC`. The resolver orders the data before returning it.\n\nKeeping sort logic on the server means every client gets consistent ordering and the database can use indexes to sort efficiently.',
    schema: `type Query {
  users(sortBy: String, order: String): [User]
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  users(sortBy: "name", order: "DESC") {
    name
    role
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { users: '[User]' }, User: { id: 'ID', name: 'String', role: 'String' } } },
    resolvers: {
      Query: {
        users: (_, { sortBy, order }) => {
          const list = USERS.map(u => ({ ...u, __typename: 'User' }));
          if (sortBy) {
            list.sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy])));
            if (String(order).toUpperCase() === 'DESC') list.reverse();
          }
          return list;
        },
      },
    },
    takeaways: [
      'Sorting uses arguments like `sortBy` and `order`',
      'Server-side sorting gives every client consistent order',
      'Databases can use indexes to sort efficiently',
    ],
  },

  {
    id: 'offset-pagination',
    chapter: 'Filtering, Sorting & Pagination',
    title: 'Offset pagination with limit & offset',
    concept: 'The simplest pagination passes `limit` (page size) and `offset` (how many rows to skip). It is easy to reason about and maps directly to SQL `LIMIT`/`OFFSET`.\n\nThe tradeoff: large offsets get slow, and rows shifting between requests can cause skipped or duplicated items. For stable, large datasets, prefer cursor pagination (next lesson).',
    schema: `type Query {
  users(limit: Int, offset: Int): [User]
}

type User {
  id: ID
  name: String
}`,
    code: `{
  page2: users(limit: 2, offset: 2) {
    id
    name
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { users: '[User]' }, User: { id: 'ID', name: 'String' } } },
    resolvers: {
      Query: {
        users: (_, { limit, offset }) => {
          let list = USERS.map(u => ({ ...u, __typename: 'User' }));
          const start = offset || 0;
          list = list.slice(start, limit ? start + limit : undefined);
          return list;
        },
      },
    },
    takeaways: [
      '`limit` sets page size, `offset` skips rows',
      'Maps directly to SQL LIMIT/OFFSET',
      'Large offsets are slow and can skip or duplicate shifting rows',
    ],
  },

  {
    id: 'cursor-pagination',
    chapter: 'Filtering, Sorting & Pagination',
    title: 'Cursor pagination (Relay connections)',
    concept: 'Cursor pagination is the production standard. Instead of an offset, each item carries an opaque `cursor`, and you ask for `first: N` items `after: cursor`. The response is a Connection with `edges` (node + cursor) and `pageInfo` (`endCursor`, `hasNextPage`).\n\nThis is stable as data changes and is the Relay specification most GraphQL APIs follow. The cursor is opaque — clients never parse it, they just pass it back.',
    schema: `type Query {
  usersConnection(first: Int, after: String): UserConnection
}

type UserConnection {
  totalCount: Int
  edges: [UserEdge]
  pageInfo: PageInfo
}

type UserEdge {
  cursor: String
  node: User
}

type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type User {
  id: ID
  name: String
}`,
    code: `{
  usersConnection(first: 2) {
    totalCount
    edges {
      cursor
      node { id name }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { usersConnection: 'UserConnection' },
        UserConnection: { totalCount: 'Int', edges: '[UserEdge]', pageInfo: 'PageInfo' },
        UserEdge: { cursor: 'String', node: 'User' },
        PageInfo: { endCursor: 'String', hasNextPage: 'Boolean' },
        User: { id: 'ID', name: 'String' },
      },
    },
    resolvers: {
      Query: {
        usersConnection: (_, { first, after }) => {
          let startIndex = 0;
          if (after) startIndex = USERS.findIndex(u => u.id === after) + 1;
          const slice = USERS.slice(startIndex, first ? startIndex + first : undefined);
          const edges = slice.map(u => ({ cursor: u.id, node: { ...u, __typename: 'User' }, __typename: 'UserEdge' }));
          const last = slice[slice.length - 1];
          return {
            totalCount: USERS.length,
            edges,
            pageInfo: {
              endCursor: last ? last.id : null,
              hasNextPage: startIndex + slice.length < USERS.length,
              __typename: 'PageInfo',
            },
            __typename: 'UserConnection',
          };
        },
      },
    },
    takeaways: [
      'Connections wrap `edges` (node + cursor) and `pageInfo`',
      'Ask for `first: N` items `after: cursor` — never an offset',
      'Cursors are opaque and stable as data changes (Relay spec)',
    ],
  },

  /* ─── Chapter: Enums & Interfaces ─── */
  {
    id: 'enums',
    chapter: 'Enums & Interfaces',
    title: 'Constrain values with enums',
    concept: 'An enum defines a fixed set of allowed values. Using `enum Role { ADMIN USER GUEST }` instead of `String` makes invalid values impossible, documents the options, and powers editor autocomplete.\n\nEnum values are written without quotes in queries (`role: ADMIN`). They are leaf values — you do not select sub-fields on them.',
    schema: `enum Role {
  ADMIN
  USER
  GUEST
}

type Query {
  usersByRole(role: Role!): [User]
}

type User {
  id: ID
  name: String
  role: Role
}`,
    code: `{
  usersByRole(role: ADMIN) {
    name
    role
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', enumTypes: ['Role'], types: { Query: { usersByRole: '[User]' }, User: { id: 'ID', name: 'String', role: 'Role' } } },
    resolvers: {
      Query: {
        usersByRole: (_, { role }) => USERS
          .filter(u => u.role.toUpperCase() === role)
          .map(u => ({ ...u, role: u.role.toUpperCase(), __typename: 'User' })),
      },
    },
    takeaways: [
      'Enums define a fixed set of allowed values',
      'Enum values are unquoted in queries (`role: ADMIN`)',
      'They make invalid input impossible and document the options',
    ],
  },

  {
    id: 'interfaces',
    chapter: 'Enums & Interfaces',
    title: 'Share fields with interfaces',
    concept: 'An interface defines fields that multiple types must implement. A `Node` interface with an `id`, or a `SearchResult` interface, lets you return mixed types from one field while guaranteeing shared fields.\n\nYou select shared fields directly and type-specific fields with inline fragments `... on Type`. Each object reports its concrete type via `__typename`.',
    schema: `interface Media {
  id: ID
  title: String
}

type Movie implements Media {
  id: ID
  title: String
  runtime: Int
}

type Album implements Media {
  id: ID
  title: String
  tracks: Int
}

type Query {
  library: [Media]
}`,
    code: `{
  library {
    __typename
    id
    title
    ... on Movie { runtime }
    ... on Album { tracks }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      interfaceTypes: ['Media'],
      types: {
        Query: { library: '[Media]' },
        Movie: { id: 'ID', title: 'String', runtime: 'Int' },
        Album: { id: 'ID', title: 'String', tracks: 'Int' },
        Media: { id: 'ID', title: 'String' },
      },
    },
    resolvers: {
      Query: {
        library: () => [
          { id: 'm1', title: 'Inception', runtime: 148, __typename: 'Movie' },
          { id: 'a1', title: 'Discovery', tracks: 12, __typename: 'Album' },
        ],
      },
    },
    takeaways: [
      'Interfaces guarantee shared fields across types',
      'Select shared fields directly, type-specific fields with `... on Type`',
      '`__typename` reveals each object\'s concrete type',
    ],
  },

  /* ─── Chapter: Errors & Nullability ─── */
  {
    id: 'errors',
    chapter: 'Errors & Nullability',
    title: 'Return and read GraphQL errors',
    concept: 'When a resolver throws, GraphQL does not crash the whole response — it adds an entry to a top-level `errors` array and (for nullable fields) sets the data to null. A response can contain both partial `data` and `errors`.\n\nTry the query: requesting a missing user makes the resolver throw, and you get an `errors` array instead of `data`. Real servers also attach `extensions` with error codes for clients to handle.',
    schema: `type Query {
  user(id: ID!): User
}

type User {
  id: ID
  name: String
}`,
    code: `{
  user(id: "999") {
    name
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { user: 'User' }, User: { id: 'ID', name: 'String' } } },
    resolvers: {
      Query: {
        user: (_, { id }) => {
          const u = USERS.find(u => u.id === id);
          if (!u) throw new Error('User with id ' + id + ' not found');
          return { ...u, __typename: 'User' };
        },
      },
    },
    takeaways: [
      'A thrown resolver becomes an entry in the top-level `errors` array',
      'Responses can carry both partial `data` and `errors`',
      'Production servers add error codes in `extensions`',
    ],
  },

  {
    id: 'nullability',
    chapter: 'Errors & Nullability',
    title: 'Non-null (!) vs nullable fields',
    concept: 'In GraphQL, fields are nullable by default. Add `!` to mark a field non-null — the server guarantees it is never null. Nullable fields can legitimately return null without an error.\n\nDesign tip: be conservative with `!`. A non-null field that errors nullifies its parent too, which can cascade. Many teams keep most fields nullable for resilience.',
    schema: `type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  nickname: String
}`,
    code: `{
  user(id: "2") {
    name
    nickname
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { user: 'User' }, User: { id: 'ID', name: 'String', nickname: 'String' } } },
    resolvers: {
      Query: {
        user: (_, { id }) => {
          const u = USERS.find(u => u.id === id);
          return u ? { ...u, nickname: null, __typename: 'User' } : null;
        },
      },
    },
    takeaways: [
      'Fields are nullable by default; `!` makes them non-null',
      'A null in a non-null field bubbles up and nullifies the parent',
      'Many teams keep fields nullable for resilience',
    ],
  },

  /* ─── Chapter: Auth & Context ─── */
  {
    id: 'auth-context',
    chapter: 'Auth & Context',
    title: 'Authorization with context',
    concept: 'In a real server, authentication lives in the `context` object — built once per request from the HTTP headers (e.g. a JWT) and passed to every resolver. Resolvers read `context.user` to allow or deny access.\n\nThis playground has no request, so we model context as a `token` argument. A protected field throws `Unauthorized` without a valid token. In production, never put the token in the query itself — it comes from headers.',
    schema: `type Query {
  me(token: String): User
  secret(token: String!): String
}

type User {
  id: ID
  name: String
  role: String
}`,
    code: `{
  me(token: "valid-token") {
    name
    role
  }
  secret(token: "valid-token")
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { me: 'User', secret: 'String' }, User: { id: 'ID', name: 'String', role: 'String' } } },
    resolvers: {
      Query: {
        me: (_, { token }) => token === 'valid-token' ? { ...USERS[0], __typename: 'User' } : null,
        secret: (_, { token }) => {
          if (token !== 'valid-token') throw new Error('Unauthorized: valid token required');
          return 'The launch code is 0000';
        },
      },
    },
    takeaways: [
      'Auth lives in `context`, built once per request from headers',
      'Resolvers read `context.user` to allow or deny access',
      'Protected resolvers throw an Unauthorized error when denied',
    ],
  },

  {
    id: 'field-auth',
    chapter: 'Auth & Context',
    title: 'Field-level authorization',
    concept: 'Authorization is often per field, not per query. An admin can see a user\'s `email`; everyone else gets null. You enforce this inside the field resolver by checking the caller\'s role from context.\n\nHere the `email` field returns its value only when an admin token is supplied, otherwise null — without failing the rest of the query.',
    schema: `type Query {
  user(id: ID!, token: String): User
}

type User {
  id: ID
  name: String
  email: String
}`,
    code: `{
  guest: user(id: "1") {
    name
    email
  }
  admin: user(id: "1", token: "admin-token") {
    name
    email
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { user: 'User' }, User: { id: 'ID', name: 'String', email: 'String' } } },
    resolvers: {
      Query: {
        user: (_, { id, token }) => {
          const u = USERS.find(u => u.id === id);
          if (!u) return null;
          return { ...u, email: token === 'admin-token' ? u.email : null, __typename: 'User' };
        },
      },
    },
    takeaways: [
      'Authorization is often per field, not per whole query',
      'Resolvers hide sensitive fields by returning null based on role',
      'The rest of the query still resolves normally',
    ],
  },

  /* ─── Chapter: Performance & Production ─── */
  {
    id: 'n-plus-one',
    chapter: 'Performance & Production',
    title: 'The N+1 problem',
    concept: 'GraphQL\'s nested resolvers create a classic performance trap. Querying `posts { author }` runs the `author` resolver once per post — 1 query for the posts plus N queries for the authors. With 100 posts that is 101 database round-trips.\n\nRun the query: the `Post.author` resolver fires separately for every post. The fix is to batch those lookups (next lesson).',
    schema: `type Query {
  posts: [Post]
}

type Post {
  id: ID
  title: String
  author: User
}

type User {
  id: ID
  name: String
}`,
    code: `{
  posts {
    title
    author {
      name
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { posts: '[Post]' },
        Post: { id: 'ID', title: 'String', author: 'User' },
        User: { id: 'ID', name: 'String' },
      },
    },
    resolvers: {
      Query: { posts: () => POSTS.map(p => ({ ...p, __typename: 'Post' })) },
      Post: {
        author: (post) => {
          // In a real server this is one DB query PER post — the N+1 problem.
          const u = USERS.find(u => u.id === post.authorId);
          return u ? { ...u, __typename: 'User' } : null;
        },
      },
    },
    takeaways: [
      'Nested resolvers run once per parent item — 1 + N queries',
      'N+1 is the most common GraphQL performance issue',
      'The fix is to batch the per-item lookups',
    ],
  },

  {
    id: 'dataloader',
    chapter: 'Performance & Production',
    title: 'Batch lookups with DataLoader',
    concept: 'DataLoader solves N+1 by collecting all the keys requested during one tick of the event loop, then loading them in a single batched call — and caching the result per request. The `posts { author }` query goes from 1 + N queries to just 2.\n\nHere we model it: the authors are loaded once into a map, and each `author` resolver does an O(1) lookup instead of a separate query. In real code you wrap this in `new DataLoader(batchFn)`.',
    schema: `type Query {
  posts: [Post]
}

type Post {
  id: ID
  title: String
  author: User
}

type User {
  id: ID
  name: String
}`,
    code: `{
  posts {
    title
    author {
      name
    }
  }
}`,
    variables: '{}',
    schemaObj: {
      queryType: 'Query',
      types: {
        Query: { posts: '[Post]' },
        Post: { id: 'ID', title: 'String', author: 'User' },
        User: { id: 'ID', name: 'String' },
      },
    },
    resolvers: {
      Query: { posts: () => POSTS.map(p => ({ ...p, __typename: 'Post' })) },
      Post: {
        // Modeled DataLoader: authors batched into a map once, O(1) lookups after.
        author: (() => {
          const byId = Object.fromEntries(USERS.map(u => [u.id, { ...u, __typename: 'User' }]));
          return (post) => byId[post.authorId] || null;
        })(),
      },
    },
    takeaways: [
      'DataLoader batches keys collected in one tick into a single load',
      'It caches results per request, turning 1 + N into 1 + 1',
      'Wrap your batch function in `new DataLoader(batchFn)`',
    ],
  },

  {
    id: 'schema-design',
    chapter: 'Performance & Production',
    title: 'Schema design best practices',
    concept: 'A good schema is a product, not a database dump. Key practices: name fields for the client\'s needs, use input types for mutation arguments, prefer connections for lists, return nullable fields for resilience, and evolve without versioning by adding fields and deprecating old ones with `@deprecated`.\n\nThe query here reads a small, well-shaped `node` payload. In production you also add field descriptions (shown in introspection) so the schema documents itself.',
    schema: `type Query {
  node(id: ID!): Resource
}

type Resource {
  id: ID!
  name: String!
  legacyName: String @deprecated(reason: "Use name")
}`,
    code: `{
  node(id: "r1") {
    id
    name
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { node: 'Resource' }, Resource: { id: 'ID', name: 'String', legacyName: 'String' } } },
    resolvers: {
      Query: {
        node: (_, { id }) => ({ id, name: 'Production Resource', legacyName: 'old', __typename: 'Resource' }),
      },
    },
    takeaways: [
      'Design for client needs, not your database tables',
      'Use input types, connections, and nullable fields',
      'Evolve without versioning — add fields and `@deprecated` old ones',
    ],
  },

  {
    id: 'subscriptions-federation',
    chapter: 'Performance & Production',
    title: 'Subscriptions & federation (overview)',
    concept: 'Two production topics that need a live server. **Subscriptions** are the third operation type (after query and mutation): the client opens a long-lived connection (usually WebSocket) and the server pushes events — new messages, live scores, notifications. **Federation** composes many independent GraphQL services into one supergraph, so teams own their own subgraphs while clients see a single API.\n\nThis browser playground runs queries and mutations against an in-memory schema, so it cannot hold a live subscription or federate real services — but the query below shows how a server might report its capabilities.',
    schema: `type Query {
  serverInfo: ServerInfo
}

type ServerInfo {
  supportsSubscriptions: Boolean
  federated: Boolean
  note: String
}`,
    code: `{
  serverInfo {
    supportsSubscriptions
    federated
    note
  }
}`,
    variables: '{}',
    schemaObj: { queryType: 'Query', types: { Query: { serverInfo: 'ServerInfo' }, ServerInfo: { supportsSubscriptions: 'Boolean', federated: 'Boolean', note: 'String' } } },
    resolvers: {
      Query: {
        serverInfo: () => ({
          supportsSubscriptions: false,
          federated: false,
          note: 'Subscriptions and federation require a live server — learn the patterns here, build them with Apollo Server or Mercurius.',
          __typename: 'ServerInfo',
        }),
      },
    },
    takeaways: [
      'Subscriptions push real-time events over a long-lived connection',
      'Federation composes many subgraphs into one supergraph',
      'Both need a live server runtime, not a browser sandbox',
    ],
  },
];

/* ── ConceptText ─────────────────────────────────────────────────────────── */
function ConceptText({ text }) {
  return (
    <>
      {text.split('\n\n').map((para, pi) => {
        const parts = para.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return (
          <p key={pi}>
            {parts.map((part, i) => {
              if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
              return part;
            })}
          </p>
        );
      })}
    </>
  );
}

/* ── SchemaExplorer ──────────────────────────────────────────────────────── */
function SchemaExplorer({ schemaObj }) {
  const [openTypes, setOpenTypes] = useState({});
  if (!schemaObj || !schemaObj.types) {
    return <div className={s.explorerEmpty}>No schema available</div>;
  }
  const types = Object.entries(schemaObj.types);
  return (
    <div className={s.explorerTree}>
      {types.map(([typeName, fields]) => {
        const isOpen = openTypes[typeName] !== false; // default open
        const fieldEntries = Object.entries(fields || {});
        let typeKind = 'type';
        if (schemaObj.inputTypes && schemaObj.inputTypes.includes(typeName)) typeKind = 'input';
        else if (schemaObj.unionTypes && schemaObj.unionTypes.includes(typeName)) typeKind = 'union';
        return (
          <div key={typeName} className={s.explorerTypeBlock}>
            <div
              className={s.explorerTypeHeader}
              onClick={() => setOpenTypes(prev => ({ ...prev, [typeName]: !isOpen }))}
            >
              <span className={s.explorerKindBadge}>{typeKind}</span>
              <span className={s.explorerTypeName}>{typeName}</span>
              <svg
                className={s.explorerChevron + (isOpen ? ' ' + s.explorerChevronOpen : '')}
                width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {isOpen && fieldEntries.length > 0 && (
              <div className={s.explorerFieldList}>
                {fieldEntries.map(([fname, ftype]) => (
                  <div key={fname} className={s.explorerField}>
                    <span className={s.explorerFieldName}>{fname}</span>
                    <span className={s.explorerFieldSep}>:</span>
                    <span className={s.explorerFieldType}>{ftype}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── JSON syntax highlighter ─────────────────────────────────────────────── */
function highlightJSON(json) {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'jsonNum';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) cls = 'jsonKey';
        else cls = 'jsonStr';
      } else if (/true|false/.test(match)) cls = 'jsonBool';
      else if (/null/.test(match)) cls = 'jsonNull';
      return '<span class="' + cls + '">' + match + '</span>';
    });
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function GraphQLPlaygroundTool() {
  const [lessonId, setLessonId] = useState(LESSONS[0].id);
  const [running, setRunning] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [code, setCode] = useState(LESSONS[0].code);
  const [variables, setVariables] = useState(LESSONS[0].variables);
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [varsOpen, setVarsOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const activeIdx = LESSONS.findIndex(l => l.id === lessonId);

  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (m) setSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_LESSON);
      if (saved && LESSONS.find(l => l.id === saved)) setLessonId(saved);
    } catch {}
  }, []);

  const selectLesson = useCallback((id) => {
    const l = LESSONS.find(x => x.id === id);
    setLessonId(id);
    setCode(l ? l.code : '');
    setVariables(l ? l.variables : '{}');
    setResponse(null);
    setError('');
    try { localStorage.setItem(LS_LESSON, id); } catch {}
  }, []);

  const runQuery = useCallback(() => {
    setRunning(true);
    setResponse(null);
    setError('');
    try {
      let parsedVars = {};
      try {
        parsedVars = JSON.parse(variables || '{}');
      } catch {
        setError('Variables JSON is invalid. Please fix the JSON syntax.');
        setRunning(false);
        return;
      }
      const executor = new GraphQLExecutor(lesson.schemaObj, lesson.resolvers);
      const result = executor.execute(code, parsedVars);
      if (result.errors && result.errors.length > 0) {
        setError(result.errors.map(e => e.message).join('\n'));
        setResponse(result);
      } else {
        setResponse(result);
      }
    } catch (e) {
      setError(e.message || 'Execution error');
    } finally {
      setRunning(false);
    }
  }, [code, variables, lesson]);

  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
  }, [runQuery]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const responseJSON = response ? JSON.stringify(response, null, 2) : '';

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="graphql-playground" />
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/graphql-playground.svg" width={22} height={22} alt="" />
          <span className={s.headerTitle}>GraphQL <span className={s.accent}>Playground</span></span>
          <span className={s.headerSub}>In-browser executor · 12 lessons · No server needed</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.lessonBadge}>{activeIdx + 1} / {LESSONS.length}</span>
        </div>
      </header>

      {/* Body */}
      <div className={s.body}>
        {/* Sidebar */}
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarDot} />
              GraphQL
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
          <div className={s.lessonList}>
            {CHAPTERS.map(ch => (
              <div key={ch}>
                <div className={s.chapterLabel}>{ch}</div>
                {LESSONS.filter(l => l.chapter === ch).map(l => (
                  <button
                    key={l.id}
                    className={s.lessonBtn + (l.id === lessonId ? ' ' + s.lessonBtnActive : '')}
                    onClick={() => selectLesson(l.id)}
                  >
                    <span className={s.lessonDot} />
                    {l.title}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        {/* Center */}
        <div className={s.main}>
          {/* Concept */}
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
            </div>
            <div className={s.conceptBody}>
              <ConceptText text={lesson.concept} />
            </div>
          </div>

          {/* Schema SDL (collapsible) */}
          <div className={s.collapsiblePanel}>
            <div className={s.collapsibleHeader} onClick={() => setSchemaOpen(v => !v)}>
              <span className={s.paneLabel}>Schema SDL</span>
              <svg className={s.colChevron + (schemaOpen ? ' ' + s.colChevronOpen : '')} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {schemaOpen && (
              <pre className={s.sdlDisplay}>{lesson.schema}</pre>
            )}
          </div>

          {/* Query editor */}
          <div className={s.codeSection}>
            <div className={s.codePaneHeader}>
              <span className={s.paneLabel}>Query Editor</span>
              <div className={s.paneActions}>
                <button
                  className={s.resetBtn}
                  onClick={() => { setCode(lesson.code); setVariables(lesson.variables); }}
                  title="Reset to original"
                >Reset</button>
                <button
                  className={s.runBtn}
                  onClick={runQuery}
                  disabled={running}
                  title="Run (Ctrl+Enter)"
                >
                  {running ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={s.spin}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="8" />
                    </svg>
                  ) : (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                  {running ? 'Running…' : 'Run'}
                </button>
                <span className={s.hintKey}>Ctrl+Enter</span>
              </div>
            </div>
            <textarea
              className={s.codeEditor}
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
            />

            {/* Variables (collapsible) */}
            <div className={s.varsSection}>
              <div className={s.collapsibleHeader} onClick={() => setVarsOpen(v => !v)}>
                <span className={s.paneLabel}>Variables</span>
                <svg className={s.colChevron + (varsOpen ? ' ' + s.colChevronOpen : '')} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {varsOpen && (
                <textarea
                  className={s.varsEditor}
                  value={variables}
                  onChange={e => setVariables(e.target.value)}
                  spellCheck={false}
                  placeholder="{}"
                />
              )}
            </div>
          </div>

          {/* Response panel */}
          <div className={s.responseSection}>
            <div className={s.responsePaneHeader}>
              <span className={s.paneLabel}>Response</span>
              {response && (
                <button className={s.clearBtn} onClick={() => { setResponse(null); setError(''); }}>Clear</button>
              )}
            </div>
            <div className={s.responseBody}>
              {!response && !error && (
                <div className={s.responsePlaceholder}>Click Run to execute the query</div>
              )}
              {error && !response && (
                <div className={s.responseError}>{error}</div>
              )}
              {response && (
                <pre
                  className={s.responseJSON + (error ? ' ' + s.responseHasError : '')}
                  dangerouslySetInnerHTML={{ __html: highlightJSON(responseJSON) }}
                />
              )}
            </div>
          </div>

          {/* Takeaways */}
          <div className={s.takeaways}>
            <div className={s.takeawaysLabel}>Key takeaways</div>
            <ul className={s.takeawaysList}>
              {lesson.takeaways.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          {/* Nav footer */}
          <div className={s.navFooter}>
            <button
              className={s.navBtn}
              disabled={activeIdx === 0}
              onClick={() => selectLesson(LESSONS[activeIdx - 1].id)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <span className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</span>
            <button
              className={s.navBtn}
              disabled={activeIdx === LESSONS.length - 1}
              onClick={() => selectLesson(LESSONS[activeIdx + 1].id)}
            >
              Next
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right panel — Schema Explorer */}
        {!isMobile && (
          <aside className={s.explorerPanel}>
            <div className={s.explorerPanelHeader}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Schema Explorer</span>
              <button
                className={s.explorerToggleBtn}
                onClick={() => setExplorerOpen(v => !v)}
                aria-label="Toggle schema explorer"
              >
                <svg className={s.colChevron + (explorerOpen ? ' ' + s.colChevronOpen : '')} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            {explorerOpen && (
              <div className={s.explorerBody}>
                <SchemaExplorer schemaObj={lesson.schemaObj} />
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
