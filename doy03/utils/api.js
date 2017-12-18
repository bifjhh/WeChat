var ULR="http://www.mobiletrain.org";

var getImg=function(imageurl){   /*images/xxx.jpng       http://www.mobiletrain.org/images/xxx.jpng           */
  return  ULR+"/"+imageurl;

}


module.exports = {   /*微信小程序中中，utils下面一个JavaScript文件中定义的变量、函数，都只在这个文件内部有效。当需要从此JS文件外部引用这些变量、函数时，必须使用exports对象进行暴露。使用者要用require()命令引用这个JS文件*/   
    
    ULR: ULR,
    getImg:getImg
    
 };

