import Runner from "./runner";

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

export function Test(description?: string): any {
    return function (target: any, prop: any) {
        const method: any = target[prop];

        DecoratorUtil.ensureFunc(method);

        // Use function name if no name is provided
        if (description === undefined) {
            description = method.name;
        }

        // Mark function as a test
        method.$$unit_test = description;
    }
}

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
    }
}

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
