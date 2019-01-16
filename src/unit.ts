import colors from "colors";
import Util from "./util";

export interface ITest {
    readonly description: string;
    readonly instance: (...args: any[]) => void;
    readonly args: Array<any[]>;
}

export interface IUnit<T = any> {
    readonly name: string;
    readonly instance: T;
    readonly tests: ITest[];
}

export enum JsType {
    Object = "object",
    Function = "function",
    String = "string",
    Number = "number",
    Undefined = "undefined",
    BigInteger = "bigint",
    Symbol = "symbol",
    Boolean = "boolean"
}

export type TestConstraint = (...args: any[]) => string | null;

export type Action = () => void;

export default abstract class UnitLib {
    public static async test(): Promise<void> {
        let successful: number = 0;
        let count: number = 0;

        for await (const [name, unit] of UnitLib.units) {
            UnitLib.processUnit(unit);

            for await (const test of unit.tests) {
                if (await UnitLib.processTest(test)) {
                    successful++;
                }

                count++;
            }
        }

        console.log(colors.green(`\n  ${successful}/${count} {${Util.percentage(successful, count)}%} passing`));
    }

    public static clear(): void {
        UnitLib.units.clear();
    }

    public static createTest(description: string, unitName: string, instance: any): void {
        if (UnitLib.units.has(unitName)) {
            const unit: IUnit = UnitLib.units.get(unitName) as IUnit;

            unit.tests.push({
                description,
                instance,
                args: instance.$$unit_feed || []
            });

            return;
        }

        throw new Error(`Cannot create test | Unit '${unitName}' does not exist`);
    }

    public static createUnit<T extends object = any>(name: string, instance: T): void {
        UnitLib.units.set(name, {
            instance,
            name,
            tests: []
        });
    }

    protected static units: Map<string, IUnit> = new Map();

    protected static processUnit(unit: IUnit): void {
        console.log(`  [${unit.name}]`);
    }

    protected static async invokeTest(method: any, args: any[]): Promise<Error | null> {
        let resultError: Error | null = null;

        try {
            const result: any = method(...args);

            if (result instanceof Promise) {
                result.catch((error: Error) => {
                    resultError = error;
                });

                await result;
            }
        }
        catch (error) {
            resultError = error;
        }

        return resultError;
    }

    protected static async processTest(test: ITest): Promise<boolean> {
        // TODO: Inner array may still be referenced
        let testArgs: Array<any[]> = [...test.args];

        // Always run test at least once
        if (testArgs.length === 0) {
            testArgs = [[undefined]];
        }

        const errors: Error[] = [];

        // Feed all provided in-line data
        for await (const args of testArgs) {
            const error: Error | null = await UnitLib.invokeTest(test.instance, args);

            if (error !== null) {
                errors.push(error);
            }
        }

        const desc: string = colors.gray(test.description);
        const check: string = colors.green("√");
        const fail: string = colors.red("X");

        if (errors.length === 0) {
            console.log(`    ${check} ${desc}`);
        }
        else {
            console.log(`    ${fail} ${desc}`);

            for (const error of errors) {
                console.log(error.message);
            }
        }

        return errors.length === 0;
    }
}
