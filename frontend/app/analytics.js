export function event(...args) {
  if (window.ga) ga('send', 'event', 'Page', ...args);
}
