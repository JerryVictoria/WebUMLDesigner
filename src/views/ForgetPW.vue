<template>
    <div id="background">
        <div id="main">
            <el-card style="height:360px;width: 450px; margin: 5px auto; padding-top:10px;">
                <span id="title" class="contentSpan">UML</span>
                <el-form ref="form" :model="form" label-width="80px" style="width: 350px;">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.userEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.userPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input v-model="form.code" style="width:155px;"></el-input>
                        <el-button
                            style="margin-left: 5px; width: 110px;"
                            @click="sendEmailCode"
                            :disabled="btnText != '发送验证码'"
                            round
                        >{{btnText}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            style="width: 270px;"
                            type="primary"
                            @click="resetPwd()"
                            round
                        >重置密码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="text"
                            style="margin-top:-20px;float: right"
                            @click="login()"
                        >返回登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "forget-p-w",
    data() {
        return {
            form: {
                userPassword: "",
                userEmail: "",
                code: ""
            },
            btnText: "发送验证码"
        };
    },
    methods: {
        login() {
            this.$router.push({ name: "Login" });
        },
        resetPwd() {
            var self = this;
            this.$axios
                .post("/resetPwd", {
                    userEmail: self.form.userEmail,
                    userPassword: self.form.userPassword,
                    code: self.form.code
                })
                .then(function(response) {
                    self.$message({
                        message: response.data,
                        type: "info"
                    });
                    if (response.data == "密码已重置") {
                        self.login();
                    }
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        },
        setBtnText() {
            var count = 60;
            var self = this;
            var id = setInterval(() => {
                count--;
                self.btnText = "请稍等" + count + "秒";
                if (count == 0) {
                    clearInterval(id);
                    self.btnText = "发送验证码";
                }
            }, 1000);
        },
        sendEmailCode() {
            if (this.form.userEmail == "") {
                this.$message({
                    message: "邮箱地址不能为空",
                    type: "error"
                });
                return;
            }
            this.setBtnText();
            var self = this;
            self.$axios
                .get("/sendFindPwdCode", {
                    params: {
                        userEmail: self.form.userEmail
                    }
                })
                .then(function(response) {
                    console.log(response.data);
                    self.$message({
                        message: response.data,
                        type: "info"
                    });
                })
                .catch(function(error) {
                    console.log("error:" + error);
                });
        }
    },
    date: {}
};
</script>
<style scoped>
#background {
    width: 100%;
    min-height: 800px;
    background: url("../assets/grid.png") repeat;
    margin-top: -10px;
}
#title {
    font-family: Cursive; /***Serif、Sans-serif、Monospace、Cursive、Fantasy ***/
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    color: #666;
}
#main {
    padding-top: 80px;
}
</style>