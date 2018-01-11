// pages/hd/hd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    distance:400,
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [];
    for(var i = 0; i<20;i++){
      list.push(i);
    }
    this.setData({

      list
    })
  },

  cardTouchStart(e){
    console.log(e)
  },
  cardTouchMove(e){
    // console.log(e)
  },
  cardTouchEnd(e){
    // console.log(e)
  },
  scroll(e){
    console.log(e)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})