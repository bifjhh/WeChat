// pages/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: "",
    cardid: "",
    mycard_ismy: "",
    mycard_iscompile: "",
    user_card: {},
    dshow: 'none',
    sendShow: 'block',
    banShow: 'none',
    originUid: '',
    uid: '',
    myCid: '',
    sendOff: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '加载中'});
    var that = this;
    console.log('页面加载时输出');
    console.log(options.cardid);

    that.setData({ //获取名片的cardId
      cardid: options.cardid
    });
    that.getInfo(that);
  },

  /**
   * 封装请求名片信息函数
   */
  getInfo(that) {
    let cardid = that.data.cardid;
    wx.getStorage({
      key: 'userid', //获取userid
      success: function (res) {
        var data = {}
        data.mycard_cardid = cardid;
        data.mycard_uid = res.data;
        /* --------设置删除实体-------- */
        var user_card = {};
        user_card.cardcase_uid = res.data;
        user_card.cardcase_cardid = cardid;
        that.setData({user_card, uid: res.data});
        /* --------设置删除实体-------- */

        wx.request({ //请求名片信息
          url: app.data.url + "/Mycard/getCardBycardId",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: data,
          success: function (res) {
            console.log(res);
            if (res.statusCode == 500) {
              console.log('网络错误，请稍后再试' + res.statusCode);
              that.failShowModal(that);
            } else {
              var mycard_ismy = res.data.resObject[0].mycard_ismy;
              var mycard_iscompile = res.data.resObject[0].mycard_iscompile;
              console.log('是否是我的名片---识别码为：' + mycard_ismy);
              console.log('是否是手动添加的--识别码为：' + mycard_iscompile);
              if (mycard_ismy == 1 || mycard_iscompile == 1) {
                that.setData({sendShow: 'none'});
              } else {
                that.origin(that, cardid);
              }
              that.setData({ //将请求到的信息注册到 page.data 内
                item: res.data.resObject[0],
                mycard_ismy,
                mycard_iscompile,
                dshow: 'block'
              });
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
   * 封装获取原始userID函数
   * @param {any} that
   */
  origin(that, cardid) {
    wx.request({
      url: app.data.url + "/Mycard/getPrimitiveUid",
      data: {
        cardcase_cardid: cardid
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log('我是origin');
        console.log(res);
        // console.log('我是origin---'+res.data.resObject);
        that.setData({originUid: res.data.resObject});
        that.getMycard(that);
      },
      fail: function (err) {
        // fail
      }
    })
  },

  /**
   * 根据用户UID获取用户自己的名片
   * @param {any} that
   */
  getMycard(that) {
    wx.request({
      url: app.data.url + "/Mycard/getMycardByUid",
      data: {
        mycard_uid: that.data.uid
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log('getMycard');
        var myCid = res.data.resObject[0].mycard_cardid;
        console.log(myCid);
        that.setData({myCid});
        that.banSend(that);
      },
      fail: function () {
        // fail
      }
    })
  },

  /**
   * 封装是否显示发送按钮
   */
  banSend(that) {
    var myCid = that.data.myCid;
    var originUid = that.data.originUid;
    wx.request({
      url: app.data.url + "/Mycard/getShareCardBycardId",
      data: {
        mycard_cardid: myCid,
        mycard_uid: originUid
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        console.log('是否显示发送按钮');
        console.log(res);
        if (res.data.resObject == 0) {
          that.setData({sendShow: 'block', banShow: 'none'});
        } else {
          that.setData({sendShow: 'none', banShow: 'block'});
        }
      },
      fail: function () {
        // fail
      }
    })
  },
  // 封装 发送给对方名片
  sendCard() {
    var that = this;
    console.log(that.data.sendOff);
    if (that.data.sendOff) {
      that.setData({
        sendOff: false
      })
      var addCard = {};
      addCard.cardcase_uid = that.data.originUid; //  用户id
      addCard.cardcase_cardid = that.data.myCid; // 名片id
      console.log(addCard);
      wx.request({
        url: app.data.url + "/Mycard/awaitAddCard",
        // data: {addCard:addCard},
        data: {
          cardcase_uid: that.data.originUid,
          cardcase_cardid: that.data.myCid
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          // success
          console.log('发送完成');
          console.log(res);
        },
        fail: function () {
          // fail
        }
      });
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.getInfo(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  // 点击拨打电话的函数
  phone(e) {
    let phone = e.target.dataset.phone;
    console.log('---phone---');
    wx.getSystemInfo({
      success: function (res) {
        let system = res
          .system
          .slice(0, 3);
        if (system == 'iOS') {
          wx.makePhoneCall({phoneNumber: phone})
        } else {
          wx.showActionSheet({
            itemList: ['拨打电话'],
            success: function (res) {
              wx.makePhoneCall({phoneNumber: phone})
            }
          })
        }
      }
    })
  },
  /**
   * 用户点击设置显示的名片
   */
  set_card: function () {
    var that = this;
    var item = that.data.item;
    var mycard_ismy = that.data.mycard_ismy;
    var mycard_iscompile = that.data.mycard_iscompile;
    console.log(mycard_ismy);
    console.log(mycard_iscompile);
    if (mycard_ismy == 1) {
      // 修改我的名片
      console.log('修改我的名片');
      wx.showActionSheet({
        itemList: [
          '添加到通讯录', '修改名片'
        ],
        success: function (e) {
          var n = e.tapIndex;
          console.log(e.tapIndex);
          if (n == 1) {
            wx.navigateTo({
              url: '../redact/redact?mycard_ismy=' + mycard_ismy + '&mycard_cardid=' + that.data.cardid
            })
          } else if (n == 0) {
            //  console.log(that.data.item);
            that.addContact(item);
          }
        }
      })
    } else if (mycard_ismy == 0) {
      console.log("修改名片夹里边别人的名片");
      // 修改名片夹里边别人的名片
      if (mycard_iscompile == 1) {
        wx.showActionSheet({
          itemList: [
            '添加到通讯录', '修改名片', '删除名片'
          ],
          success: function (e) {
            console.log(e);
            console.log('--');
            console.log(e.tapIndex);
            var n = e.tapIndex;
            if (n == 1) {
              // 修改
              wx.navigateTo({
                url: '../redact/redact?mycard_ismy=' + mycard_ismy + '&mycard_cardid=' + that.data.cardid
              })
            } else if (n == 0) {
              that.addContact(item);
            } else if (n == 2) {
              // 删除
              that.removeCard(that);
            } else {
              return;
            }
          }
        })
      } else {
        wx.showActionSheet({
          itemList: [
            '添加到通讯录', '删除名片'
          ],
          success: function (e) {
            console.log(e.tapIndex)
            var n = e.tapIndex;
            if (n == 1) {
              // 删除
              that.removeCard(that);
            } else if (n == 0) {
              that.addContact(item);
            } else {
              return;
            }
          }
        })
      }

    }

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
  },
  /**
   * 添加到名片夹函数
   * @param {object} item 传入获取的名片信息
   */
  addContact(item) {
    wx.addPhoneContact({
      firstName: item.mycard_name,
      mobilePhoneNumber: item.mycard_mobile,
      organization: item.mycard_companyname,
      title: item.mycard_position,
      hostNumber: item.mycard_phone,
      email: item.mycard_mail
    })
  },
  /**
   * 设置删除名片的函数
   * @param {this} that
   */
  removeCard(that) {
    wx.showModal({
      title: '',
      content: '确定删除这张名片',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // console.log(that.data.user_card);
          var user_card = that.data.user_card;
          wx.request({
            url: app.data.url + '/Mycard/delete',
            data: user_card,
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function (res) {
              console.log(res);
              console.log('删除完成');
              wx.showToast({
                title: '删除完成',
                icon: 'success',
                duration: 1000,
                success: function (res) {
                  setTimeout(function () {
                    //要延时执行的代码
                    wx.reLaunch({
                      url: '/pages/add/add',
                      success: function (res) {
                        console.log('接口调用成功');
                        console.log(res);
                      }
                    });
                  }, 1000) //延迟时间 这里是1秒
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})