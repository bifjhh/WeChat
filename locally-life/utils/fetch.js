/**
 * 导出一个封装的promise方法请求数据
 * @param {域名后缀} url ;
 * @param {传入参数} data ;
 */

module.exports = (url,data)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url: 'https://locally.uieee.com/'+url,
            data:data,
            success: resolve,
            fail: reject
        })
    })
}



