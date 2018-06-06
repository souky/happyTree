//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    wx.login({
      success: res => {
        if (res.code) {
          let code = res.code;
          wx.request({
            url: this.globalData.basePath + 'Wxlogin', 
            data: {
              code: code
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method:'POST',
            success: res => {
              console.log(res)
              this.globalData.userCode = res.data.result.session_key;
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userCode: null,
    basePath:'https://happytree.soukys.com/'
  }
})