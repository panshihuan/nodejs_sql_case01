const joi =require('joi');

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(2).max(16).required()
const password = joi.string().pattern(/^[\S]{3,12}$/).required()

// 定义id、nickname、email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()

// 定义注册和登录表单数据的规则对象
exports.req_login_schema = {
    body: {
        username,
        password
    }
}

// 定义修改用户信息表单数据的规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 定义重置密码表单数据的规则对象
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password), // joi.ref('oldPwd')表示和oldPwd保持一致，joi.not即是取反，concat合并验证规则
    }
}

// 定义更换头像表单数据的规则对象
exports.update_avatar_schema = {
    body: {
        avatar
    }
}