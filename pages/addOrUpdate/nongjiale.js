// pages/addOrUpdate/nongjiale.js
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
    ntype:'',//农家乐类型
    ntype_items: [//农家乐类型列表
      {name:'精品民宿', checked:false},
      {name:'基地', checked:false},
      {name:'园区', checked:false},
      {name:'乡村旅游', checked:false}
    ],
    level:'',//等级
    level_items: ['未定义级别'],
    level_index:0,
    star:'',//星级
    star_items: ['五星级', '四星级', '三星级', '二星级', '一星级'],//农家乐综合体星级
    star_index:0,
    SpecialService:'',//特色服务
    SpecialService_items:[//特色服务列表
      {name:'采摘', checked:false},
      {name:'垂钓', checked:false},
      {name:'棋牌', checked:false},
      {name:'住宿', checked:false},
      {name:'品茶', checked:false},
      {name:'球类', checked:false},
      {name:'种植', checked:false},
      {name:'摄影', checked:false},
      {name:'其他', checked:false}
    ],
    RoomSum:'',//房间总数
    BedSum:'',//床位总数
    AddService:'',//附加服务
    traffic:'',//交通
    RoomType:'',//房间类型
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
    var ntype1="";
    if (this.data.ntype.length>0){
      this.data.ntype.forEach(v=>{
        ntype1 += (v + ",")
      })
      ntype1=ntype1.substr(0,ntype1.length-1)
    }
    var SpecialService1="";
    if (this.data.SpecialService.length>0){
      this.data.SpecialService.forEach(v=>{
        SpecialService1 += (v + ",")
      })
      SpecialService1=SpecialService1.substr(0,SpecialService1.length-1)
    }
    
    //数据存放到jc
    var qt=new Object();
    qt.star = this.data.star_items[this.data.star_index],
    qt.level = this.data.level_items[this.data.level_index],
    qt.ntype = ntype1
    qt.SpecialService = SpecialService1
    qt.RoomSum=this.data.RoomSum
    qt.BedSum=this.data.BedSum
    qt.AddService=this.data.AddService
    qt.traffic=this.data.traffic
    qt.RoomType=this.data.RoomType

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
            ntype_items: positionStr.check_position(this.data.ntype_items, this.data.ntype),
            ntype:this.data.ntype==''?'':this.data.ntype.split(","),
            SpecialService_items: positionStr.check_position(this.data.SpecialService_items, this.data.SpecialService),
            SpecialService:this.data.SpecialService==''?'':this.data.SpecialService.split(","),
            star_index: positionStr.radio_position(this.data.star_items, this.data.star),
            level_index: positionStr.radio_position(this.data.level_items, this.data.level)
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