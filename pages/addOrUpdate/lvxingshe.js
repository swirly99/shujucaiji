// pages/addOrUpdate/jingqu.js
import { SaveOrUpdate } from "../../utils/SaveOrUpdate.js"
import { PositionStr } from "../../utils/PositionStr.js"
import { GetData } from "../../utils/GetData.js"

const positionStr = new PositionStr()
const saveOrUpdate = new SaveOrUpdate()
const getData = new GetData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lx: '',//旅行社类型(提交的时候需要整理)
    dj: '',//旅行社级别(提交的时候需要整理)
    dyrs: 0,//导游人数
    ywfw: '',//业务范围(提交的时候需要整理)
    fwyz: '',//服务语种选项(提交的时候需要整理)
    fzjg: '',//分支机构
    zgdx: '',//注册和更新短信

    lx_items: ['国内旅行社', '国际旅行社'],
    lx_index: 0,
    dj_items: ['未定级别', '一星级', '二星级', '三星级', '四星级', '五星级'],
    dj_index: 0,
    ywfw_items:[
      { name: '出境旅游业务', checked: false },
      { name: '国内旅游业务', checked: false },
      { name: '入境旅游业务', checked: false },
      { name: '赴台游旅游业务', checked: false }
    ],
    fwyz_items: [
      { name: '普通话', checked: false },
      { name: '英语', checked: false },
      { name: '日语', checked: false },
      { name: '韩语', checked: false },
      { name: '意大利语', checked: false },
      { name: '西班牙语', checked: false },
      { name: '俄语', checked: false },
      { name: '德语', checked: false },
      { name: '法语', checked: false },
      { name: '其他', checked: false }
    ],
    b_width: 340,
    view_index: 0,
  },
  jc: null,


  //(普通文本框 || 普通下拉框 || 时间下拉框 || 普通复选框)赋值
  input_value: function (e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
    })
  },
  //普通文本框失去焦点验证
  input_blur: function (e) {
    if (e.detail.value == "") {
      this.setData({
        [e.currentTarget.dataset.id]: 0,
      })
    }
  },

  //滑动swiper，控制swiper页码
  change_swiper: function (e) {
    this.setData({
      view_index: e.detail.current
    })
  },

  //下一页
  bottom_view: function () {
    this.setData({
      view_index: this.data.view_index + 1
    })
  },
  //上一页
  up_view: function () {
    this.setData({
      view_index: this.data.view_index - 1
    })
  },

  submit: function () {
    var ywfw_str = '', fwyz_str=''
    if (this.data.ywfw.length>0){
      this.data.ywfw.forEach(v=>{ywfw_str+=v+","})
      ywfw_str = ywfw_str.length > 0 ? ywfw_str.substr(0, ywfw_str.length-1):''
    }
    if (this.data.fwyz.length > 0) {
      this.data.fwyz.forEach(v => { fwyz_str += v + "," })
      fwyz_str = fwyz_str.length > 0 ? fwyz_str.substr(0, fwyz_str.length - 1) : ''
    }

    var that=this.data
    var qt = new Object();
    qt.lx = that.lx_items[that.lx_index]
    qt.dj =that.dj_items[that.dj_index]
    qt.dyrs = that.dyrs
    qt.ywfw = ywfw_str
    qt.fwyz = fwyz_str
    qt.fzjg = that.fzjg
    qt.zgdx = that.zgdx

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
            lx_index: positionStr.radio_position(this.data.lx_items,this.data.lx),
            dj_index: positionStr.radio_position(this.data.dj_items, this.data.dj),
            ywfw_items: positionStr.check_position(this.data.ywfw_items, this.data.ywfw),
            fwyz_items: positionStr.check_position(this.data.fwyz_items, this.data.fwyz)
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