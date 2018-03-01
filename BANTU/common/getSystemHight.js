// common.js

// 页面加载时获取页面的高度
function getSystemHight(that) {
  wx.getSystemInfo({
    success: function (res) {
      console.log(res);
      console.log("___________")
      // console.log(res.screenHeight)
      // console.log(res.pixelRatio)
      // console.log(res.windowWidth)
      that.setData({
        user_phonemodel : res.model,
        user_phonebrand: res.brand,
        user_wxversion: res.version,
        screenHeight: res.screenHeight,
        user_pixelRatio: res.pixelRatio,
        user_screenWidth:res.screenWidth,
        user_screenHeight: res.screenHeight,
        user_windowWidth: res.windowWidth,
        user_windowHeight: res.windowHeight,
        user_language: res.language,
        user_system: res.system,
        user_platform: res.platform,
        user_fontSizeSetting: res.fontSizeSetting,
        user_SDKVersion: res.SDKVersion
      })
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
      // console.log(res.windowHeight)
      if (res.screenHeight >= 736) {
        that.setData({
          top:31
        })
      } else if (res.screenHeight < 736 && res.screenHeight>568){
        that.setData({
          top: 28
        })

      } else if (res.screenHeight <= 568){
        that.setData({
          top: 23
        })

      }
      // console.log(that.data.mat)
      that.setData({
        cheight: (res.windowHeight-45) + "px",
        // add_me_way: Number(res.windowHeight)
      })
    }
  })
}
module.exports.getSystemHight = getSystemHight;
