<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    /* mounted() {
        // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
        window.onbeforeunload = function(e) {
            var storage = window.localStorage;
            storage.clear();
        };
    } */
    watch:{
        $route(to,from){
            if(from.path==="/designer"){
                console.log("_____________________________________")
                console.log(this.$children);
                this.$children.filter(function(item) {
                    item.uploadFile();
                })
                }
        },
        deep: true //对象内部属性的监听，关键
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
}
</style>