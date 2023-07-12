
const db = require('../db/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecretKey, expiresIn } = require('../config');

const sql = 'select * from ev_users where username=?'

// 注册
const reguser = (req, res) => {
    const userinfo = req.body
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) { // 查询到数据库里面有该username，说明用户名重复了
            return res.cc('用户名被占用')
        }   

        // 对密码加密 bcrypt.hashSync()
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        // 插入新用户的sql语句
        const sql2 = 'insert into ev_users set ?'

        db.query(sql2, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('注册失败')
            }
            res.cc('注册成功', 0)
        })
    })
}




// 登录
const login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            res.cc(err)
            return
        }
        if (results.length !== 1) {
            return res.cc('登录失败，没有该用户')
        }
        // 判断密码是否正确（密码是加过密的）
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('登录失败，密码错误')
        }
        const user = { ...results[0], password: '', user_pic: '' }
        // 对用户的信息加密，生成token字符串
        const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn })
        res.send({
            status: 0,
            message: '登录成功！',
            token: tokenStr
        })
    })
}




module.exports = {
    reguser,
    login
}