AUI.add("aui-datatable-events",function(j){var R=j.Lang,s=R.isArray,F=R.isObject,e=R.isValue,b=j.Array.each,E=j.Object.keys,L=j.Object.values,x=j.Selector.test,l=j.ClassNameManager.getClassName,t=j.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),h=j.cached(function(S,A){return S+t(A.toLowerCase());}),M="boundingBox",O="cell",D="cellSelector",H="click",n="column",r="dblclick",c="events",w="header",p="host",d="inHead",Q="keydown",P="keyup",G="liner",y="mousedown",f="mouseenter",k="mouseleave",i="mouseup",C="data",I="row",u="table",N="tags",a="tagName",J="tbody",v="thead",B="tr",m="datatable",z="columns",o=",",q=".",K=l(m,G);var g=j.Base.create("dataTableEvents",j.Plugin.Base,[],{_bubbling:false,_handler:null,_tagsFilter:null,initializer:function(T){var A=this;var S=A.get(N);A._tagsFilter=E(S).join(o);A._initEvents();},destructor:function(){var A=this;var S=A._handler;if(S){S.detach();}},updateEventPayload:function(V,S){var A=this;var U=A.get(p);var W=U._theadNode;var X=V.getData(d);var T=V.getData(G);var Y=V.getData(I);if(!e(X)){X=W.contains(V);V.setData(d,X);}if(!e(T)){T=V.one(q+K);V.setData(G,T);}if(!e(Y)){Y=V.ancestor(B);V.setData(I,Y);}return j.mix(S,{cell:V,column:U.get(z).getColumnByCell(V),inHead:X,liner:T,originalEvent:S,row:Y,record:U.get(C).getRecordByRow(Y)},true);},_filterBubble:function(X){var A=this;var W=A.get(p);var S=W._tableNode.getDOM();var T=[];while(X){var V=(X===S);if(x(X,A._tagsFilter,(V?null:S))){T.push(X);}if(V){break;}X=X.parentNode;}if(T.length){var U=W.getColNode(j.one(T[0]));if(U){T.splice(2,0,U.getDOM());}}return T;},_handleEvents:function(A){var W,U;var Z=this;var aa=Z.get(p);var ab=Z.get(N);var T=A.currentTarget;var S=Z._filterBubble(T.getDOM());var Y=Z.updateEventPayload(T,A);Z._bubbling=true;for(W=0,U=S.length;(W<U)&&Z._bubbling;W++){var V=j.one(S[W]);var X=ab[V.get(a).toLowerCase()];Y.node=V;Y.property=X;aa.fire(h(X,A.type),Y);}},_initEvents:function(){var A=this;var V=A.get(p);var S=A.get(N);var T=A.get(c);var U={};b(L(S),function(W){b(T,function(X){var Y=h(W,X);U[Y]={stoppedFn:j.bind(A._stopBubble,A)};});});V.publish(U);A._handler=V.get(M).delegate(T,j.bind(A._handleEvents,A),A.get(D));},_stopBubble:function(){var A=this;A._bubbling=false;}},{NS:"events",NAME:"dataTableEvents",ATTRS:{cellSelector:{value:"td,th",writeOnce:true},events:{validator:s,value:[H,r,Q,P,y,f,k,i]},tags:{validator:F,value:{col:n,table:u,thead:v,tbody:J,tr:I,th:w,td:O},writeOnce:true}}});j.namespace("Plugin").DataTableEvents=g;},"@VERSION@",{requires:["aui-datatable-base"]});