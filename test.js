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


// ! Basic tests
dotest.add ('Module', async test => {
  test ()
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
    .isFunction ('fail', '.getJourney', ns && ns.getJourney)
    .isFunction ('fail', '.placesList', ns && ns.placesList)
    .isFunction ('fail', '.placesGet', ns && ns.placesGet)
    .isFunction ('fail', '.placesOvfiets', ns && ns.placesOvfiets)
    .done ()
  ;
});


dotest.add ('API error - statusCode', async test => {
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
      .isExactly ('fail', 'err.message', error && error.message, 'API error')
      .isExactly ('fail', 'err.statusCode', error && error.statusCode, 404)
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
      .isError ('fail', 'error', error)
      .isNotEmpty ('fail', 'error.message', error && error.message)
      .isExactly ('fail', 'error.code', error && error.code, 404)
      .isUndefined ('fail', 'data', data)
      .done ()
    ;
  }
});


// ! REISINFORMATIE
dotest.add ('Method .getAllStations', async test => {
  let data;
  let error;

  try {
    data = await ns.getAllStations();
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].code', data && data[0] && data[0].code)
      .done ()
    ;
  }
});


dotest.add ('Method .getArrivals - Without dateTime', async test => {
  let data;
  let error;

  try {
    data = await ns.getArrivals ({
      station: 'UT',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].name', data && data[0] && data[0].name)
      .done ()
    ;
  }
});


dotest.add ('Method .getArrivals - Date instance dateTime', async test => {
  let data;
  let error;

  try {
    data = await ns.getArrivals ({
      dateTime,
      station: 'UT',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .info ('dateTime = Tomorrow 14:00')
      .info (dateTime.toString())
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].actualDateTime', data && data[0] && data[0].actualDateTime)
      .done ()
    ;
  }
});


dotest.add ('Method .getArrivals - String dateTime', async test => {
  let error;
  let data;

  try {
    data = await ns.getArrivals ({
      dateTime: dateTime.toString(),
      station: 'UT',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .info ('dateTime = Tomorrow 14:00')
      .info (dateTime.toString())
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .isString ('fail', 'data[0].actualDateTime', data && data[0] && data[0].actualDateTime)
      .done ()
    ;
  }
});


dotest.add ('Method .getCalamities', async test => {
  let data;
  let error;

  try {
    data = await ns.getCalamities();
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
});


dotest.add ('Method .getDepartures - Without dateTime', async test => {
  let data;
  let error;

  try {
    data = await ns.getDepartures ({
      station: 'UT',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
});


dotest.add ('Method .getDepartures - Date instance dateTime', async test => {
  let data;
  let error;

  try {
    data = await ns.getDepartures ({
      station: 'UT',
      dateTime: dateTime.toGMTString(),
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
});


dotest.add ('Method .getDisruptions', async test => {
  let data;
  let error;

  try {
    data = await ns.getDisruptions();
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;

    // save one for the next test
    if (data[0]) {
      disruption = data[0];
    }
  }
});


dotest.add ('Method .getDisruptions - actual', async test => {
  let data;
  let error;

  try {
    data = await ns.getDisruptions({
      actual: true,
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
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

  let data;
  let error;

  try {
    data = await ns.getDisruption ({
      type: disruption.type,
      id: disruption.id,
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.id', data && data.id, disruption.id)
      .done ()
    ;
  }
});


dotest.add ('Method .getStationDisruption', async test => {
  let data;
  let error;

  try {
    data = await ns.getStationDisruption ({
      code: 'UT',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;
  }
});


dotest.add ('Method .getTrips - Without dateTime', async test => {
  let data;
  let error;

  try {
    data = await ns.getTrips ({
      fromStation: 'UT',
      toStation: 'AMF',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;

    // save one for the next test
    if (data[0]) {
      trip = data[0];
    }
  }
});


dotest.add ('Method .getTrips - Including dateTime', async test => {
  let data;
  let error;

  try {
    data = await ns.getTrips ({
      fromStation: 'UT',
      toStation: 'AMF',
      dateTime: dateTime.toGMTString(),
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ()
    ;

    // save one for the next test
    if (data[0]) {
      trip = data[0];
    }
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

  let data;
  let error;

  try {
    data = await ns.getTrip ({
      ctxRecon: trip.ctxRecon,
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isExactly ('fail', 'data.ctxRecon', data && data.ctxRecon, trip.ctxRecon)
      .done ()
    ;
  }
});


dotest.add ('Method .getPrice - Without date', async test => {
  let data;
  let error;

  try {
    data = await ns.getPrice ({
      fromStation: 'UT',
      toStation: 'AMF',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isNumber ('fail', 'data.totalPriceInCents', data && data.totalPriceInCents)
      .done ()
    ;
  }
});


dotest.add ('Method .getPrice - Including date', async test => {
  let data;
  let error;

  try {
    data = await ns.getPrice ({
      fromStation: 'UT',
      toStation: 'AMF',
      date: dateTime.toString(),
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isNumber ('fail', 'data.totalPriceInCents', data && data.totalPriceInCents)
      .done ()
    ;
  }
});


dotest.add ('Method .getJourney', async test => {
  let data;
  let error;

  try {
    data = await ns.getJourney ({
      id: trip.legs[0].journeyDetail[0].link.uri,
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .done ()
    ;
  }
});


// ! PLACES
dotest.add ('Method .placesList', async test => {
  let data;
  let error;

  try {
    data = await ns.placesList ({
      q: 'utrecht cs',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .done()
    ;
  }
});


dotest.add ('Method .placesGet', async test => {
  let data;
  let error;

  try {
    data = await ns.placesGet ({
      type: 'stationV2',
      id: 'AMF',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .done()
    ;
  }
});


dotest.add ('Method .placesOvfiets', async test => {
  let data;
  let error;

  try {
    data = await ns.placesOvfiets ({
      station_code: 'AMF',
    });
  }
  catch (err) {
    error = err;
  }
  finally {
    test (error)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data[0])
      .done()
    ;
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
