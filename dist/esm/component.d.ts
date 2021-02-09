declare const _default: import("vue").DefineComponent<{
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
/**
 * Translate content according to the current language.
 */
export default _default;
