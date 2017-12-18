//app.js
App({
  onLaunch: function () {  /*当小程序初始化完成时，会触发 onLaunch（全局只触发一次）*/

   
  },

  onShow:function(){  /*当小程序启动，或从后台进入前台显示，会触发onShow*/
     console.log("onShow");
  },
  onHide:function(){  /*当小程序从前台进入后台，会触发 onHide*/
    console.log("onHide");
  },

  
  getName:function(){  /*自定义方法*/
    return '这是app.js里面自定义的方法';
  }
})
