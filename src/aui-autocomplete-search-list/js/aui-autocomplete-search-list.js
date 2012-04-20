var arrayIndexOf = A.Array.indexOf,

	NAME = 'AutocompleteSearchList',

	DOC = A.config.doc,

	ADD = 'add',
	BLANK = "''",
	CHECKED = 'checked',
	CLICK = 'click',
	COMMA_SPACE = ', ',
	INPUT_SELECTOR = 'inputSelector',
	PHRASE_MATCH = 'phraseMatch',
	REMOVE = 'remove',
	RENDER = 'render',
	TAG_SELECTOR = 'tagsSelector',
	SEARCH = "'Search'",
	SEARCH_INITIALLY = 'searchInitially',
	STR_BLANK = '',
	VALUE = 'value',

	CSS_NO_MATCHES = 'no-matches',

	TPL_AC_CONTAINER = '<span class="aui-field-content aui-autocomplete-search-list-ac-container">',
	TPL_AC_INPUT = '<input class="aui-field-input aui-field-input-text" id="ac-input" type="text" name="test-input" value="Search" autocomplete="off" onfocus="if(this.value==' + SEARCH + ') {this.value=' + BLANK + '};" onblur="if(!this.value) {this.value=' + SEARCH + '};this._haschanged=false;"/></span>',
	TPL_AC_SEARCH_LIST = '<div class="aui-autocomplete-search-list" />',
	TPL_CHECKED = ' checked="checked" ';

var AutocompleteSearchList = function() {};

A.mix(AutocompleteSearchList, {
		NAME: NAME,

		NS: NAME,

		EXTENDS: A.Plugin.Base,

		AUGMENTS: [A.AutoCompleteBase],

		ATTRS: {
			entries: {
				value: null
			},

			entriesNode: {
				value: null
			},

			initialResult: {
				value: null
			},

			inputNode: {
				value: '#ac-input'
			},

			inputSelector: {
				value: null
			},

			minQueryLength: {
				value: 0
			},

			mode: {
				value: null
			},

			noResultsMessage: {
				value: null
			},

			resultFilters: {
				value: PHRASE_MATCH
			},

			searchInitially: {
				value: true
			},

			source: {
				value: null
			},

			tagsSelector: {
				value: null
			},

			template: {
				valueFn: function() {
					var instance = this;

					var templateType = instance.get('templateType');

					switch (templateType) {
						case 'asset-tags-selector':
						default:
							return A.AutocompleteSearchList.TPL || new A.Template(
								'<fieldset class="{[(!values.results || !values.results.length) ? "', CSS_NO_MATCHES, '" : "', STR_BLANK ,'" ]}">',
									'<tpl for="results">',
										'<label title="{text}"><input {[values.checked ? "checked" : ""]} type="checkbox" value="{text}" />{text}</label>',
									'</tpl>',
									'<div class="lfr-tag-message">{noResultsMessage}</div>',
								'</fieldset>'
							);
					}
				}
			},

			templateType: {
				value: 'asset-tags-selector'
			}
		},

		prototype: {
			initializer: function(config) {
				var instance = this;

				var inputSelector = instance.get(INPUT_SELECTOR);
				var tagsSelector = instance.get(TAG_SELECTOR);

				if (tagsSelector) {
					instance.tagsSelector = tagsSelector;

					instance.entries = tagsSelector.entries;
				}

				this.afterHostEvent(
					RENDER,
					function()
					{
						instance._createNodes(config.host.bodyNode);

						instance.bindUI();

						if (tagsSelector || inputSelector) {
							var onCheckboxClick = A.bind(instance._onCheckboxClick, instance);

							instance.entriesNode.delegate(CLICK, onCheckboxClick, 'input[type=checkbox]');
						}
					}
				);
			},

			bindUI: function() {
				var instance = this;

				instance.before(
					'results',
					function(event)
					{
						var result_data = instance._formatEventResults(event);

						instance._renderEntries(result_data);
					}
				);

				if (instance.get(SEARCH_INITIALLY)) {
					instance._initialSearch();
				}
			},

			_createNodes: function(bodyNode) {
				var instance = this;

				var entriesNode = A.Node.create(TPL_AC_SEARCH_LIST);
				var inputNode = A.Node.create(TPL_AC_CONTAINER + TPL_AC_INPUT);

				bodyNode.append(inputNode);
				bodyNode.append(entriesNode);

				instance.inputNode = inputNode;
				instance.entriesNode = entriesNode;
			},

			_initialSearch: function() {
				var instance = this;

				if (instance.tagsSelector) {
					var initial_data = instance._formatInitialSearch();

					instance._renderEntries(initial_data);
				}
				else {
					instance.sendRequest(STR_BLANK);
				}
			},

			_formatInitialSearch: function() {
				var instance = this;

				var initialResult = instance.get('initialResult');

				A.Array.map(
					initialResult,
					function(item, index, collection)
					{
						item.checked = item.assetCount;
						item.text = item.name;
					}
				);

				return {
					results: initialResult
				};
			},

			_formatEventResults: function(event) {
				var instance = this;

				var formattedResults = A.Array.map(
					event.results, 
					function(item, index, collection)
					{
						var entries = instance.entries;

						if (entries) {
							if (instance.tagsSelector) {
								item.raw.checked = entries.indexOfKey(item.text) > -1 ? TPL_CHECKED : STR_BLANK;
							}
							else {
								item.raw.checked = arrayIndexOf(entries, item.text) > -1 ? TPL_CHECKED : STR_BLANK;
							}
						}

						return item.raw;
					}
				);

				return {
					results: formattedResults
				};
			},

			_renderEntries: function(data) {
				var instance = this;

				data.noResultsMessage = instance.get('noResultsMessage');

				var template = instance.get('template');

				template.render(data, instance.entriesNode);
			},

			_onCheckboxClick: function(event) {
				var instance = this;

				var checkbox = event.currentTarget;

				var checked = checkbox.get(CHECKED);
				var checkboxValue = checkbox.val();

				var inputSelector = instance.get(INPUT_SELECTOR);
				var tagsSelector = instance.get(TAG_SELECTOR);

				if (tagsSelector) {
					var action = checked ? ADD : REMOVE;

					instance.tagsSelector[action](checkboxValue);
				}
				else if (inputSelector) {
					var inputSelectorNode = A.one(inputSelector);

					var nodeValue = inputSelectorNode.val();

					var entries = instance.entries || [];

					if (checked) {
						nodeValue = nodeValue ? nodeValue + COMMA_SPACE + checkboxValue : checkboxValue;

						entries.push(checkboxValue);
					}
					else {
						var regEx = new RegExp(COMMA_SPACE + checkboxValue);
						nodeValue = nodeValue.replace(regEx, STR_BLANK);

						regEx = new RegExp(checkboxValue);
						nodeValue = nodeValue.replace(regEx, STR_BLANK);

						if (nodeValue.indexOf(COMMA_SPACE) === 0) {
							nodeValue = nodeValue.substring(2);
						}

						var index = arrayIndexOf(entries, checkboxValue);

						var updatedEntries = entries.splice(index, 1);
					}

					inputSelectorNode.val(nodeValue);

					instance.entries = entries;
				}
			}
		}
	},
	true
);

A.AutocompleteSearchList = A.Component.build(NAME, A.Plugin.Base, [A.AutoCompleteBase, AutocompleteSearchList]);

A.AutocompleteSearchList.NS = NAME;