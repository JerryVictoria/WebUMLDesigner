import Vue from "vue";
import VueRouter from "vue-router";
import DiagramCanvas from "../views/designer/DiagramCanvas.vue"
import Designer from "../views/designer/Designer.vue"
import About from "../views/About.vue"
import Login from "../views/Login.vue";
import ForgetPW from "../views/ForgetPW.vue";
import Register from "../views/Register.vue";
import PersonalPage from "../views/PersonalPage.vue";
import ComponentsStoreSideBar from "../views/designer/ComponentsStoreSideBar.vue";
import Test from "../views/Test.vue"

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "DiagramCanvas",
    component: DiagramCanvas
  },
  {
    path: "/designer",
    name: "Designer",
    component: Designer
  },
  {
    path: "/about",
    name: "About",
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //  import( /* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/forgetpw",
    name: "ForgetPW",
    component: ForgetPW
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/personal",
    name: "PersonalPage",
    component: PersonalPage
  },
    {
        path: "/c",
        name: "ComponentsStoreSideBar",
        component: ComponentsStoreSideBar
    },
  {
    path: "/test",
    name: "Test",
    component: Test
  },

];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;