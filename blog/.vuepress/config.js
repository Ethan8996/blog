const path = require("path");
module.exports = (options, context, api) => {
  return {
    title: "Ethan Xiong",
    description: "Web development, Frontend, JavaScript",
    base: '/blog/',  // 替换为你的仓库名
    theme: "@vuepress/blog",
    head: [
      ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    ],
    plugins: [
      [
        "@vuepress/google-analytics",
        {
          ga: process.env.GA
        }
      ],
      [
        '@vuepress/plugin-register-components',
        {
          componentsDir: path.resolve(__dirname, './components')
        }
      ]
    ],
    markdown: {
      anchor: {
        permalinkSymbol: '#',
        permalink: true,
        slugify: (s) => {
          // Convert Chinese characters to pinyin or use a simple hash
          return encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-'));
        }
      },
      toc: { includeLevel: [2, 3] }
    },
    themeConfig: {
      directories: [
        {
          id: "zh",
          dirname: "_zh",
          path: "/zh/",
          itemPermalink: "/zh/:year/:month/:day/:slug",
          layout: 'Layout',
          itemLayout: 'Post',
          frontmatter: { title: '' },
          pagination: {
            lengthPerPage: 8,
            prevText: '上一页',
            nextText: '下一页'
          }
        },
        {
          id: "en",
          dirname: "_en",
          path: "/en/",
          itemPermalink: "/en/:year/:month/:day/:slug",
          layout: 'Layout',
          itemLayout: 'Post',
          pagination: {
            lengthPerPage: 8,
            prevText: 'Previous',
            nextText: 'Next'
          }
        }
      ],
      nav: [
        {
          text: "部落格",
          link: "/zh/"
        },
        {
          text: "Blog",
          link: "/en/"
        },
        {
          text: "Resume",
          link: "/resume/"
        },
        {
          text: "Github",
          link: "https://github.com/Ethan8996"
        }
      ],
      containerWidth: '80%',  
      contentWidth: '100%',   
      footer: {
        contact: [
          {
            type: "github",
            link: "https://github.com/Ethan8996"
          }
        ]
      },
      smoothScroll: true
    },
    alias: {
      "@assets": path.resolve(__dirname, "../assets")
    }
  };
};
