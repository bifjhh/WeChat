var app = getApp()
function userinfo(that) {
  wx.getUserInfo({
    success: function (res) {
      console.log(res.encryptedData)
      var userInfo = res.userInfo
      var user_nickname = userInfo.nickName
      var user_deptpic = userInfo.avatarUrl
      var user_gender = userInfo.gender //性别 0：未知、1：男、2：女
      var user_province = userInfo.province
      var user_city = userInfo.city
      var user_country = userInfo.country
      var encryptedData = res.encryptedData
      var iv = res.iv
      var user_phonebrand = that.data.user_phonebrand
      var user_phonemodel = that.data.user_phonemodel
      var user_wxversion = that.data.user_wxversion
            /*
      private String user_pixelRatio;//	设备像素比
      private String user_screenWidth;//	屏幕宽度	1.1.0
      private String user_screenHeight;//	屏幕高度	1.1.0
      private String user_windowWidth;//	可使用窗口宽度
      private String user_windowHeight;//	可使用窗口高度
      private String user_language;//	微信设置的语言
      private String user_system;//	操作系统版本
      private String user_platform;//	客户端平台
      private String user_fontSizeSetting;//	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px	1.5.0
      private String user_SDKVersion;//
      
      */
      var user_pixelRatio = that.data.user_pixelRatio
      var user_screenWidth = that.data.user_screenWidth
      var user_screenHeight = that.data.user_screenHeight
      var user_windowWidth = that.data.user_windowWidth
      var user_windowHeight = that.data.user_windowHeight
      var user_language = that.data.user_language

      var user_platform = that.data.user_platform
      var user_system = that.data.user_system
      var user_fontSizeSetting = that.data.user_fontSizeSetting
      var user_SDKVersion = that.data.user_SDKVersion
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
      })
      wx.login({
        success: function (res) {
          console.log(res)
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.data.url + '/wxuser/login',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                user_nickname: user_nickname,
                user_deptpic: user_deptpic,
                user_gender: user_gender,
                user_province: user_province,
                user_city: user_city,
                user_country: user_country,
                user_phonebrand: user_phonebrand,
                user_phonemodel: user_phonemodel,
                user_wxversion: user_wxversion,
      
                user_pixelRatio: user_pixelRatio,
                user_screenWidth: user_screenWidth,
                user_screenHeight: user_screenHeight,
                user_windowWidth: user_windowWidth,
                user_windowHeight: user_windowHeight,
                user_language: user_language,

                user_system: user_system,
                user_platform: user_platform,
                user_fontSizeSetting: user_fontSizeSetting,
                user_SDKVersion: user_SDKVersion,
                appid: "wxc7e6e91df796cd7f",
                secret: "e2b091fd7a999862d7e24b7f96ef10df",
                code: res.code,
                encryptedData: encryptedData,
                iv:iv
              },
              success: function (result) {
                console.log(result);
                that.setData({
                  userid: result.data.resObject.userid
                });
                // 将userid存下来
                wx.setStorage({
                  key: "userid",
                  data: result.data.resObject.userid,
                  success: function () {
                    let ret = result.data.resObject.ret
                    if (ret===1) {
                      wx.setStorage({
                        key: 'cardid',
                        data: result.data.resObject.mycard[0].mycard_cardid,
                        success: function () {
                          wx.hideLoading()
                          that.setData({
                            no_mycard0: "none",
                            no_mycard1: "block",
                            list: result.data.resObject.mycard,
                            load_hide: "none"
                          })
                        }
                      })
                    } else if(ret===0) {
                      that.setData({
                        no_mycard0: "block",
                        no_mycard1: "none",
                        load_hide: "none"
                      })
                      wx.hideLoading()
                    }else{
                      wx.login({
                        success: function (res) {
                          console.log(res)
                          if (res.code) {
                            //发起网络请求
                            wx.request({
                              url: app.data.url + '/wxuser/login',
                              header: {
                                "content-type": "application/x-www-form-urlencoded"
                              },
                              method: "POST",
                              data: {
                                user_nickname: user_nickname,
                                user_deptpic: user_deptpic,
                                user_gender: user_gender,
                                user_province: user_province,
                                user_city: user_city,
                                user_country: user_country,
                                user_phonebrand: user_phonebrand,
                                user_phonemodel: user_phonemodel,
                                user_wxversion: user_wxversion,

                                user_pixelRatio: user_pixelRatio,
                                user_screenWidth: user_screenWidth,
                                user_screenHeight: user_screenHeight,
                                user_windowWidth: user_windowWidth,
                                user_windowHeight: user_windowHeight,
                                user_language: user_language,

                                user_system: user_system,
                                user_platform: user_platform,
                                user_fontSizeSetting: user_fontSizeSetting,
                                user_SDKVersion: user_SDKVersion,
                                appid: "wxc7e6e91df796cd7f",
                                secret: "e2b091fd7a999862d7e24b7f96ef10df",
                                code: res.code,
                                encryptedData: encryptedData,
                                iv: iv
                              },
                              success: function (result) {
                                console.log(result);
                                that.setData({
                                  userid: result.data.resObject.userid
                                });
                                // 将userid存下来
                                wx.setStorage({
                                  key: "userid",
                                  data: result.data.resObject.userid,
                                  success: function () {
                                    let ret = result.data.resObject.ret
                                    if (ret === 1) {
                                      wx.setStorage({
                                        key: 'cardid',
                                        data: result.data.resObject.mycard[0].mycard_cardid,
                                        success: function () {
                                          wx.hideLoading()
                                          that.setData({
                                            no_mycard0: "none",
                                            no_mycard1: "block",
                                            list: result.data.resObject.mycard,
                                            load_hide: "none"
                                          })
                                        }
                                      })
                                    } else if (ret === 0) {
                                      that.setData({
                                        no_mycard0: "block",
                                        no_mycard1: "none",
                                        load_hide: "none"
                                      })
                                      wx.hideLoading()
                                    } else {
                                      userinfo(that)
                                    }
                                  }
                                });
                              },
                              fail: function () {
                                // wx.showModal({
                                //   title: '用户未授权',
                                //   content: '如需正常使用小程序功能，请按确定并且在【我的】页面中点击授权按钮，勾选用户信息并点击确定。',
                                //   showCancel: false,
                                //   success: function (res) {
                                //     if (res.confirm) {
                                //       console.log('用户点击确定')
                                //     }
                                //   }
                                // })
                              }
                            })
                          }
                        }

                      })
                    }
                  }
                });
              },
              fail: function () {
                // wx.showModal({
                //   title: '用户未授权',
                //   content: '如需正常使用小程序功能，请按确定并且在【我的】页面中点击授权按钮，勾选用户信息并点击确定。',
                //   showCancel: false,
                //   success: function (res) {
                //     if (res.confirm) {
                //       console.log('用户点击确定')
                //     }
                //   }
                // })
              
               
            
              }
            })
          }
        }

      })
    },
    fail: function () {
      wx.getSetting({
        success(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {

          } else {
                wx.stopPullDownRefresh()
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '请授权版图名片使用用户信息，该操作仅仅会获取您的昵称和头像，请放心授权',
              showCancel: true,
              cancelText: '不想授权',
              cancelColor: '#000',
              confirmText: '去授权',
              confirmColor: '#6b594c',
              success: function (res) {
                console.log(res)
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting["scope.userInfo"] == true) {
                        wx.showLoading({
                          title: '加载中',
                        })
                        userinfo(that)
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
                  wx.hideLoading()
                }

              },
              fail: function (res) { },
              complete: function (res) { },
            })


          }
        }
      })
    }
  })
};
module.exports.userinfo = userinfo;