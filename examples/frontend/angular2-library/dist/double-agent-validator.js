(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("@angular/core");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var ajvNsAndConstructor = __webpack_require__(4);
var _ = __webpack_require__(5);
var DoubleAgentValidator = (function () {
    function DoubleAgentValidator(_ajv) {
        this._ajv = _ajv;
        this.noErrorResult = { hasErrors: false, errors: null };
    }
    Object.defineProperty(DoubleAgentValidator.prototype, "ajv", {
        get: function () {
            return this._ajv;
        },
        enumerable: true,
        configurable: true
    });
    DoubleAgentValidator.prototype.validate = function (schemaName, data) {
        var result = this.ajv.validate(schemaName, data);
        if (result) {
            return this.noErrorResult;
        }
        else {
            return {
                hasErrors: true,
                errors: this.ajv.errors
            };
        }
    };
    Object.defineProperty(DoubleAgentValidator.prototype, "schemas", {
        get: function () {
            return _.map(this.ajv['_schemas'], function (schema) { return schema['id']; });
        },
        enumerable: true,
        configurable: true
    });
    return DoubleAgentValidator;
}());
DoubleAgentValidator = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [Object])
], DoubleAgentValidator);
exports.DoubleAgentValidator = DoubleAgentValidator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var _ = __webpack_require__(5);
var ajvNsAndConstructor = __webpack_require__(4);
var ValidatorDefinitionsLoader = (function () {
    function ValidatorDefinitionsLoader(remoteLoader) {
        this.remoteLoader = remoteLoader;
        this._ajv = new ajvNsAndConstructor({ allErrors: true, v5: true });
    }
    Object.defineProperty(ValidatorDefinitionsLoader.prototype, "ajv", {
        get: function () {
            return this._ajv;
        },
        enumerable: true,
        configurable: true
    });
    ValidatorDefinitionsLoader.prototype.load = function (window, url, namespaces) {
        var _this = this;
        return this.remoteLoader.getScript(url).then(function (scriptContent) {
            return _this.loadScript(window, scriptContent, namespaces);
        });
    };
    ValidatorDefinitionsLoader.prototype.loadScript = function (window, script, schemas) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var loadSchemaCall = (schemas.length === 1)
                    ? "DoubleAgent.JsonSchemaValidator.load(" + schemas[0] + ", ajv);"
                    : "DoubleAgent.JsonSchemaValidator.loadMultiple([" + schemas.join(',') + "], ajv);";
                window['ajv'] = _this.ajv;
                window['_'] = _;
                window.document.write("\n          <script>\n              " + script + "\n              " + loadSchemaCall + ";\n          </script>\n        ");
                resolve(_this.ajv);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return ValidatorDefinitionsLoader;
}());
ValidatorDefinitionsLoader = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], ValidatorDefinitionsLoader);
exports.ValidatorDefinitionsLoader = ValidatorDefinitionsLoader;


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("@angular/http");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("ajv");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var validator_service_1 = __webpack_require__(1);
var ng2_factory_service_1 = __webpack_require__(7);
exports.DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new core_1.OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
exports.DOUBLE_AGENT_VALIDATOR_SCHEMA_NS = new core_1.OpaqueToken('DoubleAgentValidator.SCHEMA_NAMESPACES');
var DoubleAgentValidatorModule = (function () {
    function DoubleAgentValidatorModule() {
    }
    return DoubleAgentValidatorModule;
}());
DoubleAgentValidatorModule = __decorate([
    core_1.NgModule({
        providers: [
            validator_service_1.DoubleAgentValidator,
            ng2_factory_service_1.DoubleAgentValidatorNg2Factory,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: function (injector, factory) {
                    console.log('HERE', injector);
                    var url = injector.get(exports.DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
                    var namespaces = injector.get(exports.DOUBLE_AGENT_VALIDATOR_SCHEMA_NS);
                    return new Promise(function (resolve, reject) {
                        console.log('VALUES', url, namespaces);
                        var errors = null;
                        if (url == null) {
                            errors = 'DoubleAgentValidator Module needs an url provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_URL token';
                        }
                        if (namespaces == null) {
                            errors = (errors ? errors : '') + " DoubleAgentValidator Module needs the\n             namespaces provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_NS token";
                        }
                        if (errors) {
                            reject(errors);
                        }
                        return factory.load(url, namespaces);
                    });
                },
                deps: [
                    core_1.Injector,
                    ng2_factory_service_1.DoubleAgentValidatorNg2Factory,
                    validator_service_1.DoubleAgentValidator
                ]
            }
        ],
        exports: []
    }),
    __metadata("design:paramtypes", [])
], DoubleAgentValidatorModule);
exports.DoubleAgentValidatorModule = DoubleAgentValidatorModule;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = __webpack_require__(3);
var validator_service_1 = __webpack_require__(1);
var angular2_remote_loader_1 = __webpack_require__(8);
var definitions_loader_service_1 = __webpack_require__(2);
var core_1 = __webpack_require__(0);
/**
 *
 * This classs load the script with the schemas, formats and keywords from
 * a remote url, parses it in an isolated environment ('iframe') and
 * loads to the ajv object
 * @export
 * @class DoubleAgentValidatorNg2Factory
 */
var DoubleAgentValidatorNg2Factory = (function () {
    /**
     * Creates an instance of DoubleAgentValidatorNg2Factory.
     *
     * @param {Http} http
     * @param {DoubleAgentValidator} doubleAgentValidator
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    function DoubleAgentValidatorNg2Factory(http, doubleAgentValidator) {
        this.http = http;
        this.doubleAgentValidator = doubleAgentValidator;
    }
    /**
     * loads a script from a url, parses it and load into the ajv object
     *
     * @param {string} url
     * @param {string[]} namespaces
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    DoubleAgentValidatorNg2Factory.prototype.load = function (url, namespaces) {
        var _this = this;
        var remoteLoader = new angular2_remote_loader_1.Angular2RemoteLoader(this.http);
        var validationsLoader = new definitions_loader_service_1.ValidatorDefinitionsLoader(remoteLoader);
        var iframe = document.createElement('iframe');
        iframe.id = 'DoubleAgentValidator';
        iframe.border = '0';
        iframe.src = 'about:blank';
        iframe.style.background = 'transparent';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.sandbox = 'allow-scripts allow-same-origin';
        document.body.appendChild(iframe);
        var window = iframe.contentWindow;
        return new Promise(function (resolve, reject) {
            validationsLoader.load(window, url, namespaces).then(function (ajv) {
                _this.doubleAgentValidator['_ajv'] = ajv;
                window['DoubleAgentValidator'] = _this.doubleAgentValidator;
                resolve(null);
            }, function (e) {
                reject('coudl not create the DoubleAgentValidator instance: ' + e);
            });
        });
    };
    return DoubleAgentValidatorNg2Factory;
}());
DoubleAgentValidatorNg2Factory = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, validator_service_1.DoubleAgentValidator])
], DoubleAgentValidatorNg2Factory);
exports.DoubleAgentValidatorNg2Factory = DoubleAgentValidatorNg2Factory;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(3);
__webpack_require__(9);
var Angular2RemoteLoader = (function () {
    function Angular2RemoteLoader(http) {
        this.http = http;
    }
    Angular2RemoteLoader.prototype.getScript = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var observable = _this.http.get(url);
            observable.subscribe(function (response) {
                resolve(response.text());
            }, function (error) {
                reject(error);
            });
        });
    };
    return Angular2RemoteLoader;
}());
Angular2RemoteLoader = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Angular2RemoteLoader);
exports.Angular2RemoteLoader = Angular2RemoteLoader;


/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("rxjs/add/operator/toPromise");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1));
__export(__webpack_require__(2));
__export(__webpack_require__(6));


/***/ }
/******/ ])));
//# sourceMappingURL=double-agent-validator.js.map