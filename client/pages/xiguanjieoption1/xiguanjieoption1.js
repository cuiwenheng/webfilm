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
    option1:{
      thedate:'',
      option1:''
    },
    option2:{
      thedate:'',
      option2:''
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: "膝关节炎自我评估"
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
    if(this.data.option1.thedate===''||this.data.option1.option1==''||
      this.data.option2.thedate===''||this.data.option2.option2==''){
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
    if(this.data.option1.option1>10||this.data.option1.option1<0||
      this.data.option2.option2>10||this.data.option2.option2<0){
      this.setData({
        showTopTips:true,
        erromessage:"评分应在0-10之间"
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
    var arr1=this.data.option1;
    arr1.openId=this.data.openId
    var arr2=this.data.option2;
    arr2.openId=this.data.openId
    senddata.push(arr1);
    senddata.push(arr2)
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
          url: '../xiguanjieoption2/xiguanjieoption2'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
});
//# sourceMappingURL=splash.js.map