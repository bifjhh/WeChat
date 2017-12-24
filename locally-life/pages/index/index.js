// 导入请求工具
const fetch = require('../../utils/fetch.js');

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: []
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图数据
      fetch('slides').then((res)=>{
        this.setData({ slides: res.data});
      })

    // 请求分类功能列表数据
    fetch('categories').then((res) => {
      this.setData({ categories: res.data });
    })

    // wx.request({
    //     url:'https://api.douban.com/v2/movie/coming_soon',
    //     header:{
    //       'Content-Type':'json'
    //     },
    //     success: function(res) {
    //       console.log(res)
    //     }
    //     // 发送异步请求不再是WEB那套AJAX
    //     // 客户端开发  是没有跨域的
    //     // 请求的地址必须在管理后台添加白名单
    //     // 请求的域名必须备案，服务端必须采用HTTPS

    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})