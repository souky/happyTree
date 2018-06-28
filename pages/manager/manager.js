// pages/manager/manager.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgList:[],
    modalStyle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '管理打卡群'
    });

    this.initData();

  },
  //init
  initData:function(){
    app.utils.wxpost("org/queryOrgs", null, res => {
      this.setData({
        orgList: res.result
      })
    })
  },
  //openAdd
  openAdd:function(){
    this.setData({
      modalStyle: true
    })
  },

  //add org
  addOrg:function(e){
    let data = e.detail.value;
    let regNotNull  = /^\s*$/;
    if (regNotNull.test(data.orgName)){
      app.utils.showInfo("名称不能为空");
      return;
    }
    app.utils.wxpost("org/saveOrg", data, res => {
      if (res.code == '10000') {
        app.utils.showSuccess('新增成功');
        this.initData();
        this.closeModal();
      } else {
        app.utils.showError(res.message);
        this.closeModal();
      }
    })
  },

  closeModal: function () {
    this.setData({
      modalStyle: false
    })
  }

  
})