

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