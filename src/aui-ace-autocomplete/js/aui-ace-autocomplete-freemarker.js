/*global A, AUI*/

var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,

	DIRECTIVES = [
		'flush',
		'recover',
		'fallback',
		'local',
		'break',
		'lt',
		'case',
		'global',
		'if',
		'compress',
		'escape',
		'assign',
		'elseif',
		'noescape',
		'setting',
		'list',
		'else',
		'switch',
		'include',
		'recurse',
		'rt',
		'ftl',
		'macro',
		'stop',
		'nt',
		'visit',
		'attempt',
		'nested',
		'import',
		'default',
		'return',
		't',
		'function'
	],

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	REGEX_DIRECTIVES = /<#[\w.]*>?$/,
	REGEX_VARIABLES = /\$\{[\w.]*\}?$/,

	STATUS_ERROR = -1,
	STATUS_SUCCESS = 0,

	DOT = '.',
	STR_RESPONSE_DATA = 'responseData',
	STR_EMPTY = '',

	NAME = 'aui-ace-autocomplete-freemarker';

var Freemarker = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		io: {
			validator: Lang.isObject
		}
	},

	EXTENDS: A.Base,

	prototype: {
		initializer: function(config) {
			var instance = this;

			instance._tstree = new A.TernarySearchTree();

			instance._variableCache = {};
		},

		getMatch: function(content) {
			var instance = this;

			var match;

			var matchIndex;

			if ((matchIndex = content.lastIndexOf('<')) >= 0) {
				content = content.substring(matchIndex);

				if (REGEX_DIRECTIVES.test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_DIRECTIVES
					};
				}
			}
			else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
				content = content.substring(matchIndex);

				if (REGEX_VARIABLES.test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_VARIABLES
					};
				}
			}

			return match;
		},

		getResults: function(match, callbackSuccess, callbackError) {
			var instance = this;

			var tstree = instance._tstree;

			var type = match.type;

			if (type === MATCH_DIRECTIVES) {
				var matchDirectives = DIRECTIVES;

				var content = match.content;

				if (content.length) {
					if (instance._lastTSTLoad !== MATCH_DIRECTIVES) {
						instance._addDirectives();
					}

					matchDirectives = tstree.prefixSearch(content);
				}

				callbackSuccess(matchDirectives);
			}
			else if (type === MATCH_VARIABLES) {
				var uncachedVariables = instance._getUncachedVariables(match.content);

				if (uncachedVariables.length) {
					instance._loadUncachedVariables(match, uncachedVariables, callbackSuccess, callbackError);
				}
				else {
					var matches = instance._getVariableMatches(match.content);

					callbackSuccess(matches);
				}
			}
		},

		getSuggestion: function(match, selectedSuggestion) {
			var instance = this;

			var result = selectedSuggestion || STR_EMPTY;

			if (selectedSuggestion) {
				var type = match.type;

				if (type === MATCH_DIRECTIVES) {
					if (match.content && selectedSuggestion.indexOf(match.content) === 0) {
						result = selectedSuggestion.substring(match.content.length);
					}
				}
				else if (type === MATCH_VARIABLES) {
					var variables = match.content.split(DOT);

					var lastEntry = variables[variables.length - 1];

					if (lastEntry && selectedSuggestion.indexOf(lastEntry) === 0) {
						result = selectedSuggestion.substring(lastEntry.length);
					}
				}
			}

			return result;
		},

		_addData: function(data) {
			var instance = this;

			var tstree = instance._tstree;

			tstree.empty();

			AArray.each(
				data,
				function(item, index) {
					tstree.add(item);
				}
			);
		},

		_addDirectives: function() {
			var instance = this;

			instance._addData(DIRECTIVES);

			instance._lastTSTLoad = MATCH_DIRECTIVES;
		},

		_cacheVariables: function(response) {
			var instance = this;

			var cache = instance._variableCache;

			AObject.each(
				response,
				function(value, key) {
					var cachedValue = cache[key];

					if (AObject.isEmpty(cachedValue)) {
						cachedValue = cachedValue || {};

						AArray.each(
							value,
							function(item, index) {
								cachedValue[item] = {};
							}
						);

						cache[key] = cachedValue;
					}

					cache = cachedValue;
				}
			);
		},

		_getIO: function() {
			var instance = this;

			var io = instance._io;

			if (!io) {
				io = A.io.request(
					null,
					{
						autoLoad: false,
						dataType: 'json',
						on: {
							success: function(event, id, obj, args) {
								var response = this.get(STR_RESPONSE_DATA);

								instance._onIOSuccess(response, args);
							},
							failure: function(event, id, obj, args) {
								var response = this.get(STR_RESPONSE_DATA);

								instance._onIOFailure(response, args);
							}
						}
					}
				);

				instance._io = io;
			}

			return io;
		},

		_getVariableMatches: function(content) {
			var instance = this;

			var variables = content.split(DOT);

			var variableCache = instance._variableCache;

			var lastEntry = variables[variables.length - 1];

			variables.length -= 1;

			var variable;

			if (variables.length > 0) {
				for (var i = 0; i < variables.length; i++) {
					variable = variables[i];

					if (Lang.isObject(variableCache)) {
						variableCache = variableCache[variable];
					}
				}
			}

			var matches = [];

			if (Lang.isObject(variableCache)) {
				AArray.each(
					AObject.keys(variableCache),
					function(item, index) {
						matches.push(item);
					}
				);

				if (lastEntry) {
					var tstree = instance._tstree;

					tstree.empty();

					AArray.each(
						matches,
						function(item, index) {
							tstree.add(item);
						}
					);

					matches = tstree.prefixSearch(lastEntry);

					instance._lastTSTLoad = MATCH_VARIABLES;
				}
			}

			return matches;
		},

		_makeIORequest: function(query, args, callbackSuccess, callbackError) {
			var instance = this;

			var ioConfig = instance.get('io');

			var ioRequest = instance._getIO();

			ioRequest.stop();

			ioRequest.setAttrs(
				{
					'arguments': A.merge(
						{
							callbacks: {
								success: callbackSuccess,
								failure: callbackError
							}
						},
						args
					),
					data: A.merge(ioConfig.data || {}, query),
					uri: ioConfig.uri
				}
			);

			ioRequest.start();
		},

		_getUncachedVariables: function(content) {
			var instance = this;

			var variables = content.split(DOT);

			variables.length -= 1;

			var variableCache = instance._variableCache;

			var queries = [];

			if (AObject.isEmpty(variableCache)) {
				queries.push(STR_EMPTY);
			}

			var query;

			for (var i = 0; i < variables.length; i++) {
				query = variables[i];

				if (!Lang.isObject(variableCache) || !Lang.isValue(variableCache[query])) {
					queries.push(query);
				}
				else {
					variableCache = variableCache[query];
				}
			}

			return queries;
		},

		_loadUncachedVariables: function(match, uncachedVariables, callbackSuccess, callbackError) {
			var instance = this;

			var res = {
				test: ['test1', 'test11', 'test1123', 'test141234', 'test16345', 'test1567', 'test1sdfg', 'b', 'c'],
				test1: ['test2', 'e', 'f'],
				test2: ['test3', 'g', 'i']
			};

			window.setTimeout(
				function() {
					console.log('_loadUncachedVariables loaded');

					instance._cacheVariables(res);

					var matches = instance._getVariableMatches(match.content);

					callbackSuccess(matches);
				},
				1000
			);

			/*
			instance._makeIORequest(
				{
					query: uncachedVariables,
					type: 'variable'
				},
				{
					content: match.content,
					type: 'variable'
				},
				function(response) {
					var status = response.status;

					if (status !== STATUS_SUCCESS) {
						callbackError(response);
					}
					else {
						var matches = instance._getVariableMatches(match.content);

						callbackSuccess(matches);
					}
				},
				function(response) {
					callbackError(response);
				}
			);
			*/
		},

		_onIOFailure: function(response, args) {
			var instance = this;

			if (Lang.isFunction(args.callbacks.success)) {
				args.callbacks.failure(response);
			}
		},

		_onIOSuccess: function(response, args) {
			var instance = this;

			args.callbacks.success(response);
		}
	}
});

Freemarker.DIRECTIVES = DIRECTIVES;

A.AceEditor.AutoCompleteFreemarker = Freemarker;