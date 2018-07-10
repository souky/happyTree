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
    showWarning:false
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
    app.utils.wxpost("punchrank/queryPunchRanks",data,res =>{
      let rankList = res.result;
      if(rankList.length == 0){
         
        this.setData({
          showWarning: true
        })
      }else{
        this.setData({
          rankList: rankList
        })
      }
      
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
  }
})