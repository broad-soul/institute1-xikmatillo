(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["48dcd7b9"],{"02fa":function(t,e,n){var r=n("268f"),a=n("e265"),o=n("a4bb"),c=n("c47a");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=o(n);"function"===typeof a&&(i=i.concat(a(n).filter(function(t){return r(n,t).enumerable}))),i.forEach(function(e){c(t,e,n[e])})}return t}t.exports=i},"268f":function(t,e,n){t.exports=n("fde4")},"32a6":function(t,e,n){var r=n("241e"),a=n("c3a1");n("ce7e")("keys",function(){return function(t){return a(r(t))}})},"454f":function(t,e,n){n("46a7");var r=n("584a").Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},"46a7":function(t,e,n){var r=n("63b6");r(r.S+r.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"85f2":function(t,e,n){t.exports=n("454f")},"8aae":function(t,e,n){n("32a6"),t.exports=n("584a").Object.keys},a4bb:function(t,e,n){t.exports=n("8aae")},bf90:function(t,e,n){var r=n("36c3"),a=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return a(r(t),e)}})},c47a:function(t,e,n){var r=n("85f2");function a(t,e,n){return e in t?r(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}t.exports=a},ce7e:function(t,e,n){var r=n("63b6"),a=n("584a"),o=n("294c");t.exports=function(t,e){var n=(a.Object||{})[t]||Object[t],c={};c[t]=e(n),r(r.S+r.F*o(function(){n(1)}),"Object",c)}},e265:function(t,e,n){t.exports=n("ed33")},ed33:function(t,e,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},ed87:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-scroll-area",{staticStyle:{height:"calc(100vh - 56px)"},attrs:{"thumb-style":t.getThumbStyle}},[n("q-page",{staticClass:"q-pa-sm"},[n("h4",{staticClass:"text-center my-3"},[t._v("Gallery")]),n("div",{staticClass:"row"},t._l(this.images,function(e){return n("div",{key:e.id,staticClass:"col-12 col-sm-6 col-md-4 col-lg-3 q-pa-xs"},[n("q-img",{attrs:{"spinner-color":"teal",transition:"fade",ratio:4/3,src:t.getPath(e)},scopedSlots:t._u([{key:"error",fn:function(){return[n("div",{staticClass:"absolute-full flex flex-center bg-cyan text-white"},[t._v("\n              Cannot load image\n            ")])]},proxy:!0}],null,!0)})],1)}),0)])],1)},a=[],o=(n("7f7f"),n("02fa")),c=n.n(o),i=n("2f62"),u={name:"Gallery",meta:{titleTemplate:function(t){return"".concat(t," - Gallery")},meta:{description:{name:"description",content:"Gallery Page 1"},keywords:{name:"keywords",content:"Gallery website"}}},data:function(){return{images:[]}},computed:c()({},Object(i["c"])(["getThumbStyle","mobileDetect"])),beforeMount:function(){this.getImages()},mounted:function(){},methods:{getPath:function(t){return"/storage/"+t.name},getImages:function(){var t=this;this.$axios.get("get_image_gallery").then(function(e){t.images=e.data})}}},f=u,s=n("2877"),l=Object(s["a"])(f,r,a,!1,null,"2069b962",null);e["default"]=l.exports},fde4:function(t,e,n){n("bf90");var r=n("584a").Object;t.exports=function(t,e){return r.getOwnPropertyDescriptor(t,e)}}}]);