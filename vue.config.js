const { defineConfig } = require('@vue/cli-service');

const publicPaths = {
  github: '/Amor-Flowers/',
  netcheap: './',
};

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPaths[process.env.VUE_APP_DEPLOY_TARGET] || '/',
  outputDir: 'docs',
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
  chainWebpack: (config) => {
    // Отключаем стандартную обработку SVG для папки спрайтов
    config.module
      .rule('svg')
      .exclude.add(/src\/assets\/sprites/)
      .end();

    // Добавляем raw-loader для SVG-спрайтов
    config.module
      .rule('sprite-svg')
      .test(/\.svg$/)
      .include.add(/src\/assets\/sprites/)
      .end()
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
});
