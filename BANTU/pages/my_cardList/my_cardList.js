// pages/my_cardList/my_cardList.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:"",
    off: true,
    no_mycard0: "none", //没有名片
    no_mycard1: "none", //有名片
    add_me_way: -626,
    add_my:"none"
  },
  add_my: function () {
    var that = this;
    that.setData({
      add_me_way: -626,
      add_my: "none"
    })
  },
  close: function () {
    var that = this;
    that.setData({
      add_me_way: -626,
      add_my: "none"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
    var that=this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        console.log(res.data)
        var userid = res.data;
        console.log(userid)
        wx.request({
          url: app.data.url+"/Mycard/getMycardByUid",
          header: { "content-type": "application/x-www-form-urlencoded" },
          method: "POST",
          data:{
            mycard_uid : userid
          },
          success:function(res){
            wx.hideLoading()
            console.log(res)
            if (res.data.resObject){
              that.setData({
                no_mycard0: "none",
                no_mycard1: "block",
                list: res.data.resObject
              })
              wx.hideLoading()
            }else{
              that.setData({
                no_mycard0: "block",
                no_mycard1: "none",
              })
              wx.hideLoading()
            }
          
          }
        })
      }
    })

  },
  add_card: function (e) {
    // console.log(e)

    var that = this;
    that.setData({
      add_me_way: 666,
      add_my: "block"  
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  saomiao: function (e) {
    console.log(e.currentTarget.dataset.ismy)
    var mycard_ismy = e.currentTarget.dataset.ismy
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '正在扫描',
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var paths = res.tempFilePaths[0];
        console.log(paths)
        wx.getStorage({
          key: 'userid',
          success: function (res) {
            console.log(res.data)
            console.log(paths)
            wx.uploadFile({
              url: app.data.url + '/bantuOCR/getTextByOrc', //仅为示例，非真实的接口地址
              filePath: paths,
              name: 'pic',
              formData: {
                'mycard_uid': res.data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {


                  // console.log(JSON.parse(res.data))
                  var data = res.data;
                  wx.navigateTo({
                    url: '../redact/redact?data=' + data + "&mycard_ismy=" + mycard_ismy,
                  })
                } else if (res.statusCode == 500) {
                  wx.hideLoading()
                  wx.showModal({
                    title: '扫描失败',
                    // content: '',
                  })
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          },

        })
      }
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
    var that=this;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType != "none") {
          wx.getStorage({
            key: 'userid',
            success: function (res) {
              console.log(res.data)
              var userid = res.data;
              console.log(userid)
              wx.request({
                url: app.data.url + "/Mycard/getMycardByUid",
                header: { "content-type": "application/x-www-form-urlencoded" },
                method: "POST",
                data: {
                  mycard_uid: userid
                },
                success: function (res) {
                  wx.stopPullDownRefresh()
                  console.log(res)
                  that.setData({
                    list: res.data.resObject
                  })
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '网络异常刷新重试',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
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
  detail:function(e){
    var that = this;
    if (that.data.off) {
      console.log('状态正常---');
      var cardId = e.currentTarget.dataset.card;
      wx.navigateTo({
        url: '../details/details?cardid=' + e.currentTarget.dataset.cardid,
      })
      that.setData({
        off: !that.data.off
      })
      setTimeout(function () {
        console.log('状态恢复');
        that.setData({
          off: true
        })
      }, 800)
    } else {
      console.log("阻止状态");
      setTimeout(function () {
        console.log('状态恢复');
        that.setData({
          off: true
        })
      }, 800)
    }
    console.log(e.currentTarget.dataset.cardid)
    
  }
})