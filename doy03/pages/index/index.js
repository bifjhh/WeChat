//index.js
//获取应用实例
var app = getApp();   /*实例化 app.js*/

console.log(app);

Page({
  data: {
    info: app.getName(),
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    this.setData({
      info:'执行setdata后的方法'
    });
    wx.navigateTo({
      url: '../news/news'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
