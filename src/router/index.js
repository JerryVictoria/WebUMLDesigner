import Vue from "vue";
import VueRouter from "vue-router";
import DiagramCanvas from "../views/designer/DiagramCanvas.vue"
import About from "../views/About.vue"
import Login from "../views/Login.vue";
import ForgetPW from "../views/ForgetPW.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "DiagramCanvas",
    component: DiagramCanvas
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


];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;