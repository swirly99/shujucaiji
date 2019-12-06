// pages/upload/basics.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',//登录的key
    ctgId: '',//所属类
    imgs:['111'],

    name:'',// 名称
    userName:'',// 用户
    status:'营业',// 营业状态：营业中、已停业
    area:'',// 行政区划
    address:'',// 地址
    longitude:'',// (默认百度)经度
    latitude:'',// (默认百度)纬度
    worldLongitude:'',// (天地)经度
    worldLatitude:'',// (天地)纬度
    tencentLongitude:'',// (腾讯)经度
    tencentLatitude:'',// (腾讯)纬度
    description:'',// 简介
    typeImg: '111',// 图标
    longImg: '111',// 标识图片
    email:'',// 联系方式：传真、网址、邮箱、QQ、微 博、微信、微应用等
    phone:'',// 电话
    openTime: '',// 营业时间
    price:'', // 均价
    institution:'',// 组织机构代码
    trafficLine:'',// 交通路线
    environment:'',// 环境状况
    zipCode:'',// 邮编
    businessLicense:'',// 营业执照编号
    unifiedCode :'',// 统一社会信用代码
    province:'浙江省',// 省
    city:'杭州市',// 市
    country: '萧山区',// 区
    parkInfo:'',// 停车位信息
    capacity:'',// 可容纳人数
    website:'',// 网站域名
    headName:'',// 负责人姓名
    headPhone:'',// 负责人电话

    //以上为基础数据值
    status_item: [
      { name: '营业', checked: true },
      { name: '停业', checked: false }
    ],
    b_width: 340,
    view_index:0,
    region: ['浙江省', '杭州市', '萧山区'],
  },
  entity:null,
  //坐标计算需要
  PI: 3.1415926535897932384626,
  para: null,//传过去的参数整理

  

  //普通文本框(下拉框)赋值
  input_value: function (e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value,
    })
    console.log(e.detail.value)
  },
  //普通文本框失去焦点验证
  input_blur: function (e) {
    if (e.detail.value == "") {
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
  
  //特殊选择框————地址
  select_address:function(e){
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],// 省
      city: e.detail.value[1],// 市
      country: e.detail.value[2],// 区
    })
  },

  //参数整理
  finishing_para:function(){
    var that=this.data
    this.para=new Object()
    this.para.key=that.key
    this.para.ctgId=that.ctgId
    this.para.name=that.name
    this.para.userName=that.userName
    this.para.status=that.status
    this.para.area=that.area
    this.para.address=that.address
    this.para.longitude=that.longitude
    this.para.latitude=that.latitude
    this.para.worldLongitude=that.worldLongitude
    this.para.worldLatitude=that.worldLatitude
    this.para.tencentLongitude=that.tencentLongitude
    this.para.tencentLatitude=that.tencentLatitude
    this.para.description=that.description
    this.para.typeImg=that.typeImg
    this.para.longImg=that.longImg
    this.para.email=that.email
    this.para.phone=that.phone
    this.para.openTime=that.openTime+" 00:00:00"
    this.para.price=that.price
    this.para.institution=that.institution
    this.para.trafficLine=that.trafficLine
    this.para.environment=that.environment
    this.para.zipCode=that.zipCode
    this.para.businessLicense=that.businessLicense
    this.para.unifiedCode=that.unifiedCode
    this.para.province=that.province
    this.para.city=that.city
    this.para.country=that.country
    this.para.parkInfo=that.parkInfo
    this.para.capacity=that.capacity
    this.para.website=that.website
    this.para.headName=that.headName
    this.para.headPhone=that.headPhone
    this.para.imgs = that.imgs
    this.para.entity = this.entity
  },

  next:function(){
    if (this.data.name==''){
      wx.showToast({
        title: '请输入名称',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        view_index:0
      })
      return
    }
    if (this.data.userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        view_index: 0
      })
      return
    }
    this.finishing_para()
    wx.navigateTo({
      url: "../addOrUpdate/" + this.entity.code + "?data=" + encodeURIComponent(JSON.stringify(this.para))
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.entity = JSON.parse(options.data)
    wx.setNavigationBarTitle({
      title: "添加（" + this.entity.name + "_基础)"
    })

    wx.getLocation({
      type: 'wgs84',// 参考系
      success: res => {
        var lat = res.latitude
        var lng = res.longitude

        var ssws = that.wgs84togcj02(lng, lat)
        ssws = that.gcj02tobd09(ssws[0], ssws[1])
        //解决定位偏移
        var ssssss1 = ssws[1] - 0.000160
        var ssssss2 = ssws[0] - 0.000160

        this.setData({
          longitude: ssssss2.toFixed(6),
          latitude: ssssss1.toFixed(6),
          key: app.globalData.key,
          ctgId: this.entity.ctgId
        })
      }
    })

    var t = new Date();
    this.setData({
      openTime: t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate()
    })
  },

  /**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
  wgs84togcj02: function (lng, lat) {
    var that = this

    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    if (that.out_of_china(lng, lat)) {
      return [lng, lat]
    }
    else {
      var dlat = that.transformlat(lng - 105.0, lat - 35.0);
      var dlng = that.transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [mglng, mglat]
    }
  },
  /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
  gcj02tobd09: function (lng, lat) {
    var that = this
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
  },
  /**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
  out_of_china:function(lng, lat) {
    return(lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
  },
  transformlat:function(lng, lat) {
    var that=this
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * that.PI) + 20.0 * Math.sin(2.0 * lng * that.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * that.PI) + 40.0 * Math.sin(lat / 3.0 * that.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * that.PI) + 320 * Math.sin(lat * that.PI / 30.0)) * 2.0 / 3.0;
    return ret
  },

  transformlng:function(lng, lat) {
    var that = this
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * that.PI) + 20.0 * Math.sin(2.0 * lng * that.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * that.PI) + 40.0 * Math.sin(lng / 3.0 * that.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * that.PI) + 300.0 * Math.sin(lng / 30.0 * that.PI)) * 2.0 / 3.0;
    return ret
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