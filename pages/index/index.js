var Crypto = require('cryptojs/cryptojs.js').Crypto;
const app = getApp()
Page({
  data: {
    msg:""
  },
  
  defLogins : function(){
    // app.utils.wxpost();
    wx.switchTab({
      url: '../../pages/home/home'
    })
  },
  onGotUserInfo : function(e){
    console.log(e);
  },
  wxLogins : function(e){
    let sessionKey = app.globalData.userCode;
    let detail = e.detail;
    let dateDe = this.decryptData(detail.encryptedData, detail.iv, sessionKey);
    app.utils.wxpost('openIdlogin',dateDe,res =>{
      if(res.code == '10000'){
        wx.switchTab({
          url:'../../pages/home/home'
        })
      }
    })
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
