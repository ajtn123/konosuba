import { defineThemeConfig, defineCollections, defineCollection, defineNavbarConfig } from 'vuepress-theme-plume';

export default defineThemeConfig({
  logo: 'https://theme-plume.vuejs.press/plume.png',
  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/ajtn123/konosuba' },
  ],

  footer: {
    message: '你好',
  },

  navbar: defineNavbarConfig([
    {
      text: '首页',
      link: '/'
    },
    {
      text: '目录',
      link: '/read/'
    },
  ]),

  collections: defineCollections([
    {
      type: 'doc',
      dir: 'read',
      title: '阅读',
      sidebar: [
        {
          text: '为美好的世界献上祝福！',
          collapsed: false,
          prefix: 'main',
          items: 'auto'
        }
      ]
    },
  ]),
});
