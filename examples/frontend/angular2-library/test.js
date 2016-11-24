var Ajv = require('ajv');
var _ = require('lodash');
var ajv = new Ajv({allErrors: true, v5: true});

var DoubleAgent;
(function (DoubleAgent) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        function loadFormats(formats, ajv) {
            if (ajv === void 0) { ajv = null; }
            _.each(formats, function (item) {
                ajv.addFormat(item.name, item.format);
            });
        }
        function loadKeywords(keywords, ajv) {
            if (ajv === void 0) { ajv = null; }
            _.each(keywords, function (item) {
                ajv.addKeyword(item.name, {
                    compile: item.fn,
                    schema: item.metaSchema
                });
            });
        }
        function loadSchemas(schemas, ajv) {
            if (ajv === void 0) { ajv = null; }
            _.each(schemas, function (schema) {
                ajv.addSchema(schema);
            });
        }
        function load(namespace, ajvArg) {
            if (ajvArg === void 0) { ajvArg = null; }
            if (_.has(namespace, 'formats')) {
                loadFormats(namespace.formats, (ajvArg ? ajvArg : ajv));
            }
            if (_.has(namespace, 'keywords')) {
                loadKeywords(namespace.keywords, (ajvArg ? ajvArg : ajv));
            }
            if (_.has(namespace, 'schemas')) {
                loadSchemas(namespace.schemas, (ajvArg ? ajvArg : ajv));
            }
        }
        JsonSchemaValidator.load = load;
        function loadMultiple(namespaces, ajvArg) {
            if (ajvArg === void 0) { ajvArg = null; }
            _.each(namespaces, function (namespace) {
                _.each(namespace, function (klass, key) {
                    if (_.has(klass, 'formats')) {
                        loadFormats(klass.formats, (ajvArg ? ajvArg : ajv));
                    }
                    if (_.has(klass, 'keywords')) {
                        loadKeywords(klass.keywords, (ajvArg ? ajvArg : ajv));
                    }
                    if (_.has(klass, 'schemas')) {
                        loadSchemas(klass.schemas, (ajvArg ? ajvArg : ajv));
                    }
                });
            });
        }
        JsonSchemaValidator.loadMultiple = loadMultiple;
        function validate(schemaName, value) {
            var validate = ajv.compile({
                "$ref": schemaName
            });
            var result = validate(value);
            // if the validation failed then get the validate.errors list as the result
            if (!result) {
                result = validate.errors;
            }
            return result;
        }
        JsonSchemaValidator.validate = validate;
    })(JsonSchemaValidator = DoubleAgent.JsonSchemaValidator || (DoubleAgent.JsonSchemaValidator = {}));
})(DoubleAgent || (DoubleAgent = {}));
//# sourceMappingURL=validators.js.map
var DoubleAgent;
(function (DoubleAgent) {
    var Example;
    (function (Example) {
        var JsonSchemaValidator;
        (function (JsonSchemaValidator) {
            JsonSchemaValidator.formats = [
                {
                    name: 'cpf',
                    format: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/
                },
                {
                    name: 'cnpj',
                    format: /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/
                },
            ];
            JsonSchemaValidator.keywords = [
                {
                    name: 'nacionalidadeLegal',
                    fn: function (sch, parentSchema) {
                        var nacionalidadeLegal = function (data) {
                            if (data && data["nacionalidade"] && data["nacionalidade"].toLowerCase() === 'brasileiro') {
                                return true;
                            }
                            else {
                                nacionalidadeLegal.errors = [{ keyword: 'nacionalidadeLegal', message: 'Legal é ser brasileiro".' }];
                            }
                        };
                        return nacionalidadeLegal;
                    }
                }
            ];
            JsonSchemaValidator.schemas = [
                {
                    id: 'identificacao-v2017',
                    type: 'object',
                    required: ['id', 'nome'],
                    properties: {
                        id: {
                            type: 'number'
                        },
                        nome: {
                            type: 'string'
                        },
                        dataNascimento: {
                            type: 'string'
                        }
                    }
                },
                {
                    id: 'contribuinte-v1',
                    type: 'object',
                    nacionalidadeLegal: true,
                    required: ['id', 'ni', 'nome'],
                    properties: {
                        id: {
                            type: 'number'
                        },
                        ni: {
                            anyOf: [
                                {
                                    type: 'string',
                                    format: 'cpf'
                                },
                                {
                                    type: 'string',
                                    format: 'cnpj'
                                }
                            ]
                        },
                        nacionalidade: {
                            type: "string",
                            enum: ["brasileiro", "argentino"]
                        },
                        nome: {
                            type: 'string'
                        }
                    }
                }
            ];
        })(JsonSchemaValidator = Example.JsonSchemaValidator || (Example.JsonSchemaValidator = {}));
    })(Example = DoubleAgent.Example || (DoubleAgent.Example = {}));
})(DoubleAgent || (DoubleAgent = {}));


DoubleAgent.JsonSchemaValidator.load(DoubleAgent.Example.JsonSchemaValidator, ajv);
var result = ajv.validate('contribuinte-v1', {});

if (!result) result = ajv.errors;

console.log('RESULT', result);