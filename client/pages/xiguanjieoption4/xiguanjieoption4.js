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
    option11:{
      thedate:'',
      option11:''
    },
    option12:{
      thedate:'',
      option12:''
    },
    option13:{
      thedate:'',
      option13:''
    },
    option14:{
      thedate:'',
      option14:''
    }
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
        url: app.config.service.xiguanjieoption, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          // if(res.data.data.option1!=undefined){
          //   that.setData({option1:res.data.data.option1});
          // }
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
              url: app.config.service.xiguanjieoption, //仅为示例，并非真实的接口地址
              data: {openId:this.data.openId},
              method:'GET',
              header: {
                  'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                console.log(res.data)
                // if(res.data.data.option1!=undefined){
                //   that.setData({option1:res.data.data.option1});
                // }
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
    image.autowidth=690;
    image.autoheight=image.autowidth*imagescale;
    this.setData({
      image:image
    })
  },
  bindDateChange:function(e){
    console.log(e.currentTarget.dataset.option);
    var op=e.currentTarget.dataset.option;
    var key=op+".thedate";
    that.setData({[key]:e.detail.value});
  },
  bindPingFenInput:function(e){
    console.log(e.currentTarget.dataset.option);
    var op=e.currentTarget.dataset.option;
    var key=op+"."+op;
    that.setData({[key]:e.detail.value});
  },
  goBack:function(e){
    wx.redirectTo({
      url: '../xiguanjiestart/xiguanjiestart'
    })
  },
  goAhead:function(e){
    if(this.data.option11.thedate===''||this.data.option11.option11==''||
      this.data.option12.thedate===''||this.data.option12.option12==''||
      this.data.option13.thedate===''||this.data.option13.option13==''||
      this.data.option14.thedate===''||this.data.option14.option14==''){
      this.setData({
        showTopTips:true,
        erromessage:"评分和日期都得填写"
      })
      setTimeout(function(){
          that.setData({
              showTopTips: false,
              erromessage:''
          });
      }, 3000);
      return;
    }
    var senddata=[];
    var arr11=this.data.option11;
    arr11.openId=this.data.openId
    var arr12=this.data.option12;
    arr12.openId=this.data.openId
    var arr13=this.data.option13;
    arr13.openId=this.data.openId
    var arr14=this.data.option14;
    arr14.openId=this.data.openId
    senddata.push(arr11);
    senddata.push(arr12)
    senddata.push(arr13);
    senddata.push(arr14)
    wx.request({
      url: app.config.service.xiguanjieoption, //仅为示例，并非真实的接口地址
      data: senddata,
      method:'POST',
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.redirectTo({
          url: '../xiguanjieend/xiguanjieend'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
});
//# sourceMappingURL=splash.js.map