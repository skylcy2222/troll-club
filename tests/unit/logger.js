function log(...args) {
  console.log(new Date().toISOString(), "[INFO]", ...args);
}

function warn(...args) {
  console.warn(new Date().toISOString(), "[WARN]", ...args);
}

function error(...args) {
  console.error(new Date().toISOString(), "[ERROR]", ...args);
}

module.exports = {
  log,
  warn,
  error,
};