const Time = (() => {
  let priv = {
    timeSpeed: 1,
    handlers: new Map(),
  };
  let Time = {};
  Time.setTimeSpeed = t => {
    priv.timeSpeed = t;
    priv.handlers.forEach(v => v());
  };
  Time.getTimeSpeed = () => {
    return priv.timeSpeed;
  };
  Time.onSpeedChange = (key, handler) => {
    priv.handlers.set(key, handler);
  };
  Time.offSpeedChange = key => {
    priv.handlers.delete(key);
  };
  return Time;
})();
