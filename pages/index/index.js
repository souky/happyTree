var Crypto = require('cryptojs/cryptojs.js').Crypto;
Page({
  data: {
    msg:""
  },
  onLoad: function () {
   
  },
  onGotUserInfo : function(e){
    console.log(e);
  },
  wxLogins : function(e){
    //console.log(e);
    let detail = e.detail;
    let dateDe = this.decryptData(detail.encryptedData,detail.iv,"");
    console.log(dateDe);
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       let code = res.code;
    //       console.log(code)
    //       wx.request({
    //         url: 'https://192.168.1.89:8080/happyTree/Wxlogin', 
    //         data: {
    //           code: code
    //         },
    //         method:'POST',
    //         success: function (res) {
    //           console.log(res)
    //         }
    //       })
          
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
  },
  defLogins : function(e){
    console.log(e);
  },
  decryptData:function(appDate,iv,sessionKey){
    var encryptedData = Crypto.util.base64ToBytes(appDate)
    var key = Crypto.util.base64ToBytes(sessionKey);
    var iv = Crypto.util.base64ToBytes(iv);

    // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
    var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
    var decryptResult = "";
    try {
      // 解密
      var bytes = Crypto.AES.decrypt(encryptedData, key, {
        asBpytes: true,
        iv: iv,
        mode: mode
      });

      decryptResult = JSON.parse(bytes);

    } catch (err) {
      console.log(err)
    }

    return decryptResult
  }
   
});
