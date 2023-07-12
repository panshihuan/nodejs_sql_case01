// 文章分类的路由模块

const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { getArticleCates, addArticleCates, deleleCateById, getCateById, updateArticleCates } = require('../router_handler/artcate')
const { add_artcate_schema, delete_artcate_schema, update_artcate_schema } = require('../schema/artcate')

// 获取文章列表
router.get('/cates', getArticleCates)

// 新增文章
router.post('/addcates', expressJoi(add_artcate_schema), addArticleCates)

// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(delete_artcate_schema), deleleCateById)

// 根据id删除文章分类
router.get('/cates/:id', expressJoi(delete_artcate_schema), getCateById)

// 更新文章分类
router.post('/update/cates', expressJoi(update_artcate_schema), updateArticleCates)

module.exports = router