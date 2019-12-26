// pages/secondLevel/list.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    waresId:'',
    sonObj:null,
    list:null,
    sousuo_data:'',
  },

  add:function(e){
    wx.navigateTo({
      url: this.data.sonObj.code + "?ctgId="+this.data.sonObj.ctgId+"&waresId=" + this.data.waresId
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      waresId: options.waresId,
      sonObj: JSON.parse(options.sonObj)
    })
    wx.setNavigationBarTitle({
      title: this.data.sonObj.ctgName+"_列表"
    })
    getData.req("collection/extension_lsit.jspx", "POST", { key: app.globalData.key, ctgId: this.data.sonObj.ctgId, waresId: this.data.waresId}, res => {
      this.setData({
        list: [{ name: '红烧鲫鱼', id: 0, isTouchMove:false}]
      })
    })
  },

  /* 滑动出现编辑，删除start */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },
  touchmove: function (e) {
    var index = e.currentTarget.dataset.index,//当前索引

      startX = this.data.startX,//开始X坐标
      startY = this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    this.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    this.setData({
      list: this.data.list
    })
  },

  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /* 滑动出现编辑，删除end */



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