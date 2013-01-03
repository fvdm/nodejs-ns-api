nodejs-ns-api
=============

Unofficial [Node.js](http://nodejs.org/) module for [Nederlandse Spoorwegen API](http://www.ns.nl/api/api).

* To use this module you need API access credentials, which you can request at <https://www.ns.nl/ews-aanvraagformulier/>.
* The method `ns.prijzen` is disabled by default for all API accounts, you need to [contact NS](http://www.ns.nl/api/api#api-documentatie-prijzen) if you want this enabled.


Installation
------------

From Github for the most recent code:

	git clone https://github.com/fvdm/nodejs-ns-api
	npm install ./nodejs-ns-api

Or from NPM for the most recent and *stable* code:

	npm install ns-api
	

Example
-------

```js
var ns = require('ns-api')

ns.username = 'api-username'
ns.password = 'api-password'

ns.reisadvies(
  {
    fromStation: 'Amersfoort',
    toStation:   'Den Haag',
    dateTime:    '2013-02-21T15:50',
    departure:   false
  },
  function( err, data ) {
    console.log( err || data )
  }
)
```

**Result:**

```js
[ { aantaloverstappen: 0,
    geplandereistijd: '0:58',
    actuelereistijd: '0:58',
    optimaal: 'false',
    geplandevertrektijd: '2013-01-05T13:40:00+0100',
    actuelevertrektijd: '2013-01-05T13:40:00+0100',
    geplandeaankomsttijd: '2013-01-05T14:38:00+0100',
    actueleaankomsttijd: '2013-01-05T14:38:00+0100',
    status: 'VOLGENS-PLAN',
    reisdeel: 
     { reissoort: 'TRAIN',
       vervoerder: 'NS',
       vervoertype: 'Intercity',
       ritnummer: 11744,
       status: 'VOLGENS-PLAN',
       reisstop: 
        [ { naam: 'Amersfoort',
            tijd: '2013-01-05T13:40:00+0100',
            spoor: { wijziging: 'false' } },
          { naam: 'Utrecht Centraal', tijd: '2013-01-05T13:59:00+0100' },
          { naam: 'Gouda', tijd: '2013-01-05T14:20:00+0100' },
          { naam: 'Den Haag Centraal',
            tijd: '2013-01-05T14:38:00+0100',
            spoor: { wijziging: 'false' } } ] } } ]
```


Callback function
-----------------

Each method takes a `callback` function as last *required* parameter. The callback receives two parameters: `err` and `data`. In case of an error the first parameter is an `Error` instance, otherwise `err` is null and `data` is an object or array.

```js
function( err, data ) {
	if( err instance of Error ) {
		console.log( err )
		// err.stack
		// err.message    // same as console.log( err )
		// err.details    // only set when details are available
	} else {
		// all good
		console.log( data )
	}
}
```

#### Errors

	Error: disconnected        The connection was closed too early
	Error: invalid response    The API returned invalid data, see `err.details`
	Error: request failed      Can't make request, see `err.details`


Methods
-------



Unlicense
---------

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

For more information, please refer to <http://unlicense.org/>