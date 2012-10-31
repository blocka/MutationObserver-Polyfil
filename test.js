/*jslint browser:true*/
/*global QUnit, module, test, ok, deepEqual, stop, start, equal*/

(function () {
	'use strict';

	var MutationObserver, fixture;

	module('Mutation Observer Polyfil', {
		setup: function () {
			MutationObserver = window.MutationObserver;
			fixture = document.getElementById('qunit-fixture');
			fixture.innerHTML = '';
		}
	});

	test('MutationObserver existance', function () {

		ok(window.MutationObserver, 'The global `MutationObserver` should exist');

		if (window.MozMutationObserver) {

			deepEqual(window.MutationObserver, window.MozMutationObserver, 'The `MutationObserver` should be exactly the same as `MozMutationObserver`');

		} else if (window.WebKitMutationObserver) {

			deepEqual(window.MutationObserver, window.WebKitMutationObserver, 'The `MutationObserver` should be exactly the same as `WebKitMutationObserver`');

		}

	});

	test('insert node', 6, function () {

		stop();

		var observer,
			span = document.createElement('span');

		function handleMutation(mutation) {
			start();

			ok(mutation, 'A MutationRecord should be provided');
			equal(mutation.type, 'childList', 'The MutationRecord\'s type should be `childList');
			equal(mutation.target, fixture, 'The MutationRecord\'s target should be the fixture');
			ok(mutation.addedNodes, 'The `addedNodes` list should be OK');
			equal(mutation.addedNodes[0], span, 'The span should be the 0th addedNode');

			equal(mutation.removedNodes.length, 0, 'There should be no removedNodes');

			observer.disconnect();
		}

		observer = new MutationObserver(function (mutations) {
			mutations.forEach(handleMutation);
		});

		observer.observe(fixture, {
			childList: true
		});

		span.innerHTML = 'Hello world!';

		fixture.appendChild(span);

	});


	test('remove node', 6, function () {

		stop();

		var observer,
			span = document.createElement('span');

		function handleMutation(mutation) {
			start();

			ok(mutation, 'A MutationRecord should be provided');
			equal(mutation.type, 'childList', 'The MutationRecord\'s type should be `childList');
			equal(mutation.target, fixture, 'The MutationRecord\'s target should be the fixture');
			ok(mutation.removedNodes, 'The `removedNodes` list should be OK');
			equal(mutation.removedNodes[0], span, 'The span should be the 0th removedNode');

			equal(mutation.addedNodes.length, 0, 'There should be no addedNodes');

			observer.disconnect();
		}

		span.innerHTML = 'Hello world!';

		fixture.appendChild(span);

		observer = new MutationObserver(function (mutations) {
			mutations.forEach(handleMutation);
		});

		observer.observe(fixture, {
			childList: true
		});

		fixture.removeChild(span);
	});

	test('add attribute', 4, function () {

		stop();

		var observer,
			span = document.createElement('span');

		function handleMutation(mutation) {
			start();

			ok(mutation, 'A MutationRecord should be provided');
			equal(mutation.type, 'attributes', 'The type should be `attributes`');
			equal(mutation.target, span, 'The target should be the span');
			equal(mutation.attributeName, 'foo', 'The `attributeName` should be `foo`');

			observer.disconnect();
		}

		span.innerHTML = 'Hello world!';

		fixture.appendChild(span);

		observer = new MutationObserver(function (mutations) {
			mutations.forEach(handleMutation);
		});

		observer.observe(span, {
			attributes: true
		});

		span.setAttribute('foo', 'bar');

	});

	test('remove attribute', 4, function () {


		stop();

		var observer,
			span = document.createElement('span');

		function handleMutation(mutation) {
			start();

			ok(mutation, 'A MutationRecord should be provided');
			equal(mutation.type, 'attributes', 'The type should be `attributes`');
			equal(mutation.target, span, 'The target should be the span');
			equal(mutation.attributeName, 'foo', 'The `attributeName` should be `foo`');

			observer.disconnect();
		}

		span.innerHTML = 'Hello world!';
		span.setAttribute('foo', 'bar');
		fixture.appendChild(span);

		observer = new MutationObserver(function (mutations) {
			mutations.forEach(handleMutation);
		});

		observer.observe(span, {
			attributes: true
		});

		span.removeAttribute('foo');

	});

}());