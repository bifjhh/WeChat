// pages/redact/redact.js
var match = require("../../common/match.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "",
    dshow: "none",
    hide: "",
    mycard_ismy: "",

    inputValue0: "",
    inputValue1: "",
    inputValue2: "",
    inputValue3: "",

    mycard_cardid: "",
    list: "",
    mycard_templateid: "",
    auto:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中...',
    });

    var that = this;
    console.log(options)
    console.log(options.data)
    if (options.data != undefined) {
      var item = JSON.parse(options.data);
      console.log(item.resObject)
      this.setData({
        item: options.data,
        inputValue3: item.resObject.mycard_companyname,
        inputValue0: item.resObject.mycard_name,
        inputValue1: item.resObject.mycard_position,
        inputValue2: item.resObject.mycard_mobile,
        mycard_cardid: options.mycard_cardid,
        mycard_ismy: options.mycard_ismy,
        now_page: 1,
        all_page: 6
      })
      setTimeout(function () {
        wx.hideLoading();
        that.setData({ dshow: 'block' })
      }, 1000)
    } else if (options.mycard_cardid != undefined) {
        this.setData({
          mycard_cardid: options.mycard_cardid,
          mycard_ismy: options.mycard_ismy,
          now_page: 1,
          all_page:6,
          
          interval: "100"
        });
        var cardid = options.mycard_cardid;
        wx.getStorage({
          key: 'userid',
          success: function (res) {
            var data = {}
            data.mycard_cardid = cardid;
            data.mycard_uid = res.data
            wx.request({
              url: app.data.url + "/Mycard/getCardBycardId",
              data: data,
              success(res) {
                console.log(res)
                // wx.hideLoading();
                that.setData({
                  inputValue3: res.data.resObject[0].mycard_companyname,
                  inputValue0: res.data.resObject[0].mycard_name,
                  inputValue1: res.data.resObject[0].mycard_position,
                  inputValue2: res.data.resObject[0].mycard_mobile,
                  mycard_templateid1: res.data.resObject[0].mycard_templateid,
                  auto: true,
                })
                setTimeout(function () {
                  wx.hideLoading();
                  that.setData({ dshow: 'block' })
                }, 1000)
              }, fail: function (res) {
                wx.hideLoading();
                wx.showModal({
                  title: '',
                  content: '请求失败',
                  showCancel: false,
                  success: function (res) {
                  }
                })
              }
            })
          },
        })

      } else {
        setTimeout(function () {
          wx.hideLoading();
          that.setData({ dshow: 'block' })
        }, 1000)
        this.setData({
          mycard_ismy: options.mycard_ismy,
          now_page: 1,
          all_page: 6
        })
      }

    



    var that = this
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          userid: res.data
        })
      }
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
  onUnload: function (options) {

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
  next: function () {
    // wx.getStorage({
    //   key: 'mycard_cardid',
    //   success: function(res){
    //     console.log(res.data)
    //     wx.navigateTo({
    //       url: '../more/more?id=1&mycard_cardid='+res.data
    //     })
    //   },
    // })

  },
  formSubmit: function (e) {

    var that = this;

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    var mycard_companyname = (e.detail.value.mycard_companyname).trim();//公司名称
    var mycard_mobile = (e.detail.value.mycard_mobile).trim();//手机号
    var mycard_name = (e.detail.value.mycard_name).trim();//姓名
    var mycard_position = (e.detail.value.mycard_position).trim();//公司职位
    var data = {};
    data.mycard_companyname = mycard_companyname;
    data.mycard_mobile = mycard_mobile;
    data.mycard_name = mycard_name;
    data.mycard_position = mycard_position;
    data.mycard_cardid = e.detail.value.mycard_cardid;
    data.mycard_ismy = e.detail.value.mycard_ismy;
    data.mycard_uid = e.detail.value.mycard_uid;
    var len = match.getByteLen(mycard_mobile)
    // console.log(len)
    console.log(mycard_mobile.substr(-13, 2))
    if (mycard_name == '') {
      wx.showToast({
        icon: "none",
        title: '姓名输入有误',
      })
    } else if (mycard_position == '') {
      wx.showToast({
        icon: "none",
        title: '职位输入有误',
      })
    } else if (mycard_mobile.substr(-11, 1) != 1 || len != 11) {
      wx.showToast({
        icon: "none",
        title: '手机输入有误',
      })
    } else if (mycard_companyname == "") {
      wx.showToast({
        icon: "none",
        title: '公司名称输入有误',
      })
    } else {
      that.setData({
        disable: true,
      })
      setTimeout(function(){
        that.setData({
          disable: false,
        })
      },500)
      var cardid = that.data.mycard_cardid;
      console.log(cardid)
      wx.setStorage({
        key: 'next_form',
        data: data,
        success: function () {
          wx.navigateTo({
            url: '../more/more?mycard_ismy=' + that.data.mycard_ismy + '&mycard_cardid=' + cardid + '&mycard_templateid=' + that.data.mycard_templateid + "&item=" + that.data.item
          })
        }
      })
      // wx.request({
      //   url: app.data.url + "/Mycard/addMyCard",
      //   header: { "content-type": "application/x-www-form-urlencoded" },
      //   method: "POST",
      //   data: data,
      //   success: function (result) {
      //     that.setData({
      //       butdis2: "none",
      //       butdis1: "block"
      //     })
      //     console.log(result)
      //     if (result.data.resObject!= "") {
      //       that.setData({
      //         mycard_cardid: result.data.resObject
      //       })
      //       wx.navigateTo({
      //         url: '../more/more?id=1&mycard_cardid=' + result.data.resObject
      //       })
      //     }
      //   },
      //   fail:function(){
      //     that.setData({
      //       butdis2: "none",
      //       butdis1: "block"
      //     })
      //   }
      // })
    }

  },
  bindKeyInput0: function (e) {
    this.setData({
      inputValue0: e.detail.value
    })
  },
  bindKeyInput1: function (e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      inputValue3: e.detail.value
    })
  },
  change: function (e) {
    this.setData({
      mycard_templateid: e.detail.current,
      now_page: e.detail.current + 1
    })

    // console.log(e)
    var mycard_templateid1 = this.data.mycard_templateid1;
    console.log(mycard_templateid1 + 1)
    if (e.detail.current === Number(mycard_templateid1)) {
      console.log(e.detail.current)
      this.setData({
        auto: false,
      })
    }
  }
})