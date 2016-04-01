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
 * Strip a key from an object
 *
 * @param obj {object} - Object to alter
 * @param key {string} - Key to remove
 * @returns {object}
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
  } else if (obj instanceof Array && obj.length) {
    for (i = 0; i < obj.length; i++) {
      obj [i] = objectOmit (obj [i], key);
    }
  }

  return obj;
}


/**
 * Process decoded data
 *
 * @param data {string} - Response data string
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function processData (data, callback) {
  var error = null;

  data = data.replace (/&#039;/g, '\'');

  // parse xml
  try {
    data = parsexml (data);
    data = objectOmit (data, '@');
  } catch (e) {
    error = new Error ('invalid response');
    error.body = data;

    callback (error);
    return;
  }

  // parse API error
  if (data.error) {
    error = new Error ('API error');
    error.api = data.error;

    callback (error);
    return;
  }

  try {
    if (data ['soap:Envelope'] ['soap:Body'] ['soap:Fault'] .faultcode) {
      error = new Error ('API error');
      error.api = {
        code: data ['soap:Envelope'] ['soap:Body'] ['soap:Fault'] .faultcode,
        message: data ['soap:Envelope'] ['soap:Body'] ['soap:Fault'] .faultstring
      };

      callback (error);
      return;
    }
  } catch (e) {
    // skip
  }

  // all good
  callback (null, data);
}


/**
 * Process talk() response
 *
 * @param err {Error,null} - httpreq error
 * @param res {object} - Response resource
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function processResponse (err, res, callback) {
  var data = res && res.body || new Buffer ();
  var error = null;

  // request error
  if (err) {
    error = new Error ('request failed');
    error.error = err;
    callback (error);
    return;
  }

  // gzip decoding
  if (res.headers ['content-encoding'] === 'gzip') {
    zlib.gunzip (data, function (zErr, zData) {
      if (zErr) {
        callback (zErr);
        return;
      }

      data = zData.toString ('utf8');
      processData (data, callback);
    });
  }
}


/**
 * Communication with API
 *
 * @param method {string} - Part of request path `/ns-api-METHOD_NAME`
 * @param [params] {object} - Request parameters
 * @param callback {function} - `function (err, data) {}`
 */

function talk (method, params, callback) {
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
        params [i] = params [i] === true ? 'true' : 'false';
      }
    }

    options.parameters = params;
  }

  // do request
  http.doRequest (options, function (err, res) {
    processResponse (err, res, callback);
  });
}


/**
 * Vertrektijden - departure times
 *
 * @callback callback
 * @param station {string} - Station ID
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodVertrektijden (station, callback) {
  talk ('avt', { station: station }, function (err, data) {
    var i;

    if (err) {
      callback (err);
      return;
    }

    if (!data.ActueleVertrekTijden || !data.ActueleVertrekTijden.VertrekkendeTrein) {
      callback (new Error ('unexpected response'));
      return;
    }

    data = data.ActueleVertrekTijden.VertrekkendeTrein;

    if (data.RitNummer) {
      data = [data];
      callback (null, data);
      return;
    }

    for (i in data) {
      data [i] .VertrekSpoorWijziging = data [i] .VertrekSpoor.wijziging === 'true';
      data [i] .VertrekSpoor = data [i] .VertrekSpoor ['@text'];
    }

    callback (null, data);
  });
}


/**
 * Prijzen - tariffs
 *
 * @callback callback
 * @param params {object} - Parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodPrijzen (params, callback) {
  talk ('prijzen-v3', params, callback);
}


/**
 * Reisadvies - travel advise
 *
 * @callback callback
 * @param params {object} - Parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodReisadvies (params, callback) {
  talk ('treinplanner', params, function (err, data) {
    var reis;
    var deel;
    var stop;
    var r;
    var d;
    var s;

    if (err) {
      callback (err);
      return;
    }

    if (!data.ReisMogelijkheden || !data.ReisMogelijkheden.ReisMogelijkheid) {
      callback (new Error ('unexpected response'));
      return;
    }

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

    callback (null, data);
  });
}


/**
 * List available stations
 *
 * @callback callback
 * @param [treeKey] {string} - 
 * @param callback {function} - `function (err, data) {}`
 */

function methodStations (treeKey, callback) {
  if (typeof treeKey === 'function') {
    callback = treeKey;
    treeKey = 'code';
  }

  talk ('stations-v2', function (err, data) {
    var tree = {};
    var station;
    var s;

    if (err) {
      callback (err);
      return;
    }

    if (treeKey === false) {
      tree = [];
    }

    if (!data.Stations.Station) {
      callback (new Error ('unexpected response'));
      return;
    }

    data = data.Stations.Station;

    for (s in data) {
      station = data [s];
      station.Synoniemen = station.Synoniemen && station.Synoniemen.Synoniem || [];

      if (typeof station.Synoniemen === 'string') {
        station.Synoniemen = [station.Synoniemen];
      }

      if (treeKey === false) {
        tree.push (station);
        break;
      }

      if (treeKey === 'code') {
        tree [station.Code] = station;
      } else if (!station [treeKey]) {
        callback (new Error ('key not found in station'));
        return;
      } else {
        if (!tree [station [treeKey]]) {
          tree [station [treeKey]] = {};
        }

        tree [station [treeKey]] [station.Code] = station;
      }
    }

    callback (null, tree);
  });
}


/**
 * List disruptions
 *
 * @callback callback
 * @param params {object} - Parameters
 * @param callback {function} - `function (err, data) {}`
 */

function methodStoringen (params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {
      actual: true
    };
  }

  talk ('storingen', params, function (err, data) {
    if (err) {
      callback (err);
      return;
    }

    if (typeof data.Storingen.Ongepland === 'string') {
      data.Storingen.Ongepland = [data.Storingen.Ongepland];
    }

    if (typeof data.Storingen.Gepland === 'string') {
      data.Storingen.Gepland = [data.Storingen.Gepland];
    }

    if (!data.Storingen.Ongepland || !data.Storingen.Gepland) {
      callback (new Error ('unexpected response'));
      return;
    }

    data = data.Storingen;
    data.Ongepland = data.Ongepland.Storing || [];
    data.Gepland = data.Gepland.Storing || [];

    if (!(data.Ongepland instanceof Array)) {
      data.Ongepland = [data.Ongepland];
    }

    if (!(data.Gepland instanceof Array)) {
      data.Gepland = [data.Gepland];
    }

    callback (null, data);
  });
}


/**
 * Module configuration
 *
 * @param conf {object} - Configuration parameters
 * @param conf.username {string} - API username
 * @param conf.password {string} - API password
 * @param [conf.timeout] {number=5000} - Request time out in ms
 * @returns {object} - Interface methods
 */

function setup (conf) {
  config.username = conf.username;
  config.password = conf.password;
  config.timeout = conf.timeout || config.timeout;

  return {
    vertrektijden: methodVertrektijden,
    reisadvies: methodReisadvies,
    prijzen: methodPrijzen,
    stations: methodStations,
    storingen: methodStoringen
  };
}

module.exports = setup;
