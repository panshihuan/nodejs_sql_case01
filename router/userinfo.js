const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi')

const { getUserInfo, updateUserInfo, updatePassword, updateAvatar } = require('../router_handler/userinfo')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取用户信息
router.get('/getinfo', getUserInfo)

// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword)

// 更换头像
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)


module.exports = router