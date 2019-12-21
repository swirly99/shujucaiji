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
    UnitType: '',//单位性质 
    UnitType_items: [//单位性质列表
      { name: '行政机关', checked: false },
      { name: '行政类事业单位', checked: false },
      { name: '公益类事业单位', checked: false },
      { name: '其他', checked: false },
    ],
    level: '',//行政级别
    level_items: ['厅局级', '县处级', '乡科级','其他'],
    level_index: 0,
    practitioners: '',//从业人员数
    editing: '',// 在编文物从业人员数
    other: '',// 其他文物从业人员数
    immovable: '',// 本辖区不可移动文物（处）
    country: '',// 本辖区不可移动文物（处）：全国重点文物保护单位
    provincial: '',// 本辖区不可移动文物（处）：省级文物保护单位
    city: '',// 本辖区不可移动文 物（处）：市县级文物保护单位
    open: '',// 对外开放或利用省级及以上文物保护单位数
    local: '',// 本级出台地方性文 物业法规、规章

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
    //下拉框数据处理   
    var UnitType1 = "";
    if (this.data.UnitType.length > 0) {
      this.data.UnitType.forEach(v => {
        UnitType1 += (v + ",")
      })
      UnitType1 = UnitType1.substr(0, UnitType1.length - 1)
    }
    //数据存放到jc
    var qt = new Object();
    qt.UnitType = UnitType1
    qt.level = this.data.level_items[this.data.level_index]
    qt.practitioners = this.data.practitioners
    qt.editing = this.data.editing
    qt.other = this.data.other
    qt.immovable = this.data.immovable
    qt.country = this.data.country
    qt.provincial = this.data.provincial
    qt.city = this.data.city
    qt.open = this.data.open
    qt.local = this.data.local


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
            UnitType_items: positionStr.check_position(this.data.UnitType_items, this.data.UnitType),
            UnitType: this.data.UnitType == '' ? '' : this.data.UnitType.split(","),
            level_index: positionStr.radio_position(this.data.level_items, this.data.level),
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