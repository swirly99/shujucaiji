import { GetData } from "../../utils/GetData.js"
const getData = new GetData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sousuo_data: '',
    startX: 0, //开始坐标
    startY: 0,
    list: [],
    SubList: [],
    imgShow: false,
    entity: null
  },

  //搜索
  input_sousuo: function (e) {
    this.setData({
      sousuo_data: e.detail.value
    })
  },

  update: function (e) {
    this.data.entity.wid = this.data.list[e.currentTarget.dataset.index].waresId
    if (this.data.entity.code == "fyccr") {
      wx.navigateTo({
        url: "../addOrUpdate/fyccr?jc=" + JSON.stringify(this.data.entity)
      })
      // console.log(this.data.entity,1)
      return
    }
    wx.navigateTo({
      url: "basics?data=" + JSON.stringify(this.data.entity)
    })
  },

  del: function (e) {
    getData.req("collection/ware_delete.jspx", "POST", { key: app.globalData.key, id: this.data.list[e.currentTarget.dataset.index].waresId }, res => {
      if (res.data.status == 200) {
        this.onShow();
      }
    })
  },

  add: function (e) {
    // delete this.data.entity.wid
    wx.getSetting({
      success: res => {
        if (!res.authSetting["scope.userLocation"]) {
          wx.openSetting({
            success: msg => {
              if (!msg.authSetting["scope.userLocation"]) {
                wx.showToast({
                  title: '请先开启“使用我的地理位置”',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                if (this.data.entity.code == "fyccr") {
                  wx.navigateTo({
                    url: "../addOrUpdate/fyccr?jc=" + JSON.stringify(this.data.entity)
                  })
                } else {
                  wx.navigateTo({
                    url: "basics?data=" + JSON.stringify(this.data.entity)
                  })
                }
              }
            }
          })
        } else {
          if (this.data.entity.code == "fyccr") {
            wx.navigateTo({
              url: "../addOrUpdate/fyccr?jc=" + JSON.stringify(this.data.entity)
            })
          } else {
            wx.navigateTo({
              url: "basics?data=" + JSON.stringify(this.data.entity)
            })
          }
        }
      },
      fail: fai => {
        console.log(fai)
      }
    })
  },

  show_sub_menu: function (e) {
    this.data.list[e.currentTarget.dataset.index].show = !this.data.list[e.currentTarget.dataset.index].show
    this.setData({
      list: this.data.list
    })
  },

  //去子菜单的列表页
  goToSonList: function (e) {
    var arr_index = e.currentTarget.dataset.index.split(",")
    //,waresId:商家id，sonObj子菜单obj
    var para = "waresId=" + this.data.list[arr_index[0]].waresId + "&sonObj=" + JSON.stringify(this.data.list[arr_index[0]].mapList[arr_index[1]])
    wx.navigateTo({
      url: "../secondLevel/list?" + para
    })
  },






  /* 滑动出现编辑，删除start */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },
  touchmove: function (e) {
    var index = e.currentTarget.dataset.index,//当前索引

      startX = this.data.startX,//开始X坐标
      startY = this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    this.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    this.setData({
      list: this.data.list
    })
  },

  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /* 滑动出现编辑，删除end */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      entity: JSON.parse(options.data),
    })
    wx.setNavigationBarTitle({
      title: this.data.entity.name
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
    getData.req("collection/ware_lsit.jspx", "POST", { key: app.globalData.key, ctgId: this.data.entity.ctgId }, res => {
      if (res.data.data.length > 0 && res.data.data[0].mapList.length > 0) {
        res.data.data.forEach(v => {
          v.show = false
        })
      }
      this.setData({
        list: res.data.data
      })
    })
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