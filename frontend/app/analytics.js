export function event(...args) {
  if (ga) ga('send', 'event', 'Page', ...args);
}
