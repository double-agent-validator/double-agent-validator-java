Double Agent Validator
======================

[![build status](https://gitlab.com/nerdland/doubleagent-validator/badges/master/build.svg)](https://gitlab.com/nerdland/doubleagent-validator/commits/master)
[![coverage report](https://gitlab.com/nerdland/doubleagent-validator/badges/master/coverage.svg)](https://gitlab.com/nerdland/doubleagent-validator/commits/master)

Este projeto tem por objetivo permitir a execução de validações de forma isomórfica, ou seja: o mesmo código utilizado para 
validar os dados no servidor é utilizado para validar os dados no frontend.

Para tanto levou-se em conta a capacidade de executar javascript no servidor Java utilizando o Nashorn (uma script engine Javascript) disponível no Java 8,
que tem uma vantagem considerável em relação à script engine anterior (Rhino) que lenta.

Exemplo de Uso
--------------

Dado o seguinte arquivo presente na pasta src/main/resources

* js/pessoa.js

```js
var DoubleAgent;
(function (DoubleAgent) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {

        JsonSchemaValidator.schemas = [
            {
                id: 'pessoa-v1',
                type: 'object',
                required: ['name', 'age'],
                properties:
                    {
                        name: {
                            type: "string"
                        },
                        age: {
                            type: "number"
                        }
                    }

            }
        ];
    })(JsonSchemaValidator = DoubleAgent.JsonSchemaValidator || (DoubleAgent.JsonSchemaValidator = {}));
})(DoubleAgent || (DoubleAgent = {}));
//# sourceMappingURL=validators.js.map
```


### Validação no backend
Podemos utilizar a classe JsonSchemaValidator da seguinte forma:

```java
JsonSchemaValidator jsonSchemaValidator = new JsonSchemaValidator();
InputStreamReader is = new InputStreamReader(this.getClass().getResourceAsStream("js/pessoa.js"));
jsonSchemaValidator.loadSchemaData(is, "DoubleAgent.JsonSchemaValidator");
ValidationResult result = cut.validate("pessoa-v1", "{name: 'John', age: 1}");
```


### Validação no frontend

* Obtendo o script:


* Executando o script no frontend

