import { Router } from "@vaadin/router";
console.log("Soy el router");

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "init-welcome" },
  // { path: "/", component: "" },
]);
