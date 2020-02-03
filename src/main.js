import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import "./components/util/checkoutside.js";
import store from "./store.js";
import router from "./router"
Vue.use(ElementUI);

Vue.config.productionTip = false;

import "./style/common.css";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");