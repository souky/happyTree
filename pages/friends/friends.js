// pages/friends/friends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uersList: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }, { id: "10" }, { id: "11" }, { id: "12" }, { id: "13" }, { id: "14" }, { id: "15" }],
    userShow:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的伙伴',
    });
    
    this.initFri(0);
  },
  //初始化朋友数据
  initFri:function(index){
    let list = this.data.uersList;
    let new_list = new Array();
    let len = list.length;
    let offset = len - index;
    let forIndex = 0
    //断点加载
    if(offset < 11){
      forIndex = index - 11 + offset;
    }
    if (len > 12){
      for (let x = forIndex;x < (forIndex+11);x++){
        if(x == index){
          list[x].active = 'active'
        }else{
          list[x].active = ''
        }
        new_list.push(list[x])
      };
      
      this.setData({
        userShow : new_list
      })
    }
  },
  bindPickerChange:function(e){
    console.log(e)
    this.initFri(e.detail.value);
  }
  
})