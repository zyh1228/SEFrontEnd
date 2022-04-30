// pages/test/lqd.js
Page({ 
  data: { 
    navLeftItems: ['汽车','建筑','电子器件','qweqwe','asdyhufgh'], 
    navRightItems: [], 
    curNav: 1, 
    curIndex: 0 
  }, 
  // onLoad: function() { 
  // // 加载的使用进行网络访问，把需要的数据设置到data数据对象 
  //   var that = this  
  //   wx.request({ 
  //     url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList', 
  //     method: 'GET', 
  //     data: {}, 
  //     header: { 
  //     'Accept': 'application/json' 
  //     }, 
  //     success: function(res) { 
  //       console.log(res) 
  //       that.setData({ 
  //       navLeftItems: res.data, 
  //       navRightItems: res.data 
  //     }) 
  //     } 
  //   }) 
  // }, 
  
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
  } 
})