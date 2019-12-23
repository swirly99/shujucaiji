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
    RegType: '',//登记注册类型
    RegType_items: [//登记注册类型列表
      { name: '内资企业', checked: false },
      { name: '国有企业', checked: false },
      { name: '集体企业', checked: false },
      { name: '股份合作', checked: false },
      { name: '联合企业', checked: false },
      { name: '有限责任公司', checked: false },
      { name: '股份有限公司', checked: false },
      { name: '私营企业', checked: false },
      { name: '其他企业', checked: false },
      { name: '港澳台商投资企业', checked: false },
      { name: '外商投资企业', checked: false }
    ],
    Institutional: '',//机构分组
    Institutional_items: [//机构分组列表
      { name: '综合性', checked: false },
      { name: '历史类', checked: false },
      { name: '艺术类', checked: false },
      { name: '自然科技类', checked: false },
      { name: '其他', checked: false }
    ],
    FreeOpen:'',//免费开放
    FreeOpen_items: ['是', '否'],
    FreeOpen_index: 0,
    insurance:'',//是否文保单位
    insurance_items: ['是', '否'],
    insurance_index: 0,
    Assessment: '',//评估定级情况
    Assessment_items: ['国家一级馆', '国家二级馆', '国家三级馆','无等级馆'],
    Assessment_index: 0,
    practitioners: '',// 从业人员数
    technical: '',// 专业技术人才
    security: '',// 安全保卫人员
    RegVolunteer: '',// 登记注册志愿者人数
    collection: '',// 藏品数
    CulturalRelic: '',// 文物藏品
    FirstRelic: '',// 一级文物
    SecondRelic: '',// 二级文物
    ThirdRelic: '',// 三级文物
    plan: '',// 文物保护规划和方案设计
    country: '',// 文物保护单位保护维修情况：国保单位保护维修项目数
    province: '',// 文物保护单位保护维修情况：省保单位保护维修项目数
    city: '',// 文物保护单位保护维修情况：市、县保单位保护维修项目数
    AEarea: '',// 进行考古发掘情况： 考古发掘面积
    unearthed: '',// 进行考古发掘情况： 出土器物
    original: '',// 进行考古发掘情况： 原址保护展示面积
    different: '',// 进行考古发掘情况： 异地保护展示面积
    publication: '',// 主办刊物
    international: '',// 国际合作项目数
    create: '',// 文化创意产品种类
    website: '',// 文博单位举办新媒体情况：举办网站
    visits: '',// 文博单位举办新媒体情况：网站年访问量
    MicroBlog: '',// 文博单位举办新媒体情况：举办微信公众号、微博
    follow: '',// 文博单位举办新媒体情况：举办微信公众号、微博关注人数

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
    var RegType1 = "";
    if (this.data.RegType.length > 0) {
      this.data.RegType.forEach(v => {
        RegType1 += (v + ",")
      })
      RegType1 = RegType1.substr(0, RegType1.length - 1)
    }
    var Institutional1 = "";
    if (this.data.Institutional.length > 0) {
      this.data.Institutional.forEach(v => {
        Institutional1 += (v + ",")
      })
      Institutional1 = Institutional1.substr(0, Institutional1.length - 1)
    }
    //数据存放到jc
    var qt = new Object();
    qt.RegType = RegType1
    qt.Institutional = Institutional1
    qt.FreeOpen = this.data.FreeOpen_items[this.data.FreeOpen_index]
    qt.insurance = this.data.insurance_items[this.data.insurance_index]
    qt.Assessment = this.data.Assessment_items[this.data.Assessment_index]
    qt.practitioners = this.data.practitioners
    qt.technical = this.data.technical
    qt.security = this.data.security
    qt.RegVolunteer = this.data.RegVolunteer
    qt.collection = this.data.collection
    qt.CulturalRelic = this.data.CulturalRelic
    qt.FirstRelic = this.data.FirstRelic
    qt.SecondRelic = this.data.SecondRelic
    qt.ThirdRelic = this.data.ThirdRelic
    qt.plan = this.data.plan
    qt.country = this.data.country
    qt.province = this.data.province
    qt.city = this.data.city
    qt.AEarea = this.data.AEarea
    qt.unearthed = this.data.unearthed
    qt.original = this.data.original
    qt.different = this.data.different
    qt.publication = this.data.publication
    qt.international = this.data.international
    qt.create = this.data.create
    qt.website = this.data.website
    qt.visits = this.data.visits
    qt.MicroBlog = this.data.MicroBlog
    qt.follow = this.data.follow



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
            RegType_items: positionStr.check_position(this.data.RegType_items, this.data.RegType),
            RegType: this.data.RegType == '' ? '' : this.data.RegType.split(","),
            Institutional_items: positionStr.check_position(this.data.Institutional_items, this.data.Institutional),
            Institutional: this.data.Institutional == '' ? '' : this.data.Institutional.split(","),
            FreeOpen_index: positionStr.radio_position(this.data.FreeOpen_items, this.data.FreeOpen),
            insurance_index: positionStr.radio_position(this.data.insurance_items, this.data.insurance),
            Assessment_index: positionStr.radio_position(this.data.Assessment_items, this.data.Assessment),
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