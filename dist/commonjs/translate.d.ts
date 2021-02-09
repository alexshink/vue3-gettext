import { Language } from ".";
declare const translate: (language: Language) => {
    getTranslation: (msgid: string, n?: number, context?: any, defaultPlural?: any, languageKey?: string) => any;
    gettext: (msgid: any) => any;
    pgettext: (context: any, msgid: any) => any;
    ngettext: (msgid: any, plural: any, n: any) => any;
    npgettext: (context: any, msgid: any, plural: any, n: any) => any;
};
export default translate;
