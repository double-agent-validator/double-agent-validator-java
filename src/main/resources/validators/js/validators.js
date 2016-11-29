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
        var defaultKeywords = [
            'type', 'additionalProperties', 'patternProperties', 'maximum',
            'minimum', 'multipleOf', 'maxLength', 'minLength', 'pattern',
            'format', 'maxItems', 'minItems', 'uniqueItems', 'items', 'maxProperties',
            'minProperties', 'required', 'dependencies', 'properties', '$ref', 'enum',
            'not', 'anyOf', 'oneOf', 'allOf', 'additionalItems', '$schema', 'id', 'title',
            'description', 'default'
        ];
        function getSchemas() {
            return _.map(ajv['_schemas'], function (schema) { return schema['id']; });
        }
        JsonSchemaValidator.getSchemas = getSchemas;
        function getSchemaObject(schemaName) {
            return ajv.getSchema(schemaName) ? ajv.getSchema(schemaName).schema : null;
        }
        JsonSchemaValidator.getSchemaObject = getSchemaObject;
        function getKeywords(schema) {
            return _.keys(_.omit(schema, defaultKeywords));
        }
        JsonSchemaValidator.getKeywords = getKeywords;
    })(JsonSchemaValidator = DoubleAgent.JsonSchemaValidator || (DoubleAgent.JsonSchemaValidator = {}));
})(DoubleAgent || (DoubleAgent = {}));
//# sourceMappingURL=validators.js.map