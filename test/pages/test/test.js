// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
 
  scan(){
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          // 发起网络请求
          /* wx.request({
            url: 'http://172.20.10.14:8080/bantu/wxuser/login',
            data: {
              appid:'wx942a74c19e682464',
              code: res.code,
              secret:'5dc91c6b4c234e6c90436f5f5d0043e5'
            },
            success: function (res) {
              console.log(res.data)
            }
          }) */
          wx.request({
            url: 'http://172.20.10.14:8080/bantu/wxuser/login',
            data: {
              appid:'wx942a74c19e682464', 
              secret:'5dc91c6b4c234e6c90436f5f5d0043e5', 
              code: res.code, 
              user_nickname:'Be the best version of you', 
              user_gender:'1', 
              user_province:'zh_CN', 
              user_city:'zh_CN', 
              user_country:'Iceland', 
              user_deptpic:'https://wx.qlogo.cn/mmopen/vi_32/J5ENfX2xwBfticEPdBbaxUn1EVEZVKl8M04SjLCddJiaXWbk7uzwZ29wyqibictFxdibobkbDu0Wp9LkZRmVq2uHSvg/0'
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
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
  post(){
    wx.request({
      url: 'http://172.20.10.14:8080/bantu/wxuser/getSessionKeyOropenid', //仅为示例，并非真实的接口地址
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
  ocr(){
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://172.20.10.14:8080/bantu/wxuser/addpic', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'pic',
          formData: {
            'user': 'test'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            // "Content-Type": "application/x-www-form-urlencoded"
            // "chartset": "utf-8" 
            // 'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            var data = res.data
          }
        })
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