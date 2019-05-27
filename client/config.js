/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://bwfw95mb.qcloud.la';
var host = 'https://mtm.cuiwenheng.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,
        uploadmember: `${host}/weapp/member`,
        uploadhealth: `${host}/weapp/health`,
        uploadsmoke: `${host}/weapp/smoke`,
        uploadldlc: `${host}/weapp/ldlc`,
        uploadhdlc: `${host}/weapp/hdlc`,
        uploaddisease: `${host}/weapp/disease`,
        evaluate: `${host}/weapp/evaluate`,
        //抑郁症筛选路由
        yiyumember: `${host}/weapp/yiyumember`,
        yiyuend: `${host}/weapp/yiyuend`,
        //膝关节评估路由
        xiguanjiemember: `${host}/weapp/xiguanjiemember`,
        xiguanjieoption: `${host}/weapp/xiguanjieoption`,
        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
