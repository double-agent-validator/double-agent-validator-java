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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
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
var ajvNsAndConstructor = __webpack_require__(8);
var _ = __webpack_require__(2);
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
     * @param {ajvNsAndConstructor.Ajv} _ajv
     *
     * @memberOf DoubleAgentValidator
     */
    function DoubleAgentValidator(_ajv) {
        this._ajv = _ajv;
        /**
         *
         *
         * @private
         * @type {ValidationResult}
         * @memberOf DoubleAgentValidator
         */
        this.noErrorResult = { hasErrors: false, errors: null };
    }
    Object.defineProperty(DoubleAgentValidator.prototype, "ajv", {
        /**
         *
         *
         * @readonly
         * @type {ajvNsAndConstructor.Ajv}
         * @memberOf DoubleAgentValidator
         */
        get: function () {
            return this._ajv;
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
    DoubleAgentValidator.prototype.getSchema = function (schemaName) {
        return this.ajv.getSchema(schemaName).schema;
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
        return _.keys(_.omit(schema, this.defaultKeywords));
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
            return _.map(this.ajv['_schemas'], function (schema) { return schema['id']; }).filter(function (schema) {
                return _.omit(['abc'], schema.id);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleAgentValidator.prototype, "defaultKeywords", {
        // private methods
        get: function () {
            return [
                'type', 'additionalProperties', 'patternProperties', 'maximum',
                'minimum', 'multipleOf', 'maxLength', 'minLength', 'pattern',
                'format', 'maxItems', 'minItems', 'uniqueItems', 'items', 'maxProperties',
                'minProperties', 'required', 'dependencies', 'properties', '$ref', 'enum',
                'not', 'anyOf', 'oneOf', 'allOf', 'additionalItems', '$schema', 'id', 'title',
                'description', 'default'
            ];
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
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 3 */
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
var _ = __webpack_require__(2);
var ajvNsAndConstructor = __webpack_require__(8);
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
        this._ajv = new ajvNsAndConstructor({ allErrors: true, v5: true });
    }
    Object.defineProperty(ValidatorDefinitionsLoader.prototype, "ajv", {
        /**
         *
         *
         * @readonly
         * @type {ajvNsAndConstructor.Ajv}
         * @memberOf ValidatorDefinitionsLoader
         */
        get: function () {
            return this._ajv;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @param {Window} window
     * @param {string} url
     * @param {string[]} namespaces
     * @returns {Promise<ajvNsAndConstructor.Ajv>}
     *
     * @memberOf ValidatorDefinitionsLoader
     */
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
                window.document.write("\n          <script>\n              " + script + "\n              " + loadSchemaCall + "\n          </script>\n        ");
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
var core_1 = __webpack_require__(0);
var validator_service_1 = __webpack_require__(1);
var ng2_factory_service_1 = __webpack_require__(11);
var form_1 = __webpack_require__(10);
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
            form_1.DoubleAgentFormGroupBuilder,
            form_1.DoubleAgentFormControlValidatorBuilder,
            {
                provide: core_1.APP_INITIALIZER,
                useFactory: ng2_factory_service_1.DoubleAgentValidatorNg2Factory.factoryFn,
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
var forms_1 = __webpack_require__(6);
var validator_service_1 = __webpack_require__(1);
var _ = __webpack_require__(2);
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
        console.log('SCHEMA and property', schema, property);
        if (schema.required && schema.required.indexOf(property) >= 0) {
            console.log('Required validator found', property);
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
            console.log('Validating data', data);
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
/* 6 */
/***/ function(module, exports) {

module.exports = require("@angular/forms");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("@angular/http");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("ajv");

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
var forms_1 = __webpack_require__(6);
var validator_service_1 = __webpack_require__(1);
var _ = __webpack_require__(2);
var form_control_validator_builder_service_1 = __webpack_require__(5);
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
        var formGroup;
        var formGroupConfig = {};
        // percorre os atributos definidos no jsonSchema, adicionando um FormControl com os respectivos
        // validadores para cada campo no objeto formGroupConfig
        _.each(jsonSchema.properties, function (attribute, attributeName) {
            // TODO get state value from property default
            formGroupConfig[attributeName] = new forms_1.FormControl('', _this.formControlValidatorBuilder.build(jsonSchema, attributeName));
        });
        console.log('formGroupConfig', formGroupConfig);
        // cria uma instância do FormGroup a partir da configuração construída
        formGroup = this.formBuilder.group(formGroupConfig);
        console.log('formGroup', formGroup);
        // construir validador do FormGroup (keywords do objeto)
        this.addKeywordsValidator(jsonSchema, formGroup);
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
            console.log('Validating data', data);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(5));
__export(__webpack_require__(9));


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
var http_1 = __webpack_require__(7);
var validator_service_1 = __webpack_require__(1);
var angular2_remote_loader_1 = __webpack_require__(12);
var definitions_loader_service_1 = __webpack_require__(3);
var core_1 = __webpack_require__(0);
var validator_module_1 = __webpack_require__(4);
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
        var url = injector.get(validator_module_1.DOUBLE_AGENT_VALIDATOR_SCHEMA_URL);
        var namespaces = injector.get(validator_module_1.DOUBLE_AGENT_VALIDATOR_SCHEMA_NS);
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
    };
    /**
     * Loads a script from a url, parses it and load into the ajv object.
     * At this moment is using a iframe to isolate the parse/evaluate of the code.
     * Maybe it would useful have a strategy loading using web worker
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
var http_1 = __webpack_require__(7);
__webpack_require__(13);
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

module.exports = require("rxjs/add/operator/toPromise");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1));
__export(__webpack_require__(3));
__export(__webpack_require__(4));


/***/ }
/******/ ])));
//# sourceMappingURL=double-agent-validator.js.map