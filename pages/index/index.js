
Page({
  data: {
    msg:""
  },
  
  wxLogins : function(e){
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code;
          wx.request({
            url: 'https://192.168.1.89:8080/happyTree/Wxlogin', //仅为示例，并非真实的接口地址
            data: {
              code: code
            },
            method:'POST',
            success: function (res) {
              console.log(res)
            }
          })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  defLogins : function(e){
    console.log(e);
  }
   
});
