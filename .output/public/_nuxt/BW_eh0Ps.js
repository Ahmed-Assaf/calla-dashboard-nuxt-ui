import{a8 as p,aI as w,h as A,a4 as x,G as d,H as D,q as u,i as T,J as f}from"./CST-ZKdJ.js";const E=()=>{const c=p(),v=w().$axios,{locale:h}=A(),{isAuthed:m,userInfo:l}=x(d()),{deleteAuth:y}=d(),n=D(),t=u([]),i=u({}),s=u(!0),r=u(!1);return{fetchData:async e=>{const g=T(()=>m.value?{phone:l.value.phone,country_code:l.value.country_code}:{...e.activateQuery});s.value=!0,await v({url:e.url,method:e.method||"GET",headers:{"Content-Type":"application/x-www-form-urlencoded",lang:h.value||"ar",...e.headers},params:{...e.params},data:e.body}).then(async o=>{const a=o.data;o.status===200?a.key==="success"?(a.data&&(a.data.pagination&&(i.value=a.data.pagination),t.value=a.data),e.getSuccess&&c.add({description:a.msg,timeout:3e3,color:"primary"}),e.onSuccess&&e.onSuccess(),t.value&&t.value.length===0?r.value=!0:r.value=!1,s.value=!1):a.key==="needActive"?await f(n({name:"auth-verification-code",query:g.value})):(a.key==="blocked"&&(await f(n({name:"auth-login",replace:!0})),y()),c.add({description:a.msg,timeout:3e3,color:"red"}),e.onError&&e.onError()):c.add({description:a.msg,timeout:3e3,color:"red"})}).catch(o=>console.log(o)).finally(()=>s.value=!1)},resultData:t,pagination:i,loading:s,noData:r}};export{E as u};
