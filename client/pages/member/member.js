'use strict';
var util = require('../../utils/util.js')
// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
      showTopTips: false,
      openId:"",
      name:'',
      gender:"男",
      birthday:'1970-01-01',
      // phone:'',
      erromessage:''
  },
  checkDate:function(data){
    var that=this;
    var errflag=false;
    var error="";
    if(!data.openId&&!errflag){
      errflag=true;
      error="加载失败请重新打开小程序！";
    }
    if(!data.name&&!errflag){
      errflag=true;
      error="请填写姓名！";
    }
    // if(!data.phone&&!errflag){
    //   errflag=true;
    //   error="请填写手机号！";
    // }
    // var phonereg=/^[1][3,4,5,7,8][0-9]{9}$/;
    // if(!phonereg.test(data.phone)&&!errflag){
    //   errflag=true;
    //   error="请填写正确手机号！";
    // }
    if(errflag&&error){
      this.setData({
        showTopTips:true,
        erromessage:error
      })
      setTimeout(function(){
          that.setData({
              showTopTips: false,
              erromessage:''
          });
      }, 3000);
    }
    return errflag;
  },
  goAhead: function(){
      var that = this;
      if(this.checkDate(this.data)){
        return;
      }
      // that.setData({
      //     openId: app.userInfo.openId
      // });
      wx.request({
        url: app.config.service.uploadmember, //仅为示例，并非真实的接口地址
        data: this.data,
        method:'POST',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          wx.redirectTo({
            url: '../health/health'
          })
        },
        fail:function(res){
          console.log(res);
        }
      })
      
  },
  bindNameInput:function(e){
    var name=e.detail.value;
    this.setData({name:name});
  },
  radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
      this.setData({
          gender: e.detail.value
      });
  },

  bindDateChange: function (e) {
      this.setData({
          birthday: e.detail.value
      })
  },
  bindPhoneInput:function(e){
    var phone=e.detail.value;
    this.setData({phone:phone});
  },
  
  getCache: function getCache() {
    
  },
  handleStart: function handleStart() {
    // TODO: 访问历史的问题
    wx.switchTab({
      url: '../board/board'
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    wx.setNavigationBarTitle({
        title: "心血管疾病风险评估"
    });
    var that=this;
    var sess=app.qcloud.Session.get();
    if(sess&&sess.userinfo&&sess.userinfo.openId){
      this.setData({ openId: sess.userinfo.openId })
      wx.request({
        url: app.config.service.uploadmember, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          that.setData(res.data.data);
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
                url: app.config.service.uploadmember, //仅为示例，并非真实的接口地址
                data: {openId:this.data.openId},
                method:'GET',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  console.log(res.data)
                  that.setData(res.data.data);
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=splash.js.map