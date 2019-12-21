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
    Institutional:'',//机构分组
    Institutional_items: [//机构分组列表
      {name:'画廊', checked:false},
      {name:'画店', checked:false},
      {name:'艺术品拍卖企业', checked:false},
      {name:'艺术品展览机构', checked:false},
      {name:'艺术品电商平台企业', checked:false},
      {name:'文化产权交易所', checked:false},
      {name:'艺术品鉴定机构', checked:false},
      {name:'艺术品评估机构', checked:false},
      {name:'艺术品进出口经营单位', checked:false}
    ],
    Practitioners:'',//从业人员
    area:'',//经营面积
    time:'',//每天营业时间

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
    qt.Practitioners=this.data.Practitioners
    qt.area=this.data.area
    qt.time=this.data.time
    

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
            Institutional:this.data.Institutional==''?'':this.data.Institutional.split(","),
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