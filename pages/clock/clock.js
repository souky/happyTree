// pages/clock/clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekItems: ['日', '一', '二', '三', '四', '五', '六'],
    dayItems: [{ "days": 27, "css": "forbid", "check": false, "date": 1527350400000 }, { "days": 28, "css": "forbid", "check": false, "date": 1527436800000 }, { "days": 29, "css": "forbid", "check": false, "date": 1527523200000 }, { "days": 30, "css": "forbid", "check": false, "date": 1527609600000 }, { "days": 31, "css": "forbid", "check": false, "date": 1527696000000 }, { "days": 1, "check": false, "date": 1527782400000 }, { "days": 2, "check": false, "date": 1527868800000 }, { "days": 3, "check": false, "date": 1527955200000 }, { "days": 4, "check": false, "date": 1528041600000 }, { "days": 5, "check": false, "date": 1528128000000 }, { "days": 6, "check": false, "date": 1528214400000 }, { "days": 7, "check": false, "date": 1528300800000 }, { "days": 8, "check": false, "date": 1528387200000 }, { "days": 9, "check": false, "date": 1528473600000 }, { "days": 10, "check": false, "date": 1528560000000 }, { "days": 11, "check": false, "date": 1528646400000 }, { "days": 12, "check": false, "date": 1528732800000 }, { "days": 13, "check": false, "date": 1528819200000 }, { "days": 14, "check": false, "date": 1528905600000 }, { "days": 15, "check": false, "date": 1528992000000 }, { "days": 16, "check": false, "date": 1529078400000 }, { "days": 17, "check": false, "date": 1529164800000 }, { "days": 18, "check": false, "date": 1529251200000 }, { "days": 19, "css": "active", "check": false, "date": 1529337600000 }, { "days": 20, "check": false, "date": 1529424000000 }, { "days": 21, "check": false, "date": 1529510400000 }, { "days": 22, "check": false, "date": 1529596800000 }, { "days": 23, "check": false, "date": 1529683200000 }, { "days": 24, "check": false, "date": 1529769600000 }, { "days": 25, "check": false, "date": 1529856000000 }, { "days": 26, "check": false, "date": 1529942400000 }, { "days": 27, "check": false, "date": 1530028800000 }, { "days": 28, "check": false, "date": 1530115200000 }, { "days": 29, "check": false, "date": 1530201600000 }, { "days": 30, "check": false, "date": 1530288000000 }]
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