import{u as oe}from"./index.es-a02ca1d7.js";import{d as Z,u as G,H as J,r as R,k as te,p as T,w as t,h as O,m as c,i as u,o as U,b as o,j as _,t as f,l as se,a as ne,c as V,e as B,f as z,q as K,F as H,S as L,L as re,M as le,N as ue}from"./index-0e27d8eb.js";const ie=Z({__name:"UpsertUserModal",props:{upsertUser:Object},emits:["closeModal"],setup(j,{emit:l}){const{t:i}=G(),S=j,P=l,h=J(()=>se.isEmpty(S.upsertUser)),I=R(),r=te(h.value?{username:"",account:"",role:"",phone_number:""}:{...S.upsertUser}),E=async()=>{var a,s,d,m;try{if(await I.value.validateFields(),h.value)try{await O.post("/user",r),c.success(i("upsertUserModal.message.createUserSuccess")),M(),window.location.reload()}catch(n){switch((s=(a=n==null?void 0:n.response)==null?void 0:a.data)==null?void 0:s.message){case"无权限":{c.error(i("common.message.noAuth"));break}case"账号已存在":{c.error(i("upsertUserModal.message.accountIsExist"));break}default:c.error(i("upsertUserModal.message.createUserFailed"))}}else try{await O.put(`/user/${r.id}`,r),c.success(i("upsertUserModal.message.updateUserSuccess")),M(),window.location.reload()}catch(n){switch((m=(d=n==null?void 0:n.response)==null?void 0:d.data)==null?void 0:m.message){case"无权限":{c.error(i("common.message.noAuth"));break}case"账号不可修改":{c.error(i("upsertUserModal.message.accountCanNotUpdate"));break}default:c.error(i("upsertUserModal.message.updateUserFailed"))}}}catch{}},q=()=>{M()},M=()=>{P("closeModal")};return(a,s)=>{const d=u("a-input"),m=u("a-form-item"),n=u("a-radio-button"),y=u("a-radio-group"),x=u("a-form"),C=u("a-modal");return U(),T(C,{class:"upsert-user-modal",visible:!0,title:h.value?a.$t("upsertUserModal.info.createUser"):a.$t("upsertUserModal.info.updateUser"),cancelText:a.$t("common.actions.cancel"),okText:a.$t("common.actions.confirm"),onOk:s[4]||(s[4]=()=>E()),onCancel:s[5]||(s[5]=()=>q())},{default:t(()=>[o(x,{ref_key:"formRef",ref:I,model:r,"label-col":{offset:1,span:5},"wrapper-col":{offset:1,span:16}},{default:t(()=>[o(m,{label:a.$t("commonBiz.user.username"),name:"username",rules:[{required:!0,message:a.$t("upsertUserModal.message.usernameInvalid")}]},{default:t(()=>[o(d,{value:r.username,"onUpdate:value":s[0]||(s[0]=p=>r.username=p),placeholder:a.$t("upsertUserModal.info.usernamePlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label","rules"]),o(m,{label:a.$t("commonBiz.user.account"),name:"account",rules:[{required:!0,message:a.$t("upsertUserModal.message.accountInvalid")},{pattern:/^[a-zA-Z0-9_]{6,20}$/,message:a.$t("upsertUserModal.message.accountPatternInvalid")}]},{default:t(()=>[o(d,{value:r.account,"onUpdate:value":s[1]||(s[1]=p=>r.account=p),disabled:!h.value,placeholder:a.$t("upsertUserModal.info.accountPlaceholder")},null,8,["value","disabled","placeholder"])]),_:1},8,["label","rules"]),o(m,{label:a.$t("commonBiz.user.role"),name:"role",rules:[{required:!0,message:a.$t("upsertUserModal.message.roleInvalid")}]},{default:t(()=>[o(y,{value:r.role,"onUpdate:value":s[2]||(s[2]=p=>r.role=p)},{default:t(()=>[o(n,{value:"admin"},{default:t(()=>[_(f(a.$t("commonBiz.user.roles.admin")),1)]),_:1}),o(n,{value:"finance"},{default:t(()=>[_(f(a.$t("commonBiz.user.roles.finance")),1)]),_:1}),o(n,{value:"staff"},{default:t(()=>[_(f(a.$t("commonBiz.user.roles.staff")),1)]),_:1}),o(n,{value:"external"},{default:t(()=>[_(f(a.$t("commonBiz.user.roles.external")),1)]),_:1})]),_:1},8,["value"])]),_:1},8,["label","rules"]),o(m,{label:a.$t("commonBiz.user.phoneNumber"),name:"phone_number",rules:[{required:!0,message:a.$t("upsertUserModal.message.phoneNumberInvalid")},{pattern:/^[\d\-+]{7,20}$/,message:a.$t("upsertUserModal.message.phoneNumberPatternInvalid")}]},{default:t(()=>[o(d,{value:r.phone_number,"onUpdate:value":s[3]||(s[3]=p=>r.phone_number=p),placeholder:a.$t("upsertUserModal.info.phoneNumberPlaceholder")},null,8,["value","placeholder"])]),_:1},8,["label","rules"])]),_:1},8,["model"])]),_:1},8,["title","cancelText","okText"])}}});const ce={class:"manage-user-view"},de={class:"manage-user-header"},me={class:"manage-user-title"},pe={class:"manage-user-action"},fe={style:{padding:"8px"}},ge={key:1,class:"action"},_e={key:1},he=Z({__name:"ManageUserView",setup(j){const{t:l}=G(),i=ne(),S=[{dataIndex:"username",key:"username",title:l("commonBiz.user.username"),width:"25%",customFilterDropdown:!0},{dataIndex:"account",key:"account",title:l("commonBiz.user.account"),width:"25%"},{dataIndex:"role",key:"role",title:l("commonBiz.user.role"),width:"10%",filters:[{text:l("commonBiz.user.roles.admin"),value:"admin",color:"green"},{text:l("commonBiz.user.roles.finance"),value:"finance",color:"blue"},{text:l("commonBiz.user.roles.staff"),value:"staff",color:"orange"},{text:l("commonBiz.user.roles.external"),value:"external",color:"red"}]},{dataIndex:"phone_number",key:"phone_number",title:l("commonBiz.user.phoneNumber"),width:"30%"},{key:"action",title:l("common.info.action"),fixed:"right",width:100}],P=e=>O.post("/user/get_list",e),{data:h,run:I,loading:r,current:E,pageSize:q,total:M}=oe(P,{pagination:{currentKey:"page_index",pageSizeKey:"page_size",totalKey:"data.count"}}),a=J(()=>({total:M.value,current:E.value,pageSize:q.value,showSizeChanger:!0})),s=(e,v,b)=>{const D=Object.assign({},v,v.username?{username:v.username[0]}:{});I({page_index:e.current,page_size:e.pageSize,sortField:b.field,sortOrder:b.order,...D})},d=e=>{e()},m=e=>{e({confirm:!0})},n=R(!1),y=R({}),x=()=>["admin"].includes(i.user.role),C=e=>{n.value=e,e||(y.value={})},p=()=>{y.value={},C(!0)},Q=e=>{y.value=e,C(!0)},W=async e=>{try{await O.delete(`/user/${e.id}`),c.success(l("manageUserView.message.deleteUserSuccess")),window.location.reload()}catch{c.error(l("manageUserView.message.deleteUserFailed"))}};return(e,v)=>{var A;const b=u("a-button"),D=u("a-input"),X=u("a-tag"),Y=u("a-divider"),ee=u("a-popconfirm"),ae=u("a-table");return U(),V(H,null,[B("div",ce,[B("div",de,[B("div",me,f(e.$t("route.manages.manageUser")),1),B("div",pe,[o(b,{type:"primary",onClick:p},{default:t(()=>[_(f(e.$t("manageUserView.actions.addUser")),1)]),_:1})])]),o(ae,{columns:S,"row-key":g=>g.id,"data-source":(A=z(h))==null?void 0:A.data.rows,locale:{filterConfirm:e.$t("common.actions.confirm"),filterReset:e.$t("common.actions.reset")},pagination:a.value,loading:z(r),onChange:s},{customFilterIcon:t(({filtered:g})=>[o(z(L),{style:re({color:g?"#108ee9":void 0})},null,8,["style"])]),customFilterDropdown:t(({setSelectedKeys:g,selectedKeys:$,confirm:k,clearFilters:N,column:w})=>[B("div",fe,[o(D,{placeholder:`${e.$t("common.actions.search")}${w.title}`,value:$[0],style:{width:"188px","margin-bottom":"8px",display:"block"},onChange:F=>g(F.target.value?[F.target.value]:[]),onPressEnter:()=>d(k)},null,8,["placeholder","value","onChange","onPressEnter"]),o(b,{type:"primary",size:"small",style:{width:"90px","margin-right":"8px"},onClick:()=>d(k)},{icon:t(()=>[o(z(L))]),default:t(()=>[_(" "+f(e.$t("common.actions.search")),1)]),_:2},1032,["onClick"]),o(b,{size:"small",style:{width:"90px"},onClick:()=>m(N)},{default:t(()=>[_(f(e.$t("common.actions.reset")),1)]),_:2},1032,["onClick"])])]),bodyCell:t(({record:g,column:$,text:k})=>{var N;return[$.key==="role"?(U(),T(X,{key:k,color:(N=$.filters.find(w=>w.value===k))==null?void 0:N.color},{default:t(()=>{var w;return[_(f((w=$.filters.find(F=>F.value===k))==null?void 0:w.text),1)]}),_:2},1032,["color"])):$.key==="action"?(U(),V("span",ge,[x()?(U(),V(H,{key:0},[o(z(le),{class:"edit-action",onClick:()=>Q(g)},null,8,["onClick"]),o(Y,{type:"vertical"}),o(ee,{title:e.$t("manageUserView.actions.confirmDeleteUser"),"ok-text":e.$t("common.actions.confirm"),"cancel-text":e.$t("common.actions.cancel"),onConfirm:()=>W(g)},{default:t(()=>[o(z(ue),{class:"delete-action"})]),_:2},1032,["title","ok-text","cancel-text","onConfirm"])],64)):(U(),V("span",_e,"-"))])):K("",!0)]}),_:1},8,["row-key","data-source","locale","pagination","loading"])]),n.value?(U(),T(ie,{key:0,upsertUser:y.value,onCloseModal:v[0]||(v[0]=()=>C(!1))},null,8,["upsertUser"])):K("",!0)],64)}}});export{he as default};