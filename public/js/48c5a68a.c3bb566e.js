(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["48c5a68a"],{"02fa":function(t,e,n){var r=n("268f"),a=n("e265"),c=n("a4bb"),o=n("c47a");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=c(n);"function"===typeof a&&(i=i.concat(a(n).filter(function(t){return r(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}t.exports=i},"268f":function(t,e,n){t.exports=n("fde4")},"2bba":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-scroll-area",{staticStyle:{height:"calc(100vh - 56px)"},attrs:{"thumb-style":t.getThumbStyle}},[n("q-page",{},[n("div",{staticClass:"q-pa-md"},[n("h3",{staticClass:"text-center"},[t._v(t._s(t.$t("faq_title")))]),t._l(t.allQuestions,function(e,r){return n("q-expansion-item",{key:e.id,attrs:{"expand-separator":"",icon:"question_answer",label:r+1+" - "+e["question_"+t.$t("prefix")],"header-class":"text-cyan-8"}},[n("q-card",[n("q-card-section",[t._v("\n             "+t._s(e["answer_"+t.$t("prefix")])+"\n          ")])],1)],1)})],2)])],1)},a=[],c=n("02fa"),o=n.n(c),i=n("2f62"),u={name:"Faq",meta:{titleTemplate:function(t){return"".concat(t," - Faq")},meta:{description:{name:"description",content:"Faq Page 1"},keywords:{name:"keywords",content:"Faq website"}}},data:function(){return{allQuestions:[1]}},computed:o()({},Object(i["c"])(["getThumbStyle","mobileDetect"])),beforeMount:function(){var t=this;this.$axios.get("get_questions").then(function(e){t.allQuestions=e.data})}},f=u,s=n("2877"),l=Object(s["a"])(f,r,a,!1,null,"3b71c866",null);e["default"]=l.exports},"32a6":function(t,e,n){var r=n("241e"),a=n("c3a1");n("ce7e")("keys",function(){return function(t){return a(r(t))}})},"454f":function(t,e,n){n("46a7");var r=n("584a").Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},"46a7":function(t,e,n){var r=n("63b6");r(r.S+r.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"85f2":function(t,e,n){t.exports=n("454f")},"8aae":function(t,e,n){n("32a6"),t.exports=n("584a").Object.keys},a4bb:function(t,e,n){t.exports=n("8aae")},bf90:function(t,e,n){var r=n("36c3"),a=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return a(r(t),e)}})},c47a:function(t,e,n){var r=n("85f2");function a(t,e,n){return e in t?r(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}t.exports=a},ce7e:function(t,e,n){var r=n("63b6"),a=n("584a"),c=n("294c");t.exports=function(t,e){var n=(a.Object||{})[t]||Object[t],o={};o[t]=e(n),r(r.S+r.F*c(function(){n(1)}),"Object",o)}},e265:function(t,e,n){t.exports=n("ed33")},ed33:function(t,e,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},fde4:function(t,e,n){n("bf90");var r=n("584a").Object;t.exports=function(t,e){return r.getOwnPropertyDescriptor(t,e)}}}]);