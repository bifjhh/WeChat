// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: '',
    userId: '',
    imgUrl: '',
    "words_result": {}
  },

  scan() {
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          // 发起网络请求
          wx.request({
            /*  url: 'http://192.168.2.115:8080/bantu/wxuser/login',
                  data: {
                    appid:'wx942a74c19e682464',
                    code: res.code,
                    secret:'5dc91c6b4c234e6c90436f5f5d0043e5'
                  },
                  method: "POST",
                  success: function (res) {
                    console.log(res.data.openid)
                  }
          }) */

            // wx191.4
            url: 'http://192.168.2.115:8080/bantu/wxuser/login',
            data: {
              appid: 'wx942a74c19e682464',
              secret: '5dc91c6b4c234e6c90436f5f5d0043e5',
              code: res.code,
              user_nickname: 'Be the best version of you',
              user_gender: '2',
              user_province: 'zh_CN',
              user_city: 'zh_CN',
              user_country: 'Iceland',
              user_deptpic: 'https://wx.qlogo.cn/mmopen/vi_32/J5ENfX2xwBfticEPdBbaxUn1EVEZVKl8M04SjLCddJiaXWbk7uzwZ29wyqibictFxdibobkbDu0Wp9LkZRmVq2uHSvg/0'
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log(res.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  post() {
    wx.request({
      url: 'http://192.168.2.115:8080/bantu/wxuser/getSessionKeyOropenid', //仅为示例，并非真实的接口地址
      data: {
        nickName: "我问问",
        avatarUrl: "avatarUrl",
        gender: "gender",
        province: "province",
        city: "city",
        country: "country"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data.aaa)
      }
    })
  },
  ocr() {
    var _this = this;
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)//图片临时路径
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://192.168.2.115:8080/bantu/bantuOCR/getTextByOrc', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'pic',
          formData: {
            'user': 'test'
          },
          // header: {
          //   'content-type': 'application/x-www-form-urlencoded'
          //   // 'charset = utf - 8'
          //   // "Content-Type": "application/x-www-form-urlencoded"
          //   // "chartset": "utf-8" 
          //   // 'content-type': 'application/json'
          // }, 
          //  method: 'POST',
          success: function (res) {
            var data = JSON.parse(res.data).resObject;
            console.log(res)
            console.log(data)
            console.log(typeof data)
            // _this.setData({
            //   words_result: data
            // });
            // console.log(_this.data)
            // console.log(_this.data.words_resul)
          }
        })
      }
    })
  },
  /**
   * 1. 用户点击时向后台发送用户的code，获取openId并存储在本地缓存中
   * 2. 后端利用code向微信服务器进行统一下单，并获取预支付数据返回到前台
   * 3. 获取后台返回的数据，使用wx.requestPayment()方法发起支付请求
   */
  zhifu() {
    // return;
    var open = this.data.open;
    console.log(open)
    wx.request({
      url: 'http://192.168.2.115:8080/bantu/wxpaystwo/pre',
      data: {
        openid: open,
        appId: 'wx942a74c19e682464',
        total_fee: '20',
      },
      method: 'GET',
      success: res => {
        console.log(res.data);
        // console.log(this.doWxPay);
        this.doWxPay(res.data);
      }
    });
  },
  doWxPay(param) {
    //小程序发起微信支付
    wx.requestPayment({
      'timeStamp': param.timeStamp,
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': 'MD5',
      'paySign': param.paySign,
      'success': function (res) {
        console.log(res);
        console.log('调用成功')
      },
      'fail': function (res) {
        console.log(res);
        console.log('调用失败')
      }
    })
    /* wx.requestPayment({
      'timeStamp': param.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错，我这边在java后端包装成了字符串类型了  
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': 'MD5',
      'paySign': param.paySign,
      success: function (event) {
        // success 接口调用成功的回调函数
        console.log(event);
        console.log('event');
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (error) {
        // fail  接口调用结束的回调函数（调用成功、失败都会执行）
        console.log("支付失败")
        console.log(error)
      },
      complete: function () {
        // complete 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log("pay complete")
      }
    }); */
  },
  pc() {
    wx.getSystemInfo({
      success: function (res) {
        console.log('手机品牌：' + res.brand)
        console.log('手机型号：' + res.model)
        console.log('微信版本号' + res.version)
        console.log('客户端平台' + res.platform)
        console.log('操作系统版本' + res.system)
        console.log('微信设置的语言' + res.language)
        console.log('设备像素比' + res.pixelRatio)
        console.log('可使用窗口宽度' + res.windowWidth)
        console.log('可使用窗口高度' + res.windowHeight)
      }
    })
  },
  camera() {

  },
  test() {
    wx.request({
      url: 'http://192.168.2.115:8080/bantu/user/cha',
      data: {


      },
      method: 'GET',
      success: res => {
        console.log(res);
        // console.log(this.doWxPay);

      }
    });
  },
  // 开始录音
  record() {

    wx.startRecord({
      success: function (res) {
        console.log(res.tempFilePath)
        var tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: 'http://192.168.2.115:8080/bantu/bantuOCR/getTextBypSpeech', //getTextBypSpeech
          filePath: tempFilePath,
          name: 'pSpeech',
          formData: {
            'user': 'test'
          },
          // header: {
          //   'content-type': 'application/x-www-form-urlencoded'
          //   // 'charset = utf - 8'
          //   // "Content-Type": "application/x-www-form-urlencoded"
          //   // "chartset": "utf-8" 
          //   // 'content-type': 'application/json'
          // }, 
          //  method: 'POST',
          success: function (res) {

            console.log(res)

          }
        })
      },
      fail: function (res) {
        //录音失败
      }
    })
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 10000)


    // 录音管理api
    /* const recorderManager = wx.getRecorderManager()
    
          recorderManager.onStart(() => {
            console.log('recorder start 录音开始事件')
          })
          recorderManager.onResume(() => {
            console.log('recorder resume 继续录音')
          })
          recorderManager.onPause(() => {
            console.log('recorder pause 录音暂停事件')
          })
          recorderManager.onStop((res) => {
            console.log('recorder stop 录音停止事件，会回调文件地址', res)
            const { tempFilePath } = res
            
            // wx.uploadFile({
            //   url: 'http://192.168.2.115:8080/bantu/bantuOCR/getTextBypSpeech', //getTextBypSpeech
            //   filePath: tempFilePath,
            //   name: 'pSpeech',
            //   formData: {
            //     'user': 'test'
            //   },
            //   // header: {
            //   //   'content-type': 'application/x-www-form-urlencoded'
            //   //   // 'charset = utf - 8'
            //   //   // "Content-Type": "application/x-www-form-urlencoded"
            //   //   // "chartset": "utf-8" 
            //   //   // 'content-type': 'application/json'
            //   // }, 
            //   //  method: 'POST',
            //   success: function (res) {

            //     console.log(res)

            //   }
            // })

          })
          recorderManager.onFrameRecorded((res) => {
            const { frameBuffer } = res
            console.log('frameBuffer.byteLength 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件', frameBuffer.byteLength)
          })

          const options = {
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3',
            frameSize: 50
          }

        recorderManager.start(options) */

  },
  // 结束录音 wx.stopRecord()
  stopRecord() {
    wx.stopRecord()
    // 录音管理api
    // var recorderManager = wx.getRecorderManager()
    // recorderManager.stop()
  },
  userInfo() {
    wx.getUserInfo({
      success: function (res) {
        console.log(res.rawData)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  },
  yard() {
    var _this = this
    console.log(_this.data.userId);
    wx.request({
      url: 'http://192.168.2.115:8080/bantu/CreateConnect/clickShare',
      data: {
        userId: _this.data.userId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data)
        _this.setData({
          imgUrl: res.data
        })
        console.log(_this.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this;
    var useInfo = '';
    wx.getUserInfo({
      success: function (res) {
        console.log('个人信息')
        console.log(res)
        useInfo = res.userInfo;
        console.log('useInfo')
        console.log(useInfo)
        // var nickName = useInfo.nickName
        // var avatarUrl = useInfo.avatarUrl
        // var gender = useInfo.gender //性别 0：未知、1：男、2：女
        // var province = useInfo.province
        // var city = useInfo.city
        // var country = useInfo.country
      }
    })
    wx.login({
      /*  success: function (res) {
          console.log('1')
          console.log(res)
          wx.getUserInfo({
            success: function (res) {
              console.log('2')
              console.log(res.userInfo)
              // console.log(res.userInfo)
              // userInfo = res.userInfo
              // var nickName = userInfo.nickName
              // var avatarUrl = userInfo.avatarUrl
              // var gender = userInfo.gender //性别 0：未知、1：男、2：女
              // var province = userInfo.province
              // var city = userInfo.city
              // var country = userInfo.country
            }
          })
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: 'http://192.168.2.115:8080/bantu/wxuser/login',
              data: {
                appid: 'wx942a74c19e682464',
                secret: '5dc91c6b4c234e6c90436f5f5d0043e5',
                code: res.code,
                user_nickname: 'Be the best version of you',
                user_gender: '1',
                user_province: 'zh_CN',
                user_city: 'zh_CN',
                user_country: 'Iceland',
                user_deptpic: 'https://wx.qlogo.cn/mmopen/vi_32/J5ENfX2xwBfticEPdBbaxUn1EVEZVKl8M04SjLCddJiaXWbk7uzwZ29wyqibictFxdibobkbDu0Wp9LkZRmVq2uHSvg/0'
              },
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log('3')
                console.log(res.data.resObject)
                _this.setData({
                  open: res.data.resObject.openid,
                  userId: res.data.resObject.userid,
                })
                console.log("data");
                console.log(_this.data);
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
      } */
      success: function (res) {
        console.log('code')
        console.log(res)
        wx.getUserInfo({
          success: function (res) {
            console.log('个人信息')
            console.log(res.userInfo)
            // console.log(res.userInfo)
            // userInfo = res.userInfo
            // var nickName = userInfo.nickName
            // var avatarUrl = userInfo.avatarUrl
            // var gender = userInfo.gender //性别 0：未知、1：男、2：女
            // var province = userInfo.province
            // var city = userInfo.city
            // var country = userInfo.country
          }
        })
        if (res.code) {
          console.log('发起网络请求')
          // 发起网络请求
          console.log(useInfo)
          for (var k in useInfo) {
            if (!useInfo[k]) {
              console.log(k);
              useInfo[k] = 'kong'
            }

          }
          wx.request({
            url: 'http://192.168.2.115:8080/bantu/wxuser/login',
            data: {
              appid: 'wx942a74c19e682464',
              secret: '5dc91c6b4c234e6c90436f5f5d0043e5',
              code: res.code,
              user_nickname: useInfo.nickName,
              user_gender: useInfo.gender,
              user_province: useInfo.province,
              user_city: useInfo.city,
              user_country: useInfo.country,
              user_deptpic: useInfo.avatarUrl
              // user_nickname: 'Be the best version of you',
              // user_gender: '1',
              // user_province: 'zh_CN',
              // user_city: 'zh_CN',
              // user_country: 'Iceland',
              // user_deptpic: 'https://wx.qlogo.cn/mmopen/vi_32/J5ENfX2xwBfticEPdBbaxUn1EVEZVKl8M04SjLCddJiaXWbk7uzwZ29wyqibictFxdibobkbDu0Wp9LkZRmVq2uHSvg/0'
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log('open')
              console.log(res)
              _this.setData({
                open: res.data.resObject.openid,
                userId: res.data.resObject.userid,
              })
              console.log("data");
              console.log(_this.data);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
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

  }
})