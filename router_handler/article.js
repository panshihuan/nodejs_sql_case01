
const db = require('../db/index')
const path = require('path')

// 新增文章
const addArticle = (req, res) => {
    console.log(1111222, req.file)
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('文章封面是必选参数！')
    }
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }

    // 定义发布文章的sql语句
    const sql = `insert into ev_articles set ?`
    db.query(sql, articleInfo, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('发布文章失败！')
        }
        res.cc('发布文章成功！', 0)
    })

}

module.exports = {
    addArticle
}