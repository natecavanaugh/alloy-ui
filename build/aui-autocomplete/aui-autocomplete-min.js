AUI.add("aui-autocomplete",function(j){var P=j.Lang,r=P.isArray,i=P.isString,E=P.isNull,l=P.isFunction,O=j.getClassName,Q=j.Event.KeyMap,B="alert",y="content",G="helper",H="hidden",w="icon",M="item",C="list",o="loading",x="autocomplete",I="reset",K="results",t="selected",p="circle-triangle-b",z=B,e=o,d=O(x,t),J=O(G,H),h=O(x,C,M),F=O(G,I),a=O(x,K),q=O(x,K,y),c="BACKSPACE",m="TAB",b="ENTER",D="ALT",g="ESC",n="UP",v="DOWN",N="RIGHT",f="WIN_IME",s={node:null,points:["tl","bl"]},L="boundingBox",u="contentBox";var k=j.Component.create({NAME:x,ATTRS:{alwaysShowContainer:{value:false},autoHighlight:{value:true},applyLocalFilter:{value:null},button:{value:true},dataSource:{value:null},dataSourceType:{value:null},delimChar:{value:null,setter:function(A){if(i(A)&&(A.length>0)){A=[A];}else{if(!r(A)){A=j.Attribute.INVALID_VALUE;}}return A;}},forceSelection:{value:false},input:{value:null},matchKey:{value:0},maxResultsDisplayed:{value:10},minQueryLength:{value:1},queryDelay:{value:0.2,getter:function(A){return A*1000;}},queryInterval:{value:0.5,getter:function(A){return A*1000;}},queryMatchCase:{value:false},queryMatchContains:{value:false},queryQuestionMark:{value:true},schema:{value:null},schemaType:{value:"",validator:i},suppressInputUpdate:{value:false},typeAhead:{value:false},typeAheadDelay:{value:0.2,getter:function(A){return A*1000;}},uniqueName:{value:null}},prototype:{initializer:function(R){var A=this;A._overlayAlign=j.mix({},s);A._createDataSource();},renderUI:function(){var A=this;A._renderInput();A._renderOverlay();},bindUI:function(){var A=this;var R=A.button;var S=A.inputNode;A.dataSource.on("request",j.bind(R.set,R,w,e));S.on("blur",A._onTextboxBlur,A);S.on("focus",A._onTextboxFocus,A);S.on("keydown",A._onTextboxKeyDown,A);S.on("keypress",A._onTextboxKeyPress,A);S.on("keyup",A._onTextboxKeyUp,A);var T=A.overlay.get(L);T.on("click",A._onContainerClick,A);T.on("mouseout",A._onContainerMouseout,A);T.on("mouseover",A._onContainerMouseover,A);T.on("scroll",A._onContainerScroll,A);A.publish("containerCollapse");A.publish("containerExpand");A.publish("containerPopulate");A.publish("dataError");A.publish("dataRequest");A.publish("dataReturn");A.publish("itemArrowFrom");A.publish("itemArrowTo");A.publish("itemMouseOut");A.publish("itemMouseOver");A.publish("itemSelect");A.publish("selectionEnforce");A.publish("textboxBlur");A.publish("textboxChange");A.publish("textboxFocus");A.publish("textboxKey");A.publish("typeAhead");A.publish("unmatchedItemSelect");A.overlay.after("visibleChange",A._realignContainer,A);},syncUI:function(){var A=this;A.inputNode.setAttribute("autocomplete","off");},destructor:function(){var A=this;A.overlay.destroy();},doBeforeExpandContainer:function(){return true;},doBeforeLoadData:function(A){return true;},filterResults:function(ab){var ah=this;var S=ab.callback;var T=ab.request;var R=ab.response;if(S&&S.argument&&S.argument.query){T=S.argument.query;}if(T){var ag=ah.dataSource;var ad=R.results;var A=[];var V=false;var U=ah.get("matchKey");var ae=ah.get("queryMatchCase");var Z=ah.get("queryMatchContains");var Y=(T=="*");var aa=ah.get("schema.resultFields");for(var ac=ad.length-1;ac>=0;ac--){var X=ad[ac];var af=null;if(i(X)){af=X;}else{if(r(X)){af=X[0];}else{if(aa){af=X[U||aa[0]];}}}if(i(af)){var W=-1;if(ae){W=af.indexOf(decodeURIComponent(T));}else{W=af.toLowerCase().indexOf(decodeURIComponent(T).toLowerCase());}if((Y)||(!Z&&(W===0))||(Z&&(W>-1))){A.unshift(X);}}}R.results=A;}return R;},formatResult:function(R,S,A){return A||"";},generateRequest:function(A){return{request:A};},handleResponse:function(S){var R=this;R._populateList(S);var A=p;if(S.error){A=z;}R.button.set(w,A);},sendQuery:function(R){var A=this;A.set("focused",null);var S=R;if(A.get("delimChar")){R=A.inputNode.get("value")+R;}A._sendQuery(S);},_clearInterval:function(){var A=this;if(A._queryIntervalId){clearInterval(A._queryIntervalId);A._queryIntervalId=null;}},_clearSelection:function(){var R=this;var S=R.get("delimChar");var A={previous:"",query:R.inputNode.get("value")};if(S){A=R._extractQuery(R.inputNode.get("value"));}R.fire("selectionEnforce",A.query);},_createDataSource:function(){var A=this;A._queryTask=j.debounce(A.sendQuery,A.get("queryDelay"),A);var W=A.get("dataSource");var U=W;var V=A.get("dataSourceType");if(!(W instanceof j.DataSource.Local)){if(!V){V="Local";if(l(U)){V="Function";}else{if(i(U)){V="IO";}}}W=new j.DataSource[V]({source:U});}W.on("error",A.handleResponse,A);W.after("response",A.handleResponse,A);V=W.name;if(V=="dataSourceLocal"){A.set("applyLocalFilter",true);}A.set("dataSource",W);A.set("dataSourceType",V);A.dataSource=W;var T=A.get("schema");if(T){if(T.fn){A.dataSource.plug(T);}else{var R=A.get("schemaType");var S={array:j.Plugin.DataSourceArraySchema,json:j.Plugin.DataSourceJSONSchema,text:j.Plugin.DataSourceTextSchema,xml:j.Plugin.DataSourceXMLSchema};R=R.toLowerCase()||"array";A.dataSource.plug({fn:S[R],cfg:{schema:T}});}}A.set("schema",T);},_enableIntervalDetection:function(){var A=this;var R=A.get("queryInterval");if(!A._queryIntervalId&&R){A._queryInterval=setInterval(j.bind(A._onInterval,A),R);}},_extractQuery:function(U){var Y=this;var W=Y.get("delimChar");var A=-1;var S=W.length-1;var X,V,T;for(;S>=0;S--){X=U.lastIndexOf(W[S]);if(X>A){A=X;}}if(W[S]==" "){for(var R=W.length-1;R>=0;R--){if(U[A-1]==W[R]){A--;break;}}}if(A>-1){V=A+1;while(U.charAt(V)==" "){V+=1;}T=U.substring(0,V);U=U.substring(V);}else{T="";}return{previous:T,query:U};},_focus:function(){var A=this;setTimeout(function(){A.inputNode.focus();},0);},_jumpSelection:function(){var A=this;if(A._elCurListItem){A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}},_moveSelection:function(ad){var aa=this;if(aa.overlay.get("visible")){var ae=aa._elCurListItem;var R=-1;if(ae){R=Number(ae.getAttribute("data-listItemIndex"));}var S=R-1;if(Q.isKey(ad,v)){S=R+1;}if(S==-1){S=aa._displayedItems-1;}if(S>=aa._displayedItems){S=0;}if(S<-2){return;}if(ae){aa._toggleHighlight(ae,"from");aa.fire("itemArrowFrom",ae);
}if(S==-1){if(aa.get("delimChar")){aa.inputNode.set("value",aa._pastSelections+aa._currentQuery);}else{aa.inputNode.set("value",aa._currentQuery);}return;}if(S==-2){aa._toggleContainer(false);return;}var W=aa.resultList.get("childNodes").item(S);var U=aa.overlay.get(u);var Y=U.getStyle("overflow");var ab=U.getStyle("overflowY");var T=(Y=="auto")||(Y=="scroll")||(ab=="auto")||(ab=="scroll");if(T&&(S>-1)&&(S<aa._displayedItems)){var A=-1;var af=W.get("offsetTop");var V=af+W.get("offsetHeight");var Z=U.get("offsetHeight");var X=U.get("scrollTop");var ac=Z+X;if(Q.isKey(ad,v)){if(V>ac){A=(V-Z);}else{if(V<X){A=af;}}}else{if(af<Z){A=af;}else{if(af>ac){A=(V-Z);}}}if(A>-1){U.set("scrollTop",A);}}aa._toggleHighlight(W,"to");aa.fire("itemArrowTo",W);if(aa.get("typeAhead")){aa._updateValue(W);}}},_onButtonMouseDown:function(R){var A=this;R.halt();A._focus();A._sendQuery(A.inputNode.get("value")+"*");},_onContainerClick:function(S){var A=this;var T=S.target;var R=T.get("nodeName").toLowerCase();S.halt();while(T&&(R!="table")){switch(R){case"body":return;case"li":A._toggleHighlight(T,"to");A._selectItem(T);return;default:break;}T=T.get("parentNode");if(T){R=T.get("nodeName").toLowerCase();}}},_onContainerMouseout:function(S){var A=this;var T=S.target;var R=T.get("nodeName").toLowerCase();while(T&&(R!="table")){switch(R){case"body":return;case"li":A._toggleHighlight(T,"from");A.fire("itemMouseOut",T);break;case"ul":A._toggleHighlight(A._elCurListItem,"to");break;case"div":if(T.hasClass(a)){A._overContainer=false;return;}break;default:break;}T=T.get("parentNode");if(T){R=T.get("nodeName").toLowerCase();}}},_onContainerMouseover:function(S){var A=this;var T=S.target;var R=T.get("nodeName").toLowerCase();while(T&&(R!="table")){switch(R){case"body":return;case"li":A._toggleHighlight(T,"to");A.fire("itemMouseOut",T);break;case"div":if(T.hasClass(a)){A._overContainer=true;return;}break;default:break;}T=T.get("parentNode");if(T){R=T.get("nodeName").toLowerCase();}}},_onContainerScroll:function(R){var A=this;A._focus();},_onInterval:function(){var A=this;var S=A.inputNode.get("value");var R=A._lastValue;if(S!=R){A._lastValue=S;A._sendQuery(S);}},_onTextboxBlur:function(T){var A=this;if(!A._overContainer||Q.isKey(A._keyCode,m)){if(!A._itemSelected){var S=A._textMatchesOption();var R=A.overlay.get("visible");if(!R||(R&&E(S))){if(A.get("forceSelection")){A._clearSelection();}else{A.fire("unmatchedItemSelect",A._currentQuery);}}else{if(A.get("forceSelection")){A._selectItem(S);}}}A._clearInterval();A.blur();if(A._initInputValue!==A.inputNode.get("value")){A.fire("textboxChange");}A.fire("textboxBlur");A._toggleContainer(false);}else{A._focus();}},_onTextboxFocus:function(R){var A=this;if(!A.get("focused")){A.inputNode.setAttribute("autocomplete","off");A.focus();A._initInputValue=A.inputNode.get("value");A.fire("textboxFocus");}},_onTextboxKeyDown:function(R){var A=this;var S=R.keyCode;if(A._typeAheadDelayId!=-1){clearTimeout(A._typeAheadDelayId);}if(R.isKey(m)){if(A._elCurListItem){if(A.get("delimChar")&&A._keyCode!=S){if(A.overlay.get("visible")){R.halt();}}A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}}else{if(R.isKey(b)){if(A._elCurListItem){if(A._keyCode!=S){if(A.overlay.get("visible")){R.halt();}}A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}}else{if(R.isKey(g)){A._toggleContainer(false);}else{if(R.isKey(n)){if(A.overlay.get("visible")){R.halt();A._moveSelection(S);}}else{if(R.isKey(N)){A._jumpSelection();}else{if(R.isKey(v)){if(A.overlay.get("visible")){R.halt();A._moveSelection(S);}}else{A._itemSelected=false;A._toggleHighlight(A._elCurListItem,"from");A.fire("textboxKey",S);}}}}}}if(R.isKey(D)){A._enableIntervalDetection();}A._keyCode=S;},_onTextboxKeyPress:function(R){var A=this;var S=R.keyCode;if(R.isKey(m)){if(A.overlay.get("visible")){if(A.get("delimChar")){R.halt();}if(A._elCurListItem){A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}}}else{if(R.isKey(b)){if(A.overlay.get("visible")){R.halt();if(A._elCurListItem){A._selectItem(A._elCurListItem);}else{A._toggleContainer(false);}}}}if(R.isKey(f)){A._enableIntervalDetection();}},_onTextboxKeyUp:function(S){var A=this;var R=A.inputNode;var T=R.get("value");if(S.isSpecialKey()&&!S.isKey(c)){return;}A._queryTask(T);},_populateList:function(A){var ab=this;if(ab._typeAheadDelayId!=-1){clearTimeout(ab._typeAheadDelayId);}var W=A.request;var U=A.response;var ae=A.callback;var T=(W=="*");if(ae&&ae.argument&&ae.argument.query){A.request=W=ae.argument.query;}var Z=ab.doBeforeLoadData(A);if(Z&&!A.error){ab.fire("dataReturn",A);var Y=ab.get("focused");if(T||Y||Y===null){var X=decodeURIComponent(W);ab._currentQuery=X;ab._itemSelected=false;var S=A.response.results;var ad=Math.min(S.length,ab.get("maxResultsDisplayed"));var V=ab.get("schema.resultFields");var ac=ab.get("matchKey");if(!ac&&V){ac=V[0];}else{ac=ac||0;}if(ad>0){var aa=ab.resultList.get("childNodes");aa.each(function(aj,ai,ah){if(ai<ad){var ag=S[ai];var af="";if(i(ag)){af=ag;}else{if(r(ag)){af=ag[0];}else{af=ag[ac];}}aj._resultMatch=af;aj._resultData=ag;aj.html(ab.formatResult(ag,X,af));aj.removeClass(J);}else{aj.addClass(J);}});ab._displayedItems=ad;ab.fire("containerPopulate",W,S);if(W!="*"&&ab.get("autoHighlight")){var R=ab.resultList.get("firstChild");ab._toggleHighlight(R,"to");ab.fire("itemArrowTo",R);ab._typeAhead(R,W);}else{ab._toggleHighlight(ab._elCurListItem,"from");}Z=ab.doBeforeExpandContainer(W,S);ab._toggleContainer(Z);}else{ab._toggleContainer(false);}return;}}else{ab.fire("dataError",W);}},_realignContainer:function(R){var A=this;var S=A._overlayAlign;if(R.newVal){A.overlay._uiSetAlign(S.node,S.points);}},_renderInput:function(){var R=this;var S=R.get(u);var T=R.get("input");var V={field:{labelText:false},icons:[{icon:"circle-triangle-b",id:"trigger",handler:{fn:R._onButtonMouseDown,context:R}}]};var U=null;var A=null;if(T){T=j.one(T);V.field.node=T;U=T.next();A=T.get("parentNode");}var W=new j.Combobox(V).render(S);if(A){var X=W.get("boundingBox");
A.insertBefore(X,U);}R.inputNode=W.get("node");R.button=W.icons.item("trigger");R.set("uniqueName",j.stamp(R.inputNode));},_renderListElements:function(){var A=this;var T=A.get("maxResultsDisplayed");var R=A.resultList;var S=[];while(T--){S[T]='<li class="'+J+" "+h+'" data-listItemIndex="'+T+'"></li>';}R.html(S.join(""));},_renderOverlay:function(){var A=this;var T=A._overlayAlign;T.node=A.inputNode;var S=new j.OverlayBase({align:T,bodyContent:"<ul></ul>",visible:false,width:A.inputNode.get("offsetWidth"),zIndex:1});var R=S.get(u);S.get(L).addClass(a);R.addClass(q);S.render();S.addTarget(A);A.overlay=S;A.resultList=R.one("ul");A.resultList.addClass(F);A._renderListElements();},_selectItem:function(R){var A=this;A._itemSelected=true;A._updateValue(R);A._pastSelections=A.inputNode.get("value");A._clearInterval();A.fire("itemSelect",R,R._resultData);A._toggleContainer(false);},_sendQuery:function(V){var R=this;if(R.get("disabled")){R._toggleContainer(false);return;}var T=R.get("delimChar");var S=R.get("minQueryLength");if(T){var A=R._extractQuery(V);V=A.query;R._pastSelections=A.previous;}if((V&&(V.length<S))||(!V&&S>0)){R._queryTask.cancel();R._toggleContainer(false);return;}V=encodeURIComponent(V);if(R.get("applyLocalFilter")){R.dataSource.on("response",R.filterResults,R);}var U=R.generateRequest(V);R.fire("dataRequest",V,U);R.dataSource.sendRequest(U);},_textMatchesOption:function(){var A=this;var R=null;var V=A._displayedItems;var W=A.resultList.get("childNodes");for(var T=0;T<V.length;T++){var U=W.item(T);var S=(""+U._resultMatch).toLowerCase();if(S==A._currentQuery.toLowerCase()){R=U;break;}}return R;},_toggleContainer:function(R){var A=this;var S=A.overlay;if(A.get("alwaysShowContainer")&&S.get("visible")){return;}if(!R){A._toggleHighlight(A._elCurListItem,"from");A._displayedItems=0;A._currentQuery=null;}if(R){S.show();A.fire("containerExpand");}else{S.hide();A.fire("containerCollapse");}},_toggleHighlight:function(R,S){var A=this;if(R){if(A._elCurListItem){A._elCurListItem.removeClass(d);A._elCurListItem=null;}if(S=="to"){R.addClass(d);A._elCurListItem=R;}}},_typeAhead:function(R,S){var A=this;if(!A.get("typeAhead")||Q.isKey(A._keyCode,c)){return;}var T=j.Node.getDOMNode(A.inputNode);if(T.setSelectionRange||T.createTextRange){A._typeAheadDelayId=setTimeout(function(){var W=T.value;var X=W.length;A._updateValue(R);var U=T.value.length;A.inputNode.selectText(X,U);var V=T.value.substr(X,U);A.fire("typeAhead",S,V);},A.get("typeAheadDelay"));}},_updateValue:function(V){var R=this;if(!R.get("suppressInputUpdate")){var U=R.inputNode;var A=V._resultMatch;var T=R.get("delimChar");T=(T&&T[0])||T;var W="";if(T){W=R._pastSelections;W+=A+T;if(T!=" "){W+=" ";}}else{W=A;}U.set("value",W);if(U.get("type")=="textarea"){U.set("scrollTop",U.get("scrollHeight"));}var S=W.length;U.selectText(S,S);R._elCurListItem=V;}},_currentQuery:null,_displayedItems:0,_elCurListItem:null,_initInputValue:null,_itemSelected:false,_keyCode:null,_lastValue:null,_overContainer:false,_pastSelections:"",_typeAheadDelayId:-1}});j.AutoComplete=k;},"@VERSION@",{requires:["aui-base","aui-overlay-base","datasource","dataschema","aui-form-combobox"],skinnable:true});