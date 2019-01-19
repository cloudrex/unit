import {Constraint, JsType} from "./runner";
import Util from "./util";
import Mock from "./mock";

export abstract class Is {
    /**
     * Assert that input is greater than specified.
     * @param {number} num
     * @return {Constraint}
     */
    public static greaterThan(num: number): Constraint {
        return (input: any) => {
            if (input > num) {
                return null;
            }

            return `Expected '${input}' to be greater than '${num}'`;
        };
    }

    /**
     * Assert that input is a number less than specified.
     * @return {Constraint}
     */
    public static lessThan(num: number): Constraint {
        return (input: any) => {
            if (input < num) {
                return null;
            }

            return `Expected '${input}' to be greater than '${num}'`;
        };
    }

    /**
     * Assert that input is a negative number.
     * @return {Constraint}
     */
    public static get negative(): Constraint {
        return (input: any) => {
            if (input < 0) {
                return null;
            }

            return `Expected '${input}' to be negative`;
        };
    }

    /**
     * Assert that input is a positive number.
     * @return {Constraint}
     */
    public static get positive(): Constraint {
        return (input: any) => {
            if (input > 0) {
                return null;
            }

            return `Expected '${input}' to be positive`;
        };
    }

    /**
     * Assert that input is the number zero.
     * @return {Constraint}
     */
    public static get neutral(): Constraint {
        return (input: any) => {
            if (input === 0) {
                return null;
            }

            return `Expected '${input}' to be neutral`;
        };
    }

    /**
     * Assert that input is null.
     * @return {Constraint}
     */
    public static get null(): Constraint {
        return (input: any) => {
            if (input === null) {
                return null;
            }

            return `Expected '${input}' to be null`;
        };
    }

    /**
     * Assert that input is a number that falls within specified range.
     * @param {number} from
     * @param {number} to
     * @return {Constraint}
     */
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

    /**
     * Assert that input is empty, has no value(s) or not defined.
     * @return {Constraint}
     */
    public static get empty(): Constraint {
        return (input: any) => {
            if (Util.isEmpty(input)) {
                return null;
            }

            return `Expected '${input}' to be empty`;
        };
    }

    /**
     * Assert that input is an empty string.
     * @return {Constraint}
     */
    public static get emptyString(): Constraint {
        return (input: any) => {
            if (input === "") {
                return null;
            }

            return `Expected '${input}' to be an empty string`;
        };
    }

    /**
     * Assert that input is an empty array.
     * @return {Constraint}
     */
    public static get emptyArray(): Constraint {
        return (input: any) => {
            if (Array.isArray(input) && input.length === 0) {
                return null;
            }

            return `Expected '${input}' to be an empty array`;
        };
    }

    /**
     * Assert that input is of the specified type.
     * @param {JsType} type
     * @return {Constraint}
     */
    public static type(type: JsType): Constraint {
        return (input: any) => {
            const inputType: JsType = typeof input as JsType;

            if (inputType === type) {
                return null;
            }

            return `Expected '${input}' to be of type '${type}' but got '${inputType}'`;
        };
    }

    /**
     * Assert that input is NaN (not a number).
     * @return {Constraint}
     */
    public static get NaN(): Constraint {
        return (input: any) => {
            if (isNaN(input)) {
                return null;
            }

            return `Expected '${input}' to be NaN`;
        };
    }

    public static get odd(): Constraint {
        return (input: any) => {
            if (typeof input === "number" && !Util.isEven(input)) {
                return null;
            }

            return `Expected '${input}' to be an odd number`;
        }
    }

    public static get even(): Constraint {
        return (input: any) => {
            if (typeof input === "number" && Util.isEven(input)) {
                return null;
            }

            return `Expected '${input}' to be an even number`;
        }
    }

    /**
     * Assert that input is an instance of the specified class.
     * @param {*} instance
     * @return {Constraint}
     */
    public static instanceOf(instance: any): Constraint {
        return (input: any) => {
            if (input instanceof instance) {
                return null;
            }

            return `Expected '${input}' to be an instance of '${instance}'`;
        };
    }

    /**
     * Assert that input is an array.
     * @return {Constraint}
     */
    public static get array(): Constraint {
        return (input: any) => {
            if (Array.isArray(input)) {
                return null;
            }

            return `Expected '${input}' to be an array`;
        };
    }

    /**
     * Assert that input is an array with the specified length.
     * @param {number} length The amount of elements array must contain.
     * @return {Constraint}
     */
    public static arrayWithLength(length: number): Constraint {
        return (input: any) => {
            if (Array.isArray(input) && input.length === length) {
                return null;
            }

            return `Expected '${input}' to be an array with length '${length}'`;
        };
    }

    /**
     * Assert that input is an array of a specific type.
     * @param {JsType} type
     * @return {Constraint}
     */
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
        };
    }

    /**
     * Asserts that a mock function was invoked.
     * @return {Constraint}
     */
    public static get called(): Constraint {
        return (input: any) => {
            if (input instanceof Mock && input.calls.length > 0) {
                return null;
            }

            return `Expected '${input}' to be called`;
        };
    }

    /**
     * Assert that input is a string.
     * @return {Constraint}
     */
    public static get string(): Constraint {
        return Is.type(JsType.String);
    }

    /**
     * Assert that input is an object.
     * @return {Constraint}
     */
    public static get object(): Constraint {
        return Is.type(JsType.Object);
    }

    /**
     * Assert that input is a boolean.
     * @return {Constraint}
     */
    public static get boolean(): Constraint {
        return Is.type(JsType.Boolean);
    }

    /**
     * Assert that input is a big integer.
     * @return {Constraint}
     */
    public static get bigInt(): Constraint {
        return Is.type(JsType.BigInteger);
    }

    /**
     * Assert that input is undefined.
     * @return {Constraint}
     */
    public static get undefined(): Constraint {
        return Is.type(JsType.Undefined);
    }

    /**
     * Assert that input is a symbol.
     * @return {Constraint}
     */
    public static get symbol(): Constraint {
        return Is.type(JsType.Symbol);
    }

    /**
     * Assert that input is a function.
     * @return {Constraint}
     */
    public static get function(): Constraint {
        return Is.type(JsType.Function);
    }

    /**
     * Assert that input is a number.
     * @return {Constraint}
     */
    public static get number(): Constraint {
        return Is.type(JsType.Number);
    }
}
