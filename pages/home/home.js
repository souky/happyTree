// pages/home/home.js
Page({

  data: {
    imgUrls: [
      '../../img/home/swiper_1.jpg',
      '../../img/home/swiper_2.jpg',
      '../../img/home/swiper_3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    activeColor:'#ffffff'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar();
    wx.setNavigationBarTitle({
      title: '乐享树屋'
    })
  },

  
})