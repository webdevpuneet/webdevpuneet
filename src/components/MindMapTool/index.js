'use client';
import { useState, useEffect, useRef, useCallback, useReducer, useMemo } from 'react';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import styles from './styles.module.css';
import GistSyncButton from '@/components/GistSyncButton';

// ─── constants ────────────────────────────────────────────────────────────────

const LS_ALL        = 'mm_all_maps';
const LS_ACTIVE     = 'mm_active_id';
const LS_DELETED    = 'mm_deleted_ids';
const LS_SYNC_EVENT = 'mm_idb_sync_event';
const IDB_NAME      = 'fwd_mind_map_studio';
const IDB_STORE     = 'mind_map_data';
const IDB_MAPS_KEY  = 'maps';
const IDB_CHANNEL   = 'fwd_mind_map_idb_sync';
const LOCAL_SAVE_DEBOUNCE = 500;
const NODE_W        = 154;
const NODE_H        = 44;
const COLORS        = ['#6366f1','#22d3ee','#10b981','#f59e0b','#ef4444','#ec4899','#8b5cf6','#64748b'];
const MAX_UNDO      = 60;
const STATUS_OPTIONS = ['none', 'todo', 'idea', 'risk', 'done'];
const PRIORITY_OPTIONS = ['none', 'low', 'medium', 'high'];

// ─── uid / time helpers ───────────────────────────────────────────────────────

const uid = () => crypto.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`;
const now = () => new Date().toISOString();

// ─── templates ────────────────────────────────────────────────────────────────

function openMindMapDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available'));
      return;
    }
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open IndexedDB'));
  });
}

async function idbGet(key) {
  const db = await openMindMapDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readonly');
    const request = tx.objectStore(IDB_STORE).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB read failed'));
    tx.oncomplete = () => db.close();
    tx.onerror = () => { db.close(); reject(tx.error || new Error('IndexedDB transaction failed')); };
  });
}

async function idbSet(key, value) {
  const db = await openMindMapDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const request = tx.objectStore(IDB_STORE).put(value, key);
    request.onerror = () => reject(request.error || new Error('IndexedDB write failed'));
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error || new Error('IndexedDB transaction failed')); };
  });
}

async function loadMapsFromStorage() {
  try {
    const idbMaps = await idbGet(IDB_MAPS_KEY);
    if (Array.isArray(idbMaps) && idbMaps.length) return idbMaps;
  } catch {}

  try {
    const raw = localStorage.getItem(LS_ALL);
    if (!raw) return [];
    const maps = JSON.parse(raw);
    if (Array.isArray(maps) && maps.length) {
      idbSet(IDB_MAPS_KEY, maps).catch(() => {});
      return maps;
    }
  } catch {}
  return [];
}

function saveMapsToStorage(maps) {
  return idbSet(IDB_MAPS_KEY, maps).catch(() => {
    try { localStorage.setItem(LS_ALL, JSON.stringify(maps)); } catch {}
  });
}

const TEMPLATES = {
  blank: { name: 'Blank Map', nodes: [], edges: [], inbox: [] },
  default: {
    name: 'New Map',
    nodes: [
      { id: 'root', text: 'Central Idea', x: 0,   y: 0,    color: '#6366f1', updatedAt: now(), notes: '' },
      { id: 'n1',   text: 'Topic One',    x: 260,  y: -110, color: '#22d3ee', updatedAt: now(), notes: '' },
      { id: 'n2',   text: 'Topic Two',    x: 260,  y: 0,    color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'n3',   text: 'Topic Three',  x: 260,  y: 110,  color: '#f59e0b', updatedAt: now(), notes: '' },
    ],
    edges: [
      { id: 'e1', from: 'root', to: 'n1' },
      { id: 'e2', from: 'root', to: 'n2' },
      { id: 'e3', from: 'root', to: 'n3' },
    ],
    inbox: [],
  },
  swot: {
    name: 'SWOT Analysis',
    nodes: [
      { id: 'c',  text: 'SWOT Analysis', x: 0,    y: 0,    color: '#6366f1', updatedAt: now(), notes: '' },
      { id: 's',  text: 'Strengths',     x: -240, y: -120, color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'w',  text: 'Weaknesses',    x: 240,  y: -120, color: '#ef4444', updatedAt: now(), notes: '' },
      { id: 'o',  text: 'Opportunities', x: -240, y: 120,  color: '#22d3ee', updatedAt: now(), notes: '' },
      { id: 't',  text: 'Threats',       x: 240,  y: 120,  color: '#f59e0b', updatedAt: now(), notes: '' },
      { id: 's1', text: 'Add strength…', x: -480, y: -170, color: '#10b981', updatedAt: now(), notes: '' },
      { id: 's2', text: 'Add strength…', x: -480, y: -80,  color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'w1', text: 'Add weakness…', x: 480,  y: -170, color: '#ef4444', updatedAt: now(), notes: '' },
      { id: 'w2', text: 'Add weakness…', x: 480,  y: -80,  color: '#ef4444', updatedAt: now(), notes: '' },
      { id: 'o1', text: 'Add opportunity…', x: -480, y: 80,  color: '#22d3ee', updatedAt: now(), notes: '' },
      { id: 'o2', text: 'Add opportunity…', x: -480, y: 170, color: '#22d3ee', updatedAt: now(), notes: '' },
      { id: 't1', text: 'Add threat…',   x: 480,  y: 80,   color: '#f59e0b', updatedAt: now(), notes: '' },
      { id: 't2', text: 'Add threat…',   x: 480,  y: 170,  color: '#f59e0b', updatedAt: now(), notes: '' },
    ],
    edges: [
      { id: 'e1', from: 'c', to: 's' }, { id: 'e2', from: 'c', to: 'w' },
      { id: 'e3', from: 'c', to: 'o' }, { id: 'e4', from: 'c', to: 't' },
      { id: 'e5', from: 's', to: 's1' }, { id: 'e6', from: 's', to: 's2' },
      { id: 'e7', from: 'w', to: 'w1' }, { id: 'e8', from: 'w', to: 'w2' },
      { id: 'e9', from: 'o', to: 'o1' }, { id: 'e10', from: 'o', to: 'o2' },
      { id: 'e11', from: 't', to: 't1' }, { id: 'e12', from: 't', to: 't2' },
    ],
    inbox: [],
  },
  proscons: {
    name: 'Pros & Cons',
    nodes: [
      { id: 'c',  text: 'Decision',   x: 0,    y: 0,    color: '#6366f1', updatedAt: now(), notes: '' },
      { id: 'p',  text: 'Pros',       x: -220, y: 0,    color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'n',  text: 'Cons',       x: 220,  y: 0,    color: '#ef4444', updatedAt: now(), notes: '' },
      { id: 'p1', text: 'Pro one…',   x: -440, y: -80,  color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'p2', text: 'Pro two…',   x: -440, y: 0,    color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'p3', text: 'Pro three…', x: -440, y: 80,   color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'n1', text: 'Con one…',   x: 440,  y: -80,  color: '#ef4444', updatedAt: now(), notes: '' },
      { id: 'n2', text: 'Con two…',   x: 440,  y: 0,    color: '#ef4444', updatedAt: now(), notes: '' },
      { id: 'n3', text: 'Con three…', x: 440,  y: 80,   color: '#ef4444', updatedAt: now(), notes: '' },
    ],
    edges: [
      { id: 'e1', from: 'c', to: 'p' }, { id: 'e2', from: 'c', to: 'n' },
      { id: 'e3', from: 'p', to: 'p1' }, { id: 'e4', from: 'p', to: 'p2' }, { id: 'e5', from: 'p', to: 'p3' },
      { id: 'e6', from: 'n', to: 'n1' }, { id: 'e7', from: 'n', to: 'n2' }, { id: 'e8', from: 'n', to: 'n3' },
    ],
    inbox: [],
  },
  weekly: {
    name: 'Weekly Plan',
    nodes: [
      { id: 'c',   text: 'This Week',  x: 0,    y: 0,    color: '#6366f1', updatedAt: now(), notes: '' },
      { id: 'mon', text: 'Monday',     x: -400, y: -200, color: '#22d3ee', updatedAt: now(), notes: '' },
      { id: 'tue', text: 'Tuesday',    x: 0,    y: -260, color: '#10b981', updatedAt: now(), notes: '' },
      { id: 'wed', text: 'Wednesday',  x: 400,  y: -200, color: '#f59e0b', updatedAt: now(), notes: '' },
      { id: 'thu', text: 'Thursday',   x: 400,  y: 200,  color: '#ec4899', updatedAt: now(), notes: '' },
      { id: 'fri', text: 'Friday',     x: 0,    y: 260,  color: '#8b5cf6', updatedAt: now(), notes: '' },
      { id: 'sat', text: 'Saturday',   x: -400, y: 200,  color: '#ef4444', updatedAt: now(), notes: '' },
    ],
    edges: [
      { id: 'e1', from: 'c', to: 'mon' }, { id: 'e2', from: 'c', to: 'tue' },
      { id: 'e3', from: 'c', to: 'wed' }, { id: 'e4', from: 'c', to: 'thu' },
      { id: 'e5', from: 'c', to: 'fri' }, { id: 'e6', from: 'c', to: 'sat' },
    ],
    inbox: [],
  },
};

// ─── map factory ──────────────────────────────────────────────────────────────

function makeMap(templateKey = 'default', nameOverride) {
  const tpl = TEMPLATES[templateKey] || TEMPLATES.default;
  const idMap = {};
  const nodes = tpl.nodes.map(n => {
    const newId = uid();
    idMap[n.id] = newId;
    return { ...n, id: newId, updatedAt: now() };
  });
  const edges = (tpl.edges || []).map(e => ({
    ...e,
    id: uid(),
    from: idMap[e.from] || e.from,
    to:   idMap[e.to]   || e.to,
  }));
  return {
    id: uid(),
    name: nameOverride || tpl.name,
    createdAt: now(),
    updatedAt: now(),
    nodes,
    edges,
    inbox: [...tpl.inbox],
  };
}

// ─── edge helpers ─────────────────────────────────────────────────────────────

function edgePath(n1, n2) {
  const tension = Math.min(Math.abs(n2.x - n1.x) * 0.5, 120);
  return `M ${n1.x} ${n1.y} C ${n1.x + tension} ${n1.y} ${n2.x - tension} ${n2.y} ${n2.x} ${n2.y}`;
}

function dedupeEdges(arr) {
  const seen = new Set();
  return arr.filter(e => { const k = `${e.from}→${e.to}`; if (seen.has(k)) return false; seen.add(k); return true; });
}

function mergeById(local, remote) {
  const map = new Map();
  [...(local || []), ...(remote || [])].forEach(item => {
    const existing = map.get(item.id);
    if (!existing || (item.updatedAt || '') >= (existing.updatedAt || '')) map.set(item.id, item);
  });
  return Array.from(map.values());
}

function loadDeletedMapIds() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_DELETED) || '[]')); } catch { return new Set(); }
}
function addDeletedMapId(id) {
  try {
    const ids = loadDeletedMapIds();
    ids.add(id);
    localStorage.setItem(LS_DELETED, JSON.stringify([...ids]));
  } catch {}
}
function mergeDeletedMapIds(remoteIds) {
  try {
    const ids = loadDeletedMapIds();
    (remoteIds || []).forEach(id => ids.add(id));
    localStorage.setItem(LS_DELETED, JSON.stringify([...ids]));
    return ids;
  } catch { return loadDeletedMapIds(); }
}

function mergeMaps(localMaps, remoteMaps, deletedIds = new Set()) {
  const map = new Map();
  [...(localMaps || []), ...(remoteMaps || [])].forEach(m => {
    if (deletedIds.has(m.id)) return;
    const existing = map.get(m.id);
    if (!existing || (m.updatedAt || '') >= (existing.updatedAt || '')) {
      map.set(m.id, {
        ...m,
        nodes: existing ? mergeById(m.nodes, existing.nodes) : m.nodes,
        edges: existing ? dedupeEdges([...(m.edges || []), ...(existing.edges || [])]) : m.edges,
        inbox: existing ? mergeById(m.inbox, existing.inbox) : m.inbox,
      });
    }
  });
  return Array.from(map.values()).sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
}

function toMarkdown(nodes, edges) {
  const children = {};
  const roots = new Set(nodes.map(n => n.id));
  edges.forEach(e => {
    children[e.from] = children[e.from] || [];
    children[e.from].push(e.to);
    roots.delete(e.to);
  });
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const lines = [];
  function walk(id, depth) {
    const n = nodeMap[id]; if (!n) return;
    lines.push('  '.repeat(depth) + `- ${n.text}`);
    if (n.notes) lines.push('  '.repeat(depth + 1) + `  > ${n.notes}`);
    (children[id] || []).forEach(cid => walk(cid, depth + 1));
  }
  roots.forEach(id => walk(id, 0));
  return lines.join('\n') || nodes.map(n => `- ${n.text}`).join('\n');
}

// ─── GithubIcon ───────────────────────────────────────────────────────────────

function buildTree(nodes, edges) {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const children = new Map(nodes.map(n => [n.id, []]));
  const parentOf = new Map();
  edges.forEach(e => {
    if (!nodeMap.has(e.from) || !nodeMap.has(e.to)) return;
    children.get(e.from)?.push(e.to);
    if (!parentOf.has(e.to)) parentOf.set(e.to, e.from);
  });
  const roots = nodes.filter(n => !parentOf.has(n.id)).map(n => n.id);
  return { nodeMap, children, parentOf, roots: roots.length ? roots : nodes.slice(0, 1).map(n => n.id) };
}

function getDescendants(rootId, children) {
  const out = [];
  const stack = [...(children.get(rootId) || [])];
  while (stack.length) {
    const id = stack.shift();
    out.push(id);
    stack.unshift(...(children.get(id) || []));
  }
  return out;
}

function getVisibleIds(tree) {
  const visible = new Set();
  const walk = id => {
    const node = tree.nodeMap.get(id);
    if (!node || visible.has(id)) return;
    visible.add(id);
    if (node.collapsed) return;
    (tree.children.get(id) || []).forEach(walk);
  };
  tree.roots.forEach(walk);
  return visible;
}

function layoutNodes(nodes, edges, mode, startId = null) {
  if (!nodes.length) return nodes;
  const tree = buildTree(nodes, edges);
  const scope = startId ? new Set([startId, ...getDescendants(startId, tree.children)]) : new Set(nodes.map(n => n.id));
  const roots = startId ? [startId] : tree.roots.filter(id => scope.has(id));
  const positions = new Map();
  let cursorY = 0;
  const gapX = mode === 'tree' ? 210 : 235;
  const gapY = 84;

  const measure = id => {
    const kids = (tree.children.get(id) || []).filter(cid => scope.has(cid));
    if (!kids.length) return 1;
    return kids.reduce((sum, cid) => sum + measure(cid), 0);
  };

  const placeTree = (id, depth, baseX = 0) => {
    const kids = (tree.children.get(id) || []).filter(cid => scope.has(cid));
    if (!kids.length) {
      positions.set(id, { x: baseX + depth * gapX, y: cursorY * gapY });
      cursorY += 1;
      return positions.get(id).y;
    }
    const childYs = kids.map(cid => placeTree(cid, depth + 1, baseX));
    const y = childYs.reduce((a, b) => a + b, 0) / childYs.length;
    positions.set(id, { x: baseX + depth * gapX, y });
    return y;
  };

  if (mode === 'radial') {
    roots.forEach((rootId, rootIndex) => {
      const cx = rootIndex * 520;
      const cy = 0;
      positions.set(rootId, { x: cx, y: cy });
      const levels = new Map();
      const queue = [{ id: rootId, depth: 0 }];
      while (queue.length) {
        const item = queue.shift();
        (tree.children.get(item.id) || []).filter(cid => scope.has(cid)).forEach(cid => {
          const depth = item.depth + 1;
          if (!levels.has(depth)) levels.set(depth, []);
          levels.get(depth).push(cid);
          queue.push({ id: cid, depth });
        });
      }
      levels.forEach((ids, depth) => {
        const radius = 150 + (depth - 1) * 145;
        ids.forEach((id, i) => {
          const angle = (-Math.PI / 2) + (Math.PI * 2 * i) / ids.length;
          positions.set(id, { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
        });
      });
    });
  } else {
    roots.forEach((rootId, rootIndex) => {
      const before = cursorY;
      placeTree(rootId, 0, rootIndex * 420);
      if (rootIndex < roots.length - 1) cursorY = Math.max(cursorY, before + measure(rootId) + 1);
    });
    const ys = [...positions.values()].map(p => p.y);
    const minY = ys.length ? Math.min(...ys) : 0;
    positions.forEach((p, id) => positions.set(id, { ...p, y: p.y - minY }));
    if (mode === 'tree') {
      positions.forEach((p, id) => positions.set(id, { x: p.y, y: p.x }));
    }
  }

  const targetNodes = nodes.filter(n => scope.has(n.id));
  const minX = targetNodes.length ? Math.min(...targetNodes.map(n => n.x)) : 0;
  const minY = targetNodes.length ? Math.min(...targetNodes.map(n => n.y)) : 0;
  const layoutMinX = positions.size ? Math.min(...[...positions.values()].map(p => p.x)) : 0;
  const layoutMinY = positions.size ? Math.min(...[...positions.values()].map(p => p.y)) : 0;
  return nodes.map(n => {
    const p = positions.get(n.id);
    if (!p) return n;
    return { ...n, x: minX + p.x - layoutMinX, y: minY + p.y - layoutMinY, updatedAt: now() };
  });
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export default function MindMapTool() {
  // ── maps state ──
  const [maps,     setMaps]     = useState([]);
  const [activeId, setActiveId] = useState('');
  const [mounted,  setMounted]  = useState(false);

  // ── per-map canvas state ──
  const [selectedId,   setSelectedId]   = useState(null);
  const [editingId,    setEditingId]    = useState(null);
  const [editText,     setEditText]     = useState('');
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesText,    setNotesText]    = useState('');
  const [viewport,     setViewport]     = useState({ x: 0, y: 0, zoom: 1 });
  const [drawEdge,     setDrawEdge]     = useState(null);

  // ── undo/redo ──
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  // ── inbox ──
  const [inboxInput, setInboxInput] = useState('');

  // ── search ──
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');

  // ── map library panel ──
  const [renamingId,   setRenamingId]   = useState(null);
  const [renameText,   setRenameText]   = useState('');
  const [showTemplates,setShowTemplates]= useState(false);
  const [dragOutlineId,setDragOutlineId]= useState(null);
  const [metadataFilter,setMetadataFilter]= useState('all');
  const [presenting, setPresenting] = useState(false);
  const [presentIndex, setPresentIndex] = useState(0);

  // ── refs ──
  const canvasRef    = useRef(null);
  const innerRef     = useRef(null);
  const panRef       = useRef(null);
  const searchRef    = useRef(null);
  const mapsRef      = useRef(maps);
  const activeIdRef  = useRef(activeId);
  const viewRef      = useRef(viewport);
  const saveTimer    = useRef(null);
  const broadcastRef = useRef(null);
  const tabIdRef     = useRef(uid());
  const syncRef      = useRef(null);

  useEffect(() => { mapsRef.current    = maps;     }, [maps]);
  useEffect(() => { activeIdRef.current= activeId; }, [activeId]);
  useEffect(() => { viewRef.current    = viewport; }, [viewport]);

  // ── derived active map ──
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(IDB_CHANNEL);
        broadcastRef.current = channel;
        channel.onmessage = e => {
          const msg = e.data || {};
          if (msg.type !== 'maps-updated' || msg.source === tabIdRef.current) return;
          applyExternalMaps(msg.maps);
        };
      } catch {}
    }

    const onStorage = e => {
      if (e.key !== LS_SYNC_EVENT || !e.newValue) return;
      try {
        const msg = JSON.parse(e.newValue);
        if (msg.source === tabIdRef.current) return;
      } catch {}
      loadMapsFromStorage().then(applyExternalMaps);
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      try { broadcastRef.current?.close(); } catch {}
      broadcastRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const activeMap = maps.find(m => m.id === activeId) || maps[0];
  const nodes  = activeMap?.nodes  || [];
  const edges  = activeMap?.edges  || [];
  const inbox  = activeMap?.inbox  || [];
  const tree = useMemo(() => buildTree(nodes, edges), [nodes, edges]);
  const visibleIds = useMemo(() => getVisibleIds(tree), [tree]);
  const visibleNodes = useMemo(() => nodes.filter(n => visibleIds.has(n.id)), [nodes, visibleIds]);
  const visibleEdges = useMemo(() => edges.filter(e => visibleIds.has(e.from) && visibleIds.has(e.to)), [edges, visibleIds]);
  const outlineNodes = useMemo(() => {
    const rows = [];
    const walk = (id, depth) => {
      const node = tree.nodeMap.get(id);
      if (!node) return;
      const childIds = tree.children.get(id) || [];
      if (metadataFilter === 'all' || node.status === metadataFilter) rows.push({ node, depth, childCount: childIds.length });
      if (!node.collapsed) childIds.forEach(cid => walk(cid, depth + 1));
    };
    tree.roots.forEach(id => walk(id, 0));
    return rows;
  }, [tree, metadataFilter]);
  const presentationSlides = useMemo(() => {
    const rows = [];
    const walk = (id, depth) => {
      const node = tree.nodeMap.get(id);
      if (!node || !visibleIds.has(id)) return;
      const childIds = (tree.children.get(id) || []).filter(cid => visibleIds.has(cid));
      rows.push({ node, depth, children: childIds.map(cid => tree.nodeMap.get(cid)).filter(Boolean) });
      childIds.forEach(cid => walk(cid, depth + 1));
    };
    tree.roots.forEach(id => walk(id, 0));
    return rows;
  }, [tree, visibleIds]);

  // ── save helpers ──
  function applyExternalMaps(incomingMaps) {
    if (!Array.isArray(incomingMaps) || !incomingMaps.length) return;
    setMaps(prev => {
      const merged = mergeMaps(prev, incomingMaps, loadDeletedMapIds());
      const activeExists = merged.some(m => m.id === activeIdRef.current);
      if (!activeExists && merged[0]) setActiveId(merged[0].id);
      return merged;
    });
  }

  function notifyIndexedDbSync(newMaps) {
    const message = { type: 'maps-updated', source: tabIdRef.current, maps: newMaps, updatedAt: now() };
    try { broadcastRef.current?.postMessage(message); } catch {}
    try { localStorage.setItem(LS_SYNC_EVENT, JSON.stringify({ source: message.source, updatedAt: message.updatedAt })); } catch {}
  }

  function persistAll(newMaps) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveMapsToStorage(newMaps).then(() => notifyIndexedDbSync(newMaps));
    }, LOCAL_SAVE_DEBOUNCE);
  }

  function updateActiveMap(patch, pushUndo = true) {
    setMaps(prev => {
      const next = prev.map(m => {
        if (m.id !== activeIdRef.current) return m;
        if (pushUndo) {
          undoStack.current.push({ nodes: m.nodes, edges: m.edges, inbox: m.inbox });
          if (undoStack.current.length > MAX_UNDO) undoStack.current.shift();
          redoStack.current = [];
        }
        return { ...m, ...patch, updatedAt: now() };
      });
      persistAll(next);
      syncRef.current?.forcePush();
      return next;
    });
  }

  // ── undo / redo ──
  function undo() {
    if (!undoStack.current.length) return;
    const snapshot = undoStack.current.pop();
    setMaps(prev => {
      const current = prev.find(m => m.id === activeIdRef.current);
      if (current) redoStack.current.push({ nodes: current.nodes, edges: current.edges, inbox: current.inbox });
      const next = prev.map(m => m.id === activeIdRef.current ? { ...m, ...snapshot, updatedAt: now() } : m);
      persistAll(next);
      return next;
    });
  }

  function redo() {
    if (!redoStack.current.length) return;
    const snapshot = redoStack.current.pop();
    setMaps(prev => {
      const current = prev.find(m => m.id === activeIdRef.current);
      if (current) undoStack.current.push({ nodes: current.nodes, edges: current.edges, inbox: current.inbox });
      const next = prev.map(m => m.id === activeIdRef.current ? { ...m, ...snapshot, updatedAt: now() } : m);
      persistAll(next);
      return next;
    });
  }

  // ── close search on Escape ──
  useEffect(() => {
    if (!searchOpen) return;
    const h = e => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [searchOpen]);

  useEffect(() => {
    if (!presenting) return;
    const h = e => {
      if (e.key === 'Escape') { setPresenting(false); return; }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        movePresentation(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        movePresentation(-1);
      }
      if (e.key === 'Home') { e.preventDefault(); setPresentIndex(0); }
      if (e.key === 'End') { e.preventDefault(); setPresentIndex(Math.max(presentationSlides.length - 1, 0)); }
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [presenting, presentationSlides.length]);

  useEffect(() => {
    if (!presenting) return;
    if (!presentationSlides.length) setPresenting(false);
    else setPresentIndex(i => Math.min(i, presentationSlides.length - 1));
  }, [presenting, presentationSlides.length]);

  // ── mount: load saved maps ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const loaded = await loadMapsFromStorage();
      if (cancelled) return;
      if (Array.isArray(loaded) && loaded.length) {
        setMaps(loaded);
        const savedActive = localStorage.getItem(LS_ACTIVE);
        const found = loaded.find(m => m.id === savedActive);
        setActiveId(found ? found.id : loaded[0].id);
      } else {
        const m = makeMap('default');
        setMaps([m]);
        setActiveId(m.id);
        saveMapsToStorage([m]);
      }
      setMounted(true);
      centerView();
    })();
    return () => { cancelled = true; };
  }, []);

  // persist active map id
  useEffect(() => {
    if (activeId) {
      try { localStorage.setItem(LS_ACTIVE, activeId); } catch {}
    }
  }, [activeId]);

  // ── reset undo stack when switching maps ──
  useEffect(() => {
    undoStack.current = [];
    redoStack.current = [];
    setSelectedId(null);
    setEditingId(null);
    setEditingNotes(false);
  }, [activeId]);

  async function getLocalData() {
    return { maps: mapsRef.current, deletedIds: [...loadDeletedMapIds()] };
  }

  async function onPullData(remote) {
    const remoteMaps = Array.isArray(remote) ? remote : (remote.maps || []);
    const allDeletedIds = mergeDeletedMapIds(remote.deletedIds || []);
    const merged = mergeMaps(mapsRef.current, remoteMaps, allDeletedIds);
    setMaps(merged);
    persistAll(merged);
  }

  // ── coordinate helpers ──
  function screenToWorld(sx, sy) {
    const rect = canvasRef.current.getBoundingClientRect();
    const v = viewRef.current;
    return { x: (sx - rect.left - v.x) / v.zoom, y: (sy - rect.top - v.y) / v.zoom };
  }

  // ── canvas pan (pointer on background) — no scroll zoom ──
  function onCanvasPointerDown(e) {
    const isBackground = e.target === canvasRef.current || e.target === innerRef.current || !!e.target.dataset.bg;
    if (!isBackground) return;
    if (editingId) commitEdit();
    if (editingNotes) commitNotes();
    setSelectedId(null);
    panRef.current = { x: e.clientX, y: e.clientY, vx: viewRef.current.x, vy: viewRef.current.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onCanvasPointerMove(e) {
    if (!panRef.current) return;
    const dx = e.clientX - panRef.current.x, dy = e.clientY - panRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) panRef.current.moved = true;
    const vx = panRef.current.vx, vy = panRef.current.vy;
    setViewport(v => ({ ...v, x: vx + dx, y: vy + dy }));
  }

  function onCanvasPointerUp(e) {
    if (!panRef.current) return;
    panRef.current = null;
  }

  // ── zoom controls ──
  function zoomTo(nz) {
    setViewport(v => {
      const cx = canvasRef.current?.clientWidth  / 2 || 400;
      const cy = canvasRef.current?.clientHeight / 2 || 300;
      const sc = nz / v.zoom;
      return { zoom: nz, x: cx - sc * (cx - v.x), y: cy - sc * (cy - v.y) };
    });
  }
  function zoomIn() {
    setViewport(v => {
      const nz = Math.min(2.5, v.zoom * 1.2);
      const cx = canvasRef.current?.clientWidth  / 2 || 400;
      const cy = canvasRef.current?.clientHeight / 2 || 300;
      const sc = nz / v.zoom;
      return { zoom: nz, x: cx - sc * (cx - v.x), y: cy - sc * (cy - v.y) };
    });
  }
  function zoomOut() {
    setViewport(v => {
      const nz = Math.max(0.18, v.zoom * 0.82);
      const cx = canvasRef.current?.clientWidth  / 2 || 400;
      const cy = canvasRef.current?.clientHeight / 2 || 300;
      const sc = nz / v.zoom;
      return { zoom: nz, x: cx - sc * (cx - v.x), y: cy - sc * (cy - v.y) };
    });
  }

  // ── draw-edge live preview ──
  useEffect(() => {
    if (!drawEdge) return;
    function onMove(e) {
      const w = screenToWorld(e.clientX, e.clientY);
      setDrawEdge(d => d ? { ...d, toX: w.x, toY: w.y } : null);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  // ── keyboard shortcuts ──
  useEffect(() => {
    function onKey(e) {
      const ctrl = e.ctrlKey || e.metaKey;
      if (presenting) return;
      if (ctrl && e.key === 'z') { e.preventDefault(); undo(); return; }
      if (ctrl && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); return; }
      if (ctrl && e.key === 'f') { e.preventDefault(); setSearchOpen(s => !s); return; }
      if (editingId || editingNotes) return;
      if (e.key === 'Escape') { setSelectedId(null); setDrawEdge(null); setSearchOpen(false); setSearchQuery(''); }
      if ((e.key === 'p' || e.key === 'P') && presentationSlides.length) { e.preventDefault(); startPresentation(); }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        deleteNode(selectedId);
      }
      if (e.key === 'Tab' && selectedId) { e.preventDefault(); addChildNode(selectedId); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, editingId, editingNotes, presenting]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── node CRUD ──
  function createNode(x, y, connectFrom = null, initialText = '') {
    const parent = connectFrom ? nodes.find(n => n.id === connectFrom) : null;
    const color  = parent?.color ?? '#6366f1';
    const id     = uid();
    const node   = { id, text: initialText, x, y, color, updatedAt: now(), notes: '', status: 'none', priority: 'none', owner: '', dueDate: '', tags: [] };
    const newNodes = [...nodes, node];
    const newEdges = connectFrom
      ? dedupeEdges([...edges, { id: uid(), from: connectFrom, to: id }])
      : edges;
    updateActiveMap({ nodes: newNodes, edges: newEdges });
    setSelectedId(id);
    setEditingId(id);
    setEditText(initialText);
    return id;
  }

  function deleteNode(id) {
    updateActiveMap({ nodes: nodes.filter(n => n.id !== id), edges: edges.filter(e => e.from !== id && e.to !== id) });
    setSelectedId(null);
    setEditingId(null);
  }

  function deleteEdge(id) {
    updateActiveMap({ edges: edges.filter(e => e.id !== id) });
  }

  function updateColor(id, color) {
    updateActiveMap({ nodes: nodes.map(n => n.id === id ? { ...n, color, updatedAt: now() } : n) });
  }

  function updateNodeMeta(id, patch) {
    updateActiveMap({ nodes: nodes.map(n => n.id === id ? { ...n, ...patch, updatedAt: now() } : n) }, false);
  }

  function toggleCollapse(id) {
    updateActiveMap({ nodes: nodes.map(n => n.id === id ? { ...n, collapsed: !n.collapsed, updatedAt: now() } : n) });
  }

  function jumpToNode(id) {
    const node = nodes.find(n => n.id === id);
    if (!node || !canvasRef.current) return;
    setSelectedId(id);
    const rect = canvasRef.current.getBoundingClientRect();
    const z = Math.max(viewRef.current.zoom, 0.85);
    setViewport({ x: rect.width / 2 - node.x * z, y: rect.height / 2 - node.y * z, zoom: z });
  }

  function applyLayout(mode, branchOnly = false) {
    const startId = branchOnly ? selectedId : null;
    if (branchOnly && !startId) return;
    const nextNodes = layoutNodes(nodes, edges, mode, startId);
    updateActiveMap({ nodes: nextNodes });
    const nextTree = buildTree(nextNodes, edges);
    const nextVisible = nextNodes.filter(n => getVisibleIds(nextTree).has(n.id));
    requestAnimationFrame(() => fitNodeSet(nextVisible.length ? nextVisible : nextNodes));
  }

  function startPresentation(startId = selectedId) {
    if (!presentationSlides.length) return;
    const startIndex = startId ? presentationSlides.findIndex(s => s.node.id === startId) : -1;
    setPresentIndex(startIndex >= 0 ? startIndex : 0);
    setPresenting(true);
  }

  function movePresentation(delta) {
    setPresentIndex(i => Math.min(Math.max(i + delta, 0), Math.max(presentationSlides.length - 1, 0)));
  }

  function reorderOutlineNode(dragId, dropId) {
    if (!dragId || !dropId || dragId === dropId) return;
    const dragParent = tree.parentOf.get(dragId) || '';
    const dropParent = tree.parentOf.get(dropId) || '';
    if (dragParent !== dropParent) return;
    const siblings = edges.filter(e => (e.from || '') === dragParent && tree.nodeMap.has(e.to));
    if (!siblings.length) return;
    const fromIndex = siblings.findIndex(e => e.to === dragId);
    const toIndex = siblings.findIndex(e => e.to === dropId);
    if (fromIndex < 0 || toIndex < 0) return;
    const reordered = [...siblings];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    const siblingIds = new Set(siblings.map(e => e.id));
    const nextEdges = edges.filter(e => !siblingIds.has(e.id));
    updateActiveMap({ edges: [...nextEdges, ...reordered] });
  }

  function addChildNode(parentId) {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;
    const siblings = edges.filter(e => e.from === parentId).length;
    const oy = (siblings - Math.floor(siblings / 2)) * 70 * (siblings % 2 === 0 ? 1 : -1);
    createNode(parent.x + 220, parent.y + oy, parentId);
  }

  // ── edit node text ──
  function commitEdit() {
    const text = editText.trim();
    if (editingId) {
      if (text) updateActiveMap({ nodes: nodes.map(n => n.id === editingId ? { ...n, text, updatedAt: now() } : n) }, false);
      else deleteNode(editingId);
    }
    setEditingId(null);
    setEditText('');
  }

  // ── edit node notes ──
  function commitNotes() {
    if (editingId || !selectedId) { setEditingNotes(false); return; }
    updateActiveMap({ nodes: nodes.map(n => n.id === selectedId ? { ...n, notes: notesText, updatedAt: now() } : n) }, false);
    setEditingNotes(false);
  }

  // ── node drag ──
  function onNodePointerDown(e, nodeId) {
    if (e.target.dataset.handle || e.target.dataset.action) return;
    e.stopPropagation();
    if (editingId && editingId !== nodeId) commitEdit();
    if (editingNotes) commitNotes();
    setSelectedId(nodeId);

    const startX = e.clientX, startY = e.clientY;
    const node = nodes.find(n => n.id === nodeId);
    const nx0 = node.x, ny0 = node.y;
    let moved = false;

    function onMove(me) {
      const dx = (me.clientX - startX) / viewRef.current.zoom;
      const dy = (me.clientY - startY) / viewRef.current.zoom;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
      setMaps(prev => prev.map(m => m.id === activeIdRef.current
        ? { ...m, nodes: m.nodes.map(n => n.id === nodeId ? { ...n, x: nx0 + dx, y: ny0 + dy } : n) }
        : m
      ));
    }
    function onUp() {
      if (!moved && selectedId === nodeId) {
        const n = mapsRef.current.find(m => m.id === activeIdRef.current)?.nodes.find(n => n.id === nodeId);
        if (n) { setEditingId(nodeId); setEditText(n.text); }
      } else if (moved) {
        const finalMaps = mapsRef.current.map(m => m.id === activeIdRef.current
          ? { ...m, updatedAt: now(), nodes: m.nodes.map(n => n.id === nodeId ? { ...n, updatedAt: now() } : n) }
          : m
        );
        setMaps(finalMaps);
        persistAll(finalMaps);
        syncRef.current?.forcePush();
      }
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  // ── connection handle ──
  function onHandlePointerDown(e, fromId) {
    e.stopPropagation();
    const w = screenToWorld(e.clientX, e.clientY);
    setDrawEdge({ fromId, toX: w.x, toY: w.y });

    function onUp(ue) {
      const nodeEl = ue.target.closest('[data-nodeid]');
      if (nodeEl) {
        const toId = nodeEl.dataset.nodeid;
        if (toId && toId !== fromId) {
          updateActiveMap({ edges: dedupeEdges([...edges, { id: uid(), from: fromId, to: toId }]) });
        }
      } else {
        const w2 = screenToWorld(ue.clientX, ue.clientY);
        createNode(w2.x, w2.y, fromId);
      }
      setDrawEdge(null);
      window.removeEventListener('pointerup', onUp);
    }
    window.addEventListener('pointerup', onUp);
  }

  // ── inbox ──
  function addToInbox() {
    const text = inboxInput.trim();
    if (!text) return;
    updateActiveMap({ inbox: [{ id: uid(), text, createdAt: now() }, ...inbox] });
    setInboxInput('');
  }

  function deleteInboxItem(id) {
    updateActiveMap({ inbox: inbox.filter(i => i.id !== id) });
  }

  function promoteToCanvas(item) {
    const v = viewRef.current;
    const cx = (-v.x + window.innerWidth / 2) / v.zoom;
    const cy = (-v.y + window.innerHeight / 2) / v.zoom;
    const id   = uid();
    const node = { id, text: item.text, x: cx + (Math.random() - 0.5) * 120, y: cy + (Math.random() - 0.5) * 120, color: '#6366f1', updatedAt: now(), notes: '', status: 'idea', priority: 'none', owner: '', dueDate: '', tags: [] };
    updateActiveMap({ nodes: [...nodes, node], inbox: inbox.filter(i => i.id !== item.id) });
    setSelectedId(id);
  }

  // ── center viewport on world origin using actual canvas dimensions ──
  function centerView() {
    requestAnimationFrame(() => {
      const el = canvasRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setViewport({ x: width / 2, y: height / 2 - 20, zoom: 1 });
    });
  }

  // ── fit / export ──
  function fitNodeSet(nodeSet) {
    const n = nodeSet;
    if (!n.length || !canvasRef.current) return;
    const xs = n.map(nd => nd.x), ys = n.map(nd => nd.y);
    const minX = Math.min(...xs) - NODE_W, maxX = Math.max(...xs) + NODE_W;
    const minY = Math.min(...ys) - NODE_H, maxY = Math.max(...ys) + NODE_H;
    const rect = canvasRef.current.getBoundingClientRect();
    const z = Math.min(rect.width / (maxX - minX), rect.height / (maxY - minY), 1.6) * 0.82;
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    setViewport({ x: rect.width / 2 - cx * z, y: rect.height / 2 - cy * z, zoom: z });
  }

  function fitView() {
    fitNodeSet(visibleNodes.length ? visibleNodes : nodes);
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify({ nodes, edges, inbox }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: `${activeMap?.name || 'mind-map'}.json` }).click();
    URL.revokeObjectURL(url);
  }

  function exportMarkdown() {
    const md = toMarkdown(nodes, edges);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: `${activeMap?.name || 'mind-map'}.md` }).click();
    URL.revokeObjectURL(url);
  }

  function exportPNG() {
    if (!nodes.length) return;
    const PAD = 60, NW = NODE_W, NH = NODE_H, SCALE = 2;
    const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
    const minX = Math.min(...xs) - NW / 2 - PAD;
    const maxX = Math.max(...xs) + NW / 2 + PAD;
    const minY = Math.min(...ys) - NH / 2 - PAD;
    const maxY = Math.max(...ys) + NH / 2 + PAD;
    const W = (maxX - minX) * SCALE, H = (maxY - minY) * SCALE;

    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const ctx = cvs.getContext('2d');

    // background
    ctx.fillStyle = '#0f0f11';
    ctx.fillRect(0, 0, W, H);

    // dot grid
    ctx.fillStyle = 'rgba(148,163,184,0.12)';
    const gridSize = 28 * SCALE;
    for (let gx = 0; gx < W; gx += gridSize)
      for (let gy = 0; gy < H; gy += gridSize)
        { ctx.beginPath(); ctx.arc(gx, gy, 1, 0, Math.PI * 2); ctx.fill(); }

    function wx(x) { return (x - minX) * SCALE; }
    function wy(y) { return (y - minY) * SCALE; }

    // draw edges (bezier)
    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
    for (const edge of edges) {
      const n1 = nodeMap[edge.from], n2 = nodeMap[edge.to];
      if (!n1 || !n2) continue;
      const tension = Math.min(Math.abs(n2.x - n1.x) * 0.5, 120) * SCALE;
      ctx.beginPath();
      ctx.moveTo(wx(n1.x), wy(n1.y));
      ctx.bezierCurveTo(
        wx(n1.x) + tension, wy(n1.y),
        wx(n2.x) - tension, wy(n2.y),
        wx(n2.x), wy(n2.y),
      );
      ctx.strokeStyle = n1.color + '99';
      ctx.lineWidth = 2 * SCALE;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // draw nodes
    for (const node of nodes) {
      const x = wx(node.x) - (NW / 2) * SCALE;
      const y = wy(node.y) - (NH / 2) * SCALE;
      const w = NW * SCALE, h = NH * SCALE, r = 10 * SCALE;

      // rounded rect fill
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
      ctx.fill();

      // border
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2 * SCALE;
      ctx.stroke();

      // notes dot
      if (node.notes) {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x + 8 * SCALE, y + 8 * SCALE, 3 * SCALE, 0, Math.PI * 2);
        ctx.fill();
      }

      // text
      ctx.fillStyle = '#f1f5f9';
      ctx.font = `${600} ${13 * SCALE}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const maxW = (NW - 24) * SCALE;
      const words = node.text.split(' ');
      let line = '', lines = [];
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = word; }
        else line = test;
      }
      if (line) lines.push(line);
      const lineH = 16 * SCALE;
      const startY = wy(node.y) - ((lines.length - 1) * lineH) / 2;
      lines.forEach((l, i) => ctx.fillText(l, wx(node.x), startY + i * lineH, maxW));
    }

    cvs.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      Object.assign(document.createElement('a'), { href: url, download: `${activeMap?.name || 'mind-map'}.png` }).click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  function clearMap() {
    if (!confirm(`Clear "${activeMap?.name}"? This cannot be undone.`)) return;
    updateActiveMap({ nodes: [], edges: [], inbox: [] });
    setSelectedId(null);
  }

  // ── map library actions ──
  function createMap(templateKey = 'blank') {
    const m = makeMap(templateKey);
    const newMaps = [...mapsRef.current, m];
    setMaps(newMaps);
    setActiveId(m.id);
    persistAll(newMaps);
    syncRef.current?.forcePush();
    setShowTemplates(false);
    centerView();
  }

  function switchMap(id) {
    if (editingId) commitEdit();
    if (editingNotes) commitNotes();
    setActiveId(id);
    centerView();
  }

  function deleteMap(id) {
    if (maps.length === 1) { alert('You need at least one map.'); return; }
    if (!confirm('Delete this map? This cannot be undone.')) return;
    addDeletedMapId(id);
    const newMaps = mapsRef.current.filter(m => m.id !== id);
    setMaps(newMaps);
    persistAll(newMaps);
    if (activeId === id) setActiveId(newMaps[0].id);
    syncRef.current?.forcePush();
  }

  function duplicateMap(id) {
    const src = mapsRef.current.find(m => m.id === id);
    if (!src) return;
    const copy = { ...src, id: uid(), name: `${src.name} (copy)`, createdAt: now(), updatedAt: now() };
    const newMaps = [...mapsRef.current, copy];
    setMaps(newMaps);
    setActiveId(copy.id);
    persistAll(newMaps);
    syncRef.current?.forcePush();
  }

  function commitRename() {
    const text = renameText.trim();
    if (text && renamingId) {
      setMaps(prev => {
        const next = prev.map(m => m.id === renamingId ? { ...m, name: text, updatedAt: now() } : m);
        persistAll(next);
        syncRef.current?.forcePush();
        return next;
      });
    }
    setRenamingId(null);
    setRenameText('');
  }

  // ── search ──
  const searchResults = (() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];
    for (const m of maps) {
      for (const n of (m.nodes || [])) {
        if (n.text.toLowerCase().includes(q) || (n.notes || '').toLowerCase().includes(q)) {
          results.push({ mapId: m.id, mapName: m.name, nodeId: n.id, text: n.text, notes: n.notes });
        }
      }
    }
    return results.slice(0, 40);
  })();

  function jumpToResult(r) {
    switchMap(r.mapId);
    setTimeout(() => {
      const m = mapsRef.current.find(m => m.id === r.mapId);
      const n = m?.nodes.find(n => n.id === r.nodeId);
      if (n && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setViewport({ x: rect.width / 2 - n.x, y: rect.height / 2 - n.y, zoom: 1 });
        setSelectedId(r.nodeId);
      }
    }, 80);
    setSearchOpen(false);
    setSearchQuery('');
  }

  // ── render ────────────────────────────────────────────────────────────────────

  if (!mounted) return <div className={styles.loading}><div className={styles.spinner} /></div>;

  const { x: vx, y: vy, zoom } = viewport;
  const selectedNode = nodes.find(n => n.id === selectedId);
  const currentSlide = presentationSlides[presentIndex];

  return (
    <div className={styles.root}>
      <PlaygroundTopNav active="mind-map" />

      {/* ── header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/icons/mind-map.svg" width="28" height="28" alt="" className={styles.logo} />
          <span className={styles.title}>Mind Map <span className={styles.accent}>Studio</span></span>

        </div>

        <div className={styles.headerRight}>
          {/* search */}
          <button className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`} onClick={() => setSearchOpen(v => !v)} title="Search (Ctrl+F)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>

          <button className={styles.iconBtn} onClick={undo} title="Undo (Ctrl+Z)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/></svg>
          </button>
          <button className={styles.iconBtn} onClick={redo} title="Redo (Ctrl+Y)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 000 11H13"/></svg>
          </button>

          <button className={styles.iconBtn} onClick={fitView} title="Fit to screen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
          </button>
          <button className={styles.textBtn} onClick={() => applyLayout('left')} title="Layout left to right">L-R</button>
          <button className={styles.textBtn} onClick={() => applyLayout('tree')} title="Layout as tree">Tree</button>
          <button className={styles.textBtn} onClick={() => applyLayout('radial')} title="Layout as radial map">Radial</button>
          <button className={styles.textBtn} onClick={() => applyLayout('left', true)} disabled={!selectedId} title="Layout selected branch">Branch</button>
          <button className={styles.textBtn} onClick={() => startPresentation()} disabled={!presentationSlides.length} title="Present visible branches">Present</button>
          <button className={styles.iconBtn} onClick={exportMarkdown} title="Export Markdown">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </button>
          <button className={styles.iconBtn} onClick={exportJSON} title="Export JSON">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </button>
          <button className={styles.iconBtn} onClick={exportPNG} title="Export PNG">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </button>

          <button className={styles.clearBtn} onClick={clearMap} title="Clear current map">Clear</button>

          <GistSyncButton ref={syncRef} toolKey="mm" fileName="fwd-mindmap.json" description="webdevpuneet.com — Mind Map" getLocalData={getLocalData} onPullData={onPullData} />
        </div>
      </header>


      {/* ── search overlay ── */}
      {searchOpen && (
        <div className={styles.searchOverlay} ref={searchRef}>
          <div className={styles.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={styles.searchIcon}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              autoFocus
              className={styles.searchInput}
              placeholder="Search nodes across all maps…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && <button className={styles.searchClear} onClick={() => setSearchQuery('')}>×</button>}
          </div>
          {searchQuery && (
            <div className={styles.searchResults}>
              {searchResults.length === 0
                ? <div className={styles.searchEmpty}>No nodes match "{searchQuery}"</div>
                : searchResults.map((r, i) => (
                    <button key={i} className={styles.searchResult} onClick={() => jumpToResult(r)}>
                      <span className={styles.searchResultText}>{r.text}</span>
                      <span className={styles.searchResultMap}>{r.mapName}</span>
                    </button>
                  ))
              }
            </div>
          )}
        </div>
      )}

      <div className={styles.body}>

        {/* ── sidebar ── */}
        <aside className={styles.sidebar}>

          {/* ── maps section ── */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitleRow}>
              <span className={styles.sidebarTitle}>Maps</span>
              <button className={styles.newMapBtn} onClick={() => setShowTemplates(v => !v)} title="New map">+</button>
            </div>

            {showTemplates && (
              <div className={styles.templateGrid}>
                {[
                  { key: 'blank',    label: 'Blank',       icon: '□' },
                  { key: 'default',  label: 'Sample',      icon: '◎' },
                  { key: 'swot',     label: 'SWOT',        icon: '⊞' },
                  { key: 'proscons', label: 'Pros & Cons', icon: '⚖' },
                  { key: 'weekly',   label: 'Weekly',      icon: '📅' },
                ].map(t => (
                  <button key={t.key} className={styles.templateBtn} onClick={() => createMap(t.key)}>
                    <span className={styles.templateIcon}>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div className={styles.mapList}>
              {maps.map(m => (
                <div key={m.id} className={`${styles.mapItem} ${m.id === activeId ? styles.mapItemActive : ''}`}>
                  {renamingId === m.id ? (
                    <input
                      autoFocus
                      className={styles.mapRenameInput}
                      value={renameText}
                      onChange={e => setRenameText(e.target.value)}
                      onBlur={commitRename}
                      onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null); }}
                    />
                  ) : (
                    <button className={styles.mapItemName} onClick={() => switchMap(m.id)}>
                      <span className={styles.mapItemLabel}>{m.name}</span>
                      <span className={styles.mapItemMeta}>{m.nodes?.length || 0}</span>
                    </button>
                  )}
                  <div className={styles.mapItemBtns}>
                    <button onClick={() => { setRenamingId(m.id); setRenameText(m.name); }} title="Rename">✎</button>
                    <button onClick={() => duplicateMap(m.id)} title="Duplicate">⧉</button>
                    <button onClick={() => deleteMap(m.id)} title="Delete" className={styles.mapItemDel}>×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* outline */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitleRow}>
              <span className={styles.sidebarTitle}>Outline</span>
              <select className={styles.outlineFilter} value={metadataFilter} onChange={e => setMetadataFilter(e.target.value)} title="Filter by status">
                <option value="all">All</option>
                {STATUS_OPTIONS.filter(s => s !== 'none').map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.outlineList}>
              {outlineNodes.length === 0 && <p className={styles.inboxEmpty}>No nodes match this filter.</p>}
              {outlineNodes.map(({ node, depth, childCount }) => (
                <div
                  key={node.id}
                  draggable
                  className={`${styles.outlineItem} ${node.id === selectedId ? styles.outlineItemActive : ''}`}
                  style={{ '--depth': depth }}
                  onDragStart={() => setDragOutlineId(node.id)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); reorderOutlineNode(dragOutlineId, node.id); setDragOutlineId(null); }}
                >
                  <button
                    className={styles.outlineToggle}
                    onClick={() => childCount ? toggleCollapse(node.id) : null}
                    title={childCount ? (node.collapsed ? 'Expand branch' : 'Collapse branch') : 'No children'}
                  >
                    {childCount ? (node.collapsed ? '▸' : '▾') : '•'}
                  </button>
                  <button className={styles.outlineName} onClick={() => jumpToNode(node.id)} title="Jump to node">
                    <span>{node.text || 'Untitled node'}</span>
                    {(node.status && node.status !== 'none') && <em>{node.status}</em>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* idea inbox */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Idea Inbox</div>
            <div className={styles.inboxRow}>
              <input
                className={styles.inboxInput}
                placeholder="Capture a quick idea…"
                value={inboxInput}
                onChange={e => setInboxInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addToInbox()}
              />
              <button className={styles.inboxAdd} onClick={addToInbox} title="Add idea">+</button>
            </div>
            <div className={styles.inboxList}>
              {inbox.length === 0 && <p className={styles.inboxEmpty}>No ideas yet — type above and press Enter.</p>}
              {inbox.map(item => (
                <div key={item.id} className={styles.inboxItem}>
                  <span className={styles.inboxText}>{item.text}</span>
                  <div className={styles.inboxBtns}>
                    <button onClick={() => promoteToCanvas(item)} title="Add to map">→</button>
                    <button onClick={() => deleteInboxItem(item.id)} title="Delete">×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* selected node controls */}
          {selectedNode && !editingId && (
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarTitle}>Node</div>
              <div className={styles.colorGrid}>
                {COLORS.map(c => (
                  <button
                    key={c}
                    className={`${styles.colorSwatch} ${selectedNode.color === c ? styles.colorSwatchOn : ''}`}
                    style={{ background: c }}
                    onClick={() => updateColor(selectedNode.id, c)}
                  />
                ))}
              </div>

              <div className={styles.metaGrid}>
                <label>
                  <span>Status</span>
                  <select value={selectedNode.status || 'none'} onChange={e => updateNodeMeta(selectedNode.id, { status: e.target.value })}>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label>
                  <span>Priority</span>
                  <select value={selectedNode.priority || 'none'} onChange={e => updateNodeMeta(selectedNode.id, { priority: e.target.value })}>
                    {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
                <label>
                  <span>Owner</span>
                  <input value={selectedNode.owner || ''} onChange={e => updateNodeMeta(selectedNode.id, { owner: e.target.value })} placeholder="Name" />
                </label>
                <label>
                  <span>Due</span>
                  <input type="date" value={selectedNode.dueDate || ''} onChange={e => updateNodeMeta(selectedNode.id, { dueDate: e.target.value })} />
                </label>
              </div>
              <label className={styles.tagsField}>
                <span>Tags</span>
                <input
                  value={(selectedNode.tags || []).join(', ')}
                  onChange={e => updateNodeMeta(selectedNode.id, { tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  placeholder="research, launch"
                />
              </label>

              {/* node notes */}
              <div className={styles.notesLabel}>Notes</div>
              {editingNotes ? (
                <textarea
                  autoFocus
                  className={styles.notesEditor}
                  value={notesText}
                  onChange={e => setNotesText(e.target.value)}
                  onBlur={commitNotes}
                  onKeyDown={e => { if (e.key === 'Escape') commitNotes(); }}
                  placeholder="Add a note to this node…"
                  rows={4}
                />
              ) : (
                <div
                  className={`${styles.notesPreview} ${!selectedNode.notes ? styles.notesEmpty : ''}`}
                  onClick={() => { setEditingNotes(true); setNotesText(selectedNode.notes || ''); }}
                >
                  {selectedNode.notes || 'Click to add a note…'}
                </div>
              )}

              <div className={styles.nodeActions}>
                <button className={styles.nodeActionBtn} onClick={() => addChildNode(selectedNode.id)}>+ Child</button>
                <button className={styles.nodeActionBtn} onClick={() => toggleCollapse(selectedNode.id)}>{selectedNode.collapsed ? 'Expand' : 'Collapse'}</button>
                <button className={styles.nodeActionBtn} onClick={() => applyLayout('left', true)}>Layout</button>
                <button className={styles.nodeActionBtnDanger} onClick={() => deleteNode(selectedNode.id)}>Delete</button>
              </div>
            </div>
          )}

          {/* shortcuts */}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Shortcuts</div>
            <ul className={styles.shortcutList}>

              <li><kbd>Tab</kbd> — add child node</li>
              <li><kbd>Del</kbd> — delete selected</li>
              <li><kbd>Esc</kbd> — deselect</li>
              <li><kbd>Ctrl+Z</kbd> — undo</li>
              <li><kbd>Ctrl+Y</kbd> — redo</li>
              <li><kbd>Ctrl+F</kbd> — search</li>
              <li><kbd>P</kbd> — present map</li>
              <li>Drag node handle → connect</li>
              <li>Click edge → delete it</li>
              <li>Zoom slider — bottom right</li>
            </ul>
          </div>

        </aside>

        {/* ── canvas ── */}
        <div
          ref={canvasRef}
          className={styles.canvas}
          style={{ touchAction: 'none', cursor: panRef.current ? 'grabbing' : 'grab' }}
          onPointerDown={onCanvasPointerDown}
          onPointerMove={onCanvasPointerMove}
          onPointerUp={onCanvasPointerUp}
        >
          {nodes.length === 0 && (
            <div className={styles.emptyHint}>
              <svg width="40" height="40" viewBox="0 0 64 64" opacity="0.3"><rect x="6" y="26" width="16" height="12" rx="4" fill="currentColor"/><path d="M22 32 C 30 32, 34 16, 44 13" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M22 32 C 33 32, 33 32, 44 32" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M22 32 C 30 32, 34 48, 44 51" stroke="currentColor" strokeWidth="2" fill="none"/><rect x="44" y="9" width="14" height="8" rx="3" fill="currentColor" opacity="0.5"/><rect x="44" y="28" width="14" height="8" rx="3" fill="currentColor" opacity="0.5"/><rect x="44" y="47" width="14" height="8" rx="3" fill="currentColor" opacity="0.5"/></svg>
              <p>Click anywhere to add your first node</p>
            </div>
          )}

          <div className={styles.zoomControl}>
            <button className={styles.zoomBtn} onClick={zoomOut} title="Zoom out">−</button>
            <input
              type="range"
              className={styles.zoomSlider}
              min={18} max={250} step={1}
              value={Math.round(zoom * 100)}
              onChange={e => zoomTo(Number(e.target.value) / 100)}
              title={`Zoom: ${Math.round(zoom * 100)}%`}
            />
            <button className={styles.zoomBtn} onClick={zoomIn} title="Zoom in">+</button>
            <span className={styles.zoomLabel} onClick={() => zoomTo(1)} title="Reset to 100%">
              {Math.round(zoom * 100)}%
            </span>
            <button className={styles.zoomBtn} onClick={fitView} title="Fit to screen">⊡</button>
          </div>

          {/* world transform layer */}
          <div
            ref={innerRef}
            style={{ position: 'absolute', transformOrigin: '0 0', transform: `translate(${vx}px,${vy}px) scale(${zoom})` }}
          >
            <svg style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, overflow: 'visible', pointerEvents: 'none' }}>
              {visibleEdges.map(edge => {
                const n1 = nodes.find(n => n.id === edge.from);
                const n2 = nodes.find(n => n.id === edge.to);
                if (!n1 || !n2) return null;
                const d = edgePath(n1, n2);
                return (
                  <g key={edge.id} style={{ pointerEvents: 'stroke' }}>
                    <path d={d} fill="none" stroke="transparent" strokeWidth={14 / zoom} style={{ cursor: 'pointer', pointerEvents: 'stroke' }} onClick={() => deleteEdge(edge.id)} />
                    <path d={d} fill="none" stroke={n1.color} strokeWidth="2" opacity="0.55" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
                  </g>
                );
              })}
              {drawEdge && (() => {
                const n1 = nodes.find(n => n.id === drawEdge.fromId);
                if (!n1) return null;
                return <path d={edgePath(n1, { x: drawEdge.toX, y: drawEdge.toY })} fill="none" stroke="var(--text3)" strokeWidth="2" strokeDasharray="6,4" style={{ pointerEvents: 'none' }} />;
              })()}
            </svg>

            {visibleNodes.map(node => {
              const isSel  = node.id === selectedId;
              const isEdit = node.id === editingId;
              const hasNotes = !!node.notes;
              const childCount = tree.children.get(node.id)?.length || 0;
              return (
                <div
                  key={node.id}
                  data-nodeid={node.id}
                  className={`${styles.node} ${isSel ? styles.nodeSelected : ''} ${hasNotes ? styles.nodeHasNotes : ''}`}
                  style={{ left: node.x, top: node.y, '--nc': node.color, position: 'absolute', transform: 'translate(-50%,-50%)', width: NODE_W, minHeight: NODE_H }}
                  onPointerDown={e => onNodePointerDown(e, node.id)}
                >
                  {isEdit ? (
                    <input
                      autoFocus
                      className={styles.nodeInput}
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') { setEditingId(null); setEditText(''); } }}
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <span className={styles.nodeText}>{node.text || <em className={styles.nodePlaceholder}>Type…</em>}</span>
                  )}
                  {hasNotes && !isEdit && (
                    <span className={styles.nodeNotesDot} title={node.notes}>●</span>
                  )}
                  {!isEdit && (node.status && node.status !== 'none') && (
                    <span className={`${styles.nodeStatus} ${styles[`status_${node.status}`] || ''}`}>{node.status}</span>
                  )}
                  {!isEdit && node.priority && node.priority !== 'none' && (
                    <span className={`${styles.nodePriority} ${styles[`priority_${node.priority}`] || ''}`}>{node.priority}</span>
                  )}
                  {!isEdit && childCount > 0 && (
                    <button
                      className={styles.nodeCollapseBtn}
                      data-action="collapse"
                      onClick={e => { e.stopPropagation(); toggleCollapse(node.id); }}
                      title={node.collapsed ? `Show ${childCount} child nodes` : `Hide ${childCount} child nodes`}
                    >
                      {node.collapsed ? `+${childCount}` : '-'}
                    </button>
                  )}
                  {isSel && !isEdit && (
                    <>
                      <button className={styles.nodeBtnDel} data-action="del" onClick={e => { e.stopPropagation(); deleteNode(node.id); }} title="Delete (Del)">×</button>
                      <button className={styles.nodeBtnAdd} data-action="add" onClick={e => { e.stopPropagation(); addChildNode(node.id); }} title="Add child (Tab)">+</button>
                      <div className={styles.connectHandle} data-handle="c" onPointerDown={e => onHandlePointerDown(e, node.id)} title="Drag to connect or create" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {presenting && currentSlide && (
        <div className={styles.presentationOverlay} role="dialog" aria-modal="true" aria-label="Mind map presentation">
          <div className={styles.presentationTopbar}>
            <span className={styles.presentationMapName}>{activeMap?.name || 'Mind Map'}</span>
            <span className={styles.presentationProgress}>{presentIndex + 1} / {presentationSlides.length}</span>
            <button className={styles.presentationClose} onClick={() => setPresenting(false)} title="Exit presentation">×</button>
          </div>

          <section className={styles.presentationSlide} style={{ '--slideColor': currentSlide.node.color || '#6366f1' }}>
            <div className={styles.presentationDepth}>Level {currentSlide.depth + 1}</div>
            <h2>{currentSlide.node.text || 'Untitled node'}</h2>

            <div className={styles.presentationMeta}>
              {currentSlide.node.status && currentSlide.node.status !== 'none' && <span>{currentSlide.node.status}</span>}
              {currentSlide.node.priority && currentSlide.node.priority !== 'none' && <span>{currentSlide.node.priority} priority</span>}
              {currentSlide.node.owner && <span>{currentSlide.node.owner}</span>}
              {currentSlide.node.dueDate && <span>Due {currentSlide.node.dueDate}</span>}
              {(currentSlide.node.tags || []).map(tag => <span key={tag}>#{tag}</span>)}
            </div>

            {currentSlide.node.notes && <p className={styles.presentationNotes}>{currentSlide.node.notes}</p>}

            {currentSlide.children.length > 0 && (
              <div className={styles.presentationChildren}>
                <span>Branch points</span>
                <ul>
                  {currentSlide.children.map(child => (
                    <li key={child.id}>
                      <button onClick={() => {
                        const i = presentationSlides.findIndex(s => s.node.id === child.id);
                        if (i >= 0) setPresentIndex(i);
                      }}>
                        {child.text || 'Untitled node'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <div className={styles.presentationControls}>
            <button onClick={() => movePresentation(-1)} disabled={presentIndex === 0}>Previous</button>
            <button onClick={() => {
              jumpToNode(currentSlide.node.id);
              setPresenting(false);
            }}>Open on canvas</button>
            <button onClick={() => movePresentation(1)} disabled={presentIndex >= presentationSlides.length - 1}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
