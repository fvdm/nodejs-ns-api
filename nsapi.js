/*
Name:       nsapi.js - Unofficial NodeJS module for Nederlandse Spoorwegen API
Author:     Franklin van de Meent
Source:     https://github.com/fvdm/nodejs-ns-api
Feedback:   https://github.com/fvdm/nodejs-ns-api/issues
API Docs:   http://www.ns.nl/api/api
License:    Unlicense (Public Domain)
            (see UNLICENSE file or https://raw.github.com/fvdm/nodejs-ns-api/master/UNLICENSE)
*/

var zlib = require ('zlib');
var http = require ('httpreq');
var parsexml = require ('nodexml') .xml2obj;

var config = {
  username: '',
  password: '',
  timeout: 5000
};


/**
 * Make an error
 *
 * @param   {string}         message  Error.message
 * @param   {string}         key      Error [key] = err
 * @param   {Error|null}     err      Error [key] = err
 * @param   {string|number}  code     Error.code
 * @return  {Error}                   The generated error
 */

function makeError (message, key, err, code) {
  var error = new Error (message);

  error.statusCode = code;
  error [key] = err;
  return error;
}


/**
 * Strip a key from an object
 *
 * @param   {object}  obj   Object to alter
 * @param   {string}  key   Key to remove
 * @return  {object}
 */

function objectOmit (obj, key) {
  var i;

  if (obj instanceof Object) {
    for (i in obj) {
      if (i === key) {
        delete obj [i];
      } else {
        obj [i] = objectOmit (obj [i], key);
      }
    }
  }

  return obj;
}


/**
 * Process decoded data
 *
 * @callback callback
 * @param    {string}    data      Response data string
 * @param    {function}  callback  `(err, data)`
 * @return   {void}
 */

function processData (data, callback) {
  data = data.replace (/&#039;/g, '\'');

  // parse xml
  try {
    data = parsexml (data);
    data = objectOmit (data, '@');
  } catch (e) {
    return callback (makeError ('invalid response', 'body', data));
  }

  // parse API error
  if (data.error) {
    return callback (makeError ('API error', 'api', data.error));
  }

  try {
    if (data ['soap:Envelope'] ['soap:Body'] ['soap:Fault'] .faultcode) {
      return callback (makeError ('API error', 'api', {
        code: data ['soap:Envelope'] ['soap:Body'] ['soap:Fault'] .faultcode,
        message: data ['soap:Envelope'] ['soap:Body'] ['soap:Fault'] .faultstring
      }));
    }
  } catch (e) {
    // skip
  }

  // all good
  return callback (null, data);
}


/**
 * Process talk() response
 *
 * @callback callback
 * @param    {Error|null}  err       httpreq error
 * @param    {object}      res       Response resource
 * @param    {function}    callback  `(err, data)`
 * @return   {void}
 */

function httpResponse (err, res, callback) {
  var data = res && res.body || '';

  // request error
  if (err) {
    return callback (makeError ('request failed', 'error', err, null));
  }

  // gzip decoding
  if (res.headers ['content-encoding'] === 'gzip') {
    zlib.gunzip (data, function (zErr, zData) {
      if (zErr) {
        return callback (makeError ('unexpected response', 'error', zErr, res.statusCode));
      }

      data = zData.toString ('utf8');
      return processData (data, callback);
    });
  }

  return null;
}


/**
 * Communication with API
 *
 * @callback callback
 * @param    {string}    method    Part of request path `/ns-api-METHOD_NAME`
 * @param    {object}    [params]  Request parameters
 * @param    {function}  callback  `(err, data)`
 * @return   {void}
 */

function httpRequest (method, params, callback) {
  var i;
  var options = {
    url: 'https://webservices.ns.nl/ns-api-' + method,
    method: 'GET',
    timeout: config.timeout,
    binary: true,
    auth: config.username + ':' + config.password,
    headers: {
      'Accept': 'text/xml; charset=UTF-8',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'nsapi.js (https://github.com/fvdm/nodejs-ns-api)'
    }
  };

  // params is optional
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  // build parameters
  if (Object.keys (params) .length) {
    for (i in params) {
      if (typeof params [i] === 'boolean') {
        params [i] = params [i] ? 'true' : 'false';
      }
    }

    options.parameters = params;
  }

  // do request
  http.doRequest (options, function (err, res) {
    httpResponse (err, res, callback);
  });
}


/**
 * Vertrektijden - departure times
 *
 * @callback callback
 * @param   {string}    station   Station ID
 * @param   {function}  callback  `(err, data)`
 * @return  {void}
 */

function methodVertrektijden (station, callback) {
  httpRequest ('avt', { station: station }, function (err, data) {
    var i;

    if (err) {
      return callback (err);
    }

    if (!data.ActueleVertrekTijden || !data.ActueleVertrekTijden.VertrekkendeTrein) {
      return callback (makeError ('unexpected response', 'data', data));
    }

    data = data.ActueleVertrekTijden.VertrekkendeTrein;

    if (data.RitNummer) {
      return callback (null, [data]);
    }

    for (i in data) {
      data [i] .VertrekSpoorWijziging = data [i] .VertrekSpoor.wijziging === 'true';
      data [i] .VertrekSpoor = data [i] .VertrekSpoor ['@text'];
    }

    return callback (null, data);
  });
}


/**
 * Prijzen - tariffs
 *
 * @callback callback
 * @param   {object}    params    Parameters
 * @param   {function}  callback  `(err, data)`
 * @return  {void}
 */

function methodPrijzen (params, callback) {
  httpRequest ('prijzen-v3', params, callback);
}


/**
 * Clean up ReisDeel
 *
 * @param   {array|object}  data  Data from .methodReisAdvies
 * @return  {array}               Converted data
 */

function cleanupReisDeel (data) {
  var reis;
  var deel;
  var stop;
  var r;
  var d;
  var s;

  data = data.ReisMogelijkheden.ReisMogelijkheid;

  if (!(data instanceof Array)) {
    data = [data];
  }

  if (data.length) {
    for (r in data) {
      reis = data [r];

      if (!(reis.ReisDeel instanceof Array)) {
        reis.ReisDeel = [reis.ReisDeel];
      }

      for (d in reis.ReisDeel) {
        deel = reis.ReisDeel [d];

        for (s in deel.ReisStop) {
          stop = deel.ReisStop [s];

          if (stop.Spoor) {
            stop.SpoorWijziging = stop.Spoor.wijziging === 'true';
            stop.Spoor = stop.Spoor ['@text'];
            deel.ReisStop [s] = stop;
          }
        }

        reis.ReisDeel [d] = deel;
      }

      data [r] = reis;
    }
  }

  return data;
}


/**
 * Reisadvies - travel advise
 *
 * @callback callback
 * @param    {object}    params    Parameters
 * @param    {function}  callback  `(err, data)`
 * @return   {void}
 */

function methodReisadvies (params, callback) {
  httpRequest ('treinplanner', params, function (err, data) {
    if (err) {
      return callback (err);
    }

    if (!data.ReisMogelijkheden || !data.ReisMogelijkheden.ReisMogelijkheid) {
      return callback (makeError ('unexpected response', 'data', data));
    }

    data = cleanupReisDeel (data);
    return callback (null, data);
  });
}


/**
 * Clean up station object
 *
 * @param   {object}  station  Station from data
 * @return  {object}           Cleaned up station
 */

function cleanupStation (station) {
  station.Synoniemen = station.Synoniemen && station.Synoniemen.Synoniem || [];

  if (typeof station.Synoniemen === 'string') {
    station.Synoniemen = [station.Synoniemen];
  }

  return station;
}


/**
 * Build stations tree
 *
 * @param   {object}          data            Data from methodStations
 * @param   {string|boolean}  [treeKey=Code]  Group stations by station.key
 * @return  {object|array}                    Array if `treeKey` == false, else an object
 */

function buildStationsTree (data, treeKey) {
  var station;
  var tree = {};
  var i;

  // make an array with stations
  if (treeKey === false) {
    tree = [];
  }

  // shorten data
  data = data.Stations.Station;

  // iterate stations
  for (i in data) {
    station = cleanupStation (data [i]);

    if (treeKey === false) {
      tree.push (station);
      break;
    }

    if (treeKey === 'code') {
      tree [station.Code] = station;
    } else if (!station [treeKey]) {
      return new Error ('key not found in station');
    }

    if (!tree [station [treeKey]]) {
      tree [station [treeKey]] = {};
    }

    tree [station [treeKey]] [station.Code] = station;
  }

  return tree;
}


/**
 * List available stations
 *
 * @callback callback
 * @param    {string}    [treeKey]  Group by this key
 * @param    {function}  callback   `(err, data)`
 * @return   {void}
 */

function methodStations (treeKey, callback) {
  if (typeof treeKey === 'function') {
    callback = treeKey;
    treeKey = 'code';
  }

  httpRequest ('stations-v2', function (err, data) {
    var tree;

    if (err) {
      return callback (err);
    }

    if (!data.Stations.Station) {
      return callback (makeError ('unexpected response', 'data', data));
    }

    tree = buildStationsTree (data, treeKey);

    if (!tree) {
      return callback (tree);
    }

    return callback (null, tree);
  });
}


/**
 * Clean up storingen
 *
 * @param   {object}  data  Response data from methodStoringen
 * @return  {array}         Clean up array
 */

function cleanupStoringen (data) {
  var storingen = {};

  storingen.Gepland = data.Storingen.Gepland.Storing || [];
  storingen.Ongepland = data.Storingen.Ongepland.Storing || [];

  // if object or string convert to array
  if (!Array.isArray (storingen.Gepland)) {
    storingen.Gepland = [storingen.Gepland];
  }

  if (!Array.isArray (storingen.Ongepland)) {
    storingen.Ongepland = [storingen.Ongepland];
  }

  return storingen;
}


/**
 * List disruptions
 *
 * @callback callback
 * @param    {object}    params    Parameters
 * @param    {function}  callback  `(err, data)`
 * @return   {void}
 */

function methodStoringen (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {
      actual: true
    };
  }

  httpRequest ('storingen', params, function (err, data) {
    if (err) {
      return callback (err);
    }

    data = cleanupStoringen (data);
    return callback (null, data);
  });
}


/**
 * Module configuration
 *
 * @param   {object}       conf            Configuration parameters
 * @param   {string}       conf.username   API username
 * @param   {string}       conf.password   API password
 * @param   {number=5000}  [conf.timeout]  Request time out in ms
 * @return  {object}                       Interface methods
 */

function setup (conf) {
  if (conf instanceof Object) {
    config.username = conf.username || null;
    config.password = conf.password || null;
    config.timeout = conf.timeout || config.timeout;
  }

  return {
    vertrektijden: methodVertrektijden,
    reisadvies: methodReisadvies,
    prijzen: methodPrijzen,
    stations: methodStations,
    storingen: methodStoringen
  };
}

module.exports = setup;
