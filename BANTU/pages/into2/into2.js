// pages/add/add.js
//获取应用实例
var tabBar = require("../../common/tabBar.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list: [], //用来存储名片夹列表数据
    cord_re: false, //记录是否是 修改名片夹之后回来的
    // 名片夹
    imgSrc: '', // 名片码
    userid: '',
    show: 'none',
    dshow: 'none',
    opacity: "0", //添加加号
    add_bottom0: -0, //点击加号三个小图标的位置
    add_bottom1: -0, //点击加号三个小图标的位置
    add_bottom2: -0, //点击加号三个小图标的位置
    offon: true, //点击加号判断做两件事
    saomiao: "saomiao", //扫描
    manual: "manual", //手动
    mask_hide: "none", //遮罩层
    rotate: "0", //点击加号旋转
    off: true,
    formId:'',
    toView: 'inToView0',

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
  add: function () {
    var that = this;
    tabBar.add(that)
  },
  // 名片夹点击跳转函数
  nav_card(e) {
    var that = this;
    if (that.data.off) {
      console.log('状态正常---');
      var cardId = e.currentTarget.dataset.card;
      wx.navigateTo({
        url: '/pages/details/details?cardid=' + cardId
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
        var url = app.data.url + '/Mycard/getMyCardcaseByUid';
        wx.request({
          url: url,
          data: {
            mycard_uid: userid
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (res) {
            console.log('获取列表成功')
            // console.log(res)
            console.log(res.data.resObject);
            if (res.data.resObject) {
              console.log('有');
              _this.setData({
                card_list: res.data.resObject
              })


              // 排列锚点-----分割线--------------分割线--------------分割线--------------分割线--------------
              var inf = res.data.resObject[0].mycard_initial[0];
              var arr = [];
              for (let k in res.data.resObject){
                // console.log(res.data.resObject[k].mycard_initial[1]);
                // 获取返回数组内的所有字母
                var arrIn = res.data.resObject[k].mycard_initial[0];
                arr.push(arrIn);
              }
              arr.push('#');//添加# 代表无法识别的
              // console.log(arr);
              // 然后给数组内容去重
              var record = arr[0];
              var weight = [];
              for (let i = 0; i < arr.length; i++) {
                if (weight.indexOf(arr[i]) == -1) {  
                  //判断在weight数组中是否存在，不存在则push到weight数组中
                  weight.push(arr[i]);
                }
              }
              // console.log(weight);

              var orientationList = [];
              for (let k in weight){
                k = Number(k);
                orientationList.push({ id: k, letter: weight[k]}, )
              }
              _this.setData({ orientationList});
              console.log(orientationList);

              var act_addList = [];
              // var i = 0; i < orientationList.length;i++
              for (var i = 0; i < orientationList.length-1; i++) {
                // k = Number(k);
                var info = [];
                var Finfo = [];
                var reg = /^[a-z]+$/;
                for (var j = 0; j < _this.data.card_list.length; j++ ){
                  if (orientationList[i].letter == _this.data.card_list[j].mycard_initial[0]){
                    info.push(_this.data.card_list[j]);
                    // console.log(_this.data.card_list[i])
                  } else if (!reg.test(_this.data.card_list[j].mycard_initial[0])){
                    Finfo.push(_this.data.card_list[j]);
                  }
                }
                act_addList.push({ id: i, letter: weight[i], arrInfo: info }, );
                
              }
              act_addList.push({ id: i, letter: weight[i], arrInfo: Finfo }, );
              // console.log(act_addList);

              _this.setData({ act_addList});
              console.log(_this.data.act_addList)

               // 排列锚点-----分割线--------------分割线--------------分割线--------------分割线---------

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
            // console.log(_this.data.card_list)
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
   * 锚点定位
   */
  scrollToViewFn(e) {
    var that = this;
    var _id = e.target.dataset.id;
    that.setData({
      toView: 'inToView' + _id
    })
    console.log(that.data.toView)
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
                // console.log(JSON.parse(res.data))
                var data = res.data;
                wx.navigateTo({
                  url: '../redact/redact?data=' + data + "&mycard_ismy=" + mycard_ismy,
                })
              }
            })
          },

        })
      }
    })
  },
  ewm: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
      }
    })

  },
  manual: function () {
    wx.navigateTo({
      url: '../redact/redact?mycard_ismy=0',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  add_hide: function () {
    var that = this;
    tabBar.add_hidden(that)
  },
  onHide() {
    var that = this;
    tabBar.add_hidden(that)
  },
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
              url: app.data.url+'/Mycard/delete',
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
     * 
     * @param {object} e -传入全局的this
     */
  submit(e) {
    let formId = e.detail.formId;
    console.log(e.detail.formId);
    this.setData({ formId });
    // console.log(this.data.formId + "-------");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    var that = this;
    // console.log(that.data.userid);
    console.log(that.data.formId+"-----------------");
    // console.log(res);

    if (res.target) {
      console.log(that.data.formId+'----/pages/card_Dls/card_Dls');
      return {
        title: '版图-最具人气的名片交互!',
        desc: '最具人气的名片交互!',
        path: '/pages/card_Dls/card_Dls?cardid=' + res.target.dataset.card + '&userId=' + that.data.userid + '&formId=' + that.data.formId,
        // path: '/pages/card_Dls/card_Dls?cardid=' + res.target.dataset.card + '&userId=' + that.data.userid + '&formId=' + that.data.formId,
      }
    } else {
      console.log('/pages/add/add');
      return {
        title: '版图-最具人气的名片交互!',
        desc: '最具人气的名片交互!',
        path: '/pages/add/add',
      }
    }
  },
  

  /*
    下拉刷新
  */
  onPullDownRefresh: function () {
    var _this = this;
    _this.cardcase(_this);
  },

  
})
/* 
域名隐私
不能涉及人名称
备注 此网站为个人内容，内容为
*/