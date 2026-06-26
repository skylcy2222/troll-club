function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isMinLength(value, min) {
  return typeof value === "string" && value.trim().length >= min;
}

module.exports = {
  isEmail,
  isNonEmptyString,
  isMinLength,
};