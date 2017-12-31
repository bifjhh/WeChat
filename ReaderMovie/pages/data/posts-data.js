// 定义数组对象
var local_database = [{
  date: "Sep 18 2016",
  title: "正式虾肥蟹壮时",
  imgSrc: "/images/avatar/1.png",
  author: "/images/post/crab.png",
  content: "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码",
  reading: "112",
  collection: "96"
},
{
  date: "Sep 18 2017",
  title: "正式虾肥蟹壮时",
  imgSrc: "/images/avatar/1.png",
  author: "/images/post/crab.png",
  content: "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码",
  reading: "112",
  collection: "96"
},
{
  date: "Sep 18 2018",
  title: "正式虾肥蟹壮时",
  imgSrc: "/images/avatar/1.png",
  author: "/images/post/crab.png",
  content: "本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码",
  reading: "112",
  collection: "96"
},
];

// 设置出口导出 对象
// ES5
/* module.exports={
  postList : local_database
}; */
// ES6
export default {
  local_database
};