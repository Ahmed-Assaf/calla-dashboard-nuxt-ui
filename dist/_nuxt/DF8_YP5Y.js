import{_ as ue}from"./Bl80ofdR.js";import{_ as ie}from"./DOuWiDWK.js";import{q as g,h as Y,a9 as H,H as Z,i as S,r as N,a4 as T,G as F,v as J,o as y,l as I,w as n,b as o,a as s,k as e,t as x,c as V,F as z,B as M,j as W,C as B,E as K,s as X,K as de,_ as ce,a5 as pe,p as me,f as _e}from"./CST-ZKdJ.js";import{c as fe,a as O,d as be,_ as ge}from"./BQvatdOu.js";import{_ as he}from"./idVGbEIg.js";import{u as ve,_ as $e,a as ye,b as ke}from"./yprSt98c.js";import{_ as xe}from"./CmCr9Oc2.js";import{u as j}from"./BW_eh0Ps.js";import{_ as De}from"./DBd5Fm0R.js";import{_ as Ve}from"./BgesNrwq.js";import{a as we,_ as Se}from"./Cx08xRP1.js";import{_ as ee}from"./DyLLn6GT.js";import{_ as Ce}from"./pkxXHx2O.js";import"./CB507DKx.js";import"./DevvwYKm.js";import"./CxIZtCgj.js";import"./DOaSUxXF.js";import"./B5lnwlPY.js";import"./C298fiGN.js";import"./DeCzlx8H.js";import"./P6enAWVv.js";import"./BVbT1tgN.js";import"./D5w4h-Vr.js";import"./BVVV9AMk.js";import"./CAPv1DYq.js";const Ge={class:"flex items-center flex-wrap gap-3"},Ue={class:"relative cursor-pointer w-16 aspect-[1] p-1 rounded-lg border border-solid border-strokeLightGray flex items-center justify-center flex-col gap-1"},Ae=["alt"],qe={class:"text-textLightColor leading-none text-xs"},Ie=s("img",{src:De,width:"8"},null,-1),Be=["src"],Pe={class:"text-xs text-textLightColor"},te={__name:"AttributesForm",props:{secondBtn:{type:Boolean,default:!1}},emits:["addGroup"],setup(h,{emit:k}){const p=h,r=k,v=g(null),{t}=Y(),u=H();Z();const{fetchData:m,resultData:_,loading:$}=j();$.value=!1,S(()=>[{label:t("product.types.simple"),value:"simple"},{label:t("product.types.multi"),value:"multi"}]),g([]),g(!1),g([]),g(!1),g([]),g(!1);const{thumbnails:d,imgsList:a,uploadImages:i,removeImage:D}=ve(),l=N({images:a,options_ids:[],price:null,discount_type:"ratio",discount_amount:null,stock:null});let A=N({});const w=S(()=>fe({images:O().required(t("inputs.images.required")),price:be().required(t("inputs.price.required")),discount_amount:l.discount_type?O().required(t("inputs.discount_amount.required")):null,stock:O().required(t("inputs.quantity.required"))})),{userInfo:P}=T(F()),C=g([]),E=async()=>{m({url:`provider/products/get-features-options/${u.params.id}`,headers:{Authorization:`Bearer ${P.value.token}`},onSuccess:()=>{C.value=_.value;const c=C.value.features;for(const f of c)l.options_ids.push(f.options[0].id);A=N({...l})}})},G=g(!1),R=async()=>{const c=document.querySelector("form"),f=new FormData(c);f.append("options_ids",JSON.stringify(l.options_ids)),console.log(JSON.stringify(l.options_ids)),G.value=!0,await m({url:`provider/products/add-variant/${u.params.id}`,method:"post",headers:{Authorization:`Bearer ${P.value.token}`},body:f,getSuccess:!0,onSuccess:()=>{r("addGroup"),c.reset(),Object.assign(A,l),d.value=[]}}),G.value=!1},ae=S(()=>p.secondBtn?{label:t("product.group.plural.confirm_add"),radius:"rounded-xl me-auto",loading:G.value,variant:"outline"}:{label:t("general.save_changes"),radius:"rounded-xl block ",loading:G.value});return J(async()=>{await E()}),(c,f)=>{const L=ie,se=B,U=ge,le=he,ne=ye,re=xe;return y(),I(re,{state:e(l),schema:e(w),onSubmit:R,ref_key:"form",ref:v,button:e(ae)},{default:n(()=>[o(U,{label:c.$t("inputs.images.label")},{default:n(()=>[s("div",Ge,[s("div",Ue,[o(L,{type:"file",class:"absolute top-0 left-0 w-full h-full z-[1] opacity-0 cursor-pointer",multiple:"",name:"images[]",onChange:f[0]||(f[0]=b=>e(i)(b))}),s("img",{src:$e,alt:c.$t("inputs.images.label"),width:"18",class:"mb-1"},null,8,Ae),s("small",qe,x(c.$t("inputs.images.label")),1)]),e(d)?(y(!0),V(z,{key:0},M(e(d),(b,q)=>(y(),V("div",{class:"w-16 relative",key:q},[o(se,{square:"",class:"absolute top-0 end-0 rtl:-translate-x-1/2 -translate-y-1/2 ltr:translate-x-1/2 rounded-full",onClick:Q=>e(D)(b),size:"2xs",color:"red"},{leading:n(()=>[Ie]),_:2},1032,["onClick"]),s("img",{src:b,class:"w-full aspect-[1] object-contain p-1 rounded-lg border border-solid border-strokeLightGray"},null,8,Be)]))),128)):W("",!0)])]),_:1},8,["label"]),(y(!0),V(z,null,M(e(C).features,(b,q)=>(y(),I(U,{label:b.name,class:"mb-0",key:q},{default:n(()=>[o(le,{modelValue:e(l).options_ids[q],"onUpdate:modelValue":Q=>e(l).options_ids[q]=Q,options:b.options,placeholder:c.$t("inputs.type.placeholder"),"value-attribute":"id","option-attribute":"name"},null,8,["modelValue","onUpdate:modelValue","options","placeholder"])]),_:2},1032,["label"]))),128)),o(U,{label:c.$t("inputs.price.label"),name:"price"},{default:n(()=>[o(L,{modelValue:e(l).price,"onUpdate:modelValue":f[1]||(f[1]=b=>e(l).price=b),placeholder:c.$t("inputs.price.placeholder"),type:"number",min:"1"},{trailing:n(()=>[s("span",Pe,x(c.$t("general.currency")),1)]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),o(U,{label:c.$t("inputs.discount_type.label"),name:"discount_type"},{default:n(()=>[o(ne,{options:[{value:"ratio",label:c.$t("inputs.discount_type.options.ratio")},{value:"number",label:c.$t("inputs.discount_type.options.number")},{value:null,label:c.$t("inputs.discount_type.options.none")}],modelValue:e(l).discount_type,"onUpdate:modelValue":f[2]||(f[2]=b=>e(l).discount_type=b)},null,8,["options","modelValue"])]),_:1},8,["label"]),e(l).discount_type?(y(),I(U,{key:0,label:c.$t("inputs.discount_amount.label"),name:"discount_amount"},{default:n(()=>[o(L,{modelValue:e(l).discount_amount,"onUpdate:modelValue":f[3]||(f[3]=b=>e(l).discount_amount=b),placeholder:c.$t("inputs.discount_amount.placeholder"),type:"number",min:"1"},null,8,["modelValue","placeholder"])]),_:1},8,["label"])):W("",!0),o(U,{label:c.$t("inputs.quantity.label"),name:"stock"},{default:n(()=>[o(L,{modelValue:e(l).stock,"onUpdate:modelValue":f[4]||(f[4]=b=>e(l).stock=b),placeholder:c.$t("inputs.quantity.placeholder"),type:"number",min:"1"},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["state","schema","button"])}}},Le={class:"p-4"},ze={class:"text-center mb-4"},Te={class:"flex items-center justify-center gap-3 flex-wrap"},Fe={__name:"Delete",props:{productId:{type:Number,required:!0}},emits:["deleted"],setup(h,{emit:k}){const p=h,r=k,{userInfo:v}=T(F()),{fetchData:t,loading:u}=j();u.value=!1;const m=_=>{t({url:`provider/products/delete-variant/${p.productId}`,method:"DELETE",headers:{Authorization:`Bearer ${v.value.token}`},getSuccess:!0,onSuccess:()=>{r("deleted"),_()}})};return(_,$)=>{const d=B,a=we;return y(),I(a,null,{panel:n(({close:i})=>[s("div",Le,[s("h6",ze,x(_.$t("product.group.delete.sure")),1),s("div",Te,[o(d,{color:"red",size:"lg",label:_.$t("product.delete.this"),loading:e(u),onClick:D=>m(i)},null,8,["label","loading","onClick"]),o(d,{color:"primary",size:"lg",label:_.$t("general.cancel"),onClick:i},null,8,["label","onClick"])])])]),default:n(()=>[o(d,{color:"red",square:"",class:"rounded-full",icon:"i-heroicons-x-mark-16-solid",size:"2xs"})]),_:1})}}},je=["alt"],Ee={__name:"Edit",props:{productId:{type:Number,required:!0}},emits:["edited"],setup(h,{emit:k}){const p=k,r=g(!1),v=t=>{p("edited"),r.value=!1};return(t,u)=>{const m=B,_=te,$=ee;return y(),V(z,null,[o(m,{square:"",class:"rounded-full",size:"2xs",onClick:u[0]||(u[0]=d=>r.value=!0)},{default:n(()=>[s("img",{src:Se,alt:t.$t("product.edit"),class:"w-4 h-4"},null,8,je)]),_:1}),o($,{modelValue:e(r),"onUpdate:modelValue":u[1]||(u[1]=d=>K(r)?r.value=d:null),onClose:u[2]||(u[2]=d=>r.value=!1),header:{title:t.$t("general.edit")}},{default:n(()=>[o(_,{onAddGroup:v})]),_:1},8,["modelValue","header"])],64)}}},Re=["src"],Ne={class:"flex items-stretch gap-2 h-full"},Oe={class:"span"},Me={class:"span"},He={class:"text-textLightColor line-through span"},Je={class:"flex items-center gap-2 w-max"},oe={__name:"AttributesTable",props:{tableData:{type:Object,required:!0}},emits:["updateAttrId"],setup(h,{emit:k}){const p=h,r=g(),v=k;return X(()=>p.tableData.attributes.variants,t=>{t&&(r.value=t[0].id)},{immediate:!0,deep:!0}),X(r,t=>{console.log(r.value),v("updateAttrId",t)}),J(()=>{v("updateAttrId",r.value)}),(t,u)=>{const m=ke,_=Fe,$=Ee,d=Ce;return y(),I(d,{columns:p.tableData.columns,rows:p.tableData.attributes.variants,loading:p.tableData.tableLoading,loadingState:{label:t.$t("general.loading")},emptyState:{label:t.$t("general.no_data")},ui:{wrapper:"the-data-table",thead:"hidden",td:{base:"h-[70px]",padding:"!px-2"}},class:"attributes-table"},{"id-data":n(({row:a})=>[o(m,{modelValue:e(r),"onUpdate:modelValue":u[0]||(u[0]=i=>K(r)?r.value=i:null),value:a.id},null,8,["modelValue","value"])]),"image-data":n(({row:a})=>[s("img",{src:a.image?a.image:"/images/product-default.svg",alt:"",class:"w-full object-contain shadow-card px-5 py-1 bg-white rounded-lg h-full"},null,8,Re)]),"options_ids-data":n(({row:a})=>[s("div",Ne,[(y(!0),V(z,null,M(a.options_ids,i=>(y(),V("span",{key:i.id,class:"span"},x(i.name),1))),128))])]),"stock-data":n(({row:a})=>[s("span",Oe,x(a.stock)+" "+x(t.$t("general.piece")),1)]),"price_after_discount-data":n(({row:a})=>[s("span",Me,x(a.price_after_discount)+" "+x(t.$t("general.currency")),1)]),"price-data":n(({row:a})=>[s("span",He,x(a.price)+" "+x(t.$t("general.currency")),1)]),"actions-data":n(({row:a})=>[s("div",Je,[o(_,{"product-id":a.id,onDeleted:u[1]||(u[1]=i=>t.$emit("update"))},null,8,["product-id"]),o($,{"product-id":a.id,onEdited:u[2]||(u[2]=i=>t.$emit("update"))},null,8,["product-id"])])]),_:1},8,["columns","rows","loading","loadingState","emptyState"])}}},Ke={class:"flex flex-col max-h-full"},Qe={class:"text-textLightColor block text-center mb-3"},We={class:"flex-1 overflow-y-auto bg-bodyColor rounded-xl h-2/4 p-3"},Xe={__name:"DefaultProduct",props:{tableData:{type:Object,required:!0}},setup(h){const k=h,p=H(),{userInfo:r}=T(F()),{fetchData:v,loading:t,resultData:u}=j();t.value=!1;const m=g(!1),_=g(null),$=a=>{_.value=a},d=()=>{v({url:`provider/products/change-variant-is-default/${p.params.id}?`,method:"POST",headers:{Authorization:`Bearer ${r.value.token}`},params:{_method:"PATCH"},getSuccess:!0,onSuccess:()=>{m.value=!1}})};return(a,i)=>{const D=B,l=oe,A=ee;return y(),V("div",null,[o(D,{label:a.$t("product.group.choose_main.title"),variant:"outline",size:"xl",class:"rounded-xl px-4",onClick:i[0]||(i[0]=w=>m.value=!0)},null,8,["label"]),o(A,{modelValue:e(m),"onUpdate:modelValue":i[1]||(i[1]=w=>K(m)?m.value=w:null),onClose:i[2]||(i[2]=w=>m.value=!1),header:{title:a.$t("product.group.choose_main.title")}},{default:n(()=>[s("div",Ke,[s("small",Qe,x(a.$t("product.group.choose_main.description")),1),s("div",We,[o(l,{"table-data":k.tableData,onUpdateAttrId:$},null,8,["table-data"])])]),o(D,{label:a.$t("general.confirm"),size:"xl",class:"rounded-xl mx-auto block mt-4 min-w-[40%]",loading:e(t),onClick:d},null,8,["label","loading"])]),_:1},8,["modelValue","header"])])}}},Ye=de("/images/icons/plus-square-filled-white.svg"),Ze=h=>(me("data-v-05a6122f"),h=h(),_e(),h),et={class:"grid grid-cols-12 mb-8"},tt={class:"col lg:col-span-6 col-span-12"},ot={class:"col lg:col-span-6 col-span-12"},at={class:"col col-span-12"},st={class:"flex items-center gap-3 flex-wrap"},lt=Ze(()=>s("img",{src:Ye,width:"18"},null,-1)),nt={__name:"groups",setup(h){const k=H(),{t:p}=Y(),{userInfo:r}=T(F()),v=Z(),t=S(()=>k.query.action!=="create"),u=S(()=>t.value?[{label:p("product.plural"),to:v({name:"products"})},{label:p("product.edit")},{label:p("product.group.plural.this")}]:[{label:p("product.plural"),to:v({name:"products"})},{label:p("product.create_1")},{label:p("product.group.plural.this")}]),m=S(()=>[{key:"image"},{key:"options_ids"},{key:"stock"},{key:"price_after_discount"},{key:"price"},{key:"actions"}]),_=S(()=>[{key:"id"},{key:"image"},{key:"options_ids"},{key:"stock"},{key:"price_after_discount"},{key:"price"}]),$=g(!1),d=g({});pe("paginateData",d);const{fetchData:a,resultData:i}=j(),D=(l=1)=>{$.value=!0,a({url:`provider/products/get-product-variants/${k.params.id}`,headers:{Authorization:`Bearer ${r.value.token}`},params:{page:l},onSuccess:()=>{d.value=i.value.pagination}}),$.value=!1};return J(()=>{D()}),(l,A)=>{const w=ue,P=te,C=Ve,E=oe,G=B,R=Xe;return y(),V("div",null,[o(w,{title:e(u)},null,8,["title"]),s("div",et,[s("div",tt,[o(C,{class:"card"},{default:n(()=>[o(P,{secondBtn:"",onAddGroup:D})]),_:1})]),s("div",ot,[o(C,{class:"card"},{default:n(()=>[o(E,{"table-data":{attributes:e(i),tableLoading:e($),paginateData:e(d),columns:e(m)},onUpdate:D},null,8,["table-data"])]),_:1})]),s("div",at,[s("div",st,[o(G,{type:"button",size:"xl",class:"rounded-xl px-4",label:l.$t("product.confirm_create")},{trailing:n(()=>[lt]),_:1},8,["label"]),o(R,{"table-data":{attributes:e(i),tableLoading:e($),paginateData:e(d),columns:e(_)}},null,8,["table-data"])])])])])}}},qt=ce(nt,[["__scopeId","data-v-05a6122f"]]);export{qt as default};
