// pages/upload/index.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list:[],
    sousuo_data:'',
    page_width:0,
  },

  input_sousuo:function(e){
    this.setData({
      sousuo_data:e.detail.value
    })
  },

  goList:function(e){
    wx.navigateTo({
      url: "list?data=" + JSON.stringify(this.data.type_list[e.currentTarget.dataset.index])
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '类型列表'
    })
    this.setData({
      page_width : wx.getSystemInfoSync().windowWidth
    })
    if (app.globalData.key==''){
      wx.redirectTo({
        url: '../login/index'
      })
    }else{
      getData.req("collection/ctg_lsit.jspx", "POST", { key: app.globalData.key}, res => {
        if (res.data.status==200){
          this.setData({
            type_list: res.data.data
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})