(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["48c5a68a"],{"02fa":function(t,e,n){var a=n("268f"),r=n("e265"),c=n("a4bb"),o=n("c47a");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=c(n);"function"===typeof r&&(i=i.concat(r(n).filter(function(t){return a(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}t.exports=i},"268f":function(t,e,n){t.exports=n("fde4")},"2bba":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-scroll-area",{staticStyle:{height:"calc(100vh - 56px)"},attrs:{"thumb-style":t.getThumbStyle}},[n("q-page",{staticClass:"wrap"},[n("div",{staticClass:"q-pa-md"},[n("h3",{staticClass:"text-center"},[t._v(t._s(t.$t("faq_title")))]),t._l(t.allQuestions,function(e,a){return n("q-expansion-item",{key:e.id,attrs:{"expand-separator":"",icon:"question_answer",label:a+1+" - "+e["question_"+t.$t("prefix")],"header-class":"text-cyan-7","expand-icon-class":"text-cyan-7"}},[n("q-card",[n("q-card-section",[t._v("\n             "+t._s(e["answer_"+t.$t("prefix")])+"\n          ")])],1)],1)})],2)])],1)},r=[],c=n("02fa"),o=n.n(c),i=n("2f62"),u={name:"Faq",meta:{titleTemplate:function(t){return"".concat(t," - Faq")},meta:{description:{name:"description",content:"Faq Page 1"},keywords:{name:"keywords",content:"Faq website"}}},data:function(){return{allQuestions:[1]}},computed:o()({},Object(i["c"])(["getThumbStyle","mobileDetect"])),beforeMount:function(){var t=this;this.$axios.get("get_questions").then(function(e){t.allQuestions=e.data})}},s=u,f=n("2877"),l=Object(f["a"])(s,a,r,!1,null,"2788e618",null);e["default"]=l.exports},"32a6":function(t,e,n){var a=n("241e"),r=n("c3a1");n("ce7e")("keys",function(){return function(t){return r(a(t))}})},"454f":function(t,e,n){n("46a7");var a=n("584a").Object;t.exports=function(t,e,n){return a.defineProperty(t,e,n)}},"46a7":function(t,e,n){var a=n("63b6");a(a.S+a.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"85f2":function(t,e,n){t.exports=n("454f")},"8aae":function(t,e,n){n("32a6"),t.exports=n("584a").Object.keys},a4bb:function(t,e,n){t.exports=n("8aae")},bf90:function(t,e,n){var a=n("36c3"),r=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return r(a(t),e)}})},c47a:function(t,e,n){var a=n("85f2");function r(t,e,n){return e in t?a(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}t.exports=r},ce7e:function(t,e,n){var a=n("63b6"),r=n("584a"),c=n("294c");t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],o={};o[t]=e(n),a(a.S+a.F*c(function(){n(1)}),"Object",o)}},e265:function(t,e,n){t.exports=n("ed33")},ed33:function(t,e,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},fde4:function(t,e,n){n("bf90");var a=n("584a").Object;t.exports=function(t,e){return a.getOwnPropertyDescriptor(t,e)}}}]);