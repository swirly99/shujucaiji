// pages/addOrUpdate/gonggongsheshi.js
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
    year: '',//建成年份
    area: '',//建筑面积
    ownership: '',//产权归属
    divert: '',//挪用情况
    divert_items: ['挪用', '未挪用'],//挪用情况列表
    divert_index: 0,
    isFreeOpen: '',//免费开放
    isFreeOpen_items: ['是', '否'],//免费开放列表
    isFreeOpen_index: 0,
    isNObstacle: '',//是否无障碍设施
    isNObstacle_items: ['是', '否'],//是否无障碍设施
    isNObstacle_index: 0,
    isFreeWifi: '',//是否免费WIFI
    isFreeWifi_items: ['是', '否'],//是否免费WIFI列表
    isFreeWifi_index: 0,
    OpenTime: '',//每天开放时间
    OpenDay: '',//每周开放时间
    personnel: '',//工作人员数量
    InEditing: '',//在编人员数

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
    qt.year = this.data.year
    qt.area = this.data.area
    qt.ownership = this.data.ownership
    qt.divert = this.data.divert_items[this.data.divert_index]
    qt.isFreeOpen = this.data.isFreeOpen_items[this.data.isFreeOpen_index]
    qt.isNObstacle = this.data.isNObstacle_items[this.data.isNObstacle_index]
    qt.isFreeWifi = this.data.isFreeWifi_items[this.data.isFreeWifi_index]
    qt.OpenTime = this.data.OpenTime
    qt.OpenDay = this.data.OpenDay
    qt.personnel = this.data.personnel
    qt.InEditing = this.data.InEditing


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
          this.setData({
            divert_index: positionStr.radio_position(this.data.divert_items, this.data.divert),
            isFreeOpen_index: positionStr.radio_position(this.data.isFreeOpen_items, this.data.isFreeOpen),
            isNObstacle_index: positionStr.radio_position(this.data.isNObstacle_items, this.data.isNObstacle),
            isFreeWifi_index: positionStr.radio_position(this.data.isFreeWifi_items, this.data.isFreeWifi)
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