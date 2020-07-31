// Node-Plus-Logger Core || Primary File
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const fs = require('fs');
const util = require('util');
const chalk = require('chalk/source');
const ctx = new chalk.Instance({ level: 3 });
const now = require('performance-now');
const wait = util.promisify(setTimeout);

// Logging Separation
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const { generateId } = require('./logging-handlers/handler-hex.js');
const { getYDT, getDateAsText } = require('./logging-handlers/handler-date.js');
// TODO Consider expanding Chalk Support for Modifiers

// Logging Class Definition
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = class Logging {
  constructor(config) {
    this.console = {};
    this.console.ip = {};
    this.console.ip.color = (config.console && config.console.ip && config.console.ip.color ? config.console.ip.show : false);
    this.console.ip.spacer = (config.console && config.console.ip && config.console.ip.spacer ? config.console.ip.spacer : false);
    this.console.ip.headers = (config.console && config.console.ip && config.console.ip.headers ? config.console.ip.headers : false);
    this.console.ip.brackets = (config.console && config.console.ip && config.console.ip.brackets ? config.console.ip.brackets : false);
    this.console.ip.reactive = (config.console && config.console.ip && config.console.ip.reactive ? config.console.ip.reactive : false);

    this.console.rid = {};
    this.console.rid.color = (config.console && config.console.rid && config.console.rid.color ? config.console.rid.color : false);
    this.console.rid.spacer = (config.console && config.console.rid && config.console.rid.spacer ? config.console.rid.spacer : false);
    this.console.rid.headers = (config.console && config.console.rid && config.console.rid.headers ? config.console.rid.headers : false);
    this.console.rid.brackets = (config.console && config.console.rid && config.console.rid.brackets ? config.console.rid.brackets : false);
    this.console.rid.reactive = (config.console && config.console.rid && config.console.rid.reactive ? config.console.rid.reactive : false);

    this.console.time = {};
    this.console.time.color = (config.console && config.console.time && config.console.time.color ? config.console.time.color : false);
    this.console.time.spacer = (config.console && config.console.time && config.console.time.spacer ? config.console.time.spacer : false);
    this.console.time.headers = (config.console && config.console.time && config.console.time.headers ? config.console.time.headers : false);
    this.console.time.brackets = (config.console && config.console.time && config.console.time.brackets ? config.console.time.brackets : false);
    this.console.time.reactive = (config.console && config.console.time && config.console.time.reactive ? config.console.time.reactive : false);
    this.console.time.padding = (config.console && config.console.time && config.console.time.padding ? config.console.time.padding : 12);
    this.console.time.decibel = (config.console && config.console.time && config.console.time.decibel ? config.console.time.decibel : 4);

    this.console.type = {};
    this.console.type.color = (config.console && config.console.type && config.console.type.color ? config.console.type.color : false);
    this.console.type.spacer = (config.console && config.console.type && config.console.type.spacer ? config.console.type.spacer : false);
    this.console.type.headers = (config.console && config.console.type && config.console.type.headers ? config.console.type.headers : false);
    this.console.type.brackets = (config.console && config.console.type && config.console.type.brackets ? config.console.type.brackets : false);
    this.console.type.reactive = (config.console && config.console.type && config.console.type.reactive ? config.console.type.reactive : false);
    this.console.type.default = (config.console && config.console.type && config.console.type.default ? config.console.type.default : 'REPORT');
    this.console.type.alerts = (config.console && config.console.type && config.console.type.alerts ? config.console.type.alerts : 'ALERTS');
    this.console.type.debugs = (config.console && config.console.type && config.console.type.debugs ? config.console.type.debugs : 'DEBUGS');
    this.console.type.errors = (config.console && config.console.type && config.console.type.errors ? config.console.type.errors : 'ERRORS');

    this.console.date = {};
    this.console.date.color = (config.console && config.console.date && config.console.date.color ? config.console.date.color : false);
    this.console.date.spacer = (config.console && config.console.date && config.console.date.spacer ? config.console.date.spacer : false);
    this.console.date.headers = (config.console && config.console.date && config.console.date.headers ? config.console.date.headers : false);
    this.console.date.brackets = (config.console && config.console.date && config.console.date.brackets ? config.console.date.brackets : false);
    this.console.date.reactive = (config.console && config.console.date && config.console.date.reactive ? config.console.date.reactive : false);

    this.console.text = {};
    this.console.text.color = (config.console && config.console.text && config.console.text.color ? config.console.text.color : false);
    this.console.text.spacer = (config.console && config.console.text && config.console.text.spacer ? config.console.text.spacer : false);
    this.console.text.headers = (config.console && config.console.text && config.console.text.headers ? config.console.text.headers : false);
    this.console.text.brackets = (config.console && config.console.text && config.console.text.brackets ? config.console.text.brackets : false);
    this.console.text.reactive = (config.console && config.console.text && config.console.text.reactive ? config.console.text.reactive : false);

    // Print Defaults
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    this.print = {};
    this.print.ip = {};
    this.print.ip.spacer = (config.print && config.print.ip && config.print.ip.spacer ? config.print.ip.spacer : false);
    this.print.ip.headers = (config.print && config.print.ip && config.print.ip.headers ? config.print.ip.headers : false);
    this.print.ip.brackets = (config.print && config.print.ip && config.print.ip.brackets ? config.print.ip.brackets : false);

    this.print.rid = {};
    this.print.rid.spacer = (config.print && config.print.rid && config.print.rid.spacer ? config.print.rid.spacer : false);
    this.print.rid.headers = (config.print && config.print.rid && config.print.rid.headers ? config.print.rid.headers : false);
    this.print.rid.brackets = (config.print && config.print.rid && config.print.rid.brackets ? config.print.rid.brackets : false);

    this.print.time = {};
    this.print.time.spacer = (config.print && config.print.time && config.print.time.spacer ? config.print.time.spacer : false);
    this.print.time.headers = (config.print && config.print.time && config.print.time.headers ? config.print.time.headers : false);
    this.print.time.brackets = (config.print && config.print.time && config.print.time.brackets ? config.print.time.brackets : false);
    this.print.time.padding = (config.print && config.print.time && config.print.time.padding ? config.print.time.padding : 12);
    this.print.time.decibel = (config.print && config.print.time && config.print.time.decibel ? config.print.time.decibel : 4);

    this.print.type = {};
    this.print.type.spacer = (config.print && config.print.type && config.print.type.spacer ? config.print.type.spacer : false);
    this.print.type.headers = (config.print && config.print.type && config.print.type.headers ? config.print.type.headers : false);
    this.print.type.brackets = (config.print && config.print.type && config.print.type.brackets ? config.print.type.brackets : false);
    this.print.type.default = (config.print && config.print.type && config.print.type.default ? config.print.type.default : 'REPORT');
    this.print.type.alerts = (config.print && config.print.type && config.print.type.alerts ? config.print.type.alerts : 'ALERTS');
    this.print.type.debugs = (config.print && config.print.type && config.print.type.debugs ? config.print.type.debugs : 'DEBUGS');
    this.print.type.errors = (config.print && config.print.type && config.print.type.errors ? config.print.type.errors : 'ERRORS');

    this.print.date = {};
    this.print.date.spacer = (config.print && config.print.date && config.print.date.spacer ? config.print.date.spacer : false);
    this.print.date.headers = (config.print && config.print.date && config.print.date.headers ? config.print.date.headers : false);
    this.print.date.brackets = (config.print && config.print.date && config.print.date.brackets ? config.print.date.brackets : false);

    this.print.text = {};
    this.print.text.spacer = (config.print && config.print.text && config.print.text.spacer ? config.print.text.spacer : false);
    this.print.text.headers = (config.print && config.print.text && config.print.text.headers ? config.print.text.headers : false);
    this.print.text.brackets = (config.print && config.print.text && config.print.text.brackets ? config.print.text.brackets : false);


    // Global Defaults
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    this.colors = {};
    this.colors.errors = (config.colors && config.colors.errors ? config.colors.errors : 'red');
    this.colors.debugs = (config.colors && config.colors.debugs ? config.colors.debugs : 'cyan');
    this.colors.alerts = (config.colors && config.colors.alerts ? config.colors.alerts : 'yellow');
    this.colors.others = (config.colors && config.colors.others ? config.colors.others : 'magenta');
    this.colors.default = (config.colors && config.colors.default ? config.colors.default : null);
    this.colors.normal = (config.colors && config.colors.normal ? config.colors.normal : null);

    this.settings = {};
    this.settings.rid = (config.settings && config.settings.rid ? config.settings.rid : false);
    this.settings.log = (config.settings && config.settings.log ? config.settings.log : false);
    this.settings.save = (config.settings && config.settings.save ? config.settings.save : false);
    this.settings.location = (config.settings && config.settings.location ? config.settings.location : `./logs/`);

    this.order = {};
    this.order.print = (config.order && config.order.print ? config.order.print : ['date', 'ip', 'rid', 'time', 'type', 'text']);
    this.order.console = (config.order && config.order.console ? config.order.console : ['rid', 'time', 'type', 'text']);
  }

  // Logging || Primary Script
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async script(values) {
    let self = this;
    values.st = values.st || now();
    values.rid = values.rid || generateId(this.settings.rid);

    if(this.settings.save && self.order.print.length) {
      const cleanEval = await self.awaitEval(self.order.print, values, 'print');
      await new Promise(async (resolve, reject) => {
        const filename = `${self.settings.location}${getYDT()}.log`;
        const logText = await self.awaitString(cleanEval, 'print') + `\r\n`;
        fs.appendFile(filename, logText, 'utf8', async function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    if (this.settings.log) {
      const cleanEval = await self.awaitEval(self.order.console, values, 'console');
      console.log(await self.awaitString(cleanEval, 'console', values));
    }
  }

  // Logging || Await Evaluation
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async awaitEval(array, values, log) {
    let promises = [];
    for (let i = 0; i < array.length; ++i) {
      promises.push(eval(`this.${array[i]}Eval(values, log)`))
    }
    return Promise.all(promises);
  }

  // Logging || Await Strings
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async awaitString(array, order, values) {
    let printStr = '';
    for (let i = 0; i < array.length; i++) {
      if (order === 'print') {
        let reference = this[order][this.order[order][i]];
        let spacer = this.applySpacer(reference.spacer, array[i]);
        printStr += `${array[i]}${spacer}`
      }
      if (order === 'console') {
        let arrayValue = array[i];
        let reference = this[order][this.order[order][i]];
        if (this[order][this.order[order][i]].color) {
          arrayValue = await this.applyColor(reference, arrayValue, values);
        }
        let spacer = this.applySpacer(reference.spacer, array[i]);
        printStr += `${arrayValue}${spacer}`
      }
    }
    return printStr
  }

  // Logging || Apply Color
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async applyColor(ref, str, values) {
    if (ref.reactive) {
      if (values.errors) {
        return `${ctx.bold[this.colors.errors](str)}`
      }

      switch (values.type) {
        case 'errors':
          return `${ctx.bold[this.colors.errors](str)}`;
        case 'alerts':
          return `${ctx.bold[this.colors.alerts](str)}`;
        case 'debugs':
          return `${ctx.bold[this.colors.debugs](str)}`;
        default:
          break
      }
    }
    if(ref.color === true) {
      if ( this.colors.default === null) {
        return str
      }
      // default color is used.
      return `${ctx.bold[this.colors.default](str)}`
    }
    if(ref.color) {
      // ref.color is used.
      return `${ctx.bold[ref.color](str)}`
    }
    return str
  }

  // Logging || Evaluate 'Type'
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  typeEval(values, log) {
    try {
      let typeString = this[log].type.default;

      // console.log(values.type)
      switch (values.type) {
        case 'errors':
          typeString = this[log].type.errors;
          break;
        case 'alerts':
          typeString = this[log].type.alerts;
          break;
        case 'debugs':
          typeString = this[log].type.debugs;
          break;
        default:
          typeString = this[log].type.default;
          break;
      }

      if (values.error || values.errors) {
        typeString = this[log].type.errors;
      }

      typeString = this.applyBrackets('type', typeString, log);
      typeString = this.applyHeader('type', typeString, log);
      return typeString
    } catch (e) {
      throw new Error(`'typeEval' || Evaluation has failed ${e.message}`)
    }
  }

  // Logging || Evaluate 'IP'
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async ipEval(values, log) {
    try {
      if (values.ip) {
        let ip = values.ip;
        ip = this.applyBrackets('ip', ip, log);
        ip = this.applyHeader('ip', ip, log);
        return ip
      } else {
        return ''
      }
    } catch (e) {
      throw new Error(`'ipEval' || Evaluation has failed ${e.message}`)
    }
  }

  // Logging || Evaluate 'Text'
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async textEval(values, log) {
    try {
      let text = values.text || values.error;
      text = this.applyBrackets('text', text, log);
      text = this.applyHeader('text', text, log);
      return text
    } catch (e) {
      throw new Error(`'textEval' || Evaluation has failed ${e.message}`)
    }
  }

  // Logging || Evaluate Time
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async timeEval(values, log) {
    try {
      let timeString = (now() - values.st).toFixed(this[log].time.decibel).padStart(this[log].time.padding, '0');
      timeString = this.applyBrackets('time', timeString, log);
      timeString = this.applyHeader('time', timeString, log);
      return timeString
    } catch (e) {
      throw new Error(`'timeEval' || Evaluation has failed ${e.message}`)
    }
  }

  // Logging || Evaluate RID
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async ridEval(values, log) {
    try {
      let ridString = values.rid;
      ridString = this.applyBrackets('rid', ridString, log);
      ridString = this.applyHeader('rid', ridString, log);
      return ridString
    } catch (e) {
      throw new Error(`'ridEval' || Evaluation has failed ${e.message}`)
    }
  }

  // Logging || Evaluate Date
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  async dateEval(values, log) {
    try {
      let dateString = getDateAsText();
      dateString = this.applyBrackets('date', dateString, log);
      dateString = this.applyHeader('date', dateString, log);
      return dateString
    } catch (e) {
      throw new Error(`'dateEval' || Evaluation has failed ${e.message}`)
    }
  }

  // Logging || Apply Header
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  applyHeader(ref, str, log) {
    if (typeof this[log][ref]["headers"] === "boolean") {
      if (!this[log][ref]["headers"]) {
        return str
      }
      return `RID: ${str}`
    }
    return `${this[log][ref]["headers"]}${str}`
  }

  // Logging || Apply Brackets
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  applyBrackets(ref, str, log) {
    if (typeof this[log][ref]["brackets"] === "boolean") {
      if (!this[log][ref]["brackets"]) {
        return str
      }
      return `[${str}]`
    }
    let brackets = this[log][ref]["brackets"].split("-");
    return `${brackets[0]}${str}${brackets[1]}`
  }

  // Logging || Apply Spacer
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  applySpacer(ref, str) {
    if (typeof ref === "boolean") {
      if (!ref) {
        return ''
      }
      if (ref && str.length === 0 ) {
        return ''
      }
      return ' '
    }
    return ref
  }
};


