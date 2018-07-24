//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')
// var userInfo={}
App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        const session = qcloud.Session.get()
        var that=this;
        wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.screenHeight = res.windowHeight;
				that.pixelRatio = res.pixelRatio;
			}
		});
    },
    util:util,
    config:config,
    qcloud:qcloud
})