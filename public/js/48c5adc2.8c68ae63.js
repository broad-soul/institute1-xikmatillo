(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["48c5adc2"],{"02fa":function(t,e,a){var i=a("268f"),n=a("e265"),s=a("a4bb"),r=a("c47a");function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},c=s(a);"function"===typeof n&&(c=c.concat(n(a).filter(function(t){return i(a,t).enumerable}))),c.forEach(function(e){r(t,e,a[e])})}return t}t.exports=c},"268f":function(t,e,a){t.exports=a("fde4")},"2da6":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"page__residents"},[a("div",{staticClass:"q-pa-md"},[a("q-btn",{attrs:{label:"Назад",to:"/admin/residents"}})],1),a("h3",{staticClass:"text-center"},[t._v("Информация о студенте")]),a("div",{staticClass:"row justify-center profile"},[a("div",{staticClass:"col-12 q-pa-md"},[t.showResidentData?a("q-list",{attrs:{bordered:"",separator:""}},[a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Имя")]),a("q-item-label",[t._v(t._s(t.residentData.name))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Фамилия")]),a("q-item-label",[t._v(t._s(t.residentData.surname))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Отчество")]),a("q-item-label",[t._v(t._s(t.residentData.father_name))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Наименование Уч. Заведения")]),a("q-item-label",[t._v(t._s(t.residentData.place_of_education))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Направление")]),a("q-item-label",[t._v("\n              "+t._s(3940001===+t.residentData.direction_code?"Зарубежная филология":"Точные науки")+"\n            ")])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Дата рождения")]),a("q-item-label",[t._v(t._s(t.residentData.date_of_birth))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Гражданство")]),a("q-item-label",[t._v(t._s(t.residentData.citizenship))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Пасспорт")]),a("q-item-label",[t._v(t._s(t.residentData.client_requisite))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Адрес проживания")]),a("q-item-label",[t._v(t._s(t.residentData.residential_address))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Школа(Регион-Район-Номер или название)")]),a("q-item-label",[t._v(t._s(t.residentData.school_number_or_name))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Год окончания школы")]),a("q-item-label",[t._v(t._s(t.residentData.graduation_year))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Язык обучения")]),a("q-item-label",[t._v(t._s(t.residentData.education_language))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Номер аттестата")]),a("q-item-label",[t._v(t._s(t.residentData.certificate_number))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Номер акта")]),a("q-item-label",[t._v(t._s(t.residentData.act_number))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Номер телефона")]),a("q-item-label",[t._v(t._s(t.residentData.phone))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Дата подачи документов")]),a("q-item-label",[t._v(t._s(t.residentData.created_at))])],1)],1),a("q-item",{attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v("Адрес")]),a("q-item-label",[t._v(t._s(t.residentData.residential_address))])],1)],1),a("q-item",[a("q-item-section",[a("q-item-label",{attrs:{overline:""}},[t._v("Документы ученика(фото в архиве)")]),a("q-item-label",[a("q-btn",{attrs:{type:"button",label:"Скачать Архив с документами",icon:"cloud_download",color:"secondary",loading:t.loading},on:{click:function(e){return t.download(t.residentData.name_archive_with_data)}}})],1)],1)],1)],1):t._e()],1)])])},n=[],s=a("02fa"),r=a.n(s),c=a("2f62"),o={name:"AdminShowResident",meta:{titleTemplate:function(t){return"".concat(t," - Show Resident")},meta:{description:{name:"description",content:"Show Resident Page 1"},keywords:{name:"keywords",content:"Show Resident website"}}},created:function(){this.$axios.defaults.headers.Authorization="Bearer "+this.getToken},mounted:function(){},activated:function(){var t=this;this.residentId=this.$route.params.id,this.residentData.id!==parseInt(this.residentId)&&(this.residentData={},this.showResidentData=!1,this.$axios.get("admin_show_resident/"+this.residentId).then(function(e){t.residentData=e.data,t.showResidentData=!0}))},deactivated:function(){},data:function(){return{loading:!1,residentId:null,residentData:{},showResidentData:!1}},computed:r()({},Object(c["c"])(["getToken"])),watch:{},methods:r()({},Object(c["b"])(["getResidentsAtion","downloadFile"]),{goBack:function(){this.$router.go(-1)},download:function(t){var e=this;this.loading=!0,this.downloadFile(t).then(function(){e.loading=!1})}})},l=o,d=a("2877"),m=Object(d["a"])(l,i,n,!1,null,null,null);e["default"]=m.exports},"32a6":function(t,e,a){var i=a("241e"),n=a("c3a1");a("ce7e")("keys",function(){return function(t){return n(i(t))}})},"454f":function(t,e,a){a("46a7");var i=a("584a").Object;t.exports=function(t,e,a){return i.defineProperty(t,e,a)}},"46a7":function(t,e,a){var i=a("63b6");i(i.S+i.F*!a("8e60"),"Object",{defineProperty:a("d9f6").f})},"85f2":function(t,e,a){t.exports=a("454f")},"8aae":function(t,e,a){a("32a6"),t.exports=a("584a").Object.keys},a4bb:function(t,e,a){t.exports=a("8aae")},bf90:function(t,e,a){var i=a("36c3"),n=a("bf0b").f;a("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return n(i(t),e)}})},c47a:function(t,e,a){var i=a("85f2");function n(t,e,a){return e in t?i(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}t.exports=n},ce7e:function(t,e,a){var i=a("63b6"),n=a("584a"),s=a("294c");t.exports=function(t,e){var a=(n.Object||{})[t]||Object[t],r={};r[t]=e(a),i(i.S+i.F*s(function(){a(1)}),"Object",r)}},e265:function(t,e,a){t.exports=a("ed33")},ed33:function(t,e,a){a("014b"),t.exports=a("584a").Object.getOwnPropertySymbols},fde4:function(t,e,a){a("bf90");var i=a("584a").Object;t.exports=function(t,e){return i.getOwnPropertyDescriptor(t,e)}}}]);