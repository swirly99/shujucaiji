// pages/upload/addOrUpdate.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    b_width: 170,
    yyzt_item: [
      { name: '营业', checked: true },
      { name: '停业', checked: false }
    ],
    zsfl_item: [
      { name: '星级宾馆', checked: true },
      { name: '商务宾馆', checked: false },
      { name: '度假酒店', checked: false },
      { name: '酒店公寓', checked: false },
      { name: '青年旅社', checked: false },
      { name: '招待所', checked: false },
      { name: '特色主题酒店', checked: false },
    ],
    view_index: 4,
    is_null_arr: [
      { "zd": "name", "mc": "住宿名称", "view_index": 0, is: false },
      { "zd": "userName", "mc": "用户名", "view_index": 0, is: false },
    ],//需要验证的字段(以wxml中的dta-id为准)

    key: '',
    ctgId: '',
    name: '',//旅行社名称
    userName: '',//用户名
    level: '',//星级
    longitude: '',//经度
    latitude: '',//纬度
    typeImg: '',//住宿图片
    longImg: '',//标识图片
    price: '',//房价
    phone: '',//预订和投诉电话
    email: '',//联系方式
    yyzt: '营业',//营业状态（单选）————营业、停业
    xzqh: '',//行政区划
    xxdz: '',//详细地址
    sscx: '',//所属菜系
    fwdh: '',//服务电话
    zdtcd: '',//指定团餐点
    fzr: '',//负责人
    kysj: '',//开业时间和装修时间
    bjscws: '',//包间数和餐位数
    yymj: '',//营业面积
    jtlx: '',//交通路线
    wifi: '',//WIFI 情况
    tccqk: '',//停车场情况
    xyklx: '',//信用卡类型
    yb: '',//邮编
    jcfs: '',//就餐方式
    yyzzbh: '',//营业执照
    tyshxy: '',//统一社会信用代码
    zzjg: '',//组织机构代码
    zsfl: '星级宾馆',//住宿分类————————单选框
    ydwz: '',//预订网址
    zsfw: '',//住宿服务
    shry: '',//所获荣誉
    jdzc: '',//酒店政策
    jtxl: '',//交通线路
    fjsl: '',//房间和床位数量
    tcwsl: '',//停车位数量
    xyk: '',//信用卡
    rjdj: '',//人均单价
    bzt: '',//标志图
    fjlx: '',//房间类型
    yysj: '',//营业时间
    description: '',//简介
    imgs: [],
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
  //普通文本框赋值
  input_value: function (e) {
    this.data.is_null_arr.forEach(v => {
      if (v.zd == e.currentTarget.dataset.id) {
        if (e.detail.value == "") {
          v.is = false
        } else {
          v.is = true
        }
      }
    })
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
      is_null_arr: this.data.is_null_arr
    })

    console.log(this.data.zsfl)

  },
  //普通下拉框赋值
  change_picker: function (e) {
    this.setData({
      [e.currentTarget.dataset.id]: this.data.tjdldj_item[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.entity = JSON.parse(options.data)
    // wx.setNavigationBarTitle({
    //   title: "添加（" + this.entity.name + ")"
    // })

    // wx.getLocation({
    //   type: 'wgs84',// 参考系
    //   success: res => {
    //     this.setData({
    //       longitude: res.longitude,
    //       latitude: res.latitude,
    //       key: app.globalData.key,
    //       ctgId: this.entity.ctgId
    //     })
    //   }
    // })
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