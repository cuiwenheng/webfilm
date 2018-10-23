'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
      openId:'',
      image:{
        autoheight:100,
        autowidth:200
      },
      result:'',
      kind:''
  },
  autoimage:function(e){
    var that=this;
    var imagewidth=e.detail.width,
        imageheight=e.detail.height,
        imagescale=imagewidth/imageheight;

    that.data.image.autowidth=that.data.image.autoheight*imagescale;
    this.setData({
      image:that.data.image
    })
  },
  checkDate:function(data){
    
  },
  showTopTips: function(){
      
      
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      eatingpreference: e.detail.value
    })
  },
  smokingRadioChange:function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
      this.setData({
          smoking: e.detail.value
      });
  },
  drinkingRadioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
      this.setData({
          drinking: e.detail.value
      });
  },
  bindHeightInput:function(e){
    this.setData({
      height: e.detail.value
    })
  },
  bindWeightInput:function(e){
    this.setData({
      weight: e.detail.value
    })
  },
  bindWaistInput:function(e){
    this.setData({
      waist: e.detail.value
    })
  },
  bindHeartrateInput:function(e){
    this.setData({
      heartrate: e.detail.value
    })
  },
  bindSystolicpressureInput:function(e){
    this.setData({
      systolicpressure: e.detail.value
    })
  },
  bindDiastolicpressureInput:function(e){
    this.setData({
      diastolicpressure: e.detail.value
    })
  },
  bindFastBloodSugarInput:function(e){
    this.setData({
      fastBloodSugar: e.detail.value
    })
  },
  bindRandomBloodSugarInput:function(e){
    this.setData({
      randomBloodSugar: e.detail.value
    })
  },
  bindHbA1cInput:function(e){
    this.setData({
      HbA1c: e.detail.value
    })
  },
  bindCholesterolInput:function(e){
    this.setData({
      cholesterol: e.detail.value
    })
  },
  bindTriglycerideInput:function(e){
    this.setData({
      triglyceride: e.detail.value
    })
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
        url: app.config.service.evaluate, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          // res.data.data.region=JSON.parse(res.data.data.region);
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
                url: app.config.service.evaluate, //仅为示例，并非真实的接口地址
                data: {openId:this.data.openId},
                method:'GET',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  console.log(res.data)
                  // res.data.data.region=JSON.parse(res.data.data.region);
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

  },
  goBack:function(e){
    wx.redirectTo({
      url: '../disease/disease'
    })
  }
});
