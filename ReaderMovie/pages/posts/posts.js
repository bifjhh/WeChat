// pages/posts/posts.js
// ES5
// var postsData = require('../data/posts-data.js')
// ES6
import postsData from '../data/posts-data.js'
Page({
  data: {
    posts_content:[]
  },
 onLoad: function (options) {
    this.setData({
      posts_content: postsData.local_database
    });
    /* wx.request({
      url: 'https://www.easy-mock.com/mock/5a1b963ffc9bad5c3ee5308b/example/',//自己虚拟接口完成新闻列表渲染
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res=>{
        // success
        console.log(res.data.data)
        this.setData({
          posts_content: res.data.data
        });
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    }) */
  },
})