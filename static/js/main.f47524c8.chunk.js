(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{206:function(e,t,a){e.exports=a(376)},239:function(e,t,a){},244:function(e,t,a){},245:function(e,t,a){},251:function(e,t,a){},280:function(e,t){},376:function(e,t,a){"use strict";a.r(t);var n=a(125),i=a(40),r=a(194),l=a(0),o=a.n(l),s=a(10),c=a.n(s),p=(a(239),a(16)),u=a(14),m=a(18),d=a(17),h=a(19),g=a(58),f=a(46),y=a(35),E=function(e){return{type:"SWITCH_PAGE",payload:e}},P=function(e,t){return{type:"TOGGLE_DIALOG",payload:{surface:e,dialogSwitch:t}}},v=function(e){return{type:"UPDATE_LIST",payload:e}},b=function(e){return{type:"PSEUDONYM",payload:e}},k=function(e){return{type:"UPDATE_Q",payload:e}},C=(a(244),a(63)),w={backgroundColor:"white",textAlign:"center",padding:"20px",position:"fixed",left:"0",bottom:"0",height:"60px",width:"100%"},O={display:"block",padding:"20px",height:"60px",width:"100%"},S=function(e){var t=e.children;return o.a.createElement("div",null,o.a.createElement("div",{style:O}),o.a.createElement("div",{style:w},t))},j=(a(245),a(5)),N=a(420),A=a(100),x=a(444),I=a(418),L=o.a.forwardRef(function(e,t){return o.a.createElement(I.a,Object.assign({direction:"up",ref:t},e))}),Q=Object(j.a)({root:{color:N.a[400],"&$checked":{color:N.a[600]}},checked:{}})(function(e){return o.a.createElement(x.a,Object.assign({color:"default"},e))}),D=Object(j.a)({root:{color:A.a[400],"&$checked":{color:A.a[600]}},checked:{}})(function(e){return o.a.createElement(x.a,Object.assign({color:"default"},e))}),T=Object(i.styled)("div",{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}),F=Object(i.styled)("div",{display:"flex",justifyContent:"center",alignItems:"center"}),R=Object(i.styled)("div",{display:"flex",float:"right",height:"100%"}),U=a(26),H=a(423),_=a(180),W=a.n(_),z=a(442),M=a(378),G=a(179),B=a.n(G),V=a(424),J=Object(j.a)({root:{"& input:valid + fieldset":{borderColor:"green",borderWidth:2},"& input:invalid + fieldset":{borderColor:"red",borderWidth:2},"& input:valid:focus + fieldset":{borderLeftWidth:6,padding:"4px !important"}}})(z.a),q=Object(M.a)(function(e){return{margin:{margin:e.spacing(1)},root:{display:"flex",flexWrap:"wrap"},progress:{margin:e.spacing(2)}}}),K=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).checkPseudonym=function(){a.state.pseudonym&&(a.setState({inProgress:!0,isDisable:!0}),fetch("https://aire-api.onrender.com/pseudonym",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({pseudonym:a.state.pseudonym})}).then(function(e){return e.json()}).then(function(e){var t=0;if(a.setState({inProgress:!1,isDisable:!1},function(){e.isAvailable&&(t=1)}),t)return a.props.updatePseudonym(a.state.pseudonym),a.props.switchPage(1)}))},a.state={pseudonym:a.props.pseudonym,inProgress:!1,isDisable:!1},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"changePseudonym",value:function(e){this.setState({pseudonym:e.target.value})}},{key:"render",value:function(){var e=this,t=this.props.classes;return 1===this.props.onPage?o.a.createElement(f.a,{to:"/unique"}):-1===this.props.onPage?o.a.createElement(f.a,{to:"/live"}):o.a.createElement("div",{id:"home",className:"container"},o.a.createElement(H.a,{onClick:function(){return e.props.switchPage(-1)}},o.a.createElement(B.a,{style:{fontSize:30,color:"green"}})),o.a.createElement(R,null,o.a.createElement(H.a,null,o.a.createElement("a",{style:{display:"table-cell"},rel:"noopener noreferrer",href:"https://github.com/jvoltci/aire/blob/master/README.md",target:"_blank"},o.a.createElement(W.a,null)))),o.a.createElement("h3",{id:"u1"},o.a.createElement("span",{id:"u11"},"a"),o.a.createElement("span",{id:"u12"},"i"),o.a.createElement("span",{id:"u13"},"r"),o.a.createElement("span",{id:"u14"},"e")),o.a.createElement("div",{className:t.root,noValidate:!0},o.a.createElement(J,{fullWidth:!0,onChange:function(t){return e.changePseudonym(t)},className:t.margin,label:"Survey name",required:!0,variant:"outlined",defaultValue:this.props.pseudonym,id:"validation-outlined-input"})),o.a.createElement(T,null,o.a.createElement(U.Block,{paddingTop:"210px"}),o.a.createElement(H.a,{size:"large",disabled:this.state.isDisable,color:"primary",variant:"contained",onClick:function(){return e.checkPseudonym()}},"Lets Get Started")),o.a.createElement(U.Block,null),this.state.inProgress?o.a.createElement(T,null,o.a.createElement(V.a,{className:t.progress})):null,o.a.createElement(S,null,"\xa9",(new Date).getFullYear(),o.a.createElement("span",null,"\xa0Copyright: \xa0"),o.a.createElement("a",{style:{fontWeight:"bold",color:"black"},target:"_blank",rel:"noopener noreferrer",href:"https://ivehement.wordpress.com"},"Vehement")))}}]),t}(o.a.Component),Y=Object(y.b)(function(e){return Object(C.a)({},e)},function(e){return{switchPage:function(t){return e(E(t))},updatePseudonym:function(t){return e(b(t))}}})(function(e){var t=e.rootReducer,a=e.switchPage,n=e.updatePseudonym,i=q();return o.a.createElement(K,{classes:i,onPage:t.onPage,pseudonym:t.pseudonym,switchPage:a,updatePseudonym:n})}),$=a(195),X=(a(251),a(94)),Z=a(429),ee=a(99),te=a.n(ee),ae=a(445),ne=a(427),ie=a(428),re=a(425),le=a(426),oe=a(130),se=function(e){return o.a.createElement(X.a,e,o.a.createElement("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}))},ce=Object(M.a)(function(e){return{iconHover:{margin:e.spacing(2),"&:hover":{color:"black"}},icon:{margin:e.spacing(0),fontSize:30},title:{flexGrow:1},warn:"\n    color: red;\n    padding: 0 30px;\n  "}}),pe=function(e){e.participantNotify;var t=e.handleHomeClick,a=e.toggleDialog,n=e.warnClick,i=e.warning,r=e.onPage,l=e.switchPage,s=ce();return o.a.createElement(re.a,{position:"static"},o.a.createElement(le.a,null,o.a.createElement(H.a,{onClick:function(){return t()}},o.a.createElement(se,{className:s.iconHover,style:{fontSize:30,color:"#03fc98"}})),o.a.createElement(ae.a,{open:i,TransitionComponent:L,keepMounted:!0,"aria-labelledby":"alert-dialog-slide-title"},o.a.createElement(ne.a,null,o.a.createElement(ie.a,null,o.a.createElement("span",{className:s.warn},"Are you sure?")),o.a.createElement(H.a,{color:"secondary",variant:"outlined",onClick:function(){return a("warn",!1)}},"Cancel"),o.a.createElement(H.a,{onClick:function(){n()},color:"secondary",variant:"contained"},"Confirm"))),o.a.createElement(oe.a,{variant:"h6",className:s.title},"\xa0 aire"),2===r?o.a.createElement(H.a,{onClick:function(){1!==r&&l(r-1)}},o.a.createElement(Z.a,{item:!0,xs:8},o.a.createElement(te.a,{className:s.icon,style:{color:"#03fc98"}}))):null))},ue=a(101),me=a(196),de=Object(M.a)(function(e){return{pseudonym:{flexGrow:1,backgroundColor:e.palette.background.paper,color:"teal",fontFamily:"Roboto",fontSize:"3.7rem"}}}),he=function(e){var t=e.pseudonym,a=de();return o.a.createElement(me.a,null,o.a.createElement(T,null,o.a.createElement(U.Block,{paddingTop:"100px"}),o.a.createElement(ue.HeadingLevel,null,o.a.createElement(ue.HeadingLevel,null,o.a.createElement(ue.Heading,null,o.a.createElement(oe.a,{className:a.pseudonym},t))))))},ge=a(430),fe=function(e){function t(){var e;return Object(p.a)(this,t),(e=Object(m.a)(this,Object(d.a)(t).call(this))).changeAsk=function(t){e.setState({ask:t.target.value})},e.state={ask:""},e}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(ae.a,{fullWidth:!0,open:this.props.isSecondaryOpen,onClose:function(){e.props.toggleDialog("secondary",!1)},"aria-labelledby":"form-dialog-title"},o.a.createElement(ge.a,null,o.a.createElement(z.a,{id:"outlined-multiline-flexible",label:"Questionnaire",multiline:!0,rowsMax:"4",onChange:function(t){return e.changeAsk(t)},margin:"normal",variant:"outlined",autoFocus:!0})),o.a.createElement(ne.a,null,o.a.createElement(H.a,{onClick:function(){return e.props.toggleDialog("secondary",!1)},color:"primary"},"Cancel"),o.a.createElement(H.a,{onClick:function(){e.props.toggleDialog("secondary",!1),e.props.updatePollQuestions(e.state.ask)},color:"primary",variant:"contained"},"Confirm")))}}]),t}(o.a.Component),ye=a(431),Ee=a(432),Pe=a(377),ve=a(181),be=a.n(ve),ke=a(433),Ce=Object(M.a)(function(e){return{formControl:{margin:e.spacing(3)},group:{margin:e.spacing(1,0)},message:{display:"flex"},snacker:{backgroundColor:e.palette.secondary.main}}}),we=function(e){var t=e.listQnP,a=e.removeItem,n=Ce();return t.map(function(e,t){return o.a.createElement("div",{key:t},o.a.createElement(ye.a,null,o.a.createElement(Ee.a,{className:n.snacker,"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:n.message},o.a.createElement("span",null,"Q.",t+1," \xa0"),e,o.a.createElement(Pe.a,{onClick:function(){return a("questionPolling",t)},"aria-label":"delete",size:"small"},o.a.createElement(be.a,{id:"trash",fontSize:"small"})))})),o.a.createElement(ke.a,null))})},Oe=a(422),Se=a(182),je=a.n(Se),Ne=a(434),Ae=a(435),xe=Object(M.a)(function(e){return{button:{margin:e.spacing(1)},rightIcon:{marginLeft:e.spacing(1)},fab:{margin:e.spacing(1)}}}),Ie=function(e){var t=e.myref,a=e.listQnP,n=e.removeItem,i=e.toggleDialog,r=(e.space,e.isPrimaryOpen,e.isSecondaryOpen),l=e.updatePollQuestions,s=e.listQnPLength,c=e.switchPage,p=xe();return o.a.createElement(o.a.Fragment,null,o.a.createElement(me.a,null,o.a.createElement(Oe.a,{component:"nav","aria-label":"main mailbox folders"},o.a.createElement(we,{listQnP:a,removeItem:n}))),o.a.createElement(T,null,o.a.createElement(U.Block,{paddingTop:"100px"}),o.a.createElement("div",{id:"scroll",myref:t},o.a.createElement(Ne.a,{size:"large",onClick:function(e){return i("secondary",!0)},color:"secondary","aria-label":"add",className:p.fab},o.a.createElement(je.a,null))),o.a.createElement(fe,{isSecondaryOpen:r,toggleDialog:i,updatePollQuestions:l.bind(void 0)})),o.a.createElement(F,null,o.a.createElement(H.a,{onClick:function(){s>0&&c(2)},variant:"contained",color:"primary",className:p.button},"Next",o.a.createElement(Ae.a,{className:p.rightIcon},"send"))))},Le=a(183),Qe=a.n(Le),De={connect:function(){De.socket=Qe.a.connect("https://aire-api.onrender.com")},on:function(e,t){De.socket&&De.socket.on(e,function(e){t(e)})},emit:function(e,t){De.socket&&De.socket.emit(e,t)},removeListener:function(e){De.socket&&De.socket.removeListener(e)},socket:null},Te=De,Fe=a(379),Re=a(436),Ue=a(437),He={tempTotalParticipants:0},_e=function(e){function t(){var e;return Object(p.a)(this,t),e=Object(m.a)(this,Object(d.a)(t).call(this)),localStorage.getItem("tempTotalParticipants")?e.state=JSON.parse(localStorage.getItem("tempTotalParticipants")):(localStorage.setItem("tempTotalParticipants",JSON.stringify(He)),e.state=He),e}return Object(h.a)(t,e),Object(u.a)(t,[{key:"handleFinal",value:function(e){this.props.updateAdmin(e),this.props.switchPage(6),Te.emit("le poll",{isSecure:this.props.secureState,pseudonym:this.props.pseudonym,questions:this.props.listQnP,totalParticipants:e})}},{key:"handleParticipants",value:function(e){var t=this;e.target.value<1e3&&this.setState({tempTotalParticipants:e.target.value},function(){t.props.updateAdmin(t.state.tempTotalParticipants)})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(me.a,null,o.a.createElement(T,null,o.a.createElement(z.a,{id:"outlined-number",label:"Participants",onChange:function(t){return e.handleParticipants(t)},type:"number",className:this.props.classes.textField,defaultValue:0,InputLabelProps:{shrink:!0},margin:"normal",variant:"outlined",autoFocus:!0}),o.a.createElement(Fe.a,null,o.a.createElement(Re.a,{control:o.a.createElement(Ue.a,{size:"medium",checked:this.props.secureState,onClick:function(){return e.props.toggleSwitch()}}),label:"Secure"})))),o.a.createElement(T,null,o.a.createElement(U.Block,{paddingTop:"300px"}),o.a.createElement(H.a,{onClick:function(){if(e.state.tempTotalParticipants>1&&e.state.tempTotalParticipants<1e3)return e.handleFinal(e.state.tempTotalParticipants)},variant:"contained",color:"primary",className:this.props.classes.buttonDone},"Done")))}}]),t}(o.a.Component),We=Object(M.a)(function(e){return{buttonDone:{margin:e.spacing(1),fontSize:25},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),maxlength:200}}}),ze=function(e){var t=e.pseudonym,a=e.listQnP,n=e.secureState,i=e.totalParticipants,r=e.switchPage,l=e.toggleSwitch,s=e.isSecure,c=e.updateAdmin,p=We();return o.a.createElement(_e,{classes:p,isSecure:s,pseudonym:t,listQnP:a,secureState:n,switchPage:r,totalParticipants:i,toggleSwitch:l,updateAdmin:c})},Me=function(e){function t(){var e;return Object(p.a)(this,t),(e=Object(m.a)(this,Object(d.a)(t).call(this))).myRef=o.a.createRef(),e}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){window.scrollTo(0,this.myRef.offsetTop)}},{key:"updatePollQuestions",value:function(e){var t=this.props.listQnP;t.push(e),this.props.updateQ(t)}},{key:"render",value:function(){return this.props.isHomeClick?o.a.createElement(f.a,{to:"/"}):0===this.props.onPage?o.a.createElement(f.a,{to:"/"}):6===this.props.onPage?o.a.createElement(f.a,{to:"/live"}):o.a.createElement("div",null,o.a.createElement(pe,{participantNotify:this.props.participantNotify,toggleDialog:this.props.toggleDialog,handleHomeClick:this.props.handleHomeClick,warnClick:this.props.warnClick,warning:this.props.warning,onPage:this.props.onPage,switchPage:this.props.switchPage}),o.a.createElement(he,{pseudonym:this.props.pseudonym}),o.a.createElement("div",null,1===this.props.onPage?o.a.createElement(Ie,{myref:this.myRef,listQnP:this.props.listQnP,removeItem:this.props.removeItem,toggleDialog:this.props.toggleDialog,space:this.space,isPrimaryOpen:this.props.isPrimaryOpen,isSecondaryOpen:this.props.isSecondaryOpen,updatePollQuestions:this.updatePollQuestions.bind(this),listQnPLength:this.props.listQnP.length,switchPage:this.props.switchPage}):o.a.createElement(ze,{isSecure:this.props.isSecure,pseudonym:this.props.pseudonym,listQnP:this.props.listQnP,secureState:this.props.secureState,switchPage:this.props.switchPage,toggleSwitch:this.props.toggleSwitch,updateAdmin:this.props.updateAdmin,totalParticipants:this.props.totalParticipants})))}}]),t}(o.a.Component),Ge=Object(y.b)(function(e){return Object(C.a)({},e)},function(e){return{toggleDialog:function(t,a){return e(P(t,a))},handleHomeClick:function(t){return e({type:"HOME_CLICK"})},warnClick:function(t){return e({type:"WARN_CLICK"})},switchPage:function(t){return e(E(t))},removeItem:function(t,a){return e(function(e,t){return{type:"REMOVE_ITEM",payload:{surface:e,index:t}}}(t,a))},toggleSwitch:function(t){return e({type:"TOGGLE_SWITCH"})},updateQ:function(t){return e(k(t))},updateAdmin:function(t){return e({type:"UPDATE_ADMIN",payload:t})}}})(function(e){var t=e.rootReducer,a=e.toggleDialog,n=e.handleHomeClick,r=e.warnClick,l=e.switchPage,s=e.removeItem,c=e.toggleSwitch,p=e.updateQ,u=e.updateAdmin,m=Object(i.useStyletron)(),d=Object($.a)(m,2),h=(0,d[0])({marginLeft:d[1].sizing.scale1200});return o.a.createElement(Me,{space:h,listQnP:t.listQnP,onPage:t.onPage,participantNotify:t.participantNotify,warning:t.warning,pseudonym:t.pseudonym,isPrimaryOpen:t.isPrimaryOpen,isSecondaryOpen:t.isSecondaryOpen,isSecure:t.isSecure,secureState:t.secureState,totalParticipants:t.totalParticipants,toggleDialog:a,handleHomeClick:n,warnClick:r,switchPage:l,removeItem:s,toggleSwitch:c,updateQ:p,updateAdmin:u})}),Be=function(e){return o.a.createElement(X.a,e,o.a.createElement("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}))},Ve=Object(M.a)(function(e){return{iconHover:{margin:e.spacing(2),"&:hover":{color:"black"}},title:{flexGrow:1}}}),Je=function(e){var t=e.onPage,a=e.switchPage,n=Ve();return 0===t?o.a.createElement(f.a,{to:"/"}):o.a.createElement("div",null,o.a.createElement(re.a,{position:"static"},o.a.createElement(le.a,null,o.a.createElement(H.a,{onClick:function(){return a(0)}},o.a.createElement(Be,{className:n.iconHover,style:{fontSize:30,color:"#03fc98"}})),o.a.createElement(oe.a,{variant:"h6",className:n.title},"\xa0 aire"))),o.a.createElement(me.a,null,o.a.createElement(oe.a,{variant:"h6",className:n.title},o.a.createElement(T,null,"Live Polls"))))},qe=a(438),Ke=a(184),Ye=a.n(Ke),$e=Object(M.a)(function(e){return{margin:{margin:e.spacing(2)}}}),Xe=function(e){var t=e.participantNotify,a=e.switchPage,n=$e();return o.a.createElement(H.a,{onClick:function(){return a(3)}},o.a.createElement(qe.a,{color:"secondary",className:n.margin,invisible:t,variant:"dot"},o.a.createElement(Ye.a,{style:{color:"#03fc98"}})))},Ze=function(e){return o.a.createElement(X.a,e,o.a.createElement("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}))},et=Object(M.a)(function(e){return{iconHover:{margin:e.spacing(2),"&:hover":{color:"black"}},icon:{margin:e.spacing(0),fontSize:30},title:{flexGrow:1},warn:"\n    color: red;\n    padding: 0 30px;\n  "}}),tt=function(e){var t=e.isAdmin,a=e.participantNotify,n=e.handleHomeClick,i=e.toggleDialog,r=e.warnClick,l=e.warning,s=e.onPage,c=e.switchPage,p=et();return o.a.createElement(re.a,{position:"static"},o.a.createElement(le.a,null,o.a.createElement(H.a,{onClick:function(){return n()}},o.a.createElement(Ze,{className:p.iconHover,style:{fontSize:30,color:"#03fc98"}})),o.a.createElement(ae.a,{open:l,TransitionComponent:L,keepMounted:!0,"aria-labelledby":"alert-dialog-slide-title"},o.a.createElement(ne.a,null,o.a.createElement(ie.a,null,o.a.createElement("span",{className:p.warn},"Are you sure?")),o.a.createElement(H.a,{color:"secondary",variant:"outlined",onClick:function(){return i("warn",!1)}},"Cancel"),o.a.createElement(H.a,{onClick:function(){r()},color:"secondary",variant:"contained"},"Confirm"))),o.a.createElement(oe.a,{variant:"h6",className:p.title},"\xa0 aire"),1===t?o.a.createElement("div",null,6===s?o.a.createElement(Xe,{switchPage:c,participantNotify:a}):o.a.createElement(H.a,{onClick:function(){c(6)}},o.a.createElement(Z.a,{item:!0,xs:8},o.a.createElement(te.a,{className:p.icon,style:{color:"#03fc98"}})))):null))},at=Object(M.a)(function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)},padding:{padding:e.spacing(0,2)},snacker:{backgroundColor:"teal"}}}),nt=function(e){var t=e.polls,a=e.switchPage,n=e.updatePseudonym,i=e.updateParticipants,r=at();return t?Object.keys(t).map(function(e,l){return o.a.createElement(ye.a,{key:l},o.a.createElement(Ee.a,{className:r.snacker,"aria-describedby":"client-snackbar",message:o.a.createElement(qe.a,{className:r.margin,invisible:!t[e],color:"secondary",variant:"dot"},o.a.createElement(oe.a,{className:r.padding},e))}),o.a.createElement(H.a,{onClick:function(){fetch("https://aire-api.onrender.com/listparticipants",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({pseudonym:e})}).then(function(e){return e.json()}).then(function(t){n(e),i(t),t&&a(4)})},className:r.margin,size:"small"},"Enter"))}):null},it=a(185),rt=function(e,t){var a=e.yes,n=e.no;return{labels:["Neutral","Yes","No"],datasets:[{data:[t-(a+n),a,n],backgroundColor:["#CCC","#36A2EB","#FFCE56"],hoverBackgroundColor:["#FF6384","#36A2EB","#FFCE56"]}]}},lt=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return this.props.listQnP.map(function(t,a){return o.a.createElement(me.a,{key:a},o.a.createElement(ye.a,null,o.a.createElement(Ee.a,{className:e.props.classes.snacker,"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:e.props.classes.message},o.a.createElement("span",null,"Q.",a+1," \xa0"),t)})),o.a.createElement(it.a,{data:function(){return e.props.liveFeedUpdate[a]?rt(e.props.liveFeedUpdate[a],e.props.total):rt({yes:0,no:0},e.props.totalParticipants)}}),o.a.createElement(ke.a,null))})}}]),t}(o.a.Component),ot=Object(M.a)(function(e){return{formControl:{margin:e.spacing(3)},group:{margin:e.spacing(1,0)},message:{display:"flex"},snacker:{backgroundColor:e.palette.primary.main}}}),st=function(e){var t=e.listQnP,a=e.liveFeedUpdate,n=e.total,i=e.totalParticipants,r=ot();return o.a.createElement(lt,{classes:r,listQnP:t,liveFeedUpdate:a,total:n,totalParticipants:i})},ct=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.handleLiveFeed(this.props.pseudonym)}},{key:"handleLiveFeed",value:function(e){var t=this;this.props.liveFeedUpdate||fetch("https://aire-api.onrender.com/fetchlivefeed",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({pseudonym:e})}).then(function(e){return e.json()}).then(function(e){t.props.liveFeedUpdate(e)})}},{key:"render",value:function(){return o.a.createElement(me.a,null,o.a.createElement(tt,{handleHomeClick:this.props.handleHomeClick,warnClick:this.props.warnClick,isAdmin:this.props.isAdmin,onPage:this.props.onPage,participantNotify:this.props.participantNotify,pseudonym:this.props.pseudonym,switchPage:this.props.switchPage,toggleDialog:this.props.toggleDialog,warning:this.props.warning}),o.a.createElement(T,null,o.a.createElement("h2",null,this.props.pseudonym," | Live Poll")),o.a.createElement(st,{listQnP:this.props.listQnP,liveFeedUpdate:this.props.liveFeedUpdate,total:this.props.total,totalParticipants:this.props.totalParticipants}))}}]),t}(o.a.Component),pt=a(421),ut=a(439),mt=Object(M.a)(function(e){return{formControl:{margin:e.spacing(3)},group:{margin:e.spacing(1,0)},message:{display:"flex"},snacker:{backgroundColor:e.palette.primary.main}}}),dt=function(e){var t=e.listQnP,a=e.handleRadio,n=mt();return t.map(function(e,t){return o.a.createElement("div",{key:t},o.a.createElement(ye.a,null,o.a.createElement(Ee.a,{className:n.snacker,"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:n.message},o.a.createElement("span",null,"Q.",t+1," \xa0"),e)})),o.a.createElement(pt.a,{component:"fieldset",className:n.formControl},o.a.createElement(ut.a,{row:!0,className:n.group,onChange:function(e){return a(e,t)}},o.a.createElement(Re.a,{value:"1",control:o.a.createElement(Q,null),label:"Yes",labelPlacement:"end"}),o.a.createElement(Re.a,{value:"0",control:o.a.createElement(D,null),label:"No",labelPlacement:"end"}))),o.a.createElement(ke.a,null))})},ht=Object(M.a)(function(e){return{button:{margin:e.spacing(1)}}}),gt=function(e){var t=e.handleRadio,a=e.handleInitialSubmit,n=e.listQnP,i=e.onPage,r=e.pseudonym,l=e.switchPage,s=ht();return o.a.createElement("div",null,o.a.createElement(Je,{onPage:i,switchPage:l.bind(void 0)}),o.a.createElement(he,{pseudonym:r}),o.a.createElement(dt,{handleRadio:t.bind(void 0),listQnP:n}),o.a.createElement(T,null,o.a.createElement(H.a,{onClick:function(){return a()},variant:"contained",color:"primary",className:s.button},"Submit")))},ft=a(446),yt=Object(M.a)(function(e){return{message:{display:"flex"}}}),Et=function(e){var t=e.listParticipants,a=e.updateInvite,n=yt();return Object.keys(t).map(function(e,i){return t[e].name?o.a.createElement("div",{key:i},o.a.createElement(ye.a,{disabled:!0,button:!0},o.a.createElement(ft.a,{className:n.message,label:"".concat(Number(e)+1," | ").concat(t[e].name),color:"primary"})),o.a.createElement(ke.a,null)):o.a.createElement("div",{key:i},o.a.createElement(ye.a,{onClick:function(){return a(!0,i)},button:!0},o.a.createElement(ft.a,{label:Number(e)+1,color:"primary"})),o.a.createElement(ke.a,null))})},Pt=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={tempParticipantName:"",index:-1,isApproval:!1,flag:0},a.props=e,a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(){this.state.index>-1&&(this.state.flag||this.toggleApproval(),"yes"===this.props.listParticipants[this.state.index].isAdded&&this.fetchQuestions(),"no"===this.props.listParticipants[this.state.index].isAdded&&(this.state.flag||this.toggleApproval(),this.props.listParticipants[this.state.index].isAdded="neutral",Te.emit("update serverListParticipants",{pseudonym:this.props.pseudonym,index:this.state.index,isAddedAs:"neutral"})))}},{key:"tempChangeName",value:function(e){this.setState({tempParticipantName:e.target.value})}},{key:"toggleApproval",value:function(){this.setState(function(e){return{isApproval:!e.isApproval}}),this.state.flag||this.setState({flag:1})}},{key:"disableCurrentParticipant",value:function(e,t){this.toggleApproval(),this.setState({index:e});var a=this.props.listParticipants;a[e].name=t,this.props.polls[this.props.pseudonym]?(Te.emit("update serverListParticipants",{pseudonym:this.props.pseudonym,index:e,name:t}),this.props.updateParticipants(a)):(Te.emit("update serverListParticipants",{pseudonym:this.props.pseudonym,index:e,name:t}),this.props.updateParticipants(a),this.fetchQuestions())}},{key:"fetchQuestions",value:function(){var e=this;fetch("https://aire-api.onrender.com/fetchq",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({pseudonym:this.props.pseudonym})}).then(function(e){return e.json()}).then(function(t){e.props.updateQ(t),e.props.switchPage(5)})}},{key:"render",value:function(){var e=this,t=this.props.classes;return o.a.createElement(T,null,o.a.createElement(Oe.a,{component:"nav",className:t.root,"aria-label":"mailbox folders"},o.a.createElement(Et,{listParticipants:this.props.listParticipants,updateInvite:this.props.updateInvite})),o.a.createElement(ae.a,{fullWidth:!0,open:this.props.wantParticipant,onClose:function(){e.props.updateInvite(!1)},"aria-labelledby":"form-dialog-title"},o.a.createElement(ge.a,null,o.a.createElement(z.a,{required:!0,id:"outlined-multiline-flexible",label:"Name",onChange:function(t){return e.tempChangeName(t)},margin:"normal",variant:"outlined",autoFocus:!0})),o.a.createElement(ne.a,null,o.a.createElement(H.a,{onClick:function(){return e.props.updateInvite(!1)},color:"primary"},"Cancel"),o.a.createElement(H.a,{onClick:function(){e.state.tempParticipantName&&(e.disableCurrentParticipant(e.props.currentParticipantClickSerial,e.state.tempParticipantName),e.props.updateInvite(!1))},color:"primary",variant:"contained"},"Register"))),o.a.createElement(ae.a,{fullWidth:!0,open:this.state.isApproval,"aria-labelledby":"form-dialog-title"},o.a.createElement(ge.a,null,o.a.createElement(T,null,o.a.createElement("div",null,"Waiting for approval...")))))}}]),t}(o.a.Component),vt=Object(M.a)(function(e){return{root:{width:"100%",maxWidth:"360px",backgroundColor:e.palette.background.paper}}}),bt=function(e){var t=e.currentParticipantClickSerial,a=e.listParticipants,n=e.polls,i=e.pseudonym,r=e.switchPage,l=e.updateQ,s=e.updateInvite,c=e.wantParticipant,p=e.updateParticipants,u=vt();return o.a.createElement(Pt,{classes:u,currentParticipantClickSerial:t,listParticipants:a,polls:n,pseudonym:i,wantParticipant:c,switchPage:r,updateQ:l,updateInvite:s,updateParticipants:p})},kt=a(187),Ct=a.n(kt),wt=a(188),Ot=a.n(wt),St=Object(M.a)(function(e){return{message:{display:"flex"},snacker:{backgroundColor:e.palette.primary.main}}}),jt=function(e){var t=e.listParticipants,a=e.handleApproval,n=St();return Object.keys(t).map(function(e,i){return"neutral"===t[e].isAdded&&t[e].name?o.a.createElement("div",{key:i},o.a.createElement(ye.a,null,o.a.createElement(Ee.a,{className:n.snacker,"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:n.message},"".concat(Number(e)+1," | ").concat(t[e].name))}),o.a.createElement(Pe.a,{"aria-label":"delete",size:"small",style:{color:"red"},onClick:null},o.a.createElement(Ct.a,null)),o.a.createElement(Ae.a,{fontSize:"large",style:{color:"white"}}),o.a.createElement(Pe.a,{"aria-label":"delete",size:"small",style:{color:"blue"},onClick:function(){return a("yes",e)}},o.a.createElement(Ot.a,null)))):null})},Nt=a(189),At=a.n(Nt),xt=Object(M.a)(function(e){return{message:{display:"flex"},snacker:{backgroundColor:e.palette.primary.main}}}),It=function(e){var t=e.listParticipants,a=xt();return Object.keys(t).map(function(e,n){return"yes"===t[e].isAdded&&t[e].name?o.a.createElement("div",{key:n},o.a.createElement(ye.a,null,o.a.createElement(Ee.a,{className:a.snacker,"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:a.message},"".concat(Number(e)+1," | ").concat(t[e].name))}),o.a.createElement(Ae.a,{fontSize:"large",style:{color:"white"}}),o.a.createElement(Ae.a,{style:{color:"green"}},o.a.createElement(At.a,null)),o.a.createElement(Ae.a,{fontSize:"large",style:{color:"white"}}))):null})},Lt=Object(M.a)(function(e){return{root:{width:"100%",maxWidth:"360px",backgroundColor:e.palette.background.paper}}}),Qt=function(e){var t=e.handleApproval,a=e.listParticipants,n=e.pseudonym,i=Lt();return o.a.createElement("div",null,o.a.createElement(he,{pseudonym:n}),o.a.createElement(me.a,null,o.a.createElement(Oe.a,{component:"nav",className:i.root,"aria-label":"mailbox folders"},o.a.createElement(jt,{handleApproval:t,listParticipants:a}))),o.a.createElement(me.a,null,o.a.createElement(Oe.a,{component:"nav",className:i.root,"aria-label":"mailbox folders"},o.a.createElement(It,{listParticipants:a}))))},Dt=a(440),Tt=a(441),Ft=Object(M.a)(function(e){return{formControl:{margin:e.spacing(3)},group:{margin:e.spacing(1,0)},message:{display:"flex"},snacker:{backgroundColor:e.palette.primary.main},button:{margin:e.spacing(1)}}}),Rt=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={pollResult:{}},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"handleApproval",value:function(e,t){Te.emit("update serverListParticipants",{pseudonym:this.props.pseudonym,index:t,isAddedAs:e})}},{key:"handleInitialSubmit",value:function(){Object.keys(this.state.pollResult).length===this.props.listQnP.length&&(Te.emit("update pollResult",{pollResult:this.state.pollResult,pseudonym:this.props.pseudonym}),this.props.submit(this.state.pollResult),this.props.switchPage(6))}},{key:"handleRadio",value:function(e,t){var a=this.state.pollResult;a[t]=e.target.value,this.setState({pollResult:a})}},{key:"render",value:function(){return 0===this.props.onPage?o.a.createElement(f.a,{to:"/"}):o.a.createElement("div",null,-1===this.props.onPage?o.a.createElement("div",null,o.a.createElement(Je,{onPage:this.props.onPage,switchPage:this.props.switchPage}),o.a.createElement(o.a.Fragment,null,o.a.createElement(Dt.a,null),o.a.createElement(Tt.a,{maxWidth:"sm"},o.a.createElement(Oe.a,{component:"nav","aria-label":"main mailbox folders"},o.a.createElement(U.Block,{paddingTop:"50px"}),o.a.createElement(nt,{polls:this.props.polls,switchPage:this.props.switchPage,updatePseudonym:this.props.updatePseudonym,updateParticipants:this.props.updateParticipants}),o.a.createElement(U.Block,{paddingTop:"50px"}))))):o.a.createElement("div",null,3===this.props.onPage?o.a.createElement("div",null,o.a.createElement(tt,{handleHomeClick:this.props.handleHomeClick,warnClick:this.props.warnClick,isAdmin:this.props.isAdmin,onPage:this.props.onPage,participantNotify:this.props.participantNotify,pseudonym:this.props.pseudonym,switchPage:this.props.switchPage,toggleDialog:this.props.toggleDialog,warning:this.props.warning}),o.a.createElement(Qt,{handleApproval:this.handleApproval.bind(this),listParticipants:this.props.listParticipants,pseudonym:this.props.pseudonym})):o.a.createElement("div",null,4===this.props.onPage?o.a.createElement("div",null,o.a.createElement(Je,{onPage:this.props.onPage,switchPage:this.props.switchPage}),o.a.createElement(bt,{currentParticipantClickSerial:this.props.currentParticipantClickSerial,listParticipants:this.props.listParticipants,polls:this.props.polls,pseudonym:this.props.pseudonym,wantParticipant:this.props.wantParticipant,switchPage:this.props.switchPage,updateQ:this.props.updateQ,updateInvite:this.props.updateInvite,updateParticipants:this.props.updateParticipants})):o.a.createElement("div",null,5===this.props.onPage?o.a.createElement(gt,{handleRadio:this.handleRadio.bind(this),handleInitialSubmit:this.handleInitialSubmit.bind(this),listQnP:this.props.listQnP,onPage:this.props.onPage,pseudonym:this.props.pseudonym,switchPage:this.props.switchPage}):o.a.createElement(ct,{classes:this.props.classes,warnClick:this.props.warnClick,handleHomeClick:this.props.handleHomeClick,isAdmin:this.props.isAdmin,listQnP:this.props.listQnP,liveFeedUpdate:this.props.liveFeedUpdate,onPage:this.props.onPage,participantNotify:this.props.participantNotify,pseudonym:this.props.pseudonym,switchPage:this.props.switchPage,toggleDialog:this.props.toggleDialog,total:this.props.total,totalParticipants:this.props.totalParticipants,warning:this.props.warning})))))}}]),t}(o.a.Component),Ut=Object(y.b)(function(e){return Object(C.a)({},e)},function(e){return{submit:function(t){return e({type:"SUBMIT",payload:t})},switchPage:function(t){return e(E(t))},handleHomeClick:function(){return e({type:"HOME_CLICK"})},warnClick:function(t){return e({type:"WARN_CLICK"})},toggleDialog:function(t){return e(P(t))},updateQ:function(t){return e(k(t))},updateInvite:function(t,a){return e(function(e){return{type:"UPDATE_INVITE_SWITCHES",payload:{want:e,idx:arguments.length>1&&void 0!==arguments[1]?arguments[1]:""}}}(t,a))},updatePseudonym:function(t){return e(b(t))},updateParticipants:function(t){return e(v(t))}}})(function(e){var t=e.rootReducer,a=e.submit,n=e.switchPage,i=e.handleHomeClick,r=e.warnClick,l=e.toggleDialog,s=e.updateInvite,c=e.updateQ,p=e.updatePseudonym,u=e.updateParticipants,m=Ft();return o.a.createElement(Rt,{classes:m,currentParticipantClickSerial:t.currentParticipantClickSerial,pseudonym:t.pseudonym,onPage:t.onPage,isAdmin:t.isAdmin,listParticipants:t.listParticipants,liveFeedUpdate:t.liveFeedUpdate,participantNotify:t.participantNotify,polls:t.polls,warning:t.warning,listQnP:t.listQnP,total:t.total,totalParticipants:t.totalParticipants,wantParticipant:t.wantParticipant,submit:a,switchPage:n,handleHomeClick:i,warnClick:r,toggleDialog:l,updateInvite:s,updateQ:c,updatePseudonym:p,updateParticipants:u})}),Ht=function(e){function t(){return Object(p.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){Te.connect(),this.attachSocketListeners(),Te.emit("add user","")}},{key:"componentWillUnmount",value:function(){}},{key:"attachSocketListeners",value:function(){var e=this;Te.on("update live feed",function(t){return e.props.handleLiveFeedUpdate(t)}),Te.on("live polls",function(t){return e.handleNewPolls(t)}),Te.on("update clientListParticipants",function(t){return e.props.updateParticipants(t)})}},{key:"handleNewPolls",value:function(e){var t=Object.keys(e).indexOf(this.props.pseudonym),a=this.props.onPage;-1!==t||4!==a&&5!==a&&6!==a||(a=0),this.props.updateLivePolls(e),this.props.switchPage(a),0===a&&(this.props.updatePollResult({}),this.props.updateLiveFeed({}))}},{key:"render",value:function(){return o.a.createElement(g.a,null,o.a.createElement(f.d,null,o.a.createElement(f.b,{path:"/",component:function(){return o.a.createElement(Y,null)},exact:!0}),o.a.createElement(f.b,{path:"/unique",component:function(){return o.a.createElement(Ge,null)}}),o.a.createElement(f.b,{path:"/live",component:function(){return o.a.createElement(Ut,null)}}),o.a.createElement(f.b,{component:function(){return o.a.createElement("h1",{style:{color:"red",textAlign:"center",paddingTop:"40vh"}},"Error 404: Not Found!")}})))}}]),t}(o.a.Component),_t=Object(y.b)(function(e){return{pseudonym:e.rootReducer.pseudonym,onPage:e.rootReducer.onPage}},function(e){return{updateParticipants:function(t){return e(v(t))},updateLivePolls:function(t){return e({type:"LIVE_POLLS",payload:t})},handleLiveFeedUpdate:function(t){return e({type:"LIVE_FEED_UPDATE",payload:t})},switchPage:function(t){return e(E(t))},updatePollResult:function(t){return e({type:"POLLRESULT",payload:t})},updateLiveFeed:function(t){return e({type:"UPDATE_FEED",payload:t})}}})(Ht);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Wt=a(30),zt=a(190),Mt=a(129),Gt=a(191),Bt=a.n(Gt),Vt=function(e,t){return Object.assign({},e,t)},Jt={currentParticipantClickSerial:-1,isHomeClick:!1,isAdmin:0,isPrimaryOpen:!1,isSecondaryOpen:!1,listParticipants:{},listQnP:[],liveFeedUpdate:{},onPage:0,participantName:"",participantNotify:!1,password:"",polls:{},pollResult:{},pseudonym:"flai",secureState:!1,totalParticipants:0,total:0,wantParticipant:!1,warning:!1},qt=function(e,t){return Te.emit("update pollResult",{pseudonym:e.pseudonym,pollResult:t.payload}),Vt(e,{pollResult:t.payload})},Kt=function(e,t,a){return"primary"===t?Vt(e,{isPrimaryOpen:a}):"secondary"===t?Vt(e,{isSecondaryOpen:a}):"warn"===t?Vt(e,{warning:a}):void 0},Yt=function(e){return Te.emit("unpoll",e.pseudonym),Vt(e,{onPage:0,warning:!1,isAdmin:0,liveFeedUpdate:{},listParticipants:{},totalParticipants:0})},$t=Object(Wt.c)({rootReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Jt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLICK_WARN":return Vt(e,{liveFeedUpdate:{},onPage:0,isAdmin:0});case"HOME_CLICK":return Vt(e,{warning:!0});case"LIVE_FEED_UPDATE":return Vt(e,{liveFeedUpdate:t.payload.update,total:t.payload.total});case"LIVE_POLLS":return Vt(e,{polls:t.payload});case"POLLRESULT":return Vt(e,{pollResult:t.payload});case"PSEUDONYM":return Te.emit("update pseudonym",t.payload),Vt(e,{pseudonym:t.payload});case"REMOVE_ITEM":var a=e.listQnP;return a.splice(Number(t.payload.index),1),Vt(e,{listQnP:a});case"SUBMIT":return qt(e,t);case"SWITCH_PAGE":return Vt(e,{onPage:t.payload});case"TOGGLE_DIALOG":return Kt(e,t.payload.surface,t.payload.dialogSwitch);case"TOGGLE_SWITCH":return Vt(e,{secureState:!e.secureState});case"UPDATE_ADMIN":return Vt(e,{isAdmin:1,totalParticipants:t.payload});case"UPDATE_INVITE_SWITCHES":return Vt(e,{wantParticipant:t.payload.want,currentParticipantClickSerial:t.payload.idx>=0?t.payload.idx:e.currentParticipantClickSerial});case"UPDATE_FEED":return Vt(e,{liveFeedUpdate:t.payload});case"UPDATE_LIST":return Vt(e,{listParticipants:t.payload});case"UPDATE_Q":return Vt(e,{listQnP:t.payload});case"WARN_CLICK":return Yt(e);default:return e}}}),Xt={key:"airPoll",storage:Bt.a},Zt=Object(Mt.a)(Xt,$t),ea=Object(Wt.d)(Zt,Object(Wt.a)(zt.a)),ta=Object(Mt.b)(ea),aa=a(192),na=new r.a;c.a.render(o.a.createElement(y.a,{store:ea},o.a.createElement(aa.a,{loading:null,persistor:ta},o.a.createElement(n.Provider,{value:na,debug:void 0,debugAfterHydration:!0},o.a.createElement(i.BaseProvider,{theme:i.LightTheme},o.a.createElement(_t,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[206,1,2]]]);
//# sourceMappingURL=main.f47524c8.chunk.js.map