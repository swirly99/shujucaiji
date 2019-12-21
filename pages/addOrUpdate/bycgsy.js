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
    subjection:'',//隶属
    subjection_items: ['直属场馆','附属场馆'],//隶属列表
    subjection_index:0,
    Institutional:'',//机构分组
    Institutional_items: [//机构分组列表
      {name:'剧场', checked:false},
      {name:'影剧院', checked:false},
      {name:'音乐厅', checked:false},
      {name:'书场', checked:false},
      {name:'曲艺场', checked:false},
      {name:'杂技场', checked:false},
      {name:'马戏场', checked:false},
      {name:'综合性', checked:false},
      {name:'其他', checked:false},
    ],
    year:'',//主体建成年份
    isChildren:'',//是否儿童剧场
    isChildren_items: ['是','否'],//隶属列表  
    isChildren_index:0,   
    Practitioners:'',//从业人员
    professional:'',//专业技术人才
    SeniorTitle:'',//正高级职称
    DepSeniorTitle:'',//副高级职称
    IntTitle:'',//中级职称
    seats:'',//坐席数
    BuildArea:'',//实际使用房屋建筑面积
    Rentime:'',//装修时间
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
    var Institutional1="";
    if (this.data.Institutional.length>0){
      this.data.Institutional.forEach(v=>{
        Institutional1 += (v + ",")
      })
      Institutional1=Institutional1.substr(0,Institutional1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.Institutional = Institutional1
    qt.subjection = this.data.subjection_items[this.data.subjection_index],
    qt.isChildren = this.data.isChildren_items[this.data.isChildren_index],
    qt.year=this.data.year
    qt.Practitioners=this.data.Practitioners
    qt.professional=this.data.professional
    qt.SeniorTitle=this.data.SeniorTitle
    qt.DepSeniorTitle=this.data.DepSeniorTitle
    qt.IntTitle=this.data.IntTitle
    qt.seats=this.data.seats
    qt.BuildArea=this.data.BuildArea
    qt.Rentime=this.data.Rentime

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
            Institutional_items: positionStr.check_position(this.data.Institutional_items, this.data.Institutional),
            isChildren_index: positionStr.radio_position(this.data.isChildren_items, this.data.isChildren),
            subjection_index: positionStr.radio_position(this.data.subjection_items, this.data.subjection)
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