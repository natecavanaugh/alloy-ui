/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("dom-core",function(e){var n="nodeType",c="ownerDocument",b="documentElement",a="defaultView",g="parentWindow",j="tagName",k="parentNode",i="previousSibling",l="nextSibling",h="contains",d="compareDocumentPosition",m=[],f={byId:function(p,o){return f.allById(p,o)[0]||null;},getId:function(o){var p;if(o.id&&!o.id.tagName&&!o.id.item){p=o.id;}else{if(o.attributes&&o.attributes.id){p=o.attributes.id.value;}}return p;},setId:function(o,p){if(o.setAttribute){o.setAttribute("id",p);}else{o.id=p;}},ancestor:function(p,q,s,r){var o=null;if(s){o=(!q||q(p))?p:null;}return o||f.elementByAxis(p,k,q,null,r);},ancestors:function(q,r,t,s){var p=q,o=[];while((p=f.ancestor(p,r,t,s))){t=false;if(p){o.unshift(p);if(s&&s(p)){return o;}}}return o;},elementByAxis:function(p,s,r,q,o){while(p&&(p=p[s])){if((q||p[j])&&(!r||r(p))){return p;}if(o&&o(p)){return null;}}return null;},contains:function(p,q){var o=false;if(!q||!p||!q[n]||!p[n]){o=false;}else{if(p[h]){if(e.UA.opera||q[n]===1){o=p[h](q);}else{o=f._bruteContains(p,q);}}else{if(p[d]){if(p===q||!!(p[d](q)&16)){o=true;}}}}return o;},inDoc:function(q,r){var p=false,o;if(q&&q.nodeType){(r)||(r=q[c]);o=r[b];if(o&&o.contains&&q.tagName){p=o.contains(q);}else{p=f.contains(o,q);}}return p;},allById:function(t,o){o=o||e.config.doc;var p=[],q=[],r,s;if(o.querySelectorAll){q=o.querySelectorAll('[id="'+t+'"]');}else{if(o.all){p=o.all(t);if(p){if(p.nodeName){if(p.id===t){q.push(p);p=m;}else{p=[p];}}if(p.length){for(r=0;s=p[r++];){if(s.id===t||(s.attributes&&s.attributes.id&&s.attributes.id.value===t)){q.push(s);}}}}}else{q=[f._getDoc(o).getElementById(t)];}}return q;},isWindow:function(o){return !!(o&&o.alert&&o.document);},_removeChildNodes:function(o){while(o.firstChild){o.removeChild(o.firstChild);}},siblings:function(r,q){var o=[],p=r;while((p=p[i])){if(p[j]&&(!q||q(p))){o.unshift(p);}}p=r;while((p=p[l])){if(p[j]&&(!q||q(p))){o.push(p);}}return o;},_bruteContains:function(o,p){while(p){if(o===p){return true;}p=p.parentNode;}return false;},_getRegExp:function(p,o){o=o||"";f._regexCache=f._regexCache||{};if(!f._regexCache[p+o]){f._regexCache[p+o]=new RegExp(p,o);}return f._regexCache[p+o];},_getDoc:function(o){var p=e.config.doc;if(o){p=(o[n]===9)?o:o[c]||o.document||e.config.doc;}return p;},_getWin:function(o){var p=f._getDoc(o);return p[a]||p[g]||e.config.win;},_batch:function(o,w,u,t,s,q){w=(typeof w==="string")?f[w]:w;var x,r=0,p,v;if(w&&o){while((p=o[r++])){x=x=w.call(f,p,u,t,s,q);if(typeof x!=="undefined"){(v)||(v=[]);v.push(x);}}}return(typeof v!=="undefined")?v:o;},generateID:function(o){var p=o.id;if(!p){p=e.stamp(o);o.id=p;}return p;}};e.DOM=f;},"3.4.0",{requires:["oop","features"]});