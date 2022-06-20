// pages/mine/history.js
import api from '../api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyItems: [],
    historyTotal: 0,
    historyCurrentCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    api.getHistoryList((historyList)=>{
      let count = historyList.total > 10 ? 10 : historyList.total
      this.setData({
        historyItems: historyList.results,
        historyTotal: historyList.total,
        historyCurrentCount: count
      })
      console.log(this.data.historyItems)
    }, 10, 0)
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
    if (this.data.historyTotal > this.data.historyCurrentCount) {
      api.getHistoryList((historyList)=>{
        this.data.historyCurrentCount += historyList.total - this.data.historyCurrentCount > 10 ? 10 : historyList.total - this.data.historyCurrentCount
        this.data.historyItems += historyList.results
        this.setData({
          historyItems: this.data.historyItems,
          historyTotal: historyList.total,
          historyCurrentCount: this.data.historyCurrentCount
        })
      }, 10, this.data.historyCurrentCount)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})