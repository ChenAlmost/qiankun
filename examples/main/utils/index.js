import { handleRouter } from './handle-router';
import { rewriteRouter } from './rewrite-router';
let _apps = [];

export const getApps = () => _apps;

export const registerMicroApps = (apps) => {
  _apps = apps;
};

export const start = () => {
  // 监视路由变化 浏览器的前进后退
  rewriteRouter();
  // 初始化执行匹配
  handleRouter();
  // 匹配子应用

  // 加载子应用

  // 渲染子应用
};
