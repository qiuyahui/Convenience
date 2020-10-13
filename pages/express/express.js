import {
  searchBox
} from '../../utils/Server.js'
Page({
  data: {
    // express: ['圆通快递', '申通快递', '顺丰快递', '韵达快递', '德邦物流', '中通快递', '百世快递', '邮政包裹', 'EMS', '邮政国际'],
    // key: ['yuantong', 'shentong', 'shunfeng', 'yunda', 'debangwuliu', 'zhongtong', 'huitongkuaidi', 'youzhengguonei', 'ems', 'youzhengguoji'],
    index: 0,
    postId: '',
    data: [],
    loading: false,
    type:'',//快递类型
    searchInfo: {
      no: '',
    },
    inputVal: '',
    searchData: {},//页面加载需要的数据
    hiddens:false,//控制显示隐藏
    codeResult:''
  },

  // 输入框内容
  inputValue(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  scanCode(e){
        //事件处理函数
        var that = this
        wx.scanCode({
          success(res) {
            that.setData({
            inputVal: res.result
          })
          that.getBox();
          },
          //点击按钮痰喘指定的hiddenmodalput弹出框
      
      })
  },
  // 查询 包裹
  getBox() {
    // this.setData({
    //   hiddens: true,//控制显示隐藏
    // })
    //status 0: 正常查询 201: 快递单号错误 203: 快递公司不存在 204: 快递公司识别失败 
    //205: 没有信息 207: 该单号被限制，错误单号 * /
    wx.showLoading({ title: '加载中' })
    searchBox({ "no": this.data.inputVal }).then(data => {
      wx.hideLoading()
      switch (data.data.status) {
        case "0":
          wx.showToast({
            title: '查询成功', icon: 'success', image: '/images/success.png', duration: 1500, success: function () {
             
            }
          })
          this.setData({
            hiddens: true,//控制显示隐藏
            searchData: data.data.result
          })
          console.log(this.data.searchData)
          break;
        case "201":
          wx.showToast({ title: '快递单号错误', image: '/images/error.png', duration: 1500, })
          break;
        case "203":
          wx.showToast({ title: '快递公司不存在', image: '/images/error.png', duration: 1500, })
          break;
        case "204":
          wx.showToast({ title: '快递公司识别失败', image: '/images/error.png', duration: 1500, })
          break;
        case "205":
          wx.showToast({ title: '没有信息', image: '/images/error.png', duration: 1500, })
          break;
        case "207":
          wx.showToast({ title: '该单号被限制，错误单号', image: '/images/error.png', duration: 1500, })
          break;
      }
    })
  },
  onLoad: function () {
  
  }


})
