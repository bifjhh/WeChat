# 微信小程序开发
## 微信开发的方式
- 1. 单纯的微信网页开发（聊天的时候，发送的一些网页，在微信里面打开的）
- 2. 微信小程序（相当于一个嵌套在微信里面的App）
- 3. 微信公众号开发，需要关注的那些账号
    + 1. 订阅号
    + 2. 服务号（必须要公司实体才能申请）
## 相关
- 必须下载工具
  + 使用微信开发者工具预览 [下载地址](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)

### 单纯的网页开发（公众号）
- 兼容性问题
- 开发同等于正常的HTML5页面开发
  + 先将页面上传到服务器，然后测试
  + 需要使用微信提供的js  js-sdk
### 小程序
- 文档后缀名不同
  + .wxml
  + .wxss
  + .js
  + .jsom
- wxml标签不同

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
