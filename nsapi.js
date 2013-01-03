var http = require('http'),
    querystring = require('querystring'),
    xml2json = require('node-xml2json'),
    app = {username: '', password: ''}


// ! Vertrektijden
app.vertrektijden = function( station, callback ) {
	app.talk( 'avt', {station: station}, function( err, data ) {
		if( !err ) {
			if( data.actuelevertrektijden.vertrekkendetrein === undefined ) {
				callback( new Error('unexpected response') )
			} else {
				for( var t in data.actuelevertrektijden.vertrekkendetrein ) {
					if( data.actuelevertrektijden.vertrekkendetrein[t].vertrekspoor.wijziging === 'false' ) {
						data.actuelevertrektijden.vertrekkendetrein[t].vertrekspoor.wijziging = false
					}
				}
				callback( null, data.actuelevertrektijden.vertrekkendetrein )
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
			if( data.reismogelijkheden.reismogelijkheid === undefined ) {
				callback( new Error('unexpected response') )
			} else {
				callback( null, data.reismogelijkheden.reismogelijkheid )
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
			if( data.stations.station === undefined ) {
				callback( new Error('unexpected response') )
			} else {
				var tree = {}
				for( var s in data.stations.station ) {
					var station = data.stations.station[s]
					
					if( treeKey === 'code' ) {
						tree[ station.code ] = station
					} else if( typeof station[ treeKey ] !== 'string' ) {
						callback( new Error('key not found in station') )
						return
					} else {
						if( tree[ station[ treeKey ] ] === undefined ) {
							tree[ station[ treeKey ] ] = {}
						}
						tree[ station[ treeKey ] ][ station.code ] = station
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
			if( data.storingen.ongepland === undefined || data.storingen.gepland === undefined ) {
				callback( new Error('unexpected response') )
			} else {
				if( data.storingen.ongepland.storing !== undefined ) {
					if( data.storingen.ongepland.storing.id !== undefined ) {
						data.storingen.ongepland = [data.storingen.ongepland.storing]
					} else if( data.storingen.ongepland.storing.length >= 1 ) {
						var storingen = []
						for( var s in data.storingen.ongepland.storing ) {
							storingen.push( data.storingen.ongepland.storing[s] )
						}
						data.storingen.ongepland = storingen
					}
				} else {
					data.storingen.ongepland = []
				}
				
				if( data.storingen.gepland.storing !== undefined ) {
					if( data.storingen.gepland.storing.id !== undefined ) {
						data.storingen.gepland = [data.storingen.gepland.storing]
					} else if( data.storingen.gepland.storing.length >= 1 ) {
						var storingen = []
						for( var s in data.storingen.gepland.storing ) {
							storingen.push( data.storingen.gepland.storing[s] )
						}
						data.storingen.gepland = storingen
					}
				} else {
					data.storingen.gepland = []
				}
				
				callback( null, data.storingen )
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
				data = xml2json.parser( data )
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
