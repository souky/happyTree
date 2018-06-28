// pages/target/target.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalStyle:false,
    showEnding:false,
    scrolly: false,
    showInfo:false,
    pageNum: 1,
    pageSize: 10,
    pageTotal: 1,
    startDate:"",
    targetHistory:[],
    target:null,
    startTime:'请选择开始日期',
    endTime: '请选择结束日期',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '目标记录',
    });
    let startDate = app.utils.formatTime(new Date());
    this.setData({
      startDate: startDate
    })
    this.initData(this.data.pageNum, this.data.pageSize);
    this.findTarget();
  },
  //查询当前目标
  findTarget:function(){
    app.utils.wxpost("targetinfo/targetNow",null,res =>{
      let res_ = res.result;
      if(res_ != undefined){
        let dateS = app.utils.formatTime(new Date(res.result.startTime)) + " to " + app.utils.formatTime(new Date(res.result.endTime));
        res.result.date = dateS;
        this.setData({
          target: res.result,
          showInfo:true
        })
      }
    })
  },
  //打开添加窗口
  addTarget: function () {
    this.setData({
      modalStyle: true
    })
  },
  
  //添加目标开始时间
  selectStart:function(e){
    this.setData({
      startTime:e.detail.value
    })
  },
  //添加目标开始时间
  selectEnd: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  //添加目标记录
  addTar: function (e) {
    let message = e.detail.value.message;
    let startTimeString = this.data.startTime;
    let endTimeString = this.data.endTime;
    
    let regNotNull = /^\s*$/;
    if (regNotNull.test(message)) {
      app.utils.showInfo("信息不能为空");
      return;
    }
    if ("请选择开始日期" == startTimeString || regNotNull.test(startTimeString)) {
      app.utils.showInfo("请选择开始日期");
      return;
    }
    if ("请选择结束日期" == endTimeString ||regNotNull.test(endTimeString)) {
      app.utils.showInfo("请选择结束日期");
      return;
    }
    let startTime = new Date(startTimeString).getTime();
    let endTime = new Date(endTimeString).getTime();
    if (startTime == endTime){
      app.utils.showInfo("日期不能相同");
      return;
    }
    if (startTime > endTime) {
      app.utils.showInfo("日期顺序错误");
      return;
    }
    let data = { startTime: startTimeString, endTime: endTimeString, message: message}    
    
    app.utils.wxpost("targetinfo/saveTargetInfo",data,res =>{
      if (res.code == '10000') {
        app.utils.showSuccess('新增成功');
        this.findTarget();
        this.closeModal();
      } else {
        app.utils.showError(res.message);
        this.closeModal();
      }
    })


  },
  //初始化历史记录
  initData: function (pageNum,pageSize){
    if (this.data.showEnding) {
      return;
    }
    
    let data = { status: 3, pageNum: pageNum, pageSize: pageSize }
    app.utils.wxpost("targetinfo/queryTargetInfos", data, res => {

      if (res.result.total > 6) {
        this.setData({
          scrolly: true
        })
      }
      if (res.result.pageNum == res.result.pages && res.result.total > 6) {
        this.setData({
          showEnding: true
        })
      }
      let list = this.data.targetHistory
      for (let x in res.result.list) {
        let startTime = app.utils.formatTime(new Date(res.result.list[x].startTime));
        let endTime = app.utils.formatTime(new Date(res.result.list[x].endTime));
        res.result.list[x].date = startTime + " to " + endTime;
        list.push(res.result.list[x]);
      }

      this.setData({
        targetHistory: list,
        pageNum: res.result.pageNum,
        pageSize: res.result.pageSize,
        pageTotal: res.result.pages,
      })
    })
  },
  
  //刷新
  refrush:function(){
    let pageNum = parseInt(this.data.pageNum) + 1;
    let pageTotal = parseInt(this.data.pageTotal);

    if (pageNum <= pageTotal) {
      this.initData(pageNum, this.data.pageSize);
    }
  },

  closeModal: function () {
    this.setData({
      modalStyle: false
    })
  }
})