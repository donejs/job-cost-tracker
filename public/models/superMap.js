var connect = require("can-connect");

// require("can-connect/constructor/");
// require("can-connect/can/map/");
// require("can-connect/constructor/store/");
// require("can-connect/constructor/callbacks-once/");
// require("can-connect/data/callbacks/");
// require("can-connect/data/combine-requests/");
// require("can-connect/data/parse/");
// require("can-connect/data/url/");
// require("can-connect/real-time/");

// var Map = require("can/map/map");
// var List = require("can/list/list");

// connect.superMap = function(options){

// 	var behaviors = [
// 		"constructor",
// 		"can-map",
// 		"constructor-store",
// 		"data-callbacks",
// 		"data-combine-requests",
// 		"data-parse",
// 		"data-url",
// 		"real-time",
// 		"constructor-callbacks-once"];

// 	options.ajax = $.ajax;

// 	return connect(behaviors,options);
// };

// module.exports = connect.superMap;



var connect = require("can-connect");

var constructor = require("can-connect/constructor/");
var canMap = require("can-connect/can/map/");
var canRef = require("can-connect/can/ref/");
var constructorStore = require("can-connect/constructor/store/");
var dataCallbacks = require("can-connect/data/callbacks/");
var callbacksCache = require("can-connect/data/callbacks-cache/");
var combineRequests = require("can-connect/data/combine-requests/");
var localCache = require("can-connect/data/localstorage-cache/");
var dataParse = require("can-connect/data/parse/");
var dataUrl = require("can-connect/data/url/");
var fallThroughCache = require("can-connect/fall-through-cache/");
var realTime = require("can-connect/real-time/");
var inlineCache = require("can-connect/data/inline-cache/");
var callbacksOnce = require("can-connect/constructor/callbacks-once/");


var $ = require("jquery");

connect.superMap = function(options){

	var behaviors = [
		constructor,
		canMap,
		canRef,
		constructorStore,
		dataCallbacks,
		combineRequests,
		inlineCache,
		dataParse,
		dataUrl,
		realTime,
		callbacksOnce];

	if(typeof localStorage !== "undefined") {
		if(!options.cacheConnection) {
			options.cacheConnection = connect([localCache],{
				name: options.name+"Cache",
				idProp: options.idProp,
				algebra: options.algebra
			});
		}
		behaviors.push(callbacksCache,fallThroughCache);
	}
	options.ajax = $.ajax;

	return connect(behaviors,options);
};

module.exports = connect.superMap;

