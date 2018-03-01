// 获取字符串的长度
function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    }
    else {
      len += 1;
    }
  }
  return len;
  // console.log(len)
}
module.exports.getByteLen = getByteLen;