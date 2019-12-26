// pages/secondLevel/tesecai.js
import { GetData } from "../../utils/GetData.js"
import { SaveOrUpdate } from "../../utils/SaveOrUpdate.js"
const getData = new GetData()
const saveOrUpdate = new SaveOrUpdate()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tscMc:'',//特色菜名称
    cgMc: '',//餐馆名称
    xl: '',//类型
    ld: '',//辣度
    jj: '',//简介
    longImg: '',// 展示图片

    file_url: 'http://data.zjjiyu.cn',
    b_width:700
  },

  //(普通文本框 || 普通下拉框 || 时间下拉框 || 普通复选框)赋值
  input_value: function (e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
    })
  },

  delete_img:function(){
    this.setData({
      longImg:''
    })
  },

  submit:function(){
    var qt=new Object()
    qt.tscMc = this.data.tscMc
    qt.cgMc = this.data.cgMc
    qt.xl = this.data.xl
    qt.ld = this.data.ld
    qt.jj = this.data.jj
    qt.longImg = this.data.longImg

    this.jc.attr = qt
    saveOrUpdate.post_data(para,'/collection/extension_sava.jspx',1)
  },

  //图片上传
  upload_img: function (e) {
    var msg = null
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showLoading({
          mask: true,
          title: '文件上传中...',
        })
          getData.upload_img(res.tempFilePaths[0], res => {
            msg = JSON.parse(res.data)
            this.setData({
              longImg: msg.url
            })
            wx.hideLoading()
          }, fail => {
            wx.hideLoading();
            wx.showToast({
              title: '文件上传失败',
              icon: 'none',
              duration: 2000
            })
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.key = app.globalData.key
    this.jc = options
    if(this.jc.id==null){
      wx.setNavigationBarTitle({
        title: "特色菜_添加"
      })
    }else{
      wx.setNavigationBarTitle({
        title: "特色菜_编辑" 
      })
    }
    this.setData({
      file_url: app.globalData.file_url
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