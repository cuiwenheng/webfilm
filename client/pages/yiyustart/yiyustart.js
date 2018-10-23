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
        title: "抑郁症筛查评测"
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
  autoimage1:function(e){
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imageheight/imagewidth;
    var image={};
    image.autowidth=610;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image1:image
    })
  },
  autoimage2:function(e){
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imageheight/imagewidth;
    var image={};
    image.autowidth=610;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image2:image
    })
  },
  autoimage3:function(e){
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imageheight/imagewidth;
    var image={};
    image.autowidth=610;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image3:image
    })
  },
  autoimage4:function(e){
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imageheight/imagewidth;
    var image={};
    image.autowidth=610;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image4:image
    })
  },
  goBack:function(e){
    
  },
  goAhead:function(e){
    wx.redirectTo({
      url: '../yiyuoption1/yiyuoption1'
    })
  }
});
//# sourceMappingURL=splash.js.map