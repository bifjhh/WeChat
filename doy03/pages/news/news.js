//index.js
//获取应用实例
var app = getApp(); /*实例化  app.js*/
// 引入工具里面的api.js
var api = require('../../utils/api.js');
console.log(api);



Page({
  data: { //初始化数据
    name: "这是news页面",
    age: '30',
    list: []
  },
  onLoad: function () { /*监听页面加载*/
    console.log('news onLoad');

    /*页面加载的时候去服务器请求数据*/
    this.requestData();
    this.postData();



  },
  onShow: function () { /*监听页面显示  或者是置为前台*/
    console.log('news onShow');
  },
  onReady: function () { /*监听页面初次渲染完成*/
    console.log('news onReady');
  },
  onHide: function () { /*监听页面隐藏*/
    console.log('news onHide');
  },
  onUnload: function () { /*监听页面卸载，当redirectTo或*/
    console.log('news onUnload');

  },
  run: function () {
    console.log('执行了run方法');
  },
  requestData() {
    var _that = this;
    wx.request({
      url: 'http://www.phonegap100.com/appapi.php?a=getPortalCate', //接口地址
      data: { /* 请求参数*/
        nmae: '小刘',
        age: '24'
      },
      header: { /* 请求数据的方式 */
        'content-type': 'application/json' // 默认值
      },
      success: function (res) { /* 请求成功的回调函数 */
        console.log(res.data);
        _that.setData({
          list: res.data.result /* 请求到的数据给list */
        })
      },
      fail(err) { /* 请求失败的参数 */
        console.log("err:" + err);
      }
    })
  },
  postData() { /* 提交数据 登录注册 */
    var _that = this;
    wx.request({
      url: 'http://www.57lehuo.com/upload.php', //接口地址
      data: { /* 请求参数*/
        usernmae: '小刘',
        age: '24'
      },
      method: "POST",
      /* post 提交数据 */
      header: { /* 提交数据的方式 */
        'content-type': 'application/json' // 默认值
      },
      success: function (res) { /* 成功的回调函数 */
        console.log(res.data);
      },
      fail(err) { /* 请求失败的参数 */
        console.log("err:" + err);
      }
    })
  },


})