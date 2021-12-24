"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9077:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "react-ga"
const external_react_ga_namespaceObject = require("react-ga");
var external_react_ga_default = /*#__PURE__*/__webpack_require__.n(external_react_ga_namespaceObject);
;// CONCATENATED MODULE: ./pages/_app.js




function CustomApp({ Component , pageProps  }) {
    (0,external_react_.useEffect)(()=>{
        external_react_ga_default().initialize('UA-83942647-1');
        external_react_ga_default().pageview(window.location.pathname + window.location.search);
    }, [
        pageProps
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(Component, {
        ...pageProps
    }));
}
/* harmony default export */ const _app = (CustomApp);


/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9077));
module.exports = __webpack_exports__;

})();