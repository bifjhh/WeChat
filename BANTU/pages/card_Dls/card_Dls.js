// pages/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    details: "",
    cardid: "",
    mycard_ismy: "",
    mycard_iscompile: 0,
    user_card: {},
    ifshow: 0,
    dshow: 'none',
    item: {},
    formId: '',
    getUid: '',
    SystemInfo: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var off = false;

    var user_card = {};
    user_card.mycard_cardid = options.cardid;
    user_card.mycard_uid = options.userId;

    that.setData({
      user_card,
      formId: 0,//暂时无法获取,写死/待到后期可以更改获取
      getUid: options.userId,
      cardid: options.cardid
    });
    console.log(options);
    console.log('页面加载时输出');
    wx.showLoading({
      title: '加载中...',
    });
    // 获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          SystemInfo: res,
        })
      }
    });

    // 获取本地自己的userID
    wx.getStorage({
      key: "userid",
      success: function (res) {
        console.log('用户已经注册');
        console.log(res.data); 
        that.setData({
          userid: res.data
        });
        off = true;
        that.isoff(true);
      },
      fail: function (res) {
        off = false;
        console.log('用户还没有注册');
        that.userInfo(that);
      }
    });
    console.log('that.data.userid')
  },
  /**
   * 新用户注册
   * @param {object} that -传入全局的this 
   */
  userInfo(that) {
    console.log('调用了userInfo');
    // var userInfo = '';
    wx.login({
      success: function (res) {
        console.log('获取code授权成功' + res.code) //获取code授权
        var code = res.code;
        if (res.code) {
          // 调用获取用户信息
          wx.getUserInfo({
            success: function (res) {
              var SystemInfo = that.data.SystemInfo;
              console.log('获取个人信息') //获取个人信息
              console.log(res.userInfo) //获取个人信息
              var userIfo = res.userInfo;
              // console.log(app.data.url + '/wxuser/login');
              wx.request({
                url: app.data.url + '/wxuser/login',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                  appid: "wxc7e6e91df796cd7f",
                  secret: "e2b091fd7a999862d7e24b7f96ef10df",
                  code: code,
                  user_nickname: userIfo.nickName,
                  user_gender: userIfo.gender,
                  user_province: userIfo.province,
                  user_city: userIfo.city,
                  user_country: userIfo.country,
                  user_deptpic: userIfo.avatarUrl,
                  user_phonebrand: SystemInfo.brand,
                  user_phonemodel: SystemInfo.model,
                  user_wxversion: SystemInfo.version,
                  user_pixelRatio: SystemInfo.pixelRatio,
                  user_screenWidth: SystemInfo.screenWidth,
                  user_screenHeight: SystemInfo.screenHeight,
                  user_windowWidth: SystemInfo.windowWidth,
                  user_windowHeight: SystemInfo.windowHeight,
                  user_language: SystemInfo.language,
                  user_system: SystemInfo.system,
                  user_platform: SystemInfo.platform,
                  user_fontSizeSetting: SystemInfo.fontSizeSetting,
                  user_SDKVersion: SystemInfo.SDKVersion,
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                },
                success: function (res) {
                  console.log('用户注册成功');
                  console.log(res); //注册成功的回调
                  wx.setStorage({
                    key: "userid",
                    data: res.data.resObject.userid
                  });
                  if (res.data.resObject) {
                    that.setData({
                      userid: res.data.resObject.userid
                    });
                    that.isoff(true);
                  }

                },
                fail: function (res) {
                  wx.hideLoading();
                  wx.showModal({
                    title: '',
                    content: '获取用户信息失败',
                    showCancel: false,

                  })
                }
              });
            },
            fail: function (res) {
              console.log('用户没有授权');
              // 调用设置窗口
              wx.getSetting({
                success(res) {
                  console.log(res)
                  if (!res.authSetting['scope.userInfo']) {
                    wx.hideLoading()
                    wx.showModal({
                      title: '',
                      content: '请授权版图名片使用用户信息，该操作仅仅会获取您的昵称和头像，请放心授权',
                      showCancel: true,
                      cancelText: '不想授权',
                      cancelColor: '#000',
                      confirmText: '去授权',
                      confirmColor: '#6b594c',
                      success: function (res) {
                        console.log(res)
                        if (res.confirm) { //res.confirm 用户是否点击去授权
                          wx.openSetting({
                            success: (res) => {
                              console.log('用户允许授权回来');
                              console.log(res);
                              console.log(res.authSetting["scope.userInfo"]);
                              if (res.authSetting["scope.userInfo"]) {
                                console.log('加载中');
                                wx.showLoading({
                                  title: '加载中',
                                })
                                that.userInfo(that)
                                // userinfo.userinfo(that);
                              } else {
                                wx.showToast({
                                  title: '您拒绝了授权',
                                  icon: "none"
                                })
                              }
                            }
                          })
                        } else {
                          wx.hideLoading();
                          console.log('用户拒绝授权');
                        }
                      },
                      fail: function (res) {
                        console.log('用户拒绝授权');
                      }
                    })
                  }
                }
              })
              return;
            }
          });
          //发起网络请求
        }
      },
      fail: function (res) {
        wx.hideLoading();
        console.log('授权失败');
        return;
      }

    });

  },
  /**
   * 获取按钮是否显示的函数
   * @param {object} that -传入全局的this 
   */
  cardShow(that) {
    console.log('cardShow');
    if (that.data.userid) {
      console.log('获取自己的userid成功');
      console.log(that.data.userid)
      var udata = {}
      udata.mycard_cardid = that.data.cardid;
      udata.mycard_uid = that.data.userid;
      wx.request({
        url: app.data.url + '/Mycard/getShareCardBycardId',
        data: udata,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log('获取名片夹是否已经有这张名片成功')
          console.log(res)
          console.log(res.data)
          that.setData({
            ifshow: res.data.resObject,
          })

          setTimeout(function () {
            wx.hideLoading();
            that.setData({
              dshow: 'block'
            });
            if (res.data.resObject == 1) {
              wx.showToast({
                title: '已保存此名片',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          }, 1000)
        },
        fail: function (res) {
          console.log('获取名片夹是否已经有这张名片---失败') //报错
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: '网络请求失败',
            showCancel: false,
          })
        }
      })
    }
  },
  isoff(off) {
    var that = this;
    if (off) {
      console.log(off);
      console.log(that.data.userid);
      var user_card = that.data.user_card;
      // 获取别人的名片信息
      wx.request({
        url: app.data.url + "/Mycard/getCardBycardId",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: user_card,
        success: function (res) {
          if (res.data.res.resCode == 200) {
            console.log('获取传入的名片信息成功')
            console.log(res.data.resObject[0].mycard_templateid); //获取传入的名片信息
            that.setData({
              item: res.data.resObject[0]
            });
            console.log(that.data.item)
            that.cardShow(that); //请求信息完成后再获取
          } else {
            wx.hideLoading();
            wx.showModal({
              title: '',
              content: '此名片已被删除',
              showCancel: false,
              success: function (res) {}
            })
          }
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: '网络请求失败',
            showCancel: false,
          })
        }
      });
    };
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  /**
   * 保存到名片夹
   */
  addCard() {
    var that = this;
    console.log('addCard');
    console.log(that);
    console.log(that.data.userid);
    if (that.data.userid) {
      {
        var data = {}
        data.cardcase_cardid = that.data.cardid;
        data.cardcase_uid = that.data.userid;
        data.user_uid = that.data.getUid;
        data.user_form_id = that.data.formId;
        var url = app.data.url + '/Mycard/addCardcaseTwo';
        wx.request({
          url: url,
          data: data,
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000,
              success: function (res) {
                setTimeout(function () {
                  //要延时执行的代码  
                  wx.reLaunch({
                    url: '/pages/add/add',
                    success: function (res) {
                      // console.log(res)
                      console.log('接口调用成功')
                    }
                  });
                }, 1000) //延迟时间 这里是1秒  
              },
              fail: function (res) {
                // console.log(res)//报错
                setTimeout(function () {
                  wx.showToast({
                    title: "网络超时请重试",
                    duration: 2000
                  })
                }, 2000)
              }
            });
          }
        })
      }
    }

  },
  navadd() {
    var that = this;
    console.log('已保存的跳转')
    wx.reLaunch({
      url: '/pages/add/add',
    })
  },
})