(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c44cb48"],{1951:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"dialog-container__content beauty-scroll",style:{"max-height":t.contentHeight}},[t._t("default")],2)},n=[],o={name:"ScrollableDialogContainer",props:{contentHeight:{type:String,default:"55vh"}}},s=o,c=(r("d349"),r("2877")),i=Object(c["a"])(s,a,n,!1,null,"fbeac754",null);e["a"]=i.exports},"30ee":function(t,e,r){},"407a":function(t,e,r){"use strict";r("30ee")},4462:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("PageContainer",{scopedSlots:t._u([{key:"content",fn:function(){return[r("a-table",{attrs:{columns:t.columns,"data-source":t.tableData,bordered:"",loading:t.tableLoading,"row-key":"id",size:"small",pagination:{pageSize:11}},scopedSlots:t._u([{key:"level",fn:function(e){return[r("span",{domProps:{textContent:t._s(e?"總部":"教學中心")}})]}},{key:"status",fn:function(e){return[r("a-tag",{attrs:{color:"1"===e?"green":"red"}},[t._v(t._s("1"===e?"啟用":"停用")+" ")])]}},{key:"operation",fn:function(e,a){return[r("DefaultButton",{attrs:{type:"primary",text:"修改"},on:{click:function(e){return t.openDialog(a)}}})]}}])})]},proxy:!0}])},[[r("a-modal",{attrs:{title:t.dialog.title,"mask-closable":!1,"cancel-text":"取消","ok-text":"提交","confirm-loading":t.modalLoading,width:600},on:{ok:t.submit,cancel:t.handleCancel},model:{value:t.dialog.visible,callback:function(e){t.$set(t.dialog,"visible",e)},expression:"dialog.visible"}},[r("ScrollableDialogContainer",[r("a-form-model",{ref:"ruleForm",attrs:{model:t.form,"label-col":t.labelCol,"wrapper-col":t.wrapperCol}},[r("a-form-model-item",{attrs:{label:"權限"}},[r("a-checkbox-group",{model:{value:t.form.authorities,callback:function(e){t.$set(t.form,"authorities",e)},expression:"form.authorities"}},t._l(t.authorityList,(function(e){return r("div",{key:e.id},[r("h3",[t._v(t._s(e.name))]),t._l(e.children,(function(e,a){return r("a-checkbox",{key:a,staticStyle:{"margin-bottom":"12px"},attrs:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])}))],2)})),0)],1),r("a-form-model-item",{attrs:{label:"狀態"}},[r("a-switch",{model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1)],1)],1)]],2)},n=[],o=r("1da1"),s=(r("96cf"),r("4e2a")),c=r("c7e8"),i=r("1951"),u=r("b775"),l=function(){return Object(u["a"])({url:"/api/branch/list",method:"GET"})},d=function(){return Object(u["a"])({url:"/api/authority/list",method:"GET"})},f=function(t){return Object(u["a"])({url:"/api/branch/authority/".concat(t),method:"GET"})},h=function(t,e){return Object(u["a"])({url:"/api/branch/".concat(t),method:"PUT",data:e})},m={name:"Permission",components:{PageContainer:s["a"],DefaultButton:c["a"],ScrollableDialogContainer:i["a"]},data:function(){var t=[{title:"id",dataIndex:"id"},{title:"教學中心代號",dataIndex:"branch_id"},{title:"教學中心名稱",dataIndex:"branch_name"},{title:"層級",dataIndex:"level",scopedSlots:{customRender:"level"}},{title:"狀態",dataIndex:"status",scopedSlots:{customRender:"status"}},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"}}];return{columns:t,tableData:[],dialog:{title:"",visible:!1,id:""},labelCol:{span:4},wrapperCol:{span:20},form:{authorities:[],status:""},modalLoading:!1,tableLoading:!1,authorityList:[]}},created:function(){this.getBranchList(),this.getAuthorityList()},methods:{getBranchList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.tableLoading=!0,e.prev=1,e.next=4,l();case 4:r=e.sent,a=r.data,t.tableData=a,e.next=11;break;case 9:e.prev=9,e.t0=e["catch"](1);case 11:t.tableLoading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()},getAuthorityList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d();case 3:r=e.sent,a=r.data,t.authorityList=a,e.next=10;break;case 8:e.prev=8,e.t0=e["catch"](0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))()},getAuthorityItem:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.tableLoading=!0,r.prev=1,r.next=4,f(t);case 4:return a=r.sent,n=a.data,e.tableLoading=!1,r.abrupt("return",n);case 10:r.prev=10,r.t0=r["catch"](1);case 12:case"end":return r.stop()}}),r,null,[[1,10]])})))()},openDialog:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.getAuthorityItem(t.id);case 2:a=r.sent,e.dialog.visible=!0,e.dialog.title="修改",e.dialog.id=t.id,Object.assign(e.form,{authorities:a.authorities,status:"1"===t.status});case 7:case"end":return r.stop()}}),r)})))()},submit:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.modalLoading=!0,e.prev=1,e.next=4,h(t.dialog.id,{authorities:t.form.authorities,status:t.form.status});case 4:t.$message.success("更新成功"),t.dialog.visible=!1,t.handleCancel(),t.getBranchList(),e.next=12;break;case 10:e.prev=10,e.t0=e["catch"](1);case 12:t.modalLoading=!1;case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))()},handleCancel:function(){Object.assign(this.form,this.resetForm())},resetForm:function(){return{authorities:[],status:""}}}},b=m,p=r("2877"),v=Object(p["a"])(b,a,n,!1,null,"06499f66",null);e["default"]=v.exports},"4e2a":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-container"},[this.$slots["query-control"]?r("div",{staticClass:"control"},[t._t("query-control")],2):t._e(),this.$slots["query"]&&this.$slots["query-action"]?r("div",{class:["query-group",this.$slots["control"]?"no-bottom-border":""]},[this.$slots["query"]?r("div",{staticClass:"query"},[t._t("query")],2):t._e(),this.$slots["query-action"]?r("div",{staticClass:"query-action"},[t._t("query-action")],2):t._e()]):t._e(),this.$slots["control"]?r("div",{staticClass:"control"},[t._t("control")],2):t._e(),this.$slots["content"]?r("div",{staticClass:"content"},[t._t("content")],2):t._e(),t._t("default")],2)},n=[],o={name:"PageContainer"},s=o,c=(r("780c"),r("2877")),i=Object(c["a"])(s,a,n,!1,null,"c24b28ae",null);e["a"]=i.exports},6351:function(t,e,r){},"780c":function(t,e,r){"use strict";r("6351")},"9fc7":function(t,e,r){},a15b:function(t,e,r){"use strict";var a=r("23e7"),n=r("44ad"),o=r("fc6a"),s=r("a640"),c=[].join,i=n!=Object,u=s("join",",");a({target:"Array",proto:!0,forced:i||!u},{join:function(t){return c.call(o(this),void 0===t?",":t)}})},c7e8:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a-button",t._g(t._b({class:t.otherTypeClass},"a-button",t.$attrs,!1),t.$listeners),[t._v(" "+t._s(t.text)+" ")])},n=[],o=r("1da1"),s=(r("99af"),r("96cf"),r("159b"),r("a15b"),r("d81d"),r("b64b"),function(t){var e=document.head.appendChild(t).sheet,r=0;return function(t,a){return t.forEach((function(t,n){var o=Object.keys(a[n]).map((function(t){return t+":"+a[n][t]})).join(";\n"),s=e.insertRule(t+"{"+o+"}",e.cssRules.length);0===n&&(r=s)})),{sheet:e,firstIndex:r}}}(document.createElement("style"))),c={name:"CommonButton",props:{text:{type:String,required:!0,default:"展示用"}},data:function(){return{otherTypeClass:null,customedSheet:null}},computed:{isPresetTypes:function(){var t=/primary|dashed|danger|link|default/g;return t.test(this.$attrs.type)}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getOtherButtonType();case 2:case"end":return e.stop()}}),e)})))()},beforeDestroy:function(){if(this.customedSheet){var t=this.customedSheet,e=t.sheet,r=t.firstIndex;if(e.cssRules.length<=r)for(var a=0;a<3;a++)e.deleteRule(0);else for(var n=0;n<3;n++)e.deleteRule(r)}},methods:{getOtherButtonType:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$attrs.type||t.isPresetTypes){e.next=18;break}e.t0=t.$attrs.type,e.next="warning"===e.t0?4:"success"===e.t0?6:8;break;case 4:return t.otherTypeClass="button-warning",e.abrupt("break",16);case 6:return t.otherTypeClass="button-success",e.abrupt("break",16);case 8:if(t.$attrs.color){e.next=11;break}return console.warn('[CommonButton] attribute "type" 沒有匹配到對應的類型也沒有傳入自定義的 button 顏色，將使用 antd 預設類型: default'),e.abrupt("return");case 11:if(t.$attrs.color.default&&t.$attrs.color.textColor&&t.$attrs.color.hover&&t.$attrs.color.active){e.next=14;break}return console.warn('[CommonButton] attribute "color" 沒有傳入對應的 property\n              textColor: '.concat(t.$attrs.color.textColor,"\n              default: ").concat(t.$attrs.color.default,"\n              hover: ").concat(t.$attrs.color.hover,"\n              active: ").concat(t.$attrs.color.active,"\n              以致無法生成客製化按鈕，將使用 antd 預設類型: default")),e.abrupt("return");case 14:t.customedSheet=s([".button-customed-".concat(t._uid),".button-customed-".concat(t._uid,":hover, .button-customed-").concat(t._uid,":focus"),".button-customed-".concat(t._uid,":active")],[{color:t.$attrs.color.textColor,"background-color":t.$attrs.color.default,"border-color":t.$attrs.color.default},{color:t.$attrs.color.textColor,"background-color":t.$attrs.color.hover,"border-color":t.$attrs.color.hover},{"background-color":t.$attrs.color.active,"border-color":t.$attrs.color.active}]),t.otherTypeClass="button-customed-".concat(t._uid);case 16:e.next=19;break;case 18:return e.abrupt("return",null);case 19:case"end":return e.stop()}}),e)})))()}}},i=c,u=(r("407a"),r("2877")),l=Object(u["a"])(i,a,n,!1,null,"5a84affa",null);e["a"]=l.exports},d349:function(t,e,r){"use strict";r("9fc7")}}]);