/* =============================================================================
	jQuery to date ver1.00
	Dual licensed under the MIT and GPL licenses.
============================================================================= */
(function($) {
	$.fn.toDate = function(settings) {
		settings = $.extend({
			format	: 'm/d/Y w h:i:s',
			month	: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			jweek	: ['日', '月', '火', '水', '木', '金', '土'],
			eweek	: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
		}, settings);

		var _this = this;

		var dateY = '';
		var dateM = '';
		var dateD = '';
		var dateW = '';
		var timeH = '';
		var timeM = '';
		var timeS = '';

		var replaceFormat = {};

		function update() {
			var dateObj = new Date();
			dateY = dateObj.getFullYear();
			dateM = dateObj.getMonth() + 1;
			dateD = dateObj.getDate();
			dateW = dateObj.getDay();
			timeH = dateObj.getHours();
			timeM = dateObj.getMinutes();
			timeS = dateObj.getSeconds();

			var replaceFormat = {
				'y'	: String(dateY).substr(2, 2),
				'Y'	: dateY,
				'm'	: dateformat(dateM),
				'M'	: settings.month[dateM - 1],
				'n'	: dateM,
				'N'	: String(settings.month[dateM - 1]).substr(0, 3),
				'd'	: dateformat(dateD),
				'h'	: dateformat(timeH),
				'H'	: dateformat(timeH),
				'i'	: dateformat(timeM),
				's'	: dateformat(timeS),
				'j'	: dateD,
				'w'	: settings.eweek[dateW],
				'W'	: settings.jweek[dateW]
			}

			var date = settings.format;
			for(var k in replaceFormat) {
				if(k == 'h' && replaceFormat[k] >= 12) {
					replaceFormat[k] -= 12;
				}
				date = date.replace(k, replaceFormat[k]);
			}
			$(_this).html(date);
		}

		function dateformat(n) {
			if(n < 10) {
				return '0' + n;
			} else {
				return n;
			}
		}

		update();

		setInterval(update, 1000);

		return this;
	}
})(jQuery);
