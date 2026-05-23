/**
 * VuePress 插件：自动为 <ruby> 标签添加 <rp> 回退括号
 *
 * <ruby>汉字<rt>注音</rt></ruby> -> <ruby>汉字<rp>（</rp><rt>注音</rt><rp>）</rp></ruby>
 */
export const rubyEnhancerPlugin = () => {
    return {
        name: 'ruby-enhancer',

        extendsMarkdown(md) {
            md.core.ruler.before('normalize', 'add-rp-to-ruby', (state) => {
                // 匹配 <ruby> 标签
                const rubyRegex = /<ruby>(.*?)<\/ruby>/gi;

                state.src = state.src.replace(rubyRegex, (match, inner) => {
                    // 如果已经包含 <rp>，跳过
                    if (/<rp>/i.test(inner)) return match;

                    // 在每个 <rt> 前插入 <rp>(</rp>
                    let processed = inner.replace(/(<rt>)/gi, '<rp>（</rp>$1');
                    // 在每个 </rt> 后插入 <rp>）</rp>
                    processed = processed.replace(/(<\/rt>)/gi, '$1<rp>）</rp>');

                    return `<ruby>${processed}</ruby>`;
                });
            });
        },
    };
};
