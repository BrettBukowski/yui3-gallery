YUI.add("gallery-async",function(a){(function(i){var g=i.Lang,h={all:"_runAll",queue:"_runQueue"},f=i.Array.unnest,d,b=g.isArray,e=g.isFunction,c;c=i.extend(function(j){c.superclass.constructor.call(this,j);},i.AsyncCommand,{initializer:function(){var j=this,k=h[j.get("mode")];if(k){j._set("fn",function(l){j[k].call(j,l,j.get("run"));});}c.superclass.initializer.apply(this,arguments);},_runAll:function(n,m){var j=m.length,k=0,l=[];i.each(m,function(p,o){p.run().after("complete",function(q){if(q.failed){n.fail(q.error);return;}k+=1;l[o]=q.value;if(k===j){n(l);}});});if(!j){n(l);}},_runQueue:function(m,l,j,k){j=j||0;k=k||[];if(j>=l.length){m(k);return;}l[j].run().after("complete",function(n){if(n.failed){m.fail(n.error);return;}k[j]=n.value;this._runQueue(m,l,j+1,k);},this);}},{ATTRS:{mode:{value:"queue",writeOnce:"initOnly"},run:{setter:function(j){if(!b(j)){j=[j];}i.each(j,function(l,k,m){if(e(l)){m[k]=new i.AsyncCommand({fn:l});}});return j;},value:[],writeOnce:"initOnly"}},NAME:"async",runAll:function(){return d("all",f(arguments));},runQueue:function(){return d("queue",f(arguments));}});d=function(k,j){return new c({mode:k,run:j}).run();};i.Async=c;}(a));},"gallery-2012.01.11-21-03",{requires:["gallery-array-unnest","gallery-async-command"],skinnable:false});