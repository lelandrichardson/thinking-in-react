
let subscribers = [];
let size = { width: 0, height: 0 };

const get = () => size;

const refresh = () => {
  size = {
    width: +window.innerWidth,
    height: +window.innerHeight,
  };
  subscribers.forEach(f => f());
};

const unsubscribe = f => {
  subscribers = subscribers.filter(sub => sub !== f);
};

const subscribe = f => {
  subscribers.push(f);
  return { unsubscribe: () => unsubscribe(f) };
};

// side effects
refresh();
window.addEventListener('resize', refresh, false);

module.exports = {
  get,
  subscribe,
  unsubscribe,
};
