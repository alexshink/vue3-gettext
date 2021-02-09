"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGettext = exports.createGettext = exports.GetTextSymbol = void 0;
var vue_1 = require("vue");
var component_1 = require("./component");
var directive_1 = require("./directive");
var interpolate_1 = require("./interpolate");
var translate_1 = require("./translate");
var utils_1 = require("./utils");
var defaultOptions = {
    availableLanguages: { en_US: "English" },
    defaultLanguage: "en_US",
    mutedLanguages: [],
    silent: false,
    translations: {},
    setGlobalProperties: true,
    provideDirective: true,
    provideComponent: true,
};
exports.GetTextSymbol = Symbol("GETTEXT");
function createGettext(options) {
    if (options === void 0) { options = {}; }
    Object.keys(options).forEach(function (key) {
        if (Object.keys(defaultOptions).indexOf(key) === -1) {
            throw new Error(key + " is an invalid option for the translate plugin.");
        }
    });
    var mergedOptions = __assign(__assign({}, defaultOptions), options);
    var translations = vue_1.reactive({ value: utils_1.normalizeTranslations(mergedOptions.translations) });
    var gettext = vue_1.reactive({
        available: mergedOptions.availableLanguages,
        muted: mergedOptions.mutedLanguages,
        silent: mergedOptions.silent,
        translations: vue_1.computed({
            get: function () {
                return translations.value;
            },
            set: function (val) {
                translations.value = utils_1.normalizeTranslations(val);
            },
        }),
        current: mergedOptions.defaultLanguage,
        install: function (app) {
            app[exports.GetTextSymbol] = gettext;
            app.provide(exports.GetTextSymbol, gettext);
            if (mergedOptions.setGlobalProperties) {
                var globalProperties = app.config.globalProperties;
                globalProperties.$gettext = gettext.$gettext;
                globalProperties.$pgettext = gettext.$pgettext;
                globalProperties.$ngettext = gettext.$ngettext;
                globalProperties.$npgettext = gettext.$npgettext;
                globalProperties.$gettextInterpolate = gettext.interpolate;
                globalProperties.$language = gettext;
            }
            if (mergedOptions.provideDirective) {
                app.directive("translate", directive_1.default(gettext));
            }
            if (mergedOptions.provideComponent) {
                // eslint-disable-next-line vue/component-definition-name-casing
                app.component("translate", component_1.default);
            }
        },
    });
    var translate = translate_1.default(gettext);
    var interpolate = interpolate_1.default(gettext);
    gettext.$gettext = translate.gettext.bind(translate);
    gettext.$pgettext = translate.pgettext.bind(translate);
    gettext.$ngettext = translate.ngettext.bind(translate);
    gettext.$npgettext = translate.npgettext.bind(translate);
    gettext.interpolate = interpolate.bind(interpolate);
    gettext.directive = directive_1.default(gettext);
    gettext.component = component_1.default;
    return gettext;
}
exports.createGettext = createGettext;
var useGettext = function () { return vue_1.inject(exports.GetTextSymbol); };
exports.useGettext = useGettext;
//# sourceMappingURL=index.js.map