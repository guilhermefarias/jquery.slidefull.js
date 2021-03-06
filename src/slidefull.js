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
		displayPagination: true
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

			this.options.itens = [];
			this.options.wrapper = jQuery(this.element);
			itens = this.options.wrapper.find('.slidefull-item');

			itens.each(function(index, item){
				item = jQuery(item);
				item.hide();
				this.options.itens.push(item);
				pages = pages + this.getPageTemplate(index);
			}.bind(this));

			if(this.options.displayControls){
				var controls = '';
				controls = this.getControls();
				this.options.wrapper.append(controls);
				this.addControlActions();
			}

			if(this.options.displayPagination){
				var pagination = '';
				pagination = this.getPagination(pages);
				this.options.wrapper.append(pagination);
				this.addPaginationActions();
			}

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

		addControlActions: function(){
			var prev = this.options.wrapper.find('.slidefull-arrow.prev');
			var next = this.options.wrapper.find('.slidefull-arrow.next');

			prev.off().on('click', function(e){
				e.preventDefault();
				this.showPrev();
			}.bind(this));

			next.off().on('click', function(e){
				e.preventDefault();
				this.showNext();
			}.bind(this));
		},

		addPaginationActions: function(){
			var pagination = this.options.wrapper.find('.slidefull-pagination');

			pagination.off().on('click', '.slidefull-page', function(e){
				var index = jQuery(e.target).data('page') - 1;
				this.show(index);
			}.bind(this));
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
			else if(index === this.options.atual){
				return false;
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
		},

		showPrev: function(){
			this.show(this.options.atual - 2);	
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
