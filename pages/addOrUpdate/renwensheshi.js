// pages/addOrUpdate/xiangcun.js
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
    RWSSType:'',//人文设施设施
    RWSSType_items: [//人文设施设施列表
      {name:'其他', checked:false},
      {name:'古遗址', checked:false},
      {name:'古墓葬', checked:false},
      {name:'古建筑', checked:false},
      {name:'石窟寺及石刻', checked:false},
      {name:'文化礼堂', checked:false},
      {name:'近现代重要史迹及代表性建筑', checked:false}
    ],
    RWSSLevel:'',//星级
    RWSSLevel_items: ['未定级别', '国家文保单位','省级文保单位', '县级文保单位'],//人文设施等级
    RWSSLevel_index:0,
    // b_width: 340,
    view_index: 0
  },
  jc:null,
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
  submit:function(){
    //下拉框数据处理
    var RWSSType1="";
    if (this.data.RWSSType.length>0){
      this.data.RWSSType.forEach(v=>{
        RWSSType1 += (v + ",")
      })
      RWSSType1=RWSSType1.substr(0,RWSSType1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.RWSSLevel = this.data.RWSSLevel_items[this.data.RWSSLevel_index],
    qt.RWSSType = RWSSType1

    var para = this.jc
    para.attr=qt

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
            RWSSLevel_index: positionStr.radio_position(this.data.RWSSLevel_items, this.data.RWSSLevel),
            RWSSType_items: positionStr.check_position(this.data.RWSSType_items, this.data.RWSSType)
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