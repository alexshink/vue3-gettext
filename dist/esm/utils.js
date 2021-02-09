export function normalizeTranslationKey(key) {
    return key
        .replace(/\r?\n|\r/, "")
        .replace(/\s\s+/g, " ")
        .trim();
}
export function normalizeTranslations(translations) {
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
//# sourceMappingURL=utils.js.map