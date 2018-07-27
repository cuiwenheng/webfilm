var app = getApp()
Page({
  data: {
    openId:'',
    weight:30,
    waist:80,
    height:170,
    systolicpressure:130,
    diastolicpressure:90,
    cholesterol:0,
    waistLocation:0,
    heightLocation:0,
    xueyayiLocation:0,
    xueyaerLocation:0,
    danguchunLocation:0,
    weightList:[],
    waistList:[],
    heightList:[],
    xueyayiList:[],
    xueyaerList:[],
    startPoint: {},//触摸开始
    dotPoint: {},//圆点坐标
    startAngle: 0,//开始角度
    tempAngle: 0,//移动角度
  },
  onLoad: function () {
    var that=this;
    var sess=app.qcloud.Session.get();
    if(sess&&sess.userinfo&&sess.userinfo.openId){
      this.setData({ openId: sess.userinfo.openId })
      wx.request({
        url: app.config.service.uploadhealth, //仅为示例，并非真实的接口地址
        data: {openId:this.data.openId},
        method:'GET',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          // res.data.data.region=JSON.parse(res.data.data.region);
          var mydata=res.data.data;
          mydata.weight=mydata.weight||that.data.weight;
          mydata.waist=mydata.waist||that.data.waist;
          mydata.height=mydata.height||that.data.height;
          mydata.systolicpressure=mydata.systolicpressure||that.data.systolicpressure;
          mydata.diastolicpressure=mydata.diastolicpressure||that.data.diastolicpressure;
          mydata.cholesterol=mydata.cholesterol||that.data.cholesterol;
          mydata.tempAngle=-(mydata.weight*1-30)*3;
          mydata.waistLocation=(80-mydata.waist*1)*30;
          mydata.heightLocation=(mydata.height*1-170)*5;
          mydata.xueyayiLocation=(mydata.systolicpressure*1-130)*5/2;
          mydata.xueyaerLocation=(mydata.diastolicpressure*1-90)*5/2;
          mydata.danguchunLocation=mydata.cholesterol*1*180/10;
          that.setData(mydata);
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
                url: app.config.service.uploadhealth, //仅为示例，并非真实的接口地址
                data: {openId:this.data.openId},
                method:'GET',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  console.log(res.data)
                  // res.data.data.region=JSON.parse(res.data.data.region);
                  var mydata=res.data.data;
                  mydata.tempAngle=-(mydata.weight*1-30)*3;
                  mydata.waistLocation=(80-mydata.waist*1)*30;
                  mydata.heightLocation=(mydata.height*1-170)*5;
                  mydata.xueyayiLocation=(mydata.systolicpressure*1-130)*5/2;
                  mydata.xueyaerLocation=(mydata.diastolicpressure*1-90)*5/2;
                  mydata.danguchunLocation=mydata.cholesterol*1*180/10;
                  that.setData(mydata);
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
    // js页面
    var weightList=[];
    for(var n=0;n<120;n++){
      weightList.push(n);
    }
    var waistList=[];
    for(var n=40;n<120;n++){
      waistList.push(n);
    }
    var heightList=[];
    for(var n=200;n>100;n--){
      heightList.push(n);
    }
    var xueyayiList=[];
    for(var n=90;n>=40;n--){
      xueyayiList.push(n)
    }
    var xueyaerList=[];
    for(var n=70;n>=20;n--){
      xueyaerList.push(n)
    }
    that.setData({
      weightList:weightList,
      waistList:waistList,
      heightList:heightList,
      xueyayiList:xueyayiList,
      xueyaerList:xueyaerList
    });
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.weightbiao').boundingClientRect(function (rect) {
      console.log(rect.width);
      var r=120;
      var y=120;
      var x=rect.width/2
      var circle={
        x:x,
        y:y,
        r:r
      };
      that.setData({
       //圆点坐标,x为屏幕一半,y为半径与margin-top之和,px
       //后面获取的触摸坐标是px,所以这里直接用px.
       dotPoint: { clientX: circle.x, clientY: circle.y,clientR:circle.r }
      })
    }).exec();
  },
  onReady: function (e) {
    var that = this;
    
  },
   // 菜单拖动的三个方法
  buttonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  buttonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];

    var tempAngle=that.data.tempAngle+(endPoint.clientX-that.data.startPoint.clientX)/50;

    while(tempAngle>=360){
      tempAngle=tempAngle-360;
    }
    while(tempAngle<=-360){
      tempAngle=tempAngle+360;
    }
    var weight=0;
    if(tempAngle<=0&&tempAngle>-270){
      weight=Math.round((90-tempAngle)/3);
    }
    if(tempAngle<=-270&&tempAngle>-360){
      weight=Math.round((-(270+tempAngle))/3);
    }
    if(tempAngle>0&&tempAngle<=90){
      weight=Math.round((90-tempAngle)/3);
    }
    if(tempAngle>90&&tempAngle<360){
      weight=Math.round((450-tempAngle)/3);
    }
    that.setData({
      weight:weight,
      tempAngle: tempAngle
    })
  },
  buttonEnd: function (e) {
    
  },
  heightButtonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  heightButtonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];
    var heightLocation=that.data.heightLocation+(endPoint.clientY-that.data.startPoint.clientY);
    while(heightLocation<-350){
      heightLocation=-350;
    }
    while(heightLocation>150){
      heightLocation=150;
    } 
    var height=170;
    height=Math.round(height+heightLocation/5);
    that.setData({
      startPoint:endPoint,
      height:height,
      heightLocation: heightLocation
    })
  },
  heightButtonEnd: function (e) {
    
  },
  waistButtonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  waistButtonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];
    var waistLocation=that.data.waistLocation+(endPoint.clientX-that.data.startPoint.clientX);
    while(waistLocation<-1200){
      waistLocation=-1200;
    }
    while(waistLocation>1200){
      waistLocation=1200;
    } 
    var waist=80;
    waist=Math.round(waist-waistLocation/30);
    that.setData({
      startPoint:endPoint,
      waist:waist,
      waistLocation: waistLocation
    })
  },
  waistButtonEnd: function (e) {
    
  },
  xueyayiButtonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  xueyayiButtonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];
    var xueyayiLocation=that.data.xueyayiLocation-(endPoint.clientY-that.data.startPoint.clientY);
    while(xueyayiLocation<-125){
      xueyayiLocation=-125;
    }
    while(xueyayiLocation>125){
      xueyayiLocation=125;
    } 
    var systolicpressure=130;
    systolicpressure=Math.round(systolicpressure+xueyayiLocation*2/5);
    that.setData({
      startPoint:endPoint,
      systolicpressure:systolicpressure,
      xueyayiLocation: xueyayiLocation
    })
  },
  xueyayiButtonEnd: function (e) {
    
  },
  xueyaerButtonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  xueyaerButtonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];
    var xueyaerLocation=that.data.xueyaerLocation-(endPoint.clientY-that.data.startPoint.clientY);
    while(xueyaerLocation<-125){
      xueyaerLocation=-125;
    }
    while(xueyaerLocation>125){
      xueyaerLocation=125;
    } 
    var diastolicpressure=90;
    diastolicpressure=Math.round(diastolicpressure+xueyaerLocation*2/5);
    that.setData({
      startPoint:endPoint,
      diastolicpressure:diastolicpressure,
      xueyaerLocation: xueyaerLocation
    })
  },
  xueyaerButtonEnd: function (e) {
    
  },
  danguchunButtonStart: function (e) {
    this.setData({
     startPoint: e.touches[0]
    })
  },
  danguchunButtonMove: function (e) {
    var that = this;
    var endPoint = e.touches[e.touches.length - 1];
    var danguchunLocation=that.data.danguchunLocation-(endPoint.clientY-that.data.startPoint.clientY);
    while(danguchunLocation<0){
      danguchunLocation=0;
    }
    while(danguchunLocation>180){
      danguchunLocation=180;
    } 
    var cholesterol=0;
    cholesterol=Math.round(cholesterol*100+danguchunLocation*10/180*100)/100;
    that.setData({
      startPoint:endPoint,
      cholesterol:cholesterol,
      danguchunLocation: danguchunLocation
    })
  },
  danguchunButtonEnd: function (e) {
    
  },
  goBack:function(e){
    wx.redirectTo({
      url: '../member/member'
    })
  },
  goAhead: function(){
    var that = this;
    var mydata=that.data;
    var postdata={
      openId:mydata.openId,
      weight:mydata.weight,
      waist:mydata.waist,
      height:mydata.height,
      systolicpressure:mydata.systolicpressure,
      diastolicpressure:mydata.diastolicpressure,
      cholesterol:mydata.cholesterol
    };
    wx.request({
      url: app.config.service.uploadhealth, //仅为示例，并非真实的接口地址
      data: postdata,
      method:'POST',
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.redirectTo({
          url: '../smoke/smoke'
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
        
  },
})