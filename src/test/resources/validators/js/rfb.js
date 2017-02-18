var RFB;
(function (RFB) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        function loadFormats(formats) {
            _.each(formats, function (item) {
                ajv.addFormat(item.name, item.format);
            });
        }
        function loadKeywords(keywords) {
            _.each(keywords, function (item) {
                ajv.addKeyword(item.name, {
                    compile: item.fn,
                    schema: item.metaSchema
                });
            });
        }
        function loadSchemas(schemas) {
            _.each(schemas, function (schema) {
                ajv.addSchema(schema);
            });
        }
        function init(namespaces) {
            _.each(namespaces, function (namespace) {
                _.each(namespace, function (klass, key) {
                    if (_.has(klass, 'formats')) {
                        loadFormats(klass.formats);
                    }
                    if (_.has(klass, 'keywords')) {
                        loadKeywords(klass.keywords);
                    }
                    if (_.has(klass, 'schemas')) {
                        loadSchemas(klass.schemas);
                    }
                });
            });
        }
        JsonSchemaValidator.init = init;
        function validate(schemaName, value) {
            var validate = ajv.compile({
                "$ref": schemaName
            });
            var result = validate(value);
            // se o resultado da validação for false, então pega os erros gerados como o resultado
            if (!result) {
                result = validate.errors;
            }
            return result;
        }
        JsonSchemaValidator.validate = validate;
    })(JsonSchemaValidator = RFB.JsonSchemaValidator || (RFB.JsonSchemaValidator = {}));
})(RFB || (RFB = {}));
var RFB;
(function (RFB) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        var Common;
        (function (Common) {
            var Contribuinte;
            (function (Contribuinte) {
                Contribuinte.schemas = [
                    {
                        id: 'contribuinte-v1',
                        type: 'object',
                        checarHabilitacaoContribuinte: true,
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
                            descricao: {
                                type: 'string'
                            }
                        }
                    }
                ];
                Contribuinte.keywords = [
                    {
                        name: 'checarHabilitacaoContribuinte',
                        fn: function (sch, parentSchema) {
                            var checarHabilitacao = function (data) {
                                if (JsonSchemaValidator.RFBAsyncChecks['checarHabilitacaoContribuinte'] == undefined || JsonSchemaValidator.RFBAsyncChecks['checarHabilitacaoContribuinte'] === true) {
                                    return true;
                                }
                                else {
                                    checarHabilitacao.errors = [{ keyword: 'checarHabilitacaoContribuinte', message: 'Contribuinte não habilitado".' }];
                                }
                            };
                            return checarHabilitacao;
                        }
                    }
                ];
            })(Contribuinte = Common.Contribuinte || (Common.Contribuinte = {}));
        })(Common = JsonSchemaValidator.Common || (JsonSchemaValidator.Common = {}));
    })(JsonSchemaValidator = RFB.JsonSchemaValidator || (RFB.JsonSchemaValidator = {}));
})(RFB || (RFB = {}));
var RFB;
(function (RFB) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        var Common;
        (function (Common) {
            Common.formats = [
                {
                    name: 'cpf',
                    format: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/
                },
                {
                    name: 'cnpj',
                    format: /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/
                },
                {
                    name: 'numeroDCOMP',
                    format: '/^DCOMP\-[0-9]{6}$/'
                }
            ];
        })(Common = JsonSchemaValidator.Common || (JsonSchemaValidator.Common = {}));
    })(JsonSchemaValidator = RFB.JsonSchemaValidator || (RFB.JsonSchemaValidator = {}));
})(RFB || (RFB = {}));
var RFB;
(function (RFB) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        var Common;
        (function (Common) {
            var TipoCredito;
            (function (TipoCredito) {
                TipoCredito.schemas = [
                    {
                        id: 'tipoCredito-v1',
                        type: 'object',
                        tipoCredito: true,
                        required: ['id', 'descricao'],
                        properties: {
                            id: {
                                type: 'number'
                            },
                            descricao: {
                                type: 'string'
                            },
                        }
                    }];
                TipoCredito.keywords = [
                    {
                        name: 'tipoCredito',
                        fn: function (sch, parentSchema) {
                            var tipoCreditoValidator = function (data) {
                                if (data.descricao !== 'descricao') {
                                    return true;
                                }
                                else {
                                    tipoCreditoValidator.errors = [ { data: { customDataPath: '.descricao'} , keyword: 'tipoCredito', message: 'TipoCredito descricao não pode ser "descricao".' }];
                                    return false;
                                }
                            };
                            return tipoCreditoValidator;
                        },
                        metaSchema: {
                            type: 'boolean'
                        }
                    }
                ];
            })(TipoCredito = Common.TipoCredito || (Common.TipoCredito = {}));
        })(Common = JsonSchemaValidator.Common || (JsonSchemaValidator.Common = {}));
    })(JsonSchemaValidator = RFB.JsonSchemaValidator || (RFB.JsonSchemaValidator = {}));
})(RFB || (RFB = {}));
var RFB;
(function (RFB) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        var Common;
        (function (Common) {
            var TipoDeclaracao;
            (function (TipoDeclaracao) {
                TipoDeclaracao.schemas = [{
                        id: 'tipoDeclaracao-v1',
                        type: 'object',
                        required: ['id', 'descricao'],
                        properties: {
                            id: {
                                type: 'number'
                            },
                            descricao: {
                                type: 'string'
                            },
                        }
                    }];
                TipoDeclaracao.keywords = [];
            })(TipoDeclaracao = Common.TipoDeclaracao || (Common.TipoDeclaracao = {}));
        })(Common = JsonSchemaValidator.Common || (JsonSchemaValidator.Common = {}));
    })(JsonSchemaValidator = RFB.JsonSchemaValidator || (RFB.JsonSchemaValidator = {}));
})(RFB || (RFB = {}));
var RFB;
(function (RFB) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        var Documento;
        (function (Documento) {
            var CPIM;
            (function (CPIM) {
                CPIM.schemas = [
                    {
                        id: 'cpim-v1',
                        type: 'object',
                        required: ['id', 'descricao', 'tipo', 'contribuinte'],
                        properties: {
                            id: {
                                type: 'number'
                            },
                            descricao: {
                                type: 'string'
                            },
                            tipo: {
                                '$ref': 'tipoDeclaracao-v1',
                            },
                            contribuinte: {
                                '$ref': 'contribuinte-v1'
                            }
                        }
                    }
                ];
                CPIM.keywords = [];
            })(CPIM = Documento.CPIM || (Documento.CPIM = {}));
        })(Documento = JsonSchemaValidator.Documento || (JsonSchemaValidator.Documento = {}));
    })(JsonSchemaValidator = RFB.JsonSchemaValidator || (RFB.JsonSchemaValidator = {}));
})(RFB || (RFB = {}));
