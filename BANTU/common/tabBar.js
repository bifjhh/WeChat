//点击更换tabBar样式

function card(that) {
  that.setData({
    cardssrc: "carder_select.png",
    mesrc: "me.png",
    bgc: "#e7e4e2"

  })
} 
function me(that){
  that.setData({
    cardssrc: "carder.png",
    mesrc: "me_select.png",
    bgc: "e7e4e2"
  })
}
function add(that){
  var offon = that.data.offon;
 
  if (offon) {

      that.setData({
        rotate: 135,
        add_bottom0: 120,
        // add_bottom1: 110,
        add_bottom2: 230,
        offon: false,
        mask_hide: "block",
        opacity: 1,
        op1: 'op1',
        ispull:false
        


      })
      setTimeout(function(){
        that.setData({
          op2: "op2",
          sc:1
        })
      },400)
  } else {
   
      that.setData({
        rotate: 0,
        add_bottom0: -120,
        // add_bottom1: -0,
        add_bottom2: -120,
        offon: true,
        mask_hide: "none",
        opacity: 0,
        op1: "",
        op2: "",
        sc: 0.8,
        ispull: true
       
      })
  }
  }
function add_hidden(that){
  var offon = that.data.offon;
  that.setData({
    rotate: 0,
    add_bottom0: -120,
    // add_bottom1: -0,
    add_bottom2: -120,
    offon: true,
    opacity:0,
    mask_hide: "none",
    sc: 0.8,
    ispull: true
  })
}
module.exports.add_hidden = add_hidden;
module.exports.add=add;
module.exports.card = card;
module.exports.me = me