# 微信小程序开发
## doy1
- 模板标签template使用
- 定义模板
- 使用模板
- 引入方法import和include的不同
- 引入外部模板

## doy2 
- 标签使用
- 布局方法
- wxss选择器
- 事件绑定
- event事件
- touch事件
- 绑定事件 bind和catch的区别
## doy3
- wx.request发送请求
```javascript
 requestData() {
    var _that = this;/* 绑定this */
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
```
[点击查看官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html)
