/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("sortable-scroll",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.extend(a,b.Base,{initializer:function(){var c=this.get("host");c.plug(b.Plugin.DDNodeScroll,{node:c.get("container")});c.delegate.on("drop:over",function(d){if(this.dd.nodescroll&&d.drag.nodescroll){d.drag.nodescroll.set("parentScroll",b.one(this.get("container")));}});}},{ATTRS:{host:{value:""}},NAME:"SortScroll",NS:"scroll"});b.namespace("Y.Plugin");b.Plugin.SortableScroll=a;},"3.5.0",{requires:["sortable","dd-scroll"]});