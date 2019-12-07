// pages/upload/index.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zslx: '',//住宿类型
    dj: '',//等级(提交的时候需要整理)
    zsfl: '',//住宿分类(提交的时候需要整理)
    zsfw: '',//住宿服务
    shry: '',//所获荣誉
    jdzc: '',//酒店政策
    fjsl: 0,//房间数量
    cw: 0,//床位
    fj:0.0,//房价---
    cwsl:0,//车位数量---
    xyk:'',//信用卡
    yysj: '',//营业时间
    ydtsdh: '',//预订投诉电话
    fjlx:'',//房间类型


    dj_items: ['未定级别', 'AAAAA', 'AAAA', 'AAA', 'AA', 'A'],
    dj_index: 0,
    zsfl_items: ['星级宾馆','商务宾馆','度假酒店','酒店公寓','青年旅社','招待所','特色主题酒店'],
    zsfl_index:0,
    b_width: 340,
    view_index: 0,
  },
  jc:null,

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

  submit:function(){
    var qt = new Object();
    qt.zslx=this.data.zslx
    qt.dj=this.data.dj_items[this.data.dj_index]
    qt.zsfl = this.data.zsfl_items[this.data.zsfl_index]
    qt.zsfw=this.data.zsfw
    qt.shry=this.data.shry
    qt.jdzc=this.data.jdzc
    qt.fjsl=this.data.fjsl
    qt.cw=this.data.cw
    qt.fj=this.data.fj
    qt.cwsl=this.data.cwsl
    qt.xyk=this.data.xyk
    qt.yysj=this.data.yysj
    qt.ydtsdh=this.data.ydtsdh
    qt.fjlx=this.data.fjlx

    var para = this.jc
    para.attr = qt

    getData.req("collection/ctg_sava.jspx", "POST", para, res => {
      if (res.data.status == 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000
        })
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.showToast({
          title: data.errMsg,
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
    this.jc = JSON.parse(decodeURIComponent(options.data))
    wx.setNavigationBarTitle({
      title: "添加（" + this.jc.entity.name + "_其他)"
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