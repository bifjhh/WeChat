//index.js
//获取应用实例
var app = getApp();  /*实例化  app.js*/


console.log(app.getName());


Page({
  data: {  //初始化数据
    name: "张三1111",
    id: '82',
    title: "这是模板标题",
    item: {
      title: '这是给模板用的title',
      name: '这是给模板用的name'
    }
  },
  onLoad: function () { /*监听页面加载*/
    console.log('news onLoad');
  },
  onShow: function () { /*监听页面显示  或者是置为前台*/
    console.log('news onShow');
  },
  onReady: function () {  /*监听页面初次渲染完成*/
    console.log('news onReady');
  },
  onHide: function () {   /*监听页面隐藏*/
    console.log('news onHide');
  },
  onUnload: function () { /*监听页面卸载，当redirectTo或*/
    console.log('news onUnload');

  },
  run: function (event) {/* event事件对象 */
    console.log('执行了run方法');
    console.log(event);
  },
  touchstart() {/* 手势开始滑动 */
    console.log("touchstart");
  },
  touchmove() {/* 手势滑动中 */
    console.log("touchmove");
  },
  touchcancle() {/* 手势滑动被打断 */
    console.log("touchcancle");
  },
  touchend() {/* 手势滑动完成 */
    console.log("touchend");
  },


})
