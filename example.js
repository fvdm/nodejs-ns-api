var ns = require ('ns-api') ({
  username: 'api-username',
  password: 'api-password'
});

// Travel parameters
var params = {
  fromStation: 'Amersfoort',
  toStation: 'Den Haag',
};

// console.log does not log >3 levels
function myCallback (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}

// Get travel advise
ns.reisadvies (params, myCallback);
