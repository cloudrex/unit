export enum OmitConflictingType {
    Object,
    Array,
    Method,
    Number
}

const ComplexTypes: string[] = [
    "function",
    "object",
    "number"
];

export default abstract class DataSet {
    /**
     * Generate a conflicting data set composed of all basic JavaScript data types.
     * @param exclude The types to omit from generation result.
     * @param complexity The amount of parameters the target function takes. This will generate all possible combinations.
     */
    public static generateConflicting(exclude?: any[], complexity: number = 1): any[] {
        const params: any[] = [
            [],
            {},
            0,
            1,
            null,
            undefined,
            false,
            true,
            "test",
            "",

            // TODO.
            // (): void => {}
        ];

        if (exclude !== undefined) {
            for (const item of exclude) {
                if (!ComplexTypes.includes(typeof item) && !Array.isArray(item) && params.includes(item)) {
                    params.splice(params.indexOf(item), 1);
                }
                else if (typeof item === "number") {
                    switch (item) {
                        case OmitConflictingType.Array: {
                            // Remove 'Array'.
                            params.splice(0, 1);

                            break;
                        }

                        case OmitConflictingType.Object: {
                            // Remove 'Object'.
                            params.splice(1, 1);

                            break;
                        }

                        case OmitConflictingType.Method: {
                            // TODO.
                            throw new Error("Not yet implemented");
                        }

                        case OmitConflictingType.Number: {
                            // Remove 'Numbers'.
                            params.splice(2, 2);

                            break;
                        }

                        default: {
                            throw new Error("Unknown exclude parameter");
                        }
                    }
                }
                else {
                    throw new Error("Invalid type of item in the exclude array");
                }
            }
        }

        return params;
    }
}
