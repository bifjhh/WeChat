// pages/more/more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycard_ismy: "",
    mycard_cardid: '',
    next_form: "",
    mycard_templateid: "",
    loading: "",
    disable: true,
    num: "确定(2)"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var i = 1,
      timer = setInterval(timers, 1000)

    function timers() {
      if (i == 0) {
        that.setData({
          disable: false,
          num: "确定",
        })
        clearInterval(timer)
        console.log("定时器已清除")
      } else {
        that.setData({
          disable: true,
          num: "确定(" + i + ")",
        })
        i--
      }
    }
    console.log(options);
    console.log(options.item);
    if (options.item != "undefined") {
      var item = JSON.parse(options.item);
      console.log(item)
      that.setData({
        mycard_phone: item.resObject.mycard_phone,
        mycard_mail: item.resObject.mycard_mail,
        mycard_add: item.resObject.mycard_add,
        mycard_website: item.resObject.mycard_website,
        mycard_profile: item.resObject.mycard_profile,
        mycard_scope: item.resObject.mycard_scope,
        mycard_ismy: options.mycard_ismy
      })
      console.log('options');
      console.log(options.mycard_ismy);
      // if (options.mycard_ismy == 1) {
      //   that.setData({ text: "保存我的名片" })

      // } else {
      //   that.setData({ text: "保存到名片夹" })
      // }
    } else {
      // if (options.mycard_ismy == 1) {
      //   that.setData({ text: "保存我的名片" })

      // } else {
      //   that.setData({ text: "保存到名片夹" })
      // }
      that.setData({
        mycard_ismy: options.mycard_ismy,
        mycard_templateid: options.mycard_templateid
      });
      if (options.mycard_cardid != '') {
        // that.setData({ text: "修改名片" })
        wx.getStorage({
          key: 'userid',
          success: function (res) {
            console.log(res)
            that.setData({
              mycard_uid: res.data
            })
            var cardid = options.mycard_cardid;
            that.setData({
              cardid: options.mycard_cardid
            })
            var data = {}
            data.mycard_cardid = cardid;
            data.mycard_uid = res.data
            wx.request({
              url: app.data.url + "/Mycard/getCardBycardId",
              data: data,
              success: function (res) {
                console.log(res)
                that.setData({
                  mycard_phone: res.data.resObject[0].mycard_phone,
                  mycard_mail: res.data.resObject[0].mycard_mail,
                  mycard_add: res.data.resObject[0].mycard_add,
                  mycard_website: res.data.resObject[0].mycard_website,
                  mycard_profile: res.data.resObject[0].mycard_profile,
                  mycard_scope: res.data.resObject[0].mycard_scope,
                })
              }
            });
          },
        })

        that.setData({
          mycard_cardid: options.mycard_cardid
        });
        console.log(that.data.mycard_cardid)
      } else {
        this.setData({
          mycard_ismy: options.mycard_ismy
        })
      }
    }


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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
    this.setData({
      disable: true
    })

    function req(that, data) {
      wx.showLoading({})
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          var networkType = res.networkType
          console.log(networkType + "判断网络")
          if (networkType == "none") {
            wx.showModal({
              title: '',
              showCancel: false,
              content: '网络异常',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            that.setData({
              // loading: false,
              disable: false
            })
          } else {
            wx.request({
              url: app.data.url + "/Mycard/addMyCard",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: data,
              success: function (result) {
                // console.log(result.data.res.resCode)
                if (result.data.res.resCode == '200') {
                  // that.setData({
                  //   loading:false,
                  //   disable: false
                  // })
                  setTimeout(() => {
                    wx.hideLoading();
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                    });
                    console.log(that.data.mycard_ismy);
                    setTimeout(() => {
                      if (that.data.mycard_ismy == 1) {
                        that.setData({
                          mycard_cardid: "",
                          mycard_ismy: "",
                        })
                        wx.reLaunch({
                          url: '../index/index?mycard_ismy=' + that.data.mycard_ismy
                        })
                      } else {
                        that.setData({
                          mycard_cardid: "",
                          mycard_ismy: "",
                        })
                        wx.reLaunch({
                          url: '../add/add?mycard_ismy=' + that.data.mycard_ismy
                        })
                      }
                    }, 500);


                  }, 1000);


                } else {
                  console.log(11);
                  wx.showModal({
                    title: '',
                    showCancel: false,
                    content: '网络异常',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        that.setData({
                          // loading: false,
                          disable: false
                        })
                      }
                    }
                  })

                }
              },
              fail: function () {
                if (cardid != "") {
                  wx.showModal({
                    title: '',
                    showCancel: false,
                    content: '修改失败',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '',
                    showCancel: false,
                    content: '保存失败',
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

                that.setData({
                  // loading: false,
                  disable: false
                })
              }
            })

          }
        }
      })
    }
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    wx.getStorage({
      key: 'next_form',
      success: function (res) {
        console.log(res);
        that.setData({
          next_form: res.data
        });


        console.log(next_form)
        var next_form = that.data.next_form;
        var mycard_companyname = (next_form.mycard_companyname).trim(); //公司名称
        var mycard_mobile = (next_form.mycard_mobile).trim(); //手机号
        var mycard_name = (next_form.mycard_name).trim(); //姓名
        var mycard_position = (next_form.mycard_position).trim(); //公司职位
        var mycard_add = (e.detail.value.mycard_add).trim(); //公司名称
        var mycard_mail = (e.detail.value.mycard_mail).trim(); //手机号
        var mycard_phone = (e.detail.value.mycard_phone).trim(); //姓名
        var mycard_profile = (e.detail.value.mycard_profile).trim(); //公司职位
        var mycard_scope = "";
        var mycard_website = (e.detail.value.mycard_website).trim()

        var data = {};
        data.mycard_add = mycard_add;
        data.mycard_mail = mycard_mail;
        data.mycard_phone = mycard_phone;
        data.mycard_profile = mycard_profile;
        data.mycard_scope = "mycard_scope";
        data.mycard_website = mycard_website;
        data.mycard_cardid = e.detail.value.mycard_cardid;
        data.mycard_ismy = e.detail.value.mycard_ismy;
        data.mycard_uid = next_form.mycard_uid;
        data.mycard_companyname = mycard_companyname;
        data.mycard_mobile = mycard_mobile;
        data.mycard_name = mycard_name;
        data.mycard_position = mycard_position;

        // 模板
        if (that.data.mycard_templateid == "") {
          data.mycard_templateid = 0
        } else {
          data.mycard_templateid = that.data.mycard_templateid;
        }

        console.log(data)

        if (mycard_mail != ""&&(mycard_mail.indexOf("@") == -1 && mycard_mail.indexOf(".") == -1)){
          wx.showToast({
            icon: "none",
            title: '邮箱输入有误',
          })
          that.setData({
            // loading: false,
            disable: false
          })
        } else if (mycard_website!=""&&mycard_website.indexOf(".") == -1){
          wx.showToast({
            icon: "none",
            title: '网址输入有误',
          })
          console.log(1111)
          that.setData({
            // loading: false,
            disable: false
          })
        }else{
          req(that, data)
        }
      /*
        if (mycard_phone !=""){

          if (false){
              wx.showToast({
                icon: "none",
                title: '邮箱输入有误',
              })
              that.setData({
                loading: false,
                disable: false
              })
            } else {

              that.setData({
                loading: false,
                disable: false
              })
              req(that, data)
            }
            if (mycard_website != "") {
              if (mycard_website.indexOf(".") == -1) {
                wx.showToast({
                  icon: "none",
                  title: '网址输入有误',
                })
                console.log(1111)
                that.setData({
                  loading: false,
                  disable: false
                })
              }else{
                
              // that.setData({
              //   loading: false,
              //   disable: false
              // })
              // req(that, data)
              } 
              if (mycard_website !=""){
                if (mycard_website.indexOf(".")==-1){
                  wx.showToast({
                    icon: "none",
                    title: '网址输入有误',
                  })
                  console.log(1111)
                  that.setData({
                    loading: false,
                    disable: false
                  })
                } else {
                  req(that, data)
                }
              }
            }
          }
        } else {
          if (mycard_mail != "") {
            if (mycard_mail.indexOf("@") == -1) {
              wx.showToast({
                icon: "none",
                title: '邮箱输入有误',
              })
              that.setData({
                loading: false,
                disable: false
              })
            } else {

              req(that, data)
            }
            if (mycard_website != "") {
              if (mycard_website.indexOf(".") == -1) {
                wx.showToast({
                  icon: "none",
                  title: '网址输入有误',
                })
                console.log(1111)
                that.setData({
                  loading: false,
                  disable: false
                })
              } else {
                req(that, data)
              }
            }
          } else {
            if (mycard_website != "") {
              if (mycard_website.indexOf(".") == -1) {
                wx.showToast({
                  icon: "none",
                  title: '网址输入有误',
                })
                console.log(1111)
                that.setData({
                  loading: false,
                  disable: false
                })
              } else {
                req(that, data)
              }
            } else {
              req(that, data)
            }
          }
          }
        */
          
      
      },
    })
  }
})