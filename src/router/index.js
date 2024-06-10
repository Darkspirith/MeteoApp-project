import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LocalityView from "../views/LocalityView.vue";
import BugReportView from "@/views/BugReportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Strona główna",
        ariaLabel: "Strona główna",
      },
    },
    {
      path: "/Pogoda/:state/:city",
      name: "LocalityView",
      component: LocalityView,
      meta: {
        title: "Pogoda dla wybranej miejscowości",
        ariaLabel: "Pogoda dla wybranej miejscowości",
      },
    },
    {
      path: "/ZglosBlad",
      name: "BugReportView",
      component: BugReportView,
      meta: {
        title: "Zgłoś błąd w aplikacji",
        ariaLabel: "Zgłoś błąd w aplikacji",
      },
    },
 
  ],
});

export default router;
