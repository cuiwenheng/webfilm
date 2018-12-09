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
    option3:{
      thedate:'',
      option3:''
    },
    option4:{
      thedate:'',
      option4:''
    },
    option5:{
      thedate:'',
      option5:''
    },
    option6:{
      thedate:'',
      option6:''
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
      url: '../xiguanjieoption1/xiguanjieoption1'
    })
  },
  goAhead:function(e){
    if(this.data.option3.thedate===''||this.data.option3.option3==''||
      this.data.option4.thedate===''||this.data.option4.option4==''||
      this.data.option5.thedate===''||this.data.option5.option5==''||
      this.data.option6.thedate===''||this.data.option6.option6==''){
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
    if(this.data.option3.option3>10||this.data.option3.option3<0||
      this.data.option4.option4>10||this.data.option4.option4<0||
      this.data.option5.option5>10||this.data.option5.option5<0||
      this.data.option6.option6>10||this.data.option6.option6<0){
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
    var arr3=this.data.option3;
    arr3.openId=this.data.openId
    var arr4=this.data.option4;
    arr4.openId=this.data.openId
    var arr5=this.data.option5;
    arr5.openId=this.data.openId
    var arr6=this.data.option6;
    arr6.openId=this.data.openId
    senddata.push(arr3);
    senddata.push(arr4)
    senddata.push(arr5);
    senddata.push(arr6)
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
          url: '../xiguanjieoption3/xiguanjieoption3'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
});
//# sourceMappingURL=splash.js.map