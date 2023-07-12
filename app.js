const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const artcateRouter = require('./router/artcate');
const articleRouter = require('./router/article');
const joi =require('joi');
const expressJWT = require('express-jwt');
const { jwtSecretKey } = require('./config');

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static('./uploads'))

// 在路由之前定义 封装一个cc函数，统一处理请求失败和成功的res.send
app.use((req, res, next) => {
    res.cc = (err, status) => {
        res.send({
            status,
            message: err instanceof Error ? err.message: err
        })
    }
    next()
})


// 在路由之前，配置解析 token 字符串
app.use(expressJWT({ secret: jwtSecretKey }).unless({ path: [/^\/api/] }))


app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article', artcateRouter)
app.use('/my/article', articleRouter)


// 在路由之后定义，处理表单验证的错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失效导致的错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // token身份认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败!')
    }
    // 未知错误
    res.cc(err)
})




app.listen(3007, () => {
    console.log('api server running at http:127.0.0.1:3007')
})





// 获取package.json中的字段
console.log(1111, process.env.npm_package_config_my)
console.log(2222, process.env.npm_package_config_env)
console.log(3333, process.env.NODE_ENV)