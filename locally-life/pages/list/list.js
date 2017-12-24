const fetch = require('../../utils/fetch');

// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前加载的分类
    category:{},
    // 此分类下的全部店铺
    shops: [],
    pageIndex:0,
    pageSize:20,
    hasMore:true
  },

  // 加载下一页数据
  loadMore(){
    // 当总条数达到上限的话，阻止之后的程序的运行
    if(!this.data.hasMore) return;

    let {pageIndex,pageSize} = this.data;
    const params = { _page: ++pageIndex, _limit:pageSize };
    return fetch('categories/' + this.data.category.id + '/shops', params)
      .then(res => {
        // 获取请求头内的总条数
        const totalCount = parseInt(res.header['X-Total-Count']);
        // 判断当前加载条数是否达到总条数
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount;
        // 达到上限的话  设置改变data内的值
        const shops = this.data.shops.concat(res.data);
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch('categories/' + options.cat).then((res)=>{
      // 不能确定一定是在onLoad之后执行
      // 设置新的防护措施

// 加载分类title信息
      this.setData({category:res.data});
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      // 加载完分类信息过后再去加载商铺信息
      this.loadMore()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
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
  // 重新加载数据---下拉刷新
  // 加载之前将默认的数据清空，完成状态的刷新
  this.setData({shops:[],pageIndex:0,hasMore:true})
  //将fetch 返回成一个Promise对象，所以只有当一个then完成之后才会进行下一个
    this.loadMore().then(() => wx.stopPullDownRefresh());
  
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("底部++")
    // 加载下一页
    // 需要判断是否正在加载
    
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
   searchHandle() {
       // console.log(this.data.searchText)
       this.setData({
         shops: [],
         pageIndex: 0,
         hasMore: true
       })
       this.loadMore()
     },

     showSearchHandle() {
       this.setData({
         searchShowed: true
       })
     },
     hideSearchHandle() {
       this.setData({
         searchText: '',
         searchShowed: false
       })
     },
     clearSearchHandle() {
       this.setData({
         searchText: ''
       })
     },
     searchChangeHandle(e) {
       this.setData({
         searchText: e.detail.value
       })
     }
})