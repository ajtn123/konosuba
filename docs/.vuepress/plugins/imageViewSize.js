import { imageSize } from 'image-size';
import fs from 'fs';
import path from 'path';

export const imageViewSizePlugin = () => {
    return {
        name: 'image-view-size',
        extendsMarkdown(md) {
            md.core.ruler.before('normalize', 'add-image-view-size', (state) => {
                state.src = state.src.replace(/(<ImageView\s+)([^>]*?)(\s*\/?>)/gi, (match, prefix, attrs, suffix) => {
                    if (/\bwidth=/i.test(attrs) && /\bheight=/i.test(attrs)) return match;

                    const srcMatch = attrs.match(/src="\/([^"]+)"/i);
                    if (!srcMatch) return match;
                    const src = srcMatch[1];

                    const file = path.resolve('docs/.vuepress/public', src);

                    const image = fs.readFileSync(file);
                    const size = imageSize(image);
                    return `${prefix}${attrs} width="${size.width}" height="${size.height}" ${suffix}`;
                });
            });
        },
    };
};
