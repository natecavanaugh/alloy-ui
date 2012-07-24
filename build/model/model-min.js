/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("model",function(a){var i=YUI.namespace("Env.Model"),f=a.Lang,j=a.Array,h=a.Object,g="change",d="error",e="load",c="save";function b(){b.superclass.constructor.apply(this,arguments);}a.Model=a.extend(b,a.Base,{idAttribute:"id",_allowAdHocAttrs:true,_isYUIModel:true,initializer:function(k){this.changed={};this.lastChange={};this.lists=[];},destroy:function(l,m){var k=this;if(typeof l==="function"){m=l;l=null;}k.onceAfter("destroy",function(){function n(o){if(!o){j.each(k.lists.concat(),function(p){p.remove(k,l);});}m&&m.apply(null,arguments);}if(l&&(l.remove||l["delete"])){k.sync("delete",l,n);}else{n();}});return b.superclass.destroy.call(k);},generateClientId:function(){i.lastId||(i.lastId=0);return this.constructor.NAME+"_"+(i.lastId+=1);},getAsHTML:function(k){var l=this.get(k);return a.Escape.html(f.isValue(l)?String(l):"");},getAsURL:function(k){var l=this.get(k);return encodeURIComponent(f.isValue(l)?String(l):"");},isModified:function(){return this.isNew()||!h.isEmpty(this.changed);},isNew:function(){return !f.isValue(this.get("id"));},load:function(l,m){var k=this;if(typeof l==="function"){m=l;l={};}l||(l={});k.sync("read",l,function(q,o){var p={options:l,response:o},n;if(q){p.error=q;p.src="load";k.fire(d,p);}else{if(!k._loadEvent){k._loadEvent=k.publish(e,{preventable:false});}n=p.parsed=k.parse(o);k.setAttrs(n,l);k.changed={};k.fire(e,p);}m&&m.apply(null,arguments);});return k;},parse:function(k){if(typeof k==="string"){try{return a.JSON.parse(k);}catch(l){this.fire(d,{error:l,response:k,src:"parse"});return null;}}return k;},save:function(l,m){var k=this;if(typeof l==="function"){m=l;l={};}l||(l={});k._validate(k.toJSON(),function(n){if(n){m&&m.call(null,n);return;}k.sync(k.isNew()?"create":"update",l,function(r,p){var q={options:l,response:p},o;if(r){q.error=r;q.src="save";k.fire(d,q);}else{if(!k._saveEvent){k._saveEvent=k.publish(c,{preventable:false});}if(p){o=q.parsed=k.parse(p);k.setAttrs(o,l);}k.changed={};k.fire(c,q);}m&&m.apply(null,arguments);});});return k;},set:function(m,n,l){var k={};k[m]=n;return this.setAttrs(k,l);},setAttrs:function(k,l){var o=this.idAttribute,r,p,m,n,q;l||(l={});q=l._transaction={};if(o!=="id"){k=a.merge(k);if(h.owns(k,o)){k.id=k[o];}else{if(h.owns(k,"id")){k[o]=k.id;}}}for(m in k){if(h.owns(k,m)){this._setAttr(m,k[m],l);}}if(!h.isEmpty(q)){r=this.changed;n=this.lastChange={};for(m in q){if(h.owns(q,m)){p=q[m];r[m]=p.newVal;n[m]={newVal:p.newVal,prevVal:p.prevVal,src:p.src||null};}}if(!l.silent){if(!this._changeEvent){this._changeEvent=this.publish(g,{preventable:false});}this.fire(g,a.merge(l,{changed:n}));}}return this;},sync:function(){var k=j(arguments,0,true).pop();if(typeof k==="function"){k();}},toJSON:function(){var k=this.getAttrs();delete k.clientId;delete k.destroyed;delete k.initialized;if(this.idAttribute!=="id"){delete k.id;}return k;},undo:function(p,l){var o=this.lastChange,n=this.idAttribute,k={},m;p||(p=h.keys(o));j.each(p,function(q){if(h.owns(o,q)){q=q===n?"id":q;m=true;k[q]=o[q].prevVal;}});return m?this.setAttrs(k,l):this;},validate:function(k,l){l&&l();},addAttr:function(l,k,n){var o=this.idAttribute,m,p;if(o&&l===o){m=this._isLazyAttr("id")||this._getAttrCfg("id");p=k.value===k.defaultValue?null:k.value;if(!f.isValue(p)){p=m.value===m.defaultValue?null:m.value;if(!f.isValue(p)){p=f.isValue(k.defaultValue)?k.defaultValue:m.defaultValue;}}k.value=p;if(m.value!==p){m.value=p;if(this._isLazyAttr("id")){this._state.add("id","lazy",m);}else{this._state.add("id","value",p);}}}return b.superclass.addAttr.apply(this,arguments);},_validate:function(l,n){var k=this;function m(o){if(f.isValue(o)){k.fire(d,{attributes:l,error:o,src:"validate"});n(o);return;}n();}if(k.validate.length===1){m(k.validate(l,m));}else{k.validate(l,m);}},_defAttrChangeFn:function(l){var k=l.attrName;if(!this._setAttrVal(k,l.subAttrName,l.prevVal,l.newVal)){l.stopImmediatePropagation();}else{l.newVal=this.get(k);if(l._transaction){l._transaction[k]=l;}}}},{NAME:"model",ATTRS:{clientId:{valueFn:"generateClientId",readOnly:true},id:{value:null}}});},"3.4.0",{requires:["base-build","escape","json-parse"]});