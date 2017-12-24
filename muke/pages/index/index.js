Page({
  data:{
    src:''
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        console.log(this.data.src)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})