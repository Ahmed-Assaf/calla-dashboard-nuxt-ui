import{_ as T}from"./Bl80ofdR.js";import{h as B,q as d,G as P,c,a as l,b as r,w as o,k as p,a5 as G,o as n,l as C,t as u,d as I,P as z,C as A}from"./CST-ZKdJ.js";import{_ as L,a as N,b as V}from"./BBnZmDfW.js";import{_ as q}from"./pkxXHx2O.js";import{_ as j}from"./CS2_aZxM.js";import{u as E}from"./BW_eh0Ps.js";import{_ as F}from"./Cx08xRP1.js";import"./DBd5Fm0R.js";import"./CB507DKx.js";import"./DevvwYKm.js";import"./C298fiGN.js";import"./D5w4h-Vr.js";import"./P6enAWVv.js";import"./CxIZtCgj.js";import"./CAPv1DYq.js";import"./DeCzlx8H.js";const H={class:"grid grid-cols-12"},O={class:"col col-span-12"},R={key:1,class:"flex items-center gap-2 relative truncate"},J=["src"],K={class:"flex items-center gap-2 w-max"},M=["alt"],ue={__name:"index",setup(Q){const{t:e}=B(),_=d([{type:"title",disabled:!0},{label:e("order.new"),columns:[{key:"id",label:e("general.table.id")},{key:"number",label:e("order.table.number"),sortable:!0},{key:"client_name",label:e("general.table.client_name")},{key:"total_price",label:e("order.table.total_price"),sortable:!0},{key:"date",label:e("order.table.date"),sortable:!0},{key:"address",label:e("order.table.address")},{key:"payment_method",label:e("order.table.payment_method")},{key:"actions"}]},{label:e("order.wait_pay")},{label:e("order.preparing")},{label:e("order.delivering_representative")},{label:e("order.delivering")},{label:e("order.finished")}]),{userInfo:m}=P(),{fetchData:b,loading:g,resultData:f}=E(),i=d({});G("paginateData",i);const h=async(a,y)=>{b({url:a,headers:{Authorization:`Bearer ${m.value.token}`},onSuccess:()=>{i.value=f.value.pagination}})};return(a,y)=>{const v=T,x=z,k=L,w=N,D=A,$=q,S=V,U=j;return n(),c("div",H,[l("div",O,[r(U,{items:p(_),class:"w-full",defaultIndex:1,ui:{list:{base:"!flex items-center gap-4 border-b border-b-strokeLightGray pb-3 mb-3 overflow-x-auto",height:"h-fit",rounded:"rounded-none",marker:{wrapper:"top-0 left-0",background:"bg-primaryColor",rounded:"rounded-xl",shadow:"shadow-none"},tab:{base:"disabled:opacity-100 w-fit min-w-[120px] rounded-xl ui-focus-visible:ring-0",padding:"px-1 py-3",height:"h-fit",active:"text-white",inactive:"text-textLightColor border border-strokeLightGray disabled:border-0",size:"text-xs"}}}},{default:o(({item:s})=>[s.type==="title"?(n(),C(v,{key:0,title:[{label:a.$t("order.plural")}],class:"!mb-0"},null,8,["title"])):(n(),c("div",R,u(s.label),1))]),item:o(({item:s})=>[r(S,{class:"stripe-table","onUpdate:page":t=>h(s.url,s.status)},{default:o(()=>[r($,{columns:s.columns,rows:s.status,loading:p(g),loadingState:{label:a.$t("general.loading")},emptyState:{label:a.$t("general.no_data")},ui:{wrapper:"the-data-table"}},{"image-data":o(({row:t})=>[l("img",{src:t.image?t.image:"/images/product-default.svg",alt:"",class:"w-12 aspect-[1] object-contain"},null,8,J)]),"avg_rate-data":o(({row:t})=>[l("div",null,[I(u(t.avg_rate)+" ",1),r(x,{name:"i-heroicons-star-solid",dynamic:"",class:"text-base text-starActive"})])]),"is_available-data":o(({row:t})=>[r(k,{status:t.is_available,"product-id":t.id,onUpdated:a.fetchProducts},null,8,["status","product-id","onUpdated"])]),"actions-data":o(({row:t})=>[l("div",K,[r(w,{"product-id":t.id,onDeleted:a.fetchProducts},null,8,["product-id","onDeleted"]),r(D,{to:a.localeRoute({name:"products-id",params:{id:t.id}}),square:"",class:"rounded-full",size:"2xs"},{default:o(()=>[l("img",{src:F,alt:a.$t("product.edit"),class:"w-4 h-4"},null,8,M)]),_:2},1032,["to"])])]),_:2},1032,["columns","rows","loading","loadingState","emptyState"])]),_:2},1032,["onUpdate:page"])]),_:1},8,["items"])])])}}};export{ue as default};