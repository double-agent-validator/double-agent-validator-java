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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
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
var core_1 = __webpack_require__(0);
var ReplaySubject_1 = __webpack_require__(22);
/**
 *
 *
 * @export
 * @class DoubleAgentValidator
 */
var DoubleAgentValidator = (function () {
    /**
     * Creates an instance of DoubleAgentValidator.
     *
     *
     * @memberOf DoubleAgentValidator
     */
    function DoubleAgentValidator() {
        /**
         *
         *
         * @private
         * @type {ValidationResult}
         * @memberOf DoubleAgentValidator
         */
        this.noErrorResult = { hasErrors: false, errors: null };
        this.isReady = new ReplaySubject_1.ReplaySubject(1);
    }
    DoubleAgentValidator.prototype._notifyReady = function () {
        this.isReady.next(null);
    };
    Object.defineProperty(DoubleAgentValidator.prototype, "ajv", {
        /**
         *
         *
         * @readonly
         * @type {ajvNsAndConstructor.Ajv}
         * @memberOf DoubleAgentValidator
         */
        get: function () {
            return this.scriptContext['ajv'];
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @param {string} schemaName
     * @param {*} data
     * @returns {ValidationResult}
     *
     * @memberOf DoubleAgentValidator
     */
    DoubleAgentValidator.prototype.validate = function (schemaName, data) {
        var result = this.scriptContext['DoubleAgent']['JsonSchemaValidator'].validate(schemaName, data);
        return result;
    };
    DoubleAgentValidator.prototype.getSchema = function (schemaName) {
        return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getSchemaObject(schemaName);
    };
    /**
     *
     *
     * @param {JsonSchema} schema
     * @returns {string[]}
     *
     * @memberOf DoubleAgentValidator
     */
    DoubleAgentValidator.prototype.getKeywords = function (schema) {
        return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getKeywords(schema);
    };
    DoubleAgentValidator.prototype.getFormats = function () {
        return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getFormats();
    };
    Object.defineProperty(DoubleAgentValidator.prototype, "schemasNames", {
        /**
        *
        *
        * @readonly
        * @type {string[]}
        * @memberOf DoubleAgentValidator
        */
        get: function () {
            return this.scriptContext['DoubleAgent']['JsonSchemaValidator'].getSchemas();
        },
        enumerable: true,
        configurable: true
    });
    return DoubleAgentValidator;
}());
DoubleAgentValidator = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], DoubleAgentValidator);
exports.DoubleAgentValidator = DoubleAgentValidator;


/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";
var RemoteLoader = (function () {
    function RemoteLoader() {
    }
    RemoteLoader.prototype.getScript = function (url) {
        return new Promise(function (resolve, reject) {
            reject("You should provide a custom remote loader either using NodeRemoteLoader,\n          the Angular2 Remote Loader or another extension that yourself wants to provide.");
        });
    };
    return RemoteLoader;
}());
exports.RemoteLoader = RemoteLoader;


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("@angular/forms");

/***/ },
/* 4 */
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
var validator_service_1 = __webpack_require__(1);
var definitions_loader_service_1 = __webpack_require__(6);
var core_1 = __webpack_require__(0);
var validator_module_1 = __webpack_require__(5);
var remote_loader_1 = __webpack_require__(2);
/**
 *
 * This classs provide a facility to load json schema definitions into a DoubleAgentValidator instance and provide it
 * to Angular Dependency Injection
 * @export
 * @class DoubleAgentValidatorNg2Factory
 */
var DoubleAgentValidatorNg2Factory = (function () {
    /**
     * Creates an instance of DoubleAgentValidatorNg2Factory.
     *
     * @param {DoubleAgentValidator} doubleAgentValidator
     * @param {remoteLoader} the remoteLoader which will be used to load the validation scripts
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    function DoubleAgentValidatorNg2Factory(doubleAgentValidator, remoteLoader) {
        this.doubleAgentValidator = doubleAgentValidator;
        this.remoteLoader = remoteLoader;
    }
    /**
     * This static function is utilized as a provider Factory to builds the DoubleAgentValidator
     * instance filled with json schemas from an given url into the Angular2  dependency injection
     *
     * @static
     * @param {Injector} injector
     * @param {DoubleAgentValidatorNg2Factory} factory
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    DoubleAgentValidatorNg2Factory.factoryFn = function (injector, factory) {
        // return (): Promise<void> => {
        var url = injector.get(validator_module_1.DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
        return new Promise(function (resolve, reject) {
            var errors = null;
            if (url == null) {
                errors = 'DoubleAgentValidator Module needs an url provided through the DOUBLE_AGENT_VALIDATOR_SCHEMA_URL token';
            }
            if (errors) {
                reject(errors);
            }
            factory.load(url).then(function () { return resolve(); }).catch(function () { return reject(); });
        });
        // }
    };
    /**
     * Loads a script from a url, parses it and load into the ajv object.
     * At this moment is using a iframe to isolate the parse/evaluate of the code.
     * Maybe it would useful have a strategy loading using web worker
     * @param {string} url
     * @returns {Promise<void>}
     *
     * @memberOf DoubleAgentValidatorNg2Factory
     */
    DoubleAgentValidatorNg2Factory.prototype.load = function (url) {
        var _this = this;
        var validationsLoader = new definitions_loader_service_1.ValidatorDefinitionsLoader(this.remoteLoader);
        var iframe = document.createElement('iframe');
        iframe.id = 'DoubleAgentValidator';
        iframe.border = '0';
        iframe.src = 'about:blank';
        iframe.style.background = 'transparent';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.sandbox = 'allow-scripts allow-same-origin allow-modals';
        document.body.appendChild(iframe);
        var window = iframe.contentWindow;
        return new Promise(function (resolve, reject) {
            validationsLoader.load(window, url).then(function () {
                _this.doubleAgentValidator['scriptContext'] = window;
                window['DoubleAgentValidator'] = _this.doubleAgentValidator;
                _this.doubleAgentValidator['_notifyReady']();
                resolve(null);
            }, function (e) {
                reject('Could not create the DoubleAgentValidator instance: ' + e);
            });
        });
    };
    return DoubleAgentValidatorNg2Factory;
}());
DoubleAgentValidatorNg2Factory = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [validator_service_1.DoubleAgentValidator,
        remote_loader_1.RemoteLoader])
], DoubleAgentValidatorNg2Factory);
exports.DoubleAgentValidatorNg2Factory = DoubleAgentValidatorNg2Factory;


/***/ },
/* 5 */
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
var ng2_factory_service_1 = __webpack_require__(4);
var form_1 = __webpack_require__(7);
var remote_loader_1 = __webpack_require__(2);
var angular2_remote_loader_1 = __webpack_require__(12);
var value_verifier_service_1 = __webpack_require__(8);
var input_mask_directive_1 = __webpack_require__(10);
var input_html5_attributes_directive_1 = __webpack_require__(9);
exports.DOUBLE_AGENT_VALIDATOR_SCHEMA_URL = new core_1.OpaqueToken('DoubleAgentValidator.SCHEMA_URL');
exports.DOUBLE_AGENT_VALIDATOR_SCHEMA_WITH_DEPENDENCIES = new core_1.OpaqueToken('DoubleAgentValidator.SCHEMA_WITH_DEPENDENCIES');
var DoubleAgentValidatorModule = (function () {
    function DoubleAgentValidatorModule() {
    }
    return DoubleAgentValidatorModule;
}());
DoubleAgentValidatorModule = __decorate([
    core_1.NgModule({
        declarations: [
            input_mask_directive_1.InputMaskDirective,
            input_html5_attributes_directive_1.InputHtml5AttributesDirective
        ],
        providers: [
            validator_service_1.DoubleAgentValidator,
            ng2_factory_service_1.DoubleAgentValidatorNg2Factory,
            form_1.DoubleAgentFormGroupBuilder,
            value_verifier_service_1.DoubleAgentValueVerifier,
            form_1.DoubleAgentFormControlValidatorBuilder,
            {
                provide: remote_loader_1.RemoteLoader,
                useClass: angular2_remote_loader_1.Angular2RemoteLoader
            },
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: function (injector, doubleAgentValidatorNg2Factory, doubleAgentValidator) { return function () { return ng2_factory_service_1.DoubleAgentValidatorNg2Factory.factoryFn(injector, doubleAgentValidatorNg2Factory); }; },
                deps: [
                    core_1.Injector,
                    ng2_factory_service_1.DoubleAgentValidatorNg2Factory,
                    validator_service_1.DoubleAgentValidator
                ],
                multi: true
            }
        ],
        exports: [
            input_mask_directive_1.InputMaskDirective,
            input_html5_attributes_directive_1.InputHtml5AttributesDirective
        ]
    }),
    __metadata("design:paramtypes", [])
], DoubleAgentValidatorModule);
exports.DoubleAgentValidatorModule = DoubleAgentValidatorModule;


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
var remote_loader_1 = __webpack_require__(2);
/**
 *
 * This class loads a script from an url, parses it and fill an ajv instance with theirs definitions
 * @export
 * @class ValidatorDefinitionsLoader
 */
var ValidatorDefinitionsLoader = (function () {
    /**
     * Creates an instance of ValidatorDefinitionsLoader.
     *
     * @param {RemoteLoader} remoteLoader
     *
     * @memberOf ValidatorDefinitionsLoader
     */
    function ValidatorDefinitionsLoader(remoteLoader) {
        this.remoteLoader = remoteLoader;
    }
    Object.defineProperty(ValidatorDefinitionsLoader.prototype, "validatorExecutionContext", {
        /**
         *
         *
         * @readonly
         * @type {ValidatorExecutionContext}
         * @memberOf ValidatorDefinitionsLoader
         */
        get: function () {
            return this._window;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @param {Window} window
     * @param {string} url
     * @returns {Promise<ajvNsAndConstructor.Ajv>}
     *
     * @memberOf ValidatorDefinitionsLoader
     */
    ValidatorDefinitionsLoader.prototype.load = function (window, url) {
        var _this = this;
        return this.remoteLoader.getScript(url).then(function (scriptContent) {
            return _this.loadScript(window, scriptContent);
        });
    };
    ValidatorDefinitionsLoader.prototype.loadScript = function (window, script) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                // handler to check any error on script evalution
                window['DoubleAgentValidatorErrorHandler'] = function (e) {
                    reject(e);
                };
                window.document.write("\n          <script>\n            try {\n              " + script + "\n            } catch(e) {\n              DoubleAgentValidatorErrorHandler(e);\n            }\n          </script>\n        ");
                _this._window = window;
                resolve(null);
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
    __metadata("design:paramtypes", [remote_loader_1.RemoteLoader])
], ValidatorDefinitionsLoader);
exports.ValidatorDefinitionsLoader = ValidatorDefinitionsLoader;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(11));
__export(__webpack_require__(18));


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
var validator_service_1 = __webpack_require__(1);
var DoubleAgentValueVerifier = (function () {
    function DoubleAgentValueVerifier(doubleAgentValidator) {
        this.doubleAgentValidator = doubleAgentValidator;
    }
    DoubleAgentValueVerifier.prototype.filter = function (formControlName, value) {
        var schemaName = formControlName.control.parent.parent['schemaName'];
        var propertyName = formControlName.name;
        var schema = this.doubleAgentValidator.getSchema(schemaName);
        var property = schema.properties[propertyName];
        if (property) {
            if (property['pattern'] || property['format']) {
                var formatName = property['format'];
                var pattern = null;
                if (formatName) {
                    pattern = this.doubleAgentValidator.getFormats[formatName];
                }
                else {
                    pattern = property['pattern'];
                }
                if (pattern.test(value)) {
                    return value;
                }
                else {
                    return null;
                }
            }
            return value;
        }
    };
    return DoubleAgentValueVerifier;
}());
DoubleAgentValueVerifier = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [validator_service_1.DoubleAgentValidator])
], DoubleAgentValueVerifier);
exports.DoubleAgentValueVerifier = DoubleAgentValueVerifier;


/***/ },
/* 9 */
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
var forms_1 = __webpack_require__(3);
/**
 * The FormControls created with the DoubleAgentValidatorFormBuilder
 * will have properties defined in the keyworkd maxLength or ui.maxLength
 * or minLength or ui.minLength reflected to the input field associated to the formControlName
 *
 * @export
 * @class InputHtml5AttributesDirective
 */
var InputHtml5AttributesDirective = (function () {
    function InputHtml5AttributesDirective(renderer, formControlName, elementRef) {
        this.renderer = renderer;
        this.formControlName = formControlName;
        this.elementRef = elementRef;
    }
    InputHtml5AttributesDirective.prototype.findInputElement = function () {
        if (this.elementRef.nativeElement instanceof HTMLInputElement) {
            return this.elementRef.nativeElement;
        }
        else {
            var rootElement = this.elementRef.nativeElement;
            var elementChildren = Array.from(rootElement.children);
            for (var _i = 0, elementChildren_1 = elementChildren; _i < elementChildren_1.length; _i++) {
                var el = elementChildren_1[_i];
                if (el instanceof HTMLInputElement) {
                    return el;
                }
            }
            return null;
        }
    };
    InputHtml5AttributesDirective.prototype.ngOnInit = function () {
        this.controlJsonProperty = this.formControlName.control.jsonSchemaProperty;
        if (!this.controlJsonProperty) {
            return;
        } // return if does not have jsonSchemaProperty defined
        var element = this.findInputElement();
        if (!element) {
            return;
        } // return if the element is not a input
        if (this.controlJsonProperty['maxLength']) {
            this.renderer.setElementAttribute(element, 'maxlength', this.controlJsonProperty['maxLength']);
        }
        if (this.controlJsonProperty['ui'] && this.controlJsonProperty['ui']['maxLength']) {
            this.renderer.setElementAttribute(element, 'maxlength', this.controlJsonProperty['ui']['maxLength']);
        }
        if (this.controlJsonProperty['minLength']) {
            this.renderer.setElementAttribute(element, 'minlength', this.controlJsonProperty['minLength']);
        }
        if (this.controlJsonProperty['ui'] && this.controlJsonProperty['ui']['minLength']) {
            this.renderer.setElementAttribute(element, 'minlength', this.controlJsonProperty['ui']['minLength']);
        }
    };
    return InputHtml5AttributesDirective;
}());
InputHtml5AttributesDirective = __decorate([
    core_1.Directive({
        selector: '[formControlName]'
    }),
    __metadata("design:paramtypes", [core_1.Renderer,
        forms_1.FormControlName,
        core_1.ElementRef])
], InputHtml5AttributesDirective);
exports.InputHtml5AttributesDirective = InputHtml5AttributesDirective;


/***/ },
/* 10 */
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
var forms_1 = __webpack_require__(3);
var VMasker = __webpack_require__(24);
var validator_service_1 = __webpack_require__(1);
/**
 * Applies a mask to user input following the configuration
 * passed-in the json-schema which originated the formControlName (if it is the case)
 *
 * @export
 * @class InputMaskDirective
 * @implements {OnInit}
 */
var InputMaskDirective = (function () {
    function InputMaskDirective(renderer, elementRef, doubleAgentValidator, injector) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.doubleAgentValidator = doubleAgentValidator;
        this.injector = injector;
    }
    InputMaskDirective.prototype.formControlName = function () {
        return this.injector.get(forms_1.FormControlName);
    };
    InputMaskDirective.prototype.getUiMask = function (value) {
        var jsonProperty = this.formControlName().control.jsonSchemaProperty;
        if (jsonProperty && jsonProperty['ui']) {
            if (Array.isArray(jsonProperty['ui']['mask'])) {
                var masksArray = jsonProperty['ui']['mask'];
                var mask = masksArray.find(function (item) { return new RegExp(item['matcher']).test(value); });
                return mask ? mask['value'] : null;
            }
            else {
                return jsonProperty['ui'] ? jsonProperty['ui']['mask'] : null;
            }
        }
        return null;
    };
    InputMaskDirective.prototype.onInput = function (value) {
        // Write back to model
        if (value) {
            var mask = this.getUiMask(value);
            // write formatted to to control view
            if (mask) {
                value = VMasker.toPattern(value, mask);
            }
            this.writeValue(value);
        }
    };
    InputMaskDirective.prototype.writeValue = function (value) {
        this.formControlName().control.setValue(value);
    };
    return InputMaskDirective;
}());
__decorate([
    core_1.HostListener('input', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputMaskDirective.prototype, "onInput", null);
InputMaskDirective = __decorate([
    core_1.Directive({
        selector: '[formControlName]'
    }),
    __metadata("design:paramtypes", [core_1.Renderer,
        core_1.ElementRef,
        validator_service_1.DoubleAgentValidator,
        core_1.Injector])
], InputMaskDirective);
exports.InputMaskDirective = InputMaskDirective;


/***/ },
/* 11 */
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
var forms_1 = __webpack_require__(3);
var validator_service_1 = __webpack_require__(1);
var _ = __webpack_require__(13);
var DoubleAgentFormControlValidatorBuilder = (function () {
    function DoubleAgentFormControlValidatorBuilder(doubleAgentValidator) {
        this.doubleAgentValidator = doubleAgentValidator;
    }
    /**
     * Returns the validator representing some attribute in the schema
     * which will be used to Angular 2 validates the user input
     *
     * @param {string} schemaName
     * @param {string} fieldName
     * @returns {ValidatorFn}
     *
     * @memberOf FormControlValidatorBuilder
     */
    DoubleAgentFormControlValidatorBuilder.prototype.build = function (schema, property) {
        var validators = [];
        if (schema.required && schema.required.indexOf(property) >= 0) {
            validators.push(forms_1.Validators.required);
        }
        validators.push(this.buildAngularValidator(schema.id, property));
        return forms_1.Validators.compose(validators);
    };
    /**
     * This creates a Angular validator corresponding a json schema and optionally
     * only for a given property
     *
     * @param {string} schema
     * @param {string} property
     * @returns {ValidatorFn}
     *
     * @memberOf ValidacaoService
     */
    DoubleAgentFormControlValidatorBuilder.prototype.buildAngularValidator = function (schemaName, propertyOrFormData) {
        var _this = this;
        return function (control) {
            var validationResult = {
                jsonSchema: null
            };
            // builds the data which will be validated
            var data = {};
            if (_.isString(propertyOrFormData)) {
                data[propertyOrFormData] = control.value;
            }
            else {
                data = propertyOrFormData;
            }
            // runs the validation
            var result = _this.doubleAgentValidator.validate(schemaName, data);
            if (result.hasErrors) {
                // if a specific property was provided, then only returns error refering that property
                if (_.isString(propertyOrFormData)) {
                    var errorsOfProperty = result.errors.filter(function (error) {
                        return error.dataPath.match("." + propertyOrFormData);
                    });
                    if (errorsOfProperty.length > 0) {
                        validationResult.jsonSchema = {
                            errors: errorsOfProperty
                        };
                        return validationResult;
                    }
                }
                else {
                    // if no specific property was passed, so return all errors found
                    validationResult.jsonSchema = {
                        errors: result.errors
                    };
                    return validationResult;
                }
            }
            else {
                // retorna null no caso de não ter erros de validacao
                return null;
            }
        };
    };
    return DoubleAgentFormControlValidatorBuilder;
}());
DoubleAgentFormControlValidatorBuilder = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [validator_service_1.DoubleAgentValidator])
], DoubleAgentFormControlValidatorBuilder);
exports.DoubleAgentFormControlValidatorBuilder = DoubleAgentFormControlValidatorBuilder;


/***/ },
/* 12 */
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
var http_1 = __webpack_require__(21);
__webpack_require__(23);
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
/* 13 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(10));
__export(__webpack_require__(9));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(2));


/***/ },
/* 16 */
/***/ function(module, exports) {

if (!Array.isArray) {
    Array['isArray'] = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            'use strict';
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length || 0;
            var thisArg = arguments[1];
            var value;
            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        }
    });
}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(20));
__export(__webpack_require__(12));
__export(__webpack_require__(19));


/***/ },
/* 18 */
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
var forms_1 = __webpack_require__(3);
var validator_service_1 = __webpack_require__(1);
var _ = __webpack_require__(13);
var form_control_validator_builder_service_1 = __webpack_require__(11);
/**
 * This class allows creates a formGroup which contains all the fields represented in an given schema
 * each one containing it's own angular validators
 * @export
 * @class DoubleAgentFormGroupBuilder
 */
var DoubleAgentFormGroupBuilder = (function () {
    /**
     * Creates an instance of FormGroupBuilder.
     *
     * @param {DoubleAgentValidator} doubleAgentValidator
     * @param {FormBuilder} formBuilder
     *
     * @memberOf FormGroupBuilder
     */
    function DoubleAgentFormGroupBuilder(doubleAgentValidator, formControlValidatorBuilder, formBuilder) {
        this.doubleAgentValidator = doubleAgentValidator;
        this.formControlValidatorBuilder = formControlValidatorBuilder;
        this.formBuilder = formBuilder;
    }
    /**
     * Builds a FormGroup containing all the attributes defined in the jsonSchema
     *
     * @param {string} schemaName
     * @returns {FormGroup}
     *
     * @memberOf FormGroupBuilder
     */
    DoubleAgentFormGroupBuilder.prototype.build = function (schemaName) {
        var _this = this;
        // TODO validar se o esquema existe e retornar erro apropriado
        var jsonSchema = this.doubleAgentValidator.getSchema(schemaName);
        if (!jsonSchema) {
            throw Error("Schema " + schemaName + " not found!");
        }
        var formGroup;
        var formGroupConfig = {};
        // percorre os atributos definidos no jsonSchema, adicionando um FormControl com os respectivos
        // validadores para cada campo no objeto formGroupConfig
        _.each(jsonSchema.properties, function (property, propertyName) {
            if (!_.has('$ref', property) || property['type'] === 'object') {
                // TODO get state value from property default
                var formControl = new forms_1.FormControl('', _this.formControlValidatorBuilder.build(jsonSchema, propertyName));
                formControl.jsonSchemaProperty = jsonSchema.properties[propertyName];
                formGroupConfig[propertyName] = formControl;
            }
        });
        // cria uma instância do FormGroup a partir da configuração construída
        formGroup = this.formBuilder.group(formGroupConfig);
        // construir validador do FormGroup (keywords do objeto)
        this.addKeywordsValidator(jsonSchema, formGroup);
        formGroup.jsonSchema = jsonSchema;
        // retorna o Form Group
        return formGroup;
    };
    DoubleAgentFormGroupBuilder.prototype.addKeywordsValidator = function (schema, formGroup) {
        var keywords = this.doubleAgentValidator.getKeywords(schema);
        var validator = this.buildAngularFormGroupValidator(schema.id, keywords, formGroup);
        formGroup.setValidators([validator]);
    };
    DoubleAgentFormGroupBuilder.prototype.buildAngularFormGroupValidator = function (schemaName, keywords, formGroup) {
        var _this = this;
        return function (control) {
            var validationResult = {
                jsonSchema: null
            };
            var data = formGroup.value;
            // runs the validation
            var result = _this.doubleAgentValidator.validate(schemaName, data);
            if (result.hasErrors) {
                var errorsOfKeyword = result.errors.filter(function (error) {
                    return _.includes(keywords, error.keyword);
                });
                if (errorsOfKeyword.length > 0) {
                    validationResult.jsonSchema = {
                        errors: errorsOfKeyword
                    };
                    return validationResult;
                }
            }
            // retorna null no caso de não ter erros de validacao
            return null;
        };
    };
    return DoubleAgentFormGroupBuilder;
}());
DoubleAgentFormGroupBuilder = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [validator_service_1.DoubleAgentValidator,
        form_control_validator_builder_service_1.DoubleAgentFormControlValidatorBuilder,
        forms_1.FormBuilder])
], DoubleAgentFormGroupBuilder);
exports.DoubleAgentFormGroupBuilder = DoubleAgentFormGroupBuilder;


/***/ },
/* 19 */
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
var validator_service_1 = __webpack_require__(1);
var ng2_factory_service_1 = __webpack_require__(4);
var validator_module_1 = __webpack_require__(5);
/**
 * To be used in tests for Angular applications
 * We can rely on mechanisms like webpack raw-loader to read the script from the disk and pass it directly
 * through the OpaqueToken DOUBLE_AGENT_VALIDATOR_SCHEMA_URL. This way we can run tests without the need of an http request
 * @export
 * @class InTestRawLoader
 * @implements {RemoteLoader}
* */
var InTestRawLoader = (function () {
    function InTestRawLoader(doubleAgentScriptContent, doubleAgentValidator) {
        var daFactory = new ng2_factory_service_1.DoubleAgentValidatorNg2Factory(doubleAgentValidator, this);
        daFactory.load(doubleAgentScriptContent).then(function () { });
    }
    InTestRawLoader.prototype.getScript = function (doubleAgentRawContent) {
        return new Promise(function (resolve, reject) {
            resolve(doubleAgentRawContent);
        });
    };
    return InTestRawLoader;
}());
InTestRawLoader = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(validator_module_1.DOUBLE_AGENT_VALIDATOR_SCHEMA_URL)),
    __metadata("design:paramtypes", [String, validator_service_1.DoubleAgentValidator])
], InTestRawLoader);
exports.InTestRawLoader = InTestRawLoader;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/**
 *
 * This class allow get the script source on node environment
 */
var NodeRemoteLoader = (function () {
    function NodeRemoteLoader() {
        Promise.resolve().then((function (requireRuntime) {
            this._restler = requireRuntime('restler');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
    Object.defineProperty(NodeRemoteLoader.prototype, "restler", {
        get: function () {
            return this._restler;
        },
        enumerable: true,
        configurable: true
    });
    NodeRemoteLoader.prototype.getScript = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.restler.get(url).on('complete', function (data, response) {
                if (data instanceof Error) {
                    reject(data.message);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    return NodeRemoteLoader;
}());
exports.NodeRemoteLoader = NodeRemoteLoader;


/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("@angular/http");

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require("rxjs/ReplaySubject");

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = require("rxjs/add/operator/toPromise");

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("vanilla-masker");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__webpack_require__(16);
__export(__webpack_require__(1));
__export(__webpack_require__(6));
__export(__webpack_require__(5));
__export(__webpack_require__(7));
__export(__webpack_require__(15));
__export(__webpack_require__(8));
__export(__webpack_require__(17));
__export(__webpack_require__(4));
__export(__webpack_require__(14));


/***/ }
/******/ ])));
//# sourceMappingURL=double-agent-validator.js.map