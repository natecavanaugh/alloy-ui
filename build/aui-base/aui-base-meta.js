;(function() {
	var AUI_config = {
		filter: 'raw',

		io: {
			method: 'GET'
		},

        combine: false,

		groups: {
            alloy: {
				combine: false,
                modules: {
						'aui-ace-editor': {submodules: {'aui-ace-editor-theme-textmate': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-groovy': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-twilight': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-keybinding-vim': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-clojure': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-merbivore_soft': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-scala': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-csharp': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-css': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-pastel_on_dark': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-worker-javascript': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-crimson_editor': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-cobalt': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-eclipse': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-clouds_midnight': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-worker-coffee': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-scss': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-clouds': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-c_cpp': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-kr_theme': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-scad': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-perl': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-textile': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-json': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-solarized_light': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-mono_industrial': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-merbivore': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-svg': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-java': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-vibrant_ink': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-dawn': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-python': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-keybinding-emacs': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-javascript': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-monokai': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-ruby': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-worker-css': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-coffee': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-html': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-idle_fingers': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-ocaml': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-theme-solarized_dark': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-php': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-mode-xml': {skinnable:false, requires:['aui-ace-editor-base']}, 'aui-ace-editor-base': {skinnable:false, requires:['aui-component', 'aui-node']} }, skinnable:false, use:['aui-ace-editor-base','aui-ace-editor-mode-xml','aui-ace-editor-mode-php','aui-ace-editor-theme-solarized_dark','aui-ace-editor-mode-ocaml','aui-ace-editor-theme-idle_fingers','aui-ace-editor-mode-html','aui-ace-editor-mode-coffee','aui-ace-editor-worker-css','aui-ace-editor-mode-ruby','aui-ace-editor-theme-monokai','aui-ace-editor-mode-javascript','aui-ace-editor-keybinding-emacs','aui-ace-editor-mode-python','aui-ace-editor-theme-dawn','aui-ace-editor-theme-vibrant_ink','aui-ace-editor-mode-java','aui-ace-editor-mode-svg','aui-ace-editor-theme-merbivore','aui-ace-editor-theme-mono_industrial','aui-ace-editor-theme-solarized_light','aui-ace-editor-mode-json','aui-ace-editor-mode-textile','aui-ace-editor-mode-perl','aui-ace-editor-mode-scad','aui-ace-editor-theme-kr_theme','aui-ace-editor-mode-c_cpp','aui-ace-editor-theme-clouds','aui-ace-editor-mode-scss','aui-ace-editor-worker-coffee','aui-ace-editor-theme-clouds_midnight','aui-ace-editor-theme-eclipse','aui-ace-editor-theme-cobalt','aui-ace-editor-theme-crimson_editor','aui-ace-editor-worker-javascript','aui-ace-editor-theme-pastel_on_dark','aui-ace-editor-mode-css','aui-ace-editor-mode-csharp','aui-ace-editor-mode-scala','aui-ace-editor-theme-merbivore_soft','aui-ace-editor-mode-clojure','aui-ace-editor-keybinding-vim','aui-ace-editor-theme-twilight','aui-ace-editor-mode-groovy','aui-ace-editor-theme-textmate']},
						'aui-aria': {skinnable:false, requires:['aui-base','plugin']},
						'aui-arraysort': {skinnable:false, requires:['arraysort']},
						'aui-audio': {skinnable:true, requires:['aui-base','querystring-stringify-simple']},
						'aui-autocomplete': {skinnable:true, requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox']},
						'aui-base': {submodules: {'aui-base-lang': {skinnable:false}, 'aui-base-core': {requires:['aui-classnamemanager','aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop','yui-throttle'], skinnable:false} }, use:['aui-base-core','aui-base-lang'], skinnable:false},
						'aui-button-item': {skinnable:true, requires:['aui-base','aui-state-interaction','widget-child']},
						'aui-calendar': {skinnable:true, requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale']},
						'aui-carousel': {skinnable:true, requires:['aui-base','aui-template','anim']},
						'aui-char-counter': {skinnable:false, requires:['aui-base','aui-event-input']},
						'aui-chart': {skinnable:false, requires:['datasource','aui-swf','json']},
						'aui-classnamemanager': {skinnable:false, requires:['classnamemanager']},
						'aui-color-picker': {submodules: {'aui-color-picker-grid-plugin': {skinnable:true, requires:['aui-color-picker-base','plugin']}, 'aui-color-picker-base': {skinnable:true, requires:['aui-overlay-context','dd-drag','slider','aui-button-item','aui-color-util','aui-form-base','aui-panel']} }, skinnable:true, use:['aui-color-picker-base','aui-color-picker-grid-plugin']},
						'aui-color-util': {skinnable:false},
						'aui-component': {skinnable:false, requires:['aui-classnamemanager','base-build','widget']},
						'aui-data-browser': {skinnable:true, requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-tree','aui-panel']},
						'aui-data-set': {skinnable:false, requires:['oop','collection','base']},
						'aui-datasource-control': {submodules: {'aui-input-text-control': {requires:['aui-base','aui-datasource-control-base','aui-form-combobox']}, 'aui-datasource-control-base': {requires:['aui-base','datasource','dataschema']} }, skinnable:true, use:['aui-datasource-control-base','aui-input-text-control']},
						'aui-datatable': {submodules: {'aui-datatable-selection': {skinnable:true, requires:['aui-datatable-base']}, 'aui-datatable-edit': {skinnable:true, requires:['aui-calendar','aui-datatable-events','aui-toolbar','aui-form-validator','overlay','sortable']}, 'aui-datatable-events': {requires:['aui-datatable-base']}, 'aui-datatable-base': {skinnable:true, requires:['aui-base','datatable','plugin']} }, skinnable:true, use:['aui-datatable-base','aui-datatable-events','aui-datatable-edit','aui-datatable-selection']},
						'aui-datatype': {skinnable:false, requires:['aui-base']},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {skinnable:true, requires:['aui-datepicker-base','aui-button-item']}, 'aui-datepicker-base': {skinnable:true, requires:['aui-calendar','aui-overlay-context']} }, skinnable:true, use:['aui-datepicker-base','aui-datepicker-select']},
						'aui-debounce': {skinnable:false},
						'aui-delayed-task': {skinnable:false},
						'aui-diagram-builder': {submodules: {'aui-diagram-builder-connector': {skinnable:true, requires:['aui-base','aui-template','arraylist-add','arraylist-filter','json','graphics','dd']}, 'aui-diagram-builder-impl': {skinnable:true, requires:['aui-data-set','aui-diagram-builder-base','aui-diagram-builder-connector','overlay']}, 'aui-diagram-builder-base': {skinnable:true, requires:['aui-tabs','aui-property-list','collection','dd']} }, skinnable:true, use:['aui-diagram-builder-base','aui-diagram-builder-impl']},
						'aui-dialog-iframe': {skinnable:true, requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin']},
						'aui-dialog': {skinnable:true, requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize']},
						'aui-drawing': {submodules: {'aui-drawing-safari': {condition: {name: 'aui-drawing-safari', trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}, requires:['aui-drawing-base']}, 'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-vml': {condition: {name: 'aui-drawing-vml', trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}, requires:['aui-drawing-base']}, 'aui-drawing-svg': {condition: {name: 'aui-drawing-svg', trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}, requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color-util','substitute']} }, skinnable:false, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts']},
						'aui-editable': {skinnable:true, requires:['aui-base','aui-form-combobox']},
						'aui-editor': {submodules: {'aui-editor-creole-plugin': {requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']}, 'aui-editor-html-creole': {requires:['aui-editor-base']}, 'aui-editor-creole-parser': {requires:['aui-base']}, 'aui-editor-bbcode-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-toolbar-plugin': {requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context-panel','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin']}, 'aui-editor-menu-plugin': {requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']}, 'aui-editor-tools-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-base': {requires:['aui-base','editor-base','aui-editor-toolbar-plugin']} }, skinnable:true, use:['aui-editor-base','aui-editor-tools-plugin','aui-editor-menu-plugin','aui-editor-toolbar-plugin','aui-editor-bbcode-plugin','aui-editor-creole-parser','aui-editor-creole-plugin']},
						'aui-event': {submodules: {'aui-event-delegate-submit': {condition: {name: 'aui-event-delegate-submit', trigger: 'event-base-ie', ua: 'ie'}, requires:['aui-node-base','aui-event-base']}, 'aui-event-delegate-change': {condition: {name: 'aui-event-delegate-change', trigger: 'event-base-ie', ua: 'ie'}, requires:['aui-node-base','aui-event-base']}, 'aui-event-input': {requires:['aui-base']}, 'aui-event-base': {requires:['event']} }, skinnable:false, use:['aui-event-base','aui-event-input']},
						'aui-form-builder': {submodules: {'aui-form-builder-field': {skinnable:true, requires:['aui-datatype','aui-panel','aui-tooltip']}, 'aui-form-builder-base': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','aui-diagram-builder-base','aui-nested-list','aui-tabs']} }, skinnable:true, use:['aui-form-builder-base','aui-form-builder-field']},
						'aui-form-validator': {skinnable:false, requires:['aui-base','aui-event-input','selector-css3']},
						'aui-form': {submodules: {'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {skinnable:true, requires:['aui-form-textfield']}, 'aui-form-select': {requires:['aui-form-field']}, 'aui-form-field': {requires:['aui-base','aui-component']}, 'aui-form-combobox': {skinnable:true, requires:['aui-form-textarea','aui-toolbar']}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse','io-form']} }, skinnable:false, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-select','aui-form-textarea','aui-form-textfield']},
						'aui-image-cropper': {skinnable:true, requires:['widget','aui-base','resize','dd-constrain']},
						'aui-image-viewer': {submodules: {'aui-media-viewer-plugin': {skinnable:false, requires:['aui-image-viewer-base']}, 'aui-image-viewer-gallery': {skinnable:true, requires:['aui-image-viewer-base','aui-paginator','aui-toolbar']}, 'aui-image-viewer-base': {skinnable:true, requires:['anim','aui-overlay-mask']} }, skinnable:true, use:['aui-image-viewer-base','aui-image-viewer-gallery','aui-media-viewer-plugin']},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, skinnable:false, use:['aui-io-request','aui-io-plugin']},
						'aui-live-search': {skinnable:false, requires:['aui-base']},
						'aui-loading-mask': {skinnable:true, requires:['aui-overlay-mask','plugin']},
						'aui-messaging': {skinnable:false, requires:['aui-base','aui-task-manager','querystring']},
						'aui-nested-list': {skinnable:false, requires:['aui-base','dd-drag','dd-drop','dd-proxy']},
						'aui-node': {submodules: {'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['array-extras','aui-base-lang','aui-classnamemanager','node']} }, skinnable:false, use:['aui-node-base','aui-node-html5','aui-node-html5-print']},
						'aui-overlay': {submodules: {'aui-overlay-mask': {skinnable:true, requires:['aui-base','aui-overlay-base','event-resize']}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {skinnable:true, requires:['aui-overlay-context','anim']}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task','aui-aria']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, skinnable:true, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask']},
						'aui-paginator': {skinnable:true, requires:['aui-base']},
						'aui-panel': {skinnable:true, requires:['aui-component','widget-stdmod','aui-toolbar','aui-aria']},
						'aui-parse-content': {skinnable:false, requires:['async-queue','aui-base','plugin']},
						'aui-portal-layout': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy']},
						'aui-progressbar': {skinnable:true, requires:['aui-base','aui-aria']},
						'aui-property-list': {skinnable:true, requires:['aui-datatable']},
						'aui-rating': {skinnable:true, requires:['aui-base']},
						'aui-resize-iframe': {skinnable:true, requires:['aui-base','aui-task-manager','plugin']},
						'aui-resize': {submodules: {'aui-resize-constrain': {skinnable:false, requires:['aui-resize-base','dd-constrain','plugin']}, 'aui-resize-base': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop']} }, skinnable:true, use:['aui-resize-base','aui-resize-constrain']},
						'aui-scheduler': {submodules: {'aui-scheduler-calendar': {skinnable:false, requires:['aui-scheduler-event']}, 'aui-scheduler-event': {skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','aui-template','aui-toolbar','io-form','querystring','overlay']}, 'aui-scheduler-view': {skinnable:true, requires:['aui-scheduler-event','aui-calendar','aui-button-item','dd-drag','dd-delegate','dd-drop','dd-constrain']}, 'aui-scheduler-base': {skinnable:true, requires:['aui-scheduler-view','datasource']} }, skinnable:true, use:['aui-scheduler-base','aui-scheduler-view','aui-scheduler-event','aui-scheduler-calendar']},
						'aui-scroller': {skinnable:true, requires:['aui-base','aui-simple-anim']},
						'aui-selector': {skinnable:false, requires:['selector-css3']},
						'aui-simple-anim': {skinnable:false, requires:['aui-base']},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {requires:['aui-skin-base'], type: 'css', path: 'aui-skin-classic/css/aui-skin-classic.css'},
						'aui-sortable': {skinnable:true, requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy']},
						'aui-state-interaction': {skinnable:false, requires:['aui-base','plugin']},
						'aui-swf': {skinnable:false, requires:['aui-base','querystring-parse-simple','querystring-stringify-simple']},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {skinnable:true, requires:['aui-component','aui-state-interaction']} }, skinnable:true, use:['aui-tabs-base','aui-tabs-menu-plugin']},
						'aui-task-manager': {skinnable:false, requires:['aui-base']},
						'aui-template': {skinnable:false, requires:['aui-base']},
						'aui-text': {submodules: {'aui-text-unicode': {skinnable:false, requires:['aui-text-data-unicode']}, 'aui-text-data-unicode': {skinnable:false, requires:['text']} }, skinnable:false, use:['aui-text-data-unicode', 'aui-text-unicode']},
						'aui-textboxlist': {skinnable:true, requires:['anim-node-plugin','aui-base','aui-data-set','aui-form-textfield','autocomplete','autocomplete-filters','autocomplete-highlighters']},
						'aui-toggler': {submodules: {'aui-toggler-delegate': {skinnable:false, requires:['aui-toggler-base']}, 'aui-toggler-base': {skinnable:true, requires:['aui-base','transition']} }, skinnable:true, use:['aui-toggler-base','aui-toggler-delegate']},
						'aui-toolbar': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','widget-parent']},
						'aui-tooltip': {skinnable:true, requires:['aui-overlay-context-panel']},
						'aui-tpl-snippets': {submodules: {'aui-tpl-snippets-checkbox': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-textarea': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-input': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-select': {skinnable:false, requires:['aui-tpl-snippets-base']}, 'aui-tpl-snippets-base': {skinnable:false, requires:['aui-template']} }, skinnable:false, use:['aui-tpl-snippets-base','aui-tpl-snippets-select','aui-tpl-snippets-input','aui-tpl-snippets-textarea','aui-tpl-snippets-checkbox']},
						'aui-tree': {submodules: {'aui-tree-view': {skinnable:true, requires:['aui-tree-node','dd-drag','dd-drop','dd-proxy']}, 'aui-tree-node': {skinnable:false, requires:['aui-tree-data','aui-io','json','querystring-stringify']}, 'aui-tree-data': {skinnable:false, requires:['aui-base']} }, skinnable:true, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view']},
						'aui-video': {skinnable:true, requires:['aui-base','querystring-stringify-simple']},
						'aui-viewport': {skinnable:false, requires:['aui-base']}
				}
		    }
		}
	};

	if (typeof YUI != 'undefined') {
		YUI.AUI_config = AUI_config;
	}
	
	if (typeof exports == 'object') {
        exports.AUI_config = AUI_config;
    }
})();
