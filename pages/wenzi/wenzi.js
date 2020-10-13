// pages/wenzi/wenzi.js
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:''
  },
//待开发
  wenzi:function(){
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general',
      data: {
        access_token:'',
        url: tempFilePaths
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          weather: res.data.HeWeather6[0]
        })
        console.log(this.data.weather)
        for (var i = 0; i < this.data.weather.lifestyle.length; i++) {
          if (this.data.weather.lifestyle[i].type === 'drsg') {
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

  //选择照片
  choose: function () {
    wx.chooseImage({
      count: 9, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());
        this.setData({
          tempFilePaths: res.tempFilePaths
        })
        console.log(tempFilePaths)
        wenzi();
        //支持多图上传
        // for (var i = 0; i < res.tempFilePaths.length; i++) {
        //   //显示消息提示框
        //   wx.showLoading({
        //     title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
        //     mask: true
        //   })

        //   //上传图片
        //   //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
        //   //图片路径可自行修改
        //   uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
        //     function (result) {
        //       console.log("======上传成功图片地址为：", result);
        //       wx.hideLoading();
        //     }, function (result) {
        //       console.log("======上传失败======", result);
        //       wx.hideLoading()
        //     }
        //   )
        // }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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