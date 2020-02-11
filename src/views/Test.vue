<template>
    <el-button @click="handleClick">test axios</el-button>
</template>
<script>
export default {
    name: "test",
    methods: {
        handleClick() {
            this.$axios
                .get("/users", {
                    params: {
                        userEmail: "username",
                        userPassword: "password"
                    }
                })
                .then(function(response) {
                    console.log("success");
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        }
    }
};
</script>