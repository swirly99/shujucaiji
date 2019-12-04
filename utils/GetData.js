class GetData {
  /*
    url:访问路劲
    methed:post/get
    data:参数
    msg：返回后执行函数
   */
  req(url,methed,data,msg) {
    wx.request({
      url: "https://data.zjjiyu.cn/" + url,
      method: methed,
      data: data,
      header: {
        'content-type': 'application/json',
      },
      success: msg
    })
  }
}

export { GetData }