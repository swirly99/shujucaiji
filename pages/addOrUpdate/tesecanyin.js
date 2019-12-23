// pages/addOrUpdate/cesuo.js
import { GetData } from "../../utils/GetData.js"
import { SaveOrUpdate } from "../../utils/SaveOrUpdate.js"
import { PositionStr } from "../../utils/PositionStr.js"

const getData = new GetData()
const saveOrUpdate = new SaveOrUpdate()
const positionStr = new PositionStr()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SpeRestaurant: '',// 特色餐饮点
    cuisine: '',// 所属菜系
    GroupMeal: '',// 指定团餐点
    FoodSpecial: '',// 特色餐饮
    PrivateRooms: '',// 包间数
    seat: '',// 餐位数
    area: '',// 营业面积
    isWifi: '',// WIFI 情况
    CardType: '',// 信用卡类型
    grade: '',// 餐厅等级
    DiningMode: '',// 就餐方式
    b_width: 340,
    view_index: 0
  },
  jc: null,
  //(普通文本框 || 普通下拉框 || 时间下拉框 || 普通复选框)赋值
  input_value: function (e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
    })
  },
  //滑动swiper，控制swiper页码
  change_swiper: function (e) {
    this.setData({
      view_index: e.detail.current
    })
  },
  // 下一页
  bottom_view: function () {
    this.setData({
      view_index: this.data.view_index + 1
    })
  },
  // 上一页
  up_view: function () {
    this.setData({
      view_index: this.data.view_index - 1
    })
  },
  submit: function () {
    //数据存放到jc
    var qt = new Object();
    qt.SpeRestaurant = this.data.SpeRestaurant
    qt.cuisine = this.data.cuisine
    qt.GroupMeal = this.data.GroupMeal
    qt.FoodSpecial = this.data.FoodSpecial
    qt.PrivateRooms = this.data.PrivateRooms
    qt.seat = this.data.seat
    qt.area = this.data.area
    qt.isWifi = this.data.isWifi
    qt.CardType = this.data.CardType
    qt.grade = this.data.grade
    qt.DiningMode = this.data.DiningMode

    var para = this.jc
    para.attr = qt

    saveOrUpdate.post_data(para)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jc = JSON.parse(decodeURIComponent(options.data))
    wx.setNavigationBarTitle({
      title: "添加（" + this.jc.entity.name + "_其他)"
    })
    if (this.jc.id != null) {
      getData.req("collection/ctg_wares.jspx", "POST", { key: app.globalData.key, id: this.jc.id }, res => {
        if (res.data.status == 200) {
          this.setData(res.data.data)
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