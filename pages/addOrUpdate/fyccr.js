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
    IDnumber: '',// 身份证号
    inheritor: '',// 传承人姓名
    region: ['杭州市', '萧山区', '萧山镇', '萧山村'],// 地区名称
    province: '浙江省',// 省
    city: '杭州市',// 市
    country: '萧山区',// 区
    sex:'',// 性别
    sex_items: ['男', '女', '其他'],
    sex_index: 0,
    nation:'',// 民族
    birth: '',// 出生年月
    education:'',// 学历
    occupation: '',// 职业
    worlkUnit: '',// 工作单位
    jobTitle: '',// 职称职务
    entry: '', // 项目名称
    declaration: '',// 申报单位
    project: '',// 项目类别
    telephone: '',// 联系电话
    address: '',// 通讯地址
    declare: '',// 申报时间
    publish: '',// 公布时间
    resume: '',// 个人简历
    honor: '',// 个人荣誉 
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
  //特殊选择框————地址
  select_address: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],// 省
      city: e.detail.value[1],// 市
      country: e.detail.value[2],// 区
    })
  },
  submit: function () {
    //数据存放到jc
    var qt = new Object();
    qt.IDnumber = this.data.IDnumber
    qt.inheritor = this.data.inheritor
    qt.province = this.data.province
    qt.city = this.data.city
    qt.country = this.data.country
    qt.sex = this.data.sex_items[this.data.sex_index]
    qt.nation = this.data.nation
    qt.birth = this.data.birth
    qt.education = this.data.education
    qt.occupation = this.data.occupation
    qt.worlkUnit = this.data.worlkUnit
    qt.jobTitle = this.data.jobTitle
    qt.entry = this.data.entry
    qt.declaration = this.data.declaration
    qt.project = this.data.project
    qt.telephone = this.data.telephone
    qt.address = this.data.address
    qt.declare = this.data.declare
    qt.publish = this.data.publish
    qt.resume = this.data.resume
    qt.honor = this.data.honor


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

    if (that.entity.wid == null) {//添加
      wx.getLocation({
        type: 'wgs84',// 参考系
        success: res => {
          var lat = res.latitude
          var lng = res.longitude

          var ssws = that.wgs84togcj02(lng, lat)
          ssws = that.gcj02tobd09(ssws[0], ssws[1])
        }
      })
    }
    if (this.jc.id != null) {
      getData.req("collection/ctg_wares.jspx", "POST", { key: app.globalData.key, id: this.jc.id }, res => {
        if (res.data.status == 200) {
          this.setData(res.data.data)
          this.setData({
            sex_index: positionStr.radio_position(this.data.sex_items, this.data.sex)
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