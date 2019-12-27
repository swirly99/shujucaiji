// pages/upload/basics.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctgId: '',//所属类
    imgs:[],
    imgs_arr:[],

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
    typeImg: '',// 图标
    longImg: '',// 标识图片
    email:'',// 联系方式：传真、网址、邮箱、QQ、微 博、微信、微应用等
    phone:'',// 电话
    openTime: '',// 营业时间
    price:0.0, // 均价
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
    parkNum: 0,//停车场数量
    telephone: '',//咨询和投诉电话
    openHours: '',//营业时间

    //以上为基础数据值
    status_item: [
      { name: '营业', checked: true },
      { name: '停业', checked: false }
    ],
    b_width: 340,
    view_index:0,
    region: ['浙江省', '杭州市', '萧山区'],
    file_url:null,
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
    this.para.key = app.globalData.key
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
    this.para.typeImg = that.typeImg
    this.para.longImg = that.longImg
    this.para.email=that.email
    this.para.phone=that.phone
    this.para.openTime=that.openTime
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
    this.para.parkNum = that.parkNum
    this.para.telephone = that.telephone
    this.para.openHours = that.openHours
    this.para.entity = this.entity
    this.para.id = that.waresId
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

  //图片上传
  upload_img:function(e){
    var msg =null
    wx.chooseImage({
      count: e.currentTarget.dataset.count, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showLoading({
          mask: true,
          title: '文件上传中...',
        })
        //上传到服务器
        if (e.currentTarget.dataset.id=="imgs"){
          res.tempFilePaths.forEach(v => {
            getData.upload_img(v, suc => {
              msg = JSON.parse(suc.data)
              this.data.imgs.push(msg.url)
              if (this.data.imgs.length >= res.tempFilePaths.length) {
                wx.hideLoading()
                this.setData({
                  imgs: this.data.imgs
                })
                this.finishing_imgs();
              }
            }, fail => {
              wx.hideLoading();
              wx.showToast({
                title: "第"+(this.data.imgs.length+1)+"张文件上传失败",
                icon: 'none',
                duration: 2000
              })
            })
          })
        }else{
          getData.upload_img(res.tempFilePaths[0], res => {
            msg = JSON.parse(res.data)
            this.setData({
              [e.currentTarget.dataset.id]: msg.url
            })
            wx.hideLoading()
          }, fail => {
            wx.hideLoading();
            wx.showToast({
              title: '文件上传失败',
              icon: 'none',
              duration: 2000
            })
          })
        }
      }
    })
  },
  //删除图片
  delete_img:function(e){
    if (e.currentTarget.dataset.id =="imgs"){
      this.data.imgs.splice(e.currentTarget.dataset.index, 1);
      this.setData({
        imgs: this.data.imgs
      })
    }else{
      this.setData({
        [e.currentTarget.dataset.id]: '',
      })
    }
  },
  finishing_imgs:function(){
    var arr= []
    this.data.imgs.forEach(v=>{
      arr.push(this.data.file_url+v)
    })
    this.setData({
      imgs_arr: arr
    })
  },
  //游览图片
  show_img:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.src_list // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.entity = JSON.parse(options.data)
    var that = this
    this.setData({
      file_url: app.globalData.file_url
    })

    wx.setNavigationBarTitle({
      title: "添加（" + this.entity.name + "_基础)"
    })

    if (that.entity.wid==null){//添加
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
            ctgId: this.entity.ctgId
          })
        }
      })
      var t = new Date();
      this.setData({
        openTime: t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate(),
      })
    }else{//修改
      getData.req("collection/ctg_wares.jspx", "POST", { key: app.globalData.key, id: that.entity.wid}, res => {
        if (res.data.status == 200) {
          this.setData(res.data.data)
          this.data.status_item.forEach(v => {
            v.checked = (v.name == this.data.status) ? true : false
          })
          var imgs_arr=[];
          this.data.imgs.forEach(v=>{
            imgs_arr.push(v.imgPath)
          })

          this.data.region = [this.data.province, this.data.city, this.data.country]
          this.data.region
          this.setData({
            status_item: this.data.status_item,
            region: this.region,
            // this.data.region = [this.data.province, this.data.city, this.data.country]
            imgs: imgs_arr
          })
          this.finishing_imgs();
        }
      })
    }
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