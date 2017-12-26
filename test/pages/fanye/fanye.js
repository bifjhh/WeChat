// pages/scroll/scroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      1, 2, 3
    ],
    start: { "x": 0, "y": 0 },
    // stop:{"x":0,"y":0}
    tops: [517, 367, 667],
    zindex: [9, 8, 7]

  },

  touchstart(e) {/* 手势开始滑动 */
    console.log("");
    console.log(e);
    let evt = e.changedTouches[0];
    let start = { "x": evt.clientX, "y": evt.clientY };
    this.setData({ start });
    // console.log("手势开始滑动" + "-----touchstart");
    // console.log(evt.clientX + "_____" + evt.clientY);
    // console.log(this.data.start)
  },

  touchmove(e) {/* 手势滑动中 */
    console.log(e);
    // console.log("手势滑动中"+"-----touchmove");
    
  },

  touchcancle(e) {/* 手势滑动被打断 */
    console.log(e);
    console.log("手势滑动被打断" + "-----touchcancle");
  },

  touchend(e) {/* 手势滑动完成 */
    console.log(e);
    const _this = this;
    let evt = e.changedTouches[0];
    // let stop = {"x":evt.clientX,"y":evt.clientY};
    // this.setData({stop});
    // console.log("手势滑动完成" + "-----touchend");
    // console.log(evt.clientX + "_____" + evt.clientY);
    // console.log(this.data.stop);

    // let clientxx=this.data.start.x;
    let clientyy = this.data.start.y;
    // let clientX = evt.clientX;
    let clientY = evt.clientY;

    if (clientyy > clientY) {
      console.log("向上翻页了");
      addArray(this.data.tops);
      addArray(this.data.zindex, 'zindex');
    } else if (clientY > clientyy) {
      console.log("向下翻页了");
      next(this.data.tops);
      next(this.data.zindex, 'zindex');
    }

    /**
     * 
     * @param {传入向上变换的数组} arr 
     */
    function addArray(arr, zindex) {
      console.log(arr);
      var num = arr[0];
      for (let i = 0; i < arr.length; i++) {
        if (i != arr.length - 1) {
          arr[i] = arr[i + 1];
        } else if (i == arr.length - 1) {
          arr[i] = num;
        }
      }
      if (zindex == 'zindex') {
        _this.setData({ zindex: arr });
      } else {
        _this.setData({ tops: arr });
      }

    };

    /**
     * @param {传入向下变换的数组} arr
     */
    function next(arr, zindex) {
      console.log(arr);
      var num = arr[arr.length - 1];
      for (let i = arr.length - 1; i >= 0; i--) {
        if (i != 0) {
          arr[i] = arr[i - 1];
        } else if (i == 0) {
          arr[i] = num;
        }
      }
      if (zindex == 'zindex') {
        _this.setData({ zindex: arr });
      } else {
        _this.setData({ tops: arr });
      }
    };
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { }
})