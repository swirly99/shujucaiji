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
    iDnumber: '',// 身份证号
    inheritor: '',// 传承人姓名
    region: ['浙江省','杭州市', '萧山区'],// 地区名称
    province: '浙江省',// 省
    city: '杭州市',// 市
    country: '萧山区',// 区
    sex:'',// 性别
    sex_items: ['男', '女', '其他'],
    sex_index: 0,
    nation:'',// 民族
    birth: '',// 出生年月
    education:'',// 学历
    occupation: '',// 职业
    worlkUnit: '',// 工作单位
    jobTitle: '',// 职称职务
    entry: '', // 项目名称
    declaration: '',// 申报单位
    project: '',// 项目类别
    telephone: '',// 联系电话
    address: '',// 通讯地址
    declare: '',// 申报时间
    publish: '',// 公布时间
    resume: '',// 个人简历
    honor: '',// 个人荣誉 
    b_width: 340,
    view_index: 0,
    
  },
  jc: null,
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
  //特殊选择框————地址
  select_address: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],// 省
      city: e.detail.value[1],// 市
      country: e.detail.value[2],// 区
    })
  },
  submit: function () {
    //数据存放到jc
    var qt = new Object()
    qt.iDnumber = this.data.iDnumber
    qt.inheritor = this.data.inheritor
    qt.province = this.data.province
    qt.city = this.data.city
    qt.country = this.data.country
    qt.sex = this.data.sex_items[this.data.sex_index]
    qt.nation = this.data.nation
    qt.birth = this.data.birth
    qt.education = this.data.education
    qt.occupation = this.data.occupation
    qt.worlkUnit = this.data.worlkUnit
    qt.jobTitle = this.data.jobTitle
    qt.entry = this.data.entry
    qt.declaration = this.data.declaration
    qt.project = this.data.project
    qt.telephone = this.data.telephone
    qt.address = this.data.address
    qt.declare = this.data.declare
    qt.publish = this.data.publish
    qt.resume = this.data.resume
    qt.honor = this.data.honor
    

    var para = this.jc
    para.attr = qt
    para.key=app.globalData.key
    para.imgs=[]
    para.openTime="2019-09-09"
    para.name = this.data.inheritor
    para.id = this.jc.wid
    
    saveOrUpdate.post_data(para,null,1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jc = JSON.parse(options.jc)
    console.log(this.jc,5)
    wx.setNavigationBarTitle({
      title: "添加（" + this.jc.name + "_基础)"
    })

    if (this.jc.wid == null) {//添加
      // console.log(this.jc.id,'=null')
      wx.getLocation({
        type: 'wgs84',// 参考系
        success: res => {
          var lat = res.latitude
          var lng = res.longitude

          // var ssws = that.wgs84togcj02(lng, lat)
          // ssws = that.gcj02tobd09(ssws[0], ssws[1])
          //解决定位偏移
          // var ssssss1 = ssws[1] - 0.000160
          // var ssssss2 = ssws[0] - 0.000160

          this.setData({
            // longitude: ssssss2.toFixed(6),
            // latitude: ssssss1.toFixed(6),
            wid: this.jc.wid
          })
        }
      })
    // } else {//修改
    //   console.log('修改',this.jc.wid)
    //   getData.req("collection/ctg_wares.jspx", "POST", { key: app.globalData.key, id: this.jc.wid }, res => {
    //     if (res.data.status == 200) {
    //       this.setData(res.data.data)
    //       this.data.region = [this.data.province, this.data.city, this.data.country]
    //       this.setData({
    //         region: this.data.region
    //       })
    //     }
    //   })
    }
    if (this.jc.wid !=null) {
      console.log(this.jc.wid,'!=null')
      getData.req("collection/ctg_wares.jspx", "POST", { key: app.globalData.key, id: this.jc.wid }, res => {
        if (res.data.status == 200) {
          this.setData(res.data.data)
          this.data.region = [this.data.province, this.data.city, this.data.country]
          this.setData({
            region: this.data.region,
            sex_index: positionStr.radio_position(this.data.sex_items, this.data.sex)
          })
        }
      })
      
    }
  },
  // wgs84togcj02: function (lng, lat) {
  //   var that = this

  //   var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
  //   var PI = 3.1415926535897932384626;
  //   var a = 6378245.0;
  //   var ee = 0.00669342162296594323;
  //   if (that.out_of_china(lng, lat)) {
  //     return [lng, lat]
  //   }
  //   else {
  //     var dlat = that.transformlat(lng - 105.0, lat - 35.0);
  //     var dlng = that.transformlng(lng - 105.0, lat - 35.0);
  //     var radlat = lat / 180.0 * PI;
  //     var magic = Math.sin(radlat);
  //     magic = 1 - ee * magic * magic;
  //     var sqrtmagic = Math.sqrt(magic);
  //     dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
  //     dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
  //     var mglat = lat + dlat;
  //     var mglng = lng + dlng;
  //     return [mglng, mglat]
  //   }
  // },
  /**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
*/
  // out_of_china: function (lng, lat) {
  //   return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
  // },
  // transformlat: function (lng, lat) {
  //   var that = this
  //   var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  //   ret += (20.0 * Math.sin(6.0 * lng * that.PI) + 20.0 * Math.sin(2.0 * lng * that.PI)) * 2.0 / 3.0;
  //   ret += (20.0 * Math.sin(lat * that.PI) + 40.0 * Math.sin(lat / 3.0 * that.PI)) * 2.0 / 3.0;
  //   ret += (160.0 * Math.sin(lat / 12.0 * that.PI) + 320 * Math.sin(lat * that.PI / 30.0)) * 2.0 / 3.0;
  //   return ret
  // },
  // transformlng: function (lng, lat) {
  //   var that = this
  //   var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  //   ret += (20.0 * Math.sin(6.0 * lng * that.PI) + 20.0 * Math.sin(2.0 * lng * that.PI)) * 2.0 / 3.0;
  //   ret += (20.0 * Math.sin(lng * that.PI) + 40.0 * Math.sin(lng / 3.0 * that.PI)) * 2.0 / 3.0;
  //   ret += (150.0 * Math.sin(lng / 12.0 * that.PI) + 300.0 * Math.sin(lng / 30.0 * that.PI)) * 2.0 / 3.0;
  //   return ret
  // },
  /**
       * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
       * 即谷歌、高德 转 百度
       * @param lng
       * @param lat
       * @returns {*[]}
       */
  // gcj02tobd09: function (lng, lat) {
  //   var that = this
  //   var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
  //   var PI = 3.1415926535897932384626;
  //   var a = 6378245.0;
  //   var ee = 0.00669342162296594323;
  //   var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
  //   var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
  //   var bd_lng = z * Math.cos(theta) + 0.0065;
  //   var bd_lat = z * Math.sin(theta) + 0.006;
  //   return [bd_lng, bd_lat]
  // },

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