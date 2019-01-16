import colors from "colors";
import Util from "./util";
import {IRunnerOpts, DefaultOpts} from "./options";

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

export default abstract class Runner {
    public static before: Action | null = null;
    public static after: Action | null = null;

    public static async test(opts?: IRunnerOpts): Promise<void> {
        const options: IRunnerOpts = {
            ...DefaultOpts,
            ...opts
        };

        let successful: number = 0;
        let count: number = 0;

        for await (const [name, unit] of Runner.units) {
            Runner.processUnit(unit);

            for await (const test of unit.tests) {
                if (Runner.before !== null) {
                    Runner.before();
                }

                if (await Runner.processTest(test)) {
                    successful++;
                }

                if (Runner.after !== null) {
                    Runner.after();
                }

                count++;
            }
        }

        const succeeded: boolean = successful === count;

        console.log(colors.green(`\n  ${successful}/${count} {${Util.percentage(successful, count)}%} passing`));

        if (options.exit) {
            process.exit(succeeded ? options.successExitCode : options.failureExitCode);
        }
    }

    public static clear(): void {
        Runner.units.clear();
    }

    public static createTest(description: string, unitName: string, instance: any): void {
        if (Runner.units.has(unitName)) {
            const unit: IUnit = Runner.units.get(unitName) as IUnit;

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
        Runner.units.set(name, {
            instance,
            name,
            tests: []
        });
    }

    protected static units: Map<string, IUnit> = new Map();

    protected static processUnit(unit: IUnit): void {
        console.log(`  [${unit.name}]`);

        if (unit.tests.length === 0) {
            const question: string = colors.yellow("?");
            const desc: string = colors.gray("No tests defined");

            console.log(colors.yellow(`    ${question} ${desc}`));
        }
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
            const error: Error | null = await Runner.invokeTest(test.instance, args);

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
