/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("scrollview-scrollbars",function(a){var m=a.ClassNameManager.getClassName,j,h=a.Transition,k=h.useNative,A="scrollbar",D="scrollview",C="verticalNode",n="horizontalNode",v="childCache",x="top",r="left",g="width",w="height",q="scrollWidth",i="scrollHeight",B="_sbh",u="_sbv",o=h._VENDOR_PREFIX+"TransitionProperty",f="transform",e="translateX(",d="translateY(",z="scaleX(",y="scaleY(",t="scrollX",s="scrollY",l="px",c=")",p=l+c;function b(){b.superclass.constructor.apply(this,arguments);}b.CLASS_NAMES={showing:m(D,A,"showing"),scrollbar:m(D,A),scrollbarV:m(D,A,"vert"),scrollbarH:m(D,A,"horiz"),scrollbarVB:m(D,A,"vert","basic"),scrollbarHB:m(D,A,"horiz","basic"),child:m(D,"child"),first:m(D,"first"),middle:m(D,"middle"),last:m(D,"last")};j=b.CLASS_NAMES;b.NAME="pluginScrollViewScrollbars";b.NS="scrollbars";b.SCROLLBAR_TEMPLATE=["<div>",'<span class="'+j.child+" "+j.first+'"></span>','<span class="'+j.child+" "+j.middle+'"></span>','<span class="'+j.child+" "+j.last+'"></span>',"</div>"].join("");b.ATTRS={verticalNode:{setter:"_setNode",valueFn:"_defaultNode"},horizontalNode:{setter:"_setNode",valueFn:"_defaultNode"}};a.namespace("Plugin").ScrollViewScrollbars=a.extend(b,a.Plugin.Base,{initializer:function(){this._host=this.get("host");this.afterHostEvent("scrollEnd",this._hostScrollEnd);this.afterHostMethod("_uiScrollTo",this._update);this.afterHostMethod("_uiDimensionsChange",this._hostDimensionsChange);},_hostDimensionsChange:function(){var E=this._host;this._renderBar(this.get(C),E._scrollsVertical);this._renderBar(this.get(n),E._scrollsHorizontal);this._update();a.later(500,this,"flash",true);},_hostScrollEnd:function(E){if(!this._host._flicking){this.flash();}},_renderBar:function(F,H){var G=F.inDoc(),I=this._host._bb,E=F.getData("isHoriz")?j.scrollbarHB:j.scrollbarVB;if(H&&!G){I.append(F);F.toggleClass(E,this._basic);this._setChildCache(F);}else{if(!H&&G){F.remove();this._clearChildCache(F);}}},_setChildCache:function(H){var J=H.get("children"),F=J.item(0),I=J.item(1),G=J.item(2),E=H.getData("isHoriz")?"offsetWidth":"offsetHeight";H.setStyle(o,f);I.setStyle(o,f);G.setStyle(o,f);H.setData(v,{fc:F,lc:G,mc:I,fcSize:F&&F.get(E),lcSize:G&&G.get(E)});},_clearChildCache:function(E){E.clearData(v);},_updateBar:function(E,N,G,X){var L=this._host,H=this._basic,M=L._cb,S=0,O=1,F=E.getData(v),T=F.lc,W=F.mc,ab=F.fcSize,aa=F.lcSize,P,Y,V,K,Z,R,I,U,Q,J;if(X){R=g;I=r;U=B;Q=L._width;J=L._scrollWidth;K=e;Z=z;N=(N!==undefined)?N:L.get(t);}else{R=w;I=x;U=u;Q=L._height;J=L._scrollHeight;K=d;Z=y;N=(N!==undefined)?N:L.get(s);}S=Math.floor(Q*(Q/J));O=Math.floor((N/(J-Q))*(Q-S));if(S>Q){S=1;}if(O>(Q-S)){S=S-(O-(Q-S));}else{if(O<0){S=O+S;O=0;}}P=(S-(ab+aa));if(P<0){P=0;}if(P===0&&O!==0){O=Q-(ab+aa)-1;}if(G!==0){V={duration:G};if(k){V.transform=K+O+p;}else{V[I]=O+l;}E.transition(V);}else{if(k){E.setStyle(f,K+O+p);}else{E.setStyle(I,O+l);}}if(this[U]!==P){this[U]=P;if(P>0){if(G!==0){V={duration:G};if(k){V.transform=Z+P+c;}else{V[R]=P+l;}W.transition(V);}else{if(k){W.setStyle(f,Z+P+c);}else{W.setStyle(R,P+l);}}if(!X||!H){Y=S-aa;if(G!==0){V={duration:G};if(k){V.transform=K+Y+p;}else{V[I]=Y;}T.transition(V);}else{if(k){T.setStyle(f,K+Y+p);}else{T.setStyle(I,Y+l);}}}}}},_update:function(F,K,I,J){var H=this.get(C),E=this.get(n),G=this._host;I=(I||0)/1000;if(!this._showing){this.show();}if(G._scrollsVertical&&H){this._updateBar(H,K,I,false);}if(G._scrollsHorizontal&&E){this._updateBar(E,F,I,true);}},show:function(E){this._show(true,E);},hide:function(E){this._show(false,E);},_show:function(E,H){var G=this.get(C),I=this.get(n),J=(H)?0.6:0,F=(E)?1:0,K;this._showing=E;if(this._flashTimer){this._flashTimer.cancel();}K={duration:J,opacity:F};if(G){G.transition(K);}if(I){I.transition(K);}},flash:function(){var E=this._host;this.show(true);this._flashTimer=a.later(800,this,"hide",true);},_setNode:function(F,E){var G=(E==n);F=a.one(F);if(F){F.addClass(j.scrollbar);F.addClass((G)?j.scrollbarH:j.scrollbarV);F.setData("isHoriz",G);}return F;},_defaultNode:function(){return a.Node.create(b.SCROLLBAR_TEMPLATE);},_basic:a.UA.ie&&a.UA.ie<=8});},"3.4.0",{requires:["classnamemanager","transition","plugin"],skinnable:true});