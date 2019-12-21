// pages/addOrUpdate/gouwuchangsuo.js
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
    ftype:'',//服务类型
    ftype_items: [//服务类型列表
      {name:'综合商场', checked:false},
      {name:'超市/便利店', checked:false},
      {name:'药店', checked:false},
      {name:'花店', checked:false},
      {name:'书店', checked:false},
      {name:'水果生鲜', checked:false},
      {name:'亲子购物', checked:false},
      {name:'服饰鞋包', checked:false},
      {name:'珠宝饰品', checked:false},
      {name:'运动户外', checked:false},
      {name:'化妆品', checked:false},
      {name:'眼镜店', checked:false},
      {name:'数码产品', checked:false},
      {name:'家居建材', checked:false},
      {name:'食品茶酒', checked:false},
      {name:'办公用品', checked:false},
      {name:'其他', checked:false}
    ],
    SpeFood:'',//特色食物
    ExternalEnv:'',//外部环境
    space:'',//面积
    OffRec:'',//官方推荐
    OffRec_items: ['是', '否'],
    OffRec_index:0,
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
  submit:function(){
    //下拉框数据处理
    var ftype1="";
    if (this.data.ftype.length>0){
      this.data.ftype.forEach(v=>{
        ftype1 += (v + ",")
      })
      ftype1=ftype1.substr(0,ftype1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.ftype = ftype1
    qt.SpeFood=this.data.SpeFood
    qt.ExternalEnv=this.data.ExternalEnv
    qt.space=this.data.space
    qt.OffRec = this.data.OffRec_items[this.data.OffRec_index]
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
            ftype_items: positionStr.check_position(this.data.ftype_items, this.data.ftype),
            OffRec_index: positionStr.radio_position(this.data.OffRec_items, this.data.OffRec),
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