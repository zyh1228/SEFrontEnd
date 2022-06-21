var app = getApp()

function baseRequest(url, method, callback, options, contentType, fileKey, filePath) {
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

  if (filePath === undefined){
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
        } else {
          wx.showToast({
            title: res.data.data,
            icon: 'fail',
            duration: 2000
          })
        }
        if (res.header['Set-Cookie'] != '') {
          wx.setStorageSync('Set-Cookie', res.header['Set-Cookie'])
        }
      },
      fail: function(err) { //请求失败
        //callback('error')
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      },
    })
  } else {
    wx.uploadFile({
      url: url,
      name: fileKey,
      filePath: filePath,
      method: method, 
      formData: data, 
      header: { 
        'cookie': wx.getStorageSync('Set-Cookie')
      }, 
      success: function(res) {
        let result = JSON.parse(res.data)
        if (!result.error) {
          callback(result.data)
        } else {
          wx.showToast({
            title: result.data,
            icon: 'fail',
            duration: 2000
          })
        }
        if (res.header['Set-Cookie'] != '') {
          wx.setStorageSync('Set-Cookie', res.header['Set-Cookie'])
        }
      },
      fail: function(err) { //请求失败
        //callback('error')
        console.log(err)
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      },
    })
  }
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

function addModel(success, name, description, category, coverImage) {
  let data = {
    'name': name,
    'description': description,
    'category': category,
  }
  baseRequest('http://' + app.globalData.HOST + '/api/model/obj', 'POST', success, {data}, undefined, "cover", coverImage)
}

function upLoadModel(success, id, modelFile) {
  let data = {
    'id': id
  }
  baseRequest('http://' + app.globalData.HOST + '/api/model/obj/uploadModel', 'POST', success, {data}, undefined, "model", modelFile)
}

module.exports = {
  userLogin,
  getCategory,
  getModelList,
  getModelDetail,
  getHistoryList,
  deleteHistory,
  addModel,
  upLoadModel
}
