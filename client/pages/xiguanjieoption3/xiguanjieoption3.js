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
    option7:{
      thedate:'',
      option7:''
    },
    option8:{
      thedate:'',
      option8:''
    },
    option9:{
      thedate:'',
      option9:''
    },
    option10:{
      thedate:'',
      option10:''
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
      url: '../xiguanjieoption2/xiguanjieoption2'
    })
  },
  goAhead:function(e){
    if(this.data.option7.thedate===''||this.data.option7.option7==''||
      this.data.option8.thedate===''||this.data.option8.option8==''||
      this.data.option9.thedate===''||this.data.option9.option9==''||
      this.data.option10.thedate===''||this.data.option10.option10==''){
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
    if(this.data.option7.option7>10||this.data.option7.option7<0||
      this.data.option8.option8>10||this.data.option8.option8<0||
      this.data.option9.option9>10||this.data.option9.option9<0||
      this.data.option10.option10>10||this.data.option10.option10<0){
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
    var arr7=this.data.option7;
    arr7.openId=this.data.openId
    var arr8=this.data.option8;
    arr8.openId=this.data.openId
    var arr9=this.data.option9;
    arr9.openId=this.data.openId
    var arr10=this.data.option10;
    arr10.openId=this.data.openId
    senddata.push(arr7);
    senddata.push(arr8)
    senddata.push(arr9);
    senddata.push(arr10)
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
          url: '../xiguanjieoption4/xiguanjieoption4'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
});
//# sourceMappingURL=splash.js.map