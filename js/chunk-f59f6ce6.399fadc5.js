(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f59f6ce6"],{"4e2a":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page-container"},[this.$slots["query-control"]?r("div",{staticClass:"control"},[e._t("query-control")],2):e._e(),this.$slots["query"]&&this.$slots["query-action"]?r("div",{class:["query-group",this.$slots["control"]?"no-bottom-border":""]},[this.$slots["query"]?r("div",{staticClass:"query"},[e._t("query")],2):e._e(),this.$slots["query-action"]?r("div",{staticClass:"query-action"},[e._t("query-action")],2):e._e()]):e._e(),this.$slots["control"]?r("div",{staticClass:"control"},[e._t("control")],2):e._e(),this.$slots["content"]?r("div",{staticClass:"content"},[e._t("content")],2):e._e(),e._t("default")],2)},o=[],l={name:"PageContainer"},s=l,n=(r("780c"),r("2877")),i=Object(n["a"])(s,a,o,!1,null,"c24b28ae",null);t["a"]=i.exports},6351:function(e,t,r){},"780c":function(e,t,r){"use strict";r("6351")},b2ac:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("PageContainer",{scopedSlots:e._u([{key:"control",fn:function(){return[r("a-form-model",{attrs:{layout:"horizontal",model:e.form,"label-col":{span:2},"wrapper-col":{span:4}}},[r("a-form-model-item",{attrs:{label:"課程類型"}},[r("a-select",{on:{change:e.changeComponent},model:{value:e.form.course,callback:function(t){e.$set(e.form,"course",t)},expression:"form.course"}},e._l(e.classList,(function(t){return r("a-select-option",{key:t.id},[e._v(" "+e._s(t.class_name)+" ")])})),1)],1),r("a-form-model-item",{attrs:{label:"批次上傳"}},[r("div",{staticStyle:{display:"flex","align-items":"flex-start"}},[r("a-upload",{attrs:{name:"file",multiple:!0}},[r("a-button",{staticStyle:{"margin-right":"16px"}},[r("a-icon",{attrs:{type:"upload"}}),e._v(" Upload ")],1)],1),r("a-button",{staticStyle:{"margin-top":"4px"},attrs:{type:"primary"}},[e._v(" 上傳 ")])],1),r("a-form-model")],1)],1)]},proxy:!0},{key:"content",fn:function(){return[r(e.currentComponent,{tag:"components"})]},proxy:!0}])})},o=[],l=r("1da1"),s=(r("96cf"),r("4e2a")),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-form-model",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[r("a-form-model-item",{attrs:{label:"家長姓名",prop:"parentName"}},[r("a-input",{attrs:{placeholder:"請選擇家長姓名"},model:{value:e.form.parentName,callback:function(t){e.$set(e.form,"parentName",t)},expression:"form.parentName"}})],1),r("a-form-model-item",{attrs:{label:"小朋友姓名",prop:"childName"}},[r("a-input",{attrs:{placeholder:"請選擇小朋友姓名"},model:{value:e.form.childName,callback:function(t){e.$set(e.form,"childName",t)},expression:"form.childName"}})],1),r("a-form-model-item",{attrs:{label:"小朋友生日",prop:"birthday"}},[r("a-date-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇小朋友生日"},model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1),r("a-form-model-item",{attrs:{label:"行動電話",prop:"cellphone"}},[r("a-input",{attrs:{placeholder:"請輸入行動電話"},model:{value:e.form.cellphone,callback:function(t){e.$set(e.form,"cellphone",t)},expression:"form.cellphone"}})],1),r("a-form-model-item",{attrs:{label:"連絡電話",prop:"phone"}},[r("a-input",{attrs:{placeholder:"請輸入連絡電話"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),r("a-form-model-item",{attrs:{label:"地址",prop:"region"}},[r("a-select",{attrs:{placeholder:"請選縣市"},on:{change:function(t){return e.getRegionList(e.form.region)}},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},e._l(e.cityList,(function(t){return r("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(" "+e._s(t.city_name)+" ")])})),1),r("a-select",{attrs:{placeholder:"請選擇鄉鎮市區"},model:{value:e.form.region2,callback:function(t){e.$set(e.form,"region2",t)},expression:"form.region2"}},e._l(e.regionList,(function(t){return r("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(" "+e._s(t.region_name)+" ")])})),1),r("a-input",{attrs:{placeholder:"請輸入地址"},model:{value:e.form.region3,callback:function(t){e.$set(e.form,"region3",t)},expression:"form.region3"}})],1),r("a-form-model-item",{attrs:{label:"電子信箱",prop:"email"}},[r("a-input",{attrs:{placeholder:"請輸入電子信箱"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),r("a-form-model-item",{attrs:{label:"消息來源",prop:"news"}},[r("a-select",{attrs:{placeholder:"請選擇消息來源"},model:{value:e.form.news,callback:function(t){e.$set(e.form,"news",t)},expression:"form.news"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 網路 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 報紙 ")])],1)],1),r("a-form-model-item",{attrs:{label:"教學中心",prop:"teach"}},[r("a-select",{attrs:{placeholder:"請選擇教學中心"},model:{value:e.form.teach,callback:function(t){e.$set(e.form,"teach",t)},expression:"form.teach"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 教學中心1 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 教學中心2 ")])],1)],1),r("a-form-model-item",{attrs:{label:"名單類型",prop:"listType"}},[r("a-select",{attrs:{placeholder:"請選擇名單類型"},model:{value:e.form.listType,callback:function(t){e.$set(e.form,"listType",t)},expression:"form.listType"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 有效名單 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 潛力名單 ")])],1)],1),r("a-form-model-item",{attrs:{label:"名單來源",prop:"listSource"}},[r("a-select",{attrs:{placeholder:"請選擇名單來源"},model:{value:e.form.listType,callback:function(t){e.$set(e.form,"listType",t)},expression:"form.listType"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" FB ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 來電 ")])],1)],1),r("a-form-model-item",{attrs:{label:"方便聯繫時段",prop:"contact"}},[r("a-select",{attrs:{placeholder:"請選擇方便聯繫時段"},model:{value:e.form.listType,callback:function(t){e.$set(e.form,"listType",t)},expression:"form.listType"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 下午 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 晚上 ")])],1)],1),r("a-form-model-item",{attrs:{"wrapper-col":{span:10,offset:7}}},[r("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(" 建立 ")]),r("a-button",{staticStyle:{"margin-left":"10px"},on:{click:e.resetForm}},[e._v(" 重設 ")])],1)],1)},i=[],c=r("891c"),m={name:"ChildForm",data:function(){return{labelCol:{span:7},wrapperCol:{span:10},form:{parentName:"",childName:"",birthday:void 0,cellphone:"",phone:"",region:void 0,region2:void 0,region3:void 0,email:"",news:void 0,teach:void 0,listType:void 0,listSource:void 0,contact:void 0},rules:{parentName:[{required:!0,message:"請輸入家長姓名",trigger:"blur"}],childName:[{required:!0,message:"請輸入小朋友姓名",trigger:"blur"}],birthday:[{required:!0,message:"請輸入小朋友生日",trigger:"change"}],cellphone:[{required:!0,message:"請輸入行動電話",trigger:"blur"}],phone:[{required:!0,message:"請輸入連絡電話",trigger:"blur"}],region:[{required:!0,message:"請選擇地址",trigger:"change"}],email:[{required:!0,message:"請輸入連絡電話",trigger:"blur"}],news:[{required:!0,message:"請選擇消息來源",trigger:"change"}],teach:[{required:!0,message:"請選擇教學中心",trigger:"change"}],listType:[{required:!0,message:"請選擇名單類型",trigger:"change"}],listSource:[{required:!0,message:"請選擇名單來源",trigger:"change"}],contact:[{required:!0,message:"請選擇方便聯繫時段",trigger:"change"}]},cityList:[],regionList:[]}},created:function(){this.getCityList()},methods:{getCityList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("listInfo/getCityList");case 2:r=t.sent,e.cityList=r;case 4:case"end":return t.stop()}}),t)})))()},getRegionList:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(c["c"])(e);case 3:a=r.sent,o=a.data,t.regionList=o,r.next=10;break;case 8:r.prev=8,r.t0=r["catch"](0);case 10:case"end":return r.stop()}}),r,null,[[0,8]])})))()},onSubmit:function(){this.$refs.ruleForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(){this.$refs.ruleForm.resetFields()}}},p=m,u=r("2877"),f=Object(u["a"])(p,n,i,!1,null,"a3443650",null),d=f.exports,g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-form-model",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[r("a-form-model-item",{attrs:{label:"姓名",prop:"name"}},[r("a-input",{attrs:{placeholder:"請選擇姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("a-form-model-item",{attrs:{label:"年齡",prop:"age"}},[r("a-input",{attrs:{placeholder:"請選擇年齡"},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),r("a-form-model-item",{attrs:{label:"生日",prop:"birthday"}},[r("a-date-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇生日"},model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1),r("a-form-model-item",{attrs:{label:"性別",prop:"gender"}},[r("a-select",{attrs:{placeholder:"請選擇性別"},model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 男 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 女 ")])],1)],1),r("a-form-model-item",{attrs:{label:"行動電話",prop:"cellphone"}},[r("a-input",{attrs:{placeholder:"請輸入行動電話"},model:{value:e.form.cellphone,callback:function(t){e.$set(e.form,"cellphone",t)},expression:"form.cellphone"}})],1),r("a-form-model-item",{attrs:{label:"連絡電話",prop:"phone"}},[r("a-input",{attrs:{placeholder:"請輸入連絡電話"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),r("a-form-model-item",{attrs:{label:"地址",prop:"region"}},[r("a-select",{attrs:{placeholder:"請選擇地址"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 台北市 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 新北市 ")])],1)],1),r("a-form-model-item",{attrs:{label:"電子信箱",prop:"email"}},[r("a-input",{attrs:{placeholder:"請輸入電子信箱"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),r("a-form-model-item",{attrs:{label:"消息來源",prop:"news"}},[r("a-select",{attrs:{placeholder:"請選擇消息來源"},model:{value:e.form.news,callback:function(t){e.$set(e.form,"news",t)},expression:"form.news"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 網路 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 報紙 ")])],1)],1),r("a-form-model-item",{attrs:{label:"教學中心",prop:"teach"}},[r("a-select",{attrs:{placeholder:"請選擇教學中心"},model:{value:e.form.teach,callback:function(t){e.$set(e.form,"teach",t)},expression:"form.teach"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 教學中心1 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 教學中心2 ")])],1)],1),r("a-form-model-item",{attrs:{label:"名單類型",prop:"listType"}},[r("a-select",{attrs:{placeholder:"請選擇名單類型"},model:{value:e.form.listType,callback:function(t){e.$set(e.form,"listType",t)},expression:"form.listType"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 有效名單 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 潛力名單 ")])],1)],1),r("a-form-model-item",{attrs:{label:"名單來源",prop:"listSource"}},[r("a-select",{attrs:{placeholder:"請選擇名單來源"},model:{value:e.form.listType,callback:function(t){e.$set(e.form,"listType",t)},expression:"form.listType"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" FB ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 來電 ")])],1)],1),r("a-form-model-item",{attrs:{label:"方便聯繫時段",prop:"contact"}},[r("a-select",{attrs:{placeholder:"請選擇方便聯繫時段"},model:{value:e.form.listType,callback:function(t){e.$set(e.form,"listType",t)},expression:"form.listType"}},[r("a-select-option",{attrs:{value:"1"}},[e._v(" 下午 ")]),r("a-select-option",{attrs:{value:"2"}},[e._v(" 晚上 ")])],1)],1),r("a-form-model-item",{attrs:{"wrapper-col":{span:10,offset:7}}},[r("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(" 建立 ")]),r("a-button",{staticStyle:{"margin-left":"10px"},on:{click:e.resetForm}},[e._v(" 重設 ")])],1)],1)},h=[],v={name:"AdultForm",data:function(){return{labelCol:{span:7},wrapperCol:{span:10},form:{name:"",age:"",birthday:void 0,gender:void 0,cellphone:"",phone:"",region:void 0,email:"",news:void 0,teach:void 0,listType:void 0,listSource:void 0,contact:void 0},rules:{name:[{required:!0,message:"請輸入姓名",trigger:"blur"}],age:[{required:!0,message:"請輸入年齡",trigger:"blur"}],birthday:[{required:!0,message:"請輸入生日",trigger:"change"}],gender:[{required:!0,message:"請輸入性別",trigger:"change"}],cellphone:[{required:!0,message:"請輸入行動電話",trigger:"blur"}],phone:[{required:!0,message:"請輸入連絡電話",trigger:"blur"}],region:[{required:!0,message:"請選擇地址",trigger:"change"}],email:[{required:!0,message:"請輸入連絡電話",trigger:"blur"}],news:[{required:!0,message:"請選擇消息來源",trigger:"change"}],teach:[{required:!0,message:"請選擇教學中心",trigger:"change"}],listType:[{required:!0,message:"請選擇名單類型",trigger:"change"}],listSource:[{required:!0,message:"請選擇名單來源",trigger:"change"}],contact:[{required:!0,message:"請選擇方便聯繫時段",trigger:"change"}]}}},methods:{onSubmit:function(){this.$refs.ruleForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(){this.$refs.ruleForm.resetFields()}}},b=v,y=Object(u["a"])(b,g,h,!1,null,"4b72445e",null),_=y.exports,k={name:"Upload",components:{PageContainer:s["a"],ChildForm:d,AdultForm:_},data:function(){return{form:{course:void 0},currentComponent:d,classList:[]}},created:function(){this.getClassList()},methods:{getClassList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("listInfo/getClassList");case 2:r=t.sent,e.classList=r;case 4:case"end":return t.stop()}}),t)})))()},changeComponent:function(){switch(this.form.course){case"child":this.currentComponent=d;break;case"adult":this.currentComponent=_;break}}}},x=k,$=Object(u["a"])(x,a,o,!1,null,"51d9eed4",null);t["default"]=$.exports}}]);