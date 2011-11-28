AUI.add("aui-form-validator",function(r){var ap=r.Lang,x=r.Object,P=ap.isBoolean,G=ap.isDate,w=x.isEmpty,s=ap.isFunction,aa=ap.isObject,m=ap.isString,a=ap.trim,X=r.DOM._getRegExp,I="-",F=".",p="",o="form-validator",B="Invalid Date",K="|",ao="aria-required",ai="blurHandlers",g="checkbox",d="container",aj="containerErrorClass",T="containerValidClass",J="contentBox",R="error",al="errorClass",ak="extractCssPrefix",an="extractRules",q="field",ag="fieldContainer",Y="fieldStrings",e="inputHandlers",Z="message",b="messageContainer",Q="name",W="radio",n="rules",ab="selectText",af="showAllMessages",y="showMessages",N="stack",k="stackErrorContainer",t="type",ae="valid",D="validateOnBlur",V="validateOnInput",U="validClass",l="blur",O="errorField",ac="input",H="reset",z="submit",E="submitError",i="validateField",C="validField",h=r.getClassName,am=h(o,R),v=h(o,R,d),f=h(o,ae),ad=h(o,ae,d),L=h(q),c=h(o,Z),u=h(o,N,R),ah='<div class="'+c+'" role="alert"></div>',S='<label class="'+u+'"></label>',j=[an,D,V];YUI.AUI.defaults.FormValidator={STRINGS:{DEFAULT:"Please fix this field.",acceptFiles:"Please enter a value with a valid extension ({0}).",alpha:"Please enter only apha characters.",alphanum:"Please enter only aphanumeric characters.",date:"Please enter a valid date.",digits:"Please enter only digits.",email:"Please enter a valid email address.",equalTo:"Please enter the same value again.",max:"Please enter a value less than or equal to {0}.",maxLength:"Please enter no more than {0} characters.",min:"Please enter a value greater than or equal to {0}.",minLength:"Please enter at least {0} characters.",number:"Please enter a valid number.",range:"Please enter a value between {0} and {1}.",rangeLength:"Please enter a value between {0} and {1} characters long.",required:"This field is required.",url:"Please enter a valid URL."},REGEX:{alpha:/^[a-z_]+$/i,alphanum:/^\w+$/,digits:/^\d+$/,number:/^[+\-]?(\d+([.,]\d+)?)+$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},RULES:{acceptFiles:function(at,ar,au){var aq=null;if(m(au)){var A=au.split(/,\s*|\b\s*/).join(K);aq=X("[.]("+A+")$","i");}return aq&&aq.test(at);},date:function(ar,aq,at){var A=new Date(ar);return(G(A)&&(A!=B)&&!isNaN(A));},equalTo:function(ar,aq,at){var A=r.one(at);return A&&(a(A.val())==ar);},max:function(aq,A,ar){return(M.toNumber(aq)<=ar);},maxLength:function(aq,A,ar){return(aq.length<=ar);},min:function(aq,A,ar){return(M.toNumber(aq)>=ar);},minLength:function(aq,A,ar){return(aq.length>=ar);},range:function(ar,aq,at){var A=M.toNumber(ar);return(A>=at[0])&&(A<=at[1]);},rangeLength:function(ar,aq,at){var A=ar.length;return(A>=at[0])&&(A<=at[1]);},required:function(au,ar,av){var A=this;if(r.FormValidator.isCheckable(ar)){var aq=ar.get(Q);var at=A.getElementsByName(aq);return(at.filter(":checked").size()>0);}else{return !!au;}}}};var M=r.Component.create({NAME:o,ATTRS:{containerErrorClass:{value:v,validator:m},containerValidClass:{value:ad,validator:m},errorClass:{value:am,validator:m},extractCssPrefix:{value:L+I,validator:m},extractRules:{value:true,validator:P},fieldContainer:{value:F+L},fieldStrings:{value:{},validator:aa},messageContainer:{getter:function(A){return r.Node.create(A).clone();},value:ah},render:{value:true},strings:{valueFn:function(){return YUI.AUI.defaults.FormValidator.STRINGS;}},rules:{validator:aa,value:{}},selectText:{value:true,validator:P},showMessages:{value:true,validator:P},showAllMessages:{value:false,validator:P},stackErrorContainer:{getter:function(A){return r.Node.create(A).clone();},value:S},validateOnBlur:{value:true,validator:P},validateOnInput:{value:false,validator:P},validClass:{value:f,validator:m}},isCheckable:function(aq){var A=aq.get(t).toLowerCase();return(A==g||A==W);},toNumber:function(A){return parseFloat(A)||0;},EXTENDS:r.Widget,UI_ATTRS:j,prototype:{CONTENT_TEMPLATE:null,UI_EVENTS:{},initializer:function(){var A=this;A.blurHandlers=[];A.errors={};A.inputHandlers=[];A.stackErrorContainers={};
A._setARIARoles();},bindUI:function(){var A=this;A._createEvents();A._bindValidation();},addFieldError:function(at,ar){var A=this;var au=A.errors;var aq=at.get(Q);if(!au[aq]){au[aq]=[];}au[aq].push(ar);},clearFieldError:function(aq){var A=this;delete A.errors[aq.get(Q)];},eachRule:function(aq){var A=this;r.each(A.get(n),function(ar,at){if(s(aq)){aq.apply(A,[ar,at]);}});},findFieldContainer:function(aq){var A=this;var ar=A.get(ag);if(ar){return aq.ancestor(ar);}},focusInvalidField:function(){var A=this;var aq=A.get(J);var ar=aq.one(F+am);if(ar){if(A.get(ab)){ar.selectText();}ar.focus();}},getElementsByName:function(aq){var A=this;return A.get(J).all('[name="'+aq+'"]');},getField:function(aq){var A=this;if(m(aq)){aq=A.getElementsByName(aq).item(0);}return aq;},getFieldError:function(aq){var A=this;return A.errors[aq.get(Q)];},getFieldStackErrorContainer:function(at){var A=this;var aq=at.get(Q);var ar=A.stackErrorContainers;if(!ar[aq]){ar[aq]=A.get(k);}return ar[aq];},getFieldErrorMessage:function(av,au){var aw=this;var ay=av.get(Q);var aq=aw.get(Y)[ay]||{};var A=aw.get(n)[ay];var ax=aw.getStrings();var at={};if(au in A){var ar=r.Array(A[au]);r.each(ar,function(aB,aA){at[aA]=[aB].join(p);});}var az=(aq[au]||ax[au]||ax.DEFAULT);return ap.sub(az,at);},hasErrors:function(){var A=this;return !w(A.errors);},highlight:function(ar,aq){var A=this;var at=A.findFieldContainer(ar);A._highlightHelper(ar,A.get(al),A.get(U),aq);A._highlightHelper(at,A.get(aj),A.get(T),aq);},normalizeRuleValue:function(aq){var A=this;return s(aq)?aq.apply(A):aq;},unhighlight:function(aq){var A=this;A.highlight(aq,true);},printStackError:function(ar,aq,at){var A=this;if(!A.get(af)){at=at.slice(0,1);}aq.empty();r.each(at,function(av,au){var aw=A.getFieldErrorMessage(ar,av);var ax=A.get(b).addClass(av);aq.append(ax.html(aw));});},resetAllFields:function(){var A=this;A.eachRule(function(ar,at){var aq=A.getField(at);A.resetField(aq);});},resetField:function(ar){var A=this;var aq=A.getFieldStackErrorContainer(ar);aq.remove();A.resetFieldCss(ar);A.clearFieldError(ar);},resetFieldCss:function(ar){var aq=this;var at=aq.findFieldContainer(ar);var A=function(av,au){if(av){r.each(au,function(aw){av.removeClass(aq.get(aw));});}};A(ar,[U,al]);A(at,[T,aj]);},validatable:function(ar){var A=this;var au=A.get(n)[ar.get(Q)];var at=A.normalizeRuleValue(au.required);var aq=YUI.AUI.defaults.FormValidator.RULES.required.apply(A,[ar.val(),ar]);return(at||(!at&&aq)||au.custom);},validate:function(){var A=this;A.eachRule(function(aq,ar){A.validateField(ar);});A.focusInvalidField();},validateField:function(at){var A=this;var ar=A.getField(at);if(ar){var aq=A.validatable(ar);A.resetField(ar);if(aq){A.fire(i,{validator:{field:ar}});}}},_bindValidateHelper:function(au,at,ar,aq){var A=this;A._unbindHandlers(aq);if(au){A.eachRule(function(aw,ax){var av=A.getElementsByName(ax);A[aq].push(av.on(at,r.bind(ar,A)));});}},_bindValidation:function(){var A=this;var aq=A.get(J);aq.on(H,r.bind(A._onFormReset,A));aq.on(z,r.bind(A._onFormSubmit,A));},_createEvents:function(){var A=this;var aq=function(ar,at){A.publish(ar,{defaultFn:at});};aq(O,A._defErrorFieldFn);aq(C,A._defValidFieldFn);aq(i,A._defValidateFieldFn);},_defErrorFieldFn:function(at){var A=this;var aq=at.validator;var au=aq.field;A.highlight(au);if(A.get(y)){var ar=A.getFieldStackErrorContainer(au);au.placeBefore(ar);A.printStackError(au,ar,aq.errors);}},_defValidFieldFn:function(aq){var A=this;var ar=aq.validator.field;A.unhighlight(ar);},_defValidateFieldFn:function(ar){var aq=this;var at=ar.validator.field;var au=aq.get(n)[at.get(Q)];r.each(au,function(ay,aw){var ax=YUI.AUI.defaults.FormValidator.RULES[aw];var av=a(at.val());ay=aq.normalizeRuleValue(ay);if(s(ax)&&!ax.apply(aq,[av,at,ay])){aq.addFieldError(at,aw);}});var A=aq.getFieldError(at);if(A){aq.fire(O,{validator:{field:at,errors:A}});}else{aq.fire(C,{validator:{field:at}});}},_highlightHelper:function(at,A,aq,ar){if(at){if(ar){at.removeClass(A).addClass(aq);}else{at.removeClass(aq).addClass(A);}}},_onBlurField:function(aq){var A=this;var ar=aq.currentTarget.get(Q);A.validateField(ar);},_onFieldInputChange:function(aq){var A=this;A.validateField(aq.currentTarget);},_onFormSubmit:function(aq){var A=this;var ar={validator:{formEvent:aq}};A.validate();if(A.hasErrors()){ar.validator.errors=A.errors;A.fire(E,ar);aq.halt();}else{A.fire(z,ar);}},_onFormReset:function(aq){var A=this;A.resetAllFields();},_setARIARoles:function(){var A=this;A.eachRule(function(ar,at){if(ar.required){var aq=A.getField(at);if(!aq.attr(ao)){aq.attr(ao,true);}}});},_uiSetExtractRules:function(aJ){var aH=this;if(aJ){var aq=aH.get(J);var aC=aH.get(n);var aI=aH.get(ak);var aD=YUI.AUI.defaults.FormValidator.RULES;var ar=x.keys(aD);var av=ar.join("|");var ax=X("aui-field-"+av,"g");var aB=aq.getDOM();var aw=aB.elements;for(var aG=0,ay=aw.length;aG<ay;aG++){var A=aw[aG];var at=A.className;var au=A.name;var az=at.match(ax);if(az){if(!aC[au]){aC[au]={};}for(var aF=0,aE=az.length;aF<aE;aF++){var aA=az[aF];if(!(aC[au][aA] in az)){aC[au][aA]=true;}}}}}},_uiSetValidateOnInput:function(aq){var A=this;A._bindValidateHelper(aq,ac,A._onFieldInputChange,e);},_uiSetValidateOnBlur:function(aq){var A=this;A._bindValidateHelper(aq,l,A._onBlurField,ai);},_unbindHandlers:function(aq){var A=this;r.each(A[aq],function(ar){ar.detach();});A[aq]=[];}}});r.each(YUI.AUI.defaults.FormValidator.REGEX,function(aq,A){YUI.AUI.defaults.FormValidator.RULES[A]=function(at,ar,au){return YUI.AUI.defaults.FormValidator.REGEX[A].test(at);};});r.FormValidator=M;},"@VERSION@",{requires:["aui-base","aui-event-input","selector-css3"],skinnable:false});