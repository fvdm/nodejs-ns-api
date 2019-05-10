/*
Name:       nsapi.js - Unofficial NodeJS module for Nederlandse Spoorwegen API
Author:     Franklin van de Meent
Source:     https://github.com/fvdm/nodejs-ns-api
Feedback:   https://github.com/fvdm/nodejs-ns-api/issues
API Docs:   http://www.ns.nl/api/api
License:    Unlicense (Public Domain)
            (see LICENSE file or https://raw.github.com/fvdm/nodejs-ns-api/master/LICENSE)
*/


const { doRequest } = require ('httpreq');

module.exports = class NSAPI {

  /**
   * Configuration
   *
   * @param   {string}  key      Primary API key
   * @param   {number}  timeout  Request timeout in ms
   */

  constructor ({ key, timeout } = {}) {
    this._config = {
      key,
      timeout: timeout || 5000,
    };
  }


  /**
   * HTTP request
   *
   * @param    {string}   path          Method path
   * @param    {object}   [parameters]  Request details
   *
   * @return   {Promise}
   * @Promise  {object}   resolve
   */

  async _request ({ path, parameters }) {
    const options = {
      method: 'GET',
      url: `https://gateway.apiportal.ns.nl${path}`,
      parameters,
      timeout: this._config.timeout,
      headers: {
        'Accept': 'application/json',
        'Ocp-Apim-Subscription-Key': this._config.key,
      },
    };

    return new Promise ((resolve, reject) => {
      doRequest (options, (err, res) => {
        if (err) return reject (err);

        let error;
        const data = JSON.parse (res.body);

        // API errors
        if (data.statusCode >= 300) {
          error = new Error (data.messages);
          error.statusCode = data.statusCode;
          return reject (error);
        }

        if (data.code && data.message) {
          error = new Error (data.message);
          error.code = data.code;
          error.errors = data.errors;
          return reject (error);
        }

        if (data.fieldErrors && data.fieldErrors.length) {
          error = new Error ('API field error');
          error.errors = data.fieldErrors;
          return reject (error);
        }

        if (data.errors && data.errors[0]) {
          error = new Error ('API error');
          error.errors = data.errors;
          return reject (error);
        }

        // ok
        resolve (data);
      });
    });
  }


  /**
   * Get a list of all stations
   *
   * @return   {Promise}
   * @Promise  {array}    resolve
   */

  async getAllStations () {
    const data = await this._request ({
      path: '/public-reisinformatie/api/v2/stations',
    });

    return data.payload;
  }


  /**
   * Get arrivals for a station
   *
   * @param    {Date|string}  [dateTime]     Limit to date
   * @param    {number}       [maxJourneys]  Limit to number of results
   * @param    {string}       [lang]         Language of results: 'nl' or 'en'
   * @param    {string}       [station]      Station ID: either `station` or `uicCode`
   * @param    {string}       [uicCode]      Station ID: either `station` or `uicCode`
   * @param    {string}       [source]
   *
   * @return   {Promise}
   * @Promise  {array}        resolve
   */

  async getArrivals ({

    dateTime = '',

  } = {}) {

    if (dateTime && !(dateTime instanceof Date)) {
      arguments[0].dateTime = new Date (dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/public-reisinformatie/api/v2/arrivals',
      parameters: arguments[0],
    });

    return data.payload.arrivals;

  }


  /**
   * Get a large list of departure times for a specified station
   *
   * @param    {Date|string}  [dateTime]     Limit to date
   * @param    {number}       [maxJourneys]  Limit to number of results
   * @param    {string}       [lang]         Language of results: 'nl' or 'en'
   * @param    {string}       [station]      Station ID: either `station` or `uicCode`
   * @param    {string}       [uicCode]      Station ID: either `station` or `uicCode`
   * @param    {string}       [source]
   *
   * @return   {Promise}
   * @Promise  {array}        resolve
   */

  async getBigDepartures ({

    dateTime = '',

  } = {}) {

    if (dateTime && !(dateTime instanceof Date)) {
      arguments[0].dateTime = new Date (dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/public-reisinformatie/api/v2/departures/big',
      parameters: arguments[0],
    });

    return data.payload.departures;

  }


  /**
   * Get a list of departure times
   *
   * @param    {Date|string}  [dateTime]     Limit to date
   * @param    {number}       [maxJourneys]  Limit to number of results
   * @param    {string}       [lang]         Language of results: 'nl' or 'en'
   * @param    {string}       [station]      Station ID: either `station` or `uicCode`
   * @param    {string}       [uicCode]      Station ID: either `station` or `uicCode`
   * @param    {string}       [source]
   *
   * @return   {Promise}
   * @Promise  {array}    resolve
   */

  async getDepartures ({

    dateTime = '',

  } = {}) {

    if (dateTime && !(dateTime instanceof Date)) {
      arguments[0].dateTime = new Date (dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/public-reisinformatie/api/v2/departures',
      parameters: arguments[0],
    });

    return data.payload.departures;

  }


  /**
   * Get details about one disruption
   *
   * @param    {string}  [id]  Disruption ID
   *
   * @return   {Promise}
   * @Promise  {object}        resolve
   */

  async getDisruption ({ id } = {}) {

    const data = await this._request ({
      path: `/public-reisinformatie/api/v2/disruptions/${id}`,
    });

    return data.payload;

  }


  /**
   * Get a list of disruptions
   *
   * @param    {boolean}  [actual]  Only return disruptions within 2 hours of the request
   * @param    {string}   [lang]    Language of results: 'nl' or 'en'
   * @param    {string}   [type]    Filter by type of the disruptions: `storing` or `werkzaamheid`
   *
   * @return   {Promise}
   * @Promise  {array}        resolve
   */

  async getDisruptions ({

    actual = '',

  } = {}) {

    arguments[0].actual = String (actual);

    const data = await this._request ({
      path: '/public-reisinformatie/api/v2/disruptions',
      parameters: arguments[0],
    });

    return data.payload;

  }


  /**
   * Get a list of disruptions for a specific station
   *
   * @param    {string}   [station]
   *
   * @return   {Promise}
   * @Promise  {object}   resolve
   */

  async getStationDisruption ({

    station = '',

  } = {}) {

    const data = await this._request ({
      path: `/public-reisinformatie/api/v2/disruptions/station/${station}`,
    });

    return data.payload;

  }


  /**
   * Reconstruct a trip if possible using the given reconCtx
   *
   * @param    {string}   ctxRecon             Representation of a trip found in a travel advice
   * @param    {string}   [date]
   * @param    {string}   [lang]
   * @param    {string}   [product]
   * @param    {string}   [travelClass]
   * @param    {string}   [discount]
   * @param    {string}   [travelRequestType]
   *
   * @return   {Promise}
   * @Promise  {array}    resolve
   */

  async getTrip ({

    ctxRecon = '',
    date = '',
    lang = '',
    product = '',
    travelClass = '',
    discount = '',
    travelRequestType = '',

  } = {}) {

    if (date && !(date instanceof Date)) {
      arguments[0].date = new Date (date).toISOString();
    }

    const data = await this._request ({
      path: '/public-reisinformatie/api/v3/trips/trip',
      parameters: arguments[0],
    });

    return data.payload;

  }


  /**
   * Searches for a travel advice with the specified options between the
   * possible backends (HARP, 9292 or PAS/AVG)
   *
   * @return   {Promise}
   * @Promise  {array}    resolve
   */

  async getTrips ({

    dateTime = '',

  } = {}) {

    if (dateTime && !(dateTime instanceof Date)) {
      arguments[0].dateTime = new Date (dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/public-reisinformatie/api/v3/trips',
      parameters: arguments[0],
    });

    return data;

  }


  /**
   * Get pricing for travel between two stations
   *
   * @param    {Date|string}  date         Date instance or string 'YYYY-MM-DD'
   * @param    {string}       fromStation  Name/ID of station #1
   * @param    {string}       toStation    Name/ID of station #2
   */

  async getPrices ({

    date = '',

  } = {}) {

    // YYYY-MM-DD
    if (date && !(date instanceof Date)) {
      arguments[0].date = new Date (date).toISOString().split ('T')[0];
    }

    const data = await this._request ({
      path: '/public-prijsinformatie/prices',
      parameters: arguments[0],
    });

    return data.priceOptions;
  }

};
