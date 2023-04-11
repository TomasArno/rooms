import { initWelcome } from "./pages/welcome";
import { initChat } from "./pages/chat";

function handleRoute(route) {
  const rootEl = document.querySelector(".root") as HTMLElement;

  const routes = [
    {
      path: /\/welcome/,
      handler: () => initWelcome(),
    },
    {
      path: /\/chat/,
      handler: () => initChat(),
    },
  ];

  for (const r of routes) {
    if (r.path.test(route)) {
      const el = r.handler();

      if (rootEl.hasChildNodes()) {
        rootEl.textContent = "";
      }
      rootEl.appendChild(el);
    }
  }
}
export function goTo(path) {
  history.pushState({}, "", path);
  handleRoute(path);
}
