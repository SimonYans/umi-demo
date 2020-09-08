
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/BaseLayout',
      routes: [
        { path: '/', component: '../pages/index' },
        {
          path: '/login',
          component: '../pages/login'
        }
      ]
    },
    {
      path: '/login',
      component: '../layouts/BlankLayout',
      routes: [
        {
          name: 'login',
          path: '/login',
          component: '../pages/login'
        },
      ],
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
    }],
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
  }
}
