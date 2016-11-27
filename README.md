Double Agent Validator
======================
[![build status](https://gitlab.com/serpro/doubleagent-validator/badges/master/build.svg)](https://gitlab.com/serpro/doubleagent-validator/commits/master)
verage report](https://gitlab.com/serpro/doubleagent-validator/badges/master/coverage.svg)](https://gitlab.com/serpro/doubleagent-validator/commits/master)
[![](https://jitpack.io/v/double-agent-validator/double-agent-validator-java.svg)](https://jitpack.io/#double-agent-validator/double-agent-validator-java)

### Requisitos:

* Maven 3 ( a partir do 3.3 )
* Java 8 101 ou superior
* npm (para executar a aplicação frontend Angular 2)


Este projeto tem por objetivo permitir a execução de validações de forma isomórfica, ou seja: o mesmo código utilizado para 
validar os dados no servidor é utilizado para validar os dados no frontend.

Para tanto levou-se ### em conta a capacidade de executar javascript no servidor Java utilizando o Nashorn (uma script engine Javascript) disponível no Java 8,
que tem uma vantagem considerável em relação à script engine anterior (Rhino) que lenta.


### Compilando e Instalando o componente double-agent-validator no maven

```
mvn install
```

### Executando

##### Executar backend Vertx

```bash
./start-vertx-server.sh
```

##### Executar frontend Angular 2

```bash
./start-angular2.sh
```

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
ValidationResult result = jsonSchemaValidator.validate("pessoa-v1", "{name: 'John', age: 1}");
```


### Validação no frontend

* Obtendo o script:


* Executando o script no frontend

