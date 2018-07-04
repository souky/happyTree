// pages/home/home.js
const app = getApp();
Page({

  data: {
    imgUrls: [
      '../../img/home/swiper/swiper_1.png'
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    activeColor:'#ffffff',
    rankList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.utils.wxpost("punchrank/getLastWeekRank","",res =>{
      let list = res.result;
      
      for(let x in list){
        if(list[x].id == undefined){
          list[x].em = true;
        }else{
          list[x].em = false;
        }
        if(x == 0){
          list[x].pngs = '../../img/home/silver.png'
        }
        if (x == 1) {
          list[x].pngs = '../../img/home/gold.png'
        }
        if (x == 2) {
          list[x].pngs = '../../img/home/copper.png'
        }
        
      }
      
      this.setData({
        rankList: list
      })
    })
   
  },

  
})