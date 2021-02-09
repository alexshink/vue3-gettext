"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var translate_1 = require("./translate");
var vue_1 = require("vue");
var interpolate_1 = require("./interpolate");
var _1 = require(".");
/**
 * Translate content according to the current language.
 */
exports.default = vue_1.defineComponent({
    // eslint-disable-next-line vue/component-definition-name-casing
    name: "translate",
    props: {
        tag: {
            type: String,
            default: "span",
        },
        // Always use v-bind for dynamically binding the `translateN` prop to data on the parent,
        // i.e.: `:translateN`.
        translateN: {
            type: Number,
            default: null,
        },
        translatePlural: {
            type: String,
            default: null,
        },
        translateContext: {
            type: String,
            default: null,
        },
        translateParams: {
            type: Object,
            default: null,
        },
        // `translateComment` is used exclusively by `easygettext`'s `gettext-extract`.
        translateComment: {
            type: String,
            default: null,
        },
    },
    setup: function (props, context) {
        var _a;
        var isPlural = props.translateN !== undefined && props.translatePlural !== undefined;
        if (!isPlural && (props.translateN || props.translatePlural)) {
            throw new Error("`translate-n` and `translate-plural` attributes must be used together: " + ((_a = context.slots.default()[0]) === null || _a === void 0 ? void 0 : _a.children) + ".");
        }
        var root = vue_1.ref(null);
        var plugin = _1.useGettext();
        var msgid = vue_1.ref(null);
        vue_1.onMounted(function () {
            if (!msgid.value) {
                msgid.value = root.value.innerHTML;
            }
        });
        var translation = vue_1.computed(function () {
            var _a;
            var translatedMsg = translate_1.default(plugin).getTranslation(msgid.value, props.translateN || undefined, props.translateContext, isPlural ? props.translatePlural : null, plugin.current);
            return interpolate_1.default(plugin)(translatedMsg, props.translateParams, (_a = vue_1.getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.parent);
        });
        // The text must be wraped inside a root HTML element, so we use a <span> (by default).
        // https://github.com/vuejs/vue/blob/a4fcdb/src/compiler/parser/index.js#L209
        return function () {
            if (!msgid.value) {
                return vue_1.h(props.tag, { ref: root }, context.slots.default ? context.slots.default() : "");
            }
            return vue_1.h(props.tag, { ref: root, innerHTML: translation.value });
        };
    },
});
//# sourceMappingURL=component.js.map