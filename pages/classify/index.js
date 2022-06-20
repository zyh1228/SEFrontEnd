// pages/test/lqd.js
import api from '../api'

const list = require('../../pages/lists/index.js')
var app = getApp()

Page({ 
  data: { 
    navLeftItems: [], 
    navRightItems: [], 
    curNav: 1, 
    curIndex: 0,
    url:"",
    host: app.globalData.HOST
  }, 
  onShow: function() { 
  // 加载的使用进行网络访问，把需要的数据设置到data数据对象 
    api.getCategory((categoryList) => {
      this.setData({ 
        navLeftItems: categoryList
      })
      this.showModelList(this.data.curIndex)
    })
  },
  
  showModelList: function(curIndex){
    var that = this

    api.getModelList((modelList) => {
      that.setData({
        navRightItems: modelList
      })
    }, this.data.navLeftItems[curIndex].category_name)
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
    let id = e.currentTarget.dataset.id;
    api.getModelDetail((modelDetail)=>{
      let url = 'http://' + app.globalData.HOST + modelDetail.model_file
        wx.navigateTo({
          url: "/pages/index/index",
          success:(res)=> {
            res.eventChannel.emit('acceptData', { url })
          }
        });
    }, id)
    // wx.request({ 
    //   url: 'http://' + app.globalData.HOST + '/api/model/obj?id=' + id, 
    //   method: 'GET', 
    //   data: {}, 
    //   header: { 
    //   'Content-Type': 'application/json' 
    //   }, 
    //   success: function(res) { 
    //     console.log(res) 
    //     let url = 'http://' + app.globalData.HOST + res.data.data.model_file
    //     wx.navigateTo({
    //       url: "/pages/index/index",
    //       success:(res)=> {
    //         res.eventChannel.emit('acceptData', { url })
    //       }
    //     });
    //   } ,
    //   fail: function(err) { //请求失败
    //     wx.showToast({
    //       title: '请求失败',
    //       icon: 'fail',
    //       duration: 2000
    //     })
    //   },
    // }) 
  },
  //事件处理函数 
  switchRightTab: function(e) { 
  // 获取item项的id，和数组的下标值 
    let id = e.target.dataset.id
    let index = parseInt(e.target.dataset.index)

  // 把点击到的某一项，设为当前index 
    this.setData({ 
      curNav: id, 
      curIndex: index 
    }) 
    this.showModelList(index)
  } 
})