// pages/couple/couple.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:"",
    loading:"",
    disable:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        num: 400,  
        // loading: false,
        disable: false
      })
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

  },
  formSubmit: function (e) {
    
    var that = this;
   
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if (e.detail.value.feedback_text !=""){
      wx.showLoading({
        title: '正在提交',
      })
      that.setData({
        // loading: true,
        disable: true
      })
      var data = {};
      var feedback_text = (e.detail.value.feedback_text);
      data.feedback_text = feedback_text;
      wx.getStorage({
        key: 'userid',
        success: function (res) {
          console.log(res.data)
          data.feedback_uid = res.data;
          wx.getNetworkType({
            success: function (res) {
              var networkType = res.networkType
              if (networkType == "none") {
                wx.hideLoading()
                wx.showModal({
                  title: '',
                  showCancel: false,
                  content: '网络异常',
                  success: function (res) {
                    if (res.confirm) {
                      // wx.hideLoading()
                      console.log('用户点击确定')
                      that.setData({
                        loading: false,
                        disable: false
                      })
                    }
                  }
                })

              } else {
                wx.showLoading({
                  title: '正在提交',
                })
                that.setData({
                  // loading: true,
                  disable: true
                })
                wx.request({
                  url: app.data.url+'/Feedback/add',
                  data: data,
                  method: 'POST',
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success: function (res) {
                    console.log(res);
                    if (res.data.res.resCode == '200') {
                      wx.hideLoading()
                      wx.showToast({
                        title: '反馈成功',
                        icon: 'success',
                        duration: 1000,
                        success: function (res) {
                         
                          setTimeout(function () {
                            //要延时执行的代码 
                            wx.navigateBack({
                              delta: 1, // 回退前 delta(默认为1) 页面
                              success: function (res) {
                                console.log(res)
                              }
                            })
                          }, 1000) //延迟时间 这里是1秒  

                        }
                      })
                    } else {
                      wx.showModal({
                        title: '',
                        showCancel: false,
                        content: '您当天反馈已经超过5次',
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                            that.setData({
                              loading: false,
                              disable: false
                            })
                          }
                        }
                      })
                      wx.hideLoading()
                    }

                  },
                  fail: function () {
                    wx.showModal({
                      title: '',
                      showCancel: false,
                      content: '提交失败',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                          that.setData({
                            loading: false,
                            disable: false
                          })
                        }
                      }
                    })
                  }
                });
              }
            },
          })


        },
      })
    }else{
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  auto:function(e){
    console.log(e.detail.cursor)
    if (e.detail.cursor!=""){
      var num = 400 - e.detail.cursor
      this.setData({
        num: num
      })
    }
    
  }
})