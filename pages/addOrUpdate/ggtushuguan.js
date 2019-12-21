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
    RgeType:'',//登记注册类型
    RgeType_items: [//登记注册类型列表
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
      {name:'事业单位', checked:false},
      {name:'外商投资企业', checked:false}
    ],
    isChildren:'',//是否少儿图书馆
    isChildren_items: ['是', '否'],//是否少儿图书馆列表
    isChildren_index:0,
    level:'',//评估定级情况
    level_items: ['一级馆', '二级馆','三级馆','无等级馆'],//评估定级情况列表
    level_index:0,
    Practitioners:'',//从业人员
    CollectionSum:'',//总藏量
    BookSum:'',//图书总藏量
    AncientSum:'',//古籍总藏量
    PressSum:'',//报刊总数
    AVSum:'',//视听文献总藏量
    MicroSum:'',//缩微制品总藏量 
    OtherSum:'',//其他藏品总量
    OpenSum:'',//总藏量中开架书刊量
    ChilderSum:'',//总藏量中少儿文献
    EbookSum:'',//电子图书
    TotalLength:'',//书架单层总长度
    TRegSum:'',//有效注册用户数
    RegSum:'',//注册用户总数
    ComputerSum:'',//计算机台数
    SeatsSum:'',//阅览室坐席数
    TeamsSum:'',//志愿者服务队伍数
    PeopleSum:'',//志愿者服务队人数
    CarSum:'',//流动图书车数
    BranchSum:'',//分馆数量
    isFreeWifi:'',//是否免费WIFI
    isFreeWifi_items: ['是', '否'],//是否免费WIFI列表
    isFreeWifi_index:0,
    isNObstacle:'',//是否无障碍设施
    isNObstacle_items: ['是', '否'],//是否无障碍设施
    isNObstacle_index:0,
    safe:'',//安全检查设备
    OpenDay:'',//每周开放天数
    DigitalRes:'',//数字资源总量（存储量）
    YDigitalRes:'',//数字资源元数据总量
    KDigitalRes:'',//数字资源库数量
    TeDigitalRes:'',//自建特色数字资源总量（存储量）
    TeYDigitalRes:'',//自建特色数字资源元数据总量
    TeKDigitalRes:'',//自建特色数字资源库数量
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
    var RgeType1="";
    if (this.data.RgeType.length>0){
      this.data.RgeType.forEach(v=>{
        RgeType1 += (v + ",")
      })
      RgeType1=RgeType1.substr(0,RgeType1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.RgeType = RgeType1
    qt.isChildren = this.data.isChildren_items[this.data.isChildren_index],
    qt.level = this.data.level_items[this.data.level_index],
    qt.isFreeWifi = this.data.isFreeWifi_items[this.data.isFreeWifi_index],
    qt.isNObstacle = this.data.isNObstacle_items[this.data.isNObstacle_index],
    qt.Practitioners=this.data.Practitioners
    qt.CollectionSum=this.data.CollectionSum
    qt.BookSum=this.data.BookSum
    qt.AncientSum=this.data.AncientSum
    qt.PressSum=this.data.PressSum
    qt.AVSum=this.data.AVSum
    qt.MicroSum=this.data.MicroSum
    qt.OtherSum=this.data.OtherSum
    qt.OpenSum=this.data.OpenSum
    qt.ChilderSum=this.data.ChilderSum
    qt.EbookSum=this.data.EbookSum
    qt.TotalLength=this.data.TotalLength
    qt.TRegSum=this.data.TRegSum
    qt.RegSum=this.data.RegSum
    qt.ComputerSum=this.data.ComputerSum
    qt.SeatsSum=this.data.SeatsSum
    qt.TeamsSum=this.data.TeamsSum
    qt.PeopleSum=this.data.PeopleSum
    qt.CarSum=this.data.CarSum
    qt.BranchSum=this.data.BranchSum
    qt.safe=this.data.safe
    qt.OpenDay=this.data.OpenDay
    qt.DigitalRes=this.data.DigitalRes
    qt.YDigitalRes=this.data.YDigitalRes
    qt.KDigitalRes=this.data.KDigitalRes
    qt.TeDigitalRes=this.data.TeDigitalRes
    qt.TeYDigitalRes=this.data.TeYDigitalRes
    qt.TeKDigitalRes=this.data.TeKDigitalRes

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
            RgeType_items: positionStr.check_position(this.data.RgeType_items, this.data.RgeType),
            isChildren_index: positionStr.radio_position(this.data.isChildren_items, this.data.isChildren),
            level_index: positionStr.radio_position(this.data.level_items, this.data.level),
            isFreeWifi_index: positionStr.radio_position(this.data.isFreeWifi_items, this.data.isFreeWifi),
            isNObstacle_index: positionStr.radio_position(this.data.isNObstacle_items, this.data.isNObstacle)
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