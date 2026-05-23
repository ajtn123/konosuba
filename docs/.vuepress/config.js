import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { plumeTheme } from 'vuepress-theme-plume';
import { imageSizeInjectorPlugin } from './plugins/imageSizeInjector.js';

export default defineUserConfig({
  base: '/konosuba/',
  lang: 'zh-CN',
  title: '素晴',
  description: '为美好的世界献上祝福！',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/konosuba/plume.png' }],
  ],

  bundler: viteBundler(),

  extendsBundlerOptions: (options, app) => {
    options.viteOptions ??= {};
    options.viteOptions.build ??= {};
    options.viteOptions.build.chunkSizeWarningLimit = 2 << 16;
    options.viteOptions.build.rolldownOptions ??= {};
    options.viteOptions.build.rolldownOptions.checks ??= {};
    options.viteOptions.build.rolldownOptions.checks.pluginTimings = false;

    // 移除 Inter 字体
    options.viteOptions.plugins ??= [];
    options.viteOptions.plugins.push({
      name: 'remove-inter-font',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('plugin-fonts') && id.includes('fonts.css')) {
          return { code: '', map: null };
        }
      },
    });
  },

  shouldPrefetch: false,
  search: { provider: 'local' },
  markdown: { breaks: true },

  plugins: [
    imageSizeInjectorPlugin(),
  ],

  theme: plumeTheme({
    hostname: 'https://ajtn123.github.io',

    autoFrontmatter: false,

    lastUpdated: false,
    contributors: false,

    markdown: {
      annotation: true,
      math: false
    }
  }),
});
