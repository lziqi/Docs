const { description } = require("../../package");

module.exports = {
  base: "/IoT/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "物联网学习指南",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Lziqi",
        link: "https://lziqi.top",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "教程",
          collapsable: false,
          children: [
            "",
            "安装构建RT-Thread开发环境",
            "RTOS线程的使用",
            "RTOS点亮LED灯",
            "RTOS获取SHT30温湿度数据",
            "RTOS AT模块使用",
            "RTOS MQTT协议初探",
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
