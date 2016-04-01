var dotest = require ('dotest');
var app = require ('./');

var ns;
var config = {
  username: process.env.NS_USERNAME || null,
  password: process.env.NS_PASSWORD || null,
  timeout: process.env.NS_TIMEOUT || 5000
};


if (!config.username || !config.password) {
  dotest.log ('fail', 'NS_USERNAME and NS_PASSWORD are required');
  process.exit ();
}


ns = app (config);


dotest.add ('Module', function () {
  dotest.test ()
    .isFunction ('fail', 'exports', app)
    .isObject ('fail', 'interface', ns)
    .isFunction ('fail', '.vertrektijden method', ns && ns.vertrektijden)
    .isFunction ('fail', '.reisadvies method', ns && ns.reisadvies)
    .isFunction ('fail', '.prijzen method', ns && ns.prijzen)
    .isFunction ('fail', '.stations method', ns && ns.stations)
    .isFunction ('fail', '.storingen method', ns && ns.storingen)
    .done ();
});


dotest.add ('API error', function () {
  ns.reisadvies (function (err, data) {
    dotest.test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isObject ('fail', 'err.api', err && err.api)
      .isString ('fail', 'err.api.message', err && err.api && err.api.message)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Method .reisadvies', function () {
  var params = {
    fromStation: 'Amersfoort',
    toStation: 'Amsterdam'
  };

  ns.reisadvies (params, function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data [0])
      .isArray ('fail', 'data[0].ReisDeel', data && data [0] && data [0] .ReisDeel)
      .isNotEmpty ('fail', 'data[0].ReisDeel', data && data [0] && data [0] .ReisDeel)
      .done ();
  });
});


dotest.add ('Method .storingen - with params', function () {
  ns.storingen ({ actual: false }, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.Ongepland', data && data.Ongepland)
      .isArray ('fail', 'data.Gepland', data && data.Gepland)
      .done ();
  });
});


dotest.add ('Method .storingen - without params', function () {
  ns.storingen (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.Ongepland', data && data.Ongepland)
      .isArray ('fail', 'data.Gepland', data && data.Gepland)
      .done ();
  });
});


dotest.add ('Method .stations - no key', function () {
  ns.stations (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.HT', data && data.HT)
      .isExactly ('fail', 'data.HT.Code', data && data.HT && data.HT.Code, 'HT')
      .isArray ('fail', 'data.HT.Synoniemen', data && data.HT && data.HT.Synoniemen)
      .done ();
  });
});


dotest.add ('Method .stations - array', function () {
  ns.stations (false, function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data [0])
      .isString ('fail', 'data[0].Code', data && data [0] && data [0] .Code)
      .isArray ('fail', 'data[0].Synoniemen', data && data [0] && data [0] .Synoniemen)
      .done ();
  });
});


dotest.add ('Method .stations - by Type', function () {
  ns.stations ('Type', function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data.megastation', data && data.megastation)
      .isObject ('fail', 'data.megastation.ASD', data && data.megastation.ASD)
      .isExactly ('fail', 'data.megastation.ASD.Land', data && data.megastation && data.megastation.ASD && data.megastation.ASD.Land, 'NL')
      .isArray ('fail', 'data.megastation.ASD.Synoniemen', data && data.megastation && data.megastation.ASD && data.megastation.ASD.Synoniemen)
      .done ();
  });
});


dotest.add ('Method .vertrektijden', function () {
  ns.vertrektijden ('UT', function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data [0])
      .isString ('fail', 'data[0].RitNummer', data && data [0] && data [0] .RitNummer)
      .isBoolean ('fail', 'data[0].VertrekSpoorWijziging', data && data [0] && data [0] .VertrekSpoorWijziging)
      .done ();
  });
});


dotest.add ('Method .prijzen', function () {
  dotest.log ('warn', 'No test available yet')
  dotest.test () .done ();
});


dotest.run ();
