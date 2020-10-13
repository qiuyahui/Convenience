// pages/telmun/telnum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',//输入框内容
    cent:{},
    hiddens:false
  },

     // 输入框内容
     inputValue(e) {
      this.setData({
        inputVal: e.detail.value
      })
    },
    //点击按钮
    getBox(){
      this.telnum()
    },

  telnum(){
    var that=this
    wx.request({
      url: 'https://api.jisuapi.com/shouji/query',
      data: {
        appkey:'********** ', //极速API申请
        shouji: that.data.inputVal
      },
      method: 'get',
      success(res) {
        console.log(res.data)
       if(res.data.status===0) {
            wx.showToast({
              title: '查询成功', icon: 'success', image: '/images/success.png', duration: 1500, success: function () {
              }
            })
            that.setData({
              cent:res.data.result,
              hiddens:true
            })
            console.log(res.data.status)
           }
           else if(res.data.status==='201'){
            wx.showToast({ title: '手机号为空', image: '/images/error.png', duration: 1500, })
           }
           else if(res.data.status==='202'){
            wx.showToast({ title: '	手机号不正确', image: '/images/error.png', duration: 1500, })
           }
           else if(res.data.status==='203'){
            wx.showToast({ title: '没有信息', image: '/images/error.png', duration: 1500, })
       
           }
           
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