var tunnel = require('tunnel');

module.exports = tunnel.httpsOverHttp({
    proxy: {
        host: 'web-proxy.in.softwaregrp.net',
        port: 8080,
    }
});
