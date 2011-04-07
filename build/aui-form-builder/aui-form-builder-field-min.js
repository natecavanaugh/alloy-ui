AUI.add("aui-form-builder-field",function(bG){var bA=bG.Lang,aD=bA.isArray,af=bA.isString,c="acceptChildren",aw="boundingBox",bO="builder",bW="button",B="buttons",b1="buttonsNode",bc="checkbox",C="checked",b5="children",bS="clearfix",ax="close",az="component",b0="contentBox",a8="container",x="default",aF="delete",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",V="dropNode",ay="dropZone",aW="dropZoneNode",bd="duplicate",F="edit",bk="",a3="field",f="fields",bq="for",q="form",aN="formBuilder",bb="form-builder-field",n="helper",aj="hidden",p="icon",bR="id",Z="label",X="labelNode",aU="metadata",ap="name",b7="node",a="panel",aO="portalLayout",a6="predefinedValue",a4="proxy",ah="required",bl="state",aZ="settings",ai="settingsFormNode",bK="showLabel",al="size",O=" ",ag="string",bI="templateNode",bx="zone",aG="widget",v=bG.ClassNameManager.getClassName,a1=v(az),a9=v(a3,Z),b4=v(n,bS),U=v(n,aj),bt=v(bl,x),w=v(q,bO,bW),ak=v(q,bO,bW,aF),aT=v(q,bO,bW,bd),G=v(q,bO,bW,F),b6=v(q,bO,p),i=v(q,bO,p,aF),s=v(q,bO,p,bd),bC=v(q,bO,p,F),bp=v(q,bO,a3),be=v(q,bO,a3,B),aX=v(q,bO,ao,b7),by=v(q,bO,ao,bx),bQ=v(aG),bE='<li class="'+[bQ,a1,bp].join(O)+'"></li>',l='<div class="'+[be,U].join(O)+'">'+'<a class="'+[w,G].join(O)+'" href="javascript:;" title="Edit">'+'<div class="'+[b6,bC].join(O)+'"></div>'+"</a>"+'<a class="'+[w,aT].join(O)+'" href="javascript:;" title="Duplicate">'+'<div class="'+[b6,s].join(O)+'"></div>'+"</a>"+'<a class="'+[w,ak].join(O)+'" href="javascript:;" title="Delete">'+'<div class="'+[b6,i].join(O)+'"></div>'+"</a>"+"</div>",bT='<div class="'+b4+'"></div>',aL='<label class="'+a9+'"></label>',T='<ul class="'+by+'"></ul>';var b3=bG.Component.create({NAME:bb,ATTRS:{acceptChildren:{value:true},dataType:{value:ag},formBuilder:{value:undefined},id:{value:bk},icon:{value:bk},label:{value:bk},name:{valueFn:function(){var A=this;return A.get(N)+(++bG.Env._uidx);}},parent:{value:null},predefinedValue:{value:bk},required:{setter:bG.DataType.Boolean.parse,value:false},selected:{setter:bG.DataType.Boolean.parse,value:false},showLabel:{setter:bG.DataType.Boolean.parse,value:true},template:{value:bk},type:{value:bk},buttonsNode:{valueFn:function(){return bG.Node.create(l);}},dropZoneNode:{valueFn:function(){return bG.Node.create(T);}},labelNode:{valueFn:function(){return bG.Node.create(aL);}},templateNode:{valueFn:"getNode"}},AUGMENTS:[bG.FormBuilderFieldSupport],UI_ATTRS:[c,a6,Z,ap,bK],HTML_PARSER:{buttonsNode:bu+be,dropZoneNode:bu+by,labelNode:Z+bu+a9},prototype:{BOUNDING_TEMPLATE:bE,initializer:function(){var A=this;A.get(aw).setData(a3,A);},bindUI:function(){var A=this;},renderUI:function(){var A=this;var cb=A.get(aw);var cc=A.get(b1);var L=A.get(b0);var ca=A.get(X);var b9=A.get(bI);if(!cb.contains(cc)){cb.prepend(cc);}if(!L.contains(ca)){L.append(ca);ca.setAttribute(bq,b9.get(bR));}if(!L.contains(b9)){L.append(b9);}},saveSettings:function(){var A=this;var L=A.get(aN);var b9=L.get(ai);bG.Array.each(bG.io._serialize(b9._node).split("&"),function(ca){var cb=ca.split("=");A.set(cb[0],decodeURIComponent(cb[1]));});},renderSettings:function(){var A=this;var ca=A.get(aN);var cb=ca.get(ai);if(!A.fieldSettingsNode){A.fieldSettingsNode=bG.Node.create(bT);var cc=bG.Node.create(bT);A.labelField=new bG.Field({type:"text",name:Z,labelText:"Label",value:A.get(Z)}).render(cc);A.labelField.get(b7).on({keyup:bG.bind(A._onLabelKeyUp,A)});A.showLabelField=new bG.Field({type:"checkbox",name:bK,labelText:"Show label",labelAlign:"left",value:A.get(bK)}).render(cc);var L=A.showLabelField.get(b7);L.set(C,A.get(bK));L.on({change:bG.bind(A._onSettingsFieldChange,A)});A._renderSettingsFields([{type:"text",name:ap,labelText:"Name",value:A.get(ap)},{type:"text",name:a6,labelText:"Default value",value:A.get(a6)}],cc);A.requiredField=new bG.Field({type:"checkbox",name:ah,labelText:"Required",labelAlign:"left",value:ah}).render(cc);var b9=A.requiredField.get(b7);b9.set(C,A.get(ah));b9.on({change:bG.bind(A._onSettingsFieldChange,A)});A.propertiesPanel=new bG.Panel({bodyContent:cc,collapsible:true,title:"Properties"}).render();A.fieldSettingsNode.append(A.propertiesPanel.get(aw));}cb.setContent(A.fieldSettingsNode);},getHTML:function(){},getNode:function(){},_onLabelKeyUp:function(L){var A=this;var ca=L.target;var b9=ca.val();A.set(Z,b9);},_onSettingsFieldChange:function(L){var A=this;var ca=L.target;var b9=ca.val();if(ca.get(N)==bc){b9=ca.get(C);}A.set(ca.get(ap),b9);},_renderSettingsFields:function(b9,L){var A=this;bG.each(b9,function(cb){var cc=new bG.Field(cb).render(L);var ca=cc.get(b7);if(cb.type==bc){ca.set(C,cb.value);}A[cb.name+"Field"]=cc;});},_uiSetAcceptChildren:function(cb){var A=this;var b9=A.get(aw);var ca=A.get(aW);var L=b9.one(bu+by);if(cb&&!L){b9.append(ca);}else{if(!cb&&L){L.remove();}else{if(cb&&L){A.set(aW,L);}}}},_uiSetLabel:function(b9){var A=this;var L=A.get(X);L.setContent(b9);},_uiSetName:function(b9){var A=this;var L=A.get(bI);L.set(ap,b9);},_uiSetPredefinedValue:function(b9){var A=this;var L=A.get(bI);L.val(b9);},_uiSetShowLabel:function(b9){var A=this;var L=A.get(X);L.toggleClass(U,!b9);}}});bG.FormBuilderField=b3;bG.FormBuilder.types["field"]=bG.FormBuilderField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,ar=function(A){return(A instanceof bG.Node);},aM=function(A){return(A instanceof bG.NodeList);},aS=bG.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),aw="boundingBox",bW="button",bU="buttonType",b0="contentBox",a8="container",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",bk="",a3="field",f="fields",bb="form-builder-field",ae="form-builder-button-field",bR="id",p="icon",aI="input",Z="label",ap="name",b7="node",bL="option",bJ="options",aO="portalLayout",a6="predefinedValue",a4="proxy",bv="reset",aV="selected",bz="selectedIndex",bj="submit",O=" ",ac="strings",ba="template",bI="templateNode",bm="text",N="type",m="value",v=bG.ClassNameManager.getClassName,at=v(a3,aI),bN=v(a3,aI,bm),bp=v(bb),P=v(bb,b7),bt=v(bl,x),bn='<input id="{id}" class="'+[P,at].join(O)+'" name="{name}" type="{type}" value="{value}" />',b8=[bj,bv,bW];
var R=bG.Component.create({NAME:ae,ATTRS:{acceptChildren:{value:false,readOnly:true},buttonType:{value:bj,validator:function(A){return bG.Array(b8).indexOf(A.toLowerCase())>-1;}},predefinedValue:{value:aS(bj)},showLabel:{value:false},strings:{value:{button:"Button",reset:"Reset",submit:"Submit"}},template:{valueFn:function(){return bn;}}},UI_ATTRS:[c,a6,Z,ap,bU,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{getHTML:function(){var A=this;var b9=A.get(ba);var cd=A.get(bR);var cb=A.get(Z);var ca=A.get(ap);var L=A.get(bU);var cc=A.get(a6);return bG.substitute(b9,{id:cd,label:cb,name:ca,type:L,value:cc});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var cd=this;var L=cd.get(aN);var A=L.get(ai);var cc=cd.get(bU);var ce=cd.get(ac);bG.FormBuilderButtonField.superclass.renderSettings.apply(cd,arguments);if(!cd._renderedButtonSettings){cd._renderedButtonSettings=true;var cb=cd.propertiesPanel.get(d);var cg=[];bG.each(b8,function(ch){cg.push({labelText:ce[ch],value:ch});});var cf=new bG.Select({labelText:"Button type",name:bU,options:cg}).render(cb.item(0));var b9=cf.get(b7);b9.on({change:bG.bind(cd._onButtonTypeChange,cd)});var ca=bG.Array(b8).indexOf(cc);b9.all(bL).item(ca).set(aV,true);}},_onButtonTypeChange:function(L){var A=this;var b9=L.target;A.set(bU,b9.get(m));},_uiSetButtonType:function(b9){var A=this;var L=A.get(bI);L.set(N,b9);}}});bG.FormBuilderButtonField=R;bG.FormBuilder.types["button"]=bG.FormBuilderButtonField;var bA=bG.Lang,aD=bA.isArray,a0=bA.isBoolean,bh=bA.isNumber,af=bA.isString,aB="boolean",aw="boundingBox",d="bodyContent",bc="checkbox",C="checked",an="choice",b0="contentBox",a8="container",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",bk="",a3="field",f="fields",bb="form-builder-field",bX="form-builder-checkbox-field",bR="id",p="icon",aJ="inline",Z="label",g="labels",ap="name",b7="node",aO="portalLayout",a6="predefinedValue",a4="proxy",al="size",O=" ",ba="template",bI="templateNode",m="value",v=bG.ClassNameManager.getClassName,b=v(a3),bw=v(a3,bc),bD=v(a3,an),bp=v(bb),bY=v(bb,bc),P=v(bb,b7),bt=v(bl,x),aa=v(a3,g,aJ),bE='<li class="'+[bQ,a1,bp,bY].join(O)+'"></li>',aA='<input id="{id}" class="'+[P,b,bw,bD].join(O)+'" name="{name}" type="checkbox" value="{value}" {checked} />';var S=bG.Component.create({NAME:bX,ATTRS:{dataType:{value:aB},predefinedValue:{setter:bG.DataType.Boolean.parse,value:false},template:{valueFn:function(){return aA;}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,a6,Z,ap,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{BOUNDING_TEMPLATE:bE,bindUI:function(){var A=this;bG.FormBuilderCheckBoxField.superclass.bindUI.apply(A,arguments);var L=A.get(bI);L.on({"change":bG.bind(A._onValueChange,A)});},renderUI:function(){var A=this;var L=A.get(b0);var b9=A.get(bI);var ca=A.get(X);bG.FormBuilderCheckBoxField.superclass.renderUI.apply(A,arguments);ca.insert(b9,ca,"before");},getHTML:function(){var A=this;var L=A.get(ba);var cb=A.get(C);var cd=A.get(bR);var ca=A.get(Z);var b9=A.get(ap);var cc=A.get(a6);return bG.substitute(L,{checked:cb?'checked="checked"':bk,id:cd,label:ca,name:b9,value:cc});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var L=this;var ca=L.get(aN);var cb=ca.get(ai);bG.FormBuilderCheckBoxField.superclass.renderSettings.apply(L,arguments);if(!L._renderedCheckboxSettings){L._renderedCheckboxSettings=true;L.predefinedValueField.destroy();var A=L.propertiesPanel.get(d);var b9=new bG.Field({type:"checkbox",name:a6,labelText:"Checked",labelAlign:"left"}).render(A.item(0));L.checkedFieldNode=b9.get(b7);L.checkedFieldNode.on({change:bG.bind(L._onValueChange,L)});L.checkedFieldNode.set(C,L.get(a6));}},_onValueChange:function(L){var A=this;var b9=L.target;A.set(a6,b9.get(C));},_uiSetPredefinedValue:function(ca){var A=this;var b9=A.get(bI);var L=A.checkedFieldNode;if(L){L.set(C,ca);}b9.set(C,ca);}}});bG.FormBuilderCheckBoxField=S;bG.FormBuilder.types["checkbox"]=bG.FormBuilderCheckBoxField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,ar=function(A){return(A instanceof bG.Node);},aM=function(A){return(A instanceof bG.NodeList);},aw="boundingBox",b0="contentBox",a8="container",bu=".",ao="drop",bk="",a3="field",f="fields",bb="form-builder-field",z="form-builder-fieldset-field",bR="id",p="icon",Z="label",ap="name",b7="node",a6="predefinedValue",O=" ",ba="template",bI="templateNode",bm="text",m="value",bx="zone",v=bG.ClassNameManager.getClassName,bp=v(bb),P=v(bb,b7),by=v(q,bO,ao,bx),a5='<fieldset id="{id}" class="'+[P].join(O)+'"></fieldset>',j='<legend class="'+a9+'"></legend>';var t=bG.Component.create({NAME:z,ATTRS:{acceptChildren:{value:true,readOnly:true},dataType:{value:undefined},template:{valueFn:function(){return a5;}},labelNode:{valueFn:function(){return bG.Node.create(j);}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,Z,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{CONTENT_TEMPLATE:a5,renderUI:function(){var A=this;var cb=A.get(aw);var cc=A.get(b1);var L=A.get(b0);var ca=A.get(X);var b9=A.get(bI);if(!cb.contains(cc)){cb.prepend(cc);}if(!L.contains(ca)){L.append(ca);}},getHTML:function(){var A=this;var L=A.get(ba);var b9=A.get(bR);return bG.substitute(L,{id:b9});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var A=this;var b9=A.get(aN);var ca=b9.get(ai);if(!A._renderedFieldsetSettings){A._renderedFieldsetSettings=true;A.fieldSettingsNode=bG.Node.create(bT);var cb=bG.Node.create(bT);A.labelField=new bG.Field({type:"text",name:Z,labelText:"Label",value:A.get(Z)}).render(cb);A.labelField.get(b7).on({keyup:bG.bind(A._onLabelKeyUp,A)});A.showLabelField=new bG.Field({type:"checkbox",name:bK,labelText:"Show label",labelAlign:"left",value:A.get(bK)}).render(cb);var L=A.showLabelField.get(b7);L.set(C,A.get(bK));
L.on({change:bG.bind(A._onSettingsFieldChange,A)});A.propertiesPanel=new bG.Panel({bodyContent:cb,collapsible:true,title:"Properties"}).render();A.fieldSettingsNode.append(A.propertiesPanel.get(aw));}ca.setContent(A.fieldSettingsNode);},_uiSetAcceptChildren:function(cb){var A=this;var L=A.get(b0);var ca=A.get(aW);var b9=L.one(bu+by);if(cb&&!b9){L.append(ca);}else{if(!cb&&b9){b9.remove();}else{if(cb&&b9){A.set(aW,b9);}}}},}});bG.FormBuilderFieldsetField=t;bG.FormBuilder.types["fieldset"]=bG.FormBuilderFieldsetField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,ar=function(A){return(A instanceof bG.Node);},aM=function(A){return(A instanceof bG.NodeList);},aw="boundingBox",b0="contentBox",a8="container",bu=".",bk="",a3="field",f="fields",bb="form-builder-field",bZ="form-builder-file-upload-field",bR="id",p="icon",Z="label",ap="name",b7="node",a6="predefinedValue",O=" ",ba="template",bI="templateNode",bm="text",m="value",v=bG.ClassNameManager.getClassName,bp=v(bb),P=v(bb,b7),bt=v(bl,x),bi='<input id="{id}" class="'+[P].join(O)+'" name="{name}" type="file" value="{value}" />';var D=bG.Component.create({NAME:bZ,ATTRS:{template:{valueFn:function(){return bi;}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,a6,Z,ap,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{getHTML:function(){var A=this;var L=A.get(ba);var cd=A.get(bR);var ca=A.get(Z);var b9=A.get(ap);var cb=A.get(al);var cc=A.get(a6);return bG.substitute(L,{id:cd,label:ca,name:b9,value:cc});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var A=this;var b9=A.get(aN);var ca=b9.get(ai);if(!A._renderedFileUploadSettings){A._renderedFileUploadSettings=true;A.fieldSettingsNode=bG.Node.create(bT);var cb=bG.Node.create(bT);A.labelField=new bG.Field({type:"text",name:Z,labelText:"Label",value:A.get(Z)}).render(cb);A.labelField.get(b7).on({keyup:bG.bind(A._onLabelKeyUp,A)});A.showLabelField=new bG.Field({type:"checkbox",name:bK,labelText:"Show label",labelAlign:"left",value:A.get(bK)}).render(cb);var L=A.showLabelField.get(b7);L.set(C,A.get(bK));L.on({change:bG.bind(A._onSettingsFieldChange,A)});A._renderSettingsFields([{type:"text",name:ap,labelText:"Name",value:A.get(ap)},{type:"checkbox",name:ah,labelText:"Required",labelAlign:"left",value:A.get(ah)}],cb);A.propertiesPanel=new bG.Panel({bodyContent:cb,collapsible:true,title:"Properties"}).render();A.fieldSettingsNode.append(A.propertiesPanel.get(aw));}ca.setContent(A.fieldSettingsNode);}}});bG.FormBuilderFileUploadField=D;bG.FormBuilder.types["fileupload"]=bG.FormBuilderFileUploadField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,ar=function(A){return(A instanceof bG.Node);},aM=function(A){return(A instanceof bG.NodeList);},aS=bG.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),H="add",ad="addNode",aw="boundingBox",bW="button",bU="buttonType",b0="contentBox",a8="container",x="default",aY="defaultName",r="defaultOptions",y="defaultValue",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",bk="",a3="field",f="fields",bb="form-builder-field",E="form-builder-multiple-choice-field",p="icon",bR="id",aI="input",Y="item",Z="label",bV="multiple",ap="name",b7="node",bL="option",bg="optionTemplate",bJ="options",a6="predefinedValue",a4="proxy",o="remove",bv="reset",bj="submit",O=" ",ba="template",bI="templateNode",bm="text",N="type",m="value",v=bG.ClassNameManager.getClassName,at=v(a3,aI),bN=v(a3,aI,bm),k=v(a3,bJ,H),K=v(a3,bJ,Y),J=v(a3,bJ,Y,aI),bo=v(a3,bJ,Y,aI,ap),bH=v(a3,bJ,Y,aI,m),aR=v(a3,bJ,Y,o),bp=v(bb),P=v(bb,b7),bt=v(bl,x),bs='<div class="'+[K,aa,b4].join(O)+'">'+'<input type="text" class="'+[J,bo,at,bN].join(O)+'" value="{name}" />'+'<input type="text" class="'+[J,bH,at,bN].join(O)+'" value="{value}" />'+'<a href="javascript:;" class="'+aR+'">&nbsp;</a>'+"</div>";TPL_ADD='<a class="'+k+'" href="javascript:;">Add an option</a>',ENTER="ENTER";var aE=bG.Component.create({NAME:bJ,ATTRS:{allowClear:{value:false},defaultName:{value:bk},defaultValue:{value:bk},options:{value:[],getter:"_getOptions",validator:aD},addNode:{valueFn:function(){return bG.Node.create(TPL_ADD);}}},HTML_PARSER:{addNode:bu+k},UI_ATTRS:[bJ],EXTENDS:bG.Widget,prototype:{renderUI:function(){var A=this;var L=A.get(aw);var b9=A.get(ad);if(!b9.inDoc()){L.append(b9);}},bindUI:function(){var A=this;var L=A.get(aw);var b9=A.get(ad);b9.on("click",bG.bind(A._onClickAdd,A));L.delegate("click",bG.bind(A._onClickOptionRemove,A),bu+aR);L.delegate("keypress",bG.bind(A._onKeyPressOption,A),bu+J);},add:function(L){var A=this;var b9=A.get(bJ);b9.push(L);A.set(bJ,b9);},clear:function(){var A=this;if(A.get(ALLOW_CLEAR)){A.set(bJ,[]);}},remove:function(b9){var A=this;var L=A.get(b0);var ca=A._getOptionNode(b9);if(ca){ca.remove();}A.items=L.all(bu+K);},_addNewOption:function(){var L=this;var b9=L.get(b0);var ca=L._createOption({name:L.get(aY),value:L.get(y)});ca=bG.Node.create(ca);b9.append(ca);var A=ca.one(aI);A.focus();A.select();L.items=b9.all(bu+K);return ca;},_createOption:function(L){var A=this;return bG.substitute(bs,L);},_getOptionNode:function(L){var A=this;return A.items.item(L);},_getOptions:function(b9){var A=this;var L=[];if(A.items){bG.each(A.items,function(ca){var cb=ca.one(bu+bo);var cc=ca.one(bu+bH);L.push({name:cb.val(),value:cc.val()});});}else{L=b9;}return L;},_indexOfTarget:function(b9){var A=this;var L=b9.ancestor(bu+K);return A.items.indexOf(L);},_onClickAdd:function(L){var A=this;A._addNewOption();},_onClickOptionRemove:function(ca){var A=this;var b9=A.get(bJ);var L=A._indexOfTarget(ca.target);A.remove(L);},_onKeyPressOption:function(cb){var A=this;var ca=A.get(bJ);var cd=cb.currentTarget;var L=A.items;if(cb.isKey(ENTER)){var b9=A._indexOfTarget(cd);var cc=cd.hasClass(bH);if((b9==L.size()-1)&&cc){A._addNewOption();}}},_uiSetOptions:function(ca){var A=this;var b9=[];var L=A.get(b0);L.empty();bG.each(ca,function(cb){L.append(A._createOption(cb));
});A.items=L.all(bu+K);}}});var e=bG.Component.create({NAME:E,ATTRS:{acceptChildren:{value:false,readOnly:true},options:{value:[{name:"option 1",value:"value 1"},{name:"option 2",value:"value 2"},{name:"option 3",value:"value 3"}]},optionTemplate:{value:'<option value="{value}">{name}</option>'},},UI_ATTRS:[c,a6,Z,ap,bJ,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{initializer:function(){var A=this;bG.FormBuilderMultipleChoiceField.superclass.initializer.apply(A,arguments);},getNode:function(){var A=this;return bG.FormBuilderMultipleChoiceField.superclass.getNode.apply(A,arguments);},renderSettings:function(){var A=this;bG.FormBuilderMultipleChoiceField.superclass.renderSettings.apply(A,arguments);if(!A._renderedMultipleChoiceSettings){A._renderedMultipleChoiceSettings=true;var L=bG.Node.create(bT);A.optionsPanel=new bG.Panel({bodyContent:L,collapsible:true,title:"Options"}).render();A.options=new aE({options:A.get(bJ)}).render(L);A.fieldSettingsNode.append(A.optionsPanel.get(aw));}},saveSettings:function(){var A=this;bG.FormBuilderMultipleChoiceField.superclass.saveSettings.apply(A,arguments);A.set(bJ,A.options.get(bJ));},_uiSetOptions:function(b9){var A=this;var L=A.get(bI);L.empty();bG.each(b9,function(ca){L.append(bG.substitute(A.get(bg),ca));});}}});bG.FormBuilderMultipleChoiceField=e;bG.FormBuilder.types["multiple-choice"]=bG.FormBuilderMultipleChoiceField;var bA=bG.Lang,aD=bA.isArray,a0=bA.isBoolean,bh=bA.isNumber,af=bA.isString,aw="boundingBox",d="bodyContent",C="checked",an="choice",b0="contentBox",a8="container",bu=".",bk="",a3="field",f="fields",bb="form-builder-field",aQ="form-builder-radio-field",bR="id",p="icon",aJ="inline",Z="label",g="labels",ap="name",b7="node",bP="optionsContainerNode",a6="predefinedValue",I="radio",al="size",O=" ",ba="template",bI="templateNode",m="value",v=bG.ClassNameManager.getClassName,b=v(a3),bD=v(a3,an),bp=v(bb),av=v(bb,I),P=v(bb,b7),M=v(bb,bJ,a8),bt=v(bl,x),aa=v(a3,g,aJ),bE='<li class="'+[bQ,a1,bp,av].join(O)+'"></li>',Q='<div class="'+M+'"></div>',aC='<input id="{id}" class="'+[P,b,bD].join(O)+'" name="{name}" type="radio" value="{value}" {checked} />';var h=bG.Component.create({NAME:aQ,ATTRS:{name:{value:I},optionTemplate:{value:aC},template:{valueFn:function(){return aC;}},optionsContainerNode:{valueFn:function(){return bG.Node.create(Q);}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,a6,Z,ap,bK,bJ],CSS_PREFIX:bp,HTML_PARSER:{optionsContainerNode:bu+M,templateNode:bu+P},EXTENDS:bG.FormBuilderMultipleChoiceField,prototype:{BOUNDING_TEMPLATE:bE,renderUI:function(){var A=this;var ca=A.get(aw);var cc=A.get(b1);var L=A.get(b0);var b9=A.get(X);if(!ca.contains(cc)){ca.prepend(cc);}if(!L.contains(b9)){L.append(b9);}var cb=A.get(bP);if(!L.contains(cb)){L.append(cb);}},getHTML:function(){var A=this;var L=A.get(ba);var cb=A.get(C);var cd=A.get(bR);var ca=A.get(Z);var b9=A.get(ap);var cc=A.get(a6);return bG.substitute(L,{checked:cb?'checked="checked"':bk,id:cd,label:ca,name:b9,value:cc});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},_onFieldChange:function(L){var A=this;var b9=L.target;A.set(a6,b9.val());},_uiSetOptions:function(cb){var A=this;var L=A.get(b0);var ca=A.get(bP);var b9=A.get(bI);ca.empty();bG.each(cb,function(ce){var cc=new bG.Field({type:I,name:A.get(ap),labelText:ce.name,labelAlign:"left",value:ce.value}).render(ca);var cd=cc.get(b7);if(ce.value==A.get(a6)){cd.set(C,true);}cd.on({change:bG.bind(A._onFieldChange,A)});});},_uiSetPredefinedValue:function(cb){var A=this;var L=A.get(aN);var b9=L.get(ai);var ca=b9.one("input[name=predefinedValue]");if(ca){ca.val(cb);}}}});bG.FormBuilderRadioField=h;bG.FormBuilder.types["radio"]=bG.FormBuilderRadioField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,ar=function(A){return(A instanceof bG.Node);},aM=function(A){return(A instanceof bG.NodeList);},aS=bG.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),aw="boundingBox",bW="button",bU="buttonType",b0="contentBox",a8="container",r="defaultOptions",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",bk="",a3="field",f="fields",bb="form-builder-field",bF="form-builder-select-field",bR="id",p="icon",aI="input",Z="label",bV="multiple",ap="name",b7="node",bL="option",bJ="options",aO="portalLayout",a6="predefinedValue",a4="proxy",bv="reset",bz="selectedIndex",bj="submit",O=" ",ba="template",bI="templateNode",bm="text",N="type",m="value",v=bG.ClassNameManager.getClassName,at=v(a3,aI),bN=v(a3,aI,bm),bp=v(bb),P=v(bb,b7),bt=v(bl,x),am='<select id="{id}" class="'+[P].join(O)+'" name="{name}" value="{value}"></select>';var W=bG.Component.create({NAME:bF,ATTRS:{multiple:{setter:bG.DataType.Boolean.parse,value:false},template:{valueFn:function(){return am;}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,a6,Z,ap,bJ,bK,bV],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderMultipleChoiceField,prototype:{getHTML:function(){var A=this;var L=A.get(ba);var cc=A.get(bR);var ca=A.get(Z);var b9=A.get(ap);var cb=A.get(a6);return bG.substitute(L,{id:cc,label:ca,name:b9,value:cb});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var L=this;var cb=L.get(aN);var cc=cb.get(ai);bG.FormBuilderSelectField.superclass.renderSettings.apply(L,arguments);if(!L._renderedSelectSettings){L._renderedSelectSettings=true;var A=L.propertiesPanel.get(d);var b9=new bG.Field({type:"checkbox",name:bV,labelText:"Multiple",labelAlign:"left"}).render(A.item(0));var ca=b9.get(b7);ca.on({change:bG.bind(L._onSettingsFieldChange,L)});ca.set(C,L.get(bV));}},_uiSetMultiple:function(b9){var A=this;var L=A.get(bI);if(b9){L.setAttribute(bV,bV);}else{L.removeAttribute(bV);}}}});bG.FormBuilderSelectField=W;bG.FormBuilder.types["select"]=bG.FormBuilderSelectField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,ar=function(A){return(A instanceof bG.Node);},aM=function(A){return(A instanceof bG.NodeList);
},aw="boundingBox",b0="contentBox",a8="container",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",bk="",a3="field",f="fields",bb="form-builder-field",aK="form-builder-input-field",bR="id",p="icon",aI="input",Z="label",ap="name",b7="node",aO="portalLayout",a6="predefinedValue",a4="proxy",O=" ",ba="template",bI="templateNode",bm="text",m="value",v=bG.ClassNameManager.getClassName,at=v(a3,aI),bN=v(a3,aI,bm),bp=v(bb),P=v(bb,b7),bt=v(bl,x),bn='<input id="{id}" class="'+[P,at,bN].join(O)+'" name="{name}" type="text" value="{value}" />';var aq=bG.Component.create({NAME:aK,ATTRS:{template:{valueFn:function(){return bn;}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,a6,Z,ap,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{bindUI:function(){var A=this;bG.FormBuilderTextField.superclass.bindUI.apply(A,arguments);var L=A.get(bI);L.on({"keyup":bG.bind(A._onValueKeyUp,A)});},getHTML:function(){var A=this;var L=A.get(ba);var cd=A.get(bR);var ca=A.get(Z);var b9=A.get(ap);var cb=A.get(al);var cc=A.get(a6);return bG.substitute(L,{id:cd,label:ca,name:b9,value:cc});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var A=this;var L=A.get(aN);var b9=L.get(ai);bG.FormBuilderTextField.superclass.renderSettings.apply(A,arguments);if(!A._renderedInputSettings){A._renderedInputSettings=true;var ca=b9.one("input[name=predefinedValue]");ca.on({"keyup":bG.bind(A._onValueKeyUp,A)});}},_onValueKeyUp:function(L){var A=this;var b9=L.target;A.set(a6,b9.val());},_uiSetPredefinedValue:function(cc){var A=this;var b9=A.get(aN);var ca=b9.get(ai);var cb=ca.one("input[name=predefinedValue]");var L=A.get(bI);L.val(cc);if(cb&&A.get(aV)){cb.val(cc);}}}});bG.FormBuilderTextField=aq;bG.FormBuilder.types["text"]=bG.FormBuilderTextField;var bA=bG.Lang,aD=bA.isArray,bh=bA.isNumber,af=bA.isString,aw="boundingBox",b0="contentBox",a8="container",bu=".",aP="drag",bf="dragContainer",b2="dragContainerNode",ab="dragNodesList",ao="drop",aH="dropContainer",a2="dropContainerNode",bk="",a3="field",f="fields",bb="form-builder-field",u="form-builder-textarea-field",bR="id",p="icon",Z="label",ap="name",b7="node",aO="portalLayout",a6="predefinedValue",a4="proxy",al="size",O=" ",ba="template",bI="templateNode",bm="text",br="textarea",m="value",v=bG.ClassNameManager.getClassName,b=v(a3),a7=v(a3,bm),bM=v(a3,br),bp=v(bb),P=v(bb,b7),bt=v(bl,x),bB='<textarea id="{id}" class="'+[P,b,a7,bM].join(O)+'" name="{name}">{value}</textarea>';var au=bG.Component.create({NAME:u,ATTRS:{template:{valueFn:function(){return bB;}},templateNode:{valueFn:"getNode"}},UI_ATTRS:[c,a6,Z,ap,bK],CSS_PREFIX:bp,HTML_PARSER:{templateNode:bu+P},EXTENDS:bG.FormBuilderField,prototype:{bindUI:function(){var A=this;bG.FormBuilderTextAreaField.superclass.bindUI.apply(A,arguments);var L=A.get(bI);L.on({"keyup":bG.bind(A._onValueKeyUp,A)});},getHTML:function(){var A=this;var L=A.get(ba);var cd=A.get(bR);var ca=A.get(Z);var b9=A.get(ap);var cb=A.get(al);var cc=A.get(a6);return bG.substitute(L,{id:cd,label:ca,name:b9,value:cc});},getNode:function(){var A=this;return bG.Node.create(A.getHTML());},renderSettings:function(){var A=this;var L=A.get(aN);var b9=L.get(ai);bG.FormBuilderTextAreaField.superclass.renderSettings.apply(A,arguments);if(!A._renderedTextareaSettings){A._renderedTextareaSettings=true;var ca=b9.one("input[name=predefinedValue]");ca.on({"keyup":bG.bind(A._onValueKeyUp,A)});}},_onValueKeyUp:function(L){var A=this;var b9=L.target;A.set(a6,b9.val());},_uiSetPredefinedValue:function(cc){var A=this;var b9=A.get(aN);var ca=b9.get(ai);var cb=ca.one("input[name=predefinedValue]");var L=A.get(bI);L.val(cc);if(cb&&A.get(aV)){cb.val(cc);}}}});bG.FormBuilderTextAreaField=au;bG.FormBuilder.types["textarea"]=bG.FormBuilderTextAreaField;},"@VERSION@",{requires:["aui-datatype","aui-form","aui-panel","io","substitute"],skinnable:true});