// pages/upload/index.js
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
    dj:'',//等级(提交的时候需要整理)
    yyyf: '',//宜游月份
    mpjg: '',//门票价格
    zyjd: '',//景点信息
    tjdl: '',//通景道路等级(提交的时候需要整理)
    wxts:'',//温馨提示
    xdsj: '',//向导手机号码
    vr: '',//VR 地址
    jqch: '',//景区称号
    jqss: '',//景区设施
    lxjy: '',//线路建议
    jjy: '',//讲解员
    yjdh: '',//应急救援电话
    yhzc: '',//优惠政策
    jqdm: '',//景区大门
    jqssd: '',//景区舒适度
    lx:'',//类型


    dj_items: ['未定级别','AAAAA','AAAA','AAA','AA','A'],
    dj_index:0,
    tjdl_items: ['高速公路','一级公路','二级公路','三级公路','四级公路'],
    tjdl_index:0,
    lx_items: [
      {name:'山脉', checked:false},
      {name:'江河溪流', checked:false},
      {name:'湖泊', checked:false},
      {name:'泉水', checked:false},
      {name:'洞窟', checked:false},
      {name:'湿地', checked:false},
      {name:'温泉', checked:false},
      {name:'瀑布', checked:false},
      {name:'森林', checked:false},
      {name:'海滩', checked:false},
      {name:'海岛', checked:false},
      {name:'古迹', checked:false},
      {name:'古塔', checked:false},
      {name:'古镇', checked:false},
      {name:'故居', checked:false},
      {name:'园林', checked:false},
      {name:'寺庙', checked:false},
      {name:'博物馆', checked:false},
      {name:'纪念馆', checked:false},
      {name:'主题公园', checked:false},
      {name:'海洋馆', checked:false},
      {name:'动植物园', checked:false},
      {name:'农家乐园', checked:false},
      {name:'田园', checked:false},
      {name:'宗教', checked:false},
      {name:'民俗', checked:false},
      {name:'影视', checked:false},
      {name:'演艺', checked:false},
      {name:'室内', checked:false},
      {name:'赏花', checked:false},
      {name:'水上乐园', checked:false},
      {name:'采摘', checked:false},
      {name:'购物', checked:false},
      {name:'滑雪', checked:false},
      {name:'游船', checked:false},
      {name:'潜水', checked:false},
      {name:'城市观光', checked:false},
      {name:'摄影', checked:false},
      {name:'漂流', checked:false},
      {name:'红色旅游', checked:false},
      {name:'其他', checked:false}
    ],
    b_width: 340,
    view_index: 0,
  },
  jc:null,
  
  //(普通文本框 || 普通下拉框 || 时间下拉框 || 普通复选框)赋值
  input_value: function (e) {
    console.log(e.detail.value)
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
    })
  },
  //普通文本框失去焦点验证
  input_blur:function(e){
    if (e.detail.value==""){
      this.setData({
        [e.currentTarget.dataset.id]: 0,
      })
    }
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
    var lx1="";
    if (this.data.lx.length>0){
      this.data.lx.forEach(v=>{
        lx1 += (v + ",")
      })
      lx1=lx1.substr(0,lx1.length-1)
    }
    
    //数据存放到jc
    var qt=new Object();
    qt.tjdl = this.data.tjdl_items[this.data.tjdl_index],
    qt.dj = this.data.dj_items[this.data.dj_index],
    qt.lx = lx1
    qt.yyyf=this.data.yyyf
    qt.mpjg=this.data.mpjg
    qt.zyjd=this.data.zyjd
    qt.xdsj=this.data.xdsj
    qt.vr=this.data.vr
    qt.jqch=this.data.jqch
    qt.jqss=this.data.jqss
    qt.lxjy=this.data.lxjy
    qt.jjy=this.data.jjy
    qt.yjdh=this.data.yjdh
    qt.yhzc=this.data.yhzc
    qt.jqdm=this.data.jqdm
    qt.jqssd=this.data.jqssd
    qt.wxts = this.data.wxts

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
    if (this.jc.id!=null){
      getData.req("collection/ctg_wares.jspx", "POST", { key: app.globalData.key, id: this.jc.id }, res => {
        if (res.data.status == 200) {
          this.setData(res.data.data)
          console.log(this.data.lx)
          this.setData({
            dj_index: positionStr.radio_position(this.data.dj_items, this.data.dj),
            tjdl_index: positionStr.radio_position(this.data.tjdl_items, this.data.tjdl),
            lx_items: positionStr.check_position(this.data.lx_items, this.data.lx),
            lx:(this.data.lx=='')?(''):(this.data.lx.split(","))
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