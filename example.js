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

// Travel parameters
const params = {
  fromStation: 'Amersfoort',
  toStation: 'Den Haag',
};

// Get travel advise
ns.trips (params)
  .then (output)
  .catch (console.error)
;
