YUI.add("gallery-node-optimizations",function(f){var e=/^([a-z]*)\.([-_a-z0-9]+)$/i;var g=/^\.([-_a-z0-9]+)$/i;var a=/^[a-z]+$/i;f.Node.class_re_prefix="(?:^|\\s)(?:";f.Node.class_re_suffix=")(?:\\s|$)";var b=f.Node.prototype.ancestor;f.Node.prototype.ancestor=function(i,j){if(f.Lang.isString(i)){var h=g.exec(i);if(h&&h.length){return this.getAncestorByClassName(h[1],j);}if(a.test(i)){return this.getAncestorByTagName(i,j);}}return b.apply(this,arguments);};f.Node.prototype.getAncestorByClassName=function(i,h){var j=this._node;if(!h){j=j.parentNode;}while(j&&!f.DOM.hasClass(j,i)){j=j.parentNode;if(!j||!j.tagName){return null;}}return f.one(j);};f.Node.prototype.getAncestorByTagName=function(j,h){var i=this._node;if(!h){i=i.parentNode;}j=j.toLowerCase();while(i&&i.tagName.toLowerCase()!=j){i=i.parentNode;if(!i||!i.tagName){return null;}}return f.one(i);};var c=f.Node.prototype.one;f.Node.prototype.one=function(i){if(f.Lang.isString(i)){if(i=="*"){return f.one(f.Node.getDOMNode(this).children[0]);}var h=e.exec(i);if(h&&h.length){return this.getFirstElementByClassName(h[2],h[1]);}if(a.test(i)){return this.getElementsByTagName(i).item(0);}}return c.apply(this,arguments);};var d=f.Node.prototype.all;f.Node.prototype.all=function(i){if(f.Lang.isString(i)){var h=e.exec(i);if(h&&h.length){return this.getElementsByClassName(h[2],h[1]);}if(a.test(i)){return this.getElementsByTagName(i);}}return d.apply(this,arguments);};f.Node.prototype.getElementsByClassName=function(k,m){var n=f.Node.getDOMNode(this).getElementsByTagName(m||"*");var j=new f.NodeList();for(var h=0;h<n.length;h++){var l=n[h];if(f.DOM.hasClass(l,k)){j.push(l);}}return j;};f.Node.prototype.getFirstElementByClassName=function(l,h){if(!h||h=="*"||h=="div"){var r=[f.Node.getDOMNode(this)],p=[];while(r.length){for(var n=0;n<r.length;n++){var q=r[n];for(var m=0;m<q.children.length;m++){var o=q.children[m];if(f.DOM.hasClass(o,l)){return f.one(o);}p.push(o);}}r=p;p=[];}}else{var k=f.Node.getDOMNode(this).getElementsByTagName(h||"*");for(var n=0;n<k.length;n++){var o=k[n];if(f.DOM.hasClass(o,l)){return f.one(o);}}}return null;};},"gallery-2012.03.23-18-00",{requires:["node-base"]});