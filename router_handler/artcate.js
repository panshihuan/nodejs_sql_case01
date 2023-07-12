
const db = require('../db/index')


// 查询文章分类
const getArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            message: 'ok',
            data: results
        })
    })
}

// 新增文章分类的处理函数
const addArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 2) {
            return res.cc('分类名称和分类别名都被占用!')
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc('分类名称和分类别名都被占用!')
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用!')
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类别名被占用!')
        }

        const sql2 = 'insert into ev_article_cate set ?'
        db.query(sql2, req.body, (err, results2) => {
            if (err) {
                return res.cc(err)
            }
            if (results2.affectedRows !== 1) {
                return res.cc('新增文章分类失败')
            }
            res.cc('新增文章分类成功!')
        })
    })
}


// 根据id删除文章分类
const deleleCateById = (req, res) => {
    // const sql = 'delete from ev_article_cate where id=?' // 这就是真正的删除了
    const sql = 'update ev_article_cate set is_delete=1 where id=?' // 通过改变is_delete字段的状态来完成删除操作，标记删除
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('删除文章分类失败')
        }
        res.cc('删除成功!', 0)
    })
}


// 根据id获取文章分类
const getCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 and id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) {
            return res.cc('没有数据')
        }
        res.send({
            status: 0,
            message: 'ok',
            data: results[0]
        })
    })
}


// 更新文章分类
const updateArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 2) {
            return res.cc('name 和 alias 都被占用了')
        }
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc('name 和 alias 都被占用了')
        }
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc('name被占用了')
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('alias被占用了')
        }

        const sql2 = 'update ev_article_cate set ? where id=?'
        db.query(sql2, [req.body, req.body.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('修改失败')
            }
            res.cc('修改成功', 0)
        })
    })
    
}


module.exports = {
    getArticleCates,
    addArticleCates,
    deleleCateById,
    getCateById,
    updateArticleCates
}