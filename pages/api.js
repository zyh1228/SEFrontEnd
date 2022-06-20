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
  var searchParams = ''
  for (let key in params) {
    searchParams += '&' + String(key) + '=' + String(params[key])
  }
  if (searchParams !== '') {
    url += '?' + searchParams.substring(1)
  }

  console.log(url)

  wx.request({
    url: url,
    method: method, 
    data: data, 
    header: { 
      'Content-Type': contentType,
      'cookie': wx.getStorageSync('Set-Cookie')
    }, 
    success: function(res) { 
      if (res.data.error === null) {
        callback(res.data.data)
        if (res.header['Set-Cookie'] != '') {
          wx.setStorageSync('Set-Cookie', res.header['Set-Cookie'])
        }
      }
    } ,
    fail: function(err) { //请求失败
      //callback('error')
      wx.showToast({
        title: '请求失败',
        icon: 'fail',
        duration: 2000
      })
    },
  })
}

function userLogin(success, code, nickname, avatarURL) {
  let data = {
    code: code,
    nick_name: nickname,
    avatar_url: avatarURL
  }
  baseRequest('http://' + app.globalData.HOST + '/api/account/user', 'POST', success, {data})
}

function getCategory(success) {
  baseRequest('http://' + app.globalData.HOST + '/api/model/category', 'GET', success)
}

function getModelList(success, category) {
  let params = {category: category}
  baseRequest('http://' + app.globalData.HOST + '/api/model/obj', 'GET', success, {params})
}

function getModelDetail(success, modelID) {
  let params = {id: modelID}
  baseRequest('http://' + app.globalData.HOST + '/api/model/obj', 'GET', success, {params})
}

function getHistoryList(success, limit, offset) {
  let params = {
    limit: limit,
    offset: offset
  }
  baseRequest('http://' + app.globalData.HOST + '/api/history/history', 'GET', success, {params})
}

function deleteHistory(success, id) {
  let params = {id: id}
  baseRequest('http://' + app.globalData.HOST + '/api/history/history', 'DELETE', success, {params})
}

module.exports = {
  userLogin,
  getCategory,
  getModelList,
  getModelDetail,
  getHistoryList,
  deleteHistory,
}
