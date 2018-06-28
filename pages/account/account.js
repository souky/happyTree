// pages/account/account.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    modalStyle:false,
    isManager:false,
    orgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的账号'
    });

    //获取登陆对象
    this.getLoginUser();

    app.utils.wxpost("org/queryOrgs", null, res => {
      this.setData({
        orgList: res.result
      })
    })
    
  },
  getLoginUser:function(){
    app.utils.wxpost("user/getLoginUser", null, res => {
      res.result.sexs = res.result.userSex == '1'?"man":"women";
      res.result.dateInfo = app.utils.formatTime(new Date(res.result.createDate));
      let isManager = false;
      if(res.result.loginName == 'manager'){
        isManager = true;
      }
      if (res.result.orgName == undefined || res.result.orgName == ''){
        res.result.orgName = '请选择打卡群'
      }
      this.setData({
        user: res.result,
        isManager: isManager
      })
    })
  },

  openEdit:function(){
    this.setData({
      modalStyle: true
    })
  },
  //编辑用户信息
  editUser:function(e){
    let data = e.detail.value;
    if (!app.utils.validateTel(data.userTel)){
      app.utils.showInfo('电话格式错误');
      return;
    }
    app.utils.wxpost('user/updateUser',data,res =>{
      if (res.code == '10000') {
        app.utils.showSuccess('修改成功');
        this.getLoginUser();
        this.closeModal();
      } else {
        app.utils.showError(res.message);
        this.closeModal();
      }
    })
  },
  //组织选择
  chioceOrg:function(e){
    let orgCode = this.data.orgList[e.detail.value].id;
    let orgName = this.data.orgList[e.detail.value].orgName;
    let data = {orgCode:orgCode};
    app.utils.wxpost('user/updateUser', data, res => {
      if (res.code == '10000') {
        app.utils.showSuccess('打卡群已更改');
        let user = this.data.user;
        user.orgName = orgName;
        this.setData({
          user: user
        })
      } else {
        app.utils.showError(res.message);
        this.closeModal();
      }
    })
  },
  //管理机构
  manager:function(){
    wx.navigateTo({
      url: '/pages/manager/manager',
    })
  },
  //同步微信头像
  syncImg:function(e){
    let data = e.detail.userInfo;
    app.utils.wxpost('updateImage',data,res =>{
      if (res.code == '10000') {
        app.utils.showSuccess('同步成功');
        this.getLoginUser();
      } else {
        app.utils.showError(res.message);
      }
    })
  },
  closeModal:function(){
    this.setData({
      modalStyle: false
    })
  }
  

  
})