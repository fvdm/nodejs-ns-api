const NSAPI = require ('ns-api');
const ns = new NSAPI ({
  key: 'abc123',
});

// console.log does not log >3 levels
function output (data) {
  console.dir (data, {
    depth: null,
    colors: true,
  });
}

// Get travel advise
ns.getTrips ({
  fromStation: 'Amersfoort',
  toStation: 'Den Haag',
})
  .then (output)
  .catch (console.error)
;
