(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["32d4fa78"],{"02a4":function(e,t,o){"use strict";var n=function(){var e=this,t=this,o=t.$createElement,n=t._self._c||o;return n("q-page-scroller",{ref:"scroll",attrs:{position:"bottom-right",offset:[18,18]}},[n("q-btn",{staticStyle:{color:"#fff",height:"40px",width:"40px",background:"linear-gradient(rgba(48, 73, 107, .9), rgba(48, 184, 210, .9))"},attrs:{fab:"",icon:"keyboard_arrow_up"},on:{click:function(){e.$(".q-scrollarea .scroll").animate({scrollTop:0},500)}}})],1)},r=[],a={name:"PageScroller",mounted:function(){var e=this;this.$(".q-scrollarea .scroll").on("scroll",function(t){this.scrollTop>200?e.$refs.scroll.showing=!0:e.$refs.scroll.showing=!1})}},l=a,i=o("2877"),s=Object(i["a"])(l,n,r,!1,null,"dba6b820",null);t["a"]=s.exports},"02fa":function(e,t,o){var n=o("268f"),r=o("e265"),a=o("a4bb"),l=o("c47a");function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},i=a(o);"function"===typeof r&&(i=i.concat(r(o).filter(function(e){return n(o,e).enumerable}))),i.forEach(function(t){l(e,t,o[t])})}return e}e.exports=i},"061d":function(e,t){function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}e.exports=o},"0bb0":function(e,t,o){"use strict";var n=o("5b0d"),r=o.n(n);r.a},"156b":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-scroll-area",{staticStyle:{height:"calc(100vh - 56px)"},attrs:{"thumb-style":e.getThumbStyle}},[o("q-page",{staticClass:"client__resident"},[o("div",{staticClass:"text-center"},[o("h3",[e._v(e._s(e.$t("regTextOpen")))]),o("p",[e._v(e._s(e.$t("registrationWillTakePlace")))])]),o("div",{staticClass:"row justify-center application"},[o("div",{staticClass:"col-12 col-sm-9 col-md-7 col-lg-5 q-pa-sm"},[o("q-expansion-item",{attrs:{"expand-separator":"",icon:"mdi-file-document",label:e.instruction_app["title_"+e.$t("prefix")],"header-class":"text-cyan"}},[o("q-card",[o("q-card-section",{domProps:{innerHTML:e._s(e.instruction_app["content_"+e.$t("prefix")])}})],1)],1)],1)]),o("div",{staticClass:"row justify-center application"},[o("div",{staticClass:"col-12 col-sm-9 col-md-7 col-lg-5 q-pa-sm q-gutter-xs"},[o("h3",{staticClass:"pl-3 p-md-0 my-0 my-md-4 title"},[e._v(e._s(e.$t("profileText")))]),o("q-card",{staticClass:"my-card",staticStyle:{"margin-bottom":"50px"}},[o("q-card-section",[o("q-form",{ref:"form",staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[o("q-input",{staticClass:"mt-4",attrs:{filled:"",label:e.$t("place_of_education")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.place_of_education,callback:function(t){e.$set(e.form,"place_of_education",t)},expression:"form.place_of_education"}}),o("q-select",{attrs:{options:[{label:e.$t("foreign_philology"),value:"3940001"},{label:e.$t("exact_sciences"),value:"3910001"}],filled:"",label:e.$t("direction")+" *","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.direction_code,callback:function(t){e.$set(e.form,"direction_code",t)},expression:"form.direction_code"}}),o("q-input",{attrs:{filled:"",label:e.$t("name")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),o("q-input",{attrs:{filled:"",label:e.$t("surname")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.surname,callback:function(t){e.$set(e.form,"surname",t)},expression:"form.surname"}}),o("q-input",{attrs:{filled:"",label:e.$t("father_name"),type:"text",clearable:"","lazy-rules":"",disable:e.loading},model:{value:e.form.father_name,callback:function(t){e.$set(e.form,"father_name",t)},expression:"form.father_name"}}),o("q-input",{attrs:{filled:"",label:e.$t("date_of_birth")+" *","lazy-rules":"",clearable:"",disable:e.loading,mask:"##/##/####",rules:[function(t){return!!t||e.$t("required_fields")}]},scopedSlots:e._u([{key:"append",fn:function(){return[o("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[o("q-popup-proxy",{ref:"qDateProxy1"},[o("q-date",{attrs:{mask:"DD/MM/YYYY",minimal:""},on:{input:function(){return e.$refs.qDateProxy1.hide()}},model:{value:e.form.date_of_birth,callback:function(t){e.$set(e.form,"date_of_birth",t)},expression:"form.date_of_birth"}})],1)],1)]},proxy:!0}]),model:{value:e.form.date_of_birth,callback:function(t){e.$set(e.form,"date_of_birth",t)},expression:"form.date_of_birth"}}),o("q-input",{attrs:{filled:"",label:e.$t("citizenship")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.citizenship,callback:function(t){e.$set(e.form,"citizenship",t)},expression:"form.citizenship"}}),o("q-input",{attrs:{filled:"",label:e.$t("client_requisite")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.client_requisite,callback:function(t){e.$set(e.form,"client_requisite",t)},expression:"form.client_requisite"}}),o("q-input",{attrs:{filled:"",label:e.$t("residential_address")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.residential_address,callback:function(t){e.$set(e.form,"residential_address",t)},expression:"form.residential_address"}}),o("q-input",{attrs:{filled:"",label:e.$t("school_region")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.school_region,callback:function(t){e.$set(e.form,"school_region",t)},expression:"form.school_region"}}),o("q-input",{attrs:{filled:"",label:e.$t("school_district")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.school_district,callback:function(t){e.$set(e.form,"school_district",t)},expression:"form.school_district"}}),o("q-input",{attrs:{filled:"",label:e.$t("school_number_or_name")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.school_number_or_name,callback:function(t){e.$set(e.form,"school_number_or_name",t)},expression:"form.school_number_or_name"}}),o("q-select",{attrs:{filled:"",disable:e.loading,label:e.$t("graduation_year")+" *",options:e.graduationYearSelect,"lazy-rules":"",rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.graduation_year,callback:function(t){e.$set(e.form,"graduation_year",t)},expression:"form.graduation_year"}}),o("q-select",{attrs:{filled:"",disable:e.loading,label:e.$t("education_language")+" *",options:e.$t("education_language_select"),"lazy-rules":"",rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.education_language,callback:function(t){e.$set(e.form,"education_language",t)},expression:"form.education_language"}}),o("q-input",{attrs:{filled:"",label:e.$t("certificate_number"),type:"number",clearable:"","lazy-rules":"",disable:e.loading},model:{value:e.form.certificate_number,callback:function(t){e.$set(e.form,"certificate_number",t)},expression:"form.certificate_number"}}),o("q-input",{attrs:{filled:"",label:e.$t("act_number")+" *",type:"number",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.act_number,callback:function(t){e.$set(e.form,"act_number",t)},expression:"form.act_number"}}),o("q-input",{attrs:{filled:"",label:e.$t("phone")+" *",type:"text",clearable:"","lazy-rules":"",disable:e.loading,rules:[function(t){return!!t||e.$t("required_fields")}]},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}}),o("q-uploader",{ref:"uploader",staticClass:"resident_client_q_uploader",attrs:{disable:e.loading,extensions:".jpg,.jpeg,.png,.doc,.exel",accept:".jpg, .jpeg, .png, .pdf, image/jpeg, .pdf, .doc, .docx, .xls, .xlsx, .txt","max-file-size":3048576,"max-total-size":10248576,multiple:"",color:e.uploader_color},on:{added:e.addFile},scopedSlots:e._u([{key:"header",fn:function(t){return[o("div",{staticClass:"row no-wrap items-center q-pa-sm q-gutter-xs"},[t.queuedFiles.length>0?o("q-btn",{attrs:{icon:"delete_sweep",round:"",dense:"",flat:""},on:{click:t.removeQueuedFiles}},[o("q-tooltip",[e._v("Удалить все")])],1):e._e(),t.uploadedFiles.length>0?o("q-btn",{attrs:{icon:"done_all",round:"",dense:"",flat:""},on:{click:t.removeUploadedFiles}},[o("q-tooltip",[e._v("Remove Uploaded Files")])],1):e._e(),t.isUploading?o("q-spinner",{staticClass:"q-uploader__spinner"}):e._e(),o("div",{staticClass:"col"},[o("div",{staticClass:"q-uploader__title"},[e._v(e._s(e.$t("documents_graduate_9_grade"))+" *")]),o("div",{staticClass:"q-uploader__subtitle"},[e._v(e._s(t.uploadSizeLabel))])]),t.canAddFiles?o("q-btn",{attrs:{type:"a",icon:"add_box",round:"",dense:"",flat:""}},[o("q-uploader-add-trigger"),o("q-tooltip",[e._v(e._s(e.$t("attach_documents")))])],1):e._e(),t.isUploading?o("q-btn",{attrs:{icon:"clear",round:"",dense:"",flat:""},on:{click:t.abort}},[o("q-tooltip",[e._v("Abort Upload")])],1):e._e()],1)]}},{key:"list",fn:function(t){return[o("q-list",{attrs:{separator:""}},e._l(t.files,function(n){return o("q-item",{key:n.name},[o("q-item-section",[o("q-item-label",{staticClass:"full-width ellipsis"},[e._v("\n                          "+e._s(n.name)+"\n                        ")])],1),n.__img?o("q-item-section",{staticClass:"gt-xs",attrs:{thumbnail:""}},[o("img",{attrs:{src:n.__img.src}})]):e._e(),o("q-item-section",{attrs:{top:"",side:""}},[o("q-btn",{staticClass:"gt-xs",attrs:{size:"12px",flat:"",dense:"",round:"",icon:"delete"},on:{click:function(e){return t.removeFile(n)}}})],1)],1)}),1)]}}])}),e.showCheckboxNotRobot?o("div",{staticClass:"ml-3",class:"text-"+e.colorCheckbox},[e._v("\n                Подтвердите что вы не робот\n              ")]):e._e(),e.showCheckboxNotRobot?o("q-checkbox",{staticClass:"mt-0",attrs:{label:"Я не робот",color:e.colorCheckbox,"keep-color":!0},model:{value:e.checkboxNotRobot,callback:function(t){e.checkboxNotRobot=t},expression:"checkboxNotRobot"}}):e._e(),o("div",{staticClass:"action__btn"},[o("q-btn",{staticClass:"upload pl-2",attrs:{color:"cyan",loading:e.loading,type:"submit"}},[e._v("\n                  "+e._s(e.$t("send"))+"\n                ")]),o("q-btn",{staticClass:"clear ml-3",attrs:{outline:"",type:"reset",color:"grey",disable:e.loading}},[e._v("\n                  "+e._s(e.$q.lang.label.clear)+"\n                ")])],1)],1)],1)],1)],1)]),o("footer",[e._v("footer")])]),o("PageScroller")],1)},r=[],a=o("967e"),l=o.n(a),i=(o("ac6a"),o("cadf"),o("456d"),o("551c"),o("06db"),o("097d"),o("96cf"),o("fa84")),s=o.n(i),c=o("f3e3"),u=o.n(c),f=o("02fa"),d=o.n(f),p=o("2f62"),m=o("02a4"),b={name:"Resident",meta:{titleTemplate:function(e){return"".concat(e," - Resident")},meta:{description:{name:"description",content:"Resident Page 1"},keywords:{name:"keywords",content:"Resident website"}}},components:{PageScroller:m["a"]},data:function(){return{instruction_app:[],colorCheckbox:"negative",checkboxNotRobot:!1,showCheckboxNotRobot:!1,documentsMultiple:[],files:[],uploader_color:"cyan",errors:!1,loading:!1,form:{place_of_education:null,direction_code:null,name:null,surname:null,father_name:null,date_of_birth:null,citizenship:null,client_requisite:null,residential_address:null,school_region:null,school_district:null,school_number_or_name:null,graduation_year:null,education_language:null,certificate_number:null,act_number:null,documents_graduate_9_grade:null,phone:null,files:[]}}},computed:d()({},Object(p["c"])(["mobileDetect","getThumbStyle"]),{graduationYearSelect:function(){for(var e=(new Date).getFullYear(),t=[];e>=1980;e--)t.push(e);return t}}),watch:{checkboxNotRobot:function(e){this.colorCheckbox=e?"teal":"negative"}},beforeMount:function(){var e=this;this.$axios.get("get_resident_instruction").then(function(t){if(t.data.length>0){var o=u()(t.data,1);e.instruction_app=o[0],e.setWidthImages()}})},mounted:function(){},methods:d()({},Object(p["b"])(["setWidthImages","recaptchaToken","mainGetData"]),{addFile:function(){this.uploader_color="cyan"},onSubmit:function(){var e=s()(l.a.mark(function e(){var t,o,n=this;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.$refs["uploader"].files,!(t.length>0)){e.next=10;break}return this.uploader_color="cyan",this.loading=!0,e.next=6,this.recaptchaToken();case 6:o=e.sent,this.$axios.post("check_recaptcha",{recaptcha_token:o,checkbox:this.checkboxNotRobot}).then(function(){n.form.direction_code=n.form.direction_code.value;var e=new FormData;t.forEach(function(t,o){e.append("files[".concat(o,"]"),t)}),Object.keys(n.form).forEach(function(t){e.append(t,n.form[t])}),e.append("recaptcha_token",localStorage.getItem("reCAPTCHA")),n.$axios.post("new_resident",e).then(function(e){n.loading=!1,n.$axios.post("remove_files",e.data.files),n.$refs["uploader"].files=[],n.$refs.form.reset(),n.$(".scroll").animate({scrollTop:0},400),n.$q.notify({color:"teal",icon:"home",message:"Success",position:"center",timeout:1500})}).finally(function(){n.loading=!1})}).catch(function(e){console.log(e.response.data),n.showCheckboxNotRobot=!0}).finally(function(){n.loading=!1}),e.next=12;break;case 10:this.uploader_color="negative",this.$q.notify({color:"negative",icon:"home",message:"Прикрепите документы!",position:"center",timeout:800});case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),onReset:function(){var e=this;Object.keys(this.form).forEach(function(t){e.form[t]=null}),this.form.files=[],this.$refs["uploader"].files=[],this.files=[],this.uploader_color="cyan",this.showCheckboxNotRobot=!1}})},_=b,h=(o("0bb0"),o("2877")),g=Object(h["a"])(_,n,r,!1,null,null,null);t["default"]=g.exports},"1af6":function(e,t,o){var n=o("63b6");n(n.S,"Array",{isArray:o("9003")})},"268f":function(e,t,o){e.exports=o("fde4")},"32a6":function(e,t,o){var n=o("241e"),r=o("c3a1");o("ce7e")("keys",function(){return function(e){return r(n(e))}})},"454f":function(e,t,o){o("46a7");var n=o("584a").Object;e.exports=function(e,t,o){return n.defineProperty(e,t,o)}},"469f":function(e,t,o){o("6c1c"),o("1654"),e.exports=o("7d7b")},"46a7":function(e,t,o){var n=o("63b6");n(n.S+n.F*!o("8e60"),"Object",{defineProperty:o("d9f6").f})},"5b0d":function(e,t,o){},"5d73":function(e,t,o){e.exports=o("469f")},"7d7b":function(e,t,o){var n=o("e4ae"),r=o("7cd6");e.exports=o("584a").getIterator=function(e){var t=r(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return n(t.call(e))}},"7e9a":function(e,t,o){var n=o("5d73");function r(e,t){var o=[],r=!0,a=!1,l=void 0;try{for(var i,s=n(e);!(r=(i=s.next()).done);r=!0)if(o.push(i.value),t&&o.length===t)break}catch(c){a=!0,l=c}finally{try{r||null==s["return"]||s["return"]()}finally{if(a)throw l}}return o}e.exports=r},"85f2":function(e,t,o){e.exports=o("454f")},"8aae":function(e,t,o){o("32a6"),e.exports=o("584a").Object.keys},a4bb:function(e,t,o){e.exports=o("8aae")},a745c:function(e,t,o){e.exports=o("f410")},bf90:function(e,t,o){var n=o("36c3"),r=o("bf0b").f;o("ce7e")("getOwnPropertyDescriptor",function(){return function(e,t){return r(n(e),t)}})},c47a:function(e,t,o){var n=o("85f2");function r(e,t,o){return t in e?n(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}e.exports=r},ce7e:function(e,t,o){var n=o("63b6"),r=o("584a"),a=o("294c");e.exports=function(e,t){var o=(r.Object||{})[e]||Object[e],l={};l[e]=t(o),n(n.S+n.F*a(function(){o(1)}),"Object",l)}},e265:function(e,t,o){e.exports=o("ed33")},ed33:function(e,t,o){o("014b"),e.exports=o("584a").Object.getOwnPropertySymbols},f1b7:function(e,t,o){var n=o("a745c");function r(e){if(n(e))return e}e.exports=r},f3e3:function(e,t,o){var n=o("f1b7"),r=o("7e9a"),a=o("061d");function l(e,t){return n(e)||r(e,t)||a()}e.exports=l},f410:function(e,t,o){o("1af6"),e.exports=o("584a").Array.isArray},fde4:function(e,t,o){o("bf90");var n=o("584a").Object;e.exports=function(e,t){return n.getOwnPropertyDescriptor(e,t)}}}]);