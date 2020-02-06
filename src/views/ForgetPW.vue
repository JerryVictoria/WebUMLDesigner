<template>
    <div id="background">
        <div id="main">
            <div id="forgetPW">
                <p id="title">UML</p>
                <!--邮箱验证--><!--v-model="username"-->
                <div id="input">
                    <input id="mailbox" v-model="Mailbox" type="text" placeholder="请输入注册使用的邮箱">
                    <input id="password" v-model="Password" type="password"  placeholder="请输入新密码">
                    <label id="Verification">
                        <input id="code" type="text"  placeholder="请输入验证码">
                        <button id="getV" @click="getV()">获取验证码</button>
                    </label>
                </div>
                <button id="button" @click="ResetPW()">重置密码</button>
            </div>
            <div id="other">
                <p id="login" @click="Login()">登录|</p>
                <p id="register" @click="register()">注册</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "forget-p-w",
        data() {
            return{
                Mailbox:'',
                Password:'',
            };
        },
        methods:{
            Login(){
                this.$router.push({ name: "Login" });
            },
            register(){
                this.$router.push({ name: "Register" });
            },
            ResetPW(){
               //判断验证码
                //获取邮箱号和新密码，传送给后端
            },
            getV(){
                console.log(this.Mailbox);
                //判断是否是正确的邮箱号
                if(this.Mailbox===""){
                    alert("邮箱名或用户名为空！");
                }else{
                    var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                    if(!reg.test(this.Mailbox)){
                        alert("请输入正确的邮箱");
                    }else{
                        console.log("邮箱格式正确");
                        //发送验证码到指定邮箱

                    }
                }
            }
        },
        date:{

        }
    }
</script>

<style scoped>
    #background {
        width: 100%;
        height: 800px;
        background: url("../assets/grid.png") repeat;
    }
    #main{
        position:absolute;
        left:50%;
        top:50%;
        margin-left: -200px;
        margin-top: -200px;
    }
    #forgetPW{
        text-align: center;
    }
    #title{
        font-family:Cursive;/***Serif、Sans-serif、Monospace、Cursive、Fantasy ***/
        font-style:normal;
        font-weight:bold;
        font-size: 40px;
        color:#666;
        margin:20px 100px;
    }
    #mailbox{
        display: block;
        width:400px;
        height:40px;
        box-sizing:border-box;
        border:1px solid #666;
        padding:5px 20px;
        margin:20px 0;
        border-radius:30px;
        font-size:14px;
        outline:none;
    }
    #password{
        display: block;
        width:400px;
        height:40px;
        box-sizing:border-box;
        border:1px solid #666;
        padding:5px 20px;
        margin:5px 0;
        border-radius:30px;
        font-size:14px;
        outline:none;
    }
    #Verification{
        display: block;
        margin:20px 0;
    }
    #code{
        width:280px;
        height:40px;
        box-sizing:border-box;
        border:1px solid #666;
        border-radius:30px;
        font-size:14px;
        padding:5px 20px;
        margin-left:0px;
        outline:none;
    }
    #getV{
        margin-right:0px;
        margin-left:5px;
        width:115px;
        height:40px;
        box-sizing:border-box;
        border:1px;
        padding:5px 20px;
        border-radius:30px;
        font-size:14px;
        background-color:#5faeff;
        outline:none;
    }
    #button{
        display: block;
        width:400px;
        height:40px;
        box-sizing:border-box;
        border:1px;
        padding:5px 20px;
        margin:20px 0;
        border-radius:30px;
        font-size:18px;
        background-color:#5faeff;
        outline:none;
    }
    #other{
        font-size:14px;
        color:#666;
    }
    #login{
        display:inline;
        margin-left:5px;
    }
    #register{
        display:inline;
    }
</style>