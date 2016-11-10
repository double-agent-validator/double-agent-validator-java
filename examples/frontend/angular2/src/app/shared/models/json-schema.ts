import { PropertySchemaCollection } from './property-schema-collection';
export interface JsonSchema {
    id: string;
    type: string;
    required?: string[];
    properties: PropertySchemaCollection;
    [attributes: string]: {};
}
