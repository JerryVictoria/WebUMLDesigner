<template>
    <div id="background">
        <div id="main">
            <div id="login">
                <p id="title">UML</p>
                <!--只可以邮箱号登录-->
                <!--v-model="username"-->
                <div id="input">
                    <input id="mailbox" v-model="Mailbox" type="text" placeholder="请输入邮箱号" />
                    <input id="password" v-model="Password" type="password" placeholder="请输入密码" />
                </div>
                <el-button
                    style="width:400px; margin: 10px 0px"
                    type="primary"
                    @click="Login()"
                    round
                >登录</el-button>
                <div>
                    <el-button
                        style="float: right; margin-left:10px"
                        type="text"
                        @click="forgetPW()"
                    >忘记密码</el-button>
                    <el-button style="float: right" type="text" @click="register()">注册</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            Mailbox: "",
            Password: ""
        };
    },
    methods: {
        Login() {
            //获取邮箱号密码
            console.log(this.Mailbox);
            console.log(this.Password);
            //判断是否是正确的邮箱号
            if (this.Mailbox === "" || this.Password === "") {
                alert("邮箱名或用户名为空！");
            } else {
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                /* if (!reg.test(this.Mailbox)) {
                    alert("请输入正确的邮箱");
                } else { */
                console.log("邮箱和密码都输入正确");
                //前后端传数据
                var self = this;
                self.$axios
                    .post("/login", {
                        userEmail: self.Mailbox,
                        userPassword: self.Password
                    })
                    .then(function(response) {
                        console.log("success: response.data--", response.data);
                        if (response.data != -1) {
                            self.$message({
                                message: "登录成功",
                                type: "success"
                            });
                            self.$store.commit("setuserId", {
                                id: response.data
                            });
                            //console.log("login:"+self.$store.state.UML.userId);
                            self.$router.push({ name: "PersonalPage" });
                        } else {
                            //@TODO response.data == Failed to login
                            self.$message({
                                message: "用户名或密码错误",
                                type: "error"
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log("error:" + error);
                    });
                /* } */
            }
        },
        forgetPW() {
            console.log("forgetpw");
            this.$router.push({ name: "ForgetPW" }); //可以在这里加参数params:{}
        },
        register() {
            this.$router.push({ name: "Register" });
        }
    },
    date: {}
};
</script>

<style scoped>
#background {
    width: 100%;
    height: 800px;
    background: url("../assets/grid.png") repeat;
}
#main {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -200px;
}
#login {
    text-align: center;
}
#title {
    font-family: Cursive; /***Serif、Sans-serif、Monospace、Cursive、Fantasy ***/
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    color: #666;
    margin: 20px 100px;
}
#mailbox {
    display: block;
    width: 400px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #666;
    padding: 5px 20px;
    margin: 20px 0;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
}
#password {
    display: block;
    width: 400px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #666;
    padding: 5px 20px;
    margin: 5px 0;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
}

#other {
    font-size: 14px;
    color: #666;
}
</style>