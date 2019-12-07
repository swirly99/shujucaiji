// pages/upload/index.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dj:'',//等级(提交的时候需要整理)
    yyyf: '',//宜游月份
    kfsj: '',//开放时间
    mpjg: '',//门票价格
    zyjd: '',//景点信息
    tjdl: '',//通景道路等级(提交的时候需要整理)
    tcwsl: 0,//停车位数量
    wxts:'',//温馨提示
    xdsj: '',//向导手机号码
    vr: '',//VR 地址
    jqch: '',//景区称号
    jqss: '',//景区设施
    lxjy: '',//线路建议
    jjy: '',//讲解员
    yjdh: '',//应急救援电话
    yhzc: '',//优惠政策
    zxts: '',//咨询和投诉电话
    jqdm: '',//景区大门
    jqssd: '',//景区舒适度
    lx:'',//类型


    dj_items: ['未定级别','AAAAA','AAAA','AAA','AA','A'],
    dj_index:0,
    tjdl_items: ['高速公路','一级公路','二级公路','三级公路','四级公路'],
    tjdl_index:0,
    lx_items: ['山脉','江河溪流','湖泊','泉水','洞窟','湿地','温泉','瀑布','森林','海滩','海岛','古迹','古塔','古镇','故居','园林','寺庙','博物馆','纪念馆','主题公园','海洋馆','动植物园','农家乐园','田园','宗教',' 民俗','影视','演艺','室内',' 赏花','水上乐园','采摘','购物','滑雪','游船','潜水','城市观光','摄影','漂流','红色旅游','其他'],
    b_width: 340,
    view_index: 0,
  },
  jc:null,
  
  //(普通文本框 || 普通下拉框 || 时间下拉框 || 普通复选框)赋值
  input_value: function (e) {
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
    this.data.lx.forEach(v=>{
      lx1 += (v+",")
    })
    if(lx1.length>0){
      lx1=lx1.substr(0,lx1.length-1)
    }
    
    //数据存放到jc
    var qt=new Object();
    qt.tjdl = this.data.tjdl_items[this.data.tjdl_index],
    qt.dj = this.data.dj_items[this.data.dj_index],
    qt.lx = lx1
    qt.yyyf=this.data.yyyf
    qt.kfsj=this.data.kfsj
    qt.mpjg=this.data.mpjg
    qt.zyjd=this.data.zyjd
    qt.tcwsl=this.data.tcwsl
    qt.xdsj=this.data.xdsj
    qt.vr=this.data.vr
    qt.jqch=this.data.jqch
    qt.jqssd=this.data.jqssd
    qt.lxjy=this.data.lxjy
    qt.jjy=this.data.jjy
    qt.yjdh=this.data.yjdh
    qt.yhzc=this.data.yhzc
    qt.zxts=this.data.zxts
    qt.jqdm=this.data.jqdm
    qt.jqssd=this.data.jqssd
    qt.wxts = this.data.wxts

    var para = this.jc
    para.attr=qt

    getData.req("collection/ctg_sava.jspx", "POST", para, res => {
      if (res.data.status == 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000
        })
        wx.navigateBack({
          delta: 2
        })
      }else{
        wx.showToast({
          title: data.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jc = JSON.parse(decodeURIComponent(options.data))
    wx.setNavigationBarTitle({
      title: "添加（" + this.jc.entity.name + "_其他)"
    })
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