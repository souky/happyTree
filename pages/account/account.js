// pages/account/account.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_info:'2018-07-12',
    user:null,
    modalStyle:false,
    isManager:false
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
  chioceOrg:function(){

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