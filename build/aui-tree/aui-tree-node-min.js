AUI.add("aui-tree-node",function(ag){var aa=ag.Lang,aN=aa.isString,aE=aa.isBoolean,aV="alwaysShowHitArea",R="",s="boundingBox",g="children",aJ="clearfix",x="collapsed",a="container",ae="content",v="contentBox",j="expanded",p="helper",X="hidden",J="hitarea",f="hitAreaEl",V="icon",aU="iconEl",aw="id",am="label",Y="labelEl",U="lastSelected",aI="leaf",q="node",ao="over",ab="ownerTree",e="parentNode",aH="selected",t=" ",aC="radio",h="tree",K="tree-node",aR=function(){return Array.prototype.slice.call(arguments).join(t);},at=function(A){return(A instanceof ag.TreeNode);},aP=function(A){return(A instanceof ag.TreeView);},H=ag.getClassName,aj=H(p,aJ),B=H(h,x),b=H(h,a),aW=H(h,j),u=H(h,X),ay=H(h,J),G=H(h,V),k=H(h,am),F=H(h,q,ae),az=H(h,q,X,J),i=H(h,q,aI),aM=H(h,q,ao),M=H(h,q,aH),af='<div class="'+ay+'"></div>',r='<div class="'+G+'"></div>',d='<div class="'+k+'"></div>',aT="<ul></ul>",w="<li></li>",ac='<div class="'+aR(aj,F)+'"></div>';var P=ag.Component.create({NAME:K,ATTRS:{draggable:{value:true,validator:aE},ownerTree:{value:null},label:{value:R,validator:aN},expanded:{value:false,validator:aE},id:{validator:aN},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aE},nextSibling:{value:null,validator:at},prevSibling:{value:null,validator:at},parentNode:{value:null,validator:function(A){return at(A)||aP(A);}},labelEl:{setter:ag.one,valueFn:function(){var A=this.get(am);return ag.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ag.one,valueFn:function(){return ag.Node.create(af);}},alwaysShowHitArea:{value:true,validator:aE},iconEl:{setter:ag.one,valueFn:function(){return ag.Node.create(r);}},tabIndex:{value:null}},EXTENDS:ag.TreeData,UI_ATTRS:[j],prototype:{BOUNDING_TEMPLATE:w,CONTENT_TEMPLATE:ac,initializer:function(){var A=this;A._syncTreeNodeBBId();},bindUI:function(){var A=this;A.after("childrenChange",ag.bind(A._afterSetChildren,A));A.after("idChange",A._afterSetId,A);},_renderUI:function(A){this._renderBoxClassNames();},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_renderContentBox:function(a0){var A=this;var L=A.get(v);if(A.isLeaf()){L.addClass(i);}else{var aZ=A.get(j);L.addClass(aZ?aW:B);if(aZ){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var aZ=A.get(s);var L=A.get(v);var a0=null;if(!A.isLeaf()){L.append(A.get(f));a0=A._createNodeContainer();}L.append(A.get(aU));L.append(A.get(Y));aZ.append(L);if(a0){if(!A.get(j)){a0.addClass(u);}aZ.append(a0);}return aZ;},_createNodeContainer:function(){var A=this;var L=A.get(a)||ag.Node.create(aT);L.addClass(b);A.set(a,L);A.eachChildren(function(aZ){A.appendChild(aZ);});return L;},_syncHitArea:function(L){var A=this;if(A.get(aV)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ag.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ag.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aZ=0;var L=this;var A=L.get(e);while(A){++aZ;A=A.get(e);}return aZ;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ag.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(v).hasClass(M);},isLeaf:function(){var A=this;return A.get(aI);},isAncestor:function(aZ){var L=this;var A=L.get(e);while(A){if(A===aZ){return true;}A=A.get(e);}return false;},insertAfter:function(aZ,L){var A=this;ag.TreeNode.superclass.insertAfter.apply(this,[aZ,A]);},insertBefore:function(L){var A=this;ag.TreeNode.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(ab);if(L){L.set(U,A);}A.get(v).addClass(M);A.fire("select");},unselect:function(){var A=this;A.get(v).removeClass(M);A.fire("unselect");},over:function(){this.get(v).addClass(aM);},out:function(){this.get(v).removeClass(aM);},showHitArea:function(){var A=this;var L=A.get(f);L.removeClass(az);},hideHitArea:function(){var A=this;var L=A.get(f);L.addClass(az);},_syncTreeNodeBBId:function(L){var A=this;A.get(s).attr(aw,A.get(aw));},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);},_uiSetExpanded:function(a0){var A=this;if(!A.isLeaf()){var aZ=A.get(a);var L=A.get(v);if(a0){L.replaceClass(B,aW);if(aZ){aZ.removeClass(u);}}else{L.replaceClass(aW,B);if(aZ){aZ.addClass(u);}}}}}});ag.TreeNode=P;var aB=aa.isFunction,I=aa.isObject,ah=aa.isValue,aO="cache",ax="end",an="io",aF="limit",aS="loaded",aX="loading",al="paginator",aq="start",av="tree-node-io",c="paginatorClick",aD=H(h,q,al),z=H(h,q,an,aX),aA='<a class="'+aD+'" href="javascript:void(0);">Load more results</a>';var O=ag.Component.create({NAME:av,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:aE},loaded:{value:false,validator:aE},cache:{value:true,validator:aE},leaf:{value:false,validator:aE},paginator:{setter:function(A){return ag.merge({alwaysVisible:false,autoFocus:true,element:ag.Node.create(aA),endParam:ax,limitParam:aF,start:0,startParam:aq},A);},validator:I}},EXTENDS:ag.TreeNode,prototype:{bindUI:function(){var A=this;ag.TreeNodeIO.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},syncUI:function(){var A=this;ag.TreeNodeIO.superclass.syncUI.apply(this,arguments);A._syncPaginatorUI();},_bindPaginatorUI:function(){var A=this;var aZ=A.get(al);if(aZ){var L=ag.bind(A._handlePaginatorClickEvent,A);aZ.element.on("click",L);}},createNodes:function(L){var A=this;ag.Array.each(ag.Array(L),function(a0){var aZ=A.createNode.apply(A,[a0]);
A.appendChild(aZ);});A._syncPaginatorUI(L);},expand:function(){var A=this;var L=A.get(aO);var a1=A.get(an);var aZ=A.get(aS);var a0=A.get(aX);if(!L){A.set(aS,false);}if(a1&&!aZ&&!a0&&!this.hasChildNodes()){if(!L){A.empty();}A.initIO();}else{ag.TreeNodeIO.superclass.expand.apply(this,arguments);}},initIO:function(){var L=this;var aZ=L.get(an);if(aB(aZ.cfg.data)){aZ.cfg.data=aZ.cfg.data.apply(L,[L]);}L._syncPaginatorIOData(aZ);if(aB(aZ.loader)){var A=ag.bind(aZ.loader,L);A(aZ.url,aZ.cfg,L);}else{ag.io.request(aZ.url,aZ.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(v);A.set(aX,true);L.addClass(z);},ioCompleteHandler:function(){var A=this;var L=A.get(v);A.set(aX,false);A.set(aS,true);L.removeClass(z);},ioSuccessHandler:function(){var A=this;var a4=A.get(an);var aZ=Array.prototype.slice.call(arguments);var a1=aZ.length;var L=aZ[1];if(a1>=3){var a3=aZ[2];try{L=ag.JSON.parse(a3.responseText);}catch(a2){}}var a0=a4.formatter;if(a0){L=a0(L);}A.createNodes(L);A.expand();},ioFailureHandler:function(){var A=this;A.set(aX,false);A.set(aS,false);},_createEvents:function(){var A=this;A.publish(c,{defaultFn:A._defPaginatorClickFn,prefix:av});},_defPaginatorClickFn:function(L){var A=this;var aZ=A.get(al);if(ah(aZ.limit)){aZ.start+=aZ.limit;}if(A.get(an)){A.initIO();}},_handlePaginatorClickEvent:function(a0){var A=this;var aZ=A.get(ab);var L=A.getEventOutputMap(A);A.fire(c,L);if(aZ){aZ.fire(c,L);}a0.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var aZ=L.get(ab);if(aZ){if(!L.get(an)){L.set(an,ag.clone(aZ.get(an)));}if(!L.get(al)){var A=aZ.get(al);if(A&&A.element){A.element=A.element.clone();}L.set(al,A);}}},_setIO:function(aZ){var A=this;if(!aZ){return null;}else{if(aN(aZ)){aZ={url:aZ};}}aZ=aZ||{};aZ.cfg=aZ.cfg||{};aZ.cfg.on=aZ.cfg.on||{};var L={start:ag.bind(A.ioStartHandler,A),complete:ag.bind(A.ioCompleteHandler,A),success:ag.bind(A.ioSuccessHandler,A),failure:ag.bind(A.ioFailureHandler,A)};ag.each(L,function(a2,a0){var a3=aZ.cfg.on[a0];if(aB(a3)){var a1=function(){a2.apply(A,arguments);a3.apply(A,arguments);};aZ.cfg.on[a0]=ag.bind(a1,A);}else{aZ.cfg.on[a0]=a2;}});return aZ;},_syncPaginatorIOData:function(a0){var A=this;var aZ=A.get(al);if(aZ&&ah(aZ.limit)){var L=a0.cfg.data||{};L[aZ.limitParam]=aZ.limit;L[aZ.startParam]=aZ.start;L[aZ.endParam]=(aZ.start+aZ.limit);a0.cfg.data=L;}},_syncPaginatorUI:function(aZ){var a3=this;var L=a3.get(g);var a4=a3.get(al);if(a4){var a2=true;if(aZ){a2=(aZ.length>0);}var A=a4.start;var a1=a4.total;var a5=a2&&(a1>L.length);if(a4.alwaysVisible||a5){a3.get(a).append(a4.element.show());if(a4.autoFocus){try{a4.element.focus();}catch(a0){}}}else{a4.element.hide();}}}}});ag.TreeNodeIO=O;var l="checkbox",o="checked",ad="checkContainerEl",aK="checkEl",Q="checkName",Z=".",m="name",C="tree-node-check",ak=H(h,q,l),ar=H(h,q,l,a),au=H(h,q,o),T='<div class="'+ar+'"></div>',ap='<input class="'+ak+'" type="checkbox" />';var aG=ag.Component.create({NAME:C,ATTRS:{checked:{value:false,validator:aE},checkName:{value:C,validator:aN},checkContainerEl:{setter:ag.one,valueFn:function(){return ag.Node.create(T);}},checkEl:{setter:ag.one,valueFn:function(){var A=this.get(Q);return ag.Node.create(ap).attr(m,A);}}},EXTENDS:ag.TreeNodeIO,UI_ATTRS:[o],prototype:{renderUI:function(){var L=this;ag.TreeNodeCheck.superclass.renderUI.apply(L,arguments);var aZ=L.get(Y);var A=L.get(aK);var a0=L.get(ad);A.hide();a0.append(A);aZ.placeBefore(a0);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(v);var aZ=A.get(Y);ag.TreeNodeCheck.superclass.bindUI.apply(A,arguments);L.delegate("click",ag.bind(A.toggleCheck,A),Z+ar);L.delegate("click",ag.bind(A.toggleCheck,A),Z+k);aZ.swallowEvent("dblclick");},check:function(L){var A=this;A.set(o,true,{originalTarget:L});},uncheck:function(L){var A=this;A.set(o,false,{originalTarget:L});},toggleCheck:function(){var L=this;var A=L.get(aK);var aZ=A.attr(o);if(!aZ){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(o);},_uiSetChecked:function(L){var A=this;if(L){A.get(v).addClass(au);A.get(aK).attr(o,o);}else{A.get(v).removeClass(au);A.get(aK).attr(o,R);}}}});ag.TreeNodeCheck=aG;var D="child",S="tree-node-task",N="unchecked",aL=function(A){return A instanceof ag.TreeNodeCheck;},ai=H(h,q,D,N);var aY=ag.Component.create({NAME:S,EXTENDS:ag.TreeNodeCheck,prototype:{check:function(aZ){var A=this;var L=A.get(v);aZ=aZ||A;if(!A.isLeaf()){A.eachChildren(function(a0){if(aL(a0)){a0.check(aZ);}});}A.eachParent(function(a0){if(aL(a0)&&!a0.isChecked()){a0.get(v).addClass(ai);}});L.removeClass(ai);ag.TreeNodeTask.superclass.check.apply(this,[aZ]);},uncheck:function(aZ){var A=this;var L=A.get(v);aZ=aZ||A;if(!A.isLeaf()){A.eachChildren(function(a0){if(a0 instanceof ag.TreeNodeCheck){a0.uncheck(aZ);}});}A.eachParent(function(a0){if(aL(a0)&&!a0.isChecked()){a0.get(v).removeClass(ai);}});L.removeClass(ai);ag.TreeNodeTask.superclass.uncheck.apply(this,[aZ]);}}});ag.TreeNodeTask=aY;var E="tree-node-radio",n=function(A){return A instanceof ag.TreeNodeRadio;},y=H(h,q,aC),W=H(h,q,aC,o);var aQ=ag.Component.create({NAME:E,EXTENDS:ag.TreeNodeTask,prototype:{renderUI:function(){var A=this;ag.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(v).addClass(y);},check:function(){var A=this;A._uncheckNodesRadio();ag.TreeNodeRadio.superclass.check.apply(this,arguments);},_uiSetChecked:function(L){var A=this;if(L){A.get(v).addClass(W);A.get(aK).attr(o,o);}else{A.get(v).removeClass(W);A.get(aK).attr(o,R);}},_uncheckNodesRadio:function(a0){var A=this;var aZ;if(a0){aZ=a0.get(g);}else{var L=A.get(ab);if(L){aZ=L.get(g);}else{return;}}ag.Array.each(aZ,function(a2,a1,a3){if(!a2.isLeaf()){A._uncheckNodesRadio(a2);}if(n(a2)){a2.uncheck();}});}}});ag.TreeNodeRadio=aQ;ag.TreeNode.nodeTypes={radio:ag.TreeNodeRadio,task:ag.TreeNodeTask,check:ag.TreeNodeCheck,node:ag.TreeNode,io:ag.TreeNodeIO};},"@VERSION@",{requires:["aui-tree-data","aui-io","json","querystring-stringify"],skinnable:false});