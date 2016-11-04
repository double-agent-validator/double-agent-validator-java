var DoubleAgent;
(function (DoubleAgent) {
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
        function load(namespace) {
            if (_.has(namespace, 'formats')) {
                loadFormats(namespace.formats);
            }
            if (_.has(namespace, 'keywords')) {
                loadKeywords(namespace.keywords);
            }
            if (_.has(namespace, 'schemas')) {
                loadSchemas(namespace.schemas);
            }
        }
        JsonSchemaValidator.load = load;
        function loadMultiple(namespaces) {
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