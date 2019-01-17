import colors from "colors";
import {Constraint, Action} from "./runner";

export default abstract class Assert {
    public static that(input: any, ...constraints: Constraint[]): void {
        for (const constraint of constraints) {
            const result: string | null = constraint(input);

            if (result !== null) {
                Assert.complain(result);
            }
        }
    }

    public static equal(entity1: any, entity2: any): void {
        if (entity1 !== entity2) {
            Assert.complain(`Expected '${entity1}' to equal '${entity2}'`);
        }
    }

    public static notEqual(entity1: any, entity2: any): void {
        if (entity1 === entity2) {
            Assert.complain(`Expected '${entity1}' to not equal '${entity2}'`);
        }
    }

    public static true(input: any): void {
        if (input !== true) {
            Assert.complain(`Expected '${input}' to be true`);
        }
    }

    public static throws(method: Action, message?: string): void {
        let resultError: Error | null = null;
        let methodName: string = method.name;

        // Anonymous method
        if (methodName === "") {
            methodName = "Anonymous";
        }

        try {
            method();
        }
        catch (error) {
            resultError = error;
        }

        if (resultError === null) {
            Assert.complain(`Expected '${methodName}' to throw`);
        }
        else if (message !== undefined && resultError.message !== message) {
            Assert.complain(`Expected '${methodName}' to throw with message '${message}' but got '${resultError.message}' instead`);
        }
    }

    public static false(input: any): void {
        if (input !== false) {
            Assert.complain(`Expected '${input}' to be false`);
        }
    }

    protected static complain(message: string): void {
        throw new Error(colors.red(`      ${message}`));
    }
}

