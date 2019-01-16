import colors from "colors";
import Util from "./util";

export interface ITest {
    readonly description: string;
    readonly invoke: () => void;
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

export default abstract class Unit {
    public static async test(): Promise<void> {
        let successful: number = 0;
        let count: number = 0;

        for (const [name, unit] of Unit.units) {
            Unit.processUnit(unit);

            for (const test of unit.tests) {
                if (await Unit.processTest(test)) {
                    successful++;
                }

                count++;
            }
        }

        console.log(colors.green(`\n  ${successful}/${count} {${Util.percentage(successful, count)}%} passing`));
    }

    public static clear(): void {
        Unit.units.clear();
    }

    public static createTest(description: string, unitName: string, instance: any): void {
        if (Unit.units.has(unitName)) {
            const unit: IUnit = Unit.units.get(unitName) as IUnit;

            unit.tests.push({
                description,
                invoke: instance
            });

            return;
        }

        throw new Error(`Cannot create test | Unit '${unitName}' does not exist`);
    }

    public static createUnit<T extends object = any>(name: string, instance: T): void {
        Unit.units.set(name, {
            instance,
            name,
            tests: []
        });
    }

    protected static units: Map<string, IUnit> = new Map();

    protected static processUnit(unit: IUnit): void {
        console.log(`  [${unit.name}]`);
    }

    // TODO: Use depth
    protected static async processTest(test: ITest, depth: number = 0): Promise<boolean> {
        let resultError: Error | null = null;

        try {
            const result: any = test.invoke();

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

        const desc: string = colors.gray(test.description);
        const check: string = colors.green("√");
        const fail: string = colors.red("X");

        if (resultError === null) {
            console.log(`    ${check} ${desc}`);
        }
        else {
            console.log(`    ${fail} ${desc}`);
            console.log(resultError.message);
        }

        return resultError === null;
    }
}
