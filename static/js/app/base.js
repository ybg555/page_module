function ToTop(settings) {
	this.container = null;
	this.btn = null;
	this.conWidth = settings.conWidth;
	this.topDis = settings.topDis;
	this.direction = settings.direction ? settings.direction : 'left';
	this.rDis = settings.rightDis;
	this.handle = {
		getWidth: function() {
			return $(window).width();
		},
		getScrollTop: function() {
			return $(window).scrollTop();
		}
	}
}
ToTop.prototype.initCss = function() {
	if (this.direction === 'left') {
		var leftDis = (this.handle.getWidth() - this.conWidth) / 2 + this.conWidth + this.rDis;
	} else {
		var leftDis = (this.handle.getWidth() - this.conWidth) / 2 - this.container.outerWidth() - this.rDis;
	}
	var height = this.container.find('li').length * this.container.find('li').eq(0).outerHeight();
	this.container.css({
		'left': leftDis + 'px',
		'height': height + 'px'
	});
};
ToTop.prototype.init = function(settings) {
	this.container = $(settings.conName);
	this.btn = $(settings.btnName);
	var This = this;
	if (This.handle.getScrollTop() > This.topDis) {
		This.container.show();
	}
	this.initCss();
	$(window).scroll(function() {
		if (This.handle.getScrollTop() > This.topDis) {
			if (This.handle.getWidth() > This.conWidth) {
				This.container.fadeIn();
				This.initCss();
			}
		} else {
			This.container.fadeOut();
		}
	});
	$(window).resize(function() {
		if (This.handle.getWidth() < This.conWidth) {
			This.container.fadeOut();
		} else {
			if (This.handle.getScrollTop() > This.topDis) {
				This.container.fadeIn();
			}
			This.initCss();
		}
	});
	this.btn.click(function() {
		$('html,body').stop().animate({
			scrollTop: '0px'
		}, 500);
	});
};
ToTop.slideTo = function(id) {
	var _slide_obj = $(id);
	if (_slide_obj.length < 1) {
		return;
	}
	var _scrollTop = _slide_obj.offset().top;
	$("html,body").stop().animate({
		scrollTop: _scrollTop
	}, 500);
};
(function($) {
	$.fn.wlTabs = function(options) {
		var jq = this,
			jd = $(options),
			n = 0;
		jq.find('a').eq(n).addClass('current');
		jd.eq(n).show().siblings().hide();
		jq.children('li').bind('click', function(event) {
			n = jq.children('li').index(this);
			$(this).children('a').addClass('current').parent().siblings('li').children('a').removeClass('current');
			jd.eq(n).show().siblings().hide();
			var v = $(this).children('a').attr('href');
			if (v == '' || v == '#') {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					return false;
				}
			}
		});
	};
})($);
/*Public Data*/
PUBLIC_DATA = {
	'timer': 0
};
/*normal fn*/
wl = {
	throttle: function(method, obj) {
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(obj);
		}, 500);
	},
	stopBubble: function(event) {
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	},
	stopDefault: function(event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
	},
	focusInput: function(obj) {
		$(obj).siblings('label').css('color', '#ccc');
		$(obj).bind('input propertychange', function() {
			if ($(obj).val().length > 0) {
				$(obj).siblings('label').hide();
			} else {
				$(obj).siblings('label').show();
			}
		});
	},
	blurInput: function(obj) {
		$(obj).siblings('label').css('color', '#999');
	},
	/*显示子菜单*/
	popToggle: function(options) {
		$(options.obj).toggleClass('popShow');
	},
	/*延时消失-1*/
	parentDelay: function(options) {
		var pop_obj = $(options.pop_id);
		if (options.effect == 'show') {
			var obj = $(options.obj_id);
			var obj_top = obj.offset().top,
				obj_left = obj.offset().left,
				obj_height = obj.outerHeight(true),
				obj_width = obj.outerWidth(true),
				pop_obj_width = pop_obj.outerWidth(true);
			$(options.pop_class).hide();
			pop_obj.css({
				'top': parseInt(obj_top + obj_height) + 'px',
				'left': parseInt(obj_left - (pop_obj_width - obj_width) / 2) + 'px'
			}).fadeIn();
			if (options.delay == 'true') {
				clearTimeout(PUBLIC_DATA.timer);
			}
		} else {
			if (options.delay == 'true') {
				PUBLIC_DATA.timer = setTimeout(function() {
					pop_obj.fadeOut();
				}, 300);
			} else {
				pop_obj.fadeOut();
			}
		}

	},
	/*延时消失-2*/
	childDelay: function(options) {
		var pop_obj = $(options.pop_id);
		if (options.effect == 'show') {
			pop_obj.show();
			if (options.delay == 'true') {
				clearTimeout(PUBLIC_DATA.timer);
			}
		} else {
			if (options.delay == 'true') {
				PUBLIC_DATA.timer = setTimeout(function() {
					pop_obj.fadeOut();
				}, 300);
			} else {
				pop_obj.fadeOut();
			}
		}
	},
	h: function(obj) {
		$(obj).siblings('label').css('color', '#ccc');
		$(obj).bind('input propertychange', function() {
			if ($(obj).val().length > 0) {
				$(obj).siblings('label').hide();
			} else {
				$(obj).siblings('label').show();
			}
		}).addClass('hover');
	},
	o: function(obj) {
		$(obj).siblings('label').css('color', '#999').end().removeClass('hover');
	},
	swloverlay: function() {
		if ($('#wloverlay').length > 0) {
			return;
		}
		var o = $('<div class="wloverlay" id="wloverlay"></div>');
		$('body').append(o);
		$('#wloverlay').get(0).oncontextmenu = function() {
			return false;
		};
	},
	hwloverlay: function() {
		$('#wloverlay').fadeOut('slow', function() {
			$(this).remove();
		});
	},
	sConfirm: function(settings) {
		var obj = $('<div id="wlconfirmPop"><ul class="wlconfirmPop-t f-cb"><li class="wcp-l">提示</li><li class="wcp-r"><a id="wlconfirmPop-close">×</a></li></ul><p><span>' + settings.info + '</span></p><ul class="wlconfirmPop-btn f-cb"><li><a class="b-radius" id="wlconfirmPop-cancel">取消</a></li><li><a class="b-radius" id="wlconfirmPop-yes">确定</a></li></ul></div>');
		$('body').append(obj);
		var T = this;
		var d = {
			o: $('#wlconfirmPop'),
			b: $('#wlconfirmPop-yes'),
			j: $('#wlconfirmPop-cancel'),
			k: $('#wlconfirmPop-close'),
			ow: function() {
				return this.o.outerWidth(true);
			},
			w: $(window).width()
		};
		d.o.css('left', (d.w - d.ow()) / 2 + 'px').show();
		this.swloverlay();
		if (settings.yes) {
			d.b.hide();
		} else {
			d.b.bind('click', function() {
				if (settings.success) {
					settings.success();
				}
				T.hConfirm();
				T.hwloverlay();
			});
		}
		if (settings.cancel) {
			d.j.hide();
		} else {
			d.j.bind('click', function() {
				if (settings.fail) {
					settings.fail();
				}
				T.hConfirm();
				T.hwloverlay();
			});
		}
		d.k.bind('click', function() {
			T.hConfirm();
			T.hwloverlay();
		});
	},
	hConfirm: function() {
		$('body > #wlconfirmPop').remove();
	},
	sDialog: function(options) {
		var html = $('<div class="dialog-pop"><div class="dialog-con"><p>后台小弟奔走中，请稍后 </p></div><span class="triangle"></span></div>');
		$('body').append(html);
		var d = {
			obj: $('.dialog-pop'),
			offset: function() {
				return $(options.obj).offset();
			},
			objw: function() {
				return this.obj.outerWidth(true);
			},
			objh: function() {
				return this.obj.outerHeight(true);
			}
		};
		if (options.width) {
			d.obj.css('width', options.width + 'px');
		}
		if (options.left) {
			d.obj.css({
				'left': (d.offset().left - d.objw() + 60 + options.left) + 'px',
				'top': (d.offset().top - d.objh() - 12) + 'px'
			}).show();
		} else {
			d.obj.css({
				'left': (d.offset().left - d.objw() + 60) + 'px',
				'top': (d.offset().top - d.objh() - 10) + 'px'
			}).show();
		}
	},
	hDialog: function() {
		$('body > .dialog-pop').remove();
	},
	cashWrap: function(o) {
		$(o).children('dd').toggle();
	},
	cashDefault: function(o) {
		var obj = $(o),
			t = this,
			v = obj.next('a').attr('id');
		$.post('index.php?app=paycenter&act=ajaxSetBankCardDefault', {
			'id': v
		}, function(data) {
			if (data == "done") {
				obj.closest('.choosebank').find('div.f-fl').removeClass('active');
				obj.closest('dl').siblings('div.f-fl').addClass('active').children('input[name="sendType"]').attr('checked', true);
				t.sConfirm({
					'info': '设置成功'
				});
			} else if (data == "had") {
				t.sConfirm({
					'info': '此银行卡已经是默认，请勿重复设置'
				});
			} else {
				t.sConfirm({
					'info': '设置失败'
				});
			}
		});
	},
	cashDel: function(o) {
		var obj = $(o),
			t = this,
			v = obj.attr('id');
		$.post('index.php?app=paycenter&act=ajaxDelBankCard', {
			'id': v
		}, function(data) {
			if (data == "done") {
				t.sConfirm({
					'info': '确定删除吗？',
					'success': function() {
						obj.closest('li').remove();
					}
				});
			}
		});
	},
	countDown: function(options) {
		var settings = {
			obj: $(options.wrap),
			s: options.second,
			timer: null
		};
		settings.obj.html(settings.s);
		settings.timer = setInterval(function() {
			if (settings.s > 1) {
				settings.s--;
				settings.obj.html(settings.s);
			} else {
				clearInterval(settings.timer);
				window.location.href = options.href;
			}
		}, 1000);
	},
	wlTimer: function(options) {
		var intTimer = null;
		intTimer = window.setInterval(function() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0;
			if (options.intDiff > 0) {
				day = Math.floor(options.intDiff / (60 * 60 * 24));
				hour = Math.floor(options.intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(options.intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(options.intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			} else {
				window.clearInterval(intTimer);
				if (options.end) {
					options.end();
				}
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			if (options.daySelector) {
				$(options.daySelector).html(day + "天");
			}
			if (options.hourSelector) {
				if (!options.time_format) {
					$(options.hourSelector).html(hour + '时');
				} else {
					$(options.hourSelector).html(hour + ':');
				}
			}
			if (options.minuteSelector) {
				if (!options.time_format) {
					$(options.minuteSelector).html(minute + '分');
				} else {
					$(options.minuteSelector).html(minute + ':');
				}
			}
			if (!options.time_format) {
				$(options.secondSelector).html(second + '秒');
			} else {
				$(options.secondSelector).html(second);
			}
			options.intDiff--;
		}, 1000);
	},
	zInt: function(o) {
		var v = $(o).val();
		var freg = /^[1-9]\d*$/;
		if (!freg.test(v)) {
			$(o).val('');
		}
	},
	zNum: function(o) {
		var v = $(o).val();
		var freg = /^[1-9]+\d*$|^[1-9]+\d*\.\d{1,2}$/;
		if (!freg.test(v)) {
			$(o).val('');
		}
	},
	zWeight: function(o) {
		var v = $(o).val();
		var freg = /^[1-9]+\d*$|^[1-9]+\d*\.\d{1,3}$|^\d\.\d{1,3}$/;
		if (!freg.test(v)) {
			$(o).val('');
		}
	},
	drag: function(option) {
		var objectd = new Object();
		var odiv = document.getElementById(option.a) ? document.getElementById(option.a) : objectd;
		var oul = document.getElementById(option.b);
		var width = option.c;
		var disX = 0;
		var disY = 0;
		odiv.onmousedown = function(ev) {
			var oEvent = ev || event;
			disX = oEvent.clientX - odiv.offsetLeft;
			disY = oEvent.clientY - odiv.offsetTop;
			if (odiv.setCapture) {
				odiv.onmousemove = move;
				odiv.setCapture();
				odiv.onmouseup = up;
			} else {
				document.onmousemove = move;
				document.onmouseup = up;
			}

			function move(ev) {
				var bEvent = ev || event;
				var x = bEvent.clientX - disX;
				var y = bEvent.clientY - disY;

				if (x < 0) {
					x = 0;
				} else if (x > 1152 - odiv.offsetWidth) {
					x = 1152 - odiv.offsetWidth;
				}
				y = 0;
				odiv.style.left = x + 'px';
				odiv.style.top = y + 'px';
				if (width > 1152) {
					oul.style.left = -(width - 1152) / 707 * x + 'px';
				} else {
					oul.style.left = 0;
				}
				oul.style.top = y + 'px';
			}

			function up() {
				if (this.releaseCapture) {
					this.releaseCapture();
				}
				this.onmousemove = null;
				this.onmouseup = null;
			}
			return false;
		};
	},
	fold: function(o, name) {
		var obj = $(o);
		var h = obj.parent().siblings(name).height();
		try {
			if (h == 20) {
				obj.parent().siblings(name).css('height', 'auto');
			} else {
				obj.parent().siblings(name).css('height', '20px');
			}
		} catch (e) {
			window.alert('error');
		}
	},
	showpop: function(id) {
		wl.swloverlay();
		$('#' + id).show();
	},
	accSub: function(num1, num2) { //浮点数运算bug--减法修复
		var r1, r2, m;
		try {
			r1 = num1.toString().split('.')[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = num2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		n = (r1 >= r2) ? r1 : r2;
		return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
	},
	number_format: function(num, ext) { //格式化数字
		if (ext < 0) {
			return num;
		}
		num = Number(num);
		if (isNaN(num)) {
			num = 0;
		}
		var _str = num.toString();
		var _arr = _str.split('.');
		var _int = _arr[0];
		var _flt = _arr[1];
		if (_str.indexOf('.') == -1) {
			/* 找不到小数点，则添加 */
			if (ext == 0) {
				return _str;
			}
			var _tmp = '';
			for (var i = 0; i < ext; i++) {
				_tmp += '0';
			}
			_str = _str + '.' + _tmp;
		} else {
			if (_flt.length == ext) {
				return _str;
			}
			/* 找得到小数点，则截取 */
			if (_flt.length > ext) {
				_str = _str.substr(0, _str.length - (_flt.length - ext));
				if (ext == 0) {
					_str = _int;
				}
			} else {
				for (var i = 0; i < ext - _flt.length; i++) {
					_str += '0';
				}
			}
		}
		return _str;
	},
	price_format: function(price, ext) { //格式化金额
		if (typeof(PRICE_FORMAT) == 'undefined') {
			PRICE_FORMAT = '&yen;%s';
		}
		price = number_format(price, ext);

		return PRICE_FORMAT.replace('%s', price);
	},
	Base64: function() {
		// private property  
		_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		// public method for encoding  
		this.encode = function(input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = _utf8_encode(input);
				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output = output +
						_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
						_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
				}
				return output;
			}
			// public method for decoding  
		this.decode = function(input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				output = _utf8_decode(output);
				return output;
			}
			// private method for UTF-8 encoding  
		_utf8_encode = function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}

				}
				return utftext;
			}
			// private method for UTF-8 decoding  
		_utf8_decode = function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	},
	addBookmark: function(title, url) { //浏览器收藏
		if (!title) title = window.title;
		if (!url) url = document.location.href;
		try {
			window.external.addFavorite(url, title);
		} catch (e) {
			try {
				window.sidebar.addPanel(title, url, "");
			} catch (e) {
				alert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	},
	showLogin: function() {
		var lgpopwrap = $('#lgpopwrap');
		var left = ($(window).width() - lgpopwrap.outerWidth()) / 2;
		var top = ($(window).height() - lgpopwrap.outerHeight()) / 2 - 50;
		wl.swloverlay();
		lgpopwrap.css({
			'left': left,
			'top': top
		}).show();
	},
	hiddenLogin: function() {
		var lgpopwrap = $('#lgpopwrap');
		lgpopwrap.hide();
		wl.hwloverlay();
	},
	showMod: function(selector) {
		var lgpopwrap = $(selector);
		var left = ($(window).width() - lgpopwrap.outerWidth()) / 2;
		var top = ($(window).height() - lgpopwrap.outerHeight()) / 2 - 50;
		wl.swloverlay();
		lgpopwrap.css({
			'left': left,
			'top': top
		}).show();
	},
	hiddenMod: function(selector) {
		var lgpopwrap = $(selector);
		lgpopwrap.hide();
		wl.hwloverlay();
	}


};
/*play effect*/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
	def: 'easeOutQuad',
	swing: function(x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function(x, t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad: function(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInCubic: function(x, t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic: function(x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	easeInQuart: function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart: function(x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	easeInQuint: function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint: function(x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeInSine: function(x, t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	easeOutSine: function(x, t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	easeInOutSine: function(x, t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	easeInExpo: function(x, t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo: function(x, t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutExpo: function(x, t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function(x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc: function(x, t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	easeInOutCirc: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeInElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOutElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	easeInOutElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	easeInBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	easeInBounce: function(x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
	},
	easeOutBounce: function(x, t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	easeInOutBounce: function(x, t, b, c, d) {
		if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
});

/*init*/
$(function() {
	var search_type = {
		a: $('#search_type'),
		i: $('#searchtype'),
		b: $('#search_type > dt >a'),
		m: '',
		p: ''
	};
	/*顶部右边栏*/
	$('#rightside > li').hover(function() {
		if ($(this).hasClass('sl')) {
			if($(this).hasClass('mywl')){
				var width = 0,wl_hd = $('.mywl .wl-hd');
				if(wl_hd.children('dl').length<1){
					$.get(USER_SITE_URL+'/index.php?app=member&act=Ajax_header_info&jsoncallback=?',function(JD){
						if(JD.done){
							wl_hd.html(JD.retval.info);
							$.each(wl_hd.children('dl'),function(i){
								width+=$(this).outerWidth(true);
							});
							wl_hd.width(width+14);
						}
					},'jsonp');
				}
			}
			$(this).addClass('active');
		}
	}, function() {
		if ($(this).hasClass('sl')) {
			$(this).removeClass('active');
		}
	});
	/*购物车*/
	$('#shopcar > a').bind('mouseenter', function() {
		var wl_hd = $(this).next('div.wl-hd'),
			str = '',
			dllength = 0;
		var self = $(this);
		dllength = wl_hd.children('dl').length;
		if (dllength === 0) {
			$.ajax({
				type: "get",
				url: CART_SITE_URL + "/index.php?app=cart&act=Ajax_update_cart&jsoncallback=?",
				dataType: "jsonp",
				success: function(data) {
					if (data.done) {
						var i, len, str = '';
						var cartlist = data.retval.cart;
						for (i = 0, len = cartlist.length; i < len; i++) {
							str += '<div class="setup-floor f-cb"><div class="img f-fl"><a href="' + cartlist[i].goods_url + '" title="' + cartlist[i].goods_name + '" target="_blank"><img src="' + cartlist[i].goods_image + '" alt="" width="50" height="50"></a></div><div class="title f-fl"><p><a href="' + cartlist[i].goods_url + '" title="' + cartlist[i].goods_name + '" target="_blank" class="linkbtn">' + cartlist[i].goods_name + ' ' + cartlist[i].specification + '</a></p></div><div class="price f-fl"><i>¥' + cartlist[i].price + '</i> × ' + cartlist[i].quantity + '</div></div>';
						}
						var dl = '<dl class="settle-up"><dt><h5>最新加入的商品</h5></dt><dd class="setup-content">' + str + '</dd><dd class="setup-pay"><div>共<i> ' + data.retval.total_quantity + ' </i>件商品　共计<i class="big"> ¥' + data.retval.total_price + '</i></div> <div><a href="'+ CART_SITE_URL+'/index.php?app=cart" class="subbtnhs">去购物车结算</a></div></dd></dl>';
						wl_hd.empty().append(dl);
						self.html('购物车(' + data.retval.total_quantity + ')');
					} else {
						wl_hd.empty().append('<div class="empty-car">您的购物车还没有货品，赶紧选购吧！</div>');
						self.html('购物车(0)');
					}
				}
			});
		}
	});
	/*搜索框*/
	search_type.a.hover(function() {
		$(this).children('dd').show();
	}, function() {
		$(this).children('dd').hide();
	}).bind('click', function(event) {
		var cur = $(event.target);
		if (cur.is('a')) {
			var ddattr = cur.attr('searchtype');
			var ddval = cur.html();
			search_type.m = search_type.b.attr('searchtype');
			search_type.p = search_type.b.html();
			search_type.b.attr('searchtype', ddattr);
			search_type.b.html(ddval);
			cur.attr('searchtype', search_type.m);
			cur.html(search_type.p);
			search_type.i.val(ddattr);
		}
	});

	/*全部商品*/
	var $allgoods = {
		'a': $('#allgoods'),
		'b': $('#allgoods_list > .allgoods-js'),
		'c': $('#allgoods_list')
	};
	$allgoods.a.mouseover(function() {
		$allgoods.c.show();
	}).mouseout(function() {
		$allgoods.c.hide();
	});
	$allgoods.b.hover(function() {
		$(this).addClass('hover');
		$.each($(this).children('.cate-right').find('.J-loadimg').find('img'),function(){
		    	var loadsrc=$(this).attr('loadsrc');
		    	if(!loadsrc){
		    		return false;
		    	}
		    	$(this).attr('src',loadsrc).removeAttr('loadsrc');
	    	});
	}, function() {
		$(this).removeClass('hover');
	});

	/*右边栏*/
	if ($('.sidebar').css('position') === 'fixed') {
		/*右边栏--在线客服，二维码*/
		$('.sidebar').fadeIn('slow', function() {
			$('.J_btn').hover(function() {
				$(this).children('.J_wrap').stop().animate({
					'right': '38',
					'opacity': '1'
				}, 'fast').show();
			}, function() {
				$(this).children('.J_wrap').stop().animate({
					'right': '50',
					'opacity': '0'
				}, 'fast', function() {
					$(this).hide();
				});
			});
			/*右边栏--购物车*/
			$('#J_cart_btn').bind('click', function() {
				$.ajax({
					type: "get",
					url: CART_SITE_URL + "/index.php?app=cart&act=Ajax_update_cart&right_side=1&jsoncallback=?",
					dataType: "jsonp",
					success: function(data) {
						if (data.done) {
							var i, len, html_a = '',
								html_b = '';
							var cartlist = data.retval.cart;
							for (i = 0, len = cartlist.length; i < len; i++) {
								html_a += '<ul class="f-cb"><li class="floor-li-a"><a href="' + cartlist[i].goods_url + '" title="' + cartlist[i].goods_name + '" target="_blank" rel="nofollow"><img src="' + cartlist[i].goods_image + '" alt="" width="80" height="80" /></a></li><li class="floor-li-b"><a href="' + cartlist[i].goods_url + '" title="' + cartlist[i].goods_name + '" target="_blank" rel="nofollow" class="linkbtn">' + cartlist[i].goods_name + '</a><p class="descri">' + cartlist[i].specification + '</p><div class="price"><i>￥' + cartlist[i].price + '</i>X ' + cartlist[i].quantity + '</div></li></ul>';
							}
							html_b = '<li class="sw-f-l">共<i> ' + data.retval.total_quantity + ' </i>件商品</li><li class="sw-f-r"><i>￥' + data.retval.total_price + '</i></li>';
							$('#J_sw_empty').hide();
							$('#J_sw_fw').html(html_a);
							$('#J_sw_ptf').html(html_b);
							$('#J_sw_platform').show();
							$('em.car-num').html(data.retval.total_quantity);
						} else {
							$('#J_sw_empty').show();
							$('#J_sw_platform').hide();
						}
						/*右边栏--购物车产品遍历高度*/
						var $sw_fw_height = $(window).height() - 144; //可视高度
						var $fw_self_height = $('#J_sw_fw').height(); //实际高度
						var $sw_dd_height = $(window).height() - 39; //dd的高度
						if ($fw_self_height > $sw_fw_height) {
							$('#J_sw_fw').height($sw_fw_height);
							$('#sw-platform').height(80);
						} else {
							$('#J_sw_dd').height($sw_dd_height);
						}
						$('#J_sidebar_wrap').stop().animate({
							'right': '36',
							'opacity': '1'
						}, 'fast').show();
					}
				});
			});
			$('#J_sw_close').bind('click', function() {
				$('#J_sidebar_wrap').stop().animate({
					'right': '-290',
					'opacity': '0'
				}, 'fast', function() {
					$(this).hide();
				});
			});
			/*右边栏--通用*/
			$('#J_sidebar_nav .nav-nor').hover(function() {
				$(this).children('span').stop(false, false).animate({
					'left': '-100',
					'opacity': '1'
				}, 400).show();
			}, function() {
				$(this).children('span').stop(false, false).animate({
					'left': '-130',
					'opacity': '0'
				}, 'fast', function() {
					$(this).hide();
				});
			}).bind('click', function() {
				var self_a = $(this).children('.nor-a');
				var uri_a = self_a.attr('uri');
				if (self_a.attr('href') == undefined) {
					$.ajax({
						type: "get",
						url: USER_SITE_URL + "/index.php?app=member&act=Ajax_islogin&jsoncallback=?",
						dataType: "jsonp",
						success: function(data) {
							if (data.done) {
								window.location.href = uri_a;
							} else {
								if ($('#lgpopwrap').length > 0) {
									wl.showLogin();
								} else {
									window.location.href = USER_SITE_URL + '/index.php?app=member&act=login&ret_url=';
								}
							}
						}
					});
				}
			});
			/*右边栏--返回顶部*/
			$('#J_back_top').bind('click', function() {
				$('html,body').stop().animate({
					scrollTop: '0'
				}, 500);
			});
		});
	}
	//end

});