'use strict';

// 获取全局应用程序实例对象


// 创建页面实例对象
var that;

var app = getApp();
Page({
  data: {
    host:app.config.service.host,
    openId:""
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: "膝关节炎自我评估"
    });
    that = this;
    var sess=app.qcloud.Session.get();
    if(sess&&sess.userinfo&&sess.userinfo.openId){
      that.setData({ openId: sess.userinfo.openId })
    }else{
      app.qcloud.login({
          success: res => {
            this.setData({ openId: res.openId })
            util.showSuccess('登录成功')
          },
          fail: err => {
              console.error(err)
              util.showModel('登录错误', err.message)
          }
      })
    }
  },
  goBack:function(e){
    
  },
  goAhead:function(e){
    wx.redirectTo({
      url: '../xiguanjieoption1/xiguanjieoption1'
    })
  }
});
//# sourceMappingURL=splash.js.map