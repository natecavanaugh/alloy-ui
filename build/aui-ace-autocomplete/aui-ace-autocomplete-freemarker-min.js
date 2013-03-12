AUI.add("aui-ace-autocomplete-freemarker",function(l){var d=l.Lang,r=l.Array,p=l.Object,h=["assign","attempt","break","case","compress","default","else","elseif","escape","fallback","flush","ftl","function","global","if","import","include","list","local","lt","macro","nested","noescape","nt","recover","recurse","return","rt","setting","stop","switch","t","visit"],i=l.AceEditor.AutoCompleteBase,a=0,e=1,s=/<#[\w.]*>?$/,k=/\$\{[\w., ()"]*\}?$/,b=-1,q=0,c="all",n=".",m="",f="responseData",j="variables",g="aui-ace-autocomplete-freemarker";var o=l.Component.create({NAME:g,NS:g,ATTRS:{host:{validator:d.isObject},variables:{validator:d.isObject}},EXTENDS:l.Base,prototype:{getMatch:function(w){var u=this;var v;var t;if((t=w.lastIndexOf("<"))>=0){w=w.substring(t);if(s.test(w)){v={content:w.substring(2),start:t,type:a};}}else{if((t=w.lastIndexOf("$"))>=0){w=w.substring(t);if(k.test(w)){v={content:w.substring(2),start:t,type:e};}}}return v;},getResults:function(u,w,z){var t=this;var v=u.type;if(v===a){var A=h;var x=u.content.toLowerCase();if(x.length){A=r.filter(A,function(C,B){return(C.indexOf(x)===0);});}else{A=A.sort();}w(A);}else{if(v===e){var y=t._getVariableMatches(u.content);w(y);}}},getSuggestion:function(x,y){var u=this;var t=y||m;if(y){var w=u.get("host").get("fillMode");var z=x.type;var A;var v;if(w===i.FILL_MODE_INSERT){if(z===a){if(x.content&&y.indexOf(x.content)===0){t=y.substring(x.content.length);}}else{if(z===e){A=x.content.split(n);v=A[A.length-1];if(v&&y.indexOf(v)===0){t=y.substring(v.length);}}}}else{if(z===e){A=x.content.split(n);A[A.length-1]=y;t=A.join(n);}}}return t;},_getVariableMatches:function(x){var t=this;var A=x.split(n);var z=t.get(j);var u=A[A.length-1];A.length-=1;var v;if(A.length>0){for(var w=0;w<A.length;w++){v=A[w];if(d.isObject(z)){z=z[v];}}}var y=[];u=u.toLowerCase();if(d.isObject(z)){r.each(p.keys(z),function(C,B){if(u){if(C.toLowerCase().indexOf(u)===0){y.push(C);}}else{y.push(C);}});}return y.sort();}}});o.DIRECTIVES=h;l.AceEditor.AutoCompleteFreemarker=o;},"@VERSION@",{requires:["aui-ace-autocomplete-base"]});