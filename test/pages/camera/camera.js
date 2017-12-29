Page({
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
  }
})