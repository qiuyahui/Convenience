
var QQMapWX = require("../../libs/qqmap-wx-jssdk.js"); //引入插件
var qqmapsdk; //定义变量(文档那的)
const chooseLocation = requirePlugin('chooseLocation');
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curCityAddress: '未知', // 地址
    curLat: 0, // 存纬度的 (手动选择地址后 经纬度重新赋值， 打开地图 要用)
    curLon: 0, //存经度的,
    markers:'',
    charLise: [],//地图返回列表
    charLiseSize: 0,//地图返回列表的长度
    i:1//onshow执行依据
  },

  navigation(e){
    var that=this;
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: e.currentTarget.dataset.latitude,//要去的纬度-地址
      longitude: e.currentTarget.dataset.longitude,//要去的经度-地址
      address: e.currentTarget.dataset.address + e.currentTarget.dataset.title
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
      key: '************'//腾讯地图官网申请
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
            locations = "'" + that.data.curLat + "," + that.data.curLon + "'"
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
    }),

      // 调用接口
      qqmapsdk.search({
        keyword: '充电桩',  //搜索关键词
        location: locations,  //设置周边搜索中心点
        page_size: 20,
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/resources/my_marker.png", //图标路径
              width: 20,
              height: 20
            })
          }
          that.setData({ //设置markers属性，将搜索结果显示在地图中
            markers: mks
          })
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
          that.setData(
            {
              charLise: res.data,
              charLiseSize: res.data.length
            }
          ) 
        }
      });
  },
  //进入地图
  movIn:function(){
    var that=this
    that.setData({
      i: 1//onshow执行依据
    })
    const key = 'FH2BZ-K4LCI-L7YGC-55MTK-2XGCV-EKBMH'; //使用在腾讯位置服务申请的key
    const referer = '测试'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: that.data.curLat,
      longitude: that.data.curLon
    });
    const category = '充电桩';

    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category,
     
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
    var locations = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (locations!=null && this.data.i==1){
         wx.openLocation({//​使用微信内置地图查看位置。
        latitude: locations.latitude,//要去的纬度-地址
        longitude: locations.longitude,//要去的经度-地址
        address: locations.address
      })
      this.setData({
        i:2
      })
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