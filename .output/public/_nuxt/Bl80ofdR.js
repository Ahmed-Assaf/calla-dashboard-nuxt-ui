import{_ as L,N as P,O as v,g as w,P as $,aB as C,Q as S,R as b,aC as N,S as j,T as I,o as a,c as r,a as u,F as h,B as M,z as i,b as B,w as U,$ as o,l as k,j as d,t as p,m as y}from"./CST-ZKdJ.js";const O={wrapper:"relative min-w-0",ol:"flex items-center gap-x-1.5",li:"flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-sm leading-6 min-w-0",base:"flex items-center gap-x-1.5 group font-semibold min-w-0",label:"block truncate",icon:{base:"flex-shrink-0 w-5 h-5",active:"",inactive:""},divider:{base:"flex-shrink-0 w-5 h-5"},active:"text-primary-500 dark:text-primary-400",inactive:" hover:text-gray-700 dark:hover:text-gray-200",default:{divider:"i-heroicons-chevron-right-20-solid rtl:i-heroicons-chevron-left-20-solid"}},_=P(v.ui.strategy,v.ui.breadcrumb,O),V=w({components:{UIcon:$,ULink:C},inheritAttrs:!1,props:{links:{type:Array,default:()=>[]},divider:{type:String,default:()=>_.default.divider},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:l,attrs:n}=S("breadcrumb",b(e,"ui"),_,b(e,"class"));return{ui:l,attrs:n,getULinkProps:N,twMerge:j,twJoin:I}}}),z={key:1,role:"presentation"};function F(e,l,n,A,g,m){const f=$,c=C;return a(),r("nav",y({"aria-label":"Breadcrumb",class:e.ui.wrapper},e.attrs),[u("ol",{class:i(e.ui.ol)},[(a(!0),r(h,null,M(e.links,(s,t)=>(a(),r("li",{key:t,class:i(e.ui.li)},[B(c,y({as:"span",class:[e.ui.base,t===e.links.length-1?e.ui.active:s.to?e.ui.inactive:""],ref_for:!0},e.getULinkProps(s),{"aria-current":t===e.links.length-1?"page":void 0,onClick:s.click}),{default:U(()=>[o(e.$slots,"icon",{link:s,index:t,isActive:t===e.links.length-1},()=>[s.icon?(a(),k(f,{key:0,name:s.icon,class:i(e.twMerge(e.twJoin(e.ui.icon.base,t===e.links.length-1?e.ui.icon.active:s.to?e.ui.icon.inactive:""),s.iconClass))},null,8,["name","class"])):d("",!0)]),o(e.$slots,"default",{link:s,index:t,isActive:t===e.links.length-1},()=>[s.label?(a(),r("span",{key:0,class:i(e.twMerge(e.ui.label,s.labelClass))},p(s.label),3)):d("",!0)])]),_:2},1040,["class","aria-current","onClick"]),t<e.links.length-1?o(e.$slots,"divider",{key:0},()=>[e.divider?(a(),r(h,{key:0},[e.divider.startsWith("i-")?(a(),k(f,{key:0,name:e.divider,class:i(e.ui.divider.base),role:"presentation"},null,8,["name","class"])):(a(),r("span",z,p(e.divider),1))],64)):d("",!0)]):d("",!0)],2))),128))],2)],16)}const J=L(V,[["render",F]]),R={class:"grid mb-5"},q={class:"col flex items-center gap-3 flex-wrap"},D={key:1,class:"font-bukra font-normal"},E={class:"flex-1"},H={class:"flex-shrink-0"},T=w({__name:"PageHeading",props:{title:{type:Array,required:!0}},setup(e){const l=e;return(n,A)=>{const g=J;return a(),r("div",R,[u("div",q,[B(g,{divider:"/",links:l.title},{default:U(({link:m,isActive:f,index:c})=>[c===0?(a(),r("h2",{key:0,class:i(["font-bukra font-bold text-lg",{"!text-textBaseColor":c===0}])},p(m.label),3)):(a(),r("p",D,p(m.label),1))]),_:1},8,["links"]),u("div",E,[o(n.$slots,"center")]),u("div",H,[o(n.$slots,"end")])])])}}});export{T as _};
