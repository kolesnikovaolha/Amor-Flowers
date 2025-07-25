const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/Amor-Flowers/' : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/styles/vars.scss";
        @import "@/styles/mixins.scss";
      `,
      },
    },
  },
});
