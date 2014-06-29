/*
 *  Project: Slidefull Plugin
 *  Description: jQuery plugin to create a simple and responsive image slideshow.
 *  Author: Guilherme Farias <guilhermefarias.com>
 *  License: MIT
 */
;(function ($, window, document) {

	var pluginName = "Slidefull";
	var defaults = {
		auto: true,
		prev: null,
		next: null,
		speed: 500,
		duration: 3000
	};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function () {
		}
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
