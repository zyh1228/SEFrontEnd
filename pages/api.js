var app = getApp()

function baseRequest(url, method, callback, options, contentType) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  if (contentType === undefined){
    contentType = 'application/json'
  }
  
  wx.request({
    url: url,
    method: method, 
      data: data, 
      header: { 
        'Content-Type': contentType
      }, 
      success: function(res) { 
        callback(res.data.data)
        var cookie = res.cookies
      } ,
      fail: function(err) { //请求失败
        callback('error')
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      },
  })
}

function getCategory(success) {
  baseRequest('http://' + app.globalData.HOST + '/api/model/category', 'GET', success)
}

module.exports = {
  getCategory,
}
