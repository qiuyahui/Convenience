// pages/weather/weather.js
//获取应用实例
const app = getApp()
var QQMapWX = require("../../libs/qqmap-wx-jssdk.js"); //引入插件
var qqmapsdk; //定义变量(文档那的)
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.statusBarHeight + 'px',
    curLat: 0, // 存纬度的 (手动选择地址后 经纬度重新赋值， 打开地图 要用)
    curLon: 0 ,//存经度的,
    curCityAddress:'',//当前位置
    weather:{},//存放天气
    drsg:'',//穿衣指数
    comf:'',//舒适度
    uv:'',//紫外线
    cw:''//洗车
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      onloa: 2
    })
    this.onLoad();
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /**
   * 生命周期函数--监听页面加载
   */

  weather(){
    console.log(this.data.curLat + "," + this.data.curLon)
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather',
      data: {
        location: this.data.curLat + "," + this.data.curLon,
        key: '47c4185925b840ad809aef27cf908ae9'
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setData({
          weather: res.data.HeWeather6[0]
        })
        console.log(this.data.weather)
        for (var i=0;i<this.data.weather.lifestyle.length;i++){
          if (this.data.weather.lifestyle[i].type ==='drsg'){
              this.setData({
                drsg: this.data.weather.lifestyle[i].brf
              })
          } 
           else if (this.data.weather.lifestyle[i].type === 'comf') {

            this.setData({
              comf: this.data.weather.lifestyle[i].brf
            })
          } else if (this.data.weather.lifestyle[i].type === "uv") {
            this.setData({
              uv: this.data.weather.lifestyle[i].brf
            })
          } else if (this.data.weather.lifestyle[i].type == "cw") {
            this.setData({
              cw: this.data.weather.lifestyle[i].brf
            })
          }
        }
      }
    })

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
          that.weather()
          that.setData({
            curCityAddress: addressRes.result.address,
          })
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
  
  onLoad: function (options) {
    this.position()
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