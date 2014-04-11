(function () {
	DomUtil = {
		hasClass : function (ele, cls) {
			return ele.className && ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		},
		toggleClass : function (ele, cls) {
			if (!this.removeClass(ele, cls)) {
				this.addClass(ele, cls);
			}
		},
		addClass : function (ele, cls) {
			if (!this.hasClass(ele,cls)) {
				ele.className += " "+cls;
				return true;
			}
			return false;
		},
		removeClass : function (ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
				ele.className = ele.className.replace(reg,' ');
				return true;
			}
			return false;
		},
		toggleDisplay : function (el) {
			if (this.isHidden(el)) {
				this.unhide(el);
			}
			else {
				this.hide(el);
			}
		},

		hide : function (el) {
			el.style.display = 'none';
		},

		unhide : function (el) {
			el.style.display = '';
		},

		isHidden : function (el) {
			return el.style.display === 'none';
		},
        
        addListener : function (el, eventName, eventHandler) {
            if (el.addEventListener) {
                el.addEventListener(eventName, eventHandler, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + eventName, eventHandler);
            }
        },
        
		getChildByTagName : function(el, tagName) {
            var i,
                childNodes = el.childNodes,
                l = childNodes.length,
                node;
			for (i=0; i<l; i++) {
				node = childNodes[i];
				if (node.tagName === tagName) {
					return node;
				}
			}
		}
	};
}());
