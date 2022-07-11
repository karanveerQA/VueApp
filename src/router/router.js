import { createWebHistory, createRouter } from "vue-router";
import HomeComponent from "./../components/HomeComponent";
import AboutUsComponent from "./../components/AboutUsComponent";
import ContactUsComponent from "./../components/ContactUsComponent";
import ImageListComponent from "./../components/ImageListComponent";
import SignUpComponent from "./../components/SignUpComponent";
import LogInComponent from "./../components/LogInComponent";
import UpdateTechnologyComponent from "./../components/UpdateTechnologyComponent";
import CreateTechnologyComponent from "./../components/CreateTechnologyComponent";
const routes = [
  {
    path: "/home",
    component: HomeComponent,
    children: [
      { path: "images", component: ImageListComponent },
      { path: "update/:id", component: UpdateTechnologyComponent },
      { path: "create", component: CreateTechnologyComponent },
    ],
  },
  {
    path: "/about",
    component: AboutUsComponent,
  },
  {
    path: "/contactus",
    component: ContactUsComponent,
  },
  {
    path: "/signup",
    component: SignUpComponent,
  },
  {
    path: "/login",
    component: LogInComponent,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
