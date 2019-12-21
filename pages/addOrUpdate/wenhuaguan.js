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
    RgeType:'',//登记注册类型
    RgeType_items: [//登记注册类型列表
      {name:'内资企业', checked:false},
      {name:'国有企业', checked:false},
      {name:'集体企业', checked:false},
      {name:'股份合作', checked:false},
      {name:'联营企业', checked:false},
      {name:'有限责任公司', checked:false},
      {name:'股份有限公司', checked:false},
      {name:'私营企业', checked:false},
      {name:'其他企业', checked:false},
      {name:'港澳台投资企业', checked:false},
      {name:'外商投资企业', checked:false}
    ],
    level:'',//评估定级情况
    level_items: ['一级馆', '二级馆','三级馆','无等级馆'],//评估定级情况列表
    level_index:0,
    Practitioners:'',//从业人员
    professional:'',//专业技术人才
    SeniorTitle:'',//正高级职称
    DepSeniorTitle:'',//副高级职称
    IntTitle:'',//中级职称
    ComputerSum:'',//计算机台数
    StageCar:'',//流动舞台车数量
    TeamsSum:'',//志愿者服务队伍数
    PeopleSum:'',//志愿者服务队人数
    Organization:'',//由本馆指导文艺团体
    Amateur:'',//由本馆指导的馆办群众业余文艺团队
    ProductType:'',//文化创意产品种类
    year:'',//主体建成年份
    ownership:'',//产权归属
    OutSite:'',//室外活动场地
    isFreeOpen:'',//是否免费开放
    isFreeOpen_items: ['是', '否'],//是否免费开放列表
    isFreeOpen_index:0,
    isFreeWifi:'',//是否免费WIFI
    isFreeWifi_items: ['是', '否'],//是否免费WIFI列表
    isFreeWifi_index:0,
    safe:'',//安全检查设备
    safe_items: ['是', '否'],//安全检查设备
    safe_index:0,
    isNObstacle:'',//是否无障碍设施
    isNObstacle_items: ['是', '否'],//是否无障碍设施
    isNObstacle_index:0,
    OpenTime:'',//每天开放时间
    OpenDay:'',//每周开放天数

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
    var RgeType1="";
    if (this.data.RgeType.length>0){
      this.data.RgeType.forEach(v=>{
        RgeType1 += (v + ",")
      })
      RgeType1=RgeType1.substr(0,RgeType1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.RgeType = RgeType1
    qt.level = this.data.level_items[this.data.level_index],
    qt.Practitioners=this.data.Practitioners
    qt.professional=this.data.professional
    qt.SeniorTitle=this.data.SeniorTitle
    qt.DepSeniorTitle=this.data.DepSeniorTitle
    qt.IntTitle=this.data.IntTitle
    qt.ComputerSum=this.data.ComputerSum
    qt.StageCar=this.data.StageCar
    qt.TeamsSum=this.data.TeamsSum
    qt.PeopleSum=this.data.PeopleSum
    qt.Organization=this.data.Organization
    qt.Amateur=this.data.Amateur
    qt.ProductType=this.data.ProductType
    qt.year=this.data.year
    qt.ownership=this.data.ownership
    qt.OutSite=this.data.OutSite
    qt.isFreeOpen = this.data.isFreeOpen_items[this.data.isFreeOpen_index],
    qt.isFreeWifi = this.data.isFreeWifi_items[this.data.isFreeWifi_index],
    qt.safe = this.data.safe_items[this.data.safe_index],
    qt.isNObstacle = this.data.isNObstacle_items[this.data.isNObstacle_index],
    qt.OpenTime=this.data.OpenTime
    qt.OpenDay=this.data.OpenDay
    

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
            RgeType_items: positionStr.check_position(this.data.RgeType_items, this.data.RgeType),
            level_index: positionStr.radio_position(this.data.level_items, this.data.level),
            isFreeOpen_index: positionStr.radio_position(this.data.isFreeOpen_items, this.data.isFreeOpen),
            isFreeWifi_index: positionStr.radio_position(this.data.isFreeWifi_items, this.data.isFreeWifi),
            safe_index: positionStr.radio_position(this.data.safe_items, this.data.safe),
            isNObstacle_index: positionStr.radio_position(this.data.isNObstacle_items, this.data.isNObstacle)
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