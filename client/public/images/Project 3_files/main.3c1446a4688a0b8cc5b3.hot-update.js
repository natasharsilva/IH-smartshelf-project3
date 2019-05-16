webpackHotUpdate("main",{

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/Home */ "./src/components/pages/Home.jsx");
/* harmony import */ var _pages_LibraryDetail_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/LibraryDetail.js */ "./src/components/pages/LibraryDetail.js");
/* harmony import */ var _pages_LibraryBooks_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/LibraryBooks.jsx */ "./src/components/pages/LibraryBooks.jsx");
/* harmony import */ var _pages_AddLibrary_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/AddLibrary.jsx */ "./src/components/pages/AddLibrary.jsx");
/* harmony import */ var _pages_AddBook_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/AddBook.jsx */ "./src/components/pages/AddBook.jsx");
/* harmony import */ var _pages_BookDetail__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/BookDetail */ "./src/components/pages/BookDetail.jsx");
/* harmony import */ var _NavBar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./NavBar */ "./src/components/NavBar.js");
/* harmony import */ var _pages_Login__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/Login */ "./src/components/pages/Login.jsx");
/* harmony import */ var _pages_Signup__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/Signup */ "./src/components/pages/Signup.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../api */ "./src/api.js");
/* harmony import */ var _pages_Profile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/Profile */ "./src/components/pages/Profile.jsx");





var _jsxFileName = "/home/gtcarmona/Desktop/project/IH-library-project3/client/src/components/App.jsx";














var App =
/*#__PURE__*/
function (_Component) {
  Object(_home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(App, _Component);

  function App() {
    Object(_home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, App);

    return Object(_home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(App).apply(this, arguments));
  }

  Object(_home_gtcarmona_Desktop_project_IH_library_project3_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(App, [{
    key: "handleLogoutClick",
    value: function handleLogoutClick(e) {
      _api__WEBPACK_IMPORTED_MODULE_16__["default"].logout();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "App",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_NavBar__WEBPACK_IMPORTED_MODULE_13__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Switch"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/",
        exact: true,
        component: _pages_Home__WEBPACK_IMPORTED_MODULE_7__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/profile",
        component: _pages_Profile__WEBPACK_IMPORTED_MODULE_17__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/libraries",
        component: _pages_AddLibrary_jsx__WEBPACK_IMPORTED_MODULE_10__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/:libraryId",
        component: _pages_LibraryDetail_js__WEBPACK_IMPORTED_MODULE_8__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/:libraryId/books",
        component: _pages_LibraryBooks_jsx__WEBPACK_IMPORTED_MODULE_9__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/add-library",
        component: _pages_AddLibrary_jsx__WEBPACK_IMPORTED_MODULE_10__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/add-book",
        component: _pages_AddBook_jsx__WEBPACK_IMPORTED_MODULE_11__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/books/:bookId",
        component: _pages_BookDetail__WEBPACK_IMPORTED_MODULE_12__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/signup",
        component: _pages_Signup__WEBPACK_IMPORTED_MODULE_15__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/login",
        component: _pages_Login__WEBPACK_IMPORTED_MODULE_14__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        render: function render() {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            },
            __self: this
          }, "404");
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      })));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);



/***/ })

})
//# sourceMappingURL=main.3c1446a4688a0b8cc5b3.hot-update.js.map