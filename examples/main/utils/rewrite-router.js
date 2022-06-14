import { handleRouter } from './handle-router';

let preRoute = '';
let nextRoute = '';

export const getPreRoute = () => preRoute;

export const getNextRoute = () => preRoute;

export const rewriteRouter = (apps) => {
  window.addEventListener('popstate', () => {
    preRoute = nextRoute;
    nextRoute = window.location.pathname;
    handleRouter(apps);
  });

  const originPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    preRoute = window.location.pathname;
    originPushState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter(apps);
  };

  const originReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    preRoute = window.location.pathname;
    originReplaceState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter(apps);
  };
};
