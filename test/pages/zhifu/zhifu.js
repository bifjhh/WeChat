// pages/zhifu/zhifu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /* zhifu(){
    console.log("支付");
    var timestamp = Date.parse(new Date()) / 1000+'';
    console.log(timestamp);
    wx.requestPayment({
      'timeStamp': timestamp,//当前时间戳
      'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS', //随机字符串，长度为32个字符以下。
      'package': 'prepay_id=wx2017033010242291fcfe0db70013231072', //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
      'signType': 'MD5',//签名算法，暂支持 MD5
      'paySign': '',//签名,具体签名方案参见小程序支付接口文档;
      'success': function (res) {
        console.log('成功')
      },//签名,具体签名方案参见小程序支付接口文档;
      'fail': function (res) {
        console.log('失败')
      }//接口调用失败的回调函数
    })
  }, */
  zhifu(){
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          wx.request({
            url: 'http://172.20.10.14:8080/bantu/wxuser/login',
            data: {
              appid: 'wx942a74c19e682464',
              code: res.code,
              secret: '5dc91c6b4c234e6c90436f5f5d0043e5'
            },
            success: function (res) {
              console.log(res.data)
            }
          }) 
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

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