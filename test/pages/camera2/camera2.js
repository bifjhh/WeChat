//index.js  
Page({

  /**  
   * 页面的初始数据  
   */
  data: {

  }, 
  takePhoto() {
    console.log('执行了takePhoto')
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log('调用了error')
    console.log(e.detail)
  },

  /**  
   * 生命周期函数--监听页面加载  
   */
  onLoad: function (options) {

  },

  /**  
   * 生命周期函数--监听页面初次渲染完成  
   */
  onReady: function (res) {
    if (wx.createCameraContext()) {
      this.cameraContext = wx.createCameraContext('myCamera')
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示  
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }


  },
  startTakePhoto: function () {
    this.cameraContext.takePhoto({

    })
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

  },
  pause: function () {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})