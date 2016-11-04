declare var _: _.LoDashStatic;
declare var ajv: any;
declare var load: Function;
declare var Java;

namespace DoubleAgent.JsonSchemaValidator {

    function loadFormats(formats) {
        _.each(formats, (item) => {
            ajv.addFormat(item.name, item.format)
        });
    }

    function loadKeywords(keywords) {
        _.each(keywords, (item) => {
            ajv.addKeyword(item.name,
                {
                    compile: item.fn,
                    schema: item.metaSchema
                }
            );
        });
    }

    function loadSchemas(schemas) {
        _.each(schemas, (schema) => {
            ajv.addSchema(schema)
        });
    }

    export function load(namespace: any) {
        // _.each(namespaces, (namespace) => {
             //_.each(namespace, (klass, key) => {
                if (_.has(namespace, 'formats')) {
                    loadFormats(namespace.formats);
                }
                if (_.has(namespace, 'keywords')) {
                    loadKeywords(namespace.keywords);
                }
                if (_.has(namespace, 'schemas')) {
                    loadSchemas(namespace.schemas);
                }
             //});
        // });
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
