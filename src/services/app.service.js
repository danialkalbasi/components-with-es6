/* eslint-disable no-unused-vars */
import { EventEmitter } from 'events';
/* eslint-disable no-unused-vars */
import { APP_EVENTS } from '../constants';

/**
 * This service is responsible to notify the subscribers of dom changes.
 * In our case is only notify the subscribers upon dom load.
 */
export default class AppService {
    static appListener;

    /**
     * It instantiate the appListener if it is undefined,
     * A better option is to use rxjs, but our case is simple and this is sufficient.
     */
    constructor() {
        if (!AppService.appListener) {
            AppService.appListener = new EventEmitter();
        }
    }

    /**
     * This function subscribe to the DOMContentLoaded
     * in order to get notified when the dom is ready.
     */
    triggerWhenContentLoaded() {
        document.addEventListener('DOMContentLoaded', () => {
            AppService.appListener.emit(APP_EVENTS.LOADED, true);
        });
    }

    /**
     * Subscribe to the dom load event.
     * @param {Function} fn
     */
    pageLoaded(fn) {
        AppService.appListener.addListener(APP_EVENTS.LOADED, fn);
    }
}
