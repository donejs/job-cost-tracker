import $ from "jquery";
import connect from "can-connect";
import constructor from "can-connect/constructor/";
import canMap from "can-connect/can/map/";
import canRef from "can-connect/can/ref/";
import constructorStore from "can-connect/constructor/store/";
import dataCallbacks from "can-connect/data/callbacks/";
import callbacksCache from "can-connect/data/callbacks-cache/";
import combineRequests from "can-connect/data/combine-requests/";
import localCache from "can-connect/data/localstorage-cache/";
import dataParse from "can-connect/data/parse/";
import dataUrl from "can-connect/data/url/";
import fallThroughCache from "can-connect/fall-through-cache/";
import realTime from "can-connect/real-time/";
import inlineCache from "can-connect/data/inline-cache/";
import callbacksOnce from "can-connect/constructor/callbacks-once/";

connect.superMap = function(options){

	const behaviors = [
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
				name: options.name + "Cache",
				idProp: options.idProp,
				algebra: options.algebra
			});
		}
		behaviors.push(callbacksCache, fallThroughCache);
	}
	options.ajax = $.ajax;

	return connect(behaviors,options);
};

export default connect.superMap;
