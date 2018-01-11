//index.js
//获取应用实例
var app = getApp()
// console.log(app.data.url)
// var getSystemHight = require("../../common/getSystemHight.js");
// var tabBar = require("../../common/tabBar.js");
Page({
  data: {
    // 名片夹--定位
    dist: 50,
    box: 400,
    tops: [],//用来存储数组距离
    card_top: [0, 1],//模拟数据数组
    zindex: [8, 7, 6, 5, 4, 3],//zindex数据数组
    ztop: [],//点击时暂存数组数据
    tid: 0,//记录点击时的名片的索引
    topd: 0,//点击时记录鼠标在盒子里的位置
    // 名片夹--定位
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    // 页面加载时，根据内容数组的length动态调整距离
    /* var card_top = this.data.card_top;
    var dist = this.data.dist;
    for(var k in card_top){
      // console.log(k)
      card_top[k]=k*dist
    }
    this.data.card_top = card_top;
    console.log(this.data.card_top); */
    var that = this;
    // 设置名片距离的数组数据
    var top = this.data.tops;
    var card_top = this.data.card_top;
    vtop(top, card_top)
    function vtop(top, arr) {
      // top[0]=0;
      // top[1]=390;
      // top[2]=390*2;
      // top[3]=top[2]+65;
      // top[4]=top[3]+65;
      // top[5]=top[4]+65;
      for (var i in arr) {
        if (i > 1) {
          top[i] = top[i - 1] + 50
          // console.log(top[i])
        } else {
          top[i] = i * 390;
          // console.log(top[i])
        }
      }
    }
    // this.data.tops=top;
    this.setData({
      tops: top
    })

  },
  // 名片夹--定位
  touchstart(e) {
    var ztop = this.data.tops;
    var id = e.currentTarget.id;
    // var top = e.touches[0].pageY;
    // var tops = this.data.tops;
    // console.log(e.currentTarget.offsetTop)
    // 点击时获得点击在盒子里的位置
    var top = e.touches[0].pageY;
    var ftop = e.currentTarget.offsetTop;
    var topd = top - ftop;
    console.log(topd)

    this.setData({
      ztop: ztop,
      tid: id,
      topd: topd
    })
    // console.log(this.data.ztop)
    console.log(this.data.tid)
    console.log(e)
  },
  touchmove(e) {
  
    // 滑动进行
    // console.log(e)
    var tops = this.data.tops;
    var top = e.touches[0].pageY;
    var id = this.data.tid;
    for (var i in tops){
      if (tops[i]>1){
        
      }
    }
    // var ftop = e.currentTarget.offsetTop;
    var topd = this.data.topd;
    top = top - topd;
    // console.log(topd)
    console.log('')
    console.log(top)
    // if (top <= tops[id - 1] + 50 || top <= 0) {
    //   console.log("return ")
    //   return;
    // }
    // 改变
    tops[id] = top;
    this.setData({ tops })
    // console.log(top)
    // console.log(e)
    // console.log(e.currentTarget.offsetTop)
  },
  touchend(e) {
    // 滑动结束
    // console.log(e)
  },
  // 名片夹--定位

  // 点击拨打电话的函数
  phone(e) {
    var phone = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  // 用户分享
  onShareAppMessage() {
    return {
      title: '版图-最具人气的名片交互!',
      desc: '最具人气的名片交互!',
      path: '/pages/index/index'
    }
  }
})