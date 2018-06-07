//app.js
const util = require('utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setNavigationBarTitle({
      title: '乐享树屋'
    })
    //设置bar
    
    //wx.hideTabBar();
    wx.setTabBarStyle({
      color: '#929292',
      selectedColor: '#1AAD19',
      backgroundColor: '#ffffff',
      borderStyle: 'black'
    })
    //微信登陆
    wx.login({
      success: res => {
        if (res.code) {
          let code = res.code;
          let data = {code:code};
          util.wxpost('Wxlogin', data, res =>{
           this.globalData.userCode = res.result.session_key;
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userCode: null
  },
  utils:util
})