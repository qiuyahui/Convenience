// pages/lottery/lottery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  classification(){
    wx.request({
      url: 'https://api.jisuapi.com/caipiao/class',
      data: {
        appkey: '******** '//极速PAI申请
      },
      method: 'get',
      success(res) {
        if (res.data.status==0){

        }
        console.log(res.data)
      }
    })
  },
   translateDataToTree(data) {
     let parents = data.filter(value => value.parentid == 'undefined' || value.parentid == null)
     let children = data.filter(value => value.parentid !== 'undefined' && value.parentid != null)
     let translator = (parents, children) => {
      parents.forEach((parent) => {
        children.forEach((current, index) => {
          if (current.parentid === parent.id) {
            let temp = JSON.parse(JSON.stringify(children))
            temp.splice(index, 1)
            translator([current], temp)
            typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
          }
        }
        )
      }
      )
    }
 
  translator(parents, children)
 
  return parents
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.classification()
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