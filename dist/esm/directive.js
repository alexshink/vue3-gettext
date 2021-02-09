import interpolate from "./interpolate";
import translate from "./translate";
import { watch } from "vue";
var updateTranslation = function (language, el, binding, vnode) {
    var attrs = vnode.props || {};
    var msgid = el.dataset.msgid;
    var translateContext = attrs["translate-context"];
    var translateN = attrs["translate-n"];
    var translatePlural = attrs["translate-plural"];
    var isPlural = translateN !== undefined && translatePlural !== undefined;
    var disableHtmlEscaping = attrs["render-html"] === "true";
    if (!isPlural && (translateN || translatePlural)) {
        throw new Error("`translate-n` and `translate-plural` attributes must be used together:" + msgid + ".");
    }
    if (!language.silent && attrs["translate-params"]) {
        console.warn("`translate-params` is required as an expression for v-translate directive. Please change to `v-translate='params'`: " + msgid);
    }
    var translation = translate(language).getTranslation(msgid, translateN, translateContext, isPlural ? translatePlural : null, language.current);
    var context = Object.assign(binding.instance, binding.value);
    var msg = interpolate(language)(translation, context, null, disableHtmlEscaping);
    el.innerHTML = msg;
};
/**
 * A directive to translate content according to the current language.
 *
 * Use this directive instead of the component if you need to translate HTML content.
 * It's too tricky to support HTML content within the component because we cannot get the raw HTML to use as `msgid`.
 *
 * This directive has a similar interface to the <translate> component, supporting
 * `translate-comment`, `translate-context`, `translate-plural`, `translate-n`.
 *
 * `<p v-translate translate-comment='Good stuff'>This is <strong class='txt-primary'>Sparta</strong>!</p>`
 *
 * If you need interpolation, you must add an expression that outputs binding value that changes with each of the
 * context variable:
 * `<p v-translate="fullName + location">I am %{ fullName } and from %{ location }</p>`
 */
export default function directive(language) {
    var update = function (el, binding, vnode) {
        // Store the current language in the element's dataset.
        el.dataset.currentLanguage = language.current;
        updateTranslation(language, el, binding, vnode);
    };
    return {
        beforeMount: function (el, binding, vnode) {
            // Get the raw HTML and store it in the element's dataset (as advised in Vue's official guide).
            if (!el.dataset.msgid) {
                el.dataset.msgid = el.innerHTML;
            }
            watch(language, function () {
                update(el, binding, vnode);
            });
            update(el, binding, vnode);
        },
        updated: function (el, binding, vnode) {
            update(el, binding, vnode);
        },
    };
}
//# sourceMappingURL=directive.js.map