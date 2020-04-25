/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'Ek8r8-emjAd5FmEKzxZQnFHqyUhTP8Y5p8QNcDSd'
const secretKey = 'g50ZakQN2k0lK39px-f1ZCfwL1o8xDWN3fDQR6E2'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'uml',
    expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
module.exports = {
    uploadToken
}