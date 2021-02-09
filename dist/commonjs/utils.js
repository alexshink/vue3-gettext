"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTranslations = exports.normalizeTranslationKey = void 0;
function normalizeTranslationKey(key) {
    return key
        .replace(/\r?\n|\r/, "")
        .replace(/\s\s+/g, " ")
        .trim();
}
exports.normalizeTranslationKey = normalizeTranslationKey;
function normalizeTranslations(translations) {
    var newTranslations = {};
    Object.keys(translations).forEach(function (lang) {
        var langData = translations[lang];
        var newLangData = {};
        Object.keys(langData).forEach(function (key) {
            newLangData[normalizeTranslationKey(key)] = langData[key];
        });
        newTranslations[lang] = newLangData;
    });
    return newTranslations;
}
exports.normalizeTranslations = normalizeTranslations;
//# sourceMappingURL=utils.js.map