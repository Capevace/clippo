webpackJsonp([2],{348:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t(3),a=t.n(n),o=t(2),r=t.n(o),l=t(4),s=t.n(l),c=t(6),d=t.n(c),p=t(5),m=t.n(p),u=t(8),h=t.n(u),b=t(15),g=(t.n(b),t(45)),f=(t.n(g),t(368)),v=t.n(f),w=t(49),k=t(366),y=t(145),x=(t.n(y),t(82)),C=(t.n(x),t(146)),z=t.n(C),D=t(147),_=(t.n(D),t(144)),I=function(e){return t.i(b.h)("span",h()({style:{color:"gray",fontSize:"20px",fontWeight:"bold"}},e))},j=function(e){function i(){r()(this,i);var e=d()(this,(i.__proto__||a()(i)).call(this));return e.state={v:""},e.postClipboard=e.postClipboard.bind(e),e.fileSelected=e.fileSelected.bind(e),e}return m()(i,e),s()(i,[{key:"componentWillMount",value:function(){document.addEventListener("paste",this.postClipboard)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("paste",this.postClipboard)}},{key:"fileSelected",value:function(e){var i=this,t=new FileReader;t.onload=function(e){return i.emitClipboard(e.target.result)},t.readAsDataURL(e.target.files[0])}},{key:"emitClipboard",value:function(e){t.i(w.b)().emit("post-clipboard",{clientId:this.props.clientId,clipboard:e})}},{key:"postClipboard",value:function(e){var i=this;if(e.clipboardData.types.includes("Files")){var t=e.clipboardData.files[0],n=new FileReader;n.onload=function(e){i.emitClipboard(e.target.result)},n.readAsDataURL(t)}else this.emitClipboard(e.clipboardData.getData("text/plain"))}},{key:"render",value:function(e,i){var n=this;return t.i(b.h)("div",null,t.i(b.h)(y.Card,{style:"margin-bottom: 20px;"},t.i(b.h)(y.CardText,null,t.i(b.h)("center",null,v()()?t.i(b.h)(z.a,{hintText:"Paste your text/image here",value:i.v,onChange:function(e){return n.setState({v:""})}}):t.i(b.h)(I,null,"Press CTRL+V or CMD+V"),"     or     ",t.i(b.h)(_.a,{type:"file",name:"paster",id:"paster",onChange:this.fileSelected}),t.i(b.h)(_.b,{htmlFor:"paster"},"Drop a file")))),t.i(b.h)(D.Grid,{fluid:!0},this.props.clipboards.reverse().map(function(i){return t.i(b.h)(D.Row,null,e.clientId===i.clientId?t.i(b.h)(D.Col,{xs:1,sm:6,md:8}):null,t.i(b.h)(D.Col,{xs:11,sm:6,md:4,style:"margin: 20px 0px;"},t.i(b.h)(y.Card,null,t.i(k.a)(i.clipboard)?t.i(b.h)(y.CardMedia,null,t.i(b.h)("img",{src:i.clipboard})):t.i(b.h)("div",null,t.i(b.h)(y.CardText,null,t.i(b.h)("span",{style:{wordBreak:"break-word"}},i.clipboard))))),e.clientId!==i.clientId?t.i(b.h)(D.Col,{xs:1,sm:6,md:8}):null)})))}}]),i}(b.Component),R=function(e){return{clipboards:e.exchange.clipboards,clientId:e.connection.id}};i.default=t.i(g.connect)(R)(j)},366:function(e,i,t){"use strict";function n(e){return/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/.test(e)}i.a=n},368:function(e,i){function t(e){return e||"undefined"==typeof navigator||(e=navigator.userAgent),e&&e.headers&&"string"==typeof e.headers["user-agent"]&&(e=e.headers["user-agent"]),"string"==typeof e&&(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))}e.exports=t}});