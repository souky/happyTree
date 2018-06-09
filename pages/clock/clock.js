// pages/clock/clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekItems: ['日', '一', '二', '三', '四', '五', '六'],
    dayItems: [{'days':1,'css':'acitve','check':true}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //日历
   //this.initDate();
  },
  initDate : function(){
    let days = [];
    let date = new Date();
    let dats = date.getDay();
    date.setDate((date.getDate() - dats));
    let dayItemsNew = [];
    for (let i = 0; i < 7; i++) {
      let obj = new Object();
      obj['week'] = days[i];
      obj['days'] = date.getDate();
      date.setDate(date.getDate() + 1);
      dayItemsNew.push(obj);
    }
    this.setData({
      dayItems: dayItemsNew
    })
  }


})