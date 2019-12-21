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
    Institutional:'',//机构分组
    Institutional_items: [//机构分组类型列表
      {name:'网络游戏', checked:false},
      {name:'网络音乐', checked:false},
      {name:'网络动漫', checked:false},
      {name:'网络表演', checked:false},
      {name:'其他', checked:false}
    ],
    authority:'',//网络文化经营许可证发证机关
    Licensekey:'',//许可证号
    Practitioners:'',//从业人员
    area:'',//经营面积
    intellectual:'',//知识产权
    IndependentGame:'',//拥有自主知识产权网络游戏数
    IndependentMusic:'',//拥有自主知识产权网络音乐数
    IndependentAnime:'',//拥有自主知识产权网络动漫数
    RegUser:'',//注册用户数
    OperateGame:'',//运营网络文化产品数：网络游戏数
    OperateMusic:'',//运营网络文化产品数：网络音乐数 
    OperateAnime:'',//运营网络文化产品数：网络动漫数
    OperateAnchor:'',//运营网络文化产品数：网络表演主播数

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
    var Institutional1="";
    if (this.data.Institutional.length>0){
      this.data.Institutional.forEach(v=>{
        Institutional1 += (v + ",")
      })
      Institutional1=Institutional1.substr(0,Institutional1.length-1)
    }
    //数据存放到jc
    var qt=new Object();
    qt.Institutional = Institutional1
    qt.authority=this.data.authority
    qt.Licensekey=this.data.Licensekey
    qt.Practitioners=this.data.Practitioners
    qt.area=this.data.area
    qt.intellectual=this.data.intellectual
    qt.IndependentGame=this.data.IndependentGame
    qt.IndependentMusic=this.data.IndependentMusic
    qt.IndependentAnime=this.data.IndependentAnime
    qt.RegUser=this.data.RegUser
    qt.OperateGame=this.data.OperateGame
    qt.OperateMusic=this.data.OperateMusic
    qt.OperateAnime=this.data.OperateAnime
    qt.OperateAnchor=this.data.OperateAnchor

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
            Institutional_items: positionStr.check_position(this.data.Institutional_items, this.data.Institutional)
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