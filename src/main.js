import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./views/About.vue";
import Login from "./views/Login.vue";
import ForgetPW from "./views/ForgetPW.vue";
import Register from "./views/Register.vue"
import DiagramCanvas from "./views/designer/DiagramCanvas.vue"
import Personal from "./views/PersonalPage.vue"
import "./components/util/checkoutside.js";
import store from "./store.js";
import router from "./router"
Vue.use(ElementUI);

Vue.config.productionTip = false;

import "./style/common.css";

new Vue({
    router,
    store,
    render: h => h(DiagramCanvas)
}).$mount("#app");