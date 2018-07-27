const path = require('path');
const CONF = {
    port: '5757',
    rootPathname:path.resolve(__dirname, '../'),

    // 微信小程序 App ID
    appId: 'wx5a4bfc606ddaaf37',

    // 微信小程序 App Secret
    appSecret: '8694d63c757c2b3b066b43761cd010f8',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        // host: 'localhost',
        host: 'xchxmysql',
        port: 3306,
        user: 'cuiwenheng',
        db: 'cAuth',
        pass: 'mtmxiaochengxu',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-beijing-1',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: 'mtmxchx'
    },

    // 其他配置 ...
    serverHost: 'www.cuiwenheng.com',
    tunnelServerUrl: 'http://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
      // 可以注册一个腾讯云账号，获取一下配置。腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1256965356',
    qcloudSecretId: 'AKIDEJD1kJLwztcAYlGdJpAKNJ3c0DF6iX0I',
    qcloudSecretKey: 'FJCuQp36xd8RZXJuKZhnjYGn9KJ7jBSZ',
    networkTimeout: 30000,
    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
