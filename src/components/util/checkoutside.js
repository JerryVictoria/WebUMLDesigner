import Vue from "vue";
Vue.directive("clickoutside", {
    bind: function(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false; //点击内部不要关闭
            }
            if (binding.expression) {
                binding.value(e); //执行指定函数，不知道书里为什么写了一个参数，不写也是正常运行
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    unbind: function(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
});
