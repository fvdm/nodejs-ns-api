var http = require('http'),
    app = {}
    querystring = require('querystring'),
    xml2json = require('node-xml2json'),
    app = {user: '', pass: ''}


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
		auth:	app.user +':'+ app.pass
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
