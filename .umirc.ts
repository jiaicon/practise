const path = require('path');

export default {
  npmClient: 'yarn',
  alias: {
    '@assets': path.resolve('./src/assets'),
  },
  clientLoader: {}, // 路由数据预加载
  define: {
    'process.env.REACT_ENV': process.env.REACT_ENV,
    REACT_ENV: process.env.REACT_ENV,
  }
};
