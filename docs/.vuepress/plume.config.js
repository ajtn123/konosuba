import { defineThemeConfig, defineCollections, defineCollection, defineNavbarConfig } from 'vuepress-theme-plume';

export default defineThemeConfig({
  logo: '/plume.svg',
  appearance: true,

  social: [
    { icon: 'github', link: 'https://github.com/ajtn123/konosuba' },
  ],

  footer: {
    message: '阿克西斯教徒努力就能做到，即便失败不是信徒的错，不能成功都是世界的错。从不开心的事情中逃避即可，逃避不是失败。',
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
