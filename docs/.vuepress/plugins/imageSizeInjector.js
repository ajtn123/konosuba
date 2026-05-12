import { imageSize } from 'image-size';
import fs from 'fs';
import path from 'path';

export const imageSizeInjectorPlugin = () => {
    const publicDir = path.resolve(process.cwd(), 'docs/.vuepress/public');

    return {
        name: 'image-size-injector',

        extendsMarkdown(md) {
            md.core.ruler.before('normalize', 'inject-image-view-size', (state) => {
                const regex = /(<ImageView\s+)([^>]*?)(\/?\s*>)/gi;
                const originalSrc = state.src;

                state.src = originalSrc.replace(regex, (match, prefix, attrs, suffix) => {
                    // 提取 src 属性
                    const srcMatch = attrs.match(/src\s*=\s*["']([^"']+)["']/i);
                    if (!srcMatch) return match;

                    const imgSrc = srcMatch[1];

                    // 跳过远程图片
                    if (/^https?:\/\//i.test(imgSrc)) return match;

                    // 跳过已有 width 和 height 的标签
                    if (/\bwidth\s*=/i.test(attrs) && /\bheight\s*=/i.test(attrs)) return match;

                    // 解析本地图片路径
                    const cleanSrc = imgSrc.replace(/^\//, '');
                    const filePath = path.resolve(publicDir, cleanSrc);

                    if (!fs.existsSync(filePath)) return match;

                    try {
                        const buf = fs.readFileSync(filePath);
                        const dims = imageSize(buf);
                        return `${prefix}${attrs.trim()} width="${dims.width}" height="${dims.height}"${suffix}`;
                    } catch {
                        return match;
                    }
                });
            });
        },
    };
};
