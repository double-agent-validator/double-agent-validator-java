Double Agent Validator
======================
[![build status](https://gitlab.com/Serpro/double-agent-validator/badges/master/build.svg)](https://gitlab.com/Serpro/double-agent-validator/commits/master)
[![coverage report](https://gitlab.com/Serpro/double-agent-validator/badges/master/coverage.svg)](https://gitlab.com/Serpro/double-agent-validator/commits/master)
[![](https://jitpack.io/v/com.gitlab.Serpro/double-agent-validator.svg)](https://jitpack.io/#com.gitlab.Serpro/double-agent-validator)

### Requisitos:

* Maven 3 ( a partir do 3.3 )
* Java 8 101 ou superior
* npm (para executar a aplicação frontend Angular 2)


Este projeto tem por objetivo permitir a execução de validações de forma isomórfica, ou seja: o mesmo código utilizado para 
validar os dados no servidor é utilizado para validar os dados no frontend.

Para tanto levou-se ### em conta a capacidade de executar javascript no servidor Java utilizando o Nashorn (uma script engine Javascript) disponível no Java 8,
que tem uma vantagem considerável em relação à script engine anterior (Rhino) que lenta.


### Utilizado o componente

#### Maven

Adicione o jitpack como repositório maven, no seu arquivo pom.xml:

```xml
    <repositories>
        <repository>
            <id>jitpack.io</id>
            <url>https://jitpack.io</url>
        </repository>
  ...
```
Adicione a dependência double-agent-validator no pom.xml, como a seguir:


```xml
        <dependency>
            <groupId>com.gitlab.serpro</groupId>
            <artifactId>double-agent-validator</artifactId>
            <version>0.0.5</version>
        </dependency>
```

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

No exemplo Vertx é possivel obter o script para uso no frontend através da requisição ao endereço: http://localhost:8080/json-schema-validation

Esse script retornado necessita que tanto o ajv como o lodash ja tenham sido incluidos em sua pagina.

Para utiliza o DoubleAgentValidator em sua pagina e possivel atraves dos seguinte objeto:

##### 
```typescript
var result = DoubleAgent.JsonSchemaValidator.validate('pessoa-v1', {});

/*
// result terá o seguinte valor
result =  [
	{
		"keyword": "required",
		"dataPath": "",
		"schemaPath": "pessoa-v1/required",
		"params": {
			"missingProperty": "name"
		},
		"message": "should have required property 'name'"
	},
	{
		"keyword": "required",
		"dataPath": "",
		"schemaPath": "pessoa-v1/required",
		"params": {
			"missingProperty": "age"
		},
		"message": "should have required property 'age'"
	}
];

*/
```
      

Opcionamente, você pode servir junto com o script de validação dos seus json schemas as dependências ajv e lodash.

A classe JsonSchemaValidator fornece o método `getVendorScript()` que possibilita retornar a String com os códigos javascript das bibliotecas `lodash (4.16.4)` e `ajv (4.8.2)`. Sendo assim, opcionalmente você pode servir seu script de validação dos seus schemas JSON juntamente com os scripts dessas duas dependências.

A aplicação de exemplo em vertx disponibiliza a chamada ao endpoint REST com um parâmetro `?with-dependencies=true` que demonstra justamente esta possibilidade.

Dessa forma, podemos adicionar em uma página html uma tag script apontando para `http://localhost:8080/json-schema-validation?with-dependencies=true` e dessa forma, após a carga (`load`) da página o objeto DoubleAgent.JsonSchemaValidator com o método `validate` estará disponível permitindo a execução das validações, como no exemplo acima;


* Executando o script no frontend Angular 2

Existe um pacote npm chamado double-agent-validator que permite a integração com uma aplicação Angular 2.

Para mais instruções acesse o [README.md](npm-package/README.md) do projeto npm.
