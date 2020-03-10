<template>
    <div id="background">
        <div id="main">
            <el-card style="height:420px;width: 450px; margin: 5px auto; padding-top:10px;">
                <span id="title" class="contentSpan">UML</span>
                <el-form ref="form" :model="form" label-width="80px" style="width: 350px;">
                    <el-form-item label="用户名">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.userPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.userEmail"></el-input>
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
                        <el-button style="width: 270px;" type="primary" @click="register()" round>注册</el-button>
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
//import axios from 'axios';
//import '../js/nodemailer.js';
export default {
    name: "register",
    data() {
        return {
            form: {
                userName: "",
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
        register() {
            //@TODO 判断用户名是否为空、用户名长度不超过10、密码是否为空、验证码输入是否正确
            //@TODO email邮件验证码
            var self = this;
            self.$axios
                .get("/register", {
                    params: {
                        userName: self.form.userName,
                        userEmail: self.form.userEmail,
                        userPassword: self.form.userPassword,
                        code: self.form.code
                    }
                })
                .then(function(response) {
                    console.log("success, response.data--", response.data);
                    if (response.data) {
                        self.$message({
                            message: "注册成功",
                            type: "success"
                        });
                        self.$router.push({ name: "Login" });
                    } else {
                        self.$message({
                            message: "验证码错误",
                            type: "error"
                        });
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
                .get("/sendMailCode", {
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
    }
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
    padding-top: 50px;
}
</style>