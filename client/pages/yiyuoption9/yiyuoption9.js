'use strict';

// 获取全局应用程序实例对象


// 创建页面实例对象
var that;

var app = getApp();
Page({
  data: {
    host:app.config.service.host,
    showTopTips: false,
    erromessage:'',
    openId:"",
    option9:undefined
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: "抑郁症筛查评测"
    });
    that = this;
    var sess=app.qcloud.Session.get();
    if(sess&&sess.userinfo&&sess.userinfo.openId){
      that.setData({ openId: sess.userinfo.openId })
      wx.request({
        url: app.config.service.yiyumember, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.data.option9!=undefined){
            that.setData({option9:res.data.data.option9});
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
              url: app.config.service.yiyumember, //仅为示例，并非真实的接口地址
              data: {openId:this.data.openId},
              method:'GET',
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                console.log(res.data)
                if(res.data.data.option9!=undefined){
                  that.setData({option9:res.data.data.option9});
                }
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
  autoimage:function(e){
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imageheight/imagewidth;
    var image={};
    image.autowidth=526;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image:image
    })
  },
  select:function(e){
    this.setData({
         option9:e.target.dataset.value
      })
  },
  goBack:function(e){
    wx.redirectTo({
      url: '../yiyuoption8/yiyuoption8'
    })
  },
  goAhead:function(e){
    if(this.data.option9===undefined){
      this.setData({
        showTopTips:true,
        erromessage:"请选择选项。"
      })
      setTimeout(function(){
          that.setData({
              showTopTips: false,
              erromessage:''
          });
      }, 3000);
      return;
    }
    wx.request({
      url: app.config.service.yiyumember, //仅为示例，并非真实的接口地址
      data: this.data,
      method:'POST',
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.redirectTo({
          url: '../yiyuend/yiyuend'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
});
//# sourceMappingURL=splash.js.map