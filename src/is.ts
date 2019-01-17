import {Constraint, JsType} from "./runner";
import Util from "./util";

export abstract class Is {
    public static greaterThan(num: number): Constraint {
        return (input: any) => {
            if (input > num) {
                return null;
            }

            return `Expected '${input}' to be greater than '${num}'`;
        };
    }

    public static lessThan(num: number): Constraint {
        return (input: any) => {
            if (input < num) {
                return null;
            }

            return `Expected '${input}' to be greater than '${num}'`;
        };
    }

    public static get negative(): Constraint {
        return (input: any) => {
            if (input < 0) {
                return null;
            }

            return `Expected '${input}' to be negative`;
        };
    }

    public static get positive(): Constraint {
        return (input: any) => {
            if (input > 0) {
                return null;
            }

            return `Expected '${input}' to be positive`;
        };
    }

    public static get neutral(): Constraint {
        return (input: any) => {
            if (input === 0) {
                return null;
            }

            return `Expected '${input}' to be neutral`;
        };
    }

    public static get null(): Constraint {
        return (input: any) => {
            if (input === null) {
                return null;
            }

            return `Expected '${input}' to be null`;
        };
    }

    public static inRange(from: number, to: number): Constraint {
        return (input: any) => {
            if (typeof input !== "number") {
                return `Expected '${input}' to be a number`;
            }
            else if (input >= from && input <= to) {
                return null;
            }

            return `Expected '${input}' to be within range ${from}-${to}`;
        };
    }

    public static get empty(): Constraint {
        return (input: any) => {
            if (Util.isEmpty(input)) {
                return null;
            }

            return `Expected '${input}' to be empty`;
        };
    }

    public static get emptyString(): Constraint {
        return (input: any) => {
            if (input === "") {
                return null;
            }

            return `Expected '${input}' to be an empty string`;
        };
    }

    public static type(type: JsType): Constraint {
        return (input: any) => {
            const inputType: JsType = typeof input as JsType;

            if (inputType === type) {
                return null;
            }

            return `Expected '${input}' to be of type '${type}' but got '${inputType}'`;
        };
    }

    public static get NaN(): Constraint {
        return (input: any) => {
            if (isNaN(input)) {
                return null;
            }

            return `Expected '${input}' to be NaN`;
        };
    }

    public static instanceOf(instance: any): Constraint {
        return (input: any) => {
            if (input instanceof instance) {
                return null;
            }

            return `Expected '${input}' to be an instance of '${instance}'`;
        };
    }

    public static get array(): Constraint {
        return (input: any) => {
            if (Array.isArray(input)) {
                return null;
            }

            return `Expected '${input}' to be an array`;
        };
    }

    public static arrayOf(type: JsType): Constraint {
        return (input: any) => {
            if (Array.isArray(input)) {
                let succeeded: boolean = true;

                for (const item of input) {
                    if (typeof item !== type) {
                        succeeded = false;

                        break;
                    }
                }

                if (succeeded) {
                    return null;
                }
            }

            return `Expected '${input}' to be an array of type '${type}'`;
        }
    };

    public static get string(): Constraint {
        return Is.type(JsType.String);
    }

    public static get object(): Constraint {
        return Is.type(JsType.Object);
    }

    public static get boolean(): Constraint {
        return Is.type(JsType.Boolean);
    }

    public static get bigInt(): Constraint {
        return Is.type(JsType.BigInteger);
    }

    public static get undefined(): Constraint {
        return Is.type(JsType.Undefined);
    }

    public static get symbol(): Constraint {
        return Is.type(JsType.Symbol);
    }

    public static get function(): Constraint {
        return Is.type(JsType.Function);
    }

    public static get number(): Constraint {
        return Is.type(JsType.Number);
    }
}
