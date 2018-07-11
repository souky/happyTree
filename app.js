//app.js
const util = require('utils/util.js')
App({
  onLaunch: function () {
    
    wx.setNavigationBarTitle({
      title: '乐享树屋'
    })
    //设置bar
    
    //wx.hideTabBar();
    wx.setTabBarStyle({
      color: '#929292',
      selectedColor: '#fe8a35',
      backgroundColor: '#ffffff',
      borderStyle: 'black'
    });
    wx.showShareMenu({
      withShareTicket: true
    });
    //微信登陆
    wx.login({
      success: res => {
        if (res.code) {
          let code = res.code;
          let data = {code:code};
          util.wxpost('Wxlogin', data, res =>{
           this.globalData.userCode = res.result.session_key;
           this.globalData.openid = res.result.openid;
           this.globalData.sessionId = res.result.session_id;
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userCode: null,
    openid:null,
    sessionId:null
  },
  utils:util
})