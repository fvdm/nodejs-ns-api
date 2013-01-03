var http = require('http'),
    app = {}

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
		method:	'GET'
	}
	
	var req = http.request( options )
	
	req.on( 'response', function( response ) {
		var data = ''
		response.on( 'data', function( ch ) { data += ch })
		response.on( 'close', function() { callback( new Error('disconnected') ) })
		response.on( 'end', function() {
			
		})
	})
	
	req.on( 'error', function( error ) {
		var err = new Error('request')
		err.details = error
		callback( err )
	})
	
	req.end()
}

// ready
module.exports = app
