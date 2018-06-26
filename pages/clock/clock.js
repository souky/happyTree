// pages/clock/clock.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekItems: ['日', '一', '二', '三', '四', '五', '六'],
    month:'',
    dayItems: [],
    modalStyle:false,
    modalStyle_l:false,
    imgSrc:'../../img/clock/choiceImg.png',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //日历
    this.initDate();
    
  },
  initDate : function(){
    let dates = new Date();
    let months = dates.getMonth() + 1;
    
    //获取日历
    app.utils.wxpost('punchclock/getPunchClockDate', {}, res => {
      if (res.code == '10000') {
        this.setData({
          dayItems: res.result
        })
      }
    })

    this.setData({
      month: months + '月'
    })
  },
  punClock:function(event){
    app.utils.wxpost('punchclock/checkPunch', {}, res => {
      if (res.code == '10000') {
        this.setData({
          modalStyle: true
        })
      }else{
        app.utils.showInfo(res.message);
      }
    })
    
  },
  choiceImg:function(){
    wx.chooseImage({
      count: 1, 
      sizeType: [ 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: res => {
        this.setData({
          imgSrc:res.tempFilePaths[0]
        })
      }
    })
  },
  punchClock:function(e){
    let path = this.data.imgSrc;
    if (path == '../../img/clock/choiceImg.png') {
      app.utils.showError('请选择图片');
      return;
    }
    let textA = e.detail.value.textA;
    if(textA == ''){
      app.utils.showError('打卡信息必填');
      return;
    }
    let data = {text:textA}
    app.utils.wxUpload('punchclock/punch', data, path,res =>{
      if (res.code == '10000') {
        app.utils.showSuccess('打卡成功');
        this.initDate();
        this.closeModal();
      } else {
        app.utils.showError(res.message);
        this.closeModal();
      }
    })
  },
  closeModal:function(){
    this.setData({
      modalStyle: false
    })
  },
  closeModal_l: function () {
    this.setData({
      modalStyle_l: false
    })
  },
  ask_leave: function () {
    wx.showModal({
      title: '提示',
      content: '请假操作不可撤回,请三思',
      success: res => {
        if (res.confirm) {
          this.setData({
            modalStyle_l: true
          })
        } else if (res.cancel) {
          this.closeModal_l();
        }
      }
    })
  },
  askLeave:function(e){
    let leaveInfo = e.detail.value.leaveInfo;
    if (leaveInfo == '') {
      app.utils.showError('请假理由必填');
      return;
    }
    let data = { leaveInfo: leaveInfo }
    app.utils.wxpost('punchclock/punchLeave', data, res => {
      if(res.code == '10000'){
        app.utils.showSuccess('请假成功');
        this.closeModal_l();
      }else{
        app.utils.showError(res.message);
        this.closeModal_l();
      }
    })
  }

})