// pages/add/add.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list: [], //用来存储名片夹列表数据
    imgSrc: '', // 名片码
    userid: '',
    show: 'none',
    dshow: 'none',
    off: true,
    formId: '',
    ispull: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    });
    var _this = this;
    _this.cardcase(_this);
  },

  // 名片夹点击跳转函数
  nav_card(e) {
    var that = this;
    if (that.data.off) {
      console.log('状态正常---');
      var cardId = e.currentTarget.dataset.card;
      wx.navigateTo({
        url: '/pages/waitSet/waitSet?cardid=' + cardId
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

  },

  /**
   * 封装获取名片夹列表数据函数
   * @param {object} _this -传入全局的this
   */
  cardcase(_this) {
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        console.log('获取user');
        var userid = res.data;
        _this.setData({
          userid
        })
        console.log(userid);
        wx.request({
          url: app.data.url + '/Mycard/getAwaitAddCard',
          data: {
            mycard_uid: userid
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (res) {
            console.log('获取列表成功');
            console.log(res)
            if (res.data.resObject) {
              console.log('有');
              _this.setData({
                card_list: res.data.resObject
              });
              wx.stopPullDownRefresh();
              wx.hideLoading();
              setTimeout(function () {
                _this.setData({
                  dshow: 'block'
                })
              }, 200);

            } else {
              console.log('还没有名片')
              wx.hideLoading();
              wx.stopPullDownRefresh();
              _this.setData({
                show: 'block',
                dshow: 'block'
              })
            }
          },
          fail: function (res) {
            wx.stopPullDownRefresh();
            wx.hideLoading();
            wx.showModal({
              title: '',
              content: '网络请求失败',
              showCancel: false,
              success: function (res) {
                _that.setData({
                  dshow: 'block'
                });
              }
            })
          }
        });
      },
      fail: function (res) {
        wx.stopPullDownRefresh();
        wx.hideLoading();
        wx.showModal({
          title: '',
          content: '网络请求失败',
          showCancel: false,
          success: function (res) {
            _that.setData({
              dshow: 'block'
            });
          }
        })
      }
    })

  },

  /**
   * 封装点击接受的函数
   * 
   */
  addCard() {
    var that = this;
    wx.request({
      url: app.data.url + '/Mycard/saveAwaitAddCard',
      data: {
        data: that.data.waitData
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        console.log('保存成功');
        console.log(res);
      },
      fail: function (err) {
        that.failShowModal(that);
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  // 点击拨打电话的函数
  phone(e) {
    let phone = e.target.dataset.phone;
    console.log('---phone---');
    wx.getSystemInfo({
      success: function (res) {
        let system = res.system.slice(0, 3);
        if (system == 'iOS') {
          wx.makePhoneCall({
            phoneNumber: phone
          })
        } else {
          wx.showActionSheet({
            itemList: ['拨打电话'],
            success: function (res) {
              wx.makePhoneCall({
                phoneNumber: phone
              })
            }
          })
        }
      }
    })
  },
  // 长按删除函数
  del(e) {
    let that = this;
    let name = e.currentTarget.dataset.info.mycard_name;
    var cardcase = {};
    cardcase.cardcase_uid = that.data.userid;
    cardcase.cardcase_cardid = e.currentTarget.dataset.info.mycard_cardid;
    console.log(cardcase);
    // return;
    setTimeout(function () {
      wx.showModal({
        title: '',
        content: '是否删除' + name + '的名片',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.request({
              url: app.data.url + '/Mycard/delete',
              data: cardcase,
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res);
                that.cardcase(that);
                console.log('删除完成');
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }, 200);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    return {
      title: '版图-最具人气的名片交互!',
      desc: '最具人气的名片交互!',
      path: '/pages/add/add',
    }
  },


  /*
    下拉刷新
  */
  onPullDownRefresh: function () {
    var _this = this;
    var ispull = _this.data.ispull;
    if (ispull) {
      _this.cardcase(_this);
    } else {
      wx.stopPullDownRefresh();
    }
  },

  move: function () {}
})
/* 
域名隐私
不能涉及人名称
备注 此网站为个人内容，内容为
*/