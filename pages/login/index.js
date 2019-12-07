// pages/login/index.js
import {GetData} from "../../utils/GetData.js"
const getData = new GetData()

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'taishun',
    password:'123456'
  },

  input_data:function(e){
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value
    })
  },

  login:function(){
    getData.req("xcx/login.jspx","POST",this.data,res=>{
      if (res.data.status==200){
        
        app.globalData.key = res.data.key
        wx.redirectTo({
          url: '../upload/index'
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '景区数据录入系统'
    })
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