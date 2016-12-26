declare var ajv: any;

namespace DoubleAgent.Example.JsonSchemaValidator {
    export var formats = [
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
    export var keywords = [
        {
            name: 'nacionalidadeLegal',
            fn: function (sch, parentSchema) {
                var nacionalidadeLegal = function (data) {
                    if (data && data["nacionalidade"] && data["nacionalidade"].toLowerCase() === 'brasileiro') {
                        return true;
                    } else {
                        (<any>nacionalidadeLegal).errors = [{ keyword: 'nacionalidadeLegal', message: 'Legal é ser brasileiro".' }];
                    }
                };
                return nacionalidadeLegal;
            }
        }
    ];
    export var schemas = [
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

}
