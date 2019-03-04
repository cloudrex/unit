import Runner from "./Runner";

/**
 * Feed in-line data to a test. Must be attached to a method.
 * @param {Array<*>} args The array of arguments that the test will receive.
 */
export function Feed(...args: any[]): any {
    return function (target: any, prop: any) {
        const method: any = target[prop];

        DecoratorUtil.ensureFunc(method);

        if (method.$$unit_feed === undefined || !Array.isArray(method.$$unit_feed)) {
            method.$$unit_feed = [];
        }

        method.$$unit_feed.push(args);
    };
}

/**
 * Define a test. Must be attached to a class method.
 * @param {string | undefined} description The description to display after the test is executed.
 */
export function Test(description?: string): any {
    return function (target: any, prop: any) {
        const method: any = target[prop];

        DecoratorUtil.ensureFunc(method);

        // Use function name if no name is provided.
        if (description === undefined) {
            description = method.name;
        }

        // Mark function as a test.
        method.$$unit_test = description;
    };
}

/**
 * Define a test unit. Must be attached to a class.
 * @param {string | undefined} name The name of the unit. Will default to the class's name if not provided.
 */
export function Unit(name?: string): any {
    return function (target: any) {
        // TODO: Required?
        // DecoratorUtils.ensureObj(target);

        if (name === undefined) {
            name = target.name;
        }

        Runner.createUnit(name as string, target);

        // Find tests
        for (const prop of Object.getOwnPropertyNames(target.prototype)) {
            const method: any = target.prototype[prop];

            if (typeof method !== "function") {
                continue;
            }
            else if (typeof method.$$unit_test === "string") {
                Runner.createTest(method.$$unit_test, name as string, method);
            }
        }
    };
}

/**
 * Mark a test with the specified target method's name.
 */
export function Target(instance: any): any {
    return function (target: any, prop: string) {
        if (typeof instance !== "function" || typeof instance.name !== "string") {
            throw new Error("Invalid prototype specified");
        }

        // Mark function with the corresponding target.
        target[prop].$$unit_target = instance.name;
    };
}

/**
 * Provides utilities for working with decorators
 */
export abstract class DecoratorUtil {
    public static ensureFunc(target: any): void {
        if (typeof target !== "function") {
            throw new Error("Expecting target to be a function");
        }
    }

    public static ensureObj(target: any): void {
        if (typeof target !== "object") {
            throw new Error("Expecting target to be an object");
        }
    }
}
