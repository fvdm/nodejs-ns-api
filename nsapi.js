/*
Name:       nsapi.js - Unofficial NodeJS module for Nederlandse Spoorwegen API
Author:     Franklin van de Meent
Source:     https://github.com/fvdm/nodejs-ns-api
Feedback:   https://github.com/fvdm/nodejs-ns-api/issues
API Docs:   http://www.ns.nl/api/api
License:    Unlicense / Public Domain

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
*/

var http = require('http'),
    util = require('util'),
    querystring = require('querystring'),
    xml2json = require('xml2json'),
    app = {username: '', password: ''}


// ! Vertrektijden
app.vertrektijden = function( station, callback ) {
	app.talk( 'avt', {station: station}, function( err, data ) {
		if( !err ) {
			if( !data.ActueleVertrekTijden || !data.ActueleVertrekTijden.VertrekkendeTrein ) {
				callback( new Error('unexpected response') )
			} else {
				data = data.ActueleVertrekTijden.VertrekkendeTrein
				if( data.RitNummer !== undefined ) {
					data = [data]
					callback( null, data )
				} else {
					for( var t in data ) {
						data[t].VertrekSpoorWijziging = data[t].VertrekSpoor.wijziging
						data[t].VertrekSpoor = data[t].VertrekSpoor.$t
						delete data[t].VertrekSpoor.$t
					}
					callback( null, data )
				}
			}
		} else {
			callback( err, data )
		}
	})
}


// ! Prijzen
app.prijzen = function( props, callback ) {
	app.talk( 'prijzen-v2', props, callback )
}


// ! Reisadviezen
app.reisadvies = function( props, callback ) {
	app.talk( 'treinplanner', props, function( err, data ) {
		if( !err ) {
			if( !data.ReisMogelijkheden || !data.ReisMogelijkheden.ReisMogelijkheid ) {
				callback( new Error('unexpected response') )
			} else {
				data = data.ReisMogelijkheden.ReisMogelijkheid
				
				if( !util.isArray( data ) ) {
					data = [data]
				}
				
				if( data.length >= 1 ) {
					for( var r in data ) {
						var reis = data[r]
						if( !util.isArray( reis.ReisDeel ) ) {
							reis.ReisDeel = [reis.ReisDeel]
						}
						
						for( var d in reis.ReisDeel ) {
							var deel = reis.ReisDeel[d]
							for( var s in deel.ReisStop ) {
								var stop = deel.ReisStop[s]
								if( stop.Spoor !== undefined ) {
									stop.SpoorWijziging = stop.Spoor.wijziging
									stop.Spoor = stop.Spoor.$t
									delete stop.Spoor.$t
									deel.ReisStop[s] = stop
								}
							}
							reis.ReisDeel[d] = deel
						}
						
						data[r] = reis
					}
				}
				
				callback( null, data )
			}
		} else {
			callback( err, data )
		}
	})
}


// ! Stationslijst
app.stations = function( treeKey, callback ) {
	if( typeof treeKey === 'function' ) {
		var callback = treeKey
		var treeKey = 'code'
	}
	
	app.talk( 'stations-v2', function( err, data ) {
		if( !err ) {
			if( !data.Stations.Station ) {
				callback( new Error('unexpected response') )
			} else {
				data = data.Stations.Station
				var tree = {}
				for( var s in data ) {
					var station = data[s]
					
					if( treeKey === 'code' ) {
						tree[ station.Code ] = station
					} else if( typeof station[ treeKey ] !== 'string' ) {
						callback( new Error('key not found in station') )
						return
					} else {
						if( !tree[ station[ treeKey ] ] ) {
							tree[ station[ treeKey ] ] = {}
						}
						tree[ station[ treeKey ] ][ station.Code ] = station
					}
				}
				
				callback( null, tree )
			}
		} else {
			callback( err, data )
		}
	})
}


// ! Storingen
app.storingen = function( params, callback ) {
	app.talk( 'storingen', params, function( err, data ) {
		if( !err ) {
			if( data.Storingen.Ongepland === undefined || data.Storingen.Gepland === undefined ) {
				callback( new Error('unexpected response') )
			} else {
				data = data.Storingen
				data.Ongepland = data.Ongepland.Storing || []
				data.Gepland = data.Gepland.Storing || []
				
				if( !util.isArray( data.Ongepland ) ) {
					data.Ongepland = [data.Ongepland]
				}
				
				if( !util.isArray( data.Gepland ) ) {
					data.Gepland = [data.Gepland]
				}
				
				callback( null, data )
			}
		} else {
			callback( err, data )
		}
	})
}


// ! Communicate
app.talk = function( path, props, callback ) {
	if( typeof props === 'function' ) {
		var callback = props
		var props = {}
	}
	
	var options = {
		host:	'webservices.ns.nl',
		port:	80,
		path:	'/ns-api-'+ path +'?'+ querystring.stringify( props ),
		method:	'GET',
		auth:	app.username +':'+ app.password
	}
	
	var req = http.request( options )
	
	req.on( 'response', function( response ) {
		var data = ''
		response.on( 'data', function( ch ) { data += ch })
		response.on( 'close', function() { callback( new Error('disconnected') ) })
		response.on( 'end', function() {
			data = data.toString('utf8').trim()
			if( data.match('<faultstring>') ) {
				data.replace( /<faultstring>([0-9]+):([^<]+)<\/faultstring>/, function( s, code, error ) {
					var err = new Error('API error')
					err.details = {
						code:		code,
						message:	error
					}
					callback( err )
				})
			} else if( data.match('<?xml') ) {
				data = xml2json.toJson( data, {
					object: true,
					coerce: true,
					trim: true,
					sanitize: false
				})
				callback( null, data )
			} else {
				var err = new Error('invalid response')
				err.details = {
					request: options,
					response: {
						headers: response.headers,
						data: data
					}
				}
				callback( err )
			}
		})
	})
	
	req.on( 'error', function( error ) {
		var err = new Error('request failed')
		err.details = error
		callback( err )
	})
	
	req.end()
}

// ready
module.exports = app
