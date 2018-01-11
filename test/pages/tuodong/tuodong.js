//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		cardList: [],//名片列表
		cardY: 0,//当前名片Y值的距离
		setY: [0, 0, 0, 0],//set Y值距离的集合
		direct: null,//记录是向上还是向下移动
		screenHeight:0,//用来记录屏幕的高度--rpx
		currentIndex:null,//用来记录当前移动的名片的index
		pixelRatio:2,//用来记录屏幕像素比例的值
	},
	//事件处理函数
	onLoad: function () {
		// 在页面加载时就计算当前设备的rpx和px的值
		this.getScreenHeight();
	},
	// 触摸开始时
	cardTouchStart: function (e) {
		console.log(e)
		// 在触摸开始时，
		//记录当前名片的Y值的距离 
		//记录当前触摸名片的index
		this.setData({
			cardY: e.touches[0].pageY,
			currentIndex: parseInt(e.currentTarget.dataset.index)
		})
	},
	// 触摸进行时
	cardTouchMove: function (e) {
		// 记录实时的Y值距离
		let currentCardY = e.touches[0].pageY;
		// 计算移动了多少的距离  实时的距离 减去 触摸开始时的距离 = 移动了的距离
		let distanceY = currentCardY - this.data.cardY;
		this.setData({
			// 如果移动的距离 > 0 则为 向下移动了 反之则为向上移动了
			// 根据值 返回给 direct ，down(向下) 或 up(向上)
			direct: distanceY > 0 ? 'down' : 'up'
		})
		// 
		console.log(this.data.setY[this.data.currentIndex])
		
		// 使用switch 循环 对向上 向下 进行函数运算
		switch (this.data.direct) {
			case 'up'://如果向上移动了
				// 判断当前 Y值集合内的index 的值 是否 大于 -360 
				if (this.data.setY[this.data.currentIndex] > -360) {
					// 如果是 使用 _temSetY 记录当前的数据的合集
					let _temSetY = this.data.setY;
					// 将当前的index的数据 实时 动态变换（为计算后适配的rpx）
					_temSetY[this.data.currentIndex] = distanceY * this.data.pixelRatio				
					this.setData({
						// 实时将数据合集传回data内的数据
						setY: _temSetY
					})
				}else{

				}
				break
			case 'down':
			// 如果值为向下
				// 判断 当前 Y 值合集内的值 是否 == 0 
				if (this.data.setY[this.data.currentIndex] == 0) {
					// 如果是 不进行任何操作
				} else {
					// 如果值 不为 0 使用 _temSetY 记录当前的数据的合集
					let _temSetY = this.data.setY;
					// 并改变 数组内的 值 为 -360 + 移动了的距离 
					_temSetY[this.data.currentIndex] = -360 + distanceY;
					this.setData({
						// 实时将数据返回到data
						setY: _temSetY
					})
								
				}
				break
		}
	},
	// 触摸结束时
	cardTouchEnd: function (e) {
		// 松开手指时 使用 switch 判断 移动了的距离
		switch (this.data.direct) {
			case 'up':// 如果是向上的
				// 如果当前名片对应的 数组 内的数据 < -100
				if (this.data.setY[this.data.currentIndex] < -100) {
					let _temSetY = this.data.setY;
					// 则让 当前 名片对应的数据 为 -360
					_temSetY[this.data.currentIndex] = -360
					this.setData({
						setY: _temSetY
					})

				} else {
					// 如果当前名片对应的 数组 内的数据 不小于 -100
					let _temSetY = this.data.setY;
					// 则让 当前 名片对应的数据 为 -360
					_temSetY[this.data.currentIndex] = 0					
					this.setData({
						setY: _temSetY
					})					
				}
				break
			case 'down':
			// 如果如果当前名片对应的 数组 内的数据 > -260
				if (this.data.setY[this.data.currentIndex] > -260) {
					let _temSetY = this.data.setY;
					// 则让 当前 名片对应的数据 为 0
					_temSetY[this.data.currentIndex] = 0	
									
					this.setData({
						setY: _temSetY
					})				
				} else {
					// 如果如果当前名片对应的 数组 内的数据 >不大于 -260
					let _temSetY = this.data.setY;
					// 则让 当前 名片对应的数据 为 -360
					_temSetY[this.data.currentIndex] = -360				
					this.setData({
						setY: _temSetY
					})

				}
				break
		}
	},


	getScreenHeight:function(){
		let that = this;
		wx.getSystemInfo({
			success: function (res) {
				// console.log(res)
				// 设置rpx和px的比例值
				// 获取设备的高度，和像素比例
				// 动态计算比例 并将像素比例值存储到data内
				that.setData({
					screenHeight: res.windowHeight * res.pixelRatio,
					pixelRatio: res.pixelRatio
				})
			}
		})
	}
})
