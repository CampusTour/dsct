import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8001/',
      changeOrigin: true,
      pathRewrite: { '^/api': 'jsonp/' },
    },
  },
  request: {
    dataField: 'data',
  },
  publicPath: './',
  hash: true,
  history: {
    type: 'hash',
  },
});
