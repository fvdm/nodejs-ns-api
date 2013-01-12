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


### vertrektijden ( station, callback )

Departure times for a `station` identified by either its name or code.

**API docs: [Actuele vertrektijden](http://www.ns.nl/api/api#api-documentatie-actuele-vertrektijden)**


```js
ns.vertrektijden( 'Amersfoort', console.log )
```

```js
[ { RitNummer: 587,
    VertrekTijd: '2013-01-09T00:07:00+0100',
    VertrekVertraging: 'PT10M',
    VertrekVertragingTekst: '+10 min',
    EindBestemming: 'Groningen',
    TreinSoort: 'Intercity',
    RouteTekst: 'Nijkerk, Harderwijk, Zwolle',
    Vervoerder: 'NS',
    VertrekSpoor: '2b',
    VertrekSpoorWijziging: false },
  { RitNummer: 11686,
    VertrekTijd: '2013-01-09T00:10:00+0100',
    EindBestemming: 'Schiphol',
    TreinSoort: 'Intercity',
    RouteTekst: 'Hilversum, A\'dam Zuid',
    Vervoerder: 'NS',
    VertrekSpoor: 7,
    VertrekSpoorWijziging: false } ]
```


### prijzen ( parameters, callback )

You need special access for this method.

**API docs: [Prijzen](http://www.ns.nl/api/api#api-documentatie-prijzen)**


### reisadvies ( parameters, callback )

Calculate travel plans between stations

**API docs: [Reisadviezen](http://www.ns.nl/api/api#api-documentatie-reisadviezen)**


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
[ { AantalOverstappen: 1,
    GeplandeReisTijd: '0:56',
    ActueleReisTijd: '0:56',
    Optimaal: false,
    GeplandeVertrekTijd: '2013-02-21T13:26:00+0100',
    ActueleVertrekTijd: '2013-02-21T13:26:00+0100',
    GeplandeAankomstTijd: '2013-02-21T14:22:00+0100',
    ActueleAankomstTijd: '2013-02-21T14:22:00+0100',
    Status: 'VOLGENS-PLAN',
    ReisDeel: 
     [ { reisSoort: 'TRAIN',
         Vervoerder: 'NS',
         VervoerType: 'Intercity',
         RitNummer: 12542,
         Status: 'VOLGENS-PLAN',
         ReisStop: 
          [ { Naam: 'Amersfoort',
              Tijd: '2013-02-21T13:26:00+0100',
              Spoor: '6a',
              SpoorWijziging: false },
            { Naam: 'Utrecht Centraal',
              Tijd: '2013-02-21T13:41:00+0100',
              Spoor: 8,
              SpoorWijziging: false } ] } ],
```


### stations ( [treeKey], callback )

Get a list of all stations.

**API docs: [Stationslijst](http://www.ns.nl/api/api#api-documentatie-stationslijst)**


* **treeKey** - *optional* - *string* - Group items by specified key, ie. "Land".


**Just the list:**

```js
ns.stations( console.log )
```

```js
{ HT: 
   { Code: 'HT',
     Type: 'knooppuntIntercitystation',
     Namen: 
      { Kort: 'H\'bosch',
        Middel: '\'s-Hertogenbosch',
        Lang: '\'s-Hertogenbosch' },
     Land: 'NL',
     UICCode: 8400319,
     Lat: 51.69048,
     Lon: 5.29362,
     Synoniemen: { Synoniem: [ 'Hertogenbosch (\'s)', 'Den Bosch' ] } },
  HTO: 
   { Code: 'HTO',
     Type: 'stoptreinstation',
     Namen: 
      { Kort: 'H\'bosch O',
        Middel: 'Hertogenbosch O.',
        Lang: '\'s-Hertogenbosch Oost' },
     Land: 'NL',
     UICCode: 8400320,
     Lat: 51.700554,
     Lon: 5.318333,
     Synoniemen: { Synoniem: [ 'Hertogenbosch Oost (\'s)', 'Den Bosch Oost' ] } } }
```


**Grouped by type:**

```js
ns.stations( 'Type', console.log )
```

```js
{ knooppuntIntercitystation: 
   { HT: 
      { Code: 'HT',
        Type: 'knooppuntIntercitystation',
        Namen: 
         { Kort: 'H\'bosch',
           Middel: '\'s-Hertogenbosch',
           Lang: '\'s-Hertogenbosch' },
        Land: 'NL',
        UICCode: 8400319,
        Lat: 51.69048,
        Lon: 5.29362,
        Synoniemen: { Synoniem: [ 'Hertogenbosch (\'s)', 'Den Bosch' ] } } }
```


### storingen ( parameters, callback )

Get a list of maintenance and defect notifications. You need to set parameters to get any results.

**API docs: [Storingen en werkzaamheden](http://www.ns.nl/api/api#api-documentatie-storingen-en-werkzaamheden)**


```js
ns.storingen( {station: 'Amsterdam', unplanned: true}, console.log )
```

```js
{ Ongepland: 
   [ { id: 'prio-37230',
       Traject: 'Winterswijk-Arnhem',
       Reden: 'eerdere verstoring',
       Bericht: 'Tussen Velperpoort en Winterswijk langere reistijd door een eerdere verstoring.Houdt u rekening met een extra reistijd van ongeveer 15 min.De verstoring is naar verwachting 09 januari rond 2:00 uur verholpen.',
       Datum: '2013-01-08T18:52:00+0100' } ],
  Gepland: [] }
```


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
