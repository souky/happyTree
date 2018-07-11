
const apps = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const validateTel = data =>{
  let reg = /^(1[2-9])\d{9}$/;
  return reg.test(data);
}

const basePath = 'https://happytree.soukys.com/';
//const basePath = 'http://192.168.1.89:8080/happyTree/';

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
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  wx.request({
    url: basePath + url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'Cookie': 'JSESSIONID=' + app.globalData.sessionId },
    method: 'POST',
    success: res => {
      wx.hideLoading();
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
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        image:'../../img/error.png',
        duration: 1000
      })
    }
  })
}

const showSuccess = msg =>{
  wx.showToast({
    title: msg,
    image: '../../img/check.png',
    duration: 1000
  })
}
const showError = msg =>{
  wx.showToast({
    title: msg,
    image: '../../img/error.png',
    duration: 1000
  })
}

const showInfo = msg => {
  wx.showToast({
    title: msg,
    image: '../../img/bell.png',
    duration: 1000
  })
}

module.exports = {
  formatTime: formatTime,
  wxpost : wxpost,
  wxUpload: wxUpload,
  showSuccess: showSuccess,
  showError: showError,
  showInfo: showInfo,
  validateTel: validateTel
}
