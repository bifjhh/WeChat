const fetch =require('../../utils/fetch');

Page({
  data:{
    shop:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetch(`shops/${options.item}`)
    .then(res=>{
      this.setData({shop:res.data})
      wx.setNavigationBarTitle({title: res.data.name})
    })
  },
  // 预览图片。
  previewHandle(e){
    console.log(e);
    wx.previewImage({
      current:e.target.dataset.src,
      urls:this.data.shop.images
    })
  }
})