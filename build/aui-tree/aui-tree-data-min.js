AUI.add("aui-tree-data",function(o){var i=o.Lang,n=i.isArray,l=i.isBoolean,m=i.isObject,c=i.isUndefined,z="boundingBox",g="children",p="container",r=".",j="id",x="index",u="lazyLoad",e="leaf",w="nextSibling",C="node",d="ownerTree",h="parentNode",t="prevSibling",q="previousSibling",v="tree",s="tree-node",b="tree-data",k=function(A){return(o.instanceOf(A,o.TreeNode));},f=function(A){return(o.instanceOf(A,o.TreeView));},y=o.getClassName,a=y(v,C);var B=function(){};B.ATTRS={container:{setter:o.one},children:{value:[],validator:n,setter:"_setChildren"},index:{value:{}}};o.mix(B.prototype,{childrenLength:0,initializer:function(){var A=this;A.publish("move");A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});},destructor:function(){var A=this;A.eachChildren(function(D){D.destroy();},true);},getNodeById:function(D){var A=this;return A.get(x)[D];},isRegistered:function(D){var A=this;return !!(A.get(x)[D.get(j)]);},updateReferences:function(F,G,J){var K=this;var I=F.get(h);var A=F.get(d);var H=I&&(I!==G);if(I){if(H){var D=I.get(g);o.Array.removeItem(D,F);I.set(g,D);}I.unregisterNode(F);}if(A){A.unregisterNode(F);}F.set(h,G);F.set(d,J);if(G){G.registerNode(F);}if(J){J.registerNode(F);}if(A!=J){F.eachChildren(function(L){K.updateReferences(L,L.get(h),J);});}if(H){var E=K.getEventOutputMap(F);if(!I.get("children").length){I.collapse();I.hideHitArea();}E.tree.oldParent=I;E.tree.oldOwnerTree=A;K.bubbleEvent("move",E);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(D){A.registerNode(D);},true);},registerNode:function(F){var A=this;var E=F.get(j);var D=A.get(x);if(E){D[E]=F;}if(f(A)){F.addTarget(A);F.set(d,A);}F._inheritOwnerTreeAttrs();A.updateIndex(D);},updateIndex:function(D){var A=this;if(D){A.set(x,D);}},unregisterNode:function(E){var A=this;var D=A.get(x);delete D[E.get(j)];if(f(A)){E.removeTarget(A);}A.updateIndex(D);},collapseAll:function(){var A=this;A.eachChildren(function(D){D.collapse();},true);},expandAll:function(){var A=this;A.eachChildren(function(D){D.expand();},true);},selectAll:function(){var A=this;A.eachChildren(function(D){D.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(D){D.unselect();},true);},eachChildren:function(F,D){var A=this;var E=A.getChildren(D);o.Array.each(E,function(G){if(G){F.apply(A,arguments);}});},eachParent:function(E){var D=this;var A=D.get(h);while(A){if(A){E.call(D,A);}A=A.get(h);}},bubbleEvent:function(G,F,H,E){var D=this;D.fire(G,F);if(!H){var A=D.get(h);F=F||{};if(c(E)){E=true;}F.stopActionPropagation=E;while(A){A.fire(G,F);A=A.get(h);}}},createNode:function(D){var A=this;var E=o.TreeNode.nodeTypes[m(D)?D.type:D]||o.TreeNode;return new E(m(D)?D:{});},appendChild:function(F,E){var A=this;var D=A.getEventOutputMap(F);A.bubbleEvent("append",D,E);},_appendChild:function(J){if(J.stopActionPropagation){return false;}var A=this;var I=J.tree.node;var D=A.get(d);var G=A.get(g);A.updateReferences(I,A,D);var H=G.push(I);A.set(g,G);var F=H-2;var E=A.item(F);I._nextSibling=null;I._prevSibling=E;I.render(A.get(p));},item:function(D){var A=this;return A.get(g)[D];},indexOf:function(D){var A=this;return o.Array.indexOf(A.get(g),D);},hasChildNodes:function(){var A=this;return(A.getChildrenLength()>0);},getChildren:function(D){var A=this;var F=[];var E=A.get(g);F=F.concat(E);if(D){A.eachChildren(function(G){F=F.concat(G.getChildren(D));});}return F;},getChildrenLength:function(){var A=this;return(A.childrenLength||A.get(g).length);},getEventOutputMap:function(D){var A=this;return{tree:{instance:A,node:D||A}};},removeChild:function(E){var A=this;var D=A.getEventOutputMap(E);A.bubbleEvent("remove",D);},_removeChild:function(G){if(G.stopActionPropagation){return false;}var A=this;var F=G.tree.node;var D=A.get(d);if(A.isRegistered(F)){F.set(h,null);A.unregisterNode(F);F.set(d,null);if(D){D.unregisterNode(F);}F.get(z).remove();var E=A.get(g);o.Array.removeItem(E,F);A.set(g,E);}},empty:function(){var A=this;A.eachChildren(function(E){var D=E.get(h);if(D){D.removeChild(E);}});},insert:function(J,G,H){var N=this;G=G||this;if(G===J){return false;}var A=G.get(h);if(J&&A){var I=J.get(z);var O=G.get(z);var M=G.get(d);if(H==="before"){O.placeBefore(I);}else{if(H==="after"){O.placeAfter(I);}}var D=[];var L=A.get(z).all("> ul > li");L.each(function(P){D.push(P.getData(s));});var K=I.get(w);J.set(w,K&&K.getData(s));var F=I.get(q);J.set(t,F&&F.getData(s));G.updateReferences(J,A,M);A.set(g,D);}J.render();var E=G.getEventOutputMap(J);E.tree.refTreeNode=G;G.bubbleEvent("insert",E);},insertAfter:function(E,D){var A=this;A.insert(E,D,"after");},insertBefore:function(E,D){var A=this;A.insert(E,D,"before");},getNodeByChild:function(E){var A=this;var D=E.ancestor(r+a);if(D){return D.getData(s);}return null;},_inheritOwnerTreeAttrs:i.emptyFn,_setChildren:function(F){var D=this;var I=[];var E=D.get(p);if(!E){E=D._createNodeContainer();}D.childrenLength=F.length;var G=D;if(k(D)){G=D.get(d);}var A=f(G);var H=true;if(A){H=G.get(u);}D.updateIndex({});if(D.childrenLength>0){D.set(e,false);}o.Array.each(F,function(M,K){if(M){if(!k(M)&&m(M)){var L=M[g];var J=L&&L.length;M[d]=G;M[h]=D;if(J&&H){delete M[g];}M=D.createNode(M);if(J&&H){o.setTimeout(function(){M.set(g,L);},50);}}if(A){G.registerNode(M);}M.render(E);if(o.Array.indexOf(I,M)===-1){I.push(M);}}});return I;}});o.TreeData=B;},"@VERSION@",{requires:["aui-base","aui-task-manager"],skinnable:false});