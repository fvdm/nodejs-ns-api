/*
Name:       nsapi.js - Unofficial NodeJS module for Nederlandse Spoorwegen API
Author:     Franklin van de Meent
Source:     https://github.com/fvdm/nodejs-ns-api
Feedback:   https://github.com/fvdm/nodejs-ns-api/issues
API Docs:   http://www.ns.nl/api/api
License:    Unlicense (Public Domain)
            (see UNLICENSE file or https://raw.github.com/fvdm/nodejs-ns-api/master/UNLICENSE)
*/

var http = require ('httpreq');
var parsexml = require ('nodexml') .xml2obj;
var app = {username: '', password: ''};


// ! Vertrektijden
app.vertrektijden = function (station, callback) {
  app.talk ('avt', { station: station }, function (err, data) {
    if (!err) {
      if (!data.ActueleVertrekTijden || !data.ActueleVertrekTijden.VertrekkendeTrein) {
        callback (new Error ('unexpected response' ))
      } else {
        data = data.ActueleVertrekTijden.VertrekkendeTrein;
        if (data.RitNummer) {
          data = [data];
          callback (null, data);
        } else {
          var t;
          for (t in data) {
            data [t] .VertrekSpoorWijziging = data [t] .VertrekSpoor.wijziging;
            data [t] .VertrekSpoor = data [t] .VertrekSpoor.$t;
            delete data [t] .VertrekSpoor.$t;
          }
          callback (null, data);
        }
      }
    } else {
      callback (err, data);
    }
  });
};


// ! Prijzen
app.prijzen = function (props, callback) {
  app.talk ('prijzen-v2', props, callback);
};


// ! Reisadviezen
app.reisadvies = function (props, callback) {
  app.talk ('treinplanner', props, function (err, data) {
    if (!err) {
      if (!data.ReisMogelijkheden || !data.ReisMogelijkheden.ReisMogelijkheid) {
        callback (new Error ('unexpected response'));
      } else {
        data = data.ReisMogelijkheden.ReisMogelijkheid;

        if (!(data instanceof Array)) {
          data = [data];
        }

        if (data.length >= 1) {
          for (var r in data) {
            var reis = data [r];
            if (!(reis.ReisDeel instanceof Array)) {
              reis.ReisDeel = [reis.ReisDeel];
            }

            for (var d in reis.ReisDeel) {
              var deel = reis.ReisDeel [d];
              for (var s in deel.ReisStop) {
                var stop = deel.ReisStop [s];
                if (stop.Spoor) {
                  stop.SpoorWijziging = stop.Spoor.wijziging;
                  stop.Spoor = stop.Spoor.$t;
                  delete stop.Spoor.$t;
                  deel.ReisStop [s] = stop;
                }
              }
              reis.ReisDeel [d] = deel;
            }

            data [r] = reis;
          }
        }

        callback (null, data);
      }
    } else {
      callback (err, data);
    }
  });
};


// ! Stationslijst
app.stations = function (treeKey, callback) {
  if (typeof treeKey === 'function') {
    var callback = treeKey;
    var treeKey = 'code';
  }

  app.talk ('stations-v2', function (err, data) {
    if (!err) {
      if (!data.Stations.Station) {
        callback (new Error ('unexpected response'));
      } else {
        data = data.Stations.Station;
        var tree = {};
        for (var s in data) {
          var station = data [s];

          if (treeKey === 'code') {
            tree [station.Code] = station;
          } else if (typeof station [treeKey] !== 'string') {
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
      }
    } else {
      callback (err, data);
    }
  });
};


// ! Storingen
app.storingen = function (params, callback) {
  app.talk ('storingen', params, function (err, data) {
    if (!err) {
      if (!data.Storingen.Ongepland || !data.Storingen.Gepland) {
        callback (new Error ('unexpected response'));
      } else {
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
      }
    } else {
      callback (err, data);
    }
  });
};


// ! Communicate
app.talk = function (path, props, callback) {
  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  var url = 'https://webservices.ns.nl/ns-api-'+ path;
  var options = {
    parameters: props,
    auth: app.username +':'+ app.password
  };

  http.get (url, options, function (err, res) {
    var error = null;
    var data = res.body;

    if (err) {
      error = new Error ('request failed');
      error.details = err;
    }

    try {
      data = parsexml (data);
      data = objectOmit (data, '@');
      
      if (data ['soap:Envelop'] ['soap:Body'] ['soap:Fault'] ['faultcode']) {
        error = new Error ('API error');
        error.details = {
          code: data ['soap:Envelop'] ['soap:Body'] ['soap:Fault'] ['faultcode'],
          message: data ['soap:Envelop'] ['soap:Body'] ['soap:Fault'] ['faultstring']
        };
      }
    }
    catch (e) {
      if (!error) {
        error = new Error ('invalid reponse');
        error.details = {
          request: options,
          response: {
            headers: response.headers,
            data: data
          }
        };
      }
    }

    callback (error, !error && data);
  });
}

// ready
module.exports = app;

// Strip a key from object
function objectOmit (obj, key) {
  if (obj instanceof Object) {
    for (k in obj) {
      if (k === key) {
        delete obj [k];
      } else {
        obj [k] = objectOmit (obj [k], key);
      }
    }
  }
  else if (obj instanceof Array && obj.length >= 1) {
    var i;
    for (i = 0; i < obj.length; i++) {
      obj [i] = objectOmit (obj [i], key);
    }
  }
  return obj;
}
