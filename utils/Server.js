// const baseUrl = '';

function API(url, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: {
        "Authorization": "APPCODE b74d86ef42b04ca6ac16687668983c65"
      },
      method: method || 'GET',
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}
module.exports = {
  // 查询快递
  searchBox: (data, method) => API("https://wuliu.market.alicloudapi.com/kdi", data, method)
}