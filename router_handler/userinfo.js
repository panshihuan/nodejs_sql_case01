const db = require('../db/index')
const bcrypt = require('bcryptjs');


// 获取用户信息
const getUserInfo = (req, res) => {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('获取失败')
        }
        res.send({
            status: 0,
            message: '获取成功',
            data: results[0]
        })
    })
}

// 修改用户信息
const updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('更新失败')
        }
        res.cc('更新成功', 0)
    })
}


// 重置密码
const updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('用户不存在')
        }
        // 判断用户老密码是否正确
       const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
       if (!compareResult) {
        return res.cc('原密码错误')
       }
       const sql2 = 'update ev_users set password=? where id=?'
       const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
       db.query(sql2, [newPwd, req.user.id], (err2, results2) => {
            if (err2) {
                return res.cc(err2)
            }
            if (results2.affectedRows !== 1) {
                return res.cc('更新密码失败')
            }
            return res.cc('更新密码成功！', 0)
       })
    })
}


// 更新用户头像
const updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) {
            res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('更新头像失败')
        }
        res.cc('更换头像成功!', 0)
    })
}


module.exports = {
    getUserInfo,
    updateUserInfo,
    updatePassword,
    updateAvatar
}