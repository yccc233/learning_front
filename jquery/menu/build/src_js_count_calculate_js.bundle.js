/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmenu"] = self["webpackChunkmenu"] || []).push([["src_js_count_calculate_js"],{

/***/ "./src/js/count/calculate.js":
/*!***********************************!*\
  !*** ./src/js/count/calculate.js ***!
  \***********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {\n    function initCounter() {\n        $(\"#counter\").click(event => {\n            let text = $(\"#counter\").text();\n            let num = +text.slice(5);   //转为number类型\n            $(\"#counter\").text(`计数 = ${num+1}`)\n        })\n    }\n    \n    return {\n        initCounter: initCounter\n    }\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://menu/./src/js/count/calculate.js?");

/***/ })

}]);