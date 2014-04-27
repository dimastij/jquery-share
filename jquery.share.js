/**
 * jQuery.share - social media sharing plugin
 * ---
 * @author Carol Skelly (http://in1.com)
 * @version 1.0
 * @license MIT license (http://opensource.org/licenses/mit-license.php)
 * ---
 */

;(function ( $, window, undefined ) {

	var document = window.document;

	$.fn.share = function(method) {

		var methods = {

			init : function(options) {
				this.share.settings = $.extend({}, this.share.defaults, options);
				var settings = this.share.settings,
					networks = this.share.settings.networks,
					theme = this.share.settings.theme,
					orientation = this.share.settings.orientation,
					affix = this.share.settings.affix,
					margin = this.share.settings.margin,
					pageTitle = this.share.settings.title||$(document).attr('title'),
					pageUrl = this.share.settings.urlToShare||$(location).attr('href'),
					pageDesc = "",
					I18n = this.share.settings.I18n || {
						titleText: 'Share this page on '
					};

				$.each($(document).find('meta[name="description"]'),function(idx,item){
					pageDesc = $(item).attr("content");
				});

				// each instance of this plugin
				return this.each(function() {
					var $element = $(this),
						id=$element.attr("id"),
						u=encodeURIComponent(pageUrl),
						t=encodeURIComponent(pageTitle),
						d=pageDesc.substring(0,250),
						href;

					// append HTML for each network button
					for (var item in networks) {
						item = networks[item];
						href = helpers.networkDefs[item].url;
						href = href.replace('|u|',u).replace('|t|',t).replace('|d|',d)
							.replace('|140|',t.substring(0,130));

						var shareLink = $('<a/>')
							.attr('href', href)
							.attr('title', I18n.titleText + item)
							.addClass('pop share-' + theme + ' share-' + theme + '-' + item);

						// bind a click event
						shareLink.on('click', function(e){
							e.preventDefault();
							var top = parseInt((screen.height / 2) - (settings.popupHeight / 2))
								, left = parseInt((screen.width / 2) - (settings.popupWidth / 2));

							window.open(
								$(this).attr('href'),
								I18n.titleText + item,
								'toolbar=0,resizable=1,status=0,copyhistory=no,' +
									'width=' + settings.popupWidth + ',' +
									'height=' +settings.popupHeight + ',top=' + top + ',left=' + left
							);
						});

						$element.append(shareLink);
					}

					// customize css
					$("#"+id+".share-"+theme).css('margin',margin);

					if (orientation != "horizontal"){
						$("#"+id+" a.share-"+theme).css('display','block');
					}
					else {
						$("#"+id+" a.share-"+theme).css('display','inline-block');
					}

					if (typeof affix != "undefined"){
						$element.addClass('share-affix');
						if (affix.indexOf('right')!=-1){
							$element.css('left','auto');
							$element.css('right','0px');
							if (affix.indexOf('center')!=-1){
								$element.css('top','40%');
							}
						}
						else if (affix.indexOf('left center')!=-1){
							$element.css('top','40%');
						}

						if (affix.indexOf('bottom')!=-1){
							$element.css('bottom','0px');
							$element.css('top','auto');
							if (affix.indexOf('center')!=-1){
								$element.css('left','40%');
							}
						}
					}
				});// end plugin instance

			}
		}

		var helpers = {
			networkDefs: {
				facebook:{url:'http://www.facebook.com/share.php?u=|u|'},
				//http://twitter.com/home?status=jQuery%20Share%20Social%20Media%20Plugin%20-%20Share%20to%20multiple%20social%20networks%20from%20a%20single%20form%20http://plugins.in1.com/share/demo
				twitter:{url:'https://twitter.com/share?url=|u|&text=|140|'},
				linkedin:{url:'http://www.linkedin.com/shareArticle?mini=true&url=|u|&title=|t|&summary=|d|&source=in1.com'},
				in1:{url:'http://www.in1.com/cast?u=|u|',w:'490',h:'529'},
				tumblr:{url:'http://www.tumblr.com/share?v=3&u=|u|'},
				digg:{url:'http://digg.com/submit?url=|u|&title=|t|'},
				googleplus:{url:'https://plusone.google.com/_/+1/confirm?hl=en&url=|u|'},
				reddit:{url:'http://reddit.com/submit?url=|u|'},
				pinterest:{url:'http://pinterest.com/pin/create/button/?url=|u|&media=&description=|d|'},
				posterous:{url:'http://posterous.com/share?linkto=|u|&title=|t|'},
				xing:{url:'https://www.xing.com/app/user?op=share;url=|u|;title=|t|'},
				stumbleupon:{url:'http://www.stumbleupon.com/submit?url=|u|&title=|t|'},
				email:{url:'mailto:?subject=|t|'}
			}
		}

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method "' +  method + '" does not exist in social plugin');
		}

	}

	$.fn.share.defaults = {
		popupWidth: 640,
		popupHeight: 528,
		networks: ['facebook','twitter','linkedin'],
		theme: 'icon', // use round icons sprite
		autoShow: true,
		margin: '3px',
		orientation: 'horizontal',
		useIn1: false
	}

	$.fn.share.settings = {}

})(jQuery, window);
