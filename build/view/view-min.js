/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("view",function(b){function a(){a.superclass.constructor.apply(this,arguments);}b.View=b.extend(a,b.Base,{containerTemplate:"<div/>",events:{},template:"",_allowAdHocAttrs:true,initializer:function(c){c||(c={});c.containerTemplate&&(this.containerTemplate=c.containerTemplate);c.template&&(this.template=c.template);this.events=c.events?b.merge(this.events,c.events):this.events;this.after("containerChange",this._afterContainerChange);},destroy:function(c){if(c&&(c.remove||c["delete"])){this.onceAfter("destroy",function(){this._destroyContainer();});}return a.superclass.destroy.call(this);},destructor:function(){this.detachEvents();delete this._container;},attachEvents:function(g){var d=this.get("container"),i=b.Object.owns,h,e,f,c;this.detachEvents();g||(g=this.events);for(c in g){if(!i(g,c)){continue;}e=g[c];for(f in e){if(!i(e,f)){continue;}h=e[f];if(typeof h==="string"){h=this[h];}this._attachedViewEvents.push(d.delegate(f,h,c,this));}}return this;},create:function(c){return c?b.one(c):b.Node.create(this.containerTemplate);},detachEvents:function(){b.Array.each(this._attachedViewEvents,function(c){c.detach();});this._attachedViewEvents=[];return this;},remove:function(){var c=this.get("container");c&&c.remove();return this;},render:function(){return this;},_destroyContainer:function(){var c=this.get("container");c&&c.remove(true);},_getContainer:function(c){if(!this._container){if(c){this._container=c;this.attachEvents();}else{c=this._container=this.create();this._set("container",c);}}return c;},_afterContainerChange:function(){this.attachEvents(this.events);}},{NAME:"view",ATTRS:{container:{getter:"_getContainer",setter:b.one,writeOnce:true}},_NON_ATTRS_CFG:["containerTemplate","events","template"]});},"3.4.0",{requires:["base-build","node-event-delegate"]});