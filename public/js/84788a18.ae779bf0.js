(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["84788a18"],{"02fa":function(e,t,a){var n=a("268f"),r=a("e265"),o=a("a4bb"),i=a("c47a");function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},l=o(a);"function"===typeof r&&(l=l.concat(r(a).filter(function(e){return n(a,e).enumerable}))),l.forEach(function(t){i(e,t,a[t])})}return e}e.exports=l},"061d":function(e,t){function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}e.exports=a},"1af6":function(e,t,a){var n=a("63b6");n(n.S,"Array",{isArray:a("9003")})},"268f":function(e,t,a){e.exports=a("fde4")},"32a6":function(e,t,a){var n=a("241e"),r=a("c3a1");a("ce7e")("keys",function(){return function(e){return r(n(e))}})},"454f":function(e,t,a){a("46a7");var n=a("584a").Object;e.exports=function(e,t,a){return n.defineProperty(e,t,a)}},"469f":function(e,t,a){a("6c1c"),a("1654"),e.exports=a("7d7b")},"46a7":function(e,t,a){var n=a("63b6");n(n.S+n.F*!a("8e60"),"Object",{defineProperty:a("d9f6").f})},"504c":function(e,t,a){var n=a("9e1e"),r=a("0d58"),o=a("6821"),i=a("52a7").f;e.exports=function(e){return function(t){var a,l=o(t),s=r(l),u=s.length,c=0,f=[];while(u>c)a=s[c++],n&&!i.call(l,a)||f.push(e?[a,l[a]]:l[a]);return f}}},"5d73":function(e,t,a){e.exports=a("469f")},6816:function(e,t,a){},"7d7b":function(e,t,a){var n=a("e4ae"),r=a("7cd6");e.exports=a("584a").getIterator=function(e){var t=r(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return n(t.call(e))}},"7e9a":function(e,t,a){var n=a("5d73");function r(e,t){var a=[],r=!0,o=!1,i=void 0;try{for(var l,s=n(e);!(r=(l=s.next()).done);r=!0)if(a.push(l.value),t&&a.length===t)break}catch(u){o=!0,i=u}finally{try{r||null==s["return"]||s["return"]()}finally{if(o)throw i}}return a}e.exports=r},"85f2":function(e,t,a){e.exports=a("454f")},"8aae":function(e,t,a){a("32a6"),e.exports=a("584a").Object.keys},a4bb:function(e,t,a){e.exports=a("8aae")},a745c:function(e,t,a){e.exports=a("f410")},bf90:function(e,t,a){var n=a("36c3"),r=a("bf0b").f;a("ce7e")("getOwnPropertyDescriptor",function(){return function(e,t){return r(n(e),t)}})},c47a:function(e,t,a){var n=a("85f2");function r(e,t,a){return t in e?n(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}e.exports=r},ce7e:function(e,t,a){var n=a("63b6"),r=a("584a"),o=a("294c");e.exports=function(e,t){var a=(r.Object||{})[e]||Object[e],i={};i[e]=t(a),n(n.S+n.F*o(function(){a(1)}),"Object",i)}},e265:function(e,t,a){e.exports=a("ed33")},e2d8:function(e,t,a){"use strict";var n=a("6816"),r=a.n(n);r.a},e5d5:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-scroll-area",{staticStyle:{height:"calc(100vh - 56px)"},attrs:{"thumb-style":e.getThumbStyle}},[a("q-page",{staticClass:"admin__main"},[a("div",{staticClass:"q-pa-md"},[a("q-breadcrumbs",{attrs:{"active-color":"teal"}},[a("q-breadcrumbs-el",{attrs:{icon:"home",label:"Home",to:"/"}}),a("q-breadcrumbs-el",{attrs:{label:"Dashboard",to:"/admin"}}),a("q-breadcrumbs-el",{attrs:{label:"Faq",to:"/admin/faq"}}),a("q-breadcrumbs-el",{attrs:{label:"Create"}})],1)],1),a("div",{staticClass:"q-pa-md q-gutter-y-md"},[a("q-card",[a("q-tabs",{staticClass:"text-grey p-1",attrs:{dense:"","active-color":"primary",align:"justify","narrow-indicator":""},model:{value:e.faqTab,callback:function(t){e.faqTab=t},expression:"faqTab"}},[a("q-tab",{attrs:{name:"lang-en",label:"En"}}),a("q-tab",{attrs:{name:"lang-ru",label:"Ru"}}),a("q-tab",{attrs:{name:"lang-uz",label:"Uz"}})],1),a("q-separator"),a("q-tab-panels",{attrs:{animated:""},model:{value:e.faqTab,callback:function(t){e.faqTab=t},expression:"faqTab"}},[a("q-tab-panel",{staticClass:"pb-2",attrs:{name:"lang-en"}},[a("q-input",{staticClass:"mb-2",attrs:{error:!1,clearable:"","lazy-rules":"",rules:[function(e){return!!e||"* Fields should be filled obligatory!"}],filled:"",type:"textarea",label:"Question"},model:{value:e.faq.question_en,callback:function(t){e.$set(e.faq,"question_en",t)},expression:"faq.question_en"}}),a("q-input",{attrs:{clearable:"","lazy-rules":"",rules:[function(e){return!!e||"* Fields should be filled obligatory!"}],filled:"",type:"textarea",label:"Answer"},model:{value:e.faq.answer_en,callback:function(t){e.$set(e.faq,"answer_en",t)},expression:"faq.answer_en"}})],1),a("q-tab-panel",{staticClass:"pb-2",attrs:{name:"lang-ru"}},[a("q-input",{staticClass:"mb-2",attrs:{clearable:"","lazy-rules":"",rules:[function(e){return!!e||"* Поля - обязательны для заполнения!"}],filled:"",type:"textarea",label:"Вопрос"},model:{value:e.faq.question_ru,callback:function(t){e.$set(e.faq,"question_ru",t)},expression:"faq.question_ru"}}),a("q-input",{attrs:{clearable:"","lazy-rules":"",rules:[function(e){return!!e||"* Поля - обязательны для заполнения!"}],filled:"",type:"textarea",label:"Ответ"},model:{value:e.faq.answer_ru,callback:function(t){e.$set(e.faq,"answer_ru",t)},expression:"faq.answer_ru"}})],1),a("q-tab-panel",{staticClass:"pb-2",attrs:{name:"lang-uz"}},[a("q-input",{staticClass:"mb-2",attrs:{clearable:"","lazy-rules":"",rules:[function(e){return!!e||"* Maydonlar - to'ldirilishi shart!"}],filled:"",type:"textarea",label:"Savol"},model:{value:e.faq.question_uz,callback:function(t){e.$set(e.faq,"question_uz",t)},expression:"faq.question_uz"}}),a("q-input",{attrs:{clearable:"","lazy-rules":"",rules:[function(e){return!!e||"* Maydonlar - to'ldirilishi shart!"}],filled:"",type:"textarea",label:"Javob"},model:{value:e.faq.answer_uz,callback:function(t){e.$set(e.faq,"answer_uz",t)},expression:"faq.answer_uz"}})],1)],1),a("div",{staticClass:"pl-3 pb-3"},[a("q-btn",{attrs:{color:"teal mr-3",loading:e.loading,disable:e.loading},on:{click:e.createQuestion}},[e._v("Create")]),a("q-btn",{attrs:{to:"/admin/faq"}},[e._v("Cancel")])],1)],1)],1)])],1)},r=[],o=a("f3e3"),i=a.n(o),l=(a("ac6a"),a("cadf"),a("ffc1"),a("551c"),a("06db"),a("097d"),a("02fa")),s=a.n(l),u=a("2f62"),c={name:"FaqCreate",data:function(){return{loading:!1,faq:{question_en:"",answer_en:"",question_ru:"",answer_ru:"",question_uz:"",answer_uz:""},faqTab:"lang-en"}},computed:s()({},Object(u["c"])(["mobileDetect","getThumbStyle"])),methods:{createQuestion:function(){for(var e=this,t=!1,a=0,n=Object.entries(this.faq);a<n.length;a++){var r=i()(n[a],2),o=r[1];o||(t=!0)}t?this.$q.notify({color:"negative",icon:"error",message:"Заполни все поля!",position:"top",timeout:200}):(this.loading=!0,this.$axios.post("new_question",this.faq).then(function(t){e.$q.notify({color:"teal",icon:"check_circle",message:"Success",position:"top",timeout:200}),e.$router.push("/admin/faq")}).finally(function(){e.loading=!1}))}}},f=c,b=(a("e2d8"),a("2877")),p=Object(b["a"])(f,n,r,!1,null,"33f1111e",null);t["default"]=p.exports},ed33:function(e,t,a){a("014b"),e.exports=a("584a").Object.getOwnPropertySymbols},f1b7:function(e,t,a){var n=a("a745c");function r(e){if(n(e))return e}e.exports=r},f3e3:function(e,t,a){var n=a("f1b7"),r=a("7e9a"),o=a("061d");function i(e,t){return n(e)||r(e,t)||o()}e.exports=i},f410:function(e,t,a){a("1af6"),e.exports=a("584a").Array.isArray},fde4:function(e,t,a){a("bf90");var n=a("584a").Object;e.exports=function(e,t){return n.getOwnPropertyDescriptor(e,t)}},ffc1:function(e,t,a){var n=a("5ca1"),r=a("504c")(!0);n(n.S,"Object",{entries:function(e){return r(e)}})}}]);