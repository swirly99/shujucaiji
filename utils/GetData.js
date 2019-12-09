class GetData {
  /*
    url:访问路劲
    methed:post/get
    data:参数
    msg：返回后执行函数
   */
  req(url,methed,data,msg) {
    wx.request({
      url: "http://data.zjjiyu.cn/" + url,
      method: methed,
      data: data,
      header: {
        'content-type': 'application/json',
      },
      success: msg
    })
  }
  /*
    data:参数 
    msg：返回后执行函数
  */
  upload_img(data, suc , fail){
    wx.uploadFile({
      url: "http://data.zjjiyu.cn/common/o_upload_image.jspx",
      filePath: data,
      name: 'file',
      header: {
        'content-type': 'application/json',
      },
      success: suc,
      fail:fail
    });
  }
}
export { GetData }