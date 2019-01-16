import {TestConstraint} from "./unit";

export default abstract class Does {
    public static startWith(str: string): TestConstraint {
        return (input: any) => {
            if (typeof input === "string" && input.startsWith(str)) {
                return null;
            }

            return `Expected '${input}' to start with '${str}'`;
        };
    }

    public static endWith(str: string): TestConstraint {
        return (input: any) => {
            if (typeof input === "string" && input.endsWith(str)) {
                return null;
            }

            return `Expected '${input}' to end with '${str}'`;
        };
    }

    public static match(pattern: RegExp): TestConstraint {
        return (input: any) => {
            if (typeof input === "string" && pattern.test(input)) {
                return null;
            }

            return `Expected '${input}' to match '${pattern.toString()}'`;
        };
    }

    public static contain(item: any): TestConstraint {
        return (input: any) => {
            if (Array.isArray(input) && input.includes(item)) {
                return null;
            }

            return `Expected '${input}' to contain '${item}'`;
        };
    }
}
