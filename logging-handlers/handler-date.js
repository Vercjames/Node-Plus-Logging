// Node-Plus-Logger Core || Evaluation Scripts
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = {

  // Logging || Append Date Structure
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  appendZeroToLength(value, length) {
    return `${value}`.padStart(length, 0);
  },


  // Logging || Define Date Structure
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  getDateAsText() {
    const now = new Date();
    return `${module.exports.appendZeroToLength(now.getUTCFullYear(), 4)}/${
      module.exports.appendZeroToLength(now.getUTCMonth() + 1, 2)}/${
      module.exports.appendZeroToLength(now.getUTCDate(), 2)} ${
      module.exports.appendZeroToLength(now.getUTCHours(), 2)}:${
      module.exports.appendZeroToLength(now.getUTCMinutes(), 2)}:${
      module.exports.appendZeroToLength(now.getUTCSeconds(), 2)}.${
      module.exports.appendZeroToLength(now.getUTCMilliseconds(), 4)} UTC`;
  },


  // Logging || Define Date Structure
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  getYDT() {
    const now = new Date();
    return `${module.exports.appendZeroToLength(now.getUTCFullYear(), 4)}-${
      module.exports.appendZeroToLength(now.getUTCMonth() + 1, 2)}-${
      module.exports.appendZeroToLength(now.getUTCDate(), 2)}`;
  }
};
