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
    imgSrc:'../../img/clock/choiceImg.png',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //日历
   //this.initDate();
    
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
    this.setData({
      modalStyle:true
    })
  },
  choiceImg:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        this.setData({
          imgSrc:res.tempFilePaths[0]
        })
      }
    })
  },
  punchClock:function(e){
    let path = this.data.imgSrc;
    if (path == '../../img/clock/choiceImg.png') {
      wx.showToast({
        title: '请选择图片',
        image: '../../img/error.png',
        duration: 1000
      })
      return;
    }
    let textA = e.detail.value.textA;
    if(textA == ''){
      wx.showToast({
        title: '打卡信息必填',
        image: '../../img/error.png',
        duration: 1000
      })
      return;
    }
    let data = {text:textA}
    app.utils.wxUpload('punchclock/punch', data, path,res =>{
      console.log(res);
    })
  },
  closeModal:function(){
    this.setData({
      modalStyle: false
    })
  },
  ask_leave: function () {
    wx.showModal({
      title: '提示',
      content: '请假操作不可撤回,请三思',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})