const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { reguser, login } = require('../router_handler/user')
const { req_login_schema } = require('../schema/user')

//注册新用户
router.post('/reguser', expressJoi(req_login_schema), reguser)

//登录
router.post('/login', expressJoi(req_login_schema), login)

module.exports = router