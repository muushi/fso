(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),o=t.n(c),r=t(16),a=t.n(r),u=(t(22),t(17)),i=t(3),s=t(0),l=function(e){var n=e.value,t=e.onChange;return Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:n,onChange:t})]})},b=function(e){var n=e.message,t=e.errClass;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},j=function(e){var n=e.onSubmit,t=e.name,c=e.nameOnChange,o=e.number,r=e.numberOnChange;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:t,onChange:c}),"number: ",Object(s.jsx)("input",{value:o,onChange:r})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.persons,t=e.handleClick;return Object(s.jsx)("div",{children:n.map((function(e){return Object(s.jsxs)("p",{children:[e.name," ",e.number,Object(s.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))})},f=t(5),h=t.n(f),m="/api/persons",O=function(){return h.a.get(m).then((function(e){return e.data}))},v=function(e){return h.a.post(m,e).then((function(e){return e.data}))},g=function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},p=function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},x=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],r=Object(c.useState)([]),a=Object(i.a)(r,2),f=a[0],h=a[1],m=Object(c.useState)(""),x=Object(i.a)(m,2),C=x[0],w=x[1],S=Object(c.useState)(""),k=Object(i.a)(S,2),L=k[0],T=k[1],y=Object(c.useState)(""),F=Object(i.a)(y,2),D=F[0],I=F[1],P=Object(c.useState)(null),B=Object(i.a)(P,2),E=B[0],J=B[1],N=Object(c.useState)("error"),A=Object(i.a)(N,2),M=A[0],U=A[1],q=function(e){o(e),h(e.filter((function(e){return e.name.toLowerCase().includes(D.toLowerCase())})))};return Object(c.useEffect)((function(){O().then((function(e){return q(e)}))}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(b,{message:E,errClass:M}),Object(s.jsx)(l,{value:D,onChange:function(e){I(e.target.value),h(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),Object(s.jsx)("h2",{children:"add a new"}),Object(s.jsx)(j,{onSubmit:function(e){e.preventDefault();var n={name:C,number:L},c=t.find((function(e){return e.name===C}));c?window.confirm("".concat(C," is already added to phonebook, replace the old number with a new one?"))&&p(c.id,n).then((function(e){console.log(e),O().then((function(e){return q(e)})),J("Updated ".concat(n.name)),U("info"),setTimeout((function(){J(null)}),3e3)})).catch((function(e){J("Information of ".concat(n.name," has already been removed from server")),U("error"),setTimeout((function(){J(null)}),3e3)})):v(n).then((function(e){console.log(e);var c=[].concat(Object(u.a)(t),[n]);q(c),J("Added ".concat(n.name)),U("info"),setTimeout((function(){J(null)}),3e3)})).catch((function(e){J(e.response.data.error),U("error"),setTimeout((function(){J(null)}),3e3)}))},name:C,nameOnChange:function(e){w(e.target.value)},number:L,numberOnChange:function(e){T(e.target.value)}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(d,{persons:f,handleClick:function(e){window.confirm("Delete ".concat(e.name," ?"))&&g(e.id).then((function(e){return console.log(e)}));var n=t.filter((function(n){return n.id!==e.id}));q(n)}})]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,43)).then((function(n){var t=n.getCLS,c=n.getFID,o=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),c(e),o(e),r(e),a(e)}))};a.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root")),C()}},[[42,1,2]]]);
//# sourceMappingURL=main.83a95be5.chunk.js.map