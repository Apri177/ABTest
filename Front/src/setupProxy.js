const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // docker port 17047
            target: 'http://localhost:17047',

            // local port 8080
            // target: 'http://localhost:8080',
            changeOrigin: true,
        })
    )
}