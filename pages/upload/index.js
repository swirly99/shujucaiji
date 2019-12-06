// pages/upload/index.js
import { GetData } from "../../utils/GetData.js"
const getData = new GetData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list:[
      { ctgId: 47, name: "非遗传承人", code: "fyccr" },
      { ctgId: 46, name: "文化产业示范（试验）园区和示范基地", code: "wenhuashifan" },
      { ctgId: 45, name: "动漫企业", code: "dongmanqiye" },
      { ctgId: 44, name: "文物拍卖企业", code: "wenwupaimai" },
      { ctgId: 43, name: "非物质文化遗产展示场所（馆）", code: "feiwuzhichangsuo" },
      { ctgId: 42, name: "非物质文化遗产保护中心", code: "feiwuzhiwenhua" },
      { ctgId: 41, name: "其他文物企业", code: "qitawenwu" },
      { ctgId: 40, name: "文物商店", code: "wenwushangdian" },
      { ctgId: 39, name: "文物保护科研机构", code: "wenwubaohukeyan" },
      { ctgId: 38, name: "博物馆（纪念馆）", code: "bowuguan" },
      { ctgId: 37, name: "文物保护管理机构", code: "wenwubaohuguanli" },
      { ctgId: 36, name: "文物行政主管部门", code: "wenwuxingzheng" },
      { ctgId: 35, name: "文化市场综合执法机构", code: "wenhuashichang" },
      { ctgId: 34, name: "文化行政主管部门", code: "wenhuaxingzheng" },
      { ctgId: 33, name: "文化艺术科研机构", code: "wenhuayishu" },
      { ctgId: 32, name: "艺术展览创作机构", code: "yishuzhanlan" },
      { ctgId: 31, name: "演出经纪机构", code: "yanchujingji" },
      { ctgId: 30, name: "艺术品经营机构", code: "yishupin" },
      { ctgId: 29, name: "经营性互联网文化单位", code: "hulianwang" },
      { ctgId: 28, name: "非公有制艺术表演场馆", code: "fbycg" },
      { ctgId: 27, name: "非公有制艺术表演团体", code: "fbytt" },
      { ctgId: 26, name: "互联网上网服务营业场所（网吧）", code: "wangba" },
      { ctgId: 25, name: "娱乐场所", code: "yulechangsuo" },
      { ctgId: 24, name: "文化部门教育机构", code: "whbmjyjg" },
      { ctgId: 23, name: "文化站", code: "wenhuazhan" },
      { ctgId: 22, name: "文化馆", code: "wenhuaguan" },
      { ctgId: 21, name: "公共图书馆", code: "ggtushuguan" },
      { ctgId: 20, name: "公有制艺术表演场馆（企业）", code: "bycgqy" },
      { ctgId: 19, name: "公有制艺术表演场馆（事业）", code: "bycgsy" },
      { ctgId: 18, name: "公有制艺术表演团体（企业）", code: "byttqy" },
      { ctgId: 17, name: "公有制艺术表演团体（事业）", code: "bytisy" },
      { ctgId: 16, name: "风情小镇", code: "fengqingxiaozhen" },
      { ctgId: 15, name: "旅游产业融合企业", code: "lycyrhqy" },
      { ctgId: 14, name: "人文设施", code: "renwensheshi" },
      { ctgId: 13, name: "停车场", code: "tingchechang" },
      { ctgId: 12, name: "红色旅游", code: "hongselvyou" },
      { ctgId: 11, name: "乡村", code: "xiangcun" },
      { ctgId: 10, name: "导游", code: "daoyou" },
      { ctgId: 9, name: "公共设施", code: "gonggongsheshi" },
      { ctgId: 8, name: "厕所", code: "cesuo" },
      { ctgId: 7, name: "娱乐场", code: "yulechang" },
      { ctgId: 6, name: "购物场所", code: "gouwuchangsuo" },
      { ctgId: 5, name: "农家乐", code: "nongjiale" },
      { ctgId: 4, name: "特色餐饮", code: "tesecanyin" },
      { ctgId: 3, name: "旅行社", code: "lvxingshe" },
      { ctgId: 2, name: "住宿", code: "zhusu" },
      { ctgId: 1, name: "景区", code: "jingqu" }
    ],
    sousuo_data:'',
    page_width:0,
  },

  input_sousuo:function(e){
    this.setData({
      sousuo_data:e.detail.value
    })
  },

  goList:function(e){
    wx.navigateTo({
      url: "list?data=" + JSON.stringify(this.data.type_list[e.currentTarget.dataset.index])
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '类型列表'
    })
    this.setData({
      page_width : wx.getSystemInfoSync().windowWidth
    })
    if (app.globalData.key==''){
      wx.redirectTo({
        url: '../login/index'
      })
    }else{
      // getData.req("collection/ctg_lsit.jspx", "POST", { key: app.globalData.key}, res => {
      //   if (res.data.status==200){
      //     this.setData({
      //       type_list: res.data.data
      //     })
      //   }
      // })
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