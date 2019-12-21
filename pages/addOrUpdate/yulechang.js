// pages/addOrUpdate/jingqu.js
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
    ytype:'',//服务类型
    ytype_items: [//服务类型列表
      {name:'足疗按摩', checked:false},
      {name:'洗浴汗蒸', checked:false},
      {name:'咖啡厅', checked:false},
      {name:'茶馆', checked:false},
      {name:'KTV', checked:false},
      {name:'酒吧', checked:false},
      {name:'棋牌室', checked:false},
      {name:'游乐游艺', checked:false},
      {name:'桌球馆', checked:false},
      {name:'电影院', checked:false},
      {name:'健身中心', checked:false},
      {name:'武术场馆', checked:false},
      {name:'运动场馆', checked:false},
      {name:'体育场馆', checked:false},
      {name:'网吧', checked:false},
      {name:'歌舞厅', checked:false},
      {name:'其他', checked:false}
    ],
    card:'',//信用卡类型
    env:'',//环境
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
  //下一页
  // bottom_view: function () {
  //   this.setData({
  //     view_index: this.data.view_index + 1
  //   })
  // },
  //上一页
  // up_view: function () {
  //   this.setData({
  //     view_index: this.data.view_index - 1
  //   })
  // },
  submit:function(){
    //下拉框数据处理
    var ytype1="";
    if (this.data.ytype.length>0){
      this.data.ytype.forEach(v=>{
        ytype1 += (v + ",")
      })
      ytype1=ytype1.substr(0,ytype1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.ytype = ytype1
    qt.card=this.data.card
    qt.env=this.data.env

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
          console.log(this.data.ytype)
          this.setData({
            ytype_items: positionStr.check_position(this.data.ytype_items, this.data.ytype),
            // ytype:this.data.ntype==''?'':this.data.ytype.split(",")
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