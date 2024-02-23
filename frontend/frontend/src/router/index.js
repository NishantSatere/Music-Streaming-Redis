import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../components/DashboardView.vue";

import LoginView from "../components/LoginView.vue";
import RegisterView from "../components/RegisterView.vue";
import AdminloginView from "../components/AdminloginView.vue";
import HomeView from "../components/HomeView.vue";
import CardView from "../components/CardView.vue";
import CreatorsView from "../components/CreatorsView.vue";
import UploadsongView from "../components/UploadsongView.vue";
import AdmindashboardView from "../components/AdmindashboardView.vue";
import AdmintracksView from "../components/AdmintracksView.vue";
import ProfileView from "../components/ProfileView.vue";
import UserdashboardView from "../components/UserdashboardView.vue";

const routes = [
  {
    path: "/",
    name: "DashboardView",
    component: DashboardView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/adminlogin",
    name: "AdminloginView",
    component: AdminloginView,
  },
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/card",
    name: "CardView",
    component: CardView,
  },
  {
    path: "/creator",
    name: "CreatorsView",
    component: CreatorsView,
  },
  {
    path: "/upload",
    name: "UploadsongView",
    component: UploadsongView,
  },
  {
    path: "/userdash",
    name: "UserdashboardView",
    component: UserdashboardView,
  },
  // ADMIN
  {
    path: "/dashboard",
    name: "AdmindashboardView",
    component: AdmindashboardView,
  },
  {
    path: "/tracks",
    name: "AdmintracksView",
    component: AdmintracksView,
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
