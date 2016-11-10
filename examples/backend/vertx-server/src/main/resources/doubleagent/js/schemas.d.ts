declare namespace DoubleAgent.Example.JsonSchemaValidator {
    var formats: {
        name: string;
        format: RegExp;
    }[];
    var keywords: {
        name: string;
        fn: (sch: any, parentSchema: any) => (data: any) => boolean;
    }[];
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
        nacionalidadeLegal: boolean;
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
            nacionalidade: {
                type: string;
                enum: string[];
            };
            nome: {
                type: string;
            };
        };
    })[];
}
