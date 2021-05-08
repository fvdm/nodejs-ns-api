/*
Name:       nsapi.js - Unofficial NodeJS module for Nederlandse Spoorwegen API
Author:     Franklin van de Meent
Source:     https://github.com/fvdm/nodejs-ns-api
Feedback:   https://github.com/fvdm/nodejs-ns-api/issues
API Docs:   https://apiportal.ns.nl
License:    Unlicense (Public Domain, see LICENSE file)
*/


const { doRequest } = require ('httpreq');

module.exports = class NSAPI {

  /**
   * Configuration
   *
   * @param   {string}  key             Primary API key
   * @param   {number}  [timeout=5000]  Request timeout in ms
   */

  constructor ({

    key,
    timeout = 8000,

  }) {

    this._config = {
      key,
      timeout,
    };

  }


  /**
   * HTTP request
   *
   * @param   {string}           path          Method path
   * @param   {object}           [parameters]  Request details
   *
   * @return  {Promise<object>}
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
        if (err) {
          return reject (err);
        }

        let error;
        const data = JSON.parse (res.body);

        // API errors
        if (data.statusCode >= 300) {
          error = new Error (data.message);
          error.statusCode = data.statusCode;
          return reject (error);
        }

        if (data.code && data.message) {
          error = new Error (data.message);
          error.code = data.code;
          error.errors = data.errors;
          return reject (error);
        }

        /* istanbul ignore next */
        if (data.fieldErrors && data.fieldErrors.length) {
          error = new Error ('API field errors');
          error.errors = data.fieldErrors;
          return reject (error);
        }

        /* istanbul ignore next */
        if (data.errors && data.errors[0]) {
          error = new Error ('API errors');
          error.errors = data.errors;
          return reject (error);
        }

        // ok
        return resolve (data);
      });
    });
  }


  // ! REISINFORMATIE

  /**
   * Get a list of all stations
   *
   * @return  {Promise<array>}
   */

  async getAllStations () {
    const data = await this._request ({
      path: '/reisinformatie-api/api/v2/stations',
    });

    return data.payload;
  }


  /**
   * Get arrivals for a station
   *
   * @param   {object}          parameters  Request parameters
   * @return  {Promise<array>}
   */

  async getArrivals (parameters) {
    if (parameters.dateTime && !(parameters.dateTime instanceof Date)) {
      parameters.dateTime = new Date (parameters.dateTime).toString();
    }

    const data = await this._request ({
      path: '/reisinformatie-api/api/v2/arrivals',
      parameters,
    });

    return data.payload.arrivals;
  }


  /**
   * Get calamities
   *
   * @param   {object}          [parameters]  Request parameters
   * @return  {Promise<array>}
   */

  async getCalamities (parameters = {}) {
    const data = await this._request ({
      path: '/reisinformatie-api/api/v1/calamities',
      parameters,
    });

    return data.meldingen;
  }


  /**
   * Get a list of departure times
   *
   * @param   {object}          parameters  Request parameters
   * @return  {Promise<array>}
   */

  async getDepartures (parameters) {
    if (parameters.dateTime && !(parameters.dateTime instanceof Date)) {
      parameters.dateTime = new Date (parameters.dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/reisinformatie-api/api/v2/departures',
      parameters,
    });

    return data.payload.departures;
  }


  /**
   * Get details about one disruption
   *
   * @param   {object}           parameters     Request parameters
   * @param   {string}           parameters.id  Disruption ID
   *
   * @return  {Promise<object>}
   */

  async getDisruption (parameters) {
    const id = parameters.id;

    delete parameters.id;

    const data = await this._request ({
      path: `/reisinformatie-api/api/v2/disruptions/${id}`,
      parameters,
    });

    return data.payload;
  }


  /**
   * Get a list of disruptions
   *
   * @param   {object}          parameters  Request parameters
   * @return  {Promise<array>}
   */

  async getDisruptions (parameters = {}) {
    parameters.actual = parameters.actual === true ? 'true' : 'false';

    const data = await this._request ({
      path: '/reisinformatie-api/api/v2/disruptions',
      parameters,
    });

    return data.payload;
  }


  /**
   * Get a list of disruptions for a specific station
   *
   * @param   {object}           parameters       Request parameters
   * @param   {object}           parameters.code  UICCode or station code
   *
   * @return  {Promise<object>}
   */

  async getStationDisruption (parameters) {
    const code = parameters.code;

    delete parameters.code;

    const data = await this._request ({
      path: `/reisinformatie-api/api/v2/disruptions/station/${code}`,
      parameters,
    });

    return data.payload;
  }


  /**
   * Reconstruct a trip if possible using the given reconCtx
   *
   * @param   {object}          parameters  Request parameters
   * @return  {Promise<array>}
   */

  async getTrip (parameters = {}) {

    /*
    if (parameters.date && !(parameters.date instanceof Date)) {
      parameters.date = new Date (parameters.date).toISOString();
    }
    */

    const data = await this._request ({
      path: '/reisinformatie-api/api/v3/trips/trip',
      parameters,
    });

    return data;
  }


  /**
   * Searches for a travel advice with the specified options between the
   * possible backends (HARP, 9292 or PAS/AVG)
   *
   * For door-to-door trips you need a special API key
   *
   * @param   {object}          parameters  Request parameters
   * @return  {Promise<array>}
   */

  async getTrips (parameters) {
    if (parameters.dateTime && !(parameters.dateTime instanceof Date)) {
      parameters.dateTime = new Date (parameters.dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/reisinformatie-api/api/v3/trips',
      parameters,
    });

    return data.trips;
  }


  /**
   * Get pricing for travel between two stations
   *
   * @param   {object}          parameters  Request parameters
   * @return  {Promise<array>}
   */

  async getPrice (parameters) {
    // YYYY-MM-DD
    if (parameters.date && !(parameters.date instanceof Date)) {
      parameters.date = new Date (parameters.date).toISOString().split ('T')[0];
    }

    const data = await this._request ({
      path: '/reisinformatie-api/api/v2/price',
      parameters,
    });

    return data.payload;
  }


  /**
   * Get information about a specific journey
   *
   * @param   {object}          Parameters  Request parameters
   * @return  {Promise<object>
   */

  async getJourney (parameters) {
    if (parameters.dateTime && !(parameters.date instanceof Date)) {
      parameters.dateTime = new Date (parameters.dateTime).toISOString();
    }

    const data = await this._request ({
      path: '/reisinformatie-api/api/v2/journey',
      parameters,
    });

    return data.payload;
  }

};
