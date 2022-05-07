// pages/test/lqd.js
Page({ 
  data: { 
    navLeftItems: [], 
    navRightItems: [], 
    curNav: 1, 
    curIndex: 0 
  }, 
  onLoad: function() { 
  // 加载的使用进行网络访问，把需要的数据设置到data数据对象 
    this.gteData(1)
  },
  
  gteData: function(curIndex){
    var that = this  
    wx.request({ 
      url: 'http://127.0.0.1:8000/api/model/obj?category=' + curIndex, 
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
      url: 'http://127.0.0.1:8000/api/model/category', 
      method: 'GET', 
      data: {}, 
      header: { 
      'Content-Type': 'application/json' 
      }, 
      success: function(res) { 
        console.log(res) 
        that.setData({ 
        navLeftItems: res.data.data
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