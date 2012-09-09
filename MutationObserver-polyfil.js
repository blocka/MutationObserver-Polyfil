/*jslint browser:true*/
(function () {
	'use strict';

	/**
	 * Flag to pollute the global namespace with the new API
	 * @type {Boolean}
	 */
	var pollute = true,
		/**
		 * Supporting browser/vendor prefixes
		 * @type {Array}
		 */
		prefixes = [
			'WebKit',
			'Moz'
		],
		/**
		 * The number of prefixes
		 * @type {Number}
		 */
		prefixCount = prefixes.length,
		/**
		 * Incrementor
		 * @see  below for loop :)
		 * @type {Number}
		 */
		i,
		/**
		 * The mutation observer
		 *
		 * @type {Function}
		 */
		observer;

	// don't attempt to polyfil if there's no need
	if (window.MutationObserver === undefined) {

		// walk through the prefixes
		for (i = 0; i < prefixCount; i += 1) {
			// check to see if the API exists
			if (window[prefixes[i] + 'MutationObserver'] !== undefined) {
				// save the API and exit the loop
				observer = window[prefixes[i] + 'MutationObserver'];
				break;
			}
		}

		// should we pollute?
		if (pollute) {
			window.MutationObserver = observer;
		}

		// exit - return the new observer
		return observer;

	}

	// exit - return the native observer
	return window.MutationObserver;

}());
