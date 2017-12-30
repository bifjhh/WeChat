// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts_content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var posts_content = [
      {
        date:"Sep 18 2016",
        title:"正式虾肥蟹壮时",
        post_img:"/images/avatar/1.png",
        author_img:"/images/post/crab.png",
        content: "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码",
        view_num:"112",
        collect:"96"
      },
      {
        date:"Sep 18 2017",
        title:"正式虾肥蟹壮时",
        post_img:"/images/avatar/1.png",
        author_img:"/images/post/crab.png",
        content: "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码",
        view_num:"112",
        collect:"96"
      },
      {
        date:"Sep 18 20186",
        title:"正式虾肥蟹壮时",
        post_img:"/images/avatar/1.png",
        author_img:"/images/post/crab.png",
        content: "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码",
        view_num:"112",
        collect:"96"
      },
  ]
    this.setData({
      posts_content
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