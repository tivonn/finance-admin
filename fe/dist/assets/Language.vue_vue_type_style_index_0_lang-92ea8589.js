import{d as g,r as d,i as s,o as i,c as p,b as e,w as o,j as u,C as v,D as m}from"./index-0e27d8eb.js";const f={class:"language"},C=g({__name:"Language",setup(L){const t=()=>v("language")||"zh-cn",_=()=>{a.value!==t()&&(m("language",a.value),window.location.reload())},a=d(t());return(h,n)=>{const l=s("a-radio-button"),r=s("a-radio-group");return i(),p("div",f,[e(r,{value:a.value,"onUpdate:value":n[0]||(n[0]=c=>a.value=c),size:"small",onChange:_},{default:o(()=>[e(l,{value:"zh-cn"},{default:o(()=>[u("中文")]),_:1}),e(l,{value:"th"},{default:o(()=>[u("th")]),_:1})]),_:1},8,["value"])])}}});export{C as _};
