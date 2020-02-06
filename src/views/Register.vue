<template>
    <div id="background">
        <div id="main">
            <div id="register">
                <p id="title">UML</p>
                <!--考虑手机号登录--><!--v-model="username"-->
                <div id="input">
                    <input id="mailbox" v-model="Mailbox" type="text" placeholder="请输入邮箱号">
                    <input id="username" v-model="Username"  type="text" placeholder="请输入不超过10个字符的用户名">
                    <input id="password" v-model="Password" type="password"  placeholder="请输入密码">
                    <label id="Verification">
                        <input id="code" v-model="Code" type="text"  placeholder="请输入验证码">
                        <div id="getV">
                            <span  v-show="show" @click="getV()">获取验证码</span>
                            <span  v-show="!show" @click="getV()">{{count}}秒后重发</span>
                        </div>
                    </label>
                </div>
                <button id="button" @click="register()">注册</button>
            </div>
            <div id="other">
                <p id="login" @click="login()">登录</p>
            </div>
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
                show: true,
                count: '',
                timer: null,
                Mailbox:'',
                Password:'',
                Code:'',
                Username:''
            }
        },
        methods: {
            login() {
                this.$router.push({ name: "Login" });
            },
            register() {
                //判断用户名是否为空、用户名长度不超过10、密码是否为空、验证码输入是否正确
            },
            S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            },
            getV() {
                if(!this.show){
                    alert("验证码已发送");
                }else {
                    if(this.Mailbox===""){
                        alert("邮箱名为空！");
                    }else{
                        var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                        if(!reg.test(this.Mailbox)){
                            alert("请输入正确的邮箱");
                        }else{
                            console.log("邮箱输入正确");
                            const timecount = 60;
                            this.count = timecount;
                            if (!this.timer) {
/**************************发送验证码*******************************
                                var nodemailer = require("nodemailer");
                                var uuid=this.$options.methods.S4()+this.$options.methods.S4();
                                var email=this.Mailbox;
                                var text = `这个人姓名叫`;
                                console.log(email);
                                // Use Smtp Protocol to send Email
                                var transporter = nodemailer.createTransport({
                                    //node_modules/nodemailer/well-known/services.json 支持列表
                                    host: 'smtp.qq.com',
                                    port: 465, // SMTP 端口
                                    secure: true,
                                    auth: {
                                        user: "1251448362@qq.com",
                                        //这里密码不是qq密码，是你设置的smtp密码（授权码）
                                        pass: "duesehxblvlvhhab"
                                    }
                                });

                                // setup e-mail data with unicode symbols
                                var mailOptions = {
                                    to: email, // 接受者
                                    from: "1251448362@qq.com",  // 这里的from和上面的user 账号一样的
                                    subject: '注册验证', // 标题
                                    //text和html两者只支持一种
                                    text: text, // 标题
                                    // html: '<b>Hello world ?</b>' // html 内容
                                };

                                transporter.sendMail(mailOptions, function(error, info) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    console.log('Message sent: ' + info.response);
                                    transporter.close();
                                });

 /***********************************************************/
                                this.count = timecount;
                                this.show = false;
                                this.timer = setInterval(() => {
                                    if (this.count > 0 && this.count <= timecount) {
                                        this.count--;
                                    } else {
                                        this.show = true;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000)
                            }
                        }
                    }
                }
            },
        },

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
    #register{
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
    #username{
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
        display: inline;
    }
    #getV{
        display: inline;

        width:130px;
        height:40px;
        box-sizing:border-box;
        border:1px;
        padding:10px 21px;
        border-radius:30px;
        font-size:14px;
        background-color:#5faeff;
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

    }
    #login{
        display:inline;
        margin-left:350px
    }
</style>