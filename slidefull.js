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
		duration: 3000,
		displayControls: true,
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
			var itens
			var pages = '';
			var pagination = '';

			this.options.itens = [];
			this.options.wrapper = jQuery(this.element);
			itens = this.options.wrapper.find('.slidefull-item');

			itens.each(function(index, item){
				item = jQuery(item);
				item.hide();
				this.options.itens.push(item);
				pages = pages + this.getPageTemplate(index);
			}.bind(this));

			pagination = this.getPagination(pages);
			if(this.options.displayControls){
				var controls = '';
				controls = this.getControls();
				this.options.wrapper.append(controls);
			}

			this.options.wrapper.append(pagination);

			this.options.atual = 0;
			this.options.total = this.options.itens.length;

			this.show(this.options.atual);
		},

		getPageTemplate: function (index) {
			return '<div class="slidefull-page" data-page="' + index + '">'+ (index + 1)+ '</div>';
		},

		getPagination: function(pages){
			return '<div class="slidefull-pagination">' + pages + '</div>';
		},

		getControls: function(){
			return '<div class="slidefull-controls">'+
						'<div class="slidefull-arrow next"></div>'+
						'<div class="slidefull-arrow prev"></div>'+
					'</div>';
		},

		updateActivePage: function(index){
			var activePage = this.options.wrapper.find('.slidefull-page.active');
			var indexPage = this.options.wrapper.find('.slidefull-page[data-page=' + index + ']');

			activePage.removeClass('active');
			indexPage.addClass('active');
		},

		show: function(index){
			index = index + 1;

			if(index == this.options.total){
				index = 0;
			}
			else if(index < 0){
				index = this.options.total - 1;
			}

			clearTimeout(this.options.timeout);

			this.options.itens[index].fadeIn({
				queue: false,
				duration: this.options.speed
			});

			this.options.itens[this.options.atual].fadeOut({
				queue: false,
				duration: this.options.speed
			});

			this.updateActivePage(index);

			this.options.atual = index;

			if(this.options.auto){
				this.options.timeout = setTimeout(function(){
					this.showNext();
				}.bind(this), this.options.duration);
			}
		},

		showNext: function(){
			this.show(this.options.atual);
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
