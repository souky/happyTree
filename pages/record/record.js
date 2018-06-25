// pages/record/record.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalogSelect:0,
    animationData:{},
    scrolly:false,
    showEnding:false,
    pageNum:1,
    pageSize:10,
    pageTotal:1,
    punchList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '打卡记录'
    });
    this.initData(this.data.pageNum, this.data.pageSize);
  },
  //初始化函数
  initData:function(pageNum,pageSize){
    if (this.data.showEnding){
      return;
    }
    let isLeave = this.data.catalogSelect;
    let data = { isLeave: isLeave, pageNum: pageNum, pageSize: pageSize}
    app.utils.wxpost("punchclock/queryPunchClocks",data,res =>{
      
      if (res.result.total > 5){
        this.setData({
          scrolly:true
        })
      }
      if (res.result.pageNum == res.result.pages && res.result.total > 5){
        this.setData({
          showEnding: true
        })
      }
      let list = this.data.punchList
      for(let x in res.result.list){
        list.push(res.result.list[x]);
      }
      
      this.setData({
        punchList: list,
        pageNum: res.result.pageNum,
        pageSize: res.result.pageSize,
        pageTotal: res.result.pages,
      })
    })
  },
  select_ask: function (event){
    let catalogSelects = event.currentTarget.dataset.select;
    let animates = wx.createAnimation({
      duration: 200
    })
    if(catalogSelects == '0'){
      animates.left('0rpx').step();
    }else{
      animates.left('202rpx').step();
    }
    this.setData({
      catalogSelect: catalogSelects,
      animationData: animates.export(),
      scrolly: false,
      showEnding: false,
      punchList: []
    })
    this.initData(1,this.data.pageSize)
    
  },
  refrush:function(){
    let pageNum = parseInt(this.data.pageNum) + 1;
    let pageTotal = parseInt(this.data.pageTotal);
    
    if (pageNum <= pageTotal){
      this.initData(pageNum, this.data.pageSize);
    }
  },
  showInfo:function(e){
    let info = e.currentTarget.dataset.text;
    wx.showModal({
      title: '详细',
      content: info,
      showCancel:false,
      confirmText:'关闭',
      
    })
  },
  showImg:function(e){
    let url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url] // 需要预览的图片http链接列表
    })
  }
  
})