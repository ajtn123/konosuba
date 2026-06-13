export const rubyFallbackPlugin = () => {
    return {
        name: 'ruby-fallback',
        extendsMarkdown(md) {
            md.core.ruler.before('normalize', 'add-ruby-fallback', (state) => {
                state.src = state.src.replace(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/gi, (match, base, annotation) => {
                    if (/<rp>/i.test(base)) return match;

                    return `<ruby>${base}<rp>（</rp><rt>${annotation}</rt><rp>）</rp></ruby>`;
                });
            });
        },
    };
};
