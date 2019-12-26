import { GetData } from "GetData.js"
const getData = new GetData()

class SaveOrUpdate{
  /*
    para:参数
    url:后台访问路劲
    retIndex:返回层级（1：代表返回上页，2：代表返回上上页）
   */
  post_data(para, url, retIdex){
    if(para.id== null) {
      getData.req(url == null ? "collection/ctg_sava.jspx" : url, "POST", para, res => {
        if (res.data.status == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            delta: retIdex == null ? 2 : retIdex
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else {
      getData.req(url == null ? "collection/ctg_update.jspx" : url, "POST", para, res => {
        if (res.data.status == 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            delta: retIdex == null ? 2 : retIdex
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
} export { SaveOrUpdate }