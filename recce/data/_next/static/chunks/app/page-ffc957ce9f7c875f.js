(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{99178:function(e,n,t){Promise.resolve().then(t.bind(t,46462))},46462:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return Home}});var r=t(757),a=t(27869);function getNeighborSet(e,n){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,r=new Set,a={},dfs=(e,t)=>{if(t<0||void 0!==a[e]&&a[e]>=t)return;a[e]=t;let i=n(e);for(let e of i)dfs(e,t-1);r.add(e)};for(let n of e)dfs(n,t);return r}function buildDefaultLineageGraphSets(e,n){function buildAllLineageGraph(e,n){let t={},r={},buildNode=(e,n)=>({id:e,name:e,data:{},from:n,parents:{},children:{}});for(let[n,r]of Object.entries(e.parent_map)){t[n]=buildNode(n,"base");let r=e.nodes&&e.nodes[n];r&&(t[n].data.base=r,t[n].name=null==r?void 0:r.name,t[n].resourceType=null==r?void 0:r.resource_type,t[n].packageName=null==r?void 0:r.package_name)}for(let[e,r]of Object.entries(n.parent_map)){t[e]?t[e].from="both":t[e]=buildNode(e,"current");let r=n.nodes&&n.nodes[e];r&&(t[e].data.current=n.nodes&&n.nodes[e],t[e].name=null==r?void 0:r.name,t[e].resourceType=null==r?void 0:r.resource_type,t[e].packageName=null==r?void 0:r.package_name)}for(let[n,a]of Object.entries(e.parent_map))for(let e of a){let a=t[n],i=t[e],o="".concat(e,"_").concat(n);r[o]={id:o,from:"base",parent:i,child:a};let l=r[o];a.parents[e]=l,i.children[n]=l}for(let[e,a]of Object.entries(n.parent_map))for(let n of a){let a=t[e],i=t[n],o="".concat(n,"_").concat(e);r[o]?r[o].from="both":r[o]={id:o,from:"current",parent:i,child:a};let l=r[o];a.parents[n]=l,i.children[e]=l}return{edges:r,nodes:t}}function buildChangedOnlyLineageGraph(e,n){let t={},r={};function union(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];let r=new Set;return n.forEach(e=>{e.forEach(e=>{r.add(e)})}),r}let a=selectDownstream(e,n),i=selectUpstream(e,n,1),o=union(a,i);return Object.entries(e.nodes).forEach(e=>{let[n,r]=e;o.has(n)&&(t[n]=r)}),Object.entries(e.edges).forEach(e=>{let[n,t]=e;o.has(t.parent.id)&&o.has(t.child.id)&&(r[n]=t)}),{nodes:t,edges:r}}let{nodes:t,edges:r}=buildAllLineageGraph(e,n),a=[];for(let[e,n]of Object.entries(t))if("base"===n.from)n.changeStatus="removed",a.push(n.id);else if("current"===n.from)n.changeStatus="added",a.push(n.id);else{var i,o,l,s,c,d;let e=null==n?void 0:null===(l=n.data)||void 0===l?void 0:null===(o=l.base)||void 0===o?void 0:null===(i=o.checksum)||void 0===i?void 0:i.checksum,t=null==n?void 0:null===(d=n.data)||void 0===d?void 0:null===(c=d.current)||void 0===c?void 0:null===(s=c.checksum)||void 0===s?void 0:s.checksum;e&&t&&e!==t&&(n.changeStatus="modified",a.push(n.id))}for(let[e,n]of Object.entries(r))"base"===n.from?n.changeStatus="removed":"current"===n.from&&(n.changeStatus="added");return{all:{nodes:t,edges:r},changed:buildChangedOnlyLineageGraph({nodes:t,edges:r},a),modifiedSet:a}}function selectUpstream(e,n){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;return getNeighborSet(n,n=>void 0===e.nodes[n]?[]:Object.keys(e.nodes[n].parents),t)}function selectDownstream(e,n){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;return getNeighborSet(n,n=>void 0===e.nodes[n]?[]:Object.keys(e.nodes[n].children),t)}function toReactflow(e,n){let t=[],r=[];for(let[n,r]of Object.entries(e.nodes))t.push({id:r.id,position:{x:0,y:0},data:r,type:"customNode",targetPosition:a.Ly.Left,sourcePosition:a.Ly.Right});for(let[n,t]of Object.entries(e.edges))r.push({id:t.id,type:"customEdge",source:t.parent.id,target:t.child.id,data:t});return highlightPath(e,n,t,r,null)}function highlightPath(e,n,t,r,a){function union(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];let r=new Set;return n.forEach(e=>{e.forEach(e=>{r.add(e)})}),r}let i=null!==a?union(selectUpstream(e,[a]),selectDownstream(e,[a])):getNeighborSet(n,n=>void 0===e.nodes[n]?[]:Object.keys(e.nodes[n].children)),o=new Set(r.filter(e=>i.has(e.source)&&i.has(e.target)).map(e=>e.id)),l=t.map(e=>({...e,data:{...e.data,isHighlighted:i.has(e.id)}})),s=r.map(e=>({...e,data:{...e.data,isHighlighted:o.has(e.id)}}));return[l,s]}var i=t(10126),o=t(83172),l=t(55528),s=t(29330),c=t(17714),d=t(46543),u=t(43093),h=t(7752),m=t(94410),x=t(62209),g=t(29985),f=t(42524),p=t(27726),y=t(26187),j=t(23704),v=t(33710),C=t(93864),b=t.n(C);t(94570);var k=t(11180),S=t(63240),w=t(54057);let _=k.Nbv,E=k.sFB,L=k.UGs,IconChanged=e=>(0,r.jsxs)("svg",{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 16 16",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8 11 a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:""})]});function getIconForChangeStatus(e){return"added"===e?{color:"#1dce00",icon:_}:"removed"===e?{color:"#ff4444",icon:E}:"modified"===e?{color:"#ffa502",icon:L}:{color:"inherit",icon:void 0}}function getIconForResourceType(e){return"model"===e?{color:"#c0eafd",icon:S.Fn3}:"metric"===e?{color:"#ffe6ee",icon:w._MV}:"source"===e?{color:"#a6dda6",icon:S.i1q}:"exposure"===e?{color:"#ffe6ee",icon:w.n8P}:"semantic_model"===e?{color:"#fb8caf",icon:w.R1C}:"seed"===e?{color:"#a6dda6",icon:S.tWi}:{color:"inherit",icon:void 0}}function GraphNode(e){var n,t;let c,{data:d}=e,{isHighlighted:u,resourceType:h,changeStatus:m}=d,x=(0,a.oR)(e=>e.transform[2]>.3),{icon:g}=getIconForResourceType(h),f="gray.400",p="solid";m&&(c=getIconForChangeStatus(m).icon,f=getIconForChangeStatus(m).color);let y=f,j=null==d?void 0:d.name;return(0,r.jsx)(o.u,{label:"model"===h?j:"".concat(j," (").concat(h,")"),placement:"top",children:(0,r.jsxs)(l.k,{width:"300px",_hover:{backgroundColor:x?"gray.100":f},borderColor:y,borderWidth:1,borderStyle:p,backgroundColor:x?"white":f,borderRadius:3,boxShadow:"unset",padding:0,className:!0===u?"node-highlight":!1===u?"node-unhighlight":void 0,children:[(0,r.jsx)(l.k,{backgroundColor:f,padding:2,borderRightWidth:1,borderColor:y,borderStyle:p,alignItems:"top",visibility:x?"inherit":"hidden",children:(0,r.jsx)(s.J,{as:g})}),(0,r.jsx)(l.k,{flex:"1 0 auto",mx:"1",width:"100px",direction:"column",children:(0,r.jsxs)(l.k,{width:"100%",textAlign:"left",flex:"1",p:1,alignItems:"center",visibility:x?"inherit":"hidden",children:[(0,r.jsx)(i.xu,{flex:"1",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",children:j}),c&&(0,r.jsx)(l.k,{children:(0,r.jsx)(s.J,{color:f,as:c,flex:"0 0 20px"})})]})}),Object.keys(null!==(n=null==d?void 0:d.parents)&&void 0!==n?n:{}).length>0&&(0,r.jsx)(a.HH,{type:"target",position:a.Ly.Left,isConnectable:!1}),Object.keys(null!==(t=null==d?void 0:d.children)&&void 0!==t?t:{}).length>0&&(0,r.jsx)(a.HH,{type:"source",position:a.Ly.Right,isConnectable:!1})]})})}function GraphEdge(e){let{sourceX:n,sourceY:t,targetX:i,targetY:o,sourcePosition:l,targetPosition:s,style:c={},markerEnd:d,data:u}=e,h={...c};(null==u?void 0:u.changeStatus)&&(h.stroke=getIconForChangeStatus(null==u?void 0:u.changeStatus).color,h.strokeDasharray="5"),(null==u?void 0:u.isHighlighted)===!1&&(h.filter="opacity(0.2) grayscale(50%)");let[m]=(0,a.OQ)({sourceX:n,sourceY:t,sourcePosition:l,targetX:i,targetY:o,targetPosition:s});return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(a.u5,{path:m,markerEnd:d,style:{...h,...c}})})}t(88727);var I=t(89042),N=t(74796),O=t(62648),z=t(79315),D=t(90593),F=t(62130),T=t(58909),q=t(2593),P=t(55344),R=t(1726),K=t(83622),W=t(21801),M=t(29731);function mergeKeys(e,n){let t=[...e],r=[...n],a=[];for(;t.length>0&&r.length>0;)if(a.includes(t[0]))t.shift();else if(a.includes(r[0]))r.shift();else if(t[0]===r[0])a.push(t[0]),t.shift(),r.shift();else if(r.includes(t[0])){let e=r.indexOf(t[0]);for(let n=0;n<e;n++)a.includes(r[n])||a.push(r[n]);a.push(t[0]),t.shift(),r.splice(0,e+1)}else a.push(t[0]),t.shift();return t.forEach(e=>{a.includes(e)||a.push(e)}),r.forEach(e=>{a.includes(e)||a.push(e)}),a}function mergeKeysWithStatus(e,n){let t=mergeKeys(e,n),r={};for(let a of t)e.includes(a)?n.includes(a)?r[a]=void 0:r[a]="removed":r[a]="added";let a={};e.forEach((e,n)=>{a[e]=n});let i=-1;for(let e of t){let n=a[e];void 0!==n&&(n>i?i=n:r[e]="reordered")}return r}function mergeColumns(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t={},r=mergeKeysWithStatus(Object.keys(e),Object.keys(n));return Object.entries(r).forEach(e=>{let[n,r]=e;t[n]={name:n,reordered:"reordered"===r}}),Object.entries(e).map((e,n)=>{let[r,a]=e;t[r].baseIndex=n+1,t[r].baseType=a.type}),Object.entries(n).map((e,n)=>{let[r,a]=e;t[r].currentIndex=n+1,t[r].currentType=a.type}),t}function toDataGrid(e){function columnIndexCellClass(e){return void 0===e.baseIndex?"column-index-added":void 0===e.currentIndex?"column-index-removed":!0===e.reordered?"column-index-reordered":"column-index-normal"}function columnNameCellClass(e){return void 0===e.baseIndex?"column-body-added":void 0===e.currentIndex?"column-body-removed":!0===e.reordered?"column-body-reordered":"column-body-normal"}function columnTypeCellClass(e){return void 0===e.baseIndex?"column-body-added":void 0===e.currentIndex?"column-body-removed":e.baseType!==e.currentType?"column-body-type-changed":!0===e.reordered?"column-body-reordered":"column-body-normal"}let n=Object.values(e);return{columns:[{key:"baseIndex",name:"",resizable:!0,minWidth:35,cellClass:columnIndexCellClass},{key:"currentIndex",name:"",resizable:!0,minWidth:35,cellClass:columnIndexCellClass},{key:"name",name:"Name",resizable:!0,cellClass:columnNameCellClass},{key:"baseType",name:"Base Type",resizable:!0,cellClass:columnTypeCellClass},{key:"currentType",name:"Current Type",resizable:!0,cellClass:columnTypeCellClass}],rows:n}}t(75165),t(91702);var A=t(52116),G=t(93683),H=t(7873);function SchemaView(e){let n,{base:t,current:a}=e,{columns:i,rows:o}=(0,p.useMemo)(()=>toDataGrid(mergeColumns(null==t?void 0:t.columns,null==a?void 0:a.columns)),[t,a]),s=t&&void 0===t.columns,c=a&&void 0===a.columns;return s&&c?n="catalog.json is missing on both current and base environments.":s?n="catalog.json is missing on base environment.":c&&(n="catalog.json is missing on current environment."),(0,r.jsxs)(l.k,{direction:"column",children:[n&&(0,r.jsxs)(G.b,{status:"warning",fontSize:"12px",p:"8px",children:[(0,r.jsx)(H.z,{}),n]}),o.length>0&&(0,r.jsx)(A.ZP,{style:{height:"100%",fontSize:"10pt",borderWidth:1,overflowY:"auto"},columns:i,rows:o,className:"rdg-light"})]})}let V='select * from {{ ref("mymodel") }}',Q=(0,p.createContext)({sqlQuery:V,setSqlQuery:()=>{}});function RecceQueryContextProvider(e){let{children:n}=e,[t,a]=p.useState(V);return(0,r.jsx)(Q.Provider,{value:{setSqlQuery:a,sqlQuery:t},children:n})}let useRecceQueryContext=()=>(0,p.useContext)(Q);var B=t(29357);function SqlDiffView(e){let{base:n,current:t}=e;return(0,r.jsx)(B.SV,{height:"500px",language:"sql",theme:"vs",original:null==n?void 0:n.raw_code,modified:null==t?void 0:t.raw_code,options:{readOnly:!0,fontSize:14,lineNumbers:"on",automaticLayout:!0,minimap:{enabled:!1},wordWrap:"on",wrappingIndent:"same"}})}var U=t(90068),J=t(41171),X=t(53930),Z=t(68665),Y=t(17180),$=t(84680),ee=t(10929),en=t(12218);let et=en.env.NEXT_PUBLIC_API_URL?en.env.NEXT_PUBLIC_API_URL:window.location.origin;var er=t(27471);let ea=ee.default.create({baseURL:et}),ei=new er.S;function extractColumnNames(e){function getNames(e){return e&&e.columns?Object.values(e.columns).map(e=>e.name):[]}let n=getNames(e.data.base),t=getNames(e.data.current),r=[];return n.forEach(e=>{r.includes(e)||r.push(e)}),t.forEach(e=>{r.includes(e)||r.push(e)}),r}async function fetchColumnValuesComparison(e,n){try{let t=await ea.post("/api/runs",{type:"value_diff",params:{model:e,primary_key:n}});return t.data.result}catch(e){console.error("Error fetching column values comparison:",e)}}var MismatchSummary=function(){let{isOpen:e,onOpen:n,onClose:t}=(0,c.q)(),[a,o]=(0,p.useState)(!1),[l,s]=(0,p.useState)(null);return{MismatchSummaryModal:c=>{let{node:d}=c,u="model"===d.resourceType||"seed"===d.resourceType||"source"===d.resourceType,y=extractColumnNames(d),[j,v]=(0,p.useState)(""),handleExecute=async()=>{if(!a&&""!==j){o(!0);try{let e=await fetchColumnValuesComparison(d.name,j),n=e.data.schema.fields.map(e=>({name:e.name,key:e.name}));s({columns:n,data:e.data.data,summary:e.summary,model:d.name})}catch(e){console.error("Error fetching column values comparison:",e)}finally{o(!1)}}};return((0,p.useEffect)(()=>{(null==l?void 0:l.model)!=d.name&&s(null)},[d.name]),u)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(h.u_,{isOpen:e,onClose:t,size:"6xl",children:[(0,r.jsx)(m.Z,{}),(0,r.jsxs)(x.h,{overflowY:"auto",height:"75%",children:[(0,r.jsx)(T.x,{children:"Value Diff Summary"}),(0,r.jsx)(g.o,{}),(0,r.jsx)(f.f,{children:a?(0,r.jsx)(U.E,{size:"xs",isIndeterminate:!0}):l?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i.xu,{mb:1,children:[l.summary.total," rows (",l.summary.added," added, ",l.summary.removed," removed)"]}),(0,r.jsx)(Y.i,{mb:1,mt:1}),(0,r.jsx)(A.ZP,{style:{height:"100%",width:"100%"},columns:l.columns.map(e=>({...e,width:void 0,resizable:!0,flexGrow:1})),rows:l.data,defaultColumnOptions:{resizable:!0},className:"rdg-light"})]}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(J.NI,{children:[(0,r.jsx)(X.l,{children:"Pick a primary key"}),(0,r.jsx)(Z.P,{placeholder:"Select primary key",value:j,onChange:e=>v(e.target.value),children:y.map(e=>(0,r.jsx)("option",{value:e,children:e},e))})]})})}),(0,r.jsxs)($.m,{children:[l&&(0,r.jsx)(F.z,{mr:3,colorScheme:"blue",onClick:()=>{s(null)},children:"Clear"}),(0,r.jsx)(F.z,{colorScheme:"blue",onClick:handleExecute,children:"Execute"})]})]})]}),(0,r.jsx)(F.z,{colorScheme:"blue",size:"sm",onClick:n,children:"Value Diff Summary"})]}):(0,r.jsx)(r.Fragment,{})}}},eo=t(31896);function NodeView(e){let{node:n,onCloseNode:t}=e,[,a]=(0,eo.TH)(),{setSqlQuery:o}=useRecceQueryContext(),s="model"===n.resourceType||"seed"===n.resourceType||"source"===n.resourceType,{isOpen:d,onOpen:u,onClose:p}=(0,c.q)(),{MismatchSummaryModal:y}=MismatchSummary();return(0,r.jsxs)(N.r,{height:"100%",templateRows:"auto 1fr",children:[(0,r.jsxs)(O.U,{children:[(0,r.jsxs)(i.xu,{flex:"0 1 20%",p:"16px",children:[(0,r.jsx)(z.X,{size:"sm",children:n.name}),(0,r.jsx)(i.xu,{color:"gray",children:n.resourceType})]}),(0,r.jsx)(D.L,{}),"modified"===n.changeStatus&&(0,r.jsxs)(i.xu,{children:[(0,r.jsx)(F.z,{onClick:u,leftIcon:(0,r.jsx)(S.tvD,{}),colorScheme:"orange",variant:"solid",children:"Diff"}),(0,r.jsxs)(h.u_,{isOpen:d,onClose:p,size:"6xl",children:[(0,r.jsx)(m.Z,{}),(0,r.jsxs)(x.h,{overflowY:"auto",height:"75%",children:[(0,r.jsx)(T.x,{children:"Model Raw Code Diff"}),(0,r.jsx)(g.o,{}),(0,r.jsx)(f.f,{children:(0,r.jsx)(SqlDiffView,{base:n.data.base,current:n.data.current})})]})]})]}),(0,r.jsx)(i.xu,{flex:"0 1 1%",p:"16px",children:(0,r.jsx)(q.P,{onClick:t})})]}),s&&(0,r.jsxs)(P.m,{overflow:"auto",as:l.k,children:[(0,r.jsx)(R.t,{children:(0,r.jsx)(K.O,{children:"Columns"})}),(0,r.jsx)(W.n,{overflow:"auto",height:"calc(100% - 42px)",children:(0,r.jsx)(M.x,{p:0,overflowY:"auto",height:"100%",children:(0,r.jsx)(SchemaView,{base:n.data.base,current:n.data.current})})})]}),"model"===n.resourceType&&"modified"===n.changeStatus&&(0,r.jsxs)(O.U,{p:"16px",children:[(0,r.jsx)(D.L,{}),(0,r.jsx)(y,{node:n}),(0,r.jsx)(F.z,{colorScheme:"blue",size:"sm",onClick:()=>{o('select * from {{ ref("'.concat(n.name,'") }}')),a("/query")},children:"Query"})]})]})}var el=t(43898),es=t(35537),ec=t(44903);let ed={lineage:()=>["lineage"],checks:()=>["checks","list"],check:e=>["checks",e]};var eu=t(99691);async function getLineage(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=await ea.get("/api/lineage?base=".concat(e));return n.data}async function getLineageWithError(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{let n=await getLineage(e);return{data:n}}catch(e){if(!(e instanceof eu.d7))return{error:null==e?void 0:e.message};{var n,t;let r=null==e?void 0:null===(t=e.response)||void 0===t?void 0:null===(n=t.data)||void 0===n?void 0:n.detail;if(r)return{error:r};return{error:null==e?void 0:e.message}}}}async function getLineageDiff(){let[e,n]=await Promise.all([getLineageWithError(!0),getLineageWithError(!1)]);return{base:e.data,current:n.data,base_error:e.error,current_error:n.error}}var eh=t(15550),em=t(21123),ex=t.n(em);let eg=(0,p.createContext)({});function LineageWatcher(e){let{refetch:n}=e,t=(0,eh.p)(),[a,i]=(0,p.useState)(),o=(0,es.NL)();return(0,p.useEffect)(()=>{function httpUrlToWebSocketUrl(e){return e.replace(/(http)(s)?\:\/\//,"ws$2://")}let e=new WebSocket("".concat(httpUrlToWebSocketUrl(et),"/api/ws"));return i(e),e.onopen=()=>{e.send("ping")},e.onmessage=e=>{if("pong"!==e.data)try{let n=JSON.parse(e.data);if("refresh"===n.command){let{eventType:e,srcPath:r}=n.event,[a,i]=r.split("/").slice(-2),l=ex().parse(i).name;t({description:"Detected ".concat(a," ").concat(l," ").concat(e),status:"info",variant:"left-accent",position:"bottom-right",duration:5e3,isClosable:!0}),o.invalidateQueries({queryKey:ed.lineage()})}}catch(e){console.error(e)}},()=>{e&&e.close()}},[t,o]),(0,r.jsx)(r.Fragment,{})}function LineageGraphsContextProvider(e){let{children:n}=e,{data:t,isLoading:a,error:i,refetch:o}=(0,ec.a)({queryKey:ed.lineage(),queryFn:getLineageDiff}),l=(0,p.useMemo)(()=>{if(t)return buildDefaultLineageGraphSets(t.base,t.current)},[t]),s=(null==i?void 0:i.message)||(null==t?void 0:t.current_error)||(null==t?void 0:t.base_error);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(LineageWatcher,{refetch:o}),(0,r.jsx)(eg.Provider,{value:{lineageGraphSets:l,error:s,isLoading:a},children:n})]})}let useLineageGraphsContext=()=>(0,p.useContext)(eg);var ef=t(39668);let ep={added:["Model Added","Added resource"],removed:["Model Removed","Removed resource"],modified:["Model Modified","Modified resource"],col_added:["Column Added","Added column"],col_removed:["Column Removed","Removed column"],col_changed:["Column Modified","Modified column"],folder_changed:["Modified","Modified folder"]};function ChangeSummary_getIconForChangeStatus(e){if("added"===e)return{color:"#1dce00",icon:_};if("removed"===e)return{color:"#ff067e",icon:E};if("modified"===e)return{color:"#ffa502",icon:L};if("col_added"===e)return{color:"#1dce00",icon:_};if("col_removed"===e)return{color:"#ff067e",icon:E};if("col_changed"===e)return{color:"#ffa502",icon:L};if("folder_changed"===e)return{color:"#ffa502",icon:IconChanged};return{color:"inherit",icon:void 0}}function SummaryText(e){let{name:n,value:t,tip:a}=e;return(0,r.jsxs)(ef.g,{alignItems:"stretch",children:[(0,r.jsxs)(u.x,{fontSize:"sm",color:"gray",children:[n,a&&(0,r.jsx)(o.u,{label:a,children:(0,r.jsx)(i.xu,{display:"inline-block",children:(0,r.jsx)(s.J,{mx:"2px",as:I.H33,boxSize:3})})})]}),t]})}function ChangeStatusCountLabel(e){let{changeStatus:n,value:t}=e,[a]=n?ep[n]:[""],{icon:i,color:o}=ChangeSummary_getIconForChangeStatus(n);return(0,r.jsxs)(ef.g,{alignItems:"stretch",children:[(0,r.jsxs)(l.k,{alignItems:"center",fontSize:"sm",color:"gray",children:[(0,r.jsx)(s.J,{mr:"5px",as:i,color:o}),a]}),(0,r.jsx)(u.x,{fontSize:"sm",children:t})]})}function calculateColumnChange(e,n){let t=0,r=0,a=0;return(e||n)&&(n&&Object.keys(n.columns||{}).forEach(n=>{(!e||!e.columns||!e.columns[n])&&t++}),e&&Object.keys(e.columns||{}).forEach(e=>{(!n||!n.columns||!n.columns[e])&&r++}),n&&e&&Object.keys(n.columns||{}).forEach(t=>{e.columns&&n.columns&&e.columns[t]&&e.columns[t].type!==n.columns[t].type&&a++})),{adds:t,removes:r,modifies:a}}function calculateChangeSummary(e,n){let t=0,r=0,a=0,i=0,o=0,l=0;return n.forEach(n=>{"added"===e.nodes[n].changeStatus?t++:"removed"===e.nodes[n].changeStatus?r++:"modified"===e.nodes[n].changeStatus&&a++;let s=e.nodes[n].data.base,c=e.nodes[n].data.current,d=calculateColumnChange(s,c);i+=d.adds,o+=d.removes,l+=d.modifies}),{adds:t,removes:r,modifies:a,col_added:i,col_removed:o,col_changed:l}}function ChangeSummary(e){let{lineageGraphSets:n}=e,{adds:t,removes:a,modifies:o,col_added:l,col_removed:s,col_changed:c}=calculateChangeSummary(n.all,n.modifiedSet);return(0,r.jsxs)(N.r,{templateColumns:"1fr 1fr",mb:"10px",borderTop:"1px solid lightgray",padding:"2.5vw",children:[(0,r.jsx)(i.xu,{borderColor:"lightgray",children:(0,r.jsx)(SummaryText,{name:"Code Changes",value:(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(N.r,{templateColumns:"1fr 1fr 1fr",width:"100%",children:[(0,r.jsx)(ChangeStatusCountLabel,{changeStatus:"added",value:t}),(0,r.jsx)(ChangeStatusCountLabel,{changeStatus:"removed",value:a}),(0,r.jsx)(ChangeStatusCountLabel,{changeStatus:"modified",value:o})]})})})}),(0,r.jsx)(i.xu,{borderLeft:"1px",paddingLeft:"12px",borderColor:"lightgray",children:(0,r.jsx)(SummaryText,{name:"Column Changes",value:(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(N.r,{templateColumns:"1fr 1fr 1fr",width:"100%",children:[(0,r.jsx)(ChangeStatusCountLabel,{changeStatus:"col_added",value:l}),(0,r.jsx)(ChangeStatusCountLabel,{changeStatus:"col_removed",value:s}),(0,r.jsx)(ChangeStatusCountLabel,{changeStatus:"col_changed",value:c})]})})})})]})}var ey=t(76353),ej=t(53248),ev=t(9763),eC=t(95853);function SchemaDiffCard(e){let{node:n,...t}=e;return(0,r.jsxs)(ey.Z,{maxWidth:"500px",children:[(0,r.jsxs)(ej.O,{children:[(0,r.jsx)(z.X,{fontSize:18,children:t.title}),(0,r.jsx)(u.x,{fontSize:14,color:"gray",children:n.resourceType})]}),(0,r.jsx)(ev.e,{children:(0,r.jsx)(l.k,{children:(0,r.jsx)(SchemaView,{base:n.data.base,current:n.data.current})})})]})}function listChangedNodes(e){let n=[],t=e.all.nodes;return e.modifiedSet.forEach(e=>{var r,a;let i=t[e],o=mergeKeysWithStatus(Object.keys((null===(r=i.data.base)||void 0===r?void 0:r.columns)||{}),Object.keys((null===(a=i.data.current)||void 0===a?void 0:a.columns)||{})),l=!Object.values(o).every(e=>void 0===e);l&&i.data.base&&i.data.current&&n.push(i)}),n}function SchemaSummary(e){let{lineageGraphSets:n}=e,[t,a]=(0,p.useState)([]);return(0,p.useEffect)(()=>{a(listChangedNodes(n))},[n]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.k,{w:"100%",paddingBottom:"10px",marginBottom:"20px",marginTop:"20px",children:(0,r.jsx)(z.X,{fontSize:24,children:"Schema Summary"})}),(0,r.jsx)(l.k,{w:"100%",paddingBottom:"10px",marginBottom:"20px",children:0===t.length?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(u.x,{fontSize:18,color:"gray",children:"No schema changes detected."})}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(eC.M,{minChildWidth:"500px",spacing:"2vw",padding:"2.5vw",width:"100%",backgroundColor:"lightgray",children:t.map(e=>(0,r.jsx)(SchemaDiffCard,{title:e.name,node:e},e.id))})})})]})}function SummaryView(){let{lineageGraphSets:e}=useLineageGraphsContext();return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(l.k,{direction:"column",w:"100%",minHeight:"650px",children:[(0,r.jsx)(l.k,{w:"100%",paddingBottom:"10px",marginBottom:"20px",children:(0,r.jsx)(z.X,{fontSize:24,children:"Change Summary"})}),e&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(ChangeSummary,{lineageGraphSets:e}),(0,r.jsx)(Y.i,{}),(0,r.jsx)(SchemaSummary,{lineageGraphSets:e})]})]})})}let layout=function(e,n){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"LR",r=new(b()).graphlib.Graph;r.setDefaultEdgeLabel(()=>({})),r.setGraph({rankdir:t}),e.forEach(e=>{r.setNode(e.id,{width:300,height:36})}),n.forEach(e=>{r.setEdge(e.source,e.target)}),b().layout(r),e.forEach(e=>{let n=r.node(e.id);return e.position={x:n.x-150,y:n.y-18},e})},eb={customNode:GraphNode},ek={customEdge:GraphEdge},nodeColor=e=>{var n,t;return(null==e?void 0:null===(n=e.data)||void 0===n?void 0:n.changeStatus)?getIconForChangeStatus(null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.changeStatus).color:"lightgray"},eS={all:"All",changed_models:"Changed Models"};function ChangeStatusLegend(){return(0,r.jsx)(i.xu,{bg:"white",padding:"12px",borderWidth:"1px",borderColor:"gray.200",fontSize:"sm",children:Object.entries({added:["Added","Added resource"],removed:["Removed","Removed resource"],modified:["Modified","Modified resource"]}).map(e=>{let[n,[t,a]]=e,{icon:i,color:c}=getIconForChangeStatus(n);return(0,r.jsx)(o.u,{label:a,children:(0,r.jsxs)(l.k,{alignItems:"center",gap:"6px",marginBottom:"2px",children:[(0,r.jsx)(s.J,{color:c,as:i})," ",t]})},n)})})}function _LineageView(){let[e,n,t]=(0,a.Rr)([]),[o,C,b]=(0,a.ll)([]),[k,S]=(0,p.useState)(),[w,_]=(0,p.useState)(),{lineageGraphSets:E,isLoading:L,error:N}=useLineageGraphsContext(),{isOpen:O,onOpen:z,onClose:D}=(0,c.q)(),[F,T]=(0,p.useState)(),[q,P]=(0,p.useState)("changed_models"),{getViewport:R}=(0,a._K)();return((0,p.useEffect)(()=>{if(!E)return;let e="changed_models"===q?E.changed:E.all,t=E.modifiedSet,[r,a]=toReactflow(e,E.modifiedSet);layout(r,a),S(e),_(t),n(r),C(a)},[n,C,q,E]),L)?(0,r.jsx)(l.k,{width:"100%",height:"100%",alignItems:"center",justifyContent:"center",children:(0,r.jsx)(d.$,{size:"xl"})}):N?(0,r.jsxs)(r.Fragment,{children:["Fail to load lineage data: ",N]}):(0,r.jsxs)(l.k,{width:"100%",height:"100%",children:[(0,r.jsx)(i.xu,{flex:"1 0 0px",children:(0,r.jsxs)(a.x$,{nodeTypes:eb,edgeTypes:ek,nodes:e,edges:o,onNodesChange:t,onEdgesChange:b,onNodeClick:(e,n)=>{T(n.id)},onNodeMouseEnter:(t,r)=>{if(k&&void 0!==w){let[t,a]=highlightPath(k,w,e,o,r.id);n(t),C(a)}},onNodeMouseLeave:(t,r)=>{if(k&&void 0!==w){let[t,r]=highlightPath(k,w,e,o,null);n(t),C(r)}},maxZoom:1,minZoom:.1,fitView:!0,children:[(0,r.jsx)(y.A,{color:"#ccc"}),(0,r.jsxs)(j.Z,{showInteractive:!1,position:"top-right",children:[(0,r.jsx)(j.B,{title:"switch mode",onClick:()=>{P("all"===q?"changed_models":"all")},children:(0,r.jsx)(s.J,{as:I.Bw1})}),(0,r.jsx)(j.B,{title:"download image",onClick:()=>{let e=document.querySelector(".react-flow__viewport");(null==e?void 0:e.parentElement)&&(0,el.YM)(null==e?void 0:e.parentElement,{backgroundColor:"#ffffff00",width:null==e?void 0:e.parentElement.clientWidth,height:null==e?void 0:e.parentElement.clientHeight,style:{width:"".concat(null==e?void 0:e.parentElement.clientWidth),height:"".concat(null==e?void 0:e.parentElement.clientHeight)}}).then(e=>{let n=document.createElement("a");n.setAttribute("download","recce-lineage.png"),n.setAttribute("target","_blank"),n.setAttribute("href",e),n.click()})},children:(0,r.jsx)(s.J,{as:I.wzc})}),(0,r.jsx)(j.B,{title:"summary",onClick:z,children:(0,r.jsx)(s.J,{as:I.SnF})})]}),(0,r.jsx)(a.s_,{position:"bottom-left",children:(0,r.jsx)(ChangeStatusLegend,{})}),(0,r.jsx)(a.s_,{position:"top-left",children:(0,r.jsx)(u.x,{fontSize:"xl",color:"grey",opacity:.5,children:eS[q]})}),(0,r.jsx)(v.a,{nodeColor:nodeColor,nodeStrokeWidth:3})]})}),(0,r.jsxs)(h.u_,{isOpen:O,onClose:D,size:"6xl",children:[(0,r.jsx)(m.Z,{}),(0,r.jsxs)(x.h,{overflowY:"auto",height:"80%",children:[(0,r.jsx)(g.o,{}),(0,r.jsx)(f.f,{children:(0,r.jsx)(SummaryView,{})})]})]}),F&&(null==k?void 0:k.nodes[F])&&(0,r.jsx)(i.xu,{flex:"0 0 500px",borderLeft:"solid 1px lightgray",height:"100%",children:(0,r.jsx)(NodeView,{node:null==k?void 0:k.nodes[F],onCloseNode:()=>{T(void 0)}})})]})}function LineageView(){return(0,r.jsx)(a.tV,{children:(0,r.jsx)(_LineageView,{})})}var ew=t(69146),e_=t(98786);function RecceContextProvider(e){let{children:n}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(RecceQueryContextProvider,{children:(0,r.jsx)(LineageGraphsContextProvider,{children:n})})})}function useVersionNumber(){let[e,n]=(0,p.useState)("");return(0,p.useEffect)(()=>{(async function(){try{let e=await ea.get("/api/version");n(e.data)}catch(e){console.error("Error fetching version number:",e)}})()},[]),e}async function createCheckByRun(e){let n=await ea.post("/api/checks",{run_id:e}),t=n.data;return t}async function listChecks(){let e=await ea.get("/api/checks");return e.data}async function checks_getCheck(e){let n=await ea.get("/api/checks/".concat(e));return n.data}async function updateCheck(e,n){let t=await ea.patch("/api/checks/".concat(e),n);return t.data}async function deleteCheck(e){let n=await ea.delete("/api/checks/".concat(e));return n.data}var eE=t(51348),eL=t(76920),eI=t(36700),eN=t(18974),eO=t(95913),ez=t(10287),eD=t(24275),eF=t(69005),eT=t(14800),eq=t(2600),eP=t(68677),eR=t(83358),eK=t(33695),query_SqlEditor=e=>{let{value:n,onChange:t,onRun:a,...i}=e;return(0,r.jsx)(B.ZP,{language:"sql",theme:"vs",value:n,onChange:e=>{void 0!==e&&t&&t(e)},onMount:(e,n)=>{a&&e.addCommand(n.KeyMod.CtrlCmd|n.KeyCode.Enter,a)},options:{tabSize:2,fontSize:16,lineNumbers:"on",automaticLayout:!0,minimap:{enabled:!1},wordWrap:"on",wrappingIndent:"indent"}})},eW=t(83978),eM=t.n(eW);function _getPrimaryKeyValue(e,n){let t={};for(let r of n)t[r]=e[r];return JSON.stringify(t)}function DataFrameColumnGroupHeader(e){let{name:n,primaryKeys:t,onPrimaryKeyChange:a}=e;return"index"===n?(0,r.jsx)(r.Fragment,{}):t.includes(n)?(0,r.jsxs)(l.k,{alignItems:"center",children:[(0,r.jsx)(i.xu,{flex:1,children:n}),a&&(0,r.jsx)(s.J,{cursor:"pointer",as:k.ven,onClick:()=>{let e=t.filter(e=>e!==n);a(e)}})]}):(0,r.jsxs)(l.k,{alignItems:"center",children:[(0,r.jsx)(i.xu,{flex:1,children:n}),a&&(0,r.jsx)(s.J,{cursor:"pointer",as:k.MhP,onClick:()=>{let e=[...t.filter(e=>"index"!==e),n];a(e)}})]})}function query_toDataGrid(e,n){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0,i={schema:{fields:[],primaryKey:[]},data:[]};if(!e&&n)e=i,0===t.length&&(t=n.schema.primaryKey);else if(!n&&e)n=i,0===t.length&&(t=e.schema.primaryKey);else{if(!e||!n)return{rows:[],columns:[]};if(!eM().isEqual(e.schema.primaryKey,n.schema.primaryKey))throw Error("primary key mismatch! ".concat(e.schema.primaryKey," != ").concat(n.schema.primaryKey));0===t.length&&(t=e.schema.primaryKey)}let o=[],l=[],s={},c={};n.schema.fields.forEach(e=>{s[e.name]={},s[e.name].current=e}),e.schema.fields.forEach(e=>{s[e.name]||(s[e.name]={}),s[e.name].base=e}),Object.entries(s).forEach(e=>{let[n,{base:i,current:s}]=e;if(t.includes(n))l.push({key:"".concat(n),name:(0,r.jsx)(DataFrameColumnGroupHeader,{name:n,primaryKeys:t,onPrimaryKeyChange:a}),frozen:!0});else{if("index"===n)return;let cellClass=e=>{if(!eM().isEqual(e["base__".concat(n)],e["current__".concat(n)]))return"diff-cell"};o.push({name:(0,r.jsx)(DataFrameColumnGroupHeader,{name:n,primaryKeys:t,onPrimaryKeyChange:a}),children:[{key:"base__".concat(n),name:"Base",renderEditCell:A.Ug,cellClass},{key:"current__".concat(n),name:"Current",renderEditCell:A.Ug,cellClass}]})}}),n.data.forEach(e=>{let n=_getPrimaryKeyValue(e,t);c[n]={},c[n].current=e}),e.data.forEach(e=>{let n=_getPrimaryKeyValue(e,t);c[n]||(c[n]={}),c[n].base=e});let d=Object.entries(c).map(e=>{let[n,{base:r,current:a}]=e,i=JSON.parse(n);return r&&Object.keys(r).forEach(e=>{t.includes(e)||(i["base__".concat(e)]=r[e])}),a&&Object.keys(a).forEach(e=>{t.includes(e)||(i["current__".concat(e)]=a[e])}),i});return{columns:[...l,...o],rows:d}}t(7866);let QueryDiffDataGrid=e=>{let{isFetching:n,result:t,error:a,primaryKeys:i,setPrimaryKeys:o}=e,l=(0,p.useMemo)(()=>n?{rows:[],columns:[]}:query_toDataGrid(null==t?void 0:t.base,null==t?void 0:t.current,i,o),[t,n,i,o]),{base_error:s,current_error:c}=t||{};return n?(0,r.jsxs)(eL.M,{p:"16px",height:"100%",children:[(0,r.jsx)(d.$,{size:"sm",mr:"8px"}),"Loading..."]}):a||s&&c?(0,r.jsxs)(G.b,{status:"error",children:[(0,r.jsx)(H.z,{}),"Error: ",(null==a?void 0:a.message)||c]}):0===l.columns.length?(0,r.jsx)(eL.M,{height:"100%",children:"No data"}):(0,r.jsx)(A.ZP,{style:{blockSize:"100%"},columns:l.columns,rows:l.rows,defaultColumnOptions:{resizable:!0,maxWidth:800,width:100},className:"rdg-light"})};var eA=t(44525),eG=t(234),eH=t(96094),eV=t(25535),eQ=t(36334);function CheckBreadcrumb(e){let{name:n,setName:t}=e,[a,o]=(0,p.useState)(!1),[l,s]=(0,p.useState)(n),c=(0,p.useRef)(null),d=(0,p.useCallback)(()=>{t(l),o(!1)},[t,o,l]);return(0,p.useEffect)(()=>{let handleClickOutside=e=>{c.current&&!c.current.contains(e.target)&&d()};return a&&document.addEventListener("mousedown",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside)}},[a,c,d]),(0,r.jsxs)(eG.a,{flex:"0 1",fontSize:"12pt",separator:(0,r.jsx)(eQ.X,{color:"gray.500"}),children:[(0,r.jsx)(eH.g,{children:(0,r.jsx)(i.xu,{children:"Checks"})}),(0,r.jsx)(eH.g,{flex:"0 1",cursor:"pointer",children:a?(0,r.jsx)(eV.I,{ref:c,value:l,onChange:e=>{s(e.target.value)},onKeyDown:e=>{"Enter"===e.key?(t(l),o(!1)):"Escape"===e.key&&(s(n),o(!1))},size:"sm",w:"auto",minW:"100px",maxW:"600px"}):(0,r.jsx)(i.xu,{onClick:()=>{s(n),o(!0)},textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",children:n})})]})}var eB=t(70556);let CheckDetail=e=>{var n;let{checkId:t}=e,a=(0,es.NL)(),[,o]=(0,eo.TH)(),{isLoading:c,error:d,data:u}=(0,ec.a)({queryKey:ed.check(t),queryFn:()=>checks_getCheck(t),refetchOnMount:!1,staleTime:3e5}),{mutate:h}=(0,eB.D)({mutationFn:e=>updateCheck(t,e),onSuccess:()=>{a.invalidateQueries({queryKey:ed.check(t)}),a.invalidateQueries({queryKey:ed.checks()})}}),{mutate:m}=(0,eB.D)({mutationFn:()=>deleteCheck(t),onSuccess:()=>{a.invalidateQueries({queryKey:ed.checks()}),o("/checks")}});return c?(0,r.jsx)(eL.M,{h:"100%",children:"Loading"}):d?(0,r.jsxs)(eL.M,{h:"100%",children:["Error: ",d.message]}):(0,r.jsxs)(l.k,{height:"100%",width:"100%",maxHeight:"100%",direction:"column",children:[(0,r.jsxs)(l.k,{p:"8px 16px",alignItems:"center",children:[(0,r.jsx)(CheckBreadcrumb,{name:(null==u?void 0:u.name)||"",setName:e=>{h({name:e})}}),(0,r.jsxs)(eI.v,{children:[(0,r.jsx)(eN.j,{as:eO.h,icon:(0,r.jsx)(s.J,{as:k.D_A}),variant:"ghost"}),(0,r.jsx)(ez.q,{children:(0,r.jsx)(eD.s,{icon:(0,r.jsx)(eA.p,{}),onClick:()=>m(),children:"Delete"})})]}),(0,r.jsx)(D.L,{}),(0,r.jsx)(eE.X,{isChecked:null==u?void 0:u.is_checked,onChange:e=>{let n=e.target.checked;h({is_checked:n})},children:"Check"})]}),(0,r.jsxs)(eF.U,{defaultIndex:[],allowToggle:!0,children:[(0,r.jsxs)(eT.Q,{children:[(0,r.jsxs)(eq.K,{children:[(0,r.jsx)(i.xu,{as:"span",textAlign:"left",children:"description"}),(0,r.jsx)(eP.X,{})]}),(0,r.jsx)(eR.H,{pb:4,children:(0,r.jsx)(eK.g,{width:"100%",height:"400px"})})]}),(0,r.jsxs)(eT.Q,{children:[(0,r.jsxs)(eq.K,{children:["query",(0,r.jsx)(eP.X,{})]}),(0,r.jsx)(eR.H,{children:(0,r.jsx)(i.xu,{height:"400px",width:"100%",border:"lightgray 1px solid ",children:(0,r.jsx)(query_SqlEditor,{value:(null==u?void 0:u.params).sql_template})})})]})]}),(0,r.jsx)(i.xu,{flex:"1",style:{contain:"size"},children:(0,r.jsx)(QueryDiffDataGrid,{isFetching:!1,result:null==u?void 0:null===(n=u.last_run)||void 0===n?void 0:n.result,primaryKeys:(null==u?void 0:u.params).primary_keys||[]})})]})},ChecklistItem=e=>{let{check:n,selected:t,onSelect:a}=e,o=(0,es.NL)(),s=n.check_id,{mutate:c}=(0,eB.D)({mutationFn:e=>updateCheck(s,e),onSuccess:()=>{o.invalidateQueries({queryKey:ed.check(s)}),o.invalidateQueries({queryKey:ed.checks()})}});return(0,r.jsxs)(l.k,{width:"100%",p:"10px 20px",cursor:"pointer",_hover:{bg:"gray.200"},bg:t?"gray.100":"inherit",onClick:()=>a(n.check_id),gap:"5px",children:[(0,r.jsx)(i.xu,{flex:"1",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",children:n.name}),(0,r.jsx)(eE.X,{isChecked:n.is_checked,onChange:e=>{let n=e.target.checked;c({is_checked:n})}})]})},CheckPage=()=>{let[,e]=(0,eo.TH)(),[,n]=(0,eo.yj)("/checks/:checkId"),t=null==n?void 0:n.checkId,{isLoading:a,error:o,data:s}=(0,ec.a)({queryKey:ed.checks(),queryFn:listChecks,refetchOnMount:!1});if(a)return(0,r.jsx)(r.Fragment,{children:"Loading"});if(o)return(0,r.jsxs)(r.Fragment,{children:["Error: ",o.message]});if(!(null==s?void 0:s.length))return(0,r.jsx)(eL.M,{h:"100%",children:"No checks"});let handleSelectItem=n=>{e("/checks/".concat(n))};return(0,r.jsxs)(l.k,{height:"100%",children:[(0,r.jsx)(i.xu,{flex:"0 0 400px",borderRight:"lightgray solid 1px",height:"100%",style:{contain:"size"},children:(0,r.jsx)(ef.g,{spacing:0,children:s.map(e=>(0,r.jsx)(ChecklistItem,{check:e,selected:e.check_id===t,onSelect:handleSelectItem},e.check_id))})}),(0,r.jsx)(i.xu,{flex:"1",height:"100%",width:"calc(100% - 400px)",children:(0,r.jsxs)(eo.rs,{children:[(0,r.jsx)(eo.AW,{path:"/checks/:checkId",children:e=>(0,r.jsx)(CheckDetail,{checkId:e.checkId})}),(0,r.jsx)(eo.AW,{children:(0,r.jsx)(eo.l_,{to:"/checks/".concat(s[0].check_id)})})]})})]})};async function submitRun(e){let n=e.type,t=e.params;if("query_diff"===n){let e=await ea.post("/api/runs",{type:"query_diff",params:t}),n=e.data;return n}throw Error("Wrong run type ".concat(e.type))}async function submitQueryDiff(e){return await submitRun({type:"query_diff",params:e})}let QueryPage=()=>{let{sqlQuery:e,setSqlQuery:n}=useRecceQueryContext(),[t,a]=(0,p.useState)(),[o,s]=(0,p.useState)([]),c=(0,es.NL)(),[,d]=(0,eo.TH)(),{data:u,mutate:h,error:m,isPending:x}=(0,eB.D)({mutationFn:()=>submitQueryDiff({sql_template:e}),onSuccess:n=>{s([]),a(e)}}),g=(0,p.useCallback)(async()=>{if(!(null==u?void 0:u.run_id))return;let e=await createCheckByRun(u.run_id);await updateCheck(e.check_id,{params:{...e.params,primary_keys:o}}),a(void 0),c.invalidateQueries({queryKey:ed.checks()}),d("/checks/".concat(e.check_id))},[null==u?void 0:u.run_id,d,o,c]);return(0,r.jsxs)(l.k,{direction:"column",height:"100%",children:[(0,r.jsxs)(l.k,{justifyContent:"right",padding:"5px",gap:"5px",children:[(0,r.jsx)(F.z,{colorScheme:"blue",onClick:g,isDisabled:x||!(null==u?void 0:u.run_id)||e!=t,size:"sm",children:"Add to Checklist"}),(0,r.jsx)(F.z,{colorScheme:"blue",onClick:()=>h(),isDisabled:x,size:"sm",children:"Run"})]}),(0,r.jsx)(i.xu,{flex:"1",border:"1px solid #CBD5E0",height:"200px",width:"100%",children:(0,r.jsx)(query_SqlEditor,{value:e,onChange:n,onRun:()=>h()})}),(0,r.jsx)(i.xu,{backgroundColor:"gray.100",height:"50vh",children:(0,r.jsx)(QueryDiffDataGrid,{isFetching:x,result:null==u?void 0:u.result,error:m,primaryKeys:o,setPrimaryKeys:s})})]})};function getWindow(){return window}function useHash(e){let n=getWindow(),[t,r]=(0,p.useState)(null!=e?e:"");(0,p.useEffect)(()=>{if(!n)return;r(n.location.hash);let handler=()=>r(n.location.hash);return n.addEventListener("hashchange",handler),()=>window.removeEventListener("hashchange",handler)},[n]);let a=(0,p.useCallback)(e=>{n.location.hash="!".concat(e)||0},[n]);return[t,a]}let useHashLocation=()=>{let[e,n]=useHash("#!/ssr"),t=e.replace(/^#!/,"")||"/";return t.includes("?")&&(t=t.split("?")[0]),[t,n]};var eU=t(12218);function getCookie(e){var n=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)");return n?n.pop():""}function NavBar(){let[e,n]=(0,eo.TH)(),t=useVersionNumber(),a=[["Lineage","/lineage"],["Query","/query"],["Checklist","/checks"],["Summary","/summary"]],o=eM().findIndex(a,n=>{let[,t]=n;return e.startsWith(t)});return(0,r.jsx)(P.m,{index:o,children:(0,r.jsxs)(R.t,{children:[a.map(e=>{let[t,a]=e;return(0,r.jsx)(K.O,{onClick:()=>{n(a)},children:t},t)}),(0,r.jsx)(i.xu,{position:"absolute",right:"0",top:"0",p:"2",color:"gray.500",children:t})]})})}function Home(){(0,p.useLayoutEffect)(()=>{let e=getCookie("recce_user_id");if(e&&eU.env.AMPLITUDE_API_KEY)try{e_.S1(eU.env.AMPLITUDE_API_KEY,e,{defaultTracking:!0})}catch(e){console.error(e)}},[]);let e="calc(100vh - 42px)";return(0,r.jsx)(ew.x,{children:(0,r.jsx)(es.aH,{client:ei,children:(0,r.jsx)(RecceContextProvider,{children:(0,r.jsxs)(eo.F0,{hook:useHashLocation,children:[(0,r.jsx)(NavBar,{}),(0,r.jsx)(i.xu,{p:0,h:e,maxH:e,overflow:"auto",children:(0,r.jsxs)(eo.rs,{children:[(0,r.jsx)(eo.AW,{path:"/lineage",children:(0,r.jsx)(LineageView,{})}),(0,r.jsx)(eo.AW,{path:"/query",children:(0,r.jsx)(QueryPage,{})}),(0,r.jsx)(eo.AW,{path:"/checks/:slug*",children:(0,r.jsx)(CheckPage,{})}),(0,r.jsx)(eo.AW,{path:"/summary",children:(0,r.jsx)(SummaryView,{})}),(0,r.jsx)(eo.AW,{path:"/ssr",children:(0,r.jsx)(r.Fragment,{children:"Loading"})}),(0,r.jsx)(eo.AW,{children:(0,r.jsx)(eo.l_,{to:"/lineage"})})]})})]})})})})}},88727:function(){},7866:function(){},75165:function(){}},function(e){e.O(0,[145,170,182,710,495,649,297,62,744],function(){return e(e.s=99178)}),_N_E=e.O()}]);