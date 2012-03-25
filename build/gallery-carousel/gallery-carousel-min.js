YUI.add("gallery-carousel",function(a){function m(){m.superclass.constructor.apply(this,arguments);}var s=a.ClassNameManager.getClassName,f=a.Lang,r=a.Node,i=false,p=true,j="button",e="button-disabled",o="content",d="item",g="nav",l="nav-item",b="afterScroll",h="beforeScroll",q="itemAdded",c="itemRemoved",k="itemSelected",n="navStateChanged";m.NAME="carousel";m.ATTRS={autoPlayInterval:{validator:f.isNumber,value:0},carouselItemEl:{validator:f.isString,value:"li"},hidePagination:{validator:f.isBoolean,value:false},isCircular:{validator:f.isBoolean,value:false},isVertical:{setter:"_setVertical",validator:f.isBoolean,value:false},useMenuForNav:{validator:f.isBoolean,value:false},numItems:{value:0},numVisible:{validator:"_validateNumVisible",value:3},revealAmount:{validator:"_validateRevealAmount",value:0},scrollIncrement:{validator:f.isNumber,value:1},selectedItem:{validator:f.isNumber,value:0},strings:{value:{GOTO_PAGE:"Go to page {page}",NEXT_PAGE:"Next Page",PREV_PAGE:"Previous Page"}}};a.Carousel=a.extend(m,a.Widget,{addItem:function(x,y){var t=this,w,u,v;if(f.isString(x)){v=r.create(a.substitute(t.ITEM_TEMPLATE,{content:x}));}else{if(f.isObject(x)&&x.constructor.NAME==="node"){v=x;}else{return false;}}if(!t._vtbl.item.content){t._vtbl.item.content=v;}if(f.isUndefined(y)){t._vtbl.items.push(v);u=t._vtbl.items.length-1;}else{if(!t._vtbl.items[y]){t._vtbl.items[y]=undefined;}t._vtbl.items.splice(y,0,v);u=y;}w=this.get("numItems");t.set("numItems",w+1);t.fire(q,{item:v,pos:u});return true;},addItems:function(u){var t=this,y=false,w,v,x;if(!f.isArray(u)){return false;}y=true;for(v=0,x=u.length;v<x;++v){w=u[v].content;if(!t.addItem(w,u[v].pos)){y=false;}}return y;},clearItems:function(){var t=this,u=t._vtbl.items;while(u.length>0){t.removeItem(0);}},getElementForItem:function(t){return this.getItem(t);},getElementForItems:function(t){return this.getItems(t);},getFirstVisible:function(){var t=this,v=t.get("numVisible"),u=t.get("selectedItem");return t._getFirstVisible(u,v);},getFirstVisibleOnPage:function(t){return(t-1)*this.get("numVisible");},getItem:function(u){var t=this;if(u<0||u>t._vtbl.items.length-1){return null;}return f.isUndefined(t._vtbl.items[u])?null:t._vtbl.items[u];},getItems:function(x){var u=this,t=[],v,w;if(f.isUndefined(x)){for(v=0,w=u._vtbl.items.length;v<w;++v){t[v]=u.getItem(v);}}else{for(v=0,w=x.length;v<w;++v){t[x[v]]=u.getItem(x[v]);}}return t;},getPageForItem:function(t){return Math.floor(t/this.get("numVisible"));},getVisibleItems:function(){var t=this,v=t.get("numVisible"),y=t.getFirstVisible(),x=[],u,w;for(u=y,w=y+v;u<w;++u){x.push(t._vtbl.items[u]);}return x;},removeItem:function(u){var t=this,w,v;if(u<0||u>t._vtbl.items.length-1){return false;}w=t._vtbl.items.splice(u,1);w=f.isUndefined(w[0])?false:w[0];if(!w){return false;}v=t.get("numItems");--v;t.set("numItems",v);this.fire(c,{item:w,pos:u});return true;},scrollBackward:function(){var t=this;t.scrollTo(t.getFirstVisible()-t.get("scrollIncrement"));},scrollForward:function(){var t=this;t.scrollTo(t.getFirstVisible()+t.get("scrollIncrement"));},scrollPageBackward:function(){var t=this;t.scrollTo(t.getFirstVisible()-t.get("numVisible"));},scrollPageForward:function(){var t=this;t.scrollTo(t.getFirstVisible()+t.get("numVisible"));},scrollTo:function(x){var B=this,u=B.get("isCircular"),z=B.get("numItems"),A=B.get("numVisible"),y,t,w,v;x=B._getCorrectedIndex(x);if(isNaN(x)){return;}v=B._getOffsetForIndex(x);t=B.get("contentBox");y=B.get("isVertical")?"top":"left";w=B.getFirstVisible();B.fire(h,{first:w,last:w+A});t.setStyle(y,v);w=B.getFirstVisible();B.fire(b,{first:w,last:w+A});B.set("selectedItem",x);},scrollToPage:function(u){var t=this;t.scrollTo(u*t.get("numVisible"));},bindUI:function(){var t=this,u=t.get("boundingBox");t.after("selectedItemChange",t._afterSelectedItemChange);t.on(q,t._addItemToDom);t.on(c,t._removeItemFromDom);if(!t.get("hidePagination")){u.delegate("click",a.bind(t._onNavItemClick,t),"."+s(m.NAME,l)+" > a");u.delegate("click",a.bind(t._onNavButtonClick,t),"."+s(m.NAME,j));}u.delegate("click",a.bind(t._onItemClick,t),"."+s(m.NAME,d));},initializer:function(){var t=this;t._vtbl={items:[],item:{content:null,hsz:0,vsz:0}};t.get("boundingBox").addClass(s(m.NAME,"loading"));t._parseItems();},renderUI:function(){var t=this;if(t.get("numItems")<1){t.get("boundingBox").addClass(s(m.NAME,"hidden"));return;}if(t._vtbl.item.hsz===0){t._vtbl.item.hsz=t._getNodeSize(t._vtbl.item.content,"width");}if(t._vtbl.item.vsz===0){t._vtbl.item.vsz=t._getNodeSize(t._vtbl.item.content,"height");}t._renderItems();if(!t.get("hidePagination")){t._renderNavigation();}t._renderContainer();},syncUI:function(){var t=this,u=t.get("selectedItem");t._uiSetSelectedItem(u,true);if(!t.get("hidePagination")){t._updateNavigation(u);}},_addItemToDom:function(u){var v=this,t=v.get("contentBox"),y,x,w,z;y=u.item;z=u.pos+1;if(y&&!t.contains(y)){x=v._vtbl.items[z];if(x){t.insertBefore(y,x);}else{t.append(y);}if(v.get("selectedItem")==z){w=v.get("numItems");++z;z=z>w-1?w-1:z;v.set("selectedItem",z);}v._redrawUi();}},_afterSelectedItemChange:function(u){var t=this;t._uiSetSelectedItem(u.prevVal,false);t._uiSetSelectedItem(u.newVal,true);t.fire(k,{pos:u.newVal});if(!t.get("hidePagination")){t._updateNavigation(u.newVal);}},_getCorrectedIndex:function(x){var u=this,t=u.get("isCircular"),y=u.get("numItems"),z=u.get("numVisible"),w=y-1,v=0;if(t){v=u.getPageForItem(w)*z;}if(x<0){if(t){x=v;}else{x=0;}}else{if(x>w){if(t){x=0;}else{x=v;}}}return x;},_getFirstVisible:function(u,t){return u-(u%t);},_getOffsetForIndex:function(u){var t=this,v=t._vtbl.item,w;w=t.get("isVertical")?v.vsz:v.hsz;return -w*u;},_getNodeSize:function(t,v){var u=0;if(t&&t.constructor.NAME==="node"){if(v==="height"){u=t.get("offsetHeight");if(u===0){u=parseInt(t.getStyle("marginTop"),10)+parseInt(t.getStyle("paddingTop"),10)+parseInt(t.getStyle("borderTopWidth"),10)+parseInt(t.getStyle("height"),10)+parseInt(t.getStyle("borderBottomWidth"),10)+parseInt(t.getStyle("paddingBottom"),10)+parseInt(t.getStyle("marginBottom"),10);
}}else{if(v=="width"){u=t.get("offsetWidth");if(u===0){u=parseInt(t.getStyle("marginLeft"),10)+parseInt(t.getStyle("paddingLeft"),10)+parseInt(t.getStyle("borderLeftWidth"),10)+parseInt(t.getStyle("width"),10)+parseInt(t.getStyle("borderRightWidth"),10)+parseInt(t.getStyle("paddingRight"),10)+parseInt(t.getStyle("marginRight"),10);}}}}return u;},_onItemClick:function(A){var C=this,z=C.get("boundingBox"),t,u,x,v,B,y,w;x=A&&A.target?A.target:null;if(!x){return;}A.preventDefault();t=z.one("."+s(m.NAME,o));u=x;B=s(m.NAME,d);while(u&&u!=t){if(u.hasClass(B)){break;}u=u.get("parentNode");}if(u){y=C._vtbl.items;for(v=0,w=y.length;v<w;++v){if(u==y[v]){C.set("selectedItem",v);break;}}}},_onNavButtonClick:function(u){var t=this,v;u.preventDefault();v=u&&u.target?u.target:null;if(!v){return;}if(!v.test(".yui3-carousel-button")){v=v.ancestor();}if(v.hasClass("yui3-carousel-first-button")){if(i){t.scrollPageBackward();}}else{if(v.hasClass("yui3-carousel-next-button")){if(p){t.scrollPageForward();}}}},_onNavItemClick:function(v){var t=this,u,w;w=v&&v.target?v.target:null;if(!w){return;}v.preventDefault();u=w.get("href");if(u){u=parseInt(u.replace(/.*#(.*)$/,"$1"),10);if(f.isNumber(u)){t.scrollToPage(u-1);}}},_parseItems:function(){var v=this,t,u;t=v.get("contentBox");u=t.all(v.get("carouselItemEl"));u.each(function(x,w){if(!v.addItem(x)){}},v);},_redrawUi:function(){var u=this,t="left";u._renderItems();u._updateNavigation();if(u.get("isVertical")){u._renderContainer();t="top";}u.scrollTo(u.get("selectedItem"));},_removeItemFromDom:function(u){var v=this,t=v.get("contentBox"),w,x;w=u.item;x=u.pos;if(w&&t.contains(w)){w.remove(true);if(v.get("selectedItem")==x){--x;x=x<0?0:x;v.set("selectedItem",x);}v._redrawUi();}},_renderContainer:function(){var t=this,A=t.get("boundingBox"),w=t.get("hidePagination"),x=t.get("numVisible"),u=t.get("revealAmount"),v=0,z,y;if(!w){z=A.one("."+s(m.NAME,g));v=t._getNodeSize(z,"height");}if(this.get("isVertical")){y=t._vtbl.item.vsz*x;if(u>0){y+=(y*u/100);}t._uiSetHeight(y+v);t._uiSetWidth(t._vtbl.item.vsz);t._uiSetWidthCB(t._vtbl.item.vsz);}else{y=t._vtbl.item.hsz*x;if(u>0){y+=(y*u/100);}t._uiSetWidth(y);t._uiSetHeight(t._vtbl.item.hsz+v);t._uiSetHeightCB(t._vtbl.item.hsz);}},_renderItems:function(){var v=this,u=v.get("contentBox"),t,x,z,A,y,w;if(v.get("isVertical")){t="top";w=v._vtbl.item.vsz;}else{t="left";w=v._vtbl.item.hsz;}z=s(m.NAME,d);for(x=0,A=v._vtbl.items.length;x<A;++x){y=v._vtbl.items[x];if(y){if(!y.inDoc()){if(x===0){u.appendChild(y);}else{u.insertBefore(y,v._vtbl.items[x-1]);}}y.setStyle(t,w*x);y.addClass(z);}}},_renderNavigation:function(){var B=this,y=B.get("boundingBox"),w=B.get("contentBox"),z=[],x,u,v,C,A;v=Math.ceil(B.get("numItems")/B.get("numVisible"));if(v<1){B.set("hidePagination",true);return;}C=B.get("strings.GOTO_PAGE");for(x=1;x<=v;++x){A=a.substitute(C,{page:x});z.push(a.substitute(B.DEF_NAV_ITEM_TEMPLATE,{pagenum:x,label:A}));}B._navBtns={prev:a.guid(),next:a.guid()};u=r.create(a.substitute(B.DEF_NAV_TEMPLATE,{nav_items:z.join(""),nav_prev_btn_id:B.prev,nav_prev_btn_text:B.get("strings.PREV_PAGE"),nav_next_btn_id:B.next,nav_next_btn_text:B.get("strings.NEXT_PAGE")}));y.insertBefore(u,w);},_setVertical:function(t,u){this._uiSetVertical(t);},_uiSetHeight:function(u){var t=this;if(u){t.get("boundingBox").setStyle("height",u);}},_uiSetHeightCB:function(u){var t=this;if(u){t.get("contentBox").setStyle("height",u);}},_uiSetNavItem:function(v){var t=this,w,u;if(!v){return;}w=t.get("boundingBox");u=s(m.NAME,"nav-item-selected");w.all("."+s(m.NAME,l)).removeClass(u);v.addClass(u);},_uiSetSelectedItem:function(v,t){var u=this,x=u._vtbl.items[v],w=s(m.NAME,"selected");if(x){if(t){x.addClass(w);}else{x.removeClass(w);}}},_uiSetVertical:function(u){var t=this.get("boundingBox");if(u){t.addClass(s(m.NAME,"vertical"));}else{t.addClass(s(m.NAME,"horizontal"));}},_uiSetWidth:function(u){var t=this;if(u){t.get("boundingBox").setStyle("width",u);}},_uiSetWidthCB:function(u){var t=this;if(u){t.get("contentBox").setStyle("width",u);}},_updateNavigation:function(y){var F=this,C=F.get("boundingBox"),z=F.get("isCircular"),u,D,A,B,x,w,v,G,E;y=y||F.get("selectedItem");F._uiSetSelectedItem(y,true);v=C.all("."+s(m.NAME,l));x=Math.ceil(F.get("numItems")/F.get("numVisible"));v.remove();w=C.one(".yui3-carousel-nav > ul");G=F.get("strings.GOTO_PAGE");for(A=1;A<=x;++A){E=a.substitute(G,{page:A});w.append(a.substitute(F.DEF_NAV_ITEM_TEMPLATE,{pagenum:A,label:E}));}v=C.all("."+s(m.NAME,l));D=F.getPageForItem(y);F._uiSetNavItem(v.item(D));B=F.getPageForItem(F.get("numItems")-1);if(B<0){u=C.one("."+s(m.NAME,"first",j));if(u){u.addClass(s(m.NAME,"first",e));i=false;}u=C.one("."+s(m.NAME,"next",j));if(u){u.addClass(s(m.NAME,e));p=false;}}else{if(D===0&&D!=B){u=C.one("."+s(m.NAME,"next",j));if(u){u.removeClass(s(m.NAME,e));p=true;}if(!z){u=C.one("."+s(m.NAME,"first",j));if(u){u.addClass(s(m.NAME,"first",e));i=false;}}}else{if(D!==0&&D==B){u=C.one("."+s(m.NAME,"first",j));if(u){u.removeClass(s(m.NAME,"first",e));i=true;}if(!z){u=C.one("."+s(m.NAME,"next",j));if(u){u.addClass(s(m.NAME,e));p=false;}}}else{if(B>0){u=C.one("."+s(m.NAME,"first",j));if(u){u.removeClass(s(m.NAME,"first",e));i=true;}u=C.one("."+s(m.NAME,"next",j));if(u){u.removeClass(s(m.NAME,e));p=true;}}}}}},_validateNumVisible:function(t,u){return t>0;},_validateRevealAmount:function(t,u){return t>=0&&t<=100;},ITEM_TEMPLATE:'<li class="yui3-carousel-item">{content}</li>',DEF_NAV_TEMPLATE:'<div class="yui3-carousel-nav">'+"<ul>{nav_items}</ul>"+'<span class="yui3-carousel-button yui3-carousel-first-button">'+'<button type="button">'+"{nav_prev_btn_text}</button>"+"</span>"+'<span class="yui3-carousel-button yui3-carousel-next-button">'+'<button type="button">'+"{nav_next_btn_text}</button>"+"</span>"+"</div>",DEF_NAV_ITEM_TEMPLATE:'<li class="yui3-carousel-nav-item">'+'<a class="yui3-carousel-pager-item" '+'href="#{pagenum}"><em>{label}</em></a></li>',_navBtns:null,_vtbl:null});},"gallery-2012.03.23-18-00",{skinnable:true,requires:["widget"]});
