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
    RegType:'',//登记注册类型
    RegType_items: [//登记注册类型列表
      {name:'内资企业', checked:false},
      {name:'国有企业', checked:false},
      {name:'集体企业', checked:false},
      {name:'股份合作', checked:false},
      {name:'联营企业', checked:false},
      {name:'有限责任公司', checked:false},
      {name:'股份有限公司', checked:false},
      {name:'私营企业', checked:false},
      {name:'其他企业', checked:false},
      {name:'港澳台投资企业', checked:false},
      {name:'外商投资企业', checked:false}
    ],
    subjection:'',//隶属
    subjection_items: [//隶属列表
      {name:'独立核算', checked:false},
      {name:'当地政府', checked:false},
      {name:'上级文化部门', checked:false},
      {name:'其他', checked:false}
    ],
    year:'',//主体建成年份
    Practitioners:'',//从业人员
    Professional:'',//专职人员
    Editor:'',//在编人员
    technical:'',//专业技术人才
    book:'',//藏书
    computer:'',//计算机
    area:'',// 实际使用房屋建筑面积
    TeamsSum:'',// 志愿者服务队伍数
    PeopleSum:'',// 自愿者服务队伍人数
    SServiceCentre:'',// 辖区内社区综合文化服务中心
    SServiceCentreArea:'',// 辖区内社区综合文化服务中心面积
    CServiceCentre:'',// 辖区内村综合文化服务中心
    CServiceCentreArea:'',// 辖区内村综合文化服务中心面积
    ownership:'',// 产权归属
    LibraryCard:'',// 发放借书证数
    seat:'',// 阅览座位数

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
    var RegType1="";
    if (this.data.RegType.length>0){
      this.data.RegType.forEach(v=>{
        RegType1 += (v + ",")
      })
      RegType1=RegType1.substr(0,RegType1.length-1)
    }
    var subjection1="";
    if (this.data.subjection.length>0){
      this.data.subjection.forEach(v=>{
        subjection1 += (v + ",")
      })
      subjection1=subjection1.substr(0,subjection1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.RegType = RegType1
    qt.subjection = subjection1
    qt.year=this.data.year
    qt.Practitioners=this.data.Practitioners
    qt.Professional=this.data.Professional
    qt.Editor=this.data.Editor
    qt.technical=this.data.technical
    qt.book=this.data.book
    qt.computer=this.data.computer
    qt.area=this.data.area
    qt.TeamsSum=this.data.TeamsSum
    qt.PeopleSum=this.data.PeopleSum
    qt.SServiceCentre=this.data.SServiceCentre
    qt.SServiceCentreArea=this.data.SServiceCentreArea
    qt.CServiceCentre=this.data.CServiceCentre
    qt.CServiceCentreArea=this.data.CServiceCentreArea
    qt.ownership=this.data.ownership
    qt.LibraryCard=this.data.LibraryCard
    qt.seat=this.data.seat
    
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
            RegType_items: positionStr.check_position(this.data.RegType_items, this.data.RegType),
            subjection_items: positionStr.check_position(this.data.subjection_items, this.data.subjection)
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