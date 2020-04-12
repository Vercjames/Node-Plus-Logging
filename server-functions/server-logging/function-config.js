// Primary Config Structure || Node-Plus-Logging config
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = {
  print: {
    ip: {
      spacer: true,
      headers: false,
      brackets: false,
    },
    rid: {
      spacer: " -> ",
      headers: "RID: ",
      brackets: "[-]",
    },
    type: {
      spacer: true,
      headers: false,
      brackets: "[-]",
    },
    time: {
      spacer: " -> ",
      headers: "TIME: ",
      brackets: "[-]",
    },
    date: {
      spacer: " -> ",
      headers: false,
      brackets: false,
    },
    text: {
      spacer: false,
      headers: false,
      brackets: false,
    }
  },
  console: {
    ip: {
      color: false,
      spacer: false,
      headers: false,
      brackets: false,
      reactive: true,
    },
    rid: {
      color: 'yellow',
      spacer: " -> ",
      headers: "RID: ",
      brackets: "[-]",
      reactive: false,
    },
    type: {
      color: true,
      spacer: true,
      headers: false,
      brackets: "[-]",
      reactive: true,
    },
    time: {
      color: true,
      spacer: " -> ",
      headers: "TIME: ",
      brackets: '[-]',
      reactive: true,
    },
    date: {
      color: false,
      spacer: false,
      headers: false,
      brackets: false,
      reactive: true,
    },
    text: {
      color: false,
      spacer: false,
      headers: false,
      brackets: false,
      reactive: true,
    }
  },
  settings: {
    location: './server-functions/server-logging/',
  },
  colors: {
    errors: "red"
  }
};
