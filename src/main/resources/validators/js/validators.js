var DoubleAgent;
(function (DoubleAgent) {
    var JsonSchemaValidator;
    (function (JsonSchemaValidator) {
        function loadFormats(formats, _ajv) {
            if (_ajv === void 0) { _ajv = null; }
            var ajvInstance = (_ajv ? _ajv : ajv);
            _.each(formats, function (item) {
                ajvInstance.addFormat(item.name, item.format);
            });
        }
        JsonSchemaValidator.loadFormats = loadFormats;
        function loadKeywords(keywords, _ajv) {
            if (_ajv === void 0) { _ajv = null; }
            var ajvInstance = (_ajv ? _ajv : ajv);
            _.each(keywords, function (item) {
                ajvInstance.addKeyword(item.name, {
                    compile: item.fn,
                    schema: item.metaSchema
                });
            });
        }
        JsonSchemaValidator.loadKeywords = loadKeywords;
        function loadSchemas(schemas, _ajv) {
            if (_ajv === void 0) { _ajv = null; }
            var ajvInstance = (_ajv ? _ajv : ajv);
            _.each(schemas, function (schema) {
                ajvInstance.addSchema(schema);
            });
        }
        JsonSchemaValidator.loadSchemas = loadSchemas;
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
                /*_.each(namespace, (klass, key) => {*/
                if (_.has(namespace, 'formats')) {
                    loadFormats(namespace.formats, (ajvArg ? ajvArg : ajv));
                }
                if (_.has(namespace, 'keywords')) {
                    loadKeywords(namespace.keywords, (ajvArg ? ajvArg : ajv));
                }
                if (_.has(namespace, 'schemas')) {
                    loadSchemas(namespace.schemas, (ajvArg ? ajvArg : ajv));
                }
                /*});*/
            });
        }
        JsonSchemaValidator.loadMultiple = loadMultiple;
        function validate(schemaName, value) {
            var validate = ajv.compile({
                "$ref": schemaName
            });
            var result = validate(value);
            // if the validation failed then get the ajv.errors list as the result
            if (result) {
                return { hasErrors: false, errors: null };
            }
            else {
                return {
                    hasErrors: true,
                    errors: validate.errors
                };
            }
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
        function getFormats() {
            return ajv['_formats'];
        }
        JsonSchemaValidator.getFormats = getFormats;
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
