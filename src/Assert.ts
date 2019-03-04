import {Constraint, Action} from "./Runner";
import {Is} from "./Is";
import Util from "./Util";

export default abstract class Assert {
    /**
     * Shorthand alias for Is.null.
     * @param {*} input The input value to assert.
     */
    public null(input: any): void {
        Assert.that(input, Is.null);
    }

    /**
     * Shorthand alias for Is.empty.
     * @param {*} input The input value to assert.
     */
    public empty(input: any): void {
        Assert.that(input, Is.empty);
    }

    /**
     * Shorthand alias for Is.string.
     * @param {*} input The input value to assert.
     */
    public string(input: any): void {
        Assert.that(input, Is.string);
    }

    /**
     * Shorthand alias for Is.object.
     * @param {*} input The input value to assert.
     */
    public object(input: any): void {
        Assert.that(input, Is.object);
    }

    /**
     * Shorthand alias for Is.number.
     * @param {*} input The input value to assert.
     */
    public number(input: any): void {
        Assert.that(input, Is.number);
    }

    /**
     * Shorthand alias for Is.boolean.
     * @param {*} input The input value to assert.
     */
    public boolean(input: any): void {
        Assert.that(input, Is.boolean);
    }

    /**
     * Assert that input satisfies the specified constraint(s).
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
     */
    public static equal(entity1: any, entity2: any): void {
        if (typeof entity1 !== typeof entity2) {
            Assert.complain(`Expected type of '${entity1}' (${typeof entity1}) to equal type of '${entity2}' (${typeof entity2})`);
        }
        else if (entity1 !== entity2) {
            Assert.complain(`Expected '${entity1}' to equal '${entity2}'`);
        }
    }

    /**
     * Assert that two entities are not equal.
     */
    public static notEqual(entity1: any, entity2: any): void {
        if (entity1 === entity2) {
            Assert.complain(`Expected '${entity1}' to not equal '${entity2}'`);
        }
    }

    /**
     * Assert that input is equal to true.
     */
    public static true(input: any): void {
        if (input !== true) {
            Assert.complain(`Expected '${input}' to be true`);
        }
    }

    /**
     * Assert that input is equal to false.
     */
    public static false(input: any): void {
        if (input !== false) {
            Assert.complain(`Expected '${input}' to be false`);
        }
    }

    /**
     * Assert that the input method throws an error.
     */
    public static throws(method: Action, message?: string): void {
        let resultError: Error | null = null;

        const methodName: string = Util.extractMethodName(method);

        try {
            method();
        }
        catch (error) {
            resultError = error;
        }

        if (resultError === null) {
            Assert.complain(`Expected function '${methodName}' to throw`);
        }
        else if (message !== undefined && resultError.message !== message) {
            Assert.complain(`Expected function '${methodName}' to throw with message '${message}' but got '${resultError.message}' instead`);
        }
    }

    // TODO: Simplify/merge with the 'throw()' method somehow without having to copy the entire function.
    /**
     * Assert that the input async method throws an error.
     */
    public static async throwsAsync(method: Action, message?: string): Promise<void> {
        let resultError: Error | null = null;

        const methodName: string = Util.extractMethodName(method);

        try {
            await method();
        }
        catch (error) {
            resultError = error;
        }

        if (resultError === null) {
            Assert.complain(`Expected async function '${methodName}' to throw`);
        }
        else if (message !== undefined && resultError.message !== message) {
            Assert.complain(`Expected async function '${methodName}' to throw with message '${message}' but got '${resultError.message}' instead`);
        }
    }

    /**
     * Throw an error into the console output.
     */
    protected static complain(message: string): void {
        throw new Error(message);
    }
}

