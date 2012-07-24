/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("editor-br",function(c){var d=function(){d.superclass.constructor.apply(this,arguments);},a="host",b="li";c.extend(d,c.Base,{_onKeyDown:function(j){if(j.stopped){j.halt();return;}if(j.keyCode==13){var g=this.get(a),i=g.getInstance(),h=new i.EditorSelection(),f="";if(h){if(c.UA.ie){if(!h.anchorNode||(!h.anchorNode.test(b)&&!h.anchorNode.ancestor(b))){var g=this.get(a);g.execCommand("inserthtml",i.EditorSelection.CURSOR);j.halt();}}if(c.UA.webkit){if(!h.anchorNode.test(b)&&!h.anchorNode.ancestor(b)){g.frame._execCommand("insertlinebreak",null);j.halt();}}}}},_afterEditorReady:function(){var e=this.get(a).getInstance();try{e.config.doc.execCommand("insertbronreturn",null,true);}catch(f){}if(c.UA.ie||c.UA.webkit){e.on("keydown",c.bind(this._onKeyDown,this),e.config.doc);}},_onNodeChange:function(h){switch(h.changedType){case"backspace-up":case"backspace-down":case"delete-up":var g=this.get(a).getInstance();var i=h.changedNode;var f=g.config.doc.createTextNode(" ");i.appendChild(f);i.removeChild(f);break;}},initializer:function(){var e=this.get(a);if(e.editorPara){c.error("Can not plug EditorBR and EditorPara at the same time.");return;}e.after("ready",c.bind(this._afterEditorReady,this));if(c.UA.gecko){e.on("nodeChange",c.bind(this._onNodeChange,this));}}},{NAME:"editorBR",NS:"editorBR",ATTRS:{host:{value:false}}});c.namespace("Plugin");c.Plugin.EditorBR=d;},"3.4.0",{skinnable:false,requires:["editor-base"]});