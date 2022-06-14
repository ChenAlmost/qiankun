import { importHTML } from './import-html';
import { getApps } from './index';
import { getNextRoute, getPreRoute } from './rewrite-router';
export const handleRouter = async () => {
  const apps = getApps();

  // 卸载上一个应用
  const preApp = apps.find((item) => {
    return getPreRoute().startsWith(item.activeRule);
  });

  // 匹配子应用
  // 获取当前路径
  // 去apps里查找子应用
  // 获取下一个应用
  const app = apps.find((item) => getNextRoute().startsWith(item.activeRule));

  if (preApp) {
    await unmount(preApp);
  }
  if (!app) {
    return;
  }

  // 加载子应用
  // 请求获取子应用的资源 html, css ,js

  // const html = await fetch(app.entry).then((res) => res.text());
  // const container = document.querySelector(app.container);
  // js 没有执行
  // container.innerHTML = html;
  const container = document.querySelector(app.container);
  const { template, getExternalScripts, execScripts } = await importHTML(app.entry);
  container.appendChild(template);

  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/';
  const appConfig = execScripts();

  app.bootstrap = appConfig.bootstrap;
  app.mount = appConfig.mount;
  app.unmount = appConfig.unmount;

  await bootstrap(app);

  await mount(app);

  // 手动加在子应用的script
  // 执行script中的代码
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}
async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}
async function unmount(app) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }));
}
