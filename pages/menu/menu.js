// pages/menu/menu.js
var QQMapWX = require("../../libs/qqmap-wx-jssdk.js"); //引入插件
var qqmapsdk; //定义变量(文档那的)
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curCityAddress: '未知', // 地址
    curLat: 0, // 存纬度的 (手动选择地址后 经纬度重新赋值， 打开地图 要用)
    curLon: 0, //存经度的,
    markers: '',
    charLise: [],//地图返回列表
  },
  cesuo:function(e){
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  caishichang:function(e){
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },

  cdz: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },

  chongdianbao: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  daxue: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  dianyingyuan: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  ganxidian: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  gongyuan: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  haitan: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  haixian: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  jiayouzhan: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  jiudian: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  kendeji: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  lanqiuchang: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  zuqiuchang: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  shangchang: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  tingchechang: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  wangba: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  youyongguan: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  xicanting: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  yaodian: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  yinhang: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  ditiekou: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  gongjiaozhan: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  bianlidian: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  ktv: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  xiaochi: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  zensuo: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  qixiu: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },
  jingdian: function (e) {
    wx.navigateTo({
      url: '/pages/munPage/munPage?address=' + e.currentTarget.dataset.enum,
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
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
  onLoad: function (options) {
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
    });




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