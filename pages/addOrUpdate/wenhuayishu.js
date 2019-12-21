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
    RegType:'',//登记注册类型
    RegType_items: [//登记注册类型列表
      {name:'内资企业', checked:false},
      {name:'国有企业', checked:false},
      {name:'集体企业', checked:false},
      {name:'股份合作', checked:false},
      {name:'联合企业', checked:false},
      {name:'有限责任公司', checked:false},
      {name:'股份有限公司', checked:false},
      {name:'私营企业', checked:false},
      {name:'其他企业', checked:false},
      {name:'港澳台商投资企业', checked:false},
      {name:'外商投资企业', checked:false}
    ],
    Practitioners:'',//从业人员
    Professional:'',//专业技术人才
    SeniorTitle:'',//正高级职称
    DepSeniorTitle:'',//副高级职称
    IntTitle:'',//中级职称
    Intellectual:'',// 本单位拥有知识产权数量
    LeadTechnical:'',// 主导技术标准数量
    Publication:'',// 所办刊物
    ApplyPatent:'',// 申请专利数
    Patent:'',//论文及资料：专著数
    Paper:'',//论文及资料：论文数（省级及以上刊物公开发表）

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
    var RegType1="";
    if (this.data.RegType.length>0){
      this.data.RegType.forEach(v=>{
        RegType1 += (v + ",")
      })
      RegType1=RegType1.substr(0,RegType1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.RegType = RegType1
    qt.Practitioners=this.data.Practitioners
    qt.Professional=this.data.Professional
    qt.SeniorTitle=this.data.SeniorTitle
    qt.DepSeniorTitle=this.data.DepSeniorTitle
    qt.IntTitle=this.data.IntTitle
    qt.Intellectual=this.data.Intellectual
    qt.LeadTechnical=this.data.LeadTechnical
    qt.Publication=this.data.Publication
    qt.ApplyPatent=this.data.ApplyPatent
    qt.Patent=this.data.Patent
    qt.Paper=this.data.Paper
    

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
            RegType_items: positionStr.check_position(this.data.RegType_items, this.data.RegType),
            RegType:this.data.RegType==''?'':this.data.RegType.split(","),
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