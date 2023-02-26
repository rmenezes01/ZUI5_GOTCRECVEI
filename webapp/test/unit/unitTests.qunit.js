/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"copersucar.com.v2.gotc01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
