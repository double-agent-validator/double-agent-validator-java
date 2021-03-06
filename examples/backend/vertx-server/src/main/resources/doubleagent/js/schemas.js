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
                {
                    name: 'data-brasileira',
                    format: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
                }
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
                        },
                        nascimento: {
                            type: 'string',
                            format: 'data-brasileira'
                        }
                    }
                }
            ];
        })(JsonSchemaValidator = Example.JsonSchemaValidator || (Example.JsonSchemaValidator = {}));
    })(Example = DoubleAgent.Example || (DoubleAgent.Example = {}));
})(DoubleAgent || (DoubleAgent = {}));
