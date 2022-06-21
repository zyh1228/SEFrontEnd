import api from '../api'

const app = getApp()


Page({ 
  data: {   
    modelFile: null, 
    image: null,
    allowUploadModel: false,
    objModelId: null,
  },

  //上传图片到服务器 
  addModelInfo:function (e) { 
    var that = this  
    var img = that.data.image

    var name = e.detail.value.biaoti 
    var description = e.detail.value.neirong
    var category = e.detail.value.zuozhe

    if (!(name && description && category)) {
      return
    }

    api.addModel((res)=>{
      that.setData({
        objModelId: res.id,
        allowUploadModel: true
      })
    }, name, description, category, img)
  },

  //上传文件到服务器 
  formSubmit:function (e) { 
    var that = this  
    
    if (!that.data.modelFile) {
      return
    }
    api.upLoadModel((res)=>{
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1
      })    
    }, that.data.objModelId, that.data.modelFile.path)
  },

  //从本地获取照片 
  upimg: function () {  
    var that = this;  
    wx.chooseImage({    
      count: 1,        //一次性上传到小程序的数量
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({      
          image: res.tempFilePaths[0],
        })
      }
    })
  },

  //删除照片功能与预览照片功能 
  deleteImg: function (e) {  
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            image: unll
          });
        } else if (res.cancel) {
          return false;
        }
      }    
    })  
  },

  previewImg: function (e) {
    wx.previewImage({
      urls: this.data.image    
    })
  },

  //从聊天记录获取文件
  upModel: function () {  
    var that = this;  
    wx.chooseMessageFile({    
      count: 1,        //一次性上传到小程序的数量
      type: 'file',
      success(res) {
        that.setData({      
          modelFile: res.tempFiles[0],
        })
        console.log(res)
      }
    })
  },

  //删除文件功能 
  deleteModel: function (e) {  
    var that = this;
    if (!that.data.modelFile) {
      return false
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除此文件吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            modelFile: unll
          });
        } else if (res.cancel) {
          return false
        }
      }    
    })  
  },
})
