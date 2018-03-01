Page({
  /** 
   * 页面的初始数据 
   */
  data: {
    orientationList: [{
        id: "01",
        region: "东北"
      },
      {
        id: "02",
        region: "华北"
      },
      {
        id: "03",
        region: "华东"
      },
      {
        id: "04",
        region: "华南"
      },
      {
        id: "05",
        region: "华中"
      },
      {
        id: "06",
        region: "西北"
      },
      {
        id: "07",
        region: "西南"
      }
    ],
    act_addList: [{
        id: "01",
        region: "东北地区",
        city: [{
            id: "0101",
            name: "白山江源"
          },
          {
            id: "0102",
            name: "白山市"
          },
          {
            id: "0103",
            name: "宾县"
          },
          {
            id: "0104",
            name: "大庆"
          },
          {
            id: "0105",
            name: "测试1"
          },
          {
            id: "0106",
            name: "测试2"
          },
          {
            id: "0107",
            name: "测试3"
          },
          {
            id: "0108",
            name: "测试4"
          },
          {
            id: "0109",
            name: "测试5"
          },
          {
            id: "0110",
            name: "测试6"
          },
        ]
      },
      {
        id: "02",
        region: "华北地区",
        city: [{
            id: "0201",
            name: "包头"
          },
          {
            id: "0202",
            name: "保定"
          },
          {
            id: "0206",
            name: "测试2"
          },
          {
            id: "0207",
            name: "测试3"
          },
          {
            id: "0208",
            name: "测试4"
          },
          {
            id: "0209",
            name: "测试5"
          },
          {
            id: "0210",
            name: "测试6"
          },
        ]
      },
      {
        id: "03",
        region: "华东地区",
        city: [{
            id: "0303",
            name: "开封市"
          },
          {
            id: "3104",
            name: "安阳市"
          },
        ]
      },
      {
        id: "04",
        region: "华南地区",
        city: [{
            id: "0401",
            name: "黑龙江市"
          },
          {
            id: "0407",
            name: "测试3"
          },
          {
            id: "0508",
            name: "测试4"
          },
          {
            id: "0609",
            name: "测试5"
          },
          {
            id: "0710",
            name: "测试6"
          },
          {
            id: "0711",
            name: "测试8"
          },
          {
            id: "0712",
            name: "测试9"
          },
          {
            id: "0713",
            name: "测试10"
          },
          {
            id: "0714",
            name: "测试11"
          },
        ]
      },
      {
        id: "05",
        region: "华中地区",
        city: [{
          id: "0501",
          name: "黑龙江市"
        }]
      },
      {
        id: "06",
        region: "西北地区",
        city: [{
            id: "0603",
            name: "开封市"
          },
          {
            id: "0604",
            name: "安阳市"
          },
        ]
      },
      {
        id: "07",
        region: "西南地区",
        city: [{
            id: "0703",
            name: "开封市"
          },
          {
            id: "0704",
            name: "安阳市"
          },
          {
            id: "0401",
            name: "黑龙江市"
          },
          {
            id: "0407",
            name: "测试3"
          },
          {
            id: "0508",
            name: "测试4"
          },
          {
            id: "0609",
            name: "测试5"
          },
          {
            id: "0710",
            name: "测试6"
          },
          {
            id: "0711",
            name: "测试8"
          },
          {
            id: "0712",
            name: "测试9"
          },
          {
            id: "0713",
            name: "测试10"
          },
          {
            id: "0714",
            name: "测试11"
          },
          {
            id: "0401",
            name: "黑龙江市"
          },
          {
            id: "0407",
            name: "测试3"
          },
          {
            id: "0508",
            name: "测试4"
          },
          {
            id: "0609",
            name: "测试5"
          },
          {
            id: "0710",
            name: "测试6"
          },
          {
            id: "0711",
            name: "测试8"
          },
          {
            id: "0712",
            name: "测试9"
          },
          {
            id: "0713",
            name: "测试10"
          },
          {
            id: "0714",
            name: "测试11"
          },
        ]
      },
    ],
    toView: 'inToView01',
    start: 0,
  },
  scrollToViewFn: function (e) {
    var _id = e.target.dataset.id;
    this.setData({
      toView: 'inToView' + _id
    })
    console.log(this.data.toView)
  },
  // 开始滑动
  touchstart(e) {
    console.log(e)
    this.setData({
      start: e.touches[0].pageY
    })
  },
  // 滑动进行中
  touchmove(e) {
    var that = this;
    console.log(e)
    // var page = 1;
    // var num = e.touches[0].pageY - that.data.start;
    // if (num/26){
    //   that.setData({
    //     toView: 'inToView0' + page
    //   })
    //   console.log(that.data.toView);
    // }
    // switch (Math.ceil(num / 26)) {
    //   case 1:
    //     that.setData({
    //       toView: 'inToView0' + 1
    //     })
    //     console.log(1);
    //     break;
    //   case 2:
    //     that.setData({
    //       toView: 'inToView0' + 2
    //     })
    //     console.log(2);
    //     break;
    //   case 3:
    //     that.setData({
    //       toView: 'inToView0' + 3
    //     })
    //     console.log(3);
    //     break;
    //   case 4:
    //     that.setData({
    //       toView: 'inToView0' + 4
    //     })
    //     console.log(4);
    //     break;
    //   case 5:
    //     that.setData({
    //       toView: 'inToView0' + 5
    //     })
    //     console.log(5);
    //     break;
    //   case 6:
    //     that.setData({
    //       toView: 'inToView0' + 6
    //     })
    //     console.log(6);
    //     break;
    // }

    // console.log(e.touches[0].pageY)
  },
  // 滑动结束
  touchend(e) {
    // console.log(e);
    // console.log(e.changedTouches[0].pageY);
  },
  onLoad: function (options) {}
})