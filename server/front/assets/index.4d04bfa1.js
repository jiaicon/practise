var We=Object.defineProperty;var fe=Object.getOwnPropertySymbols;var ze=Object.prototype.hasOwnProperty,Xe=Object.prototype.propertyIsEnumerable;var le=(r,e,t)=>e in r?We(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,_=(r,e)=>{for(var t in e||(e={}))ze.call(e,t)&&le(r,t,e[t]);if(fe)for(var t of fe(e))Xe.call(e,t)&&le(r,t,e[t]);return r};import{d as S,N as ce,R as g,S as Ke,h as de}from"./arco-design.a1af654c.js";import"./index.bdc22923.js";/* empty css              *//* empty css               */var z={exports:{}},he=function(e,t){return function(){for(var n=new Array(arguments.length),i=0;i<n.length;i++)n[i]=arguments[i];return e.apply(t,n)}},Qe=he,X=Object.prototype.toString,K=function(r){return function(e){var t=X.call(e);return r[t]||(r[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function A(r){return r=r.toLowerCase(),function(t){return K(t)===r}}function Q(r){return Array.isArray(r)}function U(r){return typeof r=="undefined"}function Ge(r){return r!==null&&!U(r)&&r.constructor!==null&&!U(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}var pe=A("ArrayBuffer");function Ye(r){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&pe(r.buffer),e}function Ze(r){return typeof r=="string"}function et(r){return typeof r=="number"}function me(r){return r!==null&&typeof r=="object"}function $(r){if(K(r)!=="object")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}var tt=A("Date"),rt=A("File"),nt=A("Blob"),at=A("FileList");function G(r){return X.call(r)==="[object Function]"}function it(r){return me(r)&&G(r.pipe)}function st(r){var e="[object FormData]";return r&&(typeof FormData=="function"&&r instanceof FormData||X.call(r)===e||G(r.toString)&&r.toString()===e)}var ot=A("URLSearchParams");function ut(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function ft(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function Y(r,e){if(!(r===null||typeof r=="undefined"))if(typeof r!="object"&&(r=[r]),Q(r))for(var t=0,a=r.length;t<a;t++)e.call(null,r[t],t,r);else for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.call(null,r[n],n,r)}function Z(){var r={};function e(n,i){$(r[i])&&$(n)?r[i]=Z(r[i],n):$(n)?r[i]=Z({},n):Q(n)?r[i]=n.slice():r[i]=n}for(var t=0,a=arguments.length;t<a;t++)Y(arguments[t],e);return r}function lt(r,e,t){return Y(e,function(n,i){t&&typeof n=="function"?r[i]=Qe(n,t):r[i]=n}),r}function ct(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}function dt(r,e,t,a){r.prototype=Object.create(e.prototype,a),r.prototype.constructor=r,t&&Object.assign(r.prototype,t)}function ht(r,e,t){var a,n,i,s={};e=e||{};do{for(a=Object.getOwnPropertyNames(r),n=a.length;n-- >0;)i=a[n],s[i]||(e[i]=r[i],s[i]=!0);r=Object.getPrototypeOf(r)}while(r&&(!t||t(r,e))&&r!==Object.prototype);return e}function pt(r,e,t){r=String(r),(t===void 0||t>r.length)&&(t=r.length),t-=e.length;var a=r.indexOf(e,t);return a!==-1&&a===t}function mt(r){if(!r)return null;var e=r.length;if(U(e))return null;for(var t=new Array(e);e-- >0;)t[e]=r[e];return t}var vt=function(r){return function(e){return r&&e instanceof r}}(typeof Uint8Array!="undefined"&&Object.getPrototypeOf(Uint8Array)),h={isArray:Q,isArrayBuffer:pe,isBuffer:Ge,isFormData:st,isArrayBufferView:Ye,isString:Ze,isNumber:et,isObject:me,isPlainObject:$,isUndefined:U,isDate:tt,isFile:rt,isBlob:nt,isFunction:G,isStream:it,isURLSearchParams:ot,isStandardBrowserEnv:ft,forEach:Y,merge:Z,extend:lt,trim:ut,stripBOM:ct,inherits:dt,toFlatObject:ht,kindOf:K,kindOfTest:A,endsWith:pt,toArray:mt,isTypedArray:vt,isFileList:at},x=h;function ve(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Ee=function(e,t,a){if(!t)return e;var n;if(a)n=a(t);else if(x.isURLSearchParams(t))n=t.toString();else{var i=[];x.forEach(t,function(f,d){f===null||typeof f=="undefined"||(x.isArray(f)?d=d+"[]":f=[f],x.forEach(f,function(l){x.isDate(l)?l=l.toISOString():x.isObject(l)&&(l=JSON.stringify(l)),i.push(ve(d)+"="+ve(l))}))}),n=i.join("&")}if(n){var s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+n}return e},Et=h;function L(){this.handlers=[]}L.prototype.use=function(e,t,a){return this.handlers.push({fulfilled:e,rejected:t,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1};L.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};L.prototype.forEach=function(e){Et.forEach(this.handlers,function(a){a!==null&&e(a)})};var yt=L,wt=h,Rt=function(e,t){wt.forEach(e,function(n,i){i!==t&&i.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[i])})},ye=h;function D(r,e,t,a,n){Error.call(this),this.message=r,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),a&&(this.request=a),n&&(this.response=n)}ye.inherits(D,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var we=D.prototype,Re={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(r){Re[r]={value:r}});Object.defineProperties(D,Re);Object.defineProperty(we,"isAxiosError",{value:!0});D.from=function(r,e,t,a,n,i){var s=Object.create(we);return ye.toFlatObject(r,s,function(f){return f!==Error.prototype}),D.call(s,r.message,e,t,a,n),s.name=r.name,i&&Object.assign(s,i),s};var T=D,be={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},w=h;function bt(r,e){e=e||new FormData;var t=[];function a(i){return i===null?"":w.isDate(i)?i.toISOString():w.isArrayBuffer(i)||w.isTypedArray(i)?typeof Blob=="function"?new Blob([i]):Buffer.from(i):i}function n(i,s){if(w.isPlainObject(i)||w.isArray(i)){if(t.indexOf(i)!==-1)throw Error("Circular reference detected in "+s);t.push(i),w.forEach(i,function(f,d){if(!w.isUndefined(f)){var o=s?s+"."+d:d,l;if(f&&!s&&typeof f=="object"){if(w.endsWith(d,"{}"))f=JSON.stringify(f);else if(w.endsWith(d,"[]")&&(l=w.toArray(f))){l.forEach(function(v){!w.isUndefined(v)&&e.append(o,a(v))});return}}n(f,o)}}),t.pop()}else e.append(s,a(i))}return n(r),e}var Oe=bt,ee=T,Ot=function(e,t,a){var n=a.config.validateStatus;!a.status||!n||n(a.status)?e(a):t(new ee("Request failed with status code "+a.status,[ee.ERR_BAD_REQUEST,ee.ERR_BAD_RESPONSE][Math.floor(a.status/100)-4],a.config,a.request,a))},j=h,At=j.isStandardBrowserEnv()?function(){return{write:function(t,a,n,i,s,u){var f=[];f.push(t+"="+encodeURIComponent(a)),j.isNumber(n)&&f.push("expires="+new Date(n).toGMTString()),j.isString(i)&&f.push("path="+i),j.isString(s)&&f.push("domain="+s),u===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(t){var a=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return a?decodeURIComponent(a[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),Ct=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},St=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},xt=Ct,Dt=St,Ae=function(e,t){return e&&!xt(t)?Dt(e,t):t},te=h,Tt=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],Nt=function(e){var t={},a,n,i;return e&&te.forEach(e.split(`
`),function(u){if(i=u.indexOf(":"),a=te.trim(u.substr(0,i)).toLowerCase(),n=te.trim(u.substr(i+1)),a){if(t[a]&&Tt.indexOf(a)>=0)return;a==="set-cookie"?t[a]=(t[a]?t[a]:[]).concat([n]):t[a]=t[a]?t[a]+", "+n:n}}),t},Ce=h,Bt=Ce.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a"),a;function n(i){var s=i;return e&&(t.setAttribute("href",s),s=t.href),t.setAttribute("href",s),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:t.pathname.charAt(0)==="/"?t.pathname:"/"+t.pathname}}return a=n(window.location.href),function(s){var u=Ce.isString(s)?n(s):s;return u.protocol===a.protocol&&u.host===a.host}}():function(){return function(){return!0}}(),re=T,Pt=h;function Se(r){re.call(this,r==null?"canceled":r,re.ERR_CANCELED),this.name="CanceledError"}Pt.inherits(Se,re,{__CANCEL__:!0});var q=Se,_t=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""},F=h,gt=Ot,Ft=At,Ut=Ee,$t=Ae,Lt=Nt,jt=Bt,qt=be,R=T,It=q,kt=_t,xe=function(e){return new Promise(function(a,n){var i=e.data,s=e.headers,u=e.responseType,f;function d(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}F.isFormData(i)&&F.isStandardBrowserEnv()&&delete s["Content-Type"];var o=new XMLHttpRequest;if(e.auth){var l=e.auth.username||"",v=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.Authorization="Basic "+btoa(l+":"+v)}var p=$t(e.baseURL,e.url);o.open(e.method.toUpperCase(),Ut(p,e.params,e.paramsSerializer),!0),o.timeout=e.timeout;function oe(){if(!!o){var y="getAllResponseHeaders"in o?Lt(o.getAllResponseHeaders()):null,C=!u||u==="text"||u==="json"?o.responseText:o.response,O={data:C,status:o.status,statusText:o.statusText,headers:y,config:e,request:o};gt(function(W){a(W),d()},function(W){n(W),d()},O),o=null}}if("onloadend"in o?o.onloadend=oe:o.onreadystatechange=function(){!o||o.readyState!==4||o.status===0&&!(o.responseURL&&o.responseURL.indexOf("file:")===0)||setTimeout(oe)},o.onabort=function(){!o||(n(new R("Request aborted",R.ECONNABORTED,e,o)),o=null)},o.onerror=function(){n(new R("Network Error",R.ERR_NETWORK,e,o,o)),o=null},o.ontimeout=function(){var C=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",O=e.transitional||qt;e.timeoutErrorMessage&&(C=e.timeoutErrorMessage),n(new R(C,O.clarifyTimeoutError?R.ETIMEDOUT:R.ECONNABORTED,e,o)),o=null},F.isStandardBrowserEnv()){var ue=(e.withCredentials||jt(p))&&e.xsrfCookieName?Ft.read(e.xsrfCookieName):void 0;ue&&(s[e.xsrfHeaderName]=ue)}"setRequestHeader"in o&&F.forEach(s,function(C,O){typeof i=="undefined"&&O.toLowerCase()==="content-type"?delete s[O]:o.setRequestHeader(O,C)}),F.isUndefined(e.withCredentials)||(o.withCredentials=!!e.withCredentials),u&&u!=="json"&&(o.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&o.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&o.upload&&o.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(f=function(y){!o||(n(!y||y&&y.type?new It:y),o.abort(),o=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f))),i||(i=null);var V=kt(p);if(V&&["http","https","file"].indexOf(V)===-1){n(new R("Unsupported protocol "+V+":",R.ERR_BAD_REQUEST,e));return}o.send(i)})},Mt=null,c=h,De=Rt,Te=T,Ht=be,Jt=Oe,Vt={"Content-Type":"application/x-www-form-urlencoded"};function Ne(r,e){!c.isUndefined(r)&&c.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function Wt(){var r;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(r=xe),r}function zt(r,e,t){if(c.isString(r))try{return(e||JSON.parse)(r),c.trim(r)}catch(a){if(a.name!=="SyntaxError")throw a}return(t||JSON.stringify)(r)}var I={transitional:Ht,adapter:Wt(),transformRequest:[function(e,t){if(De(t,"Accept"),De(t,"Content-Type"),c.isFormData(e)||c.isArrayBuffer(e)||c.isBuffer(e)||c.isStream(e)||c.isFile(e)||c.isBlob(e))return e;if(c.isArrayBufferView(e))return e.buffer;if(c.isURLSearchParams(e))return Ne(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var a=c.isObject(e),n=t&&t["Content-Type"],i;if((i=c.isFileList(e))||a&&n==="multipart/form-data"){var s=this.env&&this.env.FormData;return Jt(i?{"files[]":e}:e,s&&new s)}else if(a||n==="application/json")return Ne(t,"application/json"),zt(e);return e}],transformResponse:[function(e){var t=this.transitional||I.transitional,a=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,i=!a&&this.responseType==="json";if(i||n&&c.isString(e)&&e.length)try{return JSON.parse(e)}catch(s){if(i)throw s.name==="SyntaxError"?Te.from(s,Te.ERR_BAD_RESPONSE,this,null,this.response):s}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Mt},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};c.forEach(["delete","get","head"],function(e){I.headers[e]={}});c.forEach(["post","put","patch"],function(e){I.headers[e]=c.merge(Vt)});var ne=I,Xt=h,Kt=ne,Qt=function(e,t,a){var n=this||Kt;return Xt.forEach(a,function(s){e=s.call(n,e,t)}),e},Be=function(e){return!!(e&&e.__CANCEL__)},Pe=h,ae=Qt,Gt=Be,Yt=ne,Zt=q;function ie(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new Zt}var er=function(e){ie(e),e.headers=e.headers||{},e.data=ae.call(e,e.data,e.headers,e.transformRequest),e.headers=Pe.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Pe.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]});var t=e.adapter||Yt.adapter;return t(e).then(function(n){return ie(e),n.data=ae.call(e,n.data,n.headers,e.transformResponse),n},function(n){return Gt(n)||(ie(e),n&&n.response&&(n.response.data=ae.call(e,n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})},E=h,_e=function(e,t){t=t||{};var a={};function n(o,l){return E.isPlainObject(o)&&E.isPlainObject(l)?E.merge(o,l):E.isPlainObject(l)?E.merge({},l):E.isArray(l)?l.slice():l}function i(o){if(E.isUndefined(t[o])){if(!E.isUndefined(e[o]))return n(void 0,e[o])}else return n(e[o],t[o])}function s(o){if(!E.isUndefined(t[o]))return n(void 0,t[o])}function u(o){if(E.isUndefined(t[o])){if(!E.isUndefined(e[o]))return n(void 0,e[o])}else return n(void 0,t[o])}function f(o){if(o in t)return n(e[o],t[o]);if(o in e)return n(void 0,e[o])}var d={url:s,method:s,data:s,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:f};return E.forEach(Object.keys(e).concat(Object.keys(t)),function(l){var v=d[l]||i,p=v(l);E.isUndefined(p)&&v!==f||(a[l]=p)}),a},ge={version:"0.27.2"},tr=ge.version,b=T,se={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){se[r]=function(a){return typeof a===r||"a"+(e<1?"n ":" ")+r}});var Fe={};se.transitional=function(e,t,a){function n(i,s){return"[Axios v"+tr+"] Transitional option '"+i+"'"+s+(a?". "+a:"")}return function(i,s,u){if(e===!1)throw new b(n(s," has been removed"+(t?" in "+t:"")),b.ERR_DEPRECATED);return t&&!Fe[s]&&(Fe[s]=!0,console.warn(n(s," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(i,s,u):!0}};function rr(r,e,t){if(typeof r!="object")throw new b("options must be an object",b.ERR_BAD_OPTION_VALUE);for(var a=Object.keys(r),n=a.length;n-- >0;){var i=a[n],s=e[i];if(s){var u=r[i],f=u===void 0||s(u,i,r);if(f!==!0)throw new b("option "+i+" must be "+f,b.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new b("Unknown option "+i,b.ERR_BAD_OPTION)}}var nr={assertOptions:rr,validators:se},Ue=h,ar=Ee,$e=yt,Le=er,k=_e,ir=Ae,je=nr,N=je.validators;function B(r){this.defaults=r,this.interceptors={request:new $e,response:new $e}}B.prototype.request=function(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=k(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var a=t.transitional;a!==void 0&&je.assertOptions(a,{silentJSONParsing:N.transitional(N.boolean),forcedJSONParsing:N.transitional(N.boolean),clarifyTimeoutError:N.transitional(N.boolean)},!1);var n=[],i=!0;this.interceptors.request.forEach(function(p){typeof p.runWhen=="function"&&p.runWhen(t)===!1||(i=i&&p.synchronous,n.unshift(p.fulfilled,p.rejected))});var s=[];this.interceptors.response.forEach(function(p){s.push(p.fulfilled,p.rejected)});var u;if(!i){var f=[Le,void 0];for(Array.prototype.unshift.apply(f,n),f=f.concat(s),u=Promise.resolve(t);f.length;)u=u.then(f.shift(),f.shift());return u}for(var d=t;n.length;){var o=n.shift(),l=n.shift();try{d=o(d)}catch(v){l(v);break}}try{u=Le(d)}catch(v){return Promise.reject(v)}for(;s.length;)u=u.then(s.shift(),s.shift());return u};B.prototype.getUri=function(e){e=k(this.defaults,e);var t=ir(e.baseURL,e.url);return ar(t,e.params,e.paramsSerializer)};Ue.forEach(["delete","get","head","options"],function(e){B.prototype[e]=function(t,a){return this.request(k(a||{},{method:e,url:t,data:(a||{}).data}))}});Ue.forEach(["post","put","patch"],function(e){function t(a){return function(i,s,u){return this.request(k(u||{},{method:e,headers:a?{"Content-Type":"multipart/form-data"}:{},url:i,data:s}))}}B.prototype[e]=t(),B.prototype[e+"Form"]=t(!0)});var sr=B,or=q;function P(r){if(typeof r!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(n){e=n});var t=this;this.promise.then(function(a){if(!!t._listeners){var n,i=t._listeners.length;for(n=0;n<i;n++)t._listeners[n](a);t._listeners=null}}),this.promise.then=function(a){var n,i=new Promise(function(s){t.subscribe(s),n=s}).then(a);return i.cancel=function(){t.unsubscribe(n)},i},r(function(n){t.reason||(t.reason=new or(n),e(t.reason))})}P.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};P.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};P.prototype.unsubscribe=function(e){if(!!this._listeners){var t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}};P.source=function(){var e,t=new P(function(n){e=n});return{token:t,cancel:e}};var ur=P,fr=function(e){return function(a){return e.apply(null,a)}},lr=h,cr=function(e){return lr.isObject(e)&&e.isAxiosError===!0},qe=h,dr=he,M=sr,hr=_e,pr=ne;function Ie(r){var e=new M(r),t=dr(M.prototype.request,e);return qe.extend(t,M.prototype,e),qe.extend(t,e),t.create=function(n){return Ie(hr(r,n))},t}var m=Ie(pr);m.Axios=M;m.CanceledError=q;m.CancelToken=ur;m.isCancel=Be;m.VERSION=ge.version;m.toFormData=Oe;m.AxiosError=T;m.Cancel=m.CanceledError;m.all=function(e){return Promise.all(e)};m.spread=fr;m.isAxiosError=cr;z.exports=m;z.exports.default=m;var mr=z.exports;function ke(r){return new Promise((e,t)=>{var a,n;try{const i=new Blob([r.data]),s=window.URL.createObjectURL(i),u=document.createElement("a");u.href=s;const f=((n=(a=Me(r.headers,"Content-Disposition"))==null?void 0:a.split("filename="))==null?void 0:n[1])||"text.text";u.setAttribute("download",decodeURI(f)),document.body.appendChild(u),u.click(),e(!0)}catch(i){t(i)}})}const vr=r=>(console.log("response.data.type:",r.data.type),new Promise(async(e,t)=>{var n;if(((n=r.data)==null?void 0:n.type)!=="blob"){try{await ke(r)?await e(r.data):await t("\u4E0B\u8F7D\u6587\u4EF6\u65F6\u53D1\u751F\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u60A8\u7684\u6D4F\u89C8\u5668")}catch(i){t(i)}return}const a=new FileReader;a.onload=async function(){var i;try{console.log("result:",this.result);const s=JSON.parse(this.result);(s==null?void 0:s.code)!==200&&(S.error((i=s==null?void 0:s.message)!=null?i:"\u8BF7\u6C42\u5931\u8D25"),t(s))}catch{try{await ke(r),await e(r.data)}catch(u){t(u)}}},a.readAsText(r.data)})),Me=(r,e)=>{const t=Object.keys(r);let a="null";return t.find(n=>{n.toLowerCase()===e.toLowerCase()&&(a=r[n])}),a};let H=null,J=0;const Er=()=>{J++,J==1&&(H=S.loading({content:"\u6B63\u5728\u52AA\u529B\u52A0\u8F7D\u4E2D...."}))},He=()=>{J--,J===0&&(H==null||H())},yr=r=>{const e=mr.create(_({timeout:1e3,withCredentials:!0},r));return e.interceptors.request.use(function(t){const{loading:a=!0}=t;return a&&Er(),t},function(t){return Promise.reject(t)}),e.interceptors.response.use(function(t){const{code:a,data:n,message:i}=t.data;He();const s=Me(t.headers,"Content-Disposition");if(s&&s.includes("attachment"))return vr(t);if(a===200)return _({status:!0},n);if(a!==401)return ce.error({title:a,content:i}),Promise.reject(_({status:!1},n))},function(t){var n,i;const{loading:a=!0}=t.config;return a&&He(),t.response&&t.response.status===401,ce.error({content:((i=(n=t==null?void 0:t.response)==null?void 0:n.data)==null?void 0:i.message)||"\u670D\u52A1\u7AEF\u5F02\u5E38"}),Promise.reject(t)}),e},Je=yr({});async function wr(r){return Je.get("/api/data",_({},r))}async function Rr(){return await Je.get("/api/download/a")}const xr=()=>{const r=async()=>{try{const t=await wr();await S.success("\u83B7\u53D6\u6570\u636E\u6210\u529F")}catch{S.error("\u83B7\u53D6\u6570\u636E\u5931\u8D25")}},e=async()=>{try{const t=await Rr();S.success("\u4E0B\u8F7D\u6210\u529F")}catch{S.error("\u4E0B\u8F7D\u5931\u8D25")}};return g.createElement("div",null,g.createElement("h1",null,"\u6D4B\u8BD5\u8BF7\u6C42"),g.createElement(Ke,null,g.createElement(de,{onClick:r},"\u53D1\u9001\u8BF7\u6C42"),g.createElement(de,{onClick:e},"\u4E0B\u8F7D\u6587\u4EF6")))};export{xr as default};
