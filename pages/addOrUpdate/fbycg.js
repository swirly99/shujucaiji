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
    RegTypt:'',//登记注册类型
    RegTypt_items: [//登记注册类型列表
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
      {name:'外商投资企业', checked:false},
    ],
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
      {name:'其他', checked:false}
    ],
    year:'',//主体建筑建成年份
    children:'',//是否儿童剧场
    children_items: ['是', '否'],
    children_index:0,
    Practitioners:'',//从业人员
    Professional:'',//专业技术人才
    seats:'',//坐席数

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
    var RegTypt1="";
    if (this.data.RegTypt.length>0){
      this.data.RegTypt.forEach(v=>{
        RegTypt1 += (v + ",")
      })
      RegTypt1=RegTypt1.substr(0,RegTypt1.length-1)
    }
    var Institutional1="";
    if (this.data.Institutional.length>0){
      this.data.Institutional.forEach(v=>{
        Institutional1 += (v + ",")
      })
      Institutional1=Institutional1.substr(0,Institutional1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.RegTypt = RegTypt1
    qt.Institutional = Institutional1
    qt.children = this.data.children_items[this.data.children_index],
    qt.Practitioners=this.data.Practitioners
    qt.year=this.data.year
    qt.Professional=this.data.Professional
    qt.seats=this.data.seats
    

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
            RegTypt_items: positionStr.check_position(this.data.RegTypt_items, this.data.RegTypt),
            RegTypt:this.data.RegTypt==''?'':this.data.RegTypt.split(","),
            Institutional_items: positionStr.check_position(this.data.Institutional_items, this.data.Institutional),
            Institutional:this.data.Institutional==''?'':this.data.Institutional.split(","),
            children_index: positionStr.radio_position(this.data.children_items, this.data.children),
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