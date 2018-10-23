'use strict';

// 获取全局应用程序实例对象


// 创建页面实例对象
var that;

var app = getApp();
Page({
  data: {
    host:app.config.service.host,
    openId:"",
    result:undefined,
    title1:"",
    title2:"",
    photo:""
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
        url: app.config.service.yiyuend, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.data.result!=undefined){
            that.setData({result:res.data.data.result});
            var result=res.data.data.result;
            if(0<=result&&result<=4){
              that.setData({title1:"没有抑郁症"});
              that.setData({title2:"注意自我保重"});
              that.setData({photo:"yiyuno"});
            }
            if(5<=result&&result<=9){
              that.setData({title1:"可能有轻微抑郁症"});
              that.setData({title2:"建议咨询心理医生或心理医学工作者"});
              that.setData({photo:"yiyulittle"});
            }
            if(10<=result&&result<=14){
              that.setData({title1:"可能有中微抑郁症"});
              that.setData({title2:"最好咨询心理医生或心理医学工作者"});
              that.setData({photo:"yiyulittle"});
            }
            if(15<=result&&result<=19){
              that.setData({title1:"可能有中重度抑郁症"});
              that.setData({title2:"建议咨询心理医生或精神科医生"});
              that.setData({photo:"yiyulittle"});
            }
            if(20<=result&&result<=27){
              that.setData({title1:"可能有重度抑郁症"});
              that.setData({title2:"一定要看心理医生或精神科医生"});
              that.setData({photo:"yiyubig"});
            }
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
              url: app.config.service.yiyuend, //仅为示例，并非真实的接口地址
              data: {openId:this.data.openId},
              method:'GET',
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                console.log(res.data)
                if(res.data.data.result!=undefined){
                  that.setData({result:res.data.data.result});
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
    image.autowidth=578;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image:image
    })
  },
  select:function(e){
    
  },
  goBack:function(e){
    
  },
  goAhead:function(e){
    wx.redirectTo({
      url: '../index/index'
    })
  }
});
//# sourceMappingURL=splash.js.map