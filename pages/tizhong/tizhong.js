// pages/tizhong/tizhong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexarray:['男','女'],
    index: '',
    heightIndex:'',
    heightArray:[],
    cm:'',//身高单位
    weightIndex:'',
    weightArray:[],
    kg:'',//体重单位
    hiddens:false,
    cent:''
  },
  pickChange:function(e){
    this.setData({
      index:e.detail.value
    });
    console.log(this.data.sexarray[e.detail.value])
  },
  heightChange:function(e){
    this.setData({
      heightIndex:e.detail.value,
      cm:'CM'
    });
  },
  weightChange:function(e){
    this.setData({
      weightIndex:e.detail.value,
      kg:'KG'
    });
  },
  getBox(){
    var that=this
    wx.request({
      url: 'https://api.jisuapi.com/weight/bmi',
      data: {
        appkey:'********',//极速API申请
        sex: that.data.sexarray[that.data.index],
        height:that.data.heightArray[that.data.heightIndex],
        weight:that.data.weightArray[that.data.weightIndex]
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
            console.log(res.data.cent)
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
    var arr = new Array();
      for(var i=1;i<200;i++){
        arr.push(i);
      }
      this.setData({
        heightArray:arr,
        weightArray:arr
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