import { PropertiesCollection } from './properties-collection';
export interface JsonSchema {
    id: string;
    type: string;
    required?: string[];
    properties: PropertiesCollection;
    [property: string]: {};
}
