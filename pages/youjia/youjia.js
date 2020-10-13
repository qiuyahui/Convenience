// pages/youjia/youjia.js
var list  = []
import { multiArray, objectMultiArray} from '../../pages/pickerLinkage/pickerLinkage.js'
var QQMapWX = require("../../libs/qqmap-wx-jssdk.js"); //引入插件
var qqmapsdk; //定义变量(文档那的)
Page({

  /**
   * 页面的初始数据
   */
  data: {
     multiIndex: [0, 0],
     multiArray: multiArray,     
     objectMultiArray: objectMultiArray,
     oils:'',//油价
     dates:'',//油价更新时间
     curLat: 0, // 存纬度的 (手动选择地址后 经纬度重新赋值， 打开地图 要用)
     curLon: 0 ,//存经度的,
     curCityAddress:'',//当前位置经纬度
     province : '',//当前定位省份
     city:'',//当前定位城市
     hiddens:false,
     hidden:true,
     weather:''//天气情况
  },
  bindMultiPickerChange: function(e) {
    var that = this
      that.setData({ 
      "multiIndex[0]": e.detail.value[0], "multiIndex[1]": e.detail.value[1] ,
      hiddens:true,
      hidden:false
    }) 
    that.oil(that.data.multiArray[0][that.data.multiIndex[0]])
    that.weather(that.data.multiArray[1][that.data.multiIndex[1]])
    }, 
    
    bindMultiPickerColumnChange: function(e) { 
     var that = this
         switch (e.detail.column) {
             case 0: list = []
             for (var i = 0; i < that.data.objectMultiArray.length; i++) {
                     if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) { 
                            list.push(that.data.objectMultiArray[i].regname)
                     } 
         } 
         that.setData({
                 "multiArray[1]": list,
                 "multiIndex[0]": e.detail.value, "multiIndex[1]": 0 
             })
         }
     },

oil(e){
  var that=this
  wx.request({
    url: 'https://api.jisuapi.com/oil/query',
    data: {
      appkey:'********极速API申请',
      province: e
    },
    method: 'get',
    success(res) {
      switch (res.data.status) {
        case 0:
         var dates= res.data.result.updatetime.substring(0,10)
          that.setData({
            oils:res.data.result,
            dates:dates
          })
          console.log(that.data.oils)
          break;
      }
    }
  })
},

 //下拉刷新
 onPullDownRefresh: function () {
  wx.showNavigationBarLoading() //在标题栏中显示加载
  this.onLoad()
  console.log(123)
  //模拟加载
  setTimeout(function () {
    // complete
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }, 1500);
},


  //获取当前定位
  position(){
    var that = this;
    var locations;
    qqmapsdk = new QQMapWX({
      key: 'FH2BZ-K4LCI-L7YGC-55MTK-2XGCV-EKBMH'
    });//新建实例
    wx.getLocation({ //小程序 的获取当前的位置经纬度 
      type: 'gcj02',
      success(res) {
        that.setData({//给经纬度赋个值吧
          curLat: res.latitude,
          curLon: res.longitude
        })
        qqmapsdk.reverseGeocoder({ //腾讯的地图的接口 经纬度查位置 //并没有很精确
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            // 可看文档取自己需要信息  这只取了address
            that.setData({
              curCityAddress: addressRes.result.address,
              province:addressRes.result.address_component.province,
              city:addressRes.result.address_component.city
            })
            var arr = that.data.province.split("省");
            that.oil(arr[0])
            that.weather(addressRes.result.address_component.city)
          },
          fail: function (error) {
            console.error(error);
          },
        })
      },
      fail: function (err) {
        console.log(err);
        //失败的时候 可以查查 用户授权情况 
        //wx.getSetting();获取用户的当前设置,返回值中只会出现小程序已经向用户请求过的权限
        wx.getSetting({
          success: function (res) {
            console.log(res);
            console.log(res.authSetting.scope.userLocation); //可以判断用户是否 取消授权了 以便后续可以再次提醒他授权
            //授权在这不多做讨论
          }
        })
      }
    })
  },

  weather(e){
    var that=this
    wx.request({
      url: 'https://api.jisuapi.com/weather/query',
      data: {
        appkey:'af589be611355dd8',
        city: e
      },
      method: 'get',
      success(res) {
        switch (res.data.status) {
          case 0:
            console.log(res.data)
            that.setData({
              weather:res.data.result
            
            })
          
            break;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.position()
       this.setData({
        hiddens:false,
        hidden:true
       })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //判断是否有打开过页面
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})