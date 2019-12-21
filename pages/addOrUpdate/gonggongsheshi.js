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
    ServiceType:'',//服务类型
    ServiceType_items: [//服务类型列表
      {name:'汽车站', checked:false},
      {name:'咨询中心', checked:false},
      {name:'集散中心', checked:false},
      {name:'加油站', checked:false},
      {name:'修理厂', checked:false},
      {name:'银行储蓄所', checked:false},
      {name:'火车站', checked:false},
      {name:'药店', checked:false},
      {name:'医院', checked:false},
      {name:'环湖骑行驿站', checked:false},
      {name:'快递公司邮局', checked:false},
      {name:'保险公司', checked:false},
      {name:'公交站台', checked:false},
      {name:'其他', checked:false},
    ],
    scenic:'',//所属景区名称
    TypeAndContent:'',//服务类型和内容
    isbuilt:'',//是否已建
    isbuilt_items: ['已建','在建','规划'],
    isbuilt_index: 0,
    star:'',//星级
    score:'',//评分
    b_width: 340,
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
  submit:function(){
    //下拉框数据处理
    var ServiceType1="";
    if (this.data.ServiceType.length>0){
      this.data.ServiceType.forEach(v=>{
        ServiceType1 += (v + ",")
      })
      ServiceType1=ServiceType1.substr(0,ServiceType1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.ServiceType = ServiceType1
    qt.scenic=this.data.scenic
    qt.isbuilt = this.data.isbuilt_items[this.data.isbuilt_index],
    qt.TypeAndContent=this.data.TypeAndContent
    qt.OwnerUnit=this.data.OwnerUnit
    qt.star=this.data.star
    qt.score=this.data.score

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
            ServiceType_items: positionStr.check_position(this.data.ServiceType_items, this.data.ServiceType),
            isbuilt_index: positionStr.radio_position(this.data.isbuilt_items, this.data.isbuilt),
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