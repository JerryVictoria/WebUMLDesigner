<template>
    <div class="about">
        <h1>This is an about page</h1>
        <el-button @click="handleClick">这是一个跳转示范</el-button>
    </div>
</template>
<script>
export default {
    name: "About",
    methods: {
        handleClick() {
            console.log("to other pages");
            this.$router.push({ name: "DiagramCanvas" }); //可以在这里加参数params:{}
        }
    }
};
</script>
