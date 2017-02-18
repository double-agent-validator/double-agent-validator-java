declare var _: _.LoDashStatic;
declare var ajv: any;
declare var load: Function;
declare var Java;

declare module _ {
interface LoDashStatic {
removeEmptyStrings(obj: any);
    }
}


function removeEmptyStrings(obj: any) {
  return _.transform(obj, function (o, v, k) {
    if (v && typeof v === 'object') {
      o[k] = _.removeEmptyStrings(v);
    } else if ((!_.isString(v) || (_.isString(v) && !_.isEmpty(v)))) {
      o[k] = v;
    }
  });
};


_.mixin({ 'removeEmptyStrings': removeEmptyStrings });


namespace DoubleAgent.JsonSchemaValidator {
    export var removeEmptyStrings = true;
    export function setNotRemoveEmptyStrings() {
        DoubleAgent.JsonSchemaValidator.removeEmptyStrings = false;
    }
    export function loadFormats(formats, _ajv: any = null) {
        let ajvInstance = (_ajv ? _ajv : ajv);
        _.each(formats, (item) => {
            ajvInstance.addFormat(item.name, item.format)
        });
    }

    export function loadKeywords(keywords, _ajv: any = null) {
        let ajvInstance = (_ajv ? _ajv : ajv);
        _.each(keywords, (item) => {
            ajvInstance.addKeyword(item.name,
                {
                    compile: item.fn,
                    schema: item.metaSchema
                }
            );
        });
    }

    export function loadSchemas(schemas, _ajv: any = null) {
        let ajvInstance = (_ajv ? _ajv : ajv);
        _.each(schemas, (schema) => {
            ajvInstance.addSchema(schema)
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

    export function validate(schemaName, value) {
        var validate = ajv.compile(
            {
                "$ref": schemaName
            }
        );

        var result = null;

        if (DoubleAgent.JsonSchemaValidator.removeEmptyStrings) {
            result = validate(_.removeEmptyStrings(value));
        } else {
            result = validate(value);
        }

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

    export function getFormats(): {} {
        return ajv['_formats'];
    }


    export function getSchemaObject(schemaName): Object {
        return ajv.getSchema(schemaName) ? ajv.getSchema(schemaName).schema : null;
    }

    export function getKeywords(schema: Object): string[] {
        return _.keys(_.omit(schema, defaultKeywords));
    }
}
