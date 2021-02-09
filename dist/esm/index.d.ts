import { App, UnwrapRef, Directive as VueDirective, WritableComputedRef } from "vue";
import Component from "./component";
export interface GetTextOptions {
    availableLanguages: {
        [key: string]: string;
    };
    defaultLanguage: string;
    mutedLanguages: Array<string>;
    silent: boolean;
    translations: {
        [key: string]: {
            [key: string]: any;
        };
    };
    setGlobalProperties: boolean;
    provideDirective: boolean;
    provideComponent: boolean;
}
export declare const GetTextSymbol: unique symbol;
export declare type Language = UnwrapRef<{
    available: GetTextOptions["availableLanguages"];
    muted: GetTextOptions["mutedLanguages"];
    silent: GetTextOptions["silent"];
    translations: WritableComputedRef<WritableComputedRef<GetTextOptions["translations"]>>;
    current: string;
    $gettext: (msgid: string) => string;
    $pgettext: (context: string, msgid: string) => string;
    $ngettext: (msgid: string, plural: string, n: number) => string;
    $npgettext: (context: string, msgid: string, plural: string, n: number) => string;
    interpolate: (msgid: string, context: object, disableHtmlEscaping?: boolean) => string;
    install: (app: App) => void;
    directive: VueDirective;
    component: typeof Component;
}>;
export declare function createGettext(options?: Partial<GetTextOptions>): {
    available: {
        [x: string]: string;
    };
    muted: string[];
    silent: boolean;
    translations: WritableComputedRef<{
        [key: string]: {
            [key: string]: any;
        };
    }>;
    current: string;
    $gettext: (msgid: string) => string;
    $pgettext: (context: string, msgid: string) => string;
    $ngettext: (msgid: string, plural: string, n: number) => string;
    $npgettext: (context: string, msgid: string, plural: string, n: number) => string;
    interpolate: (msgid: string, context: object, disableHtmlEscaping?: boolean) => string;
    install: (app: App<any>) => void;
    directive: import("vue").DirectiveHook<any, any, any> | {
        created?: import("vue").DirectiveHook<any, null, any>;
        beforeMount?: import("vue").DirectiveHook<any, null, any>;
        mounted?: import("vue").DirectiveHook<any, null, any>;
        beforeUpdate?: import("vue").DirectiveHook<any, import("vue").VNode<any, any, {
            [key: string]: any;
        }>, any>;
        updated?: import("vue").DirectiveHook<any, import("vue").VNode<any, any, {
            [key: string]: any;
        }>, any>;
        beforeUnmount?: import("vue").DirectiveHook<any, null, any>;
        unmounted?: import("vue").DirectiveHook<any, null, any>;
        getSSRProps?: (binding: import("vue").DirectiveBinding<any>, vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>) => Record<string, unknown>;
    };
    component: import("vue").DefineComponent<{
        tag: {
            type: StringConstructor;
            default: string;
        };
        translateN: {
            type: NumberConstructor;
            default: any;
        };
        translatePlural: {
            type: StringConstructor;
            default: any;
        };
        translateContext: {
            type: StringConstructor;
            default: any;
        };
        translateParams: {
            type: ObjectConstructor;
            default: any;
        };
        translateComment: {
            type: StringConstructor;
            default: any;
        };
    }, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        tag: string;
        translateN: number;
        translatePlural: string;
        translateContext: string;
        translateParams: Record<string, any>;
        translateComment: string;
    } & {}>, {
        tag: string;
        translateN: number;
        translatePlural: string;
        translateContext: string;
        translateParams: Record<string, any>;
        translateComment: string;
    }>;
};
export declare const useGettext: () => Language;
