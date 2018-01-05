# 目录
- doy1
  + [练习](https://github.com/bifjhh/WeChat/tree/master/doy1)
- doy02
  + [练习](https://github.com/bifjhh/WeChat/tree/master/doy02)
- doy03
  + [练习](https://github.com/bifjhh/WeChat/tree/master/doy03)
- itday01
  + [练习](https://github.com/bifjhh/WeChat/tree/master/itdoy01)
- itday02
  + [练习](https://github.com/bifjhh/WeChat/tree/master/itdoy02)
- locally-life
  + [练习](https://github.com/bifjhh/WeChat/tree/master/locally-life)
- muke
  + [练习](https://github.com/bifjhh/WeChat/tree/master/muke)
- weapp-locally-master
  + [本地生活小程序](https://github.com/bifjhh/WeChat/tree/master/weapp-locally-master)
- wechat
  + [微信小程序实现移动端商城](https://github.com/bifjhh/WeChat/tree/master/wechat)
- test
  + [接口测试](https://github.com/bifjhh/WeChat/tree/master/test)
  + 各种API接口测试  
- ReaderMovie
  + [小程序项目实战](https://github.com/bifjhh/WeChat/tree/master/ReaderMovie)

# 小程序的定义
- 不需要下载安装，可以立即使用
  + 因为体积比较小，在加载的时候用户基本赶紧不到下载的过程
- 用户“用完即走”，不用关心是否安装太多的应用
  + 偶尔用，不用特别关注
  + 减少桌面上App的数量
- 应用无处不在，随时可用  小程序，让服务无处不在。 

## 微信小程序适用范围：
- 业务逻辑简单
- 使用频率低
- 性能要求低

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
  + 所有的HTML标签在wxml中无法使用，除非是在样式中设置
- wxss  基本上 和 css 没什么区别
- js 
  + 微信小程序的js中，取消了所有的dom节点，禁止了动态生成的操作
  + 使用组件化，数据绑定的方法来实现逻辑
  + 类似于vue

## doy1
- 模板标签template使用
- 定义模板
  ```xml
  <!--定义模板  name模板名称-->
    <template name="header">
      <view>
        这是头部
      </view>
    </template>

  <template name="header2">
      <view>{{title}}</view>

      <view>{{name}}</view> 
  </template>
 
  ```
- 使用模板
  ```xml 
    <!-- 使用模板 is="模板的名称" -->
      <template is="header">
      </template>

    <!--使用模板 is=模板名称  data传值  -->
      <template is="header2" data="{{title}}">
      </template> -->  
  ```
- 引入方法import和include的不同
  ```xml 
    <include src="../../template/header.wxml"/>

    <template is="header" data="{{item}}">
    </template> 
  ```
  + include引入外部的模板的时候  忽略了template定义的模板 直接引入相当于吧模板里面的内容复制到我们的页面
  + import 引入 只会引入目标文件中定义的 template 要通过template is="header" 这样的方式使用模板，该外部模板传入数据的时候，需要绑定到data="{{item}}
- 引入外部模板

## doy2 
- 标签使用
  + 1.使用以前的HTML标签的话，需要把这些标签转换成块元素，但是官方不建议使用--》推荐使用view
  + 2.使用以前的HTML标签的话，无法使用 id 选择器
——————还是使用官方提供的 标签 比较好
  + view 相当于我们以前的div 块级元素
  + text文本标签 内联元素 除了文本节点意外的其他节点都无法长按选中

- 布局方法
  + 使用view 标签进行布局

- wxss选择器
  + .class
  + id选择器
  + element
  + element，element 分组选择器
  + ::before
  + ::after

- 事件绑定
  + 绑定事件的方法 bind || catch

- event事件
  + event事件对象

- touch事件
  + 触摸事件

- 绑定事件 bind和catch的区别
  + bind    事件绑定不会阻止事件向上冒泡
  + catch   事件绑定可以阻止冒泡事件向上冒泡

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

# 小程序实例

## 关于移动端分辨率
  - 将不同尺寸的设计图，按照一定的比例，完美的显示在页面之中
#### pt
  - 逻辑分辨率  
  - 和屏幕的物理尺寸有关
  - 长度和视觉单位
#### px
  - 物理分辨率
  - 不是长度相关的单位
  - 1px就是一个像素点
  - 1 pt物理尺寸下有多像素点（px）
#### Reader
  - 求每一个pt下面包含了多少个px
#### PPI（DPI）
  - 利用分辨率什么的实用勾股定理算出的数值

## 关于rpx--小程序的自适应单位
  - 1个pt可以有一个px构成，也可以有2个，或者更多
  - iPhone6下2个px构成一个pt
#### 如何做不同分辨率设备的自适应
  - 以iPhone6的物理像素750X1135为视觉稿进行设计，在小程序中实用rpx为单位
  - iPhone6 1px = 1rpx = 0.5pt
#### 为什么实用iPhone6的物理分辨率来做设计
  - iPhone6 下 1px = 1rpx
  - iPhone6plus 1px = 0.6rpx
  - 小程序官方推荐使用iPhone6来进行设计
并不是所有的单位都适用rpx




## 开启项目
  - 创建一个纯净的项目模板
  - 配置app.json创建目录
    + wxml是编写小程序的结构文件
    + div是在HTML中书写结构的文件
  - 小程序内的单位rpx
    + rpx与750px设计图是1 ：1的 可以直接实用rpx来实现效果图的样式

#### 修改页面配置文件 .json
  - 因为页面配置文件只能修改window内的样式。所以在页面配置文件内不需要添加windo

### 构建新闻列表
  - 结构分析
  - 使用弹性盒子布局 display：flex
    + 纵向排列 flex-direction: column;
  - 如果控制两个元素的水平间距--》rpx  如果是垂直间距的可以使用px
  - 设置文字和图片的居中 vertical-align: middle;
  - 设置文字间距 letter-spacing: 2rpx;
##### js文件结构与Page页面的生命周期
##### 数据绑定 {{}}
  - 小程序取消了dom节点，及其操作
  - 但是通过{{}} 可以绑定js文件内data对象内声明的变量
  - 小程序内的数据绑定，并不是双向数据绑定的
  - 小程序内需要使用this.setData({}) 对改变的变量重新复制，手动完成双向数据绑定
  - 使用block标签 包裹要循环的内容
    + block类似与一个括号，将内容包裹起来
  - 使用wx-for 循环创建新闻列表  

 ##### 事件绑定
  - 绑定事件 bind || catch
    + 使用wx.navigateTo({}) wx.redirectTo({})方法 改变页面路径，完成跳转
      + wx.navigateTo  保留当前页面，跳转到应用内某个页面，可以返回当前页面
      + wx.redirectTo 关闭当前页面，跳转到应用内某个页面

  - bind    事件绑定不会阻止事件向上冒泡
  - catch   事件绑定可以阻止冒泡事件向上冒泡
