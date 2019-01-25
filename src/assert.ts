import colors from "colors";
import {Constraint, Action} from "./runner";

export default abstract class Assert {
    /**
     * Assert that input satisfies the specified constraint(s).
     * @param {*} input
     * @param {Constraint[]} constraints
     */
    public static that(input: any[] | any, ...constraints: Constraint[]): void {
        for (const constraint of constraints) {
            const result: string | null = constraint(input);

            if (result !== null) {
                Assert.complain(result);
            }
        }
    }

    /**
     * Assert that two entities are equal.
     * @param {*} entity1
     * @param {*} entity2
     */
    public static equal(entity1: any, entity2: any): void {
        if (entity1 !== entity2) {
            Assert.complain(`Expected '${entity1}' to equal '${entity2}'`);
        }
    }

    /**
     * Assert that two entities are not equal.
     * @param entity1
     * @param entity2
     */
    public static notEqual(entity1: any, entity2: any): void {
        if (entity1 === entity2) {
            Assert.complain(`Expected '${entity1}' to not equal '${entity2}'`);
        }
    }

    /**
     * Assert that input is equal to true.
     * @param {*} input
     */
    public static true(input: any): void {
        if (input !== true) {
            Assert.complain(`Expected '${input}' to be true`);
        }
    }

    /**
     * Assert that input is equal to false.
     * @param {*} input
     */
    public static false(input: any): void {
        if (input !== false) {
            Assert.complain(`Expected '${input}' to be false`);
        }
    }

    /**
     * Assert that the input method throws an error.
     * @param {Action} method
     * @param {string | undefined} message
     */
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

    protected static complain(message: string): void {
        throw new Error(colors.red(`      ${message}`));
    }
}

