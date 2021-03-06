'use strict';

// 获取全局应用程序实例对象


// 创建页面实例对象
var that;
// var deltaX = 0;
// var minValue = 0;
var app = getApp();
Page({
  data: {
    openId:"",
    LDLC: 0,
    thelocation:0,
    image:{
      autoheight:200,
      autowidth:50
    },
    keduList:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: "心血管疾病风险评估"
    });
    that = this;
    var keduList=[];
    for(var n=0;n<=50;n++){
      keduList.push(n);
    }
    that.setData({keduList:keduList});
    var sess=app.qcloud.Session.get();
    if(sess&&sess.userinfo&&sess.userinfo.openId){
      this.setData({ openId: sess.userinfo.openId })
      wx.request({
        url: app.config.service.uploadldlc, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.data.LDLC){
            var thelocation=res.data.data.LDLC*50;
            that.setData({LDLC:res.data.data.LDLC,thelocation:thelocation});
          }
        },
        fail:function(res){
          console.log(res);
        }
      })
    }else{
      app.qcloud.login({
          success: res => {
            this.setData({ openId: res.openId })
            util.showSuccess('登录成功')
            wx.request({
              url: app.config.service.uploadldlc, //仅为示例，并非真实的接口地址
              data: {openId:this.data.openId},
              method:'GET',
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                console.log(res.data)
                var thelocation=res.data.data.LDLC*50;
                that.setData({LDLC:res.data.data.LDLC,thelocation:thelocation});
              },
              fail:function(res){
                console.log(res);
              }
            })
          },
          fail: err => {
              console.error(err)
              util.showModel('登录错误', err.message)
          }
      })
    }
  },
  buttonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  buttonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];
    var thelocation=that.data.thelocation-(endPoint.clientX-that.data.startPoint.clientX);
    while(thelocation<0){
      thelocation=0;
    }
    while(thelocation>500){
      thelocation=500;
    } 
    var LDLC=0;
    LDLC=Math.round((LDLC+thelocation/50)*100)/100;
    that.setData({
      startPoint:endPoint,
      LDLC:LDLC,
      thelocation: thelocation
    })
  },
  buttonEnd: function (e) {
    
  },
  autoimage:function(e){
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imagewidth/imageheight;
    var image={};
    image.autoheight=app.screenHeight*0.7*0.65;
    image.autowidth=image.autoheight*imagescale;
    this.setData({
      image:image
    })
  },
  goBack:function(e){
    wx.redirectTo({
      url: '../smoke/smoke'
    })
  },
  goAhead:function(e){
    wx.request({
      url: app.config.service.uploadldlc, //仅为示例，并非真实的接口地址
      data: this.data,
      method:'POST',
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.redirectTo({
          url: '../hdlc/hdlc'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
});
//# sourceMappingURL=splash.js.map