import path from 'path';

export function info (...args) {
  log('info', '[INFO]', ...args);
}

export function error (...args) {
  log('error', '[ERROR]', ...args);
}

export function warn (...args) {
  log('warn', '[WARN]', ...args);
}

export function todo (...args) {
  log('info', '[TODO]', ...args);
}

function log (severity: 'info' | 'error' | 'warn', ...args) {
  console[severity](getPrefix(), ...args);
}

function getPrefix () {
  const potentialStack = ((new Error()).stack || '').split('\n').filter((t) => t.match(/scripts\/(data|assets)/) && !t.includes('index.ts'));
  const line = potentialStack.length ? potentialStack.pop() : ((new Error()).stack || '').split('\n').filter((t) => !t.includes('next_tick')).pop();
  if (line) {
    const parse = path.parse(line);
    return `[${parse.name}]`;
  } else {
    return '[unknown]';
  }
}