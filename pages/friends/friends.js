// pages/friends/friends.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uersList: [],
    userShow:[],
    showMore:false,
    srcollY:true,
    selectId:"",
    rAndT:1,
    animationData: {},
    targetHistory:[],
    punchList:[],
    showEndMessage:false,
    noFriends:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的伙伴',
    });
    
    this.getFri();
  },
  //调取所有朋友数据
  getFri:function(){
    app.utils.wxpost("user/findFriends",null,res =>{
      if(res.result.length == 0){
        this.setData({
          noFriends: true
        });
      }else{
        this.setData({
          uersList: res.result
        });
      }
      this.initFri(0);
    })
  },
  //初始化朋友数据
  initFri:function(index){
    let list = this.data.uersList;
    let new_list = new Array();
    let len = list.length;
    let offset = len - index;
    let forIndex = 0;
    let showMore = false;
    var id = "";
    if(len > 12){
      showMore = true
    }
    //断点加载
    if (len > 12){
      if (offset < 11) {
        forIndex = index - 11 + offset;
      }
      for (let x = forIndex;x < (forIndex+11);x++){
        if(x == index){
          list[x].active = 'active'
          id = list[x].id;
        }else{
          list[x].active = ''
        }
        new_list.push(list[x])
      };
      
      this.setData({
        userShow: new_list,
        selectId: id,
        showMore: showMore
      })
    }else{
      if(list[0] != undefined){
        list[0].active = 'active';
        id = list[0].id;
      }
      this.setData({
        userShow: list,
        selectId:id,
        showMore: showMore
      })
    }
    if (this.data.rAndT == 1){
      this.getRecord();
    }else{
      this.getTarget(id);
    }
  },
  //打卡记录
  getRecord:function(){
    app.utils.wxpost("punchclock/queryOtherPunchClocks", { id: this.data.selectId,pageNum:1,pageSize:0 }, res => {
      
      if (res.result.list == undefined){
        this.setData({
          showEndMessage: true
        })
      }else{
        this.setData({
          punchList: res.result.list,
          showEndMessage:false
        })
      }
      
    })
  },
  getTarget: function () {
    app.utils.wxpost("targetinfo/queryOtherTargetInfos", { id: this.data.selectId, pageNum: 1, pageSize: 0 }, res => {
      if (res.result.list == undefined) {
        this.setData({
          showEndMessage: true
        })
      } else {
        
        for (let x in res.result.list) {
          let startTime = app.utils.formatTime(new Date(res.result.list[x].startTime));
          let endTime = app.utils.formatTime(new Date(res.result.list[x].endTime));
          res.result.list[x].date = startTime + " to " + endTime;
        }
        this.setData({
          targetHistory:res.result.list,
          showEndMessage: false
        })
      }
    })
  },
  select_ask: function (event) {
    let rAndT = event.currentTarget.dataset.select;
    let animates = wx.createAnimation({
      duration: 200
    })
    if (rAndT == '1') {
      this.getRecord();
      animates.left('0rpx').step();
      this.setData({
        rAndT: 1,
        animationData: animates.export(),
        punchList: []
      });
      
    } else {
      this.getTarget();
      animates.left('202rpx').step();
      this.setData({
        rAndT: 2,
        animationData: animates.export(),
        targetHistory: []
      });
      
    }
  },
  
  showInfo: function (e) {
    let info = e.currentTarget.dataset.text;
    wx.showModal({
      title: '详细',
      content: info,
      showCancel: false,
      confirmText: '关闭',
    })
  },
  showImg: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url] 
    })
  },
  bindPickerChange:function(e){
    this.setData({
      punchList: [],
      targetHistory: []
    })
    this.initFri(e.detail.value);
  },
  tapFind(e){
    // console.log(e)
    let id = e.currentTarget.dataset.id;
    let list = this.data.userShow;
    for (let x in list){
      if (id == list[x].id){
        list[x].active = 'active';
      }else{
        list[x].active = '';
      }
    }
    this.setData({
      userShow:list,
      selectId: id,
      punchList:[],
      targetHistory: []
    })
    if (this.data.rAndT == 1) {
      this.getRecord();
    } else {
      this.getTarget();
    }
  }
})