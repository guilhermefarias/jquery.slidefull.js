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
			this.options.wrapper = jQuery(this.element);
			var itens = this.options.wrapper.find('.slidefull-item');
			var pageTemplate = '';
			this.options.itens = [];


			itens.each(function(index, element){
				jQuery(element).hide();
				this.options.itens.push(jQuery(element));

				pageTemplate = pageTemplate + this.getPageTemplate(index);
			}.bind(this));


			var paginationTemplate = '<div class="slidefull-pagination">' + pageTemplate + '</div>';
			var controlsTemplate = '<div class="slidefull-controls"><div class="slidefull-arrow next"></div><div class="slidefull-arrow prev"></div></div>';
			this.options.wrapper.append(paginationTemplate);
			this.options.wrapper.append(controlsTemplate);

			this.options.atual = 0;
			this.options.total = this.options.itens.length;
			this.go(0);
		},
		getPageTemplate: function (index) {
			return '<div class="slidefull-page" data-page="' + index + '">'+ (index + 1)+ '</div>';
		},
		go: function(number){
			number = number + 1;
			if(number == this.options.total){
				number = 0;
			} else if(number < 0){
				number = this.options.total - 1;
			}
			clearTimeout(this.options.timeout);

			this.options.itens[number].fadeIn();
			this.options.itens[this.options.atual].fadeOut();
			jQuery('.slidefull-page.active').removeClass('active');
			jQuery('.slidefull-page[data-page=' + number + ']').addClass('active');

			this.options.atual = number;
			this.options.timeout = setTimeout(function(){
				this.next();
			}.bind(this), 1000);
		},
		next: function(){
			this.go(this.options.atual);
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
