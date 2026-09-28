import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://www.uniduke.ac.cn",
    title: "大橘官的精神角落",
    description: "大橘官的精神角落：记录技术踩坑、生活随想与碎碎念。聊聊代码、聊聊日常，偶尔撩撩猫。",
    author: "大橘官",
    profile: "https://www.uniduke.ac.cn/about/",
    ogImage: "og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/UniDuke/astro-blog" },
    { name: "x", url: "https://x.com/unidukelee" },
    { name: "mail", url: "mailto:uniduke.lee@gmail.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
