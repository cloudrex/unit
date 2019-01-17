import {Constraint} from "./runner";

export default abstract class Does {
    public static startWith(str: string): Constraint {
        return (input: any) => {
            if (typeof input === "string" && input.startsWith(str)) {
                return null;
            }

            return `Expected '${input}' to start with '${str}'`;
        };
    }

    public static endWith(str: string): Constraint {
        return (input: any) => {
            if (typeof input === "string" && input.endsWith(str)) {
                return null;
            }

            return `Expected '${input}' to end with '${str}'`;
        };
    }

    public static match(pattern: RegExp): Constraint {
        return (input: any) => {
            if (typeof input === "string" && pattern.test(input)) {
                return null;
            }

            return `Expected '${input}' to match '${pattern.toString()}'`;
        };
    }

    public static contain(item: any): Constraint {
        return (input: any) => {
            if (Array.isArray(input) && input.includes(item)) {
                return null;
            }

            return `Expected '${input}' to contain '${item}'`;
        };
    }

    public static haveProperty(name: string): Constraint {
        return (input: any) => {
            if (name in input) {
                return null;
            }

            return `Expected '${input}' to have property '${name}'`;
        };
    }

    public static haveLength(length: number): Constraint {
        return (input: any) => {
            if (input.length === length) {
                return null;
            }

            return `Expected '${input}' to have a length of '${length}'`;
        };
    }
}
