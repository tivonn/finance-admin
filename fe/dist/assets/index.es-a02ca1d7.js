import{P as ee,H as O,Q,r as S,s as Y,T as J,U as V,V as le}from"./index-0e27d8eb.js";const ce={},ne=Symbol("GLOBAL_OPTIONS_PROVIDE_KEY"),te=()=>ce,$=e=>e,fe=Object.prototype.toString,de=e=>fe.call(e),ve=e=>de(e)==="[object Object]",M=e=>Array.isArray(e),B=e=>e!==null&&typeof e=="object",X=e=>e instanceof Function,D=e=>e==null,Z=typeof window>"u",re=()=>{var e;return Z||D((e=window.document)===null||e===void 0?void 0:e.visibilityState)?!0:window.document.visibilityState==="visible"},me=()=>{var e,t;return(e=!Z&&((t=window.navigator)===null||t===void 0?void 0:t.onLine))!==null&&e!==void 0?e:!0},G=()=>new Promise(()=>{}),k=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:void 0;const a=t.replace(/\[(\d+)\]/g,".$1").split(".");let o=e;for(const i of a)if(o=Object(o)[i],o===void 0)return n;return o},I=e=>le(e)?e.value:e,ge=e=>B(e)?Object.assign(M(e)?[]:{},e):e,j=new Map,he=e=>D(e)?void 0:j.get(e),pe=(e,t,n)=>{const a=j.get(e);a!=null&&a.timer&&clearTimeout(a.timer);const o=setTimeout(()=>j.delete(e),t);j.set(e,{...n,timer:o})};function oe(e,t,n){let a,o,i,s,r,u,l=0,m=!1,f=!1,T=!0;const d=!t&&t!==0&&typeof window.requestAnimationFrame=="function";if(typeof e!="function")throw new TypeError("Expected a function");t=+t||0,B(n)&&(m=!!n.leading,f="maxWait"in n,i=f?Math.max(+n.maxWait||0,t):i,T="trailing"in n?!!n.trailing:T);function R(c){const A=a,x=o;return a=o=void 0,l=c,s=e.apply(x,A),s}function v(c,A){return d?(window.cancelAnimationFrame(r),window.requestAnimationFrame(c)):setTimeout(c,A)}function P(c){if(d)return window.cancelAnimationFrame(c);clearTimeout(c)}function g(c){return l=c,r=v(b,t),m?R(c):s}function w(c){const A=c-u,x=c-l,_=t-A;return f?Math.min(_,i-x):_}function h(c){const A=c-u,x=c-l;return u===void 0||A>=t||A<0||f&&x>=i}function b(){const c=Date.now();if(h(c))return E(c);r=v(b,w(c))}function E(c){return r=void 0,T&&a?R(c):(a=o=void 0,s)}function L(){r!==void 0&&P(r),l=0,a=u=o=r=void 0}function p(){return r===void 0?s:E(Date.now())}function C(){return r!==void 0}function y(){const c=Date.now(),A=h(c);for(var x=arguments.length,_=new Array(x),F=0;F<x;F++)_[F]=arguments[F];if(a=_,o=this,u=c,A){if(r===void 0)return g(u);if(f)return r=v(b,t),R(u)}return r===void 0&&(r=v(b,t)),s}return y.cancel=L,y.flush=p,y.pending=C,y}function ae(e,t){for(const n in t)if(t[n]!==void 0){if(!B(t[n])||!B(e[n])||!(n in e)){e[n]=t[n];continue}(ve(t[n])||M(t[n]))&&ae(e[n],t[n])}}function q(e){const t=Object.assign({},e);for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];if(!a.length)return t;for(const i of a)ae(t,i);return t}function we(e,t,n){let a=!0,o=!0;if(typeof e!="function")throw new TypeError("Expected a function");return B(n)&&(a="leading"in n?!!n.leading:a,o="trailing"in n?!!n.trailing:o),oe(e,t,{leading:a,trailing:o,maxWait:t})}var Re=$((e,t)=>{let{debounceInterval:n,debounceOptions:a,manual:o}=t;const i=S(!1),s=S(),r=O(()=>a),u=O(()=>I(n)),l=S(e.context.runAsync);return o||(i.value=!0),Y(m=>{D(u.value)||(s.value=oe(f=>f(),u.value,r.value),e.context.runAsync=function(){for(var f=arguments.length,T=new Array(f),d=0;d<f;d++)T[d]=arguments[d];return new Promise((R,v)=>{i.value?(i.value=!1,l.value(...T).then(R).catch(v)):s.value(()=>{l.value(...T).then(R).catch(v)})})},m(()=>{var f;(f=s.value)===null||f===void 0||f.cancel(),e.context.runAsync=l.value}))}),{onCancel(){var m;(m=s.value)===null||m===void 0||m.cancel()}}}),Te=$((e,t)=>{let{errorRetryCount:n=0,errorRetryInterval:a=0}=t;const o=S(),i=S(0),s=O(()=>I(n)),r=O(()=>I(a));let u=!1;const l=()=>{i.value=0},m=O(()=>{if(r.value)return r.value;const d=1e3,R=1,v=9,P=Math.floor(Math.random()*2**Math.min(i.value,v)+R);return d*P}),f=()=>{let d;const R=s.value===-1,v=i.value<s.value;return(R||v)&&(R||(i.value+=1),d=setTimeout(()=>{u=!0,e.context.refresh()},m.value)),()=>d&&clearTimeout(d)},T=()=>{o.value&&o.value()};return{onBefore(){u||l(),u=!1,T()},onSuccess(){l()},onError(){o.value=f()},onCancel(){l(),T()}}}),Pe=$((e,t)=>{let{ready:n=S(!0),manual:a,defaultParams:o=[]}=t;return J(n,i=>{!a&&i&&e.context.run(...o)},{flush:"sync"}),{onBefore(){if(!(X(n)?n():n.value))return e.loading.value=!1,{isBreak:!0}}}}),be=$((e,t)=>{let{refreshDeps:n,refreshDepsAction:a,manual:o}=t;if(n===void 0||M(n)&&n.length===0)return{};const i=M(n)?n:[n];return J(i,()=>{a?a():!o&&e.context.refresh()}),{}}),Ee=$((e,t)=>{let{throttleInterval:n,throttleOptions:a}=t;const o=S(),i=O(()=>I(n)),s=O(()=>a),r=S(e.context.runAsync);return Y(u=>{if(D(n))return{};o.value=we(l=>l(),i.value,s.value),e.context.runAsync=function(){for(var l=arguments.length,m=new Array(l),f=0;f<l;f++)m[f]=arguments[f];return new Promise((T,d)=>{o.value(()=>{r.value(...m).then(T).catch(d)})})},u(()=>{var l;(l=o.value)===null||l===void 0||l.cancel(),e.context.runAsync=r.value})}),{onCancel(){var u;(u=o.value)===null||u===void 0||u.cancel()}}});const ye=(e,t)=>n=>{Object.keys(n).forEach(a=>{e[a].value=n[a]}),t.forEach(a=>a(e))},Ce=(e,t)=>()=>{let n=t;for(let a=e.length;a-- >0;)n=e[a](n);return n()},Oe=(e,t,n)=>{var a,o;const{initialData:i,onSuccess:s,onError:r,onBefore:u,onAfter:l}=t,m=S((a=n==null?void 0:n.loading)!==null&&a!==void 0?a:!1),f=V((o=n==null?void 0:n.data)!==null&&o!==void 0?o:i),T=V(n==null?void 0:n.error),d=S(n==null?void 0:n.params),R=S([]),v=V("pending"),P={},g=ye({status:v,loading:m,data:f,error:T,params:d},[]),w=function(b){for(var E=arguments.length,L=new Array(E>1?E-1:0),p=1;p<E;p++)L[p-1]=arguments[p];if(b==="onQuery"){const C=R.value.map(y=>y.onQuery).filter(Boolean);return{servicePromise:Ce(C,L[0])()}}else{const C=R.value.map(y=>{var c;return(c=y[b])===null||c===void 0?void 0:c.call(y,...L)});return Object.assign({},...C)}},h=S(0);return P.runAsync=async function(){for(var b=arguments.length,E=new Array(b),L=0;L<b;L++)E[L]=arguments[L];g({loading:!0,params:E,status:"pending"}),h.value+=1;const p=h.value,{isBreak:C,breakResult:y=G()}=w("onBefore",E);if(C)return g({status:"settled"}),y;u==null||u(E);try{const c=()=>new Promise(_=>_(e(...d.value)));let{servicePromise:A}=w("onQuery",c);A||(A=c());const x=await A;return p!==h.value?G():(g({data:x,loading:!1,error:void 0,status:"settled"}),w("onSuccess",x,E),s==null||s(x,E),p===h.value&&w("onAfter",E,x,void 0),l==null||l(E),x)}catch(c){if(p!==h.value)return G();throw g({loading:!1,error:c,status:"settled"}),w("onError",c,E),r==null||r(c,E),p===h.value&&w("onAfter",E,void 0,c),l==null||l(E),c}},P.run=function(){P.runAsync(...arguments).catch(b=>{r||console.error(b)})},P.cancel=()=>{h.value+=1,g({loading:!1}),w("onCancel")},P.refresh=()=>{P.run(...d.value||[])},P.refreshAsync=()=>P.runAsync(...d.value||[]),P.mutate=b=>{const E=X(b)?b(f.value):b,L=ge(E);g({data:L}),w("onMutate",L)},{status:v,loading:m,data:f,error:T,params:d,plugins:R,context:P}};function Ae(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;const a=ee(ne,{}),o={...te(),...a,...t},{manual:i=!1,defaultParams:s=[]}=o,r=Oe(e,o);if(r.plugins.value=n.map(u=>u(r,o)),!i){const u=r.params.value||s;r.context.run(...u)}return Q(()=>{r.context.cancel()}),{loading:r.loading,data:r.data,error:r.error,params:r.params,cancel:r.context.cancel,refresh:r.context.refresh,refreshAsync:r.context.refreshAsync,mutate:r.context.mutate,run:r.context.run,runAsync:r.context.runAsync}}const K=new Map,Se=(e,t)=>{K.set(e,t),t.then(n=>(K.delete(e),n)).catch(()=>{K.delete(e)})},Le=e=>K.get(e),N=new Map,xe=(e,t)=>{N.has(e)&&N.get(e).forEach(n=>n(t))},Ie=(e,t)=>(N.has(e)?N.get(e).push(t):N.set(e,[t]),()=>{const n=N.get(e).indexOf(t);N.get(e).splice(n,1)});var $e=$((e,t)=>{let{cacheKey:n,cacheTime:a=6e5,staleTime:o=0,getCache:i,setCache:s}=t;if(!n)return{};const r=X(n)?n:()=>n,u=S(()=>{});let l;const m=g=>i?i(g):he(g),f=(g,w,h)=>{s?s(g,h):pe(g,w,h),xe(g,h.data)},T=g=>o===-1||g+o>new Date().getTime(),d=(g,w)=>Object.prototype.hasOwnProperty.call(g,w),R=g=>{const w=r(g);return Ie(w,h=>{e.data.value=h})},v=r(),P=m(v);return P&&d(P,"data")&&(e.data.value=P.data,e.params.value=P.params),v&&(u.value=R()),Q(()=>{u.value()}),{onBefore(g){const w=r(g),h=m(w);if(!h||!d(h,"data"))return{};if(T(h.time))return e.data.value=h.data,e.loading.value=!1,{isBreak:!0,breakResult:h.data};e.data.value=h.data},onQuery(g){const w=e.params.value,h=r(w);let b=Le(h);return b&&b!==l?()=>b:(b=g(),l=b,Se(h,b),()=>b)},onSuccess(g,w){const h=r(w);h&&(u.value(),f(h,a,{data:g,params:w,time:new Date().getTime()}),u.value=R(w))},onMutate(g){const w=r(e.params.value);w&&(u.value(),f(w,a,{data:g,params:e.params.value,time:new Date().getTime()}),u.value=R(e.params.value))}}});function _e(e){let t,n;class a extends Promise{constructor(i){super(i),this.cancel=()=>{n(),clearTimeout(t)}}}return new a(o=>{n=o,t=setTimeout(n,e)})}function U(){return new Date().getTime()}var Ne=$((e,t)=>{let{loadingDelay:n=0,loadingKeep:a=0}=t;const o=S(()=>{}),i=O(()=>I(n)),s=O(()=>I(a));let r=0,u={};const l=()=>{let m;return i.value&&(m=setTimeout(()=>{e.status.value==="pending"&&(e.loading.value=!0)},i.value)),()=>m&&clearTimeout(m)};return{onBefore(){e.loading.value=!i.value,o.value(),o.value=l(),r=U()},onQuery(m){if(!s.value)return()=>m();u=_e(s.value+i.value);const f=async()=>{try{const d=await m();return U()-r<=i.value&&u.cancel(),Promise.resolve(d)}catch(d){return U()-r<=i.value&&u.cancel(),Promise.reject(d)}},T=Promise.allSettled([f(),u]).then(d=>{const R=d[0];return R.status==="fulfilled"?R.value:Promise.reject(R.reason)});return()=>T},onCancel(){o.value()},onAfter(){o.value()}}}),z;const ue=new Set,ie=new Set,se=new Set,W=(e,t)=>{let n;switch(e){case"FOCUS_LISTENER":n=ue;break;case"RECONNECT_LISTENER":n=se;break;case"VISIBLE_LISTENER":n=ie;break}if(!n.has(t))return n.add(t),()=>{n.delete(t)}},H=e=>{e.forEach(t=>{t()})};!Z&&(z=window)!==null&&z!==void 0&&z.addEventListener&&(window.addEventListener("visibilitychange",()=>{re()&&H(ie)},!1),window.addEventListener("focus",()=>H(ue),!1),window.addEventListener("online",()=>H(se),!1));var Be=$((e,t)=>{let{pollingInterval:n,pollingWhenHidden:a=!1,pollingWhenOffline:o=!1,errorRetryCount:i=0}=t;const s=S(),r=S(!1),u=O(()=>I(n)),l=O(()=>I(i)),m=[],f=v=>{v&&m.push(v)},T=()=>(a||re())&&(o||me()),d=v=>{if(e.error.value&&l.value!==0)return;let P;if(!D(u.value)&&u.value>=0)if(T())P=setTimeout(v,u.value);else{r.value=!0;return}return()=>P&&clearTimeout(P)},R=()=>{r.value&&T()&&(e.context.refresh(),r.value=!1)};return J(u,()=>{s.value&&(s.value(),s.value=d(()=>e.context.refresh()))}),a||f(W("VISIBLE_LISTENER",R)),o||f(W("RECONNECT_LISTENER",R)),Q(()=>{m.forEach(v=>v())}),{onBefore(){var v;(v=s.value)===null||v===void 0||v.call(s)},onCancel(){var v;(v=s.value)===null||v===void 0||v.call(s)},onAfter(){s.value=d(()=>e.context.refresh())}}});const De=(e,t)=>{let n=!1;return function(){n||(n=!0,e(...arguments),setTimeout(()=>{n=!1},t))}};var Fe=$((e,t)=>{let{refreshOnWindowFocus:n=!1,refocusTimespan:a=5e3}=t;const o=O(()=>I(n)),i=O(()=>I(a)),s=[],r=l=>{l&&s.push(l)},u=()=>{s.forEach(l=>l())};return Y(()=>{if(u(),o.value){const l=De(e.context.refresh,i.value);r(W("VISIBLE_LISTENER",l)),r(W("FOCUS_LISTENER",l))}}),Q(()=>{u()}),{}});function je(e,t,n){return Ae(e,t,[...n||[],Ne,Te,Re,Be,Ee,Fe,be,Pe,$e])}function Me(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n={currentKey:"current",pageSizeKey:"pageSize",totalKey:"total",totalPageKey:"totalPage"},a=ee(ne,{}),{pagination:o,...i}=t,{currentKey:s,pageSizeKey:r,totalKey:u,totalPageKey:l}=q(n,te().pagination||{},a.pagination||{},o||{}),m=q({defaultParams:[{[s]:1,[r]:10}]},i),{data:f,params:T,run:d,...R}=je(e,m),v=p=>{const[C,...y]=T.value||[],A=[{...C,...p},...y];d(...A)},P=p=>{v({[s]:p})},g=p=>{v({[r]:p})},w=(p,C)=>{v({[s]:p,[r]:C})},h=O(()=>k(f.value,u,0)),b=O({get:()=>{var p,C,y;return(p=(C=T.value)===null||C===void 0||(y=C[0])===null||y===void 0?void 0:y[s])!==null&&p!==void 0?p:m.defaultParams[0][s]},set:p=>{P(p)}}),E=O({get:()=>{var p,C,y;return(p=(C=T.value)===null||C===void 0||(y=C[0])===null||y===void 0?void 0:y[r])!==null&&p!==void 0?p:m.defaultParams[0][r]},set:p=>{g(p)}}),L=O(()=>k(f.value,l,Math.ceil(h.value/E.value)));return{data:f,params:T,current:b,pageSize:E,total:h,totalPage:L,run:d,changeCurrent:P,changePageSize:g,changePagination:w,...R}}export{Me as u};
