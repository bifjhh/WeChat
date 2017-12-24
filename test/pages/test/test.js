// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // scan(){
  //   wx.scanCode({
  //     success: (res) => {
  //       console.log(res)
  //     }
  //   })
  // },
  scan(){
    wx.login({
      success: function (res) {
        console.log(res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              secret: "5dc91c6b4c234e6c90436f5f5d0043e5",
              js_code: res.code, 
              grant_type: "authorization_code"
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
             success: function (data) {
              console.log(data.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  post(){
    wx.request({
      url: 'http://192.168.1.5:8080/Maven_Proje/dept/getSessionKeyOropenid', //仅为示例，并非真实的接口地址
      data: {
        nickName: "我问问",
        avatarUrl: "avatarUrl",
        gender: "gender",
        province: "province",
        city: "city",
        country: "country"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method:"POST",
      success: function (res) {
        console.log(res.data.aaa)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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