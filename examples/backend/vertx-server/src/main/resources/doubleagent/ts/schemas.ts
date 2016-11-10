

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
        ];
        export var keywords = [];
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
                   nome: {
                       type: 'string'
                   }
               }
           }
        ];
}