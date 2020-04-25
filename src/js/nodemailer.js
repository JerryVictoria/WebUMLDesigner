// 加载body-parser 处理post提交过来的数据var path = require('path')
var express = require('express')
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var app = express()
var apiRoutes = express.Router()
console.log("js文件中");
// bodyParser 设置,自动会在req上面添加
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
apiRoutes.get('/email', function(req, res) {
    // console.info('req', req)
    // bodyParser 可以获取提交的数据，都保存在body上面
    var text = `这个人姓名叫${req.body.Mailbox }`
    if (req.body.Mailbox ) {
        res.json({
            iRet: 1,
            info: 'ok',
        });

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
            to: req.body.Mailbox, // 接受者
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

    } else {
        res.json({
            iRet: -1,
            info: 'error',
        });
        return;
    }
});
app.use('/api', apiRoutes)
// 前端调取的url:'/api/email';如果这里app.use('/', apiRoutes),前端调取的url:'/email'


