declare var _: _.LoDashStatic;
declare var ajv: any;
declare var load: Function;
declare var Java;

namespace DoubleAgent.JsonSchemaValidator {

    function loadFormats(formats, ajv: any = null) {
        _.each(formats, (item) => {
            ajv.addFormat(item.name, item.format)
        });
    }

    function loadKeywords(keywords, ajv: any = null) {
        _.each(keywords, (item) => {
            ajv.addKeyword(item.name,
                {
                    compile: item.fn,
                    schema: item.metaSchema
                }
            );
        });
    }

    function loadSchemas(schemas, ajv: any = null) {
        _.each(schemas, (schema) => {
            ajv.addSchema(schema)
        });
    }

    export function load(namespace: any, ajvArg: any = null) {
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

    export function loadMultiple(namespaces: any, ajvArg: any = null) {
        _.each(namespaces, (namespace) => {
            _.each(namespace, (klass, key) => {
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

    export function validate(schemaName, value) {
        var validate = ajv.compile(
            {
                "$ref": schemaName
            }
            );
        var result = validate(value);

        // if the validation failed then get the ajv.errors list as the result
        if(!result) {
            result = ajv.errors;
        }

        return result;
    }

    var defaultKeywords = [
                            'type', 'additionalProperties', 'patternProperties', 'maximum',
                            'minimum', 'multipleOf', 'maxLength', 'minLength', 'pattern',
                            'format', 'maxItems', 'minItems', 'uniqueItems', 'items', 'maxProperties',
                            'minProperties', 'required', 'dependencies', 'properties', '$ref', 'enum',
                            'not', 'anyOf', 'oneOf', 'allOf', 'additionalItems', '$schema', 'id', 'title',
                            'description', 'default'
                  ];

    export function getSchemas(): string[] {
        return _.map(
                                   ajv['_schemas'], (schema) => schema['id']
                            );
    }

    export function getSchemaObject(schemaName): Object {
        return ajv.getSchema(schemaName) ? ajv.getSchema(schemaName).schema : null;
    }

    export function getKeywords(schema: Object): string[] {
        return _.keys(_.omit(schema, defaultKeywords));
    }
}
