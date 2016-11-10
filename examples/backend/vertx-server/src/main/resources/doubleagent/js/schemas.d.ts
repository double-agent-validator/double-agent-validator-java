declare namespace DoubleAgent.Example.JsonSchemaValidator {
    var formats: {
        name: string;
        format: RegExp;
    }[];
    var keywords: any[];
    var schemas: ({
        id: string;
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            nome: {
                type: string;
            };
            dataNascimento: {
                type: string;
            };
        };
    } | {
        id: string;
        type: string;
        checarHabilitacaoContribuinte: boolean;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            ni: {
                anyOf: {
                    type: string;
                    format: string;
                }[];
            };
            nome: {
                type: string;
            };
        };
    })[];
}
