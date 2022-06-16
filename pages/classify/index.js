// pages/test/lqd.js
const list = require('../../pages/lists/index.js')
var app = getApp()

Page({ 
  data: { 
    navLeftItems: [], 
    navRightItems: [], 
    curNav: 1, 
    curIndex: 0,
    url:"",
    host: String
  }, 
  onLoad: function() { 
  // 加载的使用进行网络访问，把需要的数据设置到data数据对象 
    this.gteData(1)
  },
  
  gteData: function(curIndex){
    var that = this  
    wx.request({ 
      url: 'http://' + app.globalData.HOST + '/api/model/obj?category=' + curIndex, 
      method: 'GET', 
      data: {}, 
      header: { 
      'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res) 
        that.setData({ 
        navRightItems: res.data.data
      })
      } ,
      fail: function(err) { //请求失败
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      },
    }) 
    wx.request({ 
      url: 'http://' + app.globalData.HOST + '/api/model/category', 
      method: 'GET', 
      data: {}, 
      header: { 
      'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res) 
        that.setData({ 
        navLeftItems: res.data.data,
        host: app.globalData.HOST
      })
      } ,
      fail: function(err) { //请求失败
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      },
    }) 
  },
  // look(e){
  //   let url=e.target.dataset.url;
  //   console.log(url)
  //   if(!url)
  //     url=this.data.url;
  //   wx.navigateTo({
  //     url: "/pages/index/index",
  //     success:(res)=> {
  //       this.setData({url:""});
  //       res.eventChannel.emit('acceptData', { url })
  //     }
  //   });
  // },
  getModel(e){
    let id=e.target.dataset.id;
    console.log(id)
    wx.request({ 
      url: 'http://' + app.globalData.HOST + '/api/model/obj?id=' + id, 
      method: 'GET', 
      data: {}, 
      header: { 
      'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res) 
        let url = 'http://' + app.globalData.HOST + res.data.data.model_file
        wx.navigateTo({
          url: "/pages/index/index",
          success:(res)=> {
            res.eventChannel.emit('acceptData', { url })
          }
        });
      } ,
      fail: function(err) { //请求失败
        wx.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      },
    }) 
  },
  //事件处理函数 
  switchRightTab: function(e) { 
  // 获取item项的id，和数组的下标值 
    let id = e.target.dataset.id, 
    index = parseInt(e.target.dataset.index); 

  // 把点击到的某一项，设为当前index 
    this.setData({ 
    curNav: id, 
    curIndex: index 
    }) 
    console.log(e.target.dataset.name)
    this.gteData(e.target.dataset.name)
  } 
})