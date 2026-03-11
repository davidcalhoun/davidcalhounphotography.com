module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[project]/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$ga__$5b$external$5d$__$28$react$2d$ga$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$react$2d$ga$29$__ = __turbopack_context__.i("[externals]/react-ga [external] (react-ga, cjs, [project]/node_modules/react-ga)");
;
;
;
;
function CustomApp({ Component, pageProps }) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$ga__$5b$external$5d$__$28$react$2d$ga$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$react$2d$ga$29$__["default"].initialize('UA-83942647-1');
        __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$ga__$5b$external$5d$__$28$react$2d$ga$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$react$2d$ga$29$__["default"].pageview(window.location.pathname + window.location.search);
    }, [
        pageProps
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
        ...pageProps
    }, void 0, false, {
        fileName: "[project]/pages/_app.js",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
const __TURBOPACK__default__export__ = CustomApp;
}),
"[externals]/react-ga [external] (react-ga, cjs, [project]/node_modules/react-ga)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-ga-f4084a8af88695ae", () => require("react-ga-f4084a8af88695ae"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__95cc6e54._.js.map