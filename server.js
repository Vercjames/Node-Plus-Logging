// Primary Server Structure || Node-Plus-Logging DEMO
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const express = require('express');
const now = require('performance-now');
const _ = require('lodash');

// Server Initialize
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const server = express();


// Server Structure || Global Operations
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
require('./server-functions/registry.js')(server);


// Server Structure || Routing Registry
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
_.each(require('./server-routing/registry.js'), (controller, route) => {
  controller(server, route);
});


// Server Structure || Initialize Host
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
server.listen(5000, async () => {
  try {
    const sampleSt = now();
    await server.logs({ text: "Example (001) || RequestId", rid: "00000000000000000002"});
    await server.logs({ text: "Example (002) || RequestId", rid: "00000000000000000003"});
    await server.logs({ text: "Example (003) || No RequestId"});

    // custom time
    await server.wait(77);
    await server.logs({ text: "Example (004) || Custom Start Time", rid: "00000000000000000004", st: sampleSt});

    // these to events are running in parallel. Since log2 takes 50ms longer (due to a nested server.wait function)
    // these 2 events will flipflop in the console. placing event 5 above 6 as it should be =)
    server.log2({ text: "Example (006) || In Parallel", rid: "00000000000000000006"});
    server.logs({ text: "Example (005) || In Parallel", rid: "00000000000000000005"});

    // Custom Typing and how it affects color!
    await server.wait(100);
    await server.logs({ text: "Example (007) || Types, errors", rid: "00000000000000000007", errors: true});
    await server.logs({ text: "Example (008) || Types, errors", rid: "00000000000000000008", type: "errors"});
    await server.logs({ text: "Example (009) || Types, alerts", rid: "00000000000000000009", type: "alerts"});

    // set the normal value to null to revert to traditional text format.
    await server.logs({ text: "Example (010) || Types, normal", rid: "00000000000000000010", type: "normal"});
    await server.logs({ text: "Example (011) || Types, debugs", rid: "00000000000000000011", type: "debugs"});

    // Type 'others' catches any unexpected or odd values for type.
    await server.logs({ text: "Example (012) || Types, others", rid: "00000000000000000012", type: "others"});
    await server.logs({ text: "Example (013) || Types, bubble", rid: "00000000000000000013", type: "bubble"});

    // anything else
    await server.logs({ text: "Example (014) || Types, default", rid: "00000000000000000014", type: "default"});
  } catch (e) {
    await server.logs({ text: e, errors: true});
  }
});
