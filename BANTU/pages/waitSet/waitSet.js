// pages/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: "",
    cardid: "",
    user_card: {},
    dshow: 'none',
    userid: '',
    waitData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '加载中'});
    var that = this;
    console.log('页面加载时输出');
    console.log(options.cardid);
    var cardid = options.cardid;
    that.setData({cardid});
    // that.getInfo(that);
    wx.getStorage({
      key: 'userid', //获取userid
      success: function (res) {
        var data = {}
        data.mycard_cardid = cardid;
        data.mycard_uid = res.data;
        var waitData = {};
        waitData.cardcase_uid = res.data; //  用户id
        waitData.cardcase_cardid = cardid; // 名片id
        that.setData({userid: res.data, waitData});

        wx.request({ //请求名片信息
          url: app.data.url + "/Mycard/getCardBycardId",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: data,
          success: function (res) {
            console.log('请求名片信息');
            console.log(res);
            if (res.statusCode == 500) {
              console.log('网络错误，请稍后再试' + res.statusCode);
              that.failShowModal(that);
            } else {
              var mycard_ismy = res.data.resObject[0].mycard_ismy;
              that.setData({ //将请求到的信息注册到 page.data 内
                item: res.data.resObject[0]
              });
              that.setData({dshow: 'block'});
              wx.hideLoading()
            }
          },
          fail: function (res) {
            wx.hideLoading()
            that.failShowModal(that);
          }
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.getInfo(that);
  },

  addCard() {
    wx.showLoading({title: '加载中'});

    var that = this;
    console.log(that.data.waitData);
    var cardcase_uid = that.data.waitData.cardcase_uid; //  用户id
    var cardcase_cardid = that.data.waitData.cardcase_cardid; // 名片id
    var that = this;
    wx.request({
      url: app.data.url + '/Mycard/saveAwaitAddCard',
      data: {
        cardcase_uid: cardcase_uid,
        cardcase_cardid: cardcase_cardid
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        console.log('保存成功');
        console.log(res);
        setTimeout(function () {
          wx.hideLoading();
          wx.reLaunch({url: '/pages/add/add'});
        }, 1000);
      },
      fail: function (err) {
        that.failShowModal(that);
      }
    })
  },
  del_card() {
    wx.showLoading({title: '加载中'});

    var that = this;
    console.log(that.data.waitData);
    var cardcase_uid = that.data.waitData.cardcase_uid; //  用户id
    var cardcase_cardid = that.data.waitData.cardcase_cardid; // 名片id
    wx.request({
      url: app.data.url + '/Mycard/deleteAwaitAddCard',
      data: {
        cardcase_uid: cardcase_uid,
        cardcase_cardid: cardcase_cardid
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        console.log('删除成功');
        console.log(res);
        setTimeout(function () {
          wx.hideLoading();
          wx.reLaunch({url: '/pages/add/add'});
        }, 1000);
      },
      fail: function (err) {
        that.failShowModal(that);
      }
    })
  },

  /**
   * 显示网络请求失败的函数
   * @param {this} that 传入包含 this 参数的 变量
   */
  failShowModal(that) {
    wx.showModal({
      title: '',
      content: '网络请求失败',
      showCancel: false,
      success: function (res) {
        that.setData({dshow: 'block'});
      }
    })
  }
})