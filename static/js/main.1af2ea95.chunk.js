(this.webpackJsonpopenlayers=this.webpackJsonpopenlayers||[]).push([[0],{136:function(e,t,n){},138:function(e,t,n){},141:function(e,t,n){},142:function(e,t,n){"use strict";n.r(t);var a=n(37),r=n.n(a),c=n(105),i=n.n(c),s=(n(136),n(64)),o=n.n(s),u=n(79),d=n(114),l=n(100),m=n(145),j=n(113),p=n(152),f=n(3),v=n(151),b=n(102),O=n(84),h=n(146),w=n(148),y=n(83),x=n(111),_=n(110),g=n(112),S=n(150),k=n(147),E=n(68),L=n(57),N=function(e){return(new k.a).writeGetFeature({featureNS:"https://gsavalik.envir.ee/geoserver/maaamet/ows?",srsName:"EPSG:3301",featurePrefix:"maaamet",propertyNames:["geom","l_aadress","pind_m2","ay_nimi"],featureTypes:["ky_kehtiv"],outputFormat:"application/json",filter:Object(E.d)(Object(E.c)("geom",new L.a(e)),Object(E.e)("geom",new L.a(e)))})},P=function(){var e=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://gsavalik.envir.ee/geoserver/maaamet/ows",{method:"POST",body:(new XMLSerializer).serializeToString(N(t))});case 3:return n=e.sent,e.abrupt("return",n.json());case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),A=(n(138),n(18)),F=function(e){var t=e.data;return Object(A.jsxs)("div",{id:"popup",children:[Object(A.jsxs)("div",{className:"address-field",children:[Object(A.jsx)("div",{className:"address-name",children:(null===t||void 0===t?void 0:t.l_aadress)&&"Aadress:"}),Object(A.jsxs)("div",{className:"address-value",children:[Object(A.jsx)("div",{children:null===t||void 0===t?void 0:t.l_aadress}),Object(A.jsx)("div",{children:null===t||void 0===t?void 0:t.ay_nimi})]})]}),Object(A.jsxs)("div",{className:"size-field",children:[Object(A.jsx)("div",{className:"size-name",children:(null===t||void 0===t?void 0:t.pind_m2)&&"Pindala:"}),Object(A.jsx)("div",{className:"size-value",children:(null===t||void 0===t?void 0:t.pind_m2)&&"".concat(null===t||void 0===t?void 0:t.pind_m2," m2")})]})]})},T=function(e){var t=e.mapElement,n=e.mapClick;return Object(A.jsx)("div",{ref:t,id:"map",onClick:n})},z=(n(140),n(141),function(){var e,t={l_aadress:"",ay_nimi:"",pind_m2:""},n=Object(a.useState)(new m.a({})),r=Object(l.a)(n,1)[0],c=Object(a.useState)([]),i=Object(l.a)(c,2),s=i[0],k=i[1],E=Object(a.useState)(t||void 0),L=Object(l.a)(E,2),N=L[0],z=L[1],C=Object(a.useRef)(null),G=Object(f.j)("EPSG:3301"),I=Object(a.useMemo)((function(){return new x.a}),[]),M=Object(a.useMemo)((function(){return new h.a({source:I,style:new b.b({stroke:new O.a({color:"rgba(0, 0, 255, 1.0)",width:2})}),zIndex:1})}),[I]),R=new j.a({center:[55e4,652e4],projection:G,zoom:9,minZoom:9}),V=new w.a({source:new _.a({projection:"EPSG:3301",url:"https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{-y}.jpg&ASUTUS=MAAAMET&KESKKOND=LIVE&IS=XGIS",tileGrid:new y.a({extent:[40500,5993e3,1064500,7017e3],minZoom:3,resolutions:[4e3,2e3,1e3,500,250,125,62.5,31.25,15.625,7.8125,3.90625,1.953125,.9765625,.48828125]})})}),B=new S.a({source:new g.a({url:"http://kaart.maaamet.ee/wms/alus?",params:{LAYERS:"MA-ALUS",VERSION:"1.1.1"}})}),K=function(e){var t=new p.a({element:document.getElementById("popup")||void 0});r.addOverlay(t),e&&t.setPosition(e)},U=function(e){Object(d.a)(r.getLayers().getArray()).forEach((function(e){"VectorLayer"!==e.constructor.name&&r.removeLayer(e)})),r.addLayer(e)};e=function(){return r.setTarget(C.current||""),r.addLayer(V),r.setView(R),function(){return r.setTarget("")}},Object(a.useEffect)(e,[]),Object(a.useEffect)((function(){r.on("click",function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k(t.coordinate),r.removeLayer(M),I.clear();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[r,k,M,I]);var D=function(){var e=Object(u.a)(o.a.mark((function e(){var n,a,c,i,u,d;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(s);case 2:n=e.sent,(a=(new v.a).readFeatures(n)).length?(c=n.features[0].properties,i=c.l_aadress,u=c.pind_m2,d=c.ay_nimi,z({l_aadress:i,pind_m2:u,ay_nimi:d}),I.addFeatures(a),r.addLayer(M),K(s)):(z(t),K());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsxs)("div",{className:"button-overlay",children:[Object(A.jsx)("button",{onClick:function(){return U(B)},children:"image layer"}),Object(A.jsx)("button",{onClick:function(){return U(V)},children:"tile layer"})]}),Object(A.jsx)(F,{data:N}),Object(A.jsx)(T,{mapElement:C,mapClick:function(){return D()}})]})}),C=n(103),G=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,153)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))},I=n(109);C.a.defs("EPSG:3301","+proj=lcc+lat_1=59.33333333333334+lat_2=58+lat_0=57.51755393055556+lon_0=24+x_0=500000+y_0=6375000+ellps=GRS80+towgs84=0,0,0,0,0,0,0+units=m+no_defs"),Object(I.a)(C.a),i.a.render(Object(A.jsx)(r.a.StrictMode,{children:Object(A.jsx)(z,{})}),document.getElementById("root")),G()}},[[142,1,2]]]);
//# sourceMappingURL=main.1af2ea95.chunk.js.map