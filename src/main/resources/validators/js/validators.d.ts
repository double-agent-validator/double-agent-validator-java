/// <reference types="lodash" />
declare var _: _.LoDashStatic;
declare var ajv: any;
declare var load: Function;
declare var Java: any;
declare namespace DoubleAgent.JsonSchemaValidator {
    function loadFormats(formats: any, _ajv?: any): void;
    function loadKeywords(keywords: any, _ajv?: any): void;
    function loadSchemas(schemas: any, _ajv?: any): void;
    function load(namespace: any, ajvArg?: any): void;
    function loadMultiple(namespaces: any, ajvArg?: any): void;
    function validate(schemaName: any, value: any): {
        hasErrors: boolean;
        errors: any;
    };
    function getSchemas(): string[];
    function getFormats(): {};
    function getSchemaObject(schemaName: any): Object;
    function getKeywords(schema: Object): string[];
}
