// pages/rank/rank.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    code:'',
    rankList:[],
    showWarning:false,
    userList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: 'RANK记录',
    }); 
    option.code = "80a9c09e7ba849218788c087ebeb01a9"
    let code = option.code;
    let dates = app.utils.formatTime(new Date());
    this.setData({
      date:dates,
      code: code
    })
    this.queryRank();
  },
  //query rank
  queryRank:function(){
    let rankTime = this.data.date;
    let orgCode = this.data.code;
    let data = { rankTime: rankTime, orgCode: orgCode};
    this.inituser(data);
    app.utils.wxpost("punchrank/queryPunchRanks",data,res =>{
      let rankList = res.result;
      if(rankList.length == 0){
        this.setData({
          showWarning: true,
          rankList:[]
        })
      }else{
        this.setData({
          rankList: rankList,
          showWarning:false
        })
      }
    })
  },
  //query user
  inituser:function(data){
    app.utils.wxpost("user/queryUserWithTarger", data, res => {
      this.setData({
        userList: res.result
      })
    })
  },
  //add rank
  addRank: function () {
    let rankTime = this.data.date;
    let orgCode = this.data.code;
    let data = { rankTime: rankTime, orgCode: orgCode };
    app.utils.wxpost("punchrank/savePunchRank", data, res => {
      if (res.code == '10000') {
        app.utils.showSuccess('新增成功');
        this.queryRank();
        
      } else {
        app.utils.showError(res.message);
      }
    })
  },
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  //show img
  showUserImg:function(e){
    let userId = e.currentTarget.dataset.id;
    let rankTime = this.data.date;
    let data = { userId: userId, rankTime: rankTime};
    app.utils.wxpost("punchclock/getPunchClockByTarget", data, res => {
      if (res.code == '10000') {
        if (res.result.length > 0){
          wx.previewImage({
            urls: res.result
          })
        }else{
          app.utils.showError("没有打卡图哟");
        }

      } 
    })
  },
  //bind rank user
  bindUserChange:function(e){
    let id = e.currentTarget.dataset.id;
    let userId = this.data.userList[e.detail.value].id;
    let rateProgress = this.data.userList[e.detail.value].rateProgress;
    let targetDays = this.data.userList[e.detail.value].targetDays;
    let data = { id: id, userId: userId, rateProgress: rateProgress, targetDays: targetDays}
    app.utils.wxpost("punchrank/updatePunchRank", data, res => {
      if (res.code == '10000') {
        this.queryRank();

      } else {
        app.utils.showError(res.message);
      }
    })
  },
  //unbind rank user
  unbindUser:function(e){
    let id = e.currentTarget.dataset.id;
    let userId = "";
    let data = { id: id, userId: userId}
    app.utils.wxpost("punchrank/updatePunchRank", data, res => {
      if (res.code == '10000') {
        this.queryRank();

      } else {
        app.utils.showError(res.message);
      }
    })
  }
})