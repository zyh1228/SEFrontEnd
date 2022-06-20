// pages/detail/index.js
import api from '../api'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelDetail : [],
    host: app.globalData.HOST
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    api.getModelDetail((modelDetail)=>{
      this.setData({
        modelDetail: modelDetail,
        time: modelDetail.last_edit_time.substring(0,10) +" " + modelDetail.last_edit_time.substring(11,19)
      })
      console.log(modelDetail)
    }, options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getModel(e){
    let url = 'http://' + app.globalData.HOST + this.data.modelDetail.model_file
    wx.navigateTo({
      url: "/pages/index/index",
      success:(res)=> {
        res.eventChannel.emit('acceptData', { url })
      }
    });
  }
})