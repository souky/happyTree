
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//const basePath = 'https://happytree.soukys.com/';
const basePath = 'http://192.168.1.89:8080/';

function wxUpload(url, data,path, success){
  let app = getApp()
  wx.uploadFile({
    url: basePath + url, //仅为示例，非真实的接口地址
    filePath: path,
    name: 'file',
    header: { 'Cookie': 'JSESSIONID=' + app.globalData.sessionId },
    formData: data,
    success: res => {
      let rdata = null;
      if (res.data.code == undefined) {
        rdata = JSON.parse(res.data);
      } else {
        rdata = res.data;
      }
      if (rdata.code == '30000') {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      } else {
        success(rdata)
      }
    },
    fail: res => {
      wx.showToast({
        title: '网络错误',
        image: '../../img/error.png',
        duration: 2000
      })
    }
  })
}

function wxpost(url,data,success){
  let app = getApp()
  wx.request({
    url: basePath + url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'Cookie': 'JSESSIONID=' + app.globalData.sessionId },
    method: 'POST',
    success: res => {
      let rdata = null;
      if (res.data.code == undefined) {
        rdata = JSON.parse(res.data);
      }else{
        rdata = res.data;
      }
      
      if (rdata.code == '30000'){
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }else{
        success(rdata)
      }
    },
    fail : res => {
      wx.showToast({
        title: '网络错误',
        image:'../../img/error.png',
        duration: 2000
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  wxpost : wxpost,
  wxUpload: wxUpload
}
