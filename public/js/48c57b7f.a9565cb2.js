(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["48c57b7f"],{"02fa":function(t,e,n){var a=n("268f"),r=n("e265"),o=n("a4bb"),c=n("c47a");function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},s=o(n);"function"===typeof r&&(s=s.concat(r(n).filter(function(t){return a(n,t).enumerable}))),s.forEach(function(e){c(t,e,n[e])})}return t}t.exports=s},"268f":function(t,e,n){t.exports=n("fde4")},"32a6":function(t,e,n){var a=n("241e"),r=n("c3a1");n("ce7e")("keys",function(){return function(t){return r(a(t))}})},3964:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-scroll-area",{staticStyle:{height:"calc(100vh - 56px)"},attrs:{"thumb-style":t.getThumbStyle}},[n("q-page",{staticClass:"admin__main"},[n("div",{staticClass:"q-pa-md"},[n("q-breadcrumbs",{attrs:{"active-color":"teal"}},[n("q-breadcrumbs-el",{attrs:{icon:"home",label:"Home",to:"/"}}),n("q-breadcrumbs-el",{attrs:{label:"Dashboard",to:"/admin"}}),n("q-breadcrumbs-el",{attrs:{label:"Events"}})],1)],1),n("div",{staticClass:"q-pa-md q-gutter-y-md"},[n("q-btn",{attrs:{color:"secondary",to:"/admin/event/create"}},[t._v("Add event")]),n("q-card",[n("q-list",{staticClass:"rounded-borders",attrs:{bordered:""}},[n("q-item-label",{attrs:{header:""}},[t._v("Events")]),t._l(t.events,function(e,a){return n("q-item",{key:a},[n("q-item-section",{attrs:{avatar:"",top:""}},[n("q-icon",{attrs:{name:"mdi-calendar",color:"black",size:"34px"}})],1),n("q-item-section",{staticClass:"col-2 gt-sm",attrs:{top:""}},[n("q-item-label",{staticClass:"q-mt-sm"},[t._v("Event - "+t._s(e.created_at))])],1),n("q-space"),n("q-item-section",{attrs:{top:"",side:""}},[n("div",{staticClass:"text-grey-8 q-gutter-xs"},[n("q-btn",{staticClass:"ml-auto",attrs:{size:"12px",dense:"",round:"",flat:"",color:"info",to:"/event/show/"+e.id}},[n("q-icon",{attrs:{name:"remove_red_eye"}}),n("q-tooltip",[t._v("Views")])],1),n("q-btn",{staticClass:"mx-2",attrs:{size:"12px",dense:"",round:"",flat:"",color:"warning",to:"/admin/event/edit/"+e.id}},[n("q-icon",{attrs:{name:"edit"}}),n("q-tooltip",[t._v("Edit")])],1),n("q-btn",{attrs:{size:"12px",dense:"",round:"",flat:"",color:"negative"},on:{click:function(n){return t.deleteEvent(e.id)}}},[n("q-icon",{attrs:{name:"delete_forever"}}),n("q-tooltip",[t._v("Delete")])],1)],1)])],1)}),n("q-separator",{attrs:{spaced:""}})],2)],1)],1)])],1)},r=[],o=n("02fa"),c=n.n(o),s=n("2f62"),i={name:"EventShow",data:function(){return{events:[]}},components:{},computed:c()({},Object(s["c"])(["mobileDetect","getThumbStyle"])),watch:{},beforeMount:function(){var t=this;this.$axios.get("get_events").then(function(e){t.events=e.data})},mounted:function(){},methods:{deleteEvent:function(t){var e=this;this.$q.dialog({title:"Подтвердите",message:"Вы точно хотите удалить?",cancel:!0,persistent:!0}).onOk(function(){e.$axios.post("delete_event/"+t).then(function(){e.events.forEach(function(n,a){if(n.id===t)return e.events.splice(a,1)}),e.$q.notify({color:"teal",icon:"check_circle",message:"Deleted",position:"top",timeout:200})})})}}},l=i,u=n("2877"),f=Object(u["a"])(l,a,r,!1,null,null,null);e["default"]=f.exports},"454f":function(t,e,n){n("46a7");var a=n("584a").Object;t.exports=function(t,e,n){return a.defineProperty(t,e,n)}},"46a7":function(t,e,n){var a=n("63b6");a(a.S+a.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"85f2":function(t,e,n){t.exports=n("454f")},"8aae":function(t,e,n){n("32a6"),t.exports=n("584a").Object.keys},a4bb:function(t,e,n){t.exports=n("8aae")},bf90:function(t,e,n){var a=n("36c3"),r=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return r(a(t),e)}})},c47a:function(t,e,n){var a=n("85f2");function r(t,e,n){return e in t?a(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}t.exports=r},ce7e:function(t,e,n){var a=n("63b6"),r=n("584a"),o=n("294c");t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],c={};c[t]=e(n),a(a.S+a.F*o(function(){n(1)}),"Object",c)}},e265:function(t,e,n){t.exports=n("ed33")},ed33:function(t,e,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},fde4:function(t,e,n){n("bf90");var a=n("584a").Object;t.exports=function(t,e){return a.getOwnPropertyDescriptor(t,e)}}}]);