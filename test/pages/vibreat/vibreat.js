const backgroundAudioManager = wx.getBackgroundAudioManager()
backgroundAudioManager.title = '此时此刻'
backgroundAudioManager.epname = '此时此刻'
backgroundAudioManager.singer = '汪峰'
backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
backgroundAudioManager.src = '../../music/time_picker.ogg' // 设置了 src 之后会自动播放 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balltop:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
  move:function(e){
    console.log(e)
    wx.vibrateShort({
      success:function(res){
        console.log(res)
      },
      
    })
  },
  move_drag:function(e){
    var touchs = e.touches[0];
    var pageY = touchs.pageY;
    console.log('高度 ' + this.data.screenHeight)
    console.log('pageY: ' + pageY);
    // var Y = this.data.screenHeight/2-
    //防止坐标越界,view宽高的一般 
    if (pageY < 30) {
      return;
    }
    if (pageY > this.data.screenHeight - pageY - 75) {
      return;
    }
    this.setData({
      balltop: pageY,
    }); 
  },
  res:function(e){
    // console.log(e)
    var that=this;
    wx.request({
      url: "http://192.168.1.5:8080/Maven_Proje/dept/cha",
      success:function(res){
        console.log(res.data)   
        that.setData({
          list:res.data
        })
       
      }
    })
  },
  res1:function(e){
    console.log(e)
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        
      }
    })
    wx.request({
      url: "http://192.168.1.5:8080/Maven_Proje/dept/getSessionKeyOropenid",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        nickName: "啊啊啊啊",
        avatarUrl: 'avatarUrl',
        gender: "gender",
        province: "province",
        city: "city",
        country:"country"
      },
      method:'POST',
      success: function (res) {
        console.log(res.data.aaa);
      }
    })
  },
  login:function(e){
    wx.login({
      success: function (res) {
        console.log(res.code)
        if(res.code){
          wx.request({
            url: 'http://172.20.10.14:8080/bantu/dept/login',
            data: {
              code: res.code,
              appid: "wx632ce6f7e55142ff",
              secret:"50b6c3ecb788b7a9df3235d0b978ba0f"
            },
            success:function(res){
              console.log(res)
            }

          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
    });
  },
  ocr:function(e){
    console.log(e)
    // 先获取access token
    wx.request({
      url:"https://aip.baidubce.com/oauth/2.0/token",
      data:{
        grant_type:"client_credentials",
        client_id:"r12asEFpeSssg9kQ7LOE7Ioy",
        client_secret:"rjxGShGFjFrTAPaEA4TFGwH9hcKm7Rdt"
      },
      success:function(res){  
        console.log(res)
      }

    })
  },
  upload:function(){
    var that=this;
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths  = res.tempFilePaths
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: 'http://172.20.10.14:8080/bantu/wxuser/addpic', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'pic',
          formData: {
            'user': 'test'
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            var data = res.data
            //do something
          }
        })
      }
    })
  }
})