import { URLS } from '../constants';

/**
 * Manage the feedbacks endpoints.
 */
export default class FeedbacksService {
    httpMethodsService;

    /**
     * Initialize the service dependencies.
     * The httpMethodsService instance can pass by the client of service.
     * @param {HttpMethodsService} httpMethodsService
     */
    constructor(httpMethodsService) {
        this.httpMethodsService = httpMethodsService;
    }

    /**
     * Get the list of the feedbacks.
     * Note: The api sometimes fails for unknown reasons!
     */
    list() {
        return this.httpMethodsService.get(`${URLS.API_DEMO}/recruitment/apidemo.json`, true);
    }
}
