AUI.add("aui-datatable-base",function(e){var j=e.Lang,c=e.ArraySort.compare,o=j.isNumber,d=j.isString,h="change",m="childNodes",i="columnset",f="data",k="headers",l="id",b="recordset",g="recordsetChange",a="#",n=" ";e.DataTable.Base=e.Base.create("datatable",e.DataTable.Base,[],{initializer:function(){var p=this;p.after(p._uiSetRecordsetExt,p,"_uiSetRecordset");},getCellNode:function(q,r){var p=this;return p.getRowNode(q).get(m).item(r.keyIndex);},getColNode:function(q){var p=this;var s=p.get(i);var r=s.getColumnIndex(s.getColumnByCell(q));return p._colgroupNode.get(m).item(r);},getRowNode:function(p){return e.one(a+p.get(l));},_fixPluginsUI:function(){var q=this;var r=q.sort;var p=q.scroll;if(r&&p){p.syncUI();}},_uiSetRecordsetExt:function(q){var p=this;p._fixPluginsUI();}},{});e.Column=e.Base.create("column",e.Column,[],{},{ATTRS:{sortFn:{value:function(r,p,s,t){var q=c(r.getValue(s),p.getValue(s),t);if(q===0){q=c(r.get("id"),p.get("id"),t);}return q;}}}});e.Columnset=e.Base.create("columnset",e.Columnset,[],{getColumn:function(q){var p=this;if(d(q)){return this.idHash[q];}else{if(o(q)){return p.keys[q];}}return null;},getColumnByCell:function(q){var p=this;var r=q.getAttribute(k).split(n).pop()||q.get(l);return p.getColumn(r);},getColumnIndex:function(p){return p.keyIndex;},getLength:function(){var p=this;return p.keys.length;},_setDefinitions:function(p){return p;}},{});e.Recordset=e.Base.create("recordset",e.Recordset,[],{getRecordByRow:function(q){var p=this;return p.getRecord(q.get(l));},getRecordIndex:function(q){var p=this;return e.Array.indexOf(p._items,q);},updateRecordDataByKey:function(q,r,t){var p=this;var s=q.get(f);if(s){s[r]=t;q.set(f,s);}p.update(q,p.getRecordIndex(q));}},{});e.Plugin.RecordsetSort.prototype._defSortFn=function(s){var p=this;var r=p.get("host");var q=r._items;e.Array.stableSort(q,function(u,t){return s.sorter.call(q,u,t,s.field,s.desc);});p.set("lastSortProperties",s);};},"@VERSION@",{skinnable:true,requires:["aui-base","datatable","plugin"]});AUI.add("aui-datatable-events",function(j){var R=j.Lang,s=R.isArray,F=R.isObject,e=R.isValue,b=j.Array.each,E=j.Object.keys,L=j.Object.values,x=j.Selector.test,l=j.ClassNameManager.getClassName,t=j.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),h=j.cached(function(S,A){return S+t(A.toLowerCase());}),M="boundingBox",O="cell",D="cellSelector",H="click",n="column",r="dblclick",c="events",w="header",p="host",d="inHead",Q="keydown",P="keyup",G="liner",y="mousedown",f="mouseenter",k="mouseleave",i="mouseup",C="recordset",I="row",u="table",N="tags",a="tagName",J="tbody",v="thead",B="tr",m="datatable",z="columnset",o=",",q=".",K=l(m,G);var g=j.Base.create("dataTableEvents",j.Plugin.Base,[],{_bubbling:false,_handler:null,_tagsFilter:null,initializer:function(T){var A=this;var S=A.get(N);A._tagsFilter=E(S).join(o);A._initEvents();},destructor:function(){var A=this;var S=A._handler;if(S){S.detach();}},updateEventPayload:function(V,S){var A=this;var U=A.get(p);var W=U._theadNode;var X=V.getData(d);var T=V.getData(G);var Y=V.getData(I);if(!e(X)){X=W.contains(V);V.setData(d,X);}if(!e(T)){T=V.one(q+K);V.setData(G,T);}if(!e(Y)){Y=V.ancestor(B);V.setData(I,Y);}return j.mix(S,{cell:V,column:U.get(z).getColumnByCell(V),inHead:X,liner:T,originalEvent:S,row:Y,record:U.get(C).getRecordByRow(Y)},true);},_filterBubble:function(X){var A=this;var W=A.get(p);var S=W._tableNode.getDOM();var T=[];while(X){var V=(X===S);if(x(X,A._tagsFilter,(V?null:S))){T.push(X);}if(V){break;}X=X.parentNode;}if(T.length){var U=W.getColNode(j.one(T[0]));if(U){T.splice(2,0,U.getDOM());}}return T;},_handleEvents:function(A){var W,U;var Z=this;var aa=Z.get(p);var ab=Z.get(N);var T=A.currentTarget;var S=Z._filterBubble(T.getDOM());var Y=Z.updateEventPayload(T,A);Z._bubbling=true;for(W=0,U=S.length;(W<U)&&Z._bubbling;W++){var V=j.one(S[W]);var X=ab[V.get(a).toLowerCase()];Y.node=V;Y.property=X;aa.fire(h(X,A.type),Y);}},_initEvents:function(){var A=this;var V=A.get(p);var S=A.get(N);var T=A.get(c);var U={};b(L(S),function(W){b(T,function(X){var Y=h(W,X);U[Y]={stoppedFn:j.bind(A._stopBubble,A)};});});V.publish(U);A._handler=V.get(M).delegate(T,j.bind(A._handleEvents,A),A.get(D));},_stopBubble:function(){var A=this;A._bubbling=false;}},{NS:"events",NAME:"dataTableEvents",ATTRS:{cellSelector:{value:"td,th",writeOnce:true},events:{validator:s,value:[H,r,Q,P,y,f,k,i]},tags:{validator:F,value:{col:n,table:u,thead:v,tbody:J,tr:I,th:w,td:O},writeOnce:true}}});j.namespace("Plugin").DataTableEvents=g;},"@VERSION@",{requires:["aui-datatable-base"]});AUI.add("aui-datatable-edit",function(au){var ad=au.Lang,be=au.Array,e=ad.isArray,aT=ad.isBoolean,aO=ad.isFunction,J=ad.isObject,aY=ad.isString,aN=ad.String,aL=au.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),a4=function(A){return(A instanceof au.BaseCellEditor);},aq=au.WidgetStdMod,B=au.getClassName,af="add",a5="addOption",aM="baseCellEditor",s="boundingBox",R="calendar",am="cancel",aQ="cell",ay="celleditor",D="checkboxCellEditor",p="checked",aI="click",C="columnset",w="contentBox",aE="data",Q="datatable",M="dateCellEditor",al="dd",V="delete",ap="disk",aG="dotted",aP="dropDownCellEditor",N="edit",Z="editable",f="editor",G="editEvent",aj="editOptions",I="element",aD="elementName",aR="field",c="grip",F="handle",v="hide",aw="hideOnSave",ah="icon",aH="id",o="initEdit",bd="initToolbar",av="initValidator",ab="input",d="inputFormatter",bc="key",ax="label",ar="link",X="mousedown",aa="multiple",m="name",aV="option",a0="options",u="optionsCellEditor",a9="outputFormatter",l="pencil",ak="radioCellEditor",ai="records",k="recordset",ba="remove",a7="rendered",ag="return",n="row",aK="save",aW="selected",aB="selectedAttrName",Y="showToolbar",aZ="submit",S="textAreaCellEditor",y="textCellEditor",P="toolbar",z="unescapeValue",W="validator",a3="value",at="vertical",ae="visible",a1="wrapper",bh=",",i=".",T="",h="#",a6="\n",bb=" ",t=/<br\s*\/?>/gi,E=/[\r\n]/g,b=B(ay,N),g=B(ay,N,af,aV),bg=B(ay,N,al,F),aU=B(ay,N,V,aV),a8=B(ay,N,v,aV),az=B(ay,N,ab,m),aJ=B(ay,N,ab,a3),ao=B(ay,N,ax),q=B(ay,N,ar),aC=B(ay,N,aV,n),U=B(ay,I),aX=B(ay,ax),L=B(ay,aV),x=B(ay,a1),H=B(Q,Z),j=B(ah),ac=B(ah,c,aG,at),aS="<br/>";
var a2=function(){};a2.NAME="dataTableCellEditorSupport";a2.ATTRS={editEvent:{setter:"_setEditEvent",validator:aY,value:aI}};au.mix(a2.prototype,{initializer:function(){var A=this;A.after({render:A._afterRenderEditor});A.on(A.get(G),A._onCellEdit);A.after(A._afterUiSetRecordset,A,"_uiSetRecordset");},getCellEditor:function(bi,bk){var A=this;var bj=bk.get(f);var bl=bi.get(aE).editor;if(bj===false||bl===false){return null;}return bl||bj;},getRecordColumnValue:function(A,bi){return A.getValue(bi.get(aR));},syncEditableColumnsUI:function(){var A=this;var bj=A.get(C);var bi=A.get(k);au.each(bj.idHash,function(bl){var bk=bl.get(f);if(a4(bk)){au.all("[headers="+bl.get(aH)+"]").addClass(H);}});au.each(bi.get(ai),function(bk){var bl=bk.get(aE).editor;var bm=a4(bl);au.all(h+bk.get("id")+">td").each(function(bp,bn){var bo=bj.getColumn(bn);if(bl===false){bp.removeClass(H);}else{if(bm||(bo.get(f)!==false)){bp.addClass(H);}}});});},_afterUiSetRecordset:function(bi){var A=this;A.syncEditableColumnsUI();},_afterRenderEditor:function(bi){var A=this;if(!A.events){A.plug(au.Plugin.DataTableEvents);}},_editCell:function(bm){var A=this;var bo=A.get(C);var bn=A.get(k);var bl=bm.column;var bi=bm.record;A.activeColumnIndex=bo.getColumnIndex(bl);A.activeRecordIndex=bn.getRecordIndex(bi);var bj=bm.alignNode||bm.cell;var bk=A.getCellEditor(bi,bl);if(a4(bk)){if(!bk.get(a7)){bk.on({visibleChange:au.bind(A._onEditorVisibleChange,A),save:au.bind(A._onEditorSave,A)});bk.render();}bk.set(a3,A.getRecordColumnValue(bi,bl));bk.show().move(bj.getXY());}},_onCellEdit:function(bi){var A=this;A._editCell(bi);},_onEditorVisibleChange:function(bn){var bi=this;var bl=bn.currentTarget;var bk=bi.selection;if(bk){var bj=bk.getActiveRecord();var bm=bk.getActiveColumn();var A=bi.getCellNode(bj,bm);var bo=bi.getRowNode(bj);if(bn.newVal){bl._syncFocus();}else{bk.select(A,bo);}}},_onEditorSave:function(bk){var A=this;var bj=bk.currentTarget;var bl=A.get(k);bj.set(a3,bk.newVal);var bi=A.selection;if(bi){bl.updateRecordDataByKey(bi.getActiveRecord(),bi.getActiveColumn().get(bc),bk.newVal);}},_setEditEvent:function(A){return aQ+aL(A);}});au.DataTable.CellEditorSupport=a2;au.DataTable.Base=au.Base.create("dataTable",au.DataTable.Base,[au.DataTable.CellEditorSupport]);var r=au.Component.create({NAME:aM,ATTRS:{editable:{value:false,validator:aT},elementName:{value:a3,validator:aY},footerContent:{value:T},hideOnSave:{value:true,validator:aT},inputFormatter:{value:function(A){if(aY(A)){A=A.replace(E,aS);}return A;}},outputFormatter:{value:function(bi){var A=this;if(aY(bi)){if(A.get(z)){bi=aN.unescapeEntities(bi);}bi=bi.replace(t,a6);}return bi;}},showToolbar:{value:true,validator:aT},strings:{value:{edit:"Edit",save:"Save",cancel:"Cancel"}},tabIndex:{value:1},toolbar:{setter:"_setToolbar",validator:J,value:null},unescapeValue:{value:true,validator:aT},validator:{setter:"_setValidator",validator:J,value:null},value:{value:T},visible:{value:false}},EXTENDS:au.Overlay,UI_ATTRS:[Z,Y,a3],prototype:{CONTENT_TEMPLATE:"<form></form>",ELEMENT_TEMPLATE:null,elements:null,validator:null,_hDocMouseDownEv:null,initializer:function(bi){var A=this;A._initEvents();},destructor:function(){var bi=this;var A=bi._hDocMouseDownEv;var bk=bi.toolbar;var bj=bi.validator;if(A){A.detach();}if(bk){bk.destroy();}if(bj){bj.destroy();}},bindUI:function(){var A=this;A.get(s).on(bc,au.bind(A._onEscKey,A),"down:27");},formatValue:function(bi,bj){var A=this;if(aO(bi)){bj=bi.call(A,bj);}return bj;},getValue:function(){var A=this;return A.formatValue(A.get(d),A.getElementsValue());},_initEvents:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn},initEdit:{defaultFn:A._defInitEditFn,fireOnce:true},initValidator:{defaultFn:A._defInitValidatorFn,fireOnce:true},initToolbar:{defaultFn:A._defInitToolbarFn,fireOnce:true},save:{defaultFn:A._defSaveFn}});A.after({render:A._afterRender,visibleChange:au.debounce(A._debounceVisibleChange,350,A)});A.on({"form-validator:submit":au.bind(A._onSubmit,A)});},_afterRender:function(){var A=this;A._handleInitValidatorEvent();A._handleInitToolbarEvent();},_defCancelFn:function(bi){var A=this;A.hide();},_defInitValidatorFn:function(bi){var A=this;A.validator=new au.FormValidator(A.get(W));},_defInitToolbarFn:function(bj){var A=this;var bi=A.get(Z);A.toolbar=new au.Toolbar(A.get(P)).render(A.footerNode);if(bi){A._uiSetEditable(bi);}},_defSaveFn:function(bi){var A=this;if(A.get(aw)){A.hide();}},_debounceVisibleChange:function(bj){var bi=this;var A=bi._hDocMouseDownEv;if(bj.newVal){if(!A){bi._hDocMouseDownEv=au.getDoc().on(X,au.bind(bi._onDocMouseDownExt,bi));}}else{if(A){A.detach();bi._hDocMouseDownEv=null;}}},_handleCancelEvent:function(){var A=this;A.fire(am);},_handleEditEvent:function(){var A=this;A.fire(N);},_handleInitEditEvent:function(){var A=this;if(A.get(a7)){this.fire(o);}},_handleInitValidatorEvent:function(){var A=this;if(A.get(a7)){this.fire(av);}},_handleInitToolbarEvent:function(){var A=this;if(A.get(a7)&&A.get(Y)){this.fire(bd);}},_handleSaveEvent:function(){var A=this;if(!A.validator.hasErrors()){A.fire(aK,{newVal:A.getValue(),prevVal:A.get(a3)});}},_onDocMouseDownExt:function(bj){var A=this;var bi=A.get(s);if(!bi.contains(bj.target)){A.set(ae,false);}},_onEscKey:function(bi){var A=this;A.hide();},_onSubmit:function(bj){var A=this;var bi=bj.validator;A._handleSaveEvent();if(bi){bi.formEvent.halt();}},_setToolbar:function(bj){var bi=this;var A=bi.getStrings();return au.merge({activeState:false,children:[{label:A[aK],icon:ap,type:aZ},{handler:au.bind(bi._handleCancelEvent,bi),label:A[am]}]},bj);},_setValidator:function(bi){var A=this;return au.merge({boundingBox:A.get(w),bubbleTargets:A},bi);},_uiSetShowToolbar:function(bj){var A=this;var bi=A.footerNode;if(bj){bi.show();}else{bi.hide();}A._handleInitToolbarEvent();},getElementsValue:function(){var A=this;var bi=A.elements;if(bi){return bi.get(a3);}return T;},renderUI:function(){var A=this;if(A.ELEMENT_TEMPLATE){A.elements=au.Node.create(A.ELEMENT_TEMPLATE);A._syncElementsName();
A.setStdModContent(aq.BODY,A.elements);}},_defInitEditFn:function(A){},_syncElementsFocus:function(){var A=this;A.elements.selectText();},_syncElementsName:function(){var A=this;A.elements.setAttribute(m,A.get(aD));},_syncFocus:function(){var A=this;au.later(0,A,A._syncElementsFocus);},_uiSetEditable:function(bj){var A=this;var bi=A.toolbar;if(A.get(a7)&&bi){if(bj){bi.add({handler:au.bind(A._handleEditEvent,A),icon:l,label:A.getString(N)},1);}else{bi.remove(1);}}},_uiSetValue:function(bj){var A=this;var bi=A.elements;if(bi){bi.val(A.formatValue(A.get(a9),bj));}}}});au.BaseCellEditor=r;var bf=au.Component.create({NAME:u,ATTRS:{inputFormatter:{value:null},options:{setter:"_setOptions",value:{},validator:J},outputFormatter:{value:null},selectedAttrName:{value:aW,validator:aY},strings:{value:{add:"Add",cancel:"Cancel",addOption:"Add option",edit:"Edit options",editOptions:"Edit option(s)",name:"Name",remove:"Remove",save:"Save",stopEditing:"Stop editing",value:"Value"}}},EXTENDS:au.BaseCellEditor,UI_ATTRS:[a0],prototype:{EDIT_TEMPLATE:'<div class="'+b+'"></div>',EDIT_OPTION_ROW_TEMPLATE:'<div class="'+aC+'">'+'<span class="'+[bg,j,ac].join(bb)+'"></span>'+'<input class="'+az+'" size="7" placeholder="{titleName}" title="{titleName}" type="text" value="{valueName}" /> '+'<input class="'+aJ+'" size="7" placeholder="{titleValue}" title="{titleValue}" type="text" value="{valueValue}" /> '+'<a class="'+[q,aU].join(bb)+'" href="javascript:void(0);">{remove}</a> '+"</div>",EDIT_ADD_LINK_TEMPLATE:'<a class="'+[q,g].join(bb)+'" href="javascript:void(0);">{addOption}</a> ',EDIT_LABEL_TEMPLATE:'<div class="'+ao+'">{editOptions}</div>',editContainer:null,editSortable:null,options:null,initializer:function(){var A=this;A.on(N,A._onEditEvent);A.on(aK,A._onSave);A.after(bd,A._afterInitToolbar);},addNewOption:function(bk,bl){var A=this;var bj=A.editContainer.one(i+g);var bi=au.Node.create(A._createEditOption(bk||T,bl||T));bj.placeBefore(bi);bi.one(ab).focus();},removeOption:function(A){A.remove();},saveOptions:function(){var A=this;var bl=A.editContainer;if(bl){var bk=bl.all(i+az);var bi=bl.all(i+aJ);var bj={};bk.each(function(bo,bn){var bm=bo.val();var bp=bi.item(bn).val();if(bm&&bp){bj[bp]=bm;}});A.set(a0,bj);A._uiSetValue(A.get(a3));A.toggleEdit();}},toggleEdit:function(){var A=this;A.editContainer.toggle();},_createOptions:function(bj){var bn=this;var A=bn.elements;var bl=[];var bi=[];var bk=bn.OPTION_TEMPLATE;var bo=bn.OPTION_WRAPPER;au.each(bj,function(bs,br){var bq={id:au.guid(),label:bs,name:br,value:br};if(bk){bl.push(ad.sub(bk,bq));}if(bo){bi.push(ad.sub(bo,bq));}});var bp=au.NodeList.create(bl.join(T));var bm=au.NodeList.create(bi.join(T));if(bm.size()){bm.each(function(br,bq){br.prepend(bp.item(bq));});A.setContent(bm);}else{A.setContent(bp);}bn.options=bp;},_createEditBuffer:function(){var bi=this;var A=bi.getStrings();var bj=[];bj.push(ad.sub(bi.EDIT_LABEL_TEMPLATE,{editOptions:A[aj]}));au.each(bi.get(a0),function(bk,bl){bj.push(bi._createEditOption(bk,bl));});bj.push(ad.sub(bi.EDIT_ADD_LINK_TEMPLATE,{addOption:A[a5]}));return bj.join(T);},_createEditOption:function(bj,bk){var bi=this;var A=bi.getStrings();return ad.sub(bi.EDIT_OPTION_ROW_TEMPLATE,{remove:A[ba],titleName:A[m],titleValue:A[a3],valueName:bj,valueValue:bk});},_defInitEditFn:function(bi){var A=this;var bj=au.Node.create(A.EDIT_TEMPLATE);bj.delegate("click",au.bind(A._onEditLinkClickEvent,A),i+q);bj.delegate("keydown",au.bind(A._onEditKeyEvent,A),ab);A.editContainer=bj;A.setStdModContent(aq.BODY,bj.hide(),aq.AFTER);A.editSortable=new au.Sortable({container:bj,handles:[i+bg],nodes:i+aC,opacity:".3"}).delegate.dd.plug(au.Plugin.DDConstrained,{constrain:bj,stickY:true});A._syncEditOptionsUI();},_getSelectedOptions:function(){var A=this;var bi=[];A.options.each(function(bj){if(bj.get(A.get(aB))){bi.push(bj);}});return au.all(bi);},_onEditEvent:function(bi){var A=this;A._handleInitEditEvent();A.toggleEdit();A._syncEditOptionsUI();},_onEditLinkClickEvent:function(bi){var A=this;var bj=bi.currentTarget;if(bj.test(i+g)){A.addNewOption();}else{if(bj.test(i+a8)){A.toggleEdit();}else{if(bj.test(i+aU)){A.removeOption(bj.ancestor(i+aC));}}}bi.halt();},_onEditKeyEvent:function(bi){var A=this;var bj=bi.currentTarget;if(bi.isKey(ag)){var bk=bj.next(ab);if(bk){bk.selectText();}else{A.addNewOption();}bi.halt();}},_onSave:function(bi){var A=this;A.saveOptions();},_setOptions:function(bi){var A={};if(e(bi)){be.each(bi,function(bj){A[bj]=bj;});}else{if(J(bi)){A=bi;}}return A;},_syncEditOptionsUI:function(){var A=this;A.editContainer.setContent(A._createEditBuffer());},_uiSetOptions:function(bi){var A=this;A._uiSetValue(A.get(a3));A._createOptions(bi);A._syncElementsName();},_uiSetValue:function(bj){var A=this;var bi=A.options;if(bi&&bi.size()){bi.set(A.get(aB),false);if(bj){if(!e(bj)){bj=bj.split(bh);}be.each(bj,function(bk){bi.filter('[value="'+ad.trim(bk)+'"]').set(A.get(aB),true);});}}return bj;}}});au.BaseOptionsCellEditor=bf;var aA=au.Component.create({NAME:y,EXTENDS:au.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<input autocomplete="off" class="'+U+'" type="text" />'}});au.TextCellEditor=aA;var aF=au.Component.create({NAME:S,EXTENDS:au.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<textarea class="'+U+'"></textarea>'}});au.TextAreaCellEditor=aF;var O=au.Component.create({NAME:aP,ATTRS:{multiple:{value:false,validator:aT}},EXTENDS:au.BaseOptionsCellEditor,UI_ATTRS:[aa],prototype:{ELEMENT_TEMPLATE:'<select class="'+U+'"></select>',OPTION_TEMPLATE:'<option value="{value}">{label}</option>',getElementsValue:function(){var A=this;if(A.get(aa)){return A._getSelectedOptions().get(a3);}return A.elements.get(a3);},_syncElementsFocus:function(){var A=this;A.elements.focus();},_uiSetMultiple:function(bj){var A=this;var bi=A.elements;if(bj){bi.setAttribute(aa,aa);}else{bi.removeAttribute(aa);}}}});au.DropDownCellEditor=O;var an=au.Component.create({NAME:D,ATTRS:{selectedAttrName:{value:p}},EXTENDS:au.BaseOptionsCellEditor,prototype:{ELEMENT_TEMPLATE:'<div class="'+U+'"></div>',OPTION_TEMPLATE:'<input class="'+L+'" id="{id}" name="{name}" type="checkbox" value="{value}"/>',OPTION_WRAPPER:'<label class="'+x+'" for="{id}"><span class="'+aX+'">{label}</span></label>',getElementsValue:function(){var A=this;
return A._getSelectedOptions().get(a3);},_syncElementsFocus:function(){var A=this;var bi=A.options;if(bi&&bi.size()){bi.item(0).focus();}},_syncElementsName:function(){var A=this;var bi=A.options;if(bi){bi.setAttribute(m,A.get(aD));}}}});au.CheckboxCellEditor=an;var K=au.Component.create({NAME:ak,EXTENDS:au.CheckboxCellEditor,prototype:{OPTION_TEMPLATE:'<input class="aui-field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',getElementsValue:function(){var A=this;return A._getSelectedOptions().get(a3)[0];}}});au.RadioCellEditor=K;var a=au.Component.create({NAME:M,EXTENDS:au.BaseCellEditor,ATTRS:{bodyContent:{value:T},calendar:{setter:"_setCalendar",validator:J,value:null}},prototype:{ELEMENT_TEMPLATE:'<input class="'+U+'" type="hidden" />',initializer:function(){var A=this;A.on("calendar:select",au.bind(A._onDateSelect,A));},getElementsValue:function(){var A=this;return A.calendar.getFormattedSelectedDates().join(bh);},_afterRender:function(){var A=this;au.DateCellEditor.superclass._afterRender.apply(A,arguments);A.calendar=new au.Calendar(A.get(R)).render(A.bodyNode);},_onDateSelect:function(bi){var A=this;A.elements.val(bi.date.formatted.join(bh));},_setCalendar:function(bi){var A=this;return au.merge({bubbleTargets:A},bi);},_uiSetValue:function(bj){var A=this;var bi=A.calendar;if(bi){if(bj&&aY(bj)){bj=bj.split(bh);}A.calendar.set("dates",bj);}}}});au.DateCellEditor=a;},"@VERSION@",{skinnable:true,requires:["aui-calendar","aui-datatable-events","aui-toolbar","aui-form-validator","overlay","sortable"]});AUI.add("aui-datatable-selection",function(B){var j=B.Lang,s=j.isBoolean,v=j.isString,G=B.getClassName,i=B.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),o="cell",m="columnset",g="columnsetChange",r="datatable",E="down",J="esc",u="focused",H="host",p="id",d="keydown",x="left",q="mousedown",D="mouseEvent",w="multiple",I="recordset",f="recordsetChange",l="return",t="right",n="row",c="select",k="selected",y="selectRow",e="tab",z="tabindex",F="tr",h="up",a=G(r,o,k),C=G(r,n,k);var b=B.Base.create("dataTableSelection",B.Plugin.Base,[],{activeColumnIndex:-1,activeRecordIndex:-1,handlerKeyDown:null,selectedCellHash:null,selectedColumnHash:null,selectedRowHash:null,initializer:function(){var A=this;A.selectedCellHash={};A.selectedColumnHash={};A.selectedRowHash={};A.publish({select:{defaultFn:A._defSelectFn}});A.afterHostEvent(A.get(D),A._afterMouseEvent);A.afterHostEvent(g,A._afterHostColumnsetChange);A.afterHostEvent(f,A._afterHostRecordsetChange);A.handlerKeyDown=B.getDoc().on(d,B.bind(A._afterKeyEvent,A));},destroy:function(){var A=this;var K=A.handlerKeyDown;if(K){K.detach();}},getActiveColumn:function(){var A=this;var K=A.get(H);return K.get(m).getColumn(A.activeColumnIndex);},getActiveRecord:function(){var A=this;var K=A.get(H);return K.get(I).getRecord(A.activeRecordIndex);},isCellSelected:function(K){var A=this;return A.selectedCellHash[K.get(p)];},isColumnSelected:function(A){},isRowSelected:function(K){var A=this;return A.selectedRowHash[K.get(p)];},select:function(K,Q){var A=this;var N=A.get(H);var P=N.get(m);var O=N.get(I);var M=P.getColumnByCell(K);var L=O.getRecordByRow(Q||K.ancestor(F));A.activeColumnIndex=P.getColumnIndex(M);A.activeRecordIndex=O.getRecordIndex(L);if(K){A.selectCell(K);}if(A.get(y)&&Q){A.selectRow(Q);}},selectCell:function(K){var A=this;if(!A.get(w)){A.unselectAllCells();}A.selectedCellHash[K.get(p)]=K;K.setAttribute(z,0).focus();K.addClass(a);},selectColumn:function(A){},selectRow:function(K){var A=this;if(!A.get(w)){A.unselectAllRows();}A.selectedRowHash[K.get(p)]=K;K.addClass(C);},toggleCell:function(K,L){var A=this;if(L||!A.isCellSelected(K)){A.selectCell(K);}else{A.unselectCell(K);}},toggleColumn:function(A,K){},toggleRow:function(L,K){var A=this;if(K||!A.isRowSelected(L)){A.selectRow(L);}else{A.unselectRow(L);}},unselectCell:function(K){var A=this;delete A.selectedCellHash[K.get(p)];K.removeAttribute(z);K.removeClass(a);},unselectColumn:function(A){},unselectRow:function(K){var A=this;delete A.selectedRowHash[K.get(p)];K.removeClass(C);},unselectAllCells:function(){var A=this;B.each(A.selectedCellHash,B.bind(A.unselectCell,A));},unselectAllColumns:function(){},unselectAllRows:function(){var A=this;B.each(A.selectedRowHash,B.bind(A.unselectRow,A));},_afterHostColumnsetChange:function(K){var A=this;A._cleanUp();},_afterHostRecordsetChange:function(K){var A=this;A._cleanUp();},_afterMouseEvent:function(K){var A=this;A._handleSelectEvent(K);},_afterKeyEvent:function(N){var A=this;var M=A.get(H);var L=A.getActiveColumn();var K=A.getActiveRecord();if(!M.get(u)||!L||!K){return;}if(M.events){M.events.updateEventPayload(M.getCellNode(K,L),N);}if(N.isNavKey()){if(N.isKey(J)){A._onEscKey(N);}else{if(N.isKey(l)){A._onReturnKey(N);}else{A._navigate(N);}}N.halt();}},_cleanUp:function(){var A=this;A.selectedCellHash={};A.selectedColumnHash={};A.selectedRowHash={};},_defSelectFn:function(K){var A=this;A.select(K.cell,K.row);},_navigate:function(K){var A=this;A._updateNavKeyInfo(K);A._handleSelectEvent(K);},_onEscKey:function(M){var A=this;var L=A.get(H);var K=L.getCellEditor(M.record,M.column);if(K){K.hide();}},_onReturnKey:function(L){var A=this;var K=A.get(H);K._editCell(L);},_handleSelectEvent:function(K){var A=this;A.fire(c,{cell:K.cell,column:K.column,inHead:K.inHead,liner:K.liner,originalEvent:K.originalEvent,row:K.row,record:K.record});},_updateNavKeyInfo:function(A){var T=this;var U=T.get(H);var K=A.originalEvent;var M=U.get(m);var Q=A.column.keyIndex;var S=U.get(I);var N=S.getRecordIndex(A.record);var L=K.ctrlKey||K.metaKey;var R=K.shiftKey;if(K.isKey(x)||(R&&K.isKey(e))){if(L){Q=0;}else{Q--;}}else{if(K.isKey(t)||(!R&&K.isKey(e))){if(L){Q=M.getLength()-1;}else{Q++;}}else{if(K.isKey(E)){if(L){N=S.getLength()-1;}else{N++;}}else{if(K.isKey(h)){if(L){N=0;}else{N--;}}}}}Q=Math.max(Math.min(Q,M.getLength()-1),0);N=Math.max(Math.min(N,S.getLength()-1),0);if(U.events){var O=M.getColumn(Q);var P=S.getRecord(N);U.events.updateEventPayload(U.getCellNode(P,O),A);
}},_setMouseEvent:function(A){return o+i(A);}},{NS:"selection",NAME:"dataTableSelection",ATTRS:{selectRow:{value:false,validator:s},multiple:{value:false,validator:s},mouseEvent:{setter:"_setMouseEvent",value:q,validator:v}}});B.namespace("Plugin").DataTableSelection=b;},"@VERSION@",{skinnable:true,requires:["aui-datatable-base"]});AUI.add("aui-datatable",function(a){},"@VERSION@",{use:["aui-datatable-base","aui-datatable-events","aui-datatable-edit","aui-datatable-selection"],skinnable:true});