'use client';

import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import PlaygroundSidebarTitle from '@/components/PlaygroundSidebarTitle';
const LESSONS = [
  {
    id: 'kv',
    title: 'Key-value basics',
    tag: 'SET / GET',
    text: 'Redis stores data by key. SET writes a value, GET reads it, DEL removes it. The value can represent a session, feature flag, counter, JSON string, or cached response.',
    commands: ['SET user:42 Puneet', 'GET user:42', 'DEL user:42'],
    challenge: {
      title: 'Store and read a profile key',
      text: 'Run SET profile:demo Ada, then GET profile:demo.',
      goals: ['SET profile:demo', 'GET profile:demo'],
    },
  },
  {
    id: 'ttl',
    title: 'Expiration',
    tag: 'EX / TTL',
    text: 'Keys can expire automatically. This is useful for login sessions, password reset tokens, temporary locks, and short-lived cached API responses.',
    commands: ['SET otp:login 839201 EX 30', 'TTL otp:login', 'GET otp:login'],
    challenge: {
      title: 'Create a temporary OTP',
      text: 'Run SET otp:demo 123456 EX 15, then TTL otp:demo.',
      goals: ['SET otp:demo', 'TTL otp:demo'],
    },
  },
  {
    id: 'cache',
    title: 'Caching pattern',
    tag: 'CACHE',
    text: 'A cache checks Redis first. If the key exists, the app returns it immediately. If it is missing, the app fetches from the source, writes Redis, and serves the result.',
    commands: ['GET page:/pricing', 'SET page:/pricing <html> EX 20'],
    challenge: {
      title: 'Warm a page cache',
      text: 'Run GET page:/pricing, then SET page:/pricing cached-page EX 20.',
      goals: ['GET page:/pricing', 'SET page:/pricing'],
    },
  },
  {
    id: 'pubsub',
    title: 'Pub/Sub',
    tag: 'PUBLISH',
    text: 'Redis Pub/Sub lets one part of an app publish a message and many subscribers receive it. It is useful for live notifications, invalidation events, and lightweight realtime demos.',
    commands: ['SUBSCRIBE deploys', 'PUBLISH deploys "site shipped"'],
    challenge: {
      title: 'Subscribe and publish',
      text: 'Run SUBSCRIBE alerts, then PUBLISH alerts "hello team".',
      goals: ['SUBSCRIBE alerts', 'PUBLISH alerts'],
    },
  },
  {
    id: 'types',
    title: 'Data types',
    tag: 'LIST / SET / HASH / ZSET',
    text: 'Redis is more than strings. Lists preserve order, Sets keep unique members, Hashes store fields on one key, and Sorted Sets rank members by score.',
    commands: ['LPUSH queue:emails welcome reset', 'LRANGE queue:emails 0 -1', 'SADD tags redis cache redis', 'SCARD tags', 'HSET user:7 name Ada role admin', 'HKEYS user:7', 'ZADD leaderboard 99 Ada 87 Linus', 'ZSCORE leaderboard Ada'],
    challenge: {
      title: 'Build a small queue',
      text: 'Run LPUSH jobs email sms, then LRANGE jobs 0 -1, then LPOP jobs.',
      goals: ['LPUSH jobs', 'LRANGE jobs', 'LPOP jobs'],
    },
  },
  {
    id: 'counters',
    title: 'Atomic counters',
    tag: 'INCR / INCRBY',
    text: 'INCR atomically increments an integer key by 1. INCRBY adds any amount. DECR and DECRBY subtract. Redis guarantees no race conditions — two clients calling INCR at the same time always get different values. Use counters for page views, vote tallies, rate limit windows, and distributed sequence numbers.',
    commands: ['SET views:homepage 0', 'INCR views:homepage', 'INCR views:homepage', 'INCRBY views:homepage 10', 'DECR views:homepage', 'DECRBY views:homepage 5'],
    challenge: {
      title: 'Count page visits',
      text: 'Run SET score 0, then INCR score three times, then INCRBY score 10.',
      goals: ['SET score', 'INCR score', 'INCRBY score'],
    },
  },
  {
    id: 'locks',
    title: 'Conditional writes',
    tag: 'SETNX / EXISTS',
    text: 'SETNX (SET if Not eXists) writes a key only when it is absent. If the key already exists, the write is silently skipped. Use SETNX for distributed locks, idempotency tokens, and ensuring a background job runs only once across many workers. EXISTS checks presence without fetching the value. PERSIST removes an expiration from a key.',
    commands: ['SETNX lock:deploy worker-1', 'SETNX lock:deploy worker-2', 'EXISTS lock:deploy', 'SET otp:reset 991827 EX 30', 'PERSIST otp:reset', 'TTL otp:reset'],
    challenge: {
      title: 'Claim a distributed lock',
      text: 'Run SETNX lock:job 1, then SETNX lock:job 1 again (should return 0), then EXISTS lock:job.',
      goals: ['SETNX lock:job', 'EXISTS lock:job'],
    },
  },
  {
    id: 'inspect',
    title: 'Key inspection',
    tag: 'KEYS / TYPE / RENAME',
    text: 'KEYS searches the key space with glob patterns (* matches anything, ? matches one char). TYPE returns the data structure stored at a key. RENAME gives a key a new name atomically. MSET writes multiple keys in one call and MGET reads several keys at once.',
    commands: ['KEYS *', 'KEYS user:*', 'TYPE user:42', 'TYPE leaderboard', 'MSET config:env prod config:version 2', 'MGET config:env config:version', 'RENAME user:42 user:100'],
    challenge: {
      title: 'Explore the key space',
      text: 'Run KEYS user:*, then TYPE user:42, then MSET a 1 b 2, then MGET a b.',
      goals: ['KEYS user:*', 'TYPE user:42', 'MSET a', 'MGET a'],
    },
  },
];

const SAMPLE_KEYS = [
  { key: 'user:42', value: 'Puneet Sharma', ttl: null, type: 'string' },
  { key: 'feature:new-nav', value: 'enabled', ttl: null, type: 'flag' },
  { key: 'page:/seo-checker', value: 'cached HTML response', ttl: 28, type: 'cache' },
  { key: 'otp:login', value: '839201', ttl: 18, type: 'token' },
  { key: 'queue:email', value: ['welcome', 'reset-password'], ttl: null, type: 'list' },
  { key: 'tags:article:9', value: ['redis', 'cache', 'backend'], ttl: null, type: 'set' },
  { key: 'user:7', value: { name: 'Ada', role: 'admin' }, ttl: null, type: 'hash' },
  { key: 'leaderboard', value: [{ member: 'Ada', score: 99 }, { member: 'Linus', score: 87 }], ttl: null, type: 'zset' },
];

const START_MESSAGES = [
  { id: 1, channel: 'deploys', message: 'build started', time: '00:01' },
  { id: 2, channel: 'cache', message: 'invalidate page:/seo-checker', time: '00:04' },
];

function parseCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.match(/"[^"]*"|\S+/g)?.map(part => part.replace(/^"|"$/g, '')) || [];
  return { raw: trimmed, name: (parts[0] || '').toUpperCase(), parts };
}

function nowLabel() {
  const date = new Date();
  return date.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });
}

function ttlText(ttl) {
  if (ttl == null) return 'persistent';
  return ttl <= 0 ? 'expired' : `${ttl}s`;
}

function cacheStatus(keys, cacheKey) {
  return keys.some(item => item.key === cacheKey) ? 'hit' : 'miss';
}

function formatValue(value, type) {
  if (type === 'list') return `[${value.join(', ')}]`;
  if (type === 'set') return `{${value.join(', ')}}`;
  if (type === 'hash') return Object.entries(value).map(([field, val]) => `${field}: ${val}`).join(', ');
  if (type === 'zset') return value.map(item => `${item.member}(${item.score})`).join(', ');
  return String(value);
}

function cloneKeys(keys) {
  return keys.map(item => ({
    ...item,
    value: Array.isArray(item.value)
      ? item.value.map(entry => typeof entry === 'object' ? { ...entry } : entry)
      : typeof item.value === 'object' && item.value !== null
        ? { ...item.value }
        : item.value,
  }));
}

function signature(item) {
  return JSON.stringify({
    value: item.value,
    ttl: item.ttl,
    type: item.type,
  });
}

function diffKeys(before, after) {
  const prev = new Map(before.map(item => [item.key, item]));
  const next = new Map(after.map(item => [item.key, item]));
  const added = [];
  const changed = [];
  const deleted = [];

  next.forEach((item, key) => {
    if (!prev.has(key)) added.push(key);
    else if (signature(prev.get(key)) !== signature(item)) changed.push(key);
  });
  prev.forEach((item, key) => {
    if (!next.has(key)) deleted.push(key);
  });

  return { added, changed, deleted };
}

function diffText(diff) {
  const parts = [];
  if (diff.added.length) parts.push(`+ ${diff.added.join(', ')}`);
  if (diff.changed.length) parts.push(`~ ${diff.changed.join(', ')}`);
  if (diff.deleted.length) parts.push(`- ${diff.deleted.join(', ')}`);
  return parts.length ? parts.join('  ') : 'no key-space change';
}

function createHistoryEntry(raw, result, before, after) {
  return {
    id: Date.now() + Math.random(),
    time: nowLabel(),
    command: raw,
    output: result.output,
    diff: diffKeys(before, after),
  };
}

function goalDone(goal, history) {
  const target = goal.toUpperCase();
  return history.some(item => item.command.toUpperCase().startsWith(target));
}

export default function RedisPlaygroundTool() {
  const [keys, setKeys] = useState(SAMPLE_KEYS);
  const [activeLesson, setActiveLesson] = useState(LESSONS[0].id);
  const [command, setCommand] = useState('SET session:abc123 active EX 45');
  const [output, setOutput] = useState('Ready. Try SET, GET, DEL, TTL, EXPIRE, PUBLISH, or SUBSCRIBE.');
  const [cacheKey, setCacheKey] = useState('page:/pricing');
  const [cacheSource, setCacheSource] = useState('Product pricing rendered from origin');
  const [cacheTtl, setCacheTtl] = useState(20);
  const [messages, setMessages] = useState(START_MESSAGES);
  const [channel, setChannel] = useState('deploys');
  const [message, setMessage] = useState('production cache warmed');
  const [subscribed, setSubscribed] = useState(['deploys', 'cache']);
  const [history, setHistory] = useState([]);

  const lesson = LESSONS.find(item => item.id === activeLesson) || LESSONS[0];
  const activeKeys = keys.filter(item => item.ttl == null || item.ttl > 0);
  const expiringKeys = activeKeys.filter(item => item.ttl != null);
  const currentCacheStatus = cacheStatus(activeKeys, cacheKey);
  const challengeGoals = lesson.challenge?.goals || [];
  const challengeDone = challengeGoals.length > 0 && challengeGoals.every(goal => goalDone(goal, history));

  useEffect(() => {
    const timer = setInterval(() => {
      setKeys(current => current
        .map(item => item.ttl == null ? item : { ...item, ttl: Math.max(0, item.ttl - 1) })
        .filter(item => item.ttl == null || item.ttl > 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    const persistent = activeKeys.filter(item => item.ttl == null).length;
    return [
      { label: 'keys', value: activeKeys.length },
      { label: 'expiring', value: expiringKeys.length },
      { label: 'persistent', value: persistent },
      { label: 'subscribers', value: subscribed.length },
    ];
  }, [activeKeys, expiringKeys.length, subscribed.length]);

  function upsertKeyIn(list, key, value, ttl = null, type = 'string') {
    const next = list.filter(item => item.key !== key);
    return [{ key, value, ttl, type }, ...next];
  }

  function removeKeyIn(list, key) {
    return list.filter(item => item.key !== key);
  }

  function runCommandOnState(list, parsed) {
    const { name, parts, raw } = parsed;
    const key = parts[1];
    let nextKeys = cloneKeys(list);

    const findKey = () => nextKeys.find(item => item.key === key);
    const replaceKey = (nextItem) => {
      nextKeys = upsertKeyIn(nextKeys, nextItem.key, nextItem.value, nextItem.ttl, nextItem.type);
    };

    if (name === 'SET') {
      const exIndex = parts.findIndex(part => part.toUpperCase() === 'EX');
      const ttl = exIndex >= 0 ? Math.max(1, Number(parts[exIndex + 1]) || 30) : null;
      const valueParts = exIndex >= 0 ? parts.slice(2, exIndex) : parts.slice(2);
      const value = valueParts.join(' ') || '""';
      nextKeys = upsertKeyIn(nextKeys, key || 'missing:key', value, ttl, ttl == null ? 'string' : 'cache');
      return { keys: nextKeys, output: `OK - ${key} stored${ttl ? ` for ${ttl}s` : ' without expiration'}.` };
    }

    if (name === 'GET') {
      const found = findKey();
      return { keys: nextKeys, output: found ? `"${formatValue(found.value, found.type)}"` : '(nil) - cache miss or missing key.' };
    }

    if (name === 'DEL') {
      const existed = nextKeys.some(item => item.key === key);
      nextKeys = removeKeyIn(nextKeys, key);
      return { keys: nextKeys, output: `(integer) ${existed ? 1 : 0} - deleted ${key}.` };
    }

    if (name === 'TTL') {
      const found = findKey();
      const ttl = found ? (found.ttl == null ? -1 : found.ttl) : -2;
      return { keys: nextKeys, output: `${ttl} ${ttl === -1 ? '(key exists without expiration)' : ttl === -2 ? '(key does not exist)' : 'seconds remaining'}` };
    }

    if (name === 'EXPIRE') {
      const found = findKey();
      const seconds = Math.max(1, Number(parts[2]) || 30);
      if (found) replaceKey({ ...found, ttl: seconds });
      return { keys: nextKeys, output: `(integer) ${found ? 1 : 0} - ${key} expires in ${seconds}s.` };
    }

    if (name === 'LPUSH' || name === 'RPUSH') {
      const values = parts.slice(2);
      const found = findKey();
      const current = found?.type === 'list' ? found.value : [];
      const value = name === 'LPUSH' ? [...values.reverse(), ...current] : [...current, ...values];
      replaceKey({ key: key || 'list:missing', value, ttl: found?.ttl ?? null, type: 'list' });
      return { keys: nextKeys, output: `(integer) ${value.length} - ${name === 'LPUSH' ? 'pushed to head' : 'pushed to tail'}.` };
    }

    if (name === 'LPOP') {
      const found = findKey();
      const current = found?.type === 'list' ? [...found.value] : [];
      const popped = current.shift();
      if (found) replaceKey({ ...found, value: current });
      return { keys: nextKeys, output: popped ? `"${popped}"` : '(nil) - list is empty or missing.' };
    }

    if (name === 'SADD') {
      const values = parts.slice(2);
      const found = findKey();
      const current = found?.type === 'set' ? found.value : [];
      const nextSet = Array.from(new Set([...current, ...values]));
      const added = nextSet.length - current.length;
      replaceKey({ key: key || 'set:missing', value: nextSet, ttl: found?.ttl ?? null, type: 'set' });
      return { keys: nextKeys, output: `(integer) ${added} - unique member${added === 1 ? '' : 's'} added.` };
    }

    if (name === 'SREM') {
      const values = new Set(parts.slice(2));
      const found = findKey();
      const current = found?.type === 'set' ? found.value : [];
      const nextSet = current.filter(item => !values.has(item));
      if (found) replaceKey({ ...found, value: nextSet });
      return { keys: nextKeys, output: `(integer) ${current.length - nextSet.length} - member(s) removed.` };
    }

    if (name === 'SMEMBERS') {
      const found = findKey();
      return { keys: nextKeys, output: found?.type === 'set' ? found.value.map((item, index) => `${index + 1}) "${item}"`).join('\n') : '(empty set or missing key)' };
    }

    if (name === 'HSET') {
      const found = findKey();
      const current = found?.type === 'hash' ? { ...found.value } : {};
      let added = 0;
      for (let i = 2; i < parts.length; i += 2) {
        const field = parts[i];
        const value = parts[i + 1] ?? '';
        if (field && current[field] === undefined) added += 1;
        if (field) current[field] = value;
      }
      replaceKey({ key: key || 'hash:missing', value: current, ttl: found?.ttl ?? null, type: 'hash' });
      return { keys: nextKeys, output: `(integer) ${added} - hash field${added === 1 ? '' : 's'} added.` };
    }

    if (name === 'HGET') {
      const found = findKey();
      const field = parts[2];
      const value = found?.type === 'hash' ? found.value[field] : undefined;
      return { keys: nextKeys, output: value === undefined ? '(nil)' : `"${value}"` };
    }

    if (name === 'HGETALL') {
      const found = findKey();
      const rows = found?.type === 'hash' ? Object.entries(found.value) : [];
      return { keys: nextKeys, output: rows.length ? rows.map(([field, value], index) => `${index + 1}) ${field}: "${value}"`).join('\n') : '(empty hash or missing key)' };
    }

    if (name === 'ZADD') {
      const found = findKey();
      const current = found?.type === 'zset' ? [...found.value] : [];
      const byMember = new Map(current.map(item => [item.member, item]));
      let added = 0;
      for (let i = 2; i < parts.length; i += 2) {
        const score = Number(parts[i]);
        const member = parts[i + 1];
        if (!member || Number.isNaN(score)) continue;
        if (!byMember.has(member)) added += 1;
        byMember.set(member, { member, score });
      }
      const value = Array.from(byMember.values()).sort((a, b) => b.score - a.score);
      replaceKey({ key: key || 'zset:missing', value, ttl: found?.ttl ?? null, type: 'zset' });
      return { keys: nextKeys, output: `(integer) ${added} - sorted-set member${added === 1 ? '' : 's'} added.` };
    }

    if (name === 'ZRANGE') {
      const found = findKey();
      const rows = found?.type === 'zset' ? found.value : [];
      return { keys: nextKeys, output: rows.length ? rows.map((item, index) => `${index + 1}) ${item.member} (${item.score})`).join('\n') : '(empty sorted set or missing key)' };
    }

    if (name === 'SUBSCRIBE') {
      const nextChannel = key || 'events';
      setSubscribed(current => Array.from(new Set([...current, nextChannel])));
      return { keys: nextKeys, output: `Subscribed to ${nextChannel}.` };
    }

    if (name === 'PUBLISH') {
      const nextChannel = key || 'events';
      const nextMessage = parts.slice(2).join(' ') || raw;
      setMessages(current => [{ id: Date.now(), channel: nextChannel, message: nextMessage, time: nowLabel() }, ...current].slice(0, 8));
      return { keys: nextKeys, output: `Published to ${nextChannel}. ${subscribed.includes(nextChannel) ? 'Subscriber received it.' : 'No local subscriber yet.'}` };
    }

    if (name === 'INCR' || name === 'DECR') {
      const found = findKey();
      const current = Number(found?.value) || 0;
      const next = name === 'INCR' ? current + 1 : current - 1;
      nextKeys = upsertKeyIn(nextKeys, key, String(next), found?.ttl ?? null, 'string');
      return { keys: nextKeys, output: `(integer) ${next}` };
    }

    if (name === 'INCRBY' || name === 'DECRBY') {
      const found = findKey();
      const current = Number(found?.value) || 0;
      const amount = Number(parts[2]) || 1;
      const next = name === 'INCRBY' ? current + amount : current - amount;
      nextKeys = upsertKeyIn(nextKeys, key, String(next), found?.ttl ?? null, 'string');
      return { keys: nextKeys, output: `(integer) ${next}` };
    }

    if (name === 'SETNX') {
      const found = findKey();
      if (found) return { keys: nextKeys, output: '(integer) 0 - key already exists, not written.' };
      const value = parts.slice(2).join(' ') || '""';
      nextKeys = upsertKeyIn(nextKeys, key, value, null, 'string');
      return { keys: nextKeys, output: '(integer) 1 - key set (did not exist).' };
    }

    if (name === 'EXISTS') {
      const found = findKey();
      return { keys: nextKeys, output: `(integer) ${found ? 1 : 0} - key ${found ? 'exists' : 'does not exist'}.` };
    }

    if (name === 'PERSIST') {
      const found = findKey();
      if (found && found.ttl != null) {
        replaceKey({ ...found, ttl: null, type: found.type === 'cache' ? 'string' : found.type });
        return { keys: nextKeys, output: '(integer) 1 - expiration removed, key is now persistent.' };
      }
      return { keys: nextKeys, output: `(integer) 0 - ${found ? 'key has no expiration' : 'key does not exist'}.` };
    }

    if (name === 'TYPE') {
      const found = findKey();
      return { keys: nextKeys, output: found ? found.type : 'none' };
    }

    if (name === 'RENAME') {
      const newKey = parts[2];
      const found = findKey();
      if (!found || !newKey) return { keys: nextKeys, output: 'ERR no such key or missing new name.' };
      nextKeys = removeKeyIn(nextKeys, key);
      nextKeys = upsertKeyIn(nextKeys, newKey, found.value, found.ttl, found.type);
      return { keys: nextKeys, output: `OK - renamed ${key} to ${newKey}.` };
    }

    if (name === 'KEYS') {
      const pattern = parts[1] || '*';
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
      const matched = nextKeys.filter(item => regex.test(item.key)).map(item => item.key);
      return { keys: nextKeys, output: matched.length ? matched.map((k, i) => `${i + 1}) "${k}"`).join('\n') : '(empty array)' };
    }

    if (name === 'MSET') {
      for (let i = 1; i < parts.length; i += 2) {
        const k = parts[i];
        const v = parts[i + 1] ?? '';
        if (k) nextKeys = upsertKeyIn(nextKeys, k, v, null, 'string');
      }
      return { keys: nextKeys, output: 'OK - multiple keys stored.' };
    }

    if (name === 'MGET') {
      const values = parts.slice(1).map(k => {
        const found = nextKeys.find(item => item.key === k);
        return found ? `"${formatValue(found.value, found.type)}"` : '(nil)';
      });
      return { keys: nextKeys, output: values.map((v, i) => `${i + 1}) ${v}`).join('\n') };
    }

    if (name === 'LRANGE') {
      const found = findKey();
      if (!found || found.type !== 'list') return { keys: nextKeys, output: '(empty list or missing key)' };
      const start = Number(parts[2]) || 0;
      const stop = parts[3] === '-1' ? found.value.length - 1 : (Number(parts[3]) || found.value.length - 1);
      const slice = found.value.slice(start, stop + 1);
      return { keys: nextKeys, output: slice.length ? slice.map((v, i) => `${i + 1}) "${v}"`).join('\n') : '(empty list)' };
    }

    if (name === 'SISMEMBER') {
      const found = findKey();
      const member = parts[2];
      const isMember = found?.type === 'set' && found.value.includes(member);
      return { keys: nextKeys, output: `(integer) ${isMember ? 1 : 0}` };
    }

    if (name === 'SCARD') {
      const found = findKey();
      const count = found?.type === 'set' ? found.value.length : 0;
      return { keys: nextKeys, output: `(integer) ${count}` };
    }

    if (name === 'HDEL') {
      const found = findKey();
      const field = parts[2];
      if (found?.type === 'hash' && field && found.value[field] !== undefined) {
        const next = { ...found.value };
        delete next[field];
        replaceKey({ ...found, value: next });
        return { keys: nextKeys, output: '(integer) 1 - field deleted.' };
      }
      return { keys: nextKeys, output: '(integer) 0 - field not found.' };
    }

    if (name === 'HKEYS') {
      const found = findKey();
      const fields = found?.type === 'hash' ? Object.keys(found.value) : [];
      return { keys: nextKeys, output: fields.length ? fields.map((f, i) => `${i + 1}) "${f}"`).join('\n') : '(empty hash or missing key)' };
    }

    if (name === 'HVALS') {
      const found = findKey();
      const values = found?.type === 'hash' ? Object.values(found.value) : [];
      return { keys: nextKeys, output: values.length ? values.map((v, i) => `${i + 1}) "${v}"`).join('\n') : '(empty hash or missing key)' };
    }

    if (name === 'ZSCORE') {
      const found = findKey();
      const member = parts[2];
      const entry = found?.type === 'zset' ? found.value.find(item => item.member === member) : null;
      return { keys: nextKeys, output: entry ? `"${entry.score}"` : '(nil)' };
    }

    if (name === 'ZRANK') {
      const found = findKey();
      const member = parts[2];
      const rank = found?.type === 'zset' ? found.value.findIndex(item => item.member === member) : -1;
      return { keys: nextKeys, output: rank >= 0 ? `(integer) ${rank}` : '(nil)' };
    }

    if (name === 'UNSUBSCRIBE') {
      const nextChannel = key || 'events';
      setSubscribed(current => current.filter(c => c !== nextChannel));
      return { keys: nextKeys, output: `Unsubscribed from ${nextChannel}.` };
    }

    return { keys: nextKeys, output: `Unknown command: ${name}. Try SET, GET, DEL, TTL, EXPIRE, INCR, INCRBY, SETNX, EXISTS, KEYS, TYPE, PERSIST, RENAME, MSET, MGET, LRANGE, SADD, SMEMBERS, SCARD, SISMEMBER, HSET, HGETALL, HDEL, HKEYS, HVALS, ZADD, ZRANGE, ZSCORE, ZRANK, SUBSCRIBE, PUBLISH.` };
  }

  function runCommand(customCommand = command) {
    const parsed = parseCommand(customCommand);
    if (!parsed) return;
    const before = cloneKeys(activeKeys);
    const result = runCommandOnState(before, parsed);
    setKeys(result.keys);
    setOutput(result.output);
    setHistory(current => [createHistoryEntry(parsed.raw, result, before, result.keys), ...current].slice(0, 12));
  }

  function runCacheRequest() {
    const found = activeKeys.find(item => item.key === cacheKey);
    const before = cloneKeys(activeKeys);
    if (found) {
      const result = { keys: before, output: `CACHE HIT - served ${cacheKey} from Redis.` };
      setOutput(result.output);
      setHistory(current => [createHistoryEntry(`GET ${cacheKey}`, result, before, result.keys), ...current].slice(0, 12));
      return;
    }
    const nextKeys = upsertKeyIn(before, cacheKey, cacheSource, Number(cacheTtl) || 20, 'cache');
    const result = { keys: nextKeys, output: `CACHE MISS - fetched from origin, stored ${cacheKey} for ${cacheTtl}s.` };
    setKeys(nextKeys);
    setOutput(result.output);
    setHistory(current => [createHistoryEntry(`CACHE ${cacheKey}`, result, before, nextKeys), ...current].slice(0, 12));
  }

  function publishMessage() {
    const nextChannel = channel.trim() || 'events';
    const nextMessage = message.trim() || 'hello from Redis';
    setSubscribed(current => Array.from(new Set([...current, nextChannel])));
    setMessages(current => [{ id: Date.now(), channel: nextChannel, message: nextMessage, time: nowLabel() }, ...current].slice(0, 8));
    setOutput(`Published "${nextMessage}" to ${nextChannel}.`);
    setHistory(current => [{
      id: Date.now() + Math.random(),
      time: nowLabel(),
      command: `PUBLISH ${nextChannel} "${nextMessage}"`,
      output: `Published "${nextMessage}" to ${nextChannel}.`,
      diff: { added: [], changed: [], deleted: [] },
    }, ...current].slice(0, 12));
  }

  function resetDemo() {
    setKeys(SAMPLE_KEYS);
    setMessages(START_MESSAGES);
    setSubscribed(['deploys', 'cache']);
    setHistory([]);
    setOutput('Demo reset with sample keys, TTLs, and Pub/Sub messages.');
  }

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="redis-playground" />
      <div className={s.body}>
        <aside className={s.sidebar}>
          <div className={s.sidebarTop}>
            <PlaygroundSidebarTitle slug="redis-playground" name="Redis Playground">
<div className={s.headerRight}><button onClick={resetDemo}>Reset demo</button></div>
</PlaygroundSidebarTitle>
          </div>
          <nav className={s.lessonList}>
            {LESSONS.map(item => (
              <button
                key={item.id}
                className={item.id === activeLesson ? s.lessonActive : ''}
                onClick={() => setActiveLesson(item.id)}
              >
                <strong>{item.title}</strong>
                <small>{item.tag}</small>
              </button>
            ))}
          </nav>
          <div className={s.stats}>
            {stats.map(item => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </aside>

        <main className={s.main}>
          <PlaygroundTopAd />
          <section className={s.concept}>
            <div>
              <span>{lesson.tag}</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.text}</p>
            </div>
            <div className={s.commandChips}>
              {lesson.commands.map(item => (
                <button key={item} onClick={() => { setCommand(item); runCommand(item); }}>{item}</button>
              ))}
            </div>
          </section>

          <section className={s.grid}>
            <div className={s.column}>
              <div className={s.panel}>
                <div className={s.panelHead}>
                  <strong>Command Runner</strong>
                  <span>interactive Redis basics</span>
                </div>
                <div className={s.commandRow}>
                  <input value={command} onChange={event => setCommand(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') runCommand(); }} />
                  <button onClick={() => runCommand()}>Run</button>
                </div>
                <pre className={s.output}>{output}</pre>
                {lesson.challenge && (
                  <div className={challengeDone ? s.challengeDone : s.challenge}>
                    <div>
                      <strong>{lesson.challenge.title}</strong>
                      <p>{lesson.challenge.text}</p>
                    </div>
                    <div className={s.challengeGoals}>
                      {challengeGoals.map(goal => (
                        <span key={goal} className={goalDone(goal, history) ? s.goalDone : ''}>
                          {goalDone(goal, history) ? 'done' : 'todo'} {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={s.panel}>
                <div className={s.panelHead}>
                  <strong>Caching Simulator</strong>
                  <span className={currentCacheStatus === 'hit' ? s.hit : s.miss}>{currentCacheStatus}</span>
                </div>
                <label className={s.field}>
                  <span>Cache key</span>
                  <input value={cacheKey} onChange={event => setCacheKey(event.target.value)} />
                </label>
                <label className={s.field}>
                  <span>Origin response</span>
                  <input value={cacheSource} onChange={event => setCacheSource(event.target.value)} />
                </label>
                <div className={s.cacheActions}>
                  <label>
                    TTL
                    <input type="number" min="1" value={cacheTtl} onChange={event => setCacheTtl(event.target.value)} />
                  </label>
                  <button onClick={runCacheRequest}>{currentCacheStatus === 'hit' ? 'Serve from Redis' : 'Fetch and cache'}</button>
                </div>
                <div className={s.flow}>
                  <span className={currentCacheStatus === 'hit' ? s.flowOn : ''}>Redis lookup</span>
                  <span className={currentCacheStatus === 'miss' ? s.flowOn : ''}>Origin fetch</span>
                  <span>Write with EX</span>
                </div>
              </div>
            </div>

            <div className={s.column}>
              <div className={s.panel}>
                <div className={s.panelHead}>
                  <strong>Key Space</strong>
                  <span>{activeKeys.length} active keys</span>
                </div>
                <div className={s.keyList}>
                  {activeKeys.map(item => (
                    <article key={item.key}>
                      <div>
                        <strong>{item.key}</strong>
                        <code>{formatValue(item.value, item.type)}</code>
                      </div>
                      <div className={s.keyMeta}>
                        <span className={s.typeBadge}>{item.type}</span>
                        <span className={item.ttl == null ? s.ttlStable : s.ttlLive}>{ttlText(item.ttl)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className={s.panel}>
                <div className={s.panelHead}>
                  <strong>Expiration Visualizer</strong>
                  <span>{expiringKeys.length} timers</span>
                </div>
                <div className={s.expireList}>
                  {expiringKeys.length ? expiringKeys.map(item => (
                    <article key={item.key}>
                      <div>
                        <strong>{item.key}</strong>
                        <span>{item.ttl}s left</span>
                      </div>
                      <i><b style={{ width: `${Math.min(100, (item.ttl / 45) * 100)}%` }} /></i>
                    </article>
                  )) : <p>No expiring keys. Run a SET command with EX seconds.</p>}
                </div>
              </div>
            </div>

            <div className={s.fullRow}>
              <div className={s.panel}>
                <div className={s.panelHead}>
                  <strong>Pub/Sub</strong>
                  <span>{subscribed.join(', ')}</span>
                </div>
                <div className={s.pubRow}>
                  <input value={channel} onChange={event => setChannel(event.target.value)} placeholder="channel" />
                  <input value={message} onChange={event => setMessage(event.target.value)} placeholder="message" />
                  <button onClick={publishMessage}>Publish</button>
                </div>
                <div className={s.messageList}>
                  {messages.map(item => (
                    <article key={item.id}>
                      <span>{item.time}</span>
                      <strong>{item.channel}</strong>
                      <p>{item.message}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className={s.fullRow}>
              <div className={s.panel}>
                <div className={s.panelHead}>
                  <strong>Command History & State Diff</strong>
                  <span>{history.length} command{history.length === 1 ? '' : 's'}</span>
                </div>
                <div className={s.historyList}>
                  {history.length ? history.map(item => (
                    <article key={item.id}>
                      <div className={s.historyTop}>
                        <span>{item.time}</span>
                        <code>redis&gt; {item.command}</code>
                      </div>
                      <p>{item.output}</p>
                      <small>{diffText(item.diff)}</small>
                    </article>
                  )) : (
                    <p className={s.emptyHistory}>Run a command to see exactly what changed in the simulated Redis key space.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
