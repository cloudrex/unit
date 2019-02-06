import {Constraint} from "./runner";

export default abstract class Does {
    /**
     * Assert that input is a string starting with the specified string.
     * @param str
     * @return {Constraint}
     */
    public static startWith(str: string): Constraint {
        return (input: any) => {
            if (typeof input === "string" && input.startsWith(str)) {
                return null;
            }

            return `Expected '${input}' to start with '${str}'`;
        };
    }

    /**
     * Assert that input is a string ending with the specified string.
     * @param {string} str
     * @return {Constraint}
     */
    public static endWith(str: string): Constraint {
        return (input: any) => {
            if (typeof input === "string" && input.endsWith(str)) {
                return null;
            }

            return `Expected '${input}' to end with '${str}'`;
        };
    }

    /**
     * Assert that input matches specified patterns.
     * @param {RegExp[]} patterns The patterns to match.
     * @return {Constraint}
     */
    public static match(...patterns: RegExp[]): Constraint {
        return (input: any) => {
            if (typeof input === "string") {
                let pass: boolean = true;

                for (const pattern of patterns) {
                    if (!pattern.test(input)) {
                        pass = false;

                        break;
                    }
                }

                if (pass) {
                    return null;
                }
            }

            return `Expected '${input}' to match patterns '${patterns}'`;
        };
    }

    /**
     * Assert that input is an array containing the specified item.
     * @param {*} item The item to verify the existance of.
     * @return {Constraint}
     */
    public static include(item: any): Constraint {
        return (input: any) => {
            if (Array.isArray(input) && input.includes(item)) {
                return null;
            }

            return `Expected '${input}' to include '${item}'`;
        };
    }

    /**
     * Assert that input entity contains a certain property.
     * @param {string} name The name of the property to verify the existance of.
     */
    public static haveProperty(name: string): Constraint {
        return (input: any) => {
            if (name in input) {
                return null;
            }

            return `Expected '${input}' to have property '${name}'`;
        };
    }

    /**
     * Assert that input has the specified length property value.
     * @param {number} length The length to assert.
     * @return {Constraint}
     */
    public static haveLength(length: number): Constraint {
        return (input: any) => {
            if (input.length === length) {
                return null;
            }

            return `Expected '${input}' to have a length of '${length}' but got '${input.length}'`;
        };
    }

    /**
     * Assert that input has the specified size property value.
     * @param {number} length The size to assert.
     * @return {Constraint}
     */
    public static haveSize(size: number): Constraint {
        return (input: any) => {
            if (input.size === size) {
                return null;
            }

            return `Expected '${input}' to have a size of '${size}' but got '${input.size}'`;
        };
    }
}
