const app = getApp()
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
const basePath = 'https://happytree.soukys.com/';

function wxpost(url,data,success){
  wx.request({
    url: basePath + url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    success: res => {
      success(res.data)
    },
    fail : res => {
      wx.showToast({
        title: '网络错误',
        image:'../img/error.png',
        duration: 2000
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  wxpost : wxpost
}
