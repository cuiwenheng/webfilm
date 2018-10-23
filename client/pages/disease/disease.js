'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
      showTopTips: false,
      erromessage:"",
      hiddenmodalput:true,
      getdisease:{
         bigkind:'',
         codekey:'',
         name:'',
         year:''
      },
      code:'',
      icd10:{
        "1":{
            "name":"早发心血管病家族史",
            "subdise":{
                "1":{
                    name:"早发心血管病家族史",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "2":{
            "name":"甘油三脂异常和胆固醇异常",
            subdise:{
                "E78.501":{
                    name:"高脂血症",
                    year:"",
                    choose:false
                },
                "E78.001":{
                    name:"高胆固醇血症",
                    year:"",
                    choose:false
                },                //16.12.21 add
                "E78.151/78.053":{
                    name:"高甘油三酯血症",
                    year:"",
                    choose:false
                },               //16.12.21 add
                "E78.203":{
                    name:"混合性高脂血症",
                    year:"",
                    choose:false
                },
                "E78.451":{
                    name:"家族性混合型高脂血症",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "3":{
            name:"左心室肥厚",
            subdise:{
                "3":{
                    name:"左心室肥厚",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "4":{
            name:"颈动脉内膜增厚或斑块",
            subdise:{
                "I65.202":{
                    name:"颈动脉狭窄",
                    year:"",
                    choose:false
                },
                "I65.201":{
                    name:"颈动脉硬化",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "5":{
            name:"血肌酐轻度升高",
            subdise:{
                "5":{
                    name:"血肌酐轻度升高",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "6":{
            name:"脑血管病(脑卒中、短暂性脑缺血发作)",
            subdise:{
                "I64.X04":{
                    name:"缺血性脑卒中",
                    year:"",
                    choose:false
                },
                "I69.452":{
                    name:"脑卒中后遗症",
                    year:"",
                    choose:false
                },
                "I61.902":{
                    name:"出血性脑卒中",
                    year:"",
                    choose:false
                },
                "I69.101":{
                    name:"脑出血后遗症",
                    year:"",
                    choose:false
                },
                "G45.901":{
                    name:"短暂性脑缺血发作",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "7":{
            name:"周围血管疾病",
            subdise:{
                "I74.306":{
                    name:"下肢动脉血栓形成",
                    year:"",
                    choose:false
                },        //16.12.21 modify
                "E14.503":{
                    name:"糖尿病性周围血管病变",
                    year:"",
                    choose:false
                },
                "I73.904":{
                    name:"其他周围血管病",
                    year:"",
                    choose:false
                },
                "I99.X03":{
                    name:"周围血管并发症",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "8":{
            name:"视网膜病",
            subdise:{
                "H35.952":{
                    name:"视网膜病变NOS",
                    year:"",
                    choose:false
                },
                "H35.006":{
                    name:"视网膜病",
                    year:"",
                    choose:false
                },
                "E14.304+":{
                    name:"糖尿病性视网膜病",
                    year:"",
                    choose:false
                },
                "H35.001":{
                    name:"高血压性视网膜病",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "9":{
            name:"心脏病(冠心病/心绞痛/心肌梗死/高血压性心脏病/心力衰竭)",
            subdise:{
                "I20":{
                    name:"心绞痛",
                    year:"",
                    choose:false
                },           //16.12.21 add
                "I25.551":{
                    name:"心肌缺血",
                    year:"",
                    choose:false
                },           //16.12.21 add
                "I25.101":{
                    name:"冠心病",
                    year:"",
                    choose:false
                },
                "I25.652":{
                    name:"无症状性冠心病",
                    year:"",
                    choose:false
                },
                "E14.551":{
                    name:"糖尿病性冠心病",
                    year:"",
                    choose:false
                },
                "I11.901":{
                    name:"高血压性心脏病",
                    year:"",
                    choose:false
                },
                "I11.951":{
                    name:"高血压性心脏病不伴充血性心力衰竭",
                    year:"",
                    choose:false
                },
                "I50":{
                    name:"心力衰竭",
                    year:"",
                    choose:false
                },
                "I11.051":{
                    name:"高血压性心脏病伴充血性心力衰竭",
                    year:"",
                    choose:false
                },
                "I11.052":{
                    name:"高血压性心力衰竭",
                    year:"",
                    choose:false
                },
                "I21.-":{
                    name:"急性心梗",
                    year:"",
                    choose:false
                }           
            },
            show:false
        },
        "10":{
            name:"肾脏疾病",
            subdise:{
                "N03":{
                    name:"慢性肾炎综合征",
                    year:"",
                    choose:false
                },
                "N03.952":{
                    name:"慢性肾病NOS",
                    year:"",
                    choose:false
                },
                "N04.903":{
                    name:"肾病综合症",
                    year:"",
                    choose:false
                },
                "E14.203+":{
                    name:"糖尿病性肾病",
                    year:"",
                    choose:false
                },
                "N03.903":{
                    name:"慢性肾炎",
                    year:"",
                    choose:false
                },
                "I12.903":{
                    name:"高血压性肾病",
                    year:"",
                    choose:false
                },
                "N19.X02+":{
                    name:"肾功能轻度异常",
                    year:"",
                    choose:false
                },                 //17.09.18 add 
                "N19.X02":{
                    name:"肾功能不全",
                    year:"",
                    choose:false
                },                     //17.09.18 add
                "I12.001":{
                    name:"高血压性肾衰竭",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "11":{
            name:"糖尿病",
            subdise:{
                "E10-E14":{
                    name:"糖尿病",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "12":{                    //16.12.21 add    
            name:"糖尿病并发症",
            subdise:{
                "E14.408+":{
                    name:"糖尿病性周围神经病",
                    year:"",
                    choose:false
                },
                "E14.503":{
                    name:"糖尿病性周围血管病变",
                    year:"",
                    choose:false
                },
                "E14.606":{
                    name:"糖尿病性足病",
                    year:"",
                    choose:false
                },
                "E14.304+":{
                    name:"糖尿病性视网膜病变",
                    year:"",
                    choose:false
                },
                "E14.551":{
                    name:"糖尿病性冠心病",
                    year:"",
                    choose:false
                },
                "E14.203+":{
                    name:"糖尿病肾病",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "13":{
            name:"糖耐量异常",
            subdise:{
                "R73.002":{
                    name:"糖耐量异常",
                    year:"",
                    choose:false
                }
            },
            show:false
        },
        "15":{
            name:"高血压",
            subdise:{
                "I10.X02":{
                    name:"高血压",
                    year:"",
                    choose:false
                },
                "I10.X11":{
                    name:"原发性高血压",
                    year:"",
                    choose:false
                },
                "I10-I15":{
                    name:"高血压病",
                    year:"",
                    choose:false
                }
            },
            show:false
        }
      }
  },
  goAhead: function(){
      var that = this;
      wx.request({
        url: app.config.service.uploaddisease, //仅为示例，并非真实的接口地址
        data: this.data,
        method:'POST',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          wx.redirectTo({
            url: '../evaluate/evaluate'
          })
        },
        fail:function(res){
          console.log(res);
        }
      })
  },
  goBack:function(e){
    wx.redirectTo({
      url: '../hdlc/hdlc'
    })
  },
  radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
          radioItems: radioItems
      });
  },

  bindDateChange: function (e) {
      this.setData({
          date: e.detail.value
      })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindShowModal:function(e){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
        console.log('用户点击确定')
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
      }
    })

  },
  bindShowDisease:function(e){
    var num=e.currentTarget.dataset.bigkind;
    var param = {};
    var string = "icd10."+num+".show";
    param[string] = !this.data.icd10[num].show;
    this.setData(param);
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput:function(e){
    var bigkind=e.currentTarget.dataset.bigkind;
    var codekey=e.currentTarget.dataset.codekey;
    var name=e.currentTarget.dataset.name;
    if(bigkind=='1'&&codekey=="1"){
      if(this.data.icd10[bigkind].subdise[codekey].choose){
        var param={};
        param.icd10 = JSON.parse(JSON.stringify(this.data.icd10));
        param.icd10[bigkind].subdise[codekey].choose = !this.data.icd10[bigkind].subdise[codekey].choose;
        param.icd10[bigkind].subdise[codekey].year = "";
        this.setData(param);
      }else{
        var param = {};
        param.icd10 = JSON.parse(JSON.stringify(this.data.icd10));
        param.icd10[bigkind].subdise[codekey].choose = !this.data.icd10[bigkind].subdise[codekey].choose;
        param.icd10[bigkind].subdise[codekey].year = "";
        this.setData(param);
      }
    }else{
      if(this.data.icd10[bigkind].subdise[codekey].choose){
        var param={};
        param.icd10 = JSON.parse(JSON.stringify(this.data.icd10));
        param.icd10[bigkind].subdise[codekey].choose = !this.data.icd10[bigkind].subdise[codekey].choose;
        param.icd10[bigkind].subdise[codekey].year = "";
        this.setData(param);
      }else{
        var param = {};
        param.hiddenmodalput=!this.data.hiddenmodalput;
        param["getdisease.bigkind"]=bigkind;
        param["getdisease.codekey"]=codekey;
        param["getdisease.name"]=name;
        this.setData(param);
      }
    }
  },
  //取消按钮
  cancel: function(e){
        this.setData({
            hiddenmodalput: true
        });
  },
  bindKeyInput:function(e){
    var param = {};
    param["getdisease.year"]=e.detail.value;
    this.setData(param);
  },
  //确认
  confirm: function(e){
      if(this.data.getdisease.year===""){
        this.setData({
          showTopTips:true,
          erromessage:"请填写年数！"
        })
        var that=this;
        setTimeout(function(){
            that.setData({
                showTopTips: false,
                erromessage:''
            });
        }, 3000);
      }else{
        var bigkind=e.currentTarget.dataset.bigkind;
        var codekey=e.currentTarget.dataset.codekey;
        var param={};
        param.icd10 = JSON.parse(JSON.stringify(this.data.icd10));
        param.icd10[bigkind].subdise[codekey].choose = !this.data.icd10[bigkind].subdise[codekey].choose;
        param.icd10[bigkind].subdise[codekey].year = this.data.getdisease.year;
        param.hiddenmodalput=true;
        this.setData(param);
      }
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
        url: app.config.service.uploaddisease, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.data.icd10){
            res.data.data.icd10=JSON.parse(res.data.data.icd10);
          }
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
                url: app.config.service.uploaddisease, //仅为示例，并非真实的接口地址
                data: {openId:this.data.openId},
                method:'GET',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  console.log(res.data)
                  if(res.data.data.icd10){
                    res.data.data.icd10=JSON.parse(res.data.data.icd10);
                  }
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