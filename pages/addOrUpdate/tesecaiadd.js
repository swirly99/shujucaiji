// pages/addOrUpdate/tescaiadd.js
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
    SpecialtyName: '',//特色菜名称
    RestaurantName: '',//餐馆名称
    SpecialtyType: '',//特色菜类型
    SpecialtyInt: '',//特色菜简介
    picture: '',//图片
    Spicy:'',//辣度指数
    title:'添加特色菜',
    b_width: 340,
    view_index: 0,
    file_url: null,
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
  submit: function () {
    console.log(this.jc.ctgId)
    //数据存放到jc
    var qt = new Object();
    qt.SpecialtyName = this.data.SpecialtyName
    qt.RestaurantName = this.data.RestaurantName
    qt.SpecialtyType = this.data.SpecialtyType
    qt.SpecialtyInt = this.data.SpecialtyInt
    qt.picture = this.data.picture
    qt.Spicy = this.data.Spicy
    var para = this.jc
    
    para.attr = qt;
    console.log(para);
    saveOrUpdate.post_data(para,"/collection/extension_sava.jspx")
  },
  //图片上传
  upload_img: function (e) {
    var msg = null
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
        if (e.currentTarget.dataset.id == "imgs") {
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
                title: "第" + (this.data.imgs.length + 1) + "张文件上传失败",
                icon: 'none',
                duration: 2000
              })
            })
          })
        } else {
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
  delete_img: function (e) {
    if (e.currentTarget.dataset.id == "imgs") {
      this.data.imgs.splice(e.currentTarget.dataset.index, 1);
      this.setData({
        imgs: this.data.imgs
      })
    } else {
      this.setData({
        [e.currentTarget.dataset.id]: '',
      })
    }
  },
  finishing_imgs: function () {
    var arr = []
    this.data.imgs.forEach(v => {
      arr.push(this.data.file_url + v)
    })
    this.setData({
      imgs_arr: arr
    })
  },
  //游览图片
  show_img: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.src_list // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jc = JSON.parse(options.data)
    this.jc.key=app.globalData.key

    if (this.jc.id != null) {
      getData.req("collection/extension_sava.jspx", "POST", { ctgId: this.data.entity.ctgId, waresId: his.data.list[e.currentTarget.dataset.index].waresId, "attr": { key: app.globalData.key}}, res => {
        if (res.data.status == 200) {
          this.setData(res.data.data)
        }
      })
      wx.setNavigationBarTitle({
        title: "特色菜_编辑"
      })
    }else{
      wx.setNavigationBarTitle({
        title: "特色菜_添加"
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