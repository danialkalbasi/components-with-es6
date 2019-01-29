/**
 * This service handles http methods operation
 */
export default class HttpMethodsService {
    /**
     * Set the default cache
     */
    constructor() {
        this.caches = [];
    }

    /**
     * Call the get http method
     * If the URL has cache data, it will return it's data
     * otherwise it will do a new call
     * @param {String} url is the url of endpoint
     * @param {Boolean} cache whether should be cached
     */
    get(url, cache = false) {
        const getHeaders = this.headers;

        if (cache) {
            const urlkey = this.getUrlKey(url);
            const cached = this.caches[urlkey];

            if (cached) {
                const responsePromise = new Promise((resolve) => {
                    resolve(cached);
                });
                return responsePromise;
            }
            return this.baseGet(url, getHeaders)
                .then(this.toJson)
                .catch(error => Promise.reject(this.handleError(url, error)));
        }

        return this.baseGet(url, getHeaders)
            .then(this.toJson)
            .catch(error => Promise.reject(this.handleError(url, error)));
    }

    baseGet(url, headers) {
        const header = { headers };

        return fetch(url, header)
            .then((result) => {
                if (result.ok) {
                    return result;
                }
                return Promise.reject(this.handleError(url, JSON.stringify(result)));
            })
            .catch(error => Promise.reject(this.handleError(url, error)));
    }

    /**
     * Handle http errors
     * @param {String} url is the request url
     * @param {String} error is the error object
     */
    handleError(url, error) {
        const errorMessage = `The URL: ${url}, Error: ${error}`;
        throw new Error(errorMessage);
    }

    /**
     * Set default header object
     */
    setDefaultHeaders() {
        this.headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        });
    }

    /**
     * Convert response data to the array object
     * if the data is not json, then it will return the data itself
     * @param {Object} data is the response data
     */
    toJson(data) {
        const isResponse = data instanceof Response;
        return isResponse ? data.json() : data;
    }

    /**
     * Generate a unique key based on the endpoint url
     * The url use as a key to retrieve a cache data for specific request
     * @param {String} url is the endpoint url
     */
    getUrlKey(url) {
        return url ? url.replace(/[^\w\s]/gi, '') : '';
    }
}
