'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

const TYPE_OPTIONS = ['string', 'text', 'integer', 'decimal', 'boolean', 'date', 'datetime', 'json', 'uuid'];
const STORAGE_KEY = 'fwd-database-schema-designer-v1';

const DIALECTS = {
  postgres: { label: 'PostgreSQL', json: 'JSONB', uuid: 'UUID', datetime: 'TIMESTAMP', idDefault: 'DEFAULT gen_random_uuid()' },
  mysql: { label: 'MySQL', json: 'JSON', uuid: 'CHAR(36)', datetime: 'DATETIME', idDefault: '' },
  sqlite: { label: 'SQLite', json: 'TEXT', uuid: 'TEXT', datetime: 'TEXT', idDefault: '' },
};

const STARTER_SCHEMA = [
  {
    id: 'users',
    name: 'users',
    fields: [
      { id: 'users_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
      { id: 'users_name', name: 'name', type: 'string', required: true, unique: false, primary: false, relation: '' },
      { id: 'users_email', name: 'email', type: 'string', required: true, unique: true, primary: false, relation: '' },
      { id: 'users_created', name: 'created_at', type: 'datetime', required: true, unique: false, primary: false, relation: '' },
    ],
    indexes: [
      { id: 'idx_users_email', name: 'idx_users_email', fields: ['email'], unique: true },
    ],
  },
  {
    id: 'posts',
    name: 'posts',
    fields: [
      { id: 'posts_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
      { id: 'posts_user', name: 'user_id', type: 'uuid', required: true, unique: false, primary: false, relation: 'users.id' },
      { id: 'posts_title', name: 'title', type: 'string', required: true, unique: false, primary: false, relation: '' },
      { id: 'posts_body', name: 'body', type: 'text', required: false, unique: false, primary: false, relation: '' },
      { id: 'posts_published', name: 'published', type: 'boolean', required: true, unique: false, primary: false, relation: '' },
    ],
    indexes: [
      { id: 'idx_posts_user_id', name: 'idx_posts_user_id', fields: ['user_id'], unique: false },
    ],
  },
];

const TEMPLATE_SCHEMAS = {
  saas: {
    label: 'SaaS',
    tables: STARTER_SCHEMA,
  },
  ecommerce: {
    label: 'Ecommerce',
    tables: [
      {
        id: 'customers',
        name: 'customers',
        fields: [
          { id: 'customers_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
          { id: 'customers_email', name: 'email', type: 'string', required: true, unique: true, primary: false, relation: '' },
          { id: 'customers_name', name: 'name', type: 'string', required: true, unique: false, primary: false, relation: '' },
        ],
        indexes: [{ id: 'idx_customers_email', name: 'idx_customers_email', fields: ['email'], unique: true }],
      },
      {
        id: 'products',
        name: 'products',
        fields: [
          { id: 'products_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
          { id: 'products_sku', name: 'sku', type: 'string', required: true, unique: true, primary: false, relation: '' },
          { id: 'products_name', name: 'name', type: 'string', required: true, unique: false, primary: false, relation: '' },
          { id: 'products_price', name: 'price', type: 'decimal', required: true, unique: false, primary: false, relation: '' },
        ],
        indexes: [{ id: 'idx_products_sku', name: 'idx_products_sku', fields: ['sku'], unique: true }],
      },
      {
        id: 'orders',
        name: 'orders',
        fields: [
          { id: 'orders_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
          { id: 'orders_customer', name: 'customer_id', type: 'uuid', required: true, unique: false, primary: false, relation: 'customers.id' },
          { id: 'orders_total', name: 'total', type: 'decimal', required: true, unique: false, primary: false, relation: '' },
          { id: 'orders_status', name: 'status', type: 'string', required: true, unique: false, primary: false, relation: '' },
        ],
        indexes: [{ id: 'idx_orders_customer_id', name: 'idx_orders_customer_id', fields: ['customer_id'], unique: false }],
      },
    ],
  },
  crm: {
    label: 'CRM',
    tables: [
      {
        id: 'companies',
        name: 'companies',
        fields: [
          { id: 'companies_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
          { id: 'companies_name', name: 'name', type: 'string', required: true, unique: false, primary: false, relation: '' },
          { id: 'companies_domain', name: 'domain', type: 'string', required: false, unique: true, primary: false, relation: '' },
        ],
        indexes: [{ id: 'idx_companies_domain', name: 'idx_companies_domain', fields: ['domain'], unique: true }],
      },
      {
        id: 'contacts',
        name: 'contacts',
        fields: [
          { id: 'contacts_id', name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
          { id: 'contacts_company', name: 'company_id', type: 'uuid', required: true, unique: false, primary: false, relation: 'companies.id' },
          { id: 'contacts_email', name: 'email', type: 'string', required: true, unique: true, primary: false, relation: '' },
          { id: 'contacts_name', name: 'name', type: 'string', required: true, unique: false, primary: false, relation: '' },
        ],
        indexes: [{ id: 'idx_contacts_company_id', name: 'idx_contacts_company_id', fields: ['company_id'], unique: false }],
      },
    ],
  },
};

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function cloneSchema(tables) {
  return tables.map(table => ({
    ...table,
    fields: table.fields.map(field => ({ ...field })),
    indexes: (table.indexes || []).map(index => ({ ...index, fields: [...index.fields] })),
  }));
}

function normalizeSchema(input) {
  const rawTables = Array.isArray(input) ? input : input && Array.isArray(input.tables) ? input.tables : null;
  if (!rawTables || rawTables.length === 0) throw new Error('Schema JSON must contain a non-empty tables array.');

  return rawTables.map((table, tableIndex) => {
    const tableName = String(table.name || `table_${tableIndex + 1}`).toLowerCase().replace(/[^a-z0-9_]/g, '_') || `table_${tableIndex + 1}`;
    const rawFields = Array.isArray(table.fields) && table.fields.length ? table.fields : [{ name: 'id', type: 'uuid', primary: true, required: true, unique: true }];
    return {
      id: table.id || uid('table'),
      name: tableName,
      fields: rawFields.map((field, fieldIndex) => ({
        id: field.id || uid('field'),
        name: String(field.name || `field_${fieldIndex + 1}`).toLowerCase().replace(/[^a-z0-9_]/g, '_') || `field_${fieldIndex + 1}`,
        type: TYPE_OPTIONS.includes(field.type) ? field.type : 'string',
        required: Boolean(field.required || field.primary),
        unique: Boolean(field.unique || field.primary),
        primary: Boolean(field.primary),
        relation: typeof field.relation === 'string' ? field.relation : '',
      })),
      indexes: Array.isArray(table.indexes) ? table.indexes.map((index, indexIndex) => ({
        id: index.id || uid('index'),
        name: String(index.name || `idx_${tableName}_${indexIndex + 1}`).toLowerCase().replace(/[^a-z0-9_]/g, '_'),
        fields: Array.isArray(index.fields) ? index.fields.filter(Boolean) : [],
        unique: Boolean(index.unique),
      })) : [],
    };
  });
}

function titleCase(value) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\s+/g, '');
}

function singular(value) {
  return value.endsWith('ies') ? `${value.slice(0, -3)}y` : value.endsWith('s') ? value.slice(0, -1) : value;
}

function sqlType(type, dialect) {
  const d = DIALECTS[dialect] || DIALECTS.postgres;
  return {
    string: 'VARCHAR(255)',
    text: 'TEXT',
    integer: 'INTEGER',
    decimal: 'DECIMAL(12,2)',
    boolean: 'BOOLEAN',
    date: 'DATE',
    datetime: d.datetime,
    json: d.json,
    uuid: d.uuid,
  }[type] || 'TEXT';
}

function prismaType(type) {
  return {
    string: 'String',
    text: 'String',
    integer: 'Int',
    decimal: 'Decimal',
    boolean: 'Boolean',
    date: 'DateTime',
    datetime: 'DateTime',
    json: 'Json',
    uuid: 'String',
  }[type] || 'String';
}

function mongooseType(type) {
  return {
    string: 'String',
    text: 'String',
    integer: 'Number',
    decimal: 'Number',
    boolean: 'Boolean',
    date: 'Date',
    datetime: 'Date',
    json: 'Schema.Types.Mixed',
    uuid: 'String',
  }[type] || 'String';
}

function firestoreExample(type) {
  return {
    string: '"Example"',
    text: '"Long text"',
    integer: '1',
    decimal: '19.99',
    boolean: 'true',
    date: '"2026-05-23"',
    datetime: 'serverTimestamp()',
    json: '{}',
    uuid: '"uuid-value"',
  }[type] || 'null';
}

function parseRelation(value) {
  if (!value || !value.includes('.')) return null;
  const [table, field] = value.split('.');
  if (!table || !field) return null;
  return { table, field };
}

function validateSchema(tables) {
  const warnings = [];
  const tableNames = new Set();

  for (const table of tables) {
    if (tableNames.has(table.name)) warnings.push(`Duplicate table name: ${table.name}`);
    tableNames.add(table.name);
    if (!table.fields.some(field => field.primary)) warnings.push(`${table.name} has no primary key.`);

    const fieldNames = new Set();
    for (const field of table.fields) {
      if (!field.name) warnings.push(`${table.name} has a field with no name.`);
      if (fieldNames.has(field.name)) warnings.push(`${table.name}.${field.name} is duplicated.`);
      fieldNames.add(field.name);

      const relation = parseRelation(field.relation);
      if (relation) {
        const targetTable = tables.find(item => item.name === relation.table);
        const targetField = targetTable && targetTable.fields.find(item => item.name === relation.field);
        if (!targetTable || !targetField) warnings.push(`${table.name}.${field.name} points to missing relation ${field.relation}.`);
        else if (!targetField.primary && !targetField.unique) warnings.push(`${table.name}.${field.name} references ${field.relation}, which is not primary or unique.`);
        if (!field.required) warnings.push(`${table.name}.${field.name} is an optional relationship field.`);
        const hasIndex = (table.indexes || []).some(index => index.fields.includes(field.name));
        if (!hasIndex) warnings.push(`${table.name}.${field.name} is a relationship field without an index.`);
      }
    }

    for (const index of table.indexes || []) {
      if (!index.fields.length) warnings.push(`${table.name}.${index.name} has no fields.`);
      for (const fieldName of index.fields) {
        if (!table.fields.some(field => field.name === fieldName)) warnings.push(`${table.name}.${index.name} references missing field ${fieldName}.`);
      }
    }
  }

  return warnings;
}

function generateSql(tables, dialect) {
  const d = DIALECTS[dialect] || DIALECTS.postgres;
  return tables.map(table => {
    const lines = table.fields.map(field => {
      const pieces = [`  ${field.name} ${sqlType(field.type, dialect)}`];
      if (field.primary) pieces.push('PRIMARY KEY');
      if (field.primary && field.type === 'uuid' && d.idDefault) pieces.push(d.idDefault);
      if (field.required && !field.primary) pieces.push('NOT NULL');
      if (field.unique && !field.primary) pieces.push('UNIQUE');
      return pieces.join(' ');
    });
    const relations = table.fields
      .map(field => ({ field, relation: parseRelation(field.relation) }))
      .filter(item => item.relation)
      .map(({ field, relation }) => `  FOREIGN KEY (${field.name}) REFERENCES ${relation.table}(${relation.field})`);
    const tableSql = `CREATE TABLE ${table.name} (\n${[...lines, ...relations].join(',\n')}\n);`;
    const indexSql = (table.indexes || [])
      .filter(index => index.fields.length > 0)
      .map(index => `CREATE ${index.unique ? 'UNIQUE ' : ''}INDEX ${index.name} ON ${table.name} (${index.fields.join(', ')});`);
    return [tableSql, ...indexSql].join('\n');
  }).join('\n\n');
}

function generatePrisma(tables) {
  return tables.map(table => {
    const model = titleCase(singular(table.name));
    const lines = table.fields.map(field => {
      const attrs = [];
      if (field.primary) attrs.push('@id');
      if (field.type === 'uuid') attrs.push('@default(uuid())');
      if (field.unique && !field.primary) attrs.push('@unique');
      if (field.name.includes('_')) attrs.push(`@map("${field.name}")`);
      const optional = field.required || field.primary ? '' : '?';
      return `  ${field.name.replace(/_([a-z])/g, (_, c) => c.toUpperCase())} ${prismaType(field.type)}${optional} ${attrs.join(' ')}`.trimEnd();
    });
    const indexes = (table.indexes || [])
      .filter(index => index.fields.length > 0)
      .map(index => `  @@${index.unique ? 'unique' : 'index'}([${index.fields.map(field => field.replace(/_([a-z])/g, (_, c) => c.toUpperCase())).join(', ')}], map: "${index.name}")`);
    return `model ${model} {\n${[...lines, ...indexes, `  @@map("${table.name}")`].join('\n')}\n}`;
  }).join('\n\n');
}

function generateMongoose(tables) {
  return `import mongoose from 'mongoose';\nconst { Schema } = mongoose;\n\n${tables.map(table => {
    const model = titleCase(singular(table.name));
    const fields = table.fields
      .filter(field => !field.primary || field.name !== 'id')
      .map(field => {
        const opts = [`type: ${mongooseType(field.type)}`];
        if (field.required) opts.push('required: true');
        if (field.unique) opts.push('unique: true');
        const rel = parseRelation(field.relation);
        if (rel) opts.push(`ref: '${titleCase(singular(rel.table))}'`);
        return `  ${field.name}: { ${opts.join(', ')} }`;
      });
    const indexLines = (table.indexes || [])
      .filter(index => index.fields.length > 0)
      .map(index => `${model}Schema.index({ ${index.fields.map(field => `${field}: 1`).join(', ')} }${index.unique ? ', { unique: true }' : ''});`);
    return `const ${model}Schema = new Schema({\n${fields.join(',\n')}\n}, { timestamps: true });\n${indexLines.length ? `\n${indexLines.join('\n')}\n` : ''}\nexport const ${model} = mongoose.models.${model} || mongoose.model('${model}', ${model}Schema);`;
  }).join('\n\n')}`;
}

function generateFirestore(tables) {
  return tables.map(table => {
    const fields = table.fields
      .filter(field => !field.primary)
      .map(field => `    ${field.name}: ${firestoreExample(field.type)},`);
    return `// Collection: ${table.name}\nawait addDoc(collection(db, '${table.name}'), {\n${fields.join('\n')}\n});`;
  }).join('\n\n');
}

function ExportPanel({ label, active, onSelect, copied }) {
  return (
    <button className={active ? s.tabActive : s.tab} onClick={onSelect}>
      {label}
      {copied && active ? <span className={s.copied}>Copied</span> : null}
    </button>
  );
}

function SchemaDiagram({ tables }) {
  const relations = tables.flatMap(table => table.fields
    .filter(field => field.relation)
    .map(field => ({ from: `${table.name}.${field.name}`, to: field.relation })));

  return (
    <div className={s.diagram}>
      <div className={s.diagramHeader}>
        <span>ERD Preview</span>
        <small>{relations.length} relationship{relations.length === 1 ? '' : 's'}</small>
      </div>
      <div className={s.diagramCanvas}>
        {tables.map(table => (
          <div className={s.entityCard} key={table.id}>
            <div className={s.entityTitle}>{table.name}</div>
            {table.fields.map(field => (
              <div className={s.entityField} key={field.id}>
                <span>{field.primary ? 'PK' : field.relation ? 'FK' : ''}</span>
                <strong>{field.name}</strong>
                <em>{field.type}</em>
              </div>
            ))}
          </div>
        ))}
      </div>
      {relations.length > 0 && (
        <div className={s.relationList}>
          {relations.map(rel => (
            <div key={`${rel.from}-${rel.to}`} className={s.relationLine}>
              <code>{rel.from}</code>
              <span>references</span>
              <code>{rel.to}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DatabaseSchemaDesignerTool() {
  const [tables, setTables] = useState(() => cloneSchema(STARTER_SCHEMA));
  const [activeTableId, setActiveTableId] = useState(STARTER_SCHEMA[0].id);

  // Hydrate from localStorage after mount to avoid SSR/client mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const loaded = normalizeSchema(JSON.parse(saved));
        setTables(loaded);
        setActiveTableId(prev => loaded.some(t => t.id === prev) ? prev : loaded[0]?.id ?? STARTER_SCHEMA[0].id);
      }
    } catch {
      // ignore — keep default
    }
  }, []);
  const [exportType, setExportType] = useState('sql');
  const [dialect, setDialect] = useState('postgres');
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState('Saved locally');
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tables }));
      setNotice('Saved locally');
    } catch {
      setNotice('Local save failed');
    }
  }, [tables]);

  useEffect(() => {
    if (!tables.some(table => table.id === activeTableId) && tables[0]) {
      setActiveTableId(tables[0].id);
    }
  }, [tables, activeTableId]);

  const activeTable = tables.find(table => table.id === activeTableId) || tables[0];
  const relationChoices = useMemo(() => tables.flatMap(table => table.fields.map(field => `${table.name}.${field.name}`)), [tables]);
  const warnings = useMemo(() => validateSchema(tables), [tables]);

  const exports = useMemo(() => ({
    sql: generateSql(tables, dialect),
    prisma: generatePrisma(tables),
    mongoose: generateMongoose(tables),
    firestore: generateFirestore(tables),
  }), [tables, dialect]);

  function addTable() {
    const nextName = `table_${tables.length + 1}`;
    const table = {
      id: uid('table'),
      name: nextName,
      fields: [
        { id: uid('field'), name: 'id', type: 'uuid', required: true, unique: true, primary: true, relation: '' },
      ],
    };
    setTables(prev => [...prev, table]);
    setActiveTableId(table.id);
  }

  function duplicateTable() {
    const copy = {
      ...activeTable,
      id: uid('table'),
      name: `${activeTable.name}_copy`,
      fields: activeTable.fields.map(field => ({
        ...field,
        id: uid('field'),
        relation: '',
      })),
    };
    setTables(prev => [...prev, copy]);
    setActiveTableId(copy.id);
  }

  function resetSample() {
    const next = cloneSchema(STARTER_SCHEMA);
    setTables(next);
    setActiveTableId(next[0].id);
  }

  function updateTableName(id, name) {
    const clean = name.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_');
    setTables(prev => prev.map(table => table.id === id ? { ...table, name: clean || 'table' } : table));
  }

  function removeTable(id) {
    if (tables.length === 1) return;
    const next = tables.filter(table => table.id !== id);
    setTables(next);
    if (activeTableId === id) setActiveTableId(next[0].id);
  }

  function addField() {
    setTables(prev => prev.map(table => table.id === activeTable.id ? {
      ...table,
      fields: [...table.fields, { id: uid('field'), name: `field_${table.fields.length + 1}`, type: 'string', required: false, unique: false, primary: false, relation: '' }],
    } : table));
  }

  function addIndex() {
    const firstField = activeTable.fields[0] && activeTable.fields[0].name;
    setTables(prev => prev.map(table => table.id === activeTable.id ? {
      ...table,
      indexes: [...(table.indexes || []), { id: uid('index'), name: `idx_${table.name}_${(table.indexes || []).length + 1}`, fields: firstField ? [firstField] : [], unique: false }],
    } : table));
  }

  function updateIndex(indexId, patch) {
    setTables(prev => prev.map(table => table.id === activeTable.id ? {
      ...table,
      indexes: (table.indexes || []).map(index => index.id === indexId ? { ...index, ...patch } : index),
    } : table));
  }

  function removeIndex(indexId) {
    setTables(prev => prev.map(table => table.id === activeTable.id ? {
      ...table,
      indexes: (table.indexes || []).filter(index => index.id !== indexId),
    } : table));
  }

  function applyTemplate(key) {
    const template = TEMPLATE_SCHEMAS[key];
    if (!template) return;
    const next = cloneSchema(template.tables);
    setTables(next);
    setActiveTableId(next[0].id);
    setNotice(`${template.label} template loaded`);
  }

  function updateField(fieldId, patch) {
    setTables(prev => prev.map(table => table.id === activeTable.id ? {
      ...table,
      fields: table.fields.map(field => field.id === fieldId ? { ...field, ...patch } : field),
    } : table));
  }

  function removeField(fieldId) {
    setTables(prev => prev.map(table => table.id === activeTable.id ? {
      ...table,
      fields: table.fields.length > 1 ? table.fields.filter(field => field.id !== fieldId) : table.fields,
    } : table));
  }

  async function copyExport() {
    await navigator.clipboard.writeText(exports[exportType]).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify({ tables }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'database-schema.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const next = normalizeSchema(JSON.parse(String(reader.result || '')));
        setTables(next);
        setActiveTableId(next[0].id);
        setNotice('Imported schema');
      } catch (err) {
        setNotice(err.message || 'Import failed');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  const relationCount = tables.reduce((sum, table) => sum + table.fields.filter(field => field.relation).length, 0);
  const fieldCount = tables.reduce((sum, table) => sum + table.fields.length, 0);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="database-schema-designer" />
      <header className={s.header}>
        <div className={s.brand}>
          <img src="/icons/database-schema-designer.svg" alt="" width={28} height={28} />
          <div>
            <h1>Database Schema Designer</h1>
            <p>Model tables, fields, keys, and relationships. Export production-ready starters.</p>
          </div>
        </div>
        <div className={s.stats}>
          <span>{tables.length} tables</span>
          <span>{fieldCount} fields</span>
          <span>{relationCount} relations</span>
          <span>{notice}</span>
          <select className={s.dialectSelect} value={dialect} onChange={e => setDialect(e.target.value)}>
            {Object.entries(DIALECTS).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
          </select>
          <button className={s.btn} onClick={resetSample}>Reset Sample</button>
          <button className={s.btn} onClick={() => fileInputRef.current && fileInputRef.current.click()}>Import JSON</button>
          <button className={s.btn} onClick={exportJson}>Export JSON</button>
          <input ref={fileInputRef} className={s.fileInput} type="file" accept="application/json,.json" onChange={importJson} />
        </div>
      </header>

      <main className={s.grid}>
        <aside className={s.sidebar}>
          <div className={s.sidebarHeader}>
            <span>Tables</span>
            <button className={s.iconBtn} onClick={addTable} title="Add table">+</button>
          </div>
          <div className={s.tableList}>
            <div className={s.templatePanel}>
              <div className={s.templateTitle}>Templates</div>
              {Object.entries(TEMPLATE_SCHEMAS).map(([key, template]) => (
                <button key={key} className={s.templateBtn} onClick={() => applyTemplate(key)}>{template.label}</button>
              ))}
            </div>
            {tables.map(table => (
              <button
                key={table.id}
                className={table.id === activeTable.id ? s.tableBtnActive : s.tableBtn}
                onClick={() => setActiveTableId(table.id)}
              >
                <span>{table.name}</span>
                <small>{table.fields.length} fields</small>
              </button>
            ))}
          </div>
        </aside>

        <section className={s.designer}>
          <div className={s.sectionHeader}>
            <div className={s.nameEditor}>
              <label>Table name</label>
              <input value={activeTable.name} onChange={e => updateTableName(activeTable.id, e.target.value)} />
            </div>
            <div className={s.actions}>
              <button className={s.btn} onClick={addField}>Add Field</button>
              <button className={s.btn} onClick={addIndex}>Add Index</button>
              <button className={s.btn} onClick={duplicateTable}>Duplicate Table</button>
              <button className={s.btnDanger} disabled={tables.length === 1} onClick={() => removeTable(activeTable.id)}>Delete Table</button>
            </div>
          </div>

          <div className={s.designerBody}>
            {warnings.length > 0 && (
              <div className={s.warningPanel}>
                <div className={s.warningTitle}>Schema checks</div>
                {warnings.slice(0, 5).map(warning => <div key={warning}>{warning}</div>)}
                {warnings.length > 5 && <div>{warnings.length - 5} more warnings</div>}
              </div>
            )}

            <div className={s.fieldTable}>
              <div className={s.fieldHead}>
                <span>Field</span>
                <span>Type</span>
                <span>Flags</span>
                <span>Relation</span>
                <span />
              </div>
              {activeTable.fields.map(field => (
                <div className={s.fieldRow} key={field.id}>
                  <input
                    value={field.name}
                    onChange={e => updateField(field.id, { name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                  />
                  <select value={field.type} onChange={e => updateField(field.id, { type: e.target.value })}>
                    {TYPE_OPTIONS.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <div className={s.flags}>
                    <label><input type="checkbox" checked={field.primary} onChange={e => updateField(field.id, { primary: e.target.checked, required: e.target.checked ? true : field.required, unique: e.target.checked ? true : field.unique })} /> PK</label>
                    <label><input type="checkbox" checked={field.required} onChange={e => updateField(field.id, { required: e.target.checked })} /> Req</label>
                    <label><input type="checkbox" checked={field.unique} onChange={e => updateField(field.id, { unique: e.target.checked })} /> Unique</label>
                  </div>
                  <select value={field.relation} onChange={e => updateField(field.id, { relation: e.target.value })}>
                    <option value="">No relation</option>
                    {relationChoices.filter(choice => choice !== `${activeTable.name}.${field.name}`).map(choice => (
                      <option key={choice} value={choice}>{choice}</option>
                    ))}
                  </select>
                  <button className={s.iconBtnMuted} onClick={() => removeField(field.id)} title="Remove field">x</button>
                </div>
              ))}
            </div>

            <div className={s.indexPanel}>
              <div className={s.indexHeader}>
                <span>Indexes</span>
                <small>{(activeTable.indexes || []).length} configured</small>
              </div>
              {(activeTable.indexes || []).length === 0 ? (
                <div className={s.emptyIndexes}>No indexes yet. Add one for lookup fields, unique slugs, or common filters.</div>
              ) : (
                (activeTable.indexes || []).map(index => (
                  <div className={s.indexRow} key={index.id}>
                    <input
                      value={index.name}
                      onChange={e => updateIndex(index.id, { name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                    />
                    <select
                      value={index.fields.join(',')}
                      onChange={e => updateIndex(index.id, { fields: e.target.value ? e.target.value.split(',') : [] })}
                    >
                      {activeTable.fields.map(field => (
                        <option key={field.id} value={field.name}>{field.name}</option>
                      ))}
                      {activeTable.fields.length > 1 && (
                        <option value={activeTable.fields.slice(0, 2).map(field => field.name).join(',')}>
                          {activeTable.fields.slice(0, 2).map(field => field.name).join(', ')}
                        </option>
                      )}
                    </select>
                    <label><input type="checkbox" checked={index.unique} onChange={e => updateIndex(index.id, { unique: e.target.checked })} /> Unique</label>
                    <button className={s.iconBtnMuted} onClick={() => removeIndex(index.id)} title="Remove index">x</button>
                  </div>
                ))
              )}
            </div>
            <SchemaDiagram tables={tables} />
          </div>
        </section>

        <section className={s.exporter}>
          <div className={s.exportHeader}>
            <div className={s.tabs}>
              <ExportPanel label="SQL" active={exportType === 'sql'} onSelect={() => setExportType('sql')} copied={copied} />
              <ExportPanel label="Prisma" active={exportType === 'prisma'} onSelect={() => setExportType('prisma')} copied={copied} />
              <ExportPanel label="Mongoose" active={exportType === 'mongoose'} onSelect={() => setExportType('mongoose')} copied={copied} />
              <ExportPanel label="Firestore" active={exportType === 'firestore'} onSelect={() => setExportType('firestore')} copied={copied} />
            </div>
            <button className={s.btn} onClick={copyExport}>Copy</button>
          </div>
          <pre className={s.output}>{exports[exportType]}</pre>
        </section>
      </main>
    </div>
  );
}
