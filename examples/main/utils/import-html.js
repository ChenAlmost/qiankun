import { fetchResource } from './fetch-resource';
export const importHTML = async (url) => {
  const html = await fetchResource(url);
  const template = document.createElement('div');
  template.innerHTML = html;

  const scripts = template.querySelectorAll('script');
  function getExternalScripts() {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute('src');
        if (!src) {
          return Promise.resolve(script.innerHTML);
        } else {
          const targetUrl = src.startsWith('http') ? src : `${url}/${src}`;
          console.log('targetUrl..', targetUrl);
          return fetchResource(targetUrl);
        }
      }),
    );
  }

  async function execScripts() {
    const scripts = await getExternalScripts();

    const module = { exports: {} };
    const exports = module.exports;
    scripts.forEach((code) => {
      eval(code);
    });
    console.log(module.exports);

    return module.exports;
  }
  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
