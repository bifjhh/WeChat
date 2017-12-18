// pages/each/each.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    students: [
      { id: 1, name: 'xiaoliu1', age: 21 },
      { id: 2, name: 'xiaoliu2', age: 22 },
      { id: 3, name: 'xiaoliu3', age: 23 },
      { id: 4, name: 'xiaoliu4', age: 24 }
    ]
  },
  addItemHandle(){
    // 页面对象上除了 生命周期的钩子函数之外，还可以定义任何其他的函数
    // 这些函数可以作为视图层（界面）元素的事件处理函数
    // const students=this.data.students;
    // students.push({ id: Math.random(), name: 'xiaoliu4' + Math.random(), age: 24});
    const students = [{ id: Math.random(), name: 'xiaoliu4' + Math.random(), age: 24 }].concat(this.data.students);

    this.setData({ students})
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
  
  }
})