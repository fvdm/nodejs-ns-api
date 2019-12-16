/* istanbul ignore file */

const dotest = require ('dotest');
const app = require ('./');

const config = {
  key: process.env.NS_APIKEY,
  timeout: process.env.NS_TIMEOUT || 8000,
};

const ns = new app (config);

// data stores
let disruption;
let trip;

let dateTime = new Date();

dateTime.setDate (dateTime.getDate() + 1);
dateTime.setHours (14);
dateTime.setMinutes (0);


// Basic tests
dotest.add ('Module', async test => {
  test()
    .isClass ('fail', 'exports', app)
    .isFunction ('fail', '.getAllStations', ns && ns.getAllStations)
    .isFunction ('fail', '.getArrivals', ns && ns.getArrivals)
    .isFunction ('fail', '.getCalamities', ns && ns.getCalamities)
    .isFunction ('fail', '.getDepartures', ns && ns.getDepartures)
    .isFunction ('fail', '.getDisruption', ns && ns.getDisruption)
    .isFunction ('fail', '.getDisruptions', ns && ns.getDisruptions)
    .isFunction ('fail', '.getStationDisruption', ns && ns.getStationDisruption)
    .isFunction ('fail', '.getTrip', ns && ns.getTrip)
    .isFunction ('fail', '.getTrips', ns && ns.getTrips)
    .isFunction ('fail', '.getPrice', ns && ns.getPrice)
    .done ()
  ;
});


dotest.add ('API error - statusCode >= 300', async test => {
  let data;
  let error;

  try {
    data = await ns.getTrip();
  }
  catch (err) {
    error = err;
  }
  finally {
    test ()
      .isError ('fail', 'err', error)
      .isExactly ('fail', 'err.message', error && error.message, 'Resource not found')
      .isUndefined ('fail', 'data', data)
      .done ()
    ;
  }
});


dotest.add ('API error - code && message', async test => {
  let data;
  let error;

  try {
    data = await ns.getPrice ({});
  }
  catch (err) {
    error = err;
  }
  finally {
    test ()
      .isError ('fail', 'err', error)
      .isUndefined ('fail', 'data', data)
      .done ()
    ;
  }
});


dotest.add ('Method .getAllStations', async test => {
  try {
    const data = await ns.getAllStations();

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].code', data && data[0] && data[0].code)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getArrivals - Without dateTime', async test => {
  try {
    const data = await ns.getArrivals ({
      station: 'UT',
    });

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].name', data && data[0] && data[0].name)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getArrivals - Date instance dateTime', async test => {
  try {
    const data = await ns.getArrivals ({
      dateTime,
      station: 'UT',
    });

    test ()
      .info ('dateTime = Tomorrow 14:00')
      .info (dateTime.toString())
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].actualDateTime', data && data[0] && data[0].actualDateTime)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getArrivals - String dateTime', async test => {
  try {
    const data = await ns.getArrivals ({
      dateTime: dateTime.toString(),
      station: 'UT',
    });

    test ()
      .info ('dateTime = Tomorrow 14:00')
      .info (dateTime.toString())
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].actualDateTime', data && data[0] && data[0].actualDateTime)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getCalamities', async test => {
  try {
    const data = await ns.getCalamities();

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getDepartures - Without dateTime', async test => {
  try {
    const data = await ns.getDepartures ({
      station: 'UT',
    });

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getDepartures - Date instance dateTime', async test => {
  try {
    const data = await ns.getDepartures ({
      station: 'UT',
      dateTime: dateTime.toGMTString(),
    });

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getDisruptions', async test => {
  try {
    const data = await ns.getDisruptions();

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;

    // save one for the next test
    if (data[0]) {
      disruption = data[0];
    }
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getDisruption', async test => {
  if (!disruption) {
    test ()
      .warn ('No disruption available! Wow this is unique.')
      .done ()
    ;

    return;
  }

  try {
    const data = await ns.getDisruption ({
      id: disruption.id,
    });

    test ()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.id', data && data.id, disruption.id)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getStationDisruption', async test => {
  try {
    const data = await ns.getStationDisruption ({
      code: 'UT',
    });

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getTrips - Without dateTime', async test => {
  try {
    const data = await ns.getTrips ({
      fromStation: 'UT',
      toStation: 'AMF',
    });

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;

    // save one for the next test
    if (data[0]) {
      trip = data[0];
    }
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getTrips - Including dateTime', async test => {
  try {
    const data = await ns.getTrips ({
      fromStation: 'UT',
      toStation: 'AMF',
      dateTime: dateTime.toGMTString(),
    });

    test ()
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;

    // save one for the next test
    if (data[0]) {
      trip = data[0];
    }
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getTrip', async test => {
  if (!trip) {
    test ()
      .warn ('No trip available!')
      .done ()
    ;

    return;
  }

  try {
    const data = await ns.getTrip ({
      ctxRecon: trip.ctxRecon,
    });

    test ()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.ctxRecon', data && data.ctxRecon, trip.ctxRecon)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getPrice - Without date', async test => {
  if (!trip) {
    test ()
      .warn ('No trip available!')
      .done ()
    ;

    return;
  }

  try {
    const data = await ns.getPrice ({
      ctxRecon: trip.ctxRecon,
    });

    test ()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isNumber ('fail', 'data.totalPriceInCents', data && data.totalPriceInCents)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Method .getPrice - Including date', async test => {
  if (!trip) {
    test ()
      .warn ('No trip available!')
      .done ()
    ;

    return;
  }

  try {
    const data = await ns.getPrice ({
      ctxRecon: trip.ctxRecon,
      date: dateTime.toString(),
    });

    test ()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isNumber ('fail', 'data.totalPriceInCents', data && data.totalPriceInCents)
      .done ()
    ;
  }
  catch (err) {
    test (err).done ();
  }
});


dotest.add ('Config timeout', async test => {
  let data;
  let error;

  const tmp = new app ({
    key: config.key,
    timeout: 1,
  });

  try {
    data = await tmp.getAllStations();
  }
  catch (err) {
    error = err;
  }
  finally {
    test ()
      .isError ('fail', 'err', error)
      .isExactly ('fail', 'err.code', error && error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ()
    ;
  }
});


dotest.run (500);
