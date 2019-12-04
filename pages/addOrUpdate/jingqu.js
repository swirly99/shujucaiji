// pages/upload/addOrUpdate.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctgId:'',//所属类
    key: '',//登录的key
    name: '',//景区名称
    userName: '',//vip用户名
    yyzt: '营业',//营业状态（单选）————营业、停业
    zzjg: '',//组织机构代码
    xzqh: '',//行政区划
    address: '',//景区所在地址
    longitude: '',//经度
    latitude: '',//纬度
    phone: '',//服务电话
    level: 0,//景区等级（A）
    jqlx: '',//景区类型
    yyyf: '',//宜游月份(复选框——1至12月都)
    kfsj: '',//开放时间（时间选择）
    price: 0.0,//门票价格
    yyzzbh: '',//营业执照编号
    tyshxy: '',//统一社会信用代码
    pjjg: 0.0,//平均价格
    jdxx: '',//景点信息
    tjdldj: '高速公路',//通景道路等级（下拉框）
    jtlx: '',//交通路线
    wxts: '',//温馨提示
    ssczl: 0,//瞬时承载量（整型）
    tcwsl: 0,//停车位数量（整型）
    xdsjhm: '',//向导手机号码
    fzr: '',//负责人
    vrdz: '',//VR 地址
    jqch: '',//景区称号
    jqss: '',//景区设施
    yb: '',//邮编
    lxfs: '',//联系方式
    xljy: '',//线路建议
    jjy: '',//讲解员
    yjjydh: '',//应急救援电话
    yhzc: '',//优惠政策
    zxtsdh: '',//咨询和投诉电话（整型）
    longImg: [""],//标识图片(图片上传)
    typeImg: [""],//景区图片(图片上传)
    imgs:[],
    jqdm: '',//景区大门
    jqssd: '',//景区舒适度
    mediaPath: '',//景区微视频
    description: '',//景区详情(textarea)
    ssd: '',//舒适度（舒适度）
    sxrs: 0,//舒适度（上线人数）
    xxrs: 0,//舒适度（下线人数）

    yyzt_item:[
      { name: '营业', checked: true},
      { name: '停业', checked: false}
    ],
    tjdldj_item:["高速公路", "一级公路", "二级公路", "三级公路","四级公路"],
    tjdldj_index:0,
    view_index:0,//weiper下表
    
    b_width:170,
    month_items:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    month_values:[],
    is_null_arr: [
      { "zd": "name", "mc": "景区名称", "view_index":0 , is:false},
      { "zd": "userName", "mc": "用户名", "view_index": 0, is: false},
    ],//需要验证的字段(以wxml中的dta-id为准)
  },
  entity:null,



  //滑动swiper，控制swiper页码
  change_swiper:function(e){
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
  up_view:function(){
    this.setData({
      view_index:this.data.view_index-1
    })
  },
  //普通文本框赋值
  input_value:function(e){
    this.data.is_null_arr.forEach(v=>{
      if (v.zd == e.currentTarget.dataset.id){
        if (e.detail.value==""){
          v.is = false
        }else{
          v.is = true
        }
      }
    })
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
      is_null_arr: this.data.is_null_arr
    })
    
  },
  //普通下拉框赋值
  change_picker:function(e){
    this.setData({
      [e.currentTarget.dataset.id]: this.data.tjdldj_item[e.detail.value]
    })
  },
  //复选框初步赋值（真正赋值是提交前一步动作）
  check_box:function(e){
    this.setData({
      month_values:[]
    })
    e.detail.value.forEach(v=>{
      this.data.month_values.push(parseInt(v))
    })
    this.data.month_values = this.sort(this.data.month_values)
    this.setData({
      month_values: this.data.month_values
    })
  },
  //冒泡排序
  sort:function(arr){
    for (var j = 0; j < arr.length - 1; j++) {
      //两两比较，如果前一个比后一个大，则交换位置。
      for (var i = 0; i < arr.length - 1 - j; i++) {
        if (arr[i] > arr[i + 1]) {
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr
  },

  //验证该输入的是否全部输入
  is_null:function(){
    var is=true
    for (var i = 0; i < this.data.is_null_arr.length;i++){
      if (!this.data.is_null_arr[i].is) {
        is = false
        wx.showToast({
          title: this.data.is_null_arr[i].mc + '不能为空',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          view_index:this.data.is_null_arr[i].view_index
        })
        break
      }
    }
    return is
  },

  submit:function(){
    if (this.is_null()){
      this.data.jqssd = "舒适度：" + (this.data.ssd == '' ? '无' : this.data.ssd)+"，上限人数："+this.data.sxrs+"，下线人数："+this.data.xxrs
      var months=""
      this.data.month_values.forEach(v=>{
        months += this.data.month_items[v]+",";
      })
      if (months.length>0){
        months = months.substr(0,months.length-1)
      }
      this.setData({
        yyyf: months,
        jqssd: this.data.jqssd
      })
      getData.req("collection/ctg_sava.jspx", "POST", this.data, res => {
        console.log(res)
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.entity = JSON.parse(options.data)
    wx.setNavigationBarTitle({
      title: "添加（"+this.entity.name+")"
    })
    wx.getLocation({
      type: 'wgs84',// 参考系
      success: res=> {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          key: app.globalData.key,
          ctgId: this.entity.ctgId
        })
      }
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