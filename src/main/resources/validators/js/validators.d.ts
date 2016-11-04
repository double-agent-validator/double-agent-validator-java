/// <reference types="lodash" />
declare var _: _.LoDashStatic;
declare var ajv: any;
declare var load: Function;
declare var Java: any;
declare namespace DoubleAgent.JsonSchemaValidator {
    function load(namespace: any): void;
    function loadMultiple(namespaces: any): void;
    function validate(schemaName: any, value: any): any;
}
