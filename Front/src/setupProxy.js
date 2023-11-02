const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            // target: 'http://211.54.1.12:17047',
            changeOrigin: true,
        })
    )
}