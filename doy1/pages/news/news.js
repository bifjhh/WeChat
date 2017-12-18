//index.js
//获取应用实例
const app = getApp();

// 逻辑层使用 Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
// 注意：Page()首字母大写
Page({
  data: {//data 页面初始化数据
    name: "小刘",
    age: 24,
    id:94,
    title:"这是标题模板",
    item:{
      title:"这是给模板用的title",
      name:"这是给模板用的name",
      
    }

    
  },
  onLoad() {//监听页面加载
    console.log('news onLoad')
  },
  onReady() {//监听页面初次渲染完成
    console.log('news onReady')
  },
  onShow() {//监听页面显示 或者是置为前台
    console.log('news onShow')
  },
  onHide() {//监听页面隐藏
    console.log('news onHide')
  },
  onUnLoad() {//监听页面写在，当redirectTo
    console.log('news onUnLoad')
  },
  run() {
    console.log("代码执行了")
  },
  setName() {
    this.setData({
      age: 18
    })
  }
})
