//index.js
//获取应用实例
var app = getApp()
// console.log(app.data.url)
var getSystemHight = require("../../common/getSystemHight.js");
var tabBar = require("../../common/tabBar.js");
var userinfo = require("../../common/getuserinfo.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 通用变量
    mat: '', //在不同的手机上滑动块的位置
    sliderLeft: 159, //滑动条到名片夹下面变短
    sliderWidth: 120, //滑动条
    rotate: "0", //点击加号旋转
    offon: true, //点击加号判断做两件事
    offon1: true, //点击名片的正面背面的隐藏和显示
    add_bottom0: -0, //点击加号三个小图标的位置
    add_bottom1: -0, //点击加号三个小图标的位置
    add_bottom2: -0, //点击加号三个小图标的位置
    load_hide: "block", //加载
    saomiao: "saomiao", //扫描
    manual: "manual", //手动
    opacity: "0", //添加加号
    mask_hide: "none", //我的名片
    show: "block", //我的名片
    top: "", //点击加号按钮的加号
    mask_hide: "none", //遮罩层
    hide: "none", //名片夹
    transY: -370, //名片背面高度变化
    opacity_back: 0, //名片夹背面影藏
    no_mycard0: "none", //没有名片
    no_mycard1: "none", //有名片
    cheight: "",
    list: "",
    add_my: "none",//添加我的名片的遮罩层
    add_me_way: -626,
    load_box:"none",
    op1:"",
    op2:"",
    preimg:"none",
    max_box:"block",
    ispull:true,
    // 名片夹
    // dist: 50,
    // box: 400,
    // tops: [], //用来存储数组距离
    // ztop: [], //点击时暂存数组数据
    // tid: 0, //记录点击时的名片的索引
    // topd: 0, //点击时记录鼠标在盒子里的位置
    card_list: [], //用来存储名片夹列表数据
    record: false, //记录是否点击了名片夹
    cord_re: false, //记录是否是 修改名片夹之后回来的
    // 名片夹
    imgSrc: '', // 名片码
    userid: '',
    user_screenHeight:"",
  },
  //事件处理函数

  onLoad(options) {
    var that = this;
  
    
    index(that)
    function index(that) {
      // that.setData({
      //   load_hide: "block"
      // })
      wx.showLoading({
        title: '加载中',
      })
      console.log("页面正在加载")
      setTimeout(function () {
        wx.getNetworkType({
          success: function (res) {
            
            // 返回网络类型, 有效值：
            // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
            var networkType = res.networkType
            // console.log(networkType)
            if (networkType != "none") {
              console.log("有网状态")
              userinfo.userinfo(that);
            }else{
              wx.hideLoading()
              that.setData({
                load_hide: "none",
                load_box:"block",
              })
              wx.showModal({
                title: '',
                showCancel:false,
                content: '网络异常',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }
          }
        })
      },1000)
    }
    getSystemHight.getSystemHight(that);
    // console.log(that.data.user_windowHeight-100)
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      if (!res.isConnected) {
        wx.showModal({
          title: '提示',
          content: '网络断开了',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },
  refresh_again:function(){
   var that = this;
    index(that)
    function index(that) {
      wx.showLoading({
        title: '加载中',
      })
      that.setData({
        // load_hide: "block",
        load_box:"none"
      })
      console.log("页面正在加载")
      setTimeout(function () {
        
        wx.getNetworkType({
          success: function (res) {
            
            // 返回网络类型, 有效值：
            // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
            var networkType = res.networkType
            // console.log(networkType)
            if (networkType != "none") {
              console.log("有网状态")
              // wx.getSetting({
              //   success(res) {
              //     if (res.authSetting['scope.userInfo']) {
              //       wx.authorize({
              //         scope: 'scope.userInfo',
              //         success() {

              //           userinfo.userinfo(that);
              //         }
              //       })
              //     } else {
              //       userinfo.userinfo(that);
              //     }
              //   }
              // })
              userinfo.userinfo(that);
            }else{
              wx.hideLoading()
              that.setData({
                load_hide: "none",
                load_box:"block",
              })
              wx.showModal({
                title: '',
                showCancel:false,
                content: '网络异常',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }
          }
        })
      },1000)
    }
  },
  add_hidden() { },
  // 点击增加
  add: function () {
    var that = this;
    tabBar.add(that)
  },
  add_hide: function () {
    var that = this;
    tabBar.add_hidden(that)
  },
  onHide() {
    var that = this;
    tabBar.add_hidden(that)
  },
  back_img: function () {
    // console.log(14)
    let offon1 = this.data.offon1;
    if (offon1) {
      this.setData({
        transY: -0,
        offon1: false,
        opacity_back: 1
      })
    } else {
      this.setData({
        transY: -370,
        offon1: true,
        opacity_back: 0
      })
    }

  },
  add_card: function (e) {
    // console.log(e)

    var that = this;
    that.setData({
      add_me_way: that.data.user_windowHeight+70,
      add_my: "block"
    })
  },
  // 添加我的名片的遮罩层的事件
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

  // 用户分享
  onShareAppMessage(res) {
    if (res.target) {
      return {
        title: '版图-最具人气的名片交互!',
        desc: '最具人气的名片交互!',
        path: '/pages/card_Dls/card_Dls?cardid=' + res.target.dataset.cardid + '&userId=' + this.data.userid
      }
    } else {
      return {
        title: '版图-最具人气的名片交互!',
        desc: '最具人气的名片交互!',
        path: '/pages/index/index'
      }
    }
  },
  // 手动输入
  manual: function () {
    wx.navigateTo({
      url: '../redact/redact?mycard_ismy=0',
    })
  },
  // 扫描他人二维码
  ewm: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
      }
    })

  },
  // ocr识别
  saomiao: function (e) {
    console.log(e.currentTarget.dataset.ismy)
    var mycard_ismy = e.currentTarget.dataset.ismy
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
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
                if (res.statusCode==200){

                
                // console.log(JSON.parse(res.data))
                var data = res.data;
                wx.navigateTo({
                  url: '../redact/redact?data=' + data + "&mycard_ismy=" + mycard_ismy,
                })
                } else if (res.statusCode == 500){
                  wx.hideLoading()
                  wx.showModal({
                    title: '扫描失败',
                    // content: '',
                  })
                }
              },
              fail:function(res){
                console.log(res)
              }
            })
          },

        })
      }
    })
  },
  // 生成名片码
  card_code: function (e) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    console.log(e)
    wx.getStorage({
      key: 'cardid',
      success: function (res) {
        wx.request({
          url: app.data.url + "/CreateConnect/clickShare",
          data: {
            user_uid: that.data.userid,
            mycard_cardid: res.data,
            mycard_templateid:e.currentTarget.dataset.temp,
            redPacket: 0
          },
          success: function (res) {
            console.log('接口调用成功');
            console.log(res);
            if (res.statusCode==500){
              wx.hideLoading();
              console.log('网络错误，请稍后再试');
              let imgfail = 'https://s1.ax2x.com/2018/01/27/4OxbH.jpg';
              wx.showModal({
                title: '',
                content: '网络异常',
                showCancel:false,
              });
              that.setData({
                max_box: "block",
                preimg: "none",
                ispull:true
              })
            }else{
              wx.hideLoading();
              that.setData({
                max_box:"block",
                code_img: res.data,
                preimg:"block",
                ispull:false
              })
              // wx.previewImage({
              //   // current: res.data, // 当前显示图片的http链接
              //   urls: [res.data], // 需要预览的图片http链接列表
              //   success: function (res) {
              //     console.log(res);
              //   }
              // })
            }
          },
          fail: function(res) {
            wx.hideLoading();
            console.log('请求失败');
            console.log(res);
            wx.showModal({
              title: '',
              content: '网络请求失败',
              showCancel: false,
            })
            return;
          }
        })
      },
    })
  },
  onPullDownRefresh: function () {
    // wx.stopPullDownRefresh()
    // console.log(111)
    var that = this
    if (that.data.ispull){

    
    index1();
    function index1() {
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          
          var networkType = res.networkType
          console.log(networkType)
          if (networkType != "none") {
            userinfo.userinfo(that);
            wx.stopPullDownRefresh()
          } else {
            that.setData({
              load_hide: "none"
            })
            wx.showModal({
              title: '提示',
              content: '网络断开了',
              success: function (res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                  index1(that)
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            wx.stopPullDownRefresh()
          }
        }
      })
    }
    }else{
      wx.stopPullDownRefresh()
    }
  },
  preimg:function(){
    this.setData({
      preimg:"none",
      max_box:"block",
      ispull: true
    })
  },
  preventD() { }
})

/*
   wx.getSetting({
                success(res) {
                  console.log(res)
                  if (res.authSetting['scope.userInfo']) {
                    console.log(res.authSetting['scope.userInfo'])
                    wx.authorize({
                      scope: 'scope.userInfo',
                      success() {
                        userinfo.userinfo(that);
                        wx.getSetting({
                          success(res) {
                            if (res.authSetting['scope.userInfo']) {
                              wx.authorize({
                                scope: 'scope.userInfo',
                                success() {
                                  userinfo.userinfo(that)
                                }
                              })
                            } else {
                              userinfo.userinfo(that)
                            }
                          }
                        });
                        getSystemHight.getSystemHight(that);
                        // 获取用户信息函数

                        getSystemHight.getSystemHight(that);
                        wx.onNetworkStatusChange(function (res) {
                          console.log(res.isConnected)
                          if (!res.isConnected) {
                            wx.showModal({
                              title: '提示',
                              content: '网络断开了',
                              showCancel: false,
                              success: function (res) {
                                if (res.confirm) {
                                  console.log('用户点击确定')
                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })
*/ 