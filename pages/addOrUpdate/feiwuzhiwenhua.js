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
    ProCenter: '',//是否非物质文化遗产保护中心
    ProCenter_items: ['是', '否'],
    ProCenter_index: 0,
    independent: '',//是否独立核算
    independent_items: ['是', '否'],
    independent_index: 0,
    personnel: '',//工作人员
    professional: '',//专职人员
    technical: '',//专业技术人才
    seniorTitle: '',//正高级职称
    depSeniorTitle: '',//副高级职称
    ontTitle: '',//中级职称
    resources: '',// 调查成果：项目资源总量 字符型
    entity: '',// 调查成果：征集实物 字符型
    written: '',// 调查成果：征集文本资料 字符型
    sound: '',// 调查成果：录音资料 字符型
    videotape: '',// 调查成果：录像资料 字符型
    presentation: '',// 调查成果：调查报告 字符型
    achievements: '',// 调查成果：出版成果 字符型
    Detailedlist: '',// 调查成果：资源清单 字符型

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
    qt.ProCenter = this.data.ProCenter_items[this.data.ProCenter_index]
    qt.independent = this.data.independent_items[this.data.independent_index]
    qt.personnel = this.data.personnel
    qt.professional = this.data.professional
    qt.technical = this.data.technical
    qt.seniorTitle = this.data.seniorTitle
    qt.depSeniorTitle = this.data.depSeniorTitle
    qt.ontTitle = this.data.ontTitle
    qt.resources = this.data.resources
    qt.entity = this.data.entity
    qt.written = this.data.written
    qt.sound = this.data.sound
    qt.videotape = this.data.videotape
    qt.presentation = this.data.presentation
    qt.achievements = this.data.achievements
    qt.Detailedlist = this.data.Detailedlist

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
            ProCenter_index: positionStr.radio_position(this.data.ProCenter_items, this.data.ProCenter),
            independent_index: positionStr.radio_position(this.data.independent_items, this.data.independent),
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