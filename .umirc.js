import theme from '@/theme'
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  theme: theme,
  // 将 path: '/' 放在最后，否则无法匹配到其他一级路由
  routes: [
    {
      path: '/login',
      component: '../pages/login'
    },
    {
      path: '/video',
      component: '../pages/video'
    },
    {
      path: '/',
      component: '../layouts/BaseLayout',
      routes: [
        { path: '/', component: '../pages/chart' },
        { path: '/list', component: '../pages/list' },
        { path: '/home', component: '../pages/home' },
        { path: '/listView', component: '../pages/listView' }
      ]
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'umi-demo',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }]
  ],
  proxy: {
    '/proxyApi': {
      // target: 'https://iop.inceptio.cn',
      // target: 'https://ioptest.inceptio.cn',
      target: 'http://10.8.9.109',
      changeOrigin: true,
      pathRewrite: {
        '^/proxyApi': '/'
      }
    },
  },
}
