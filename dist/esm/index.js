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
import { computed, inject, reactive } from "vue";
import Component from "./component";
import Directive from "./directive";
import interpolateRaw from "./interpolate";
import translateRaw from "./translate";
import { normalizeTranslations } from "./utils";
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
export var GetTextSymbol = Symbol("GETTEXT");
export function createGettext(options) {
    if (options === void 0) { options = {}; }
    Object.keys(options).forEach(function (key) {
        if (Object.keys(defaultOptions).indexOf(key) === -1) {
            throw new Error(key + " is an invalid option for the translate plugin.");
        }
    });
    var mergedOptions = __assign(__assign({}, defaultOptions), options);
    var translations = reactive({ value: normalizeTranslations(mergedOptions.translations) });
    var gettext = reactive({
        available: mergedOptions.availableLanguages,
        muted: mergedOptions.mutedLanguages,
        silent: mergedOptions.silent,
        translations: computed({
            get: function () {
                return translations.value;
            },
            set: function (val) {
                translations.value = normalizeTranslations(val);
            },
        }),
        current: mergedOptions.defaultLanguage,
        install: function (app) {
            app[GetTextSymbol] = gettext;
            app.provide(GetTextSymbol, gettext);
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
                app.directive("translate", Directive(gettext));
            }
            if (mergedOptions.provideComponent) {
                // eslint-disable-next-line vue/component-definition-name-casing
                app.component("translate", Component);
            }
        },
    });
    var translate = translateRaw(gettext);
    var interpolate = interpolateRaw(gettext);
    gettext.$gettext = translate.gettext.bind(translate);
    gettext.$pgettext = translate.pgettext.bind(translate);
    gettext.$ngettext = translate.ngettext.bind(translate);
    gettext.$npgettext = translate.npgettext.bind(translate);
    gettext.interpolate = interpolate.bind(interpolate);
    gettext.directive = Directive(gettext);
    gettext.component = Component;
    return gettext;
}
export var useGettext = function () { return inject(GetTextSymbol); };
//# sourceMappingURL=index.js.map