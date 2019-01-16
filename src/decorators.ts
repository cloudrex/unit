import Unit from "./unit";

export function Test(description?: string): any {
    return function (target: any, prop: any) {
        const method: any = target[prop];

        DecoratorUtil.ensureFunc(method);

        // Use function name if no name is provided
        if (description === undefined) {
            description = method.name;
        }

        // Mark function as a test
        method.$$test = description;
    }
}

export function TestUnit(name?: string): any {
    return function (target: any) {
        // TODO: Required?
        // DecoratorUtils.ensureObj(target);

        if (name === undefined) {
            name = target.name;
        }

        Unit.createUnit(name as string, target);

        // Find tests
        for (const prop of Object.getOwnPropertyNames(target.prototype)) {
            const method: any = target.prototype[prop];

            if (typeof method !== "function") {
                continue;
            }
            else if (typeof method.$$test === "string") {
                Unit.createTest(method.$$test, name as string, method);
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
