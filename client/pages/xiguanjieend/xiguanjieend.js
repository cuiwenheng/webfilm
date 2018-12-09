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
    option1:[],
    option2:[],
    option3:[],
    option4:[],
    option5:[],
    option6:[],
    option7:[],
    option8:[],
    option9:[],
    option10:[],
    option11:[],
    option12:[],
    option13:[],
    option14:[]
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
          var arrdata=res.data.data;
          var option1=[],option2=[],option3=[],option4=[],option5=[],option6=[],option7=[],
              option8=[],option9=[],option10=[],option11=[],option12=[],option13=[],option14=[];
          for(var i=0;i<arrdata.length;i++){
            if(arrdata[i].option1!==null){
              var obj1={}
              obj1.thedate=arrdata[i].thedate;
              obj1.option1=arrdata[i].option1;
              option1.push(obj1);
            }
            if(arrdata[i].option2!==null){
              var obj2={}
              obj2.thedate=arrdata[i].thedate;
              obj2.option2=arrdata[i].option2;
              option2.push(obj2);
            }
            if(arrdata[i].option3!==null){
              var obj3={}
              obj3.thedate=arrdata[i].thedate;
              obj3.option3=arrdata[i].option3;
              option3.push(obj3);
            }
            if(arrdata[i].option4!==null){
              var obj4={}
              obj4.thedate=arrdata[i].thedate;
              obj4.option4=arrdata[i].option4;
              option4.push(obj4);
            }
            if(arrdata[i].option5!==null){
              var obj5={}
              obj5.thedate=arrdata[i].thedate;
              obj5.option5=arrdata[i].option5;
              option5.push(obj5);
            }
            if(arrdata[i].option6!==null){
              var obj6={}
              obj6.thedate=arrdata[i].thedate;
              obj6.option6=arrdata[i].option6;
              option6.push(obj6);
            }
            if(arrdata[i].option7!==null){
              var obj7={}
              obj7.thedate=arrdata[i].thedate;
              obj7.option7=arrdata[i].option7;
              option7.push(obj7);
            }
            if(arrdata[i].option8!==null){
              var obj8={}
              obj8.thedate=arrdata[i].thedate;
              obj8.option8=arrdata[i].option8;
              option8.push(obj8);
            }
            if(arrdata[i].option9!==null){
              var obj9={}
              obj9.thedate=arrdata[i].thedate;
              obj9.option9=arrdata[i].option9;
              option9.push(obj9);
            }
            if(arrdata[i].option10!==null){
              var obj10={}
              obj10.thedate=arrdata[i].thedate;
              obj10.option10=arrdata[i].option10;
              option10.push(obj10);
            }
            if(arrdata[i].option11!==null){
              var obj11={}
              obj11.thedate=arrdata[i].thedate;
              obj11.option11=arrdata[i].option11;
              option11.push(obj11);
            }
            if(arrdata[i].option12!==null){
              var obj12={}
              obj12.thedate=arrdata[i].thedate;
              obj12.option12=arrdata[i].option12;
              option12.push(obj12);
            }
            if(arrdata[i].option13!==null){
              var obj13={}
              obj13.thedate=arrdata[i].thedate;
              obj13.option13=arrdata[i].option13;
              option13.push(obj13);
            }
            if(arrdata[i].option14!==null){
              var obj14={}
              obj14.thedate=arrdata[i].thedate;
              obj14.option14=arrdata[i].option14;
              option14.push(obj14);
            }
          }
          that.setData({option1:option1})
          that.setData({option2:option2})
          that.setData({option3:option3})
          that.setData({option4:option4})
          that.setData({option5:option5})
          that.setData({option6:option6})
          that.setData({option7:option7})
          that.setData({option8:option8})
          that.setData({option9:option9})
          that.setData({option10:option10})
          that.setData({option11:option11})
          that.setData({option12:option12})
          that.setData({option13:option13})
          that.setData({option14:option14})
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
                var arrdata=res.data.data;
                var option1=[],option2=[],option3=[],option4=[],option5=[],option6=[],option7=[],
                    option8=[],option9=[],option10=[],option11=[],option12=[],option13=[],option14=[];
                for(var i=0;i<arrdata.length;i++){
                  if(arrdata[i].option1!==null){
                    var obj1={}
                    obj1.thedate=arrdata[i].thedate;
                    obj1.option1=arrdata[i].option1;
                    option1.push(obj1);
                  }
                  if(arrdata[i].option2!==null){
                    var obj2={}
                    obj2.thedate=arrdata[i].thedate;
                    obj2.option2=arrdata[i].option2;
                    option2.push(obj2);
                  }
                  if(arrdata[i].option3!==null){
                    var obj3={}
                    obj3.thedate=arrdata[i].thedate;
                    obj3.option3=arrdata[i].option3;
                    option3.push(obj3);
                  }
                  if(arrdata[i].option4!==null){
                    var obj4={}
                    obj4.thedate=arrdata[i].thedate;
                    obj4.option4=arrdata[i].option4;
                    option4.push(obj4);
                  }
                  if(arrdata[i].option5!==null){
                    var obj5={}
                    obj5.thedate=arrdata[i].thedate;
                    obj5.option5=arrdata[i].option5;
                    option5.push(obj5);
                  }
                  if(arrdata[i].option6!==null){
                    var obj6={}
                    obj6.thedate=arrdata[i].thedate;
                    obj6.option6=arrdata[i].option6;
                    option6.push(obj6);
                  }
                  if(arrdata[i].option7!==null){
                    var obj7={}
                    obj7.thedate=arrdata[i].thedate;
                    obj7.option7=arrdata[i].option7;
                    option7.push(obj7);
                  }
                  if(arrdata[i].option8!==null){
                    var obj8={}
                    obj8.thedate=arrdata[i].thedate;
                    obj8.option8=arrdata[i].option8;
                    option8.push(obj8);
                  }
                  if(arrdata[i].option9!==null){
                    var obj9={}
                    obj9.thedate=arrdata[i].thedate;
                    obj9.option9=arrdata[i].option9;
                    option9.push(obj9);
                  }
                  if(arrdata[i].option10!==null){
                    var obj10={}
                    obj10.thedate=arrdata[i].thedate;
                    obj10.option10=arrdata[i].option10;
                    option10.push(obj10);
                  }
                  if(arrdata[i].option11!==null){
                    var obj11={}
                    obj11.thedate=arrdata[i].thedate;
                    obj11.option11=arrdata[i].option11;
                    option11.push(obj11);
                  }
                  if(arrdata[i].option12!==null){
                    var obj12={}
                    obj12.thedate=arrdata[i].thedate;
                    obj12.option12=arrdata[i].option12;
                    option12.push(obj12);
                  }
                  if(arrdata[i].option13!==null){
                    var obj13={}
                    obj13.thedate=arrdata[i].thedate;
                    obj13.option13=arrdata[i].option13;
                    option13.push(obj13);
                  }
                  if(arrdata[i].option14!==null){
                    var obj14={}
                    obj14.thedate=arrdata[i].thedate;
                    obj14.option14=arrdata[i].option14;
                    option14.push(obj14);
                  }
                }
                that.setData({option1:option1})
                that.setData({option2:option2})
                that.setData({option3:option3})
                that.setData({option4:option4})
                that.setData({option5:option5})
                that.setData({option6:option6})
                that.setData({option7:option7})
                that.setData({option8:option8})
                that.setData({option9:option9})
                that.setData({option10:option10})
                that.setData({option11:option11})
                that.setData({option12:option12})
                that.setData({option13:option13})
                that.setData({option14:option14})
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
  goAhead:function(e){
    wx.redirectTo({
      url: '../index/index'
    })
  }
});
//# sourceMappingURL=splash.js.map