// pages/wenda/wenda.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',//输入框内容
    cent:{},
    hiddens:false,
    relquestion:''//相关问题
  },

      // 输入框内容
      inputValue(e) {
        this.setData({
          inputVal: e.detail.value
        })
        
      },
      //点击按钮
      getBox(){
        this.setData({
          relquestion: ''//相关问题
        })
        this.idSelect(this.data.inputVal)
      },
  
      rel(e){
        this.idSelect(e.currentTarget.dataset.rel)
      },

    idSelect(e){
      var that=this
      wx.request({
        url: 'https://api.jisuapi.com/iqa/query',
        data: {
          appkey:'******', //极速API申请
          question: e
        },
        method: 'get',
        success(res) {
          switch (res.data.status) {
            case 0:
              wx.showToast({
                title: '查询成功', icon: 'success', image: '/images/success.png', duration: 1500, success: function () {
                }
              })
              that.setData({
                cent:res.data.result,
                hiddens:true

              })
              if(res.data.result.relquestion!=null){
                that.setData({
                  relquestion : res.data.result.relquestion[0]
                })
              }
              console.log(res.data)
              break;
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