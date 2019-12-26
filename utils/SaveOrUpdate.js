import { GetData } from "GetData.js"
const getData = new GetData()

class SaveOrUpdate{
  post_data(para,url){
    if(para.id== null) {
      getData.req(url == null ? "collection/ctg_sava.jspx" : url, "POST", para, res => {
        if (res.data.status == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            delta: 2
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
            delta: 2
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