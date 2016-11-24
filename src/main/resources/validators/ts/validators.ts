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

        // if the validation failed then get the validate.errors list as the result
        if(!result) {
            result = validate.errors;
        }

        return result;
    }
}
