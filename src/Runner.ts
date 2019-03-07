import colors from "colors";
import Util from "./Util";
import {IRunnerOpts, DefaultOpts} from "./Options";
import Stopwatch from "./Stopwatch";

/**
 * Representation of a single test.
 */
export interface ITest {
    readonly description: string;
    readonly instance: (...args: any[]) => void;
    readonly args: Array<any[]>;
}

/**
 * Representation of a unit test.
 */
export interface IUnit<T = any> {
    readonly name: string;
    readonly instance: T;
    readonly tests: ITest[];
}

interface InvocationResult {
    error?: Error;
    time: number;
}

/**
 * Represents the various possible JavaScript entity types.
 */
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

/**
 * An assertion rule that must be met.
 */
export type Constraint = (...args: any[]) => string | null;

/**
 * Represents an empty function.
 */
export type Action = () => void;

export default abstract class Runner {
    /**
     * The callback function that will be invoked before every test.
     */
    public static before: Action | null = null;

    /**
     * The callback function that will be invoked after every test.
     */
    public static after: Action | null = null;

    /**
     * Run all registered tests.
     */
    public static async test(opts?: Partial<IRunnerOpts>): Promise<void> {
        const options: IRunnerOpts = {
            ...DefaultOpts,
            ...opts
        };

        const watch: Stopwatch = new Stopwatch();

        let firstUnit: boolean = true;
        let successful: number = 0;
        let count: number = 0;

        watch.start();

        for await (const unit of Runner.units.values()) {
            Runner.processUnit(unit, firstUnit);

            for await (const test of unit.tests) {
                if (Runner.before !== null) {
                    Runner.before();
                }

                if (await Runner.processTest(test, count === Runner.units.size - 1, options.shouldPrefix, options.measureTime)) {
                    successful++;
                }

                if (Runner.after !== null) {
                    Runner.after();
                }

                count++;
            }

            firstUnit = false;
        }

        const succeeded: boolean = successful === count;
        const timeSuffix: string = colors.gray(`(${watch.stop()}ms)`);

        console.log(colors.green(`\n  ${successful}/${count} {${Util.percentage(successful, count)}%} passing ${timeSuffix}\n`));

        if (options.exit) {
            process.exit(succeeded ? options.successExitCode : options.failureExitCode);
        }
    }

    /**
     * Clear all registered unit tests.
     */
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

    protected static processUnit(unit: IUnit, first: boolean = false): void {
        const name: string = colors.cyan(`[${unit.name}]\n`);

        console.log(`${!first ? "\n" : ""}  ${name}`);

        // No tests have been defined for this unit.
        if (unit.tests.length === 0) {
            const question: string = colors.yellow("?");
            const desc: string = colors.gray("No tests defined");

            console.log(colors.yellow(`    ${question} ${desc}`));
        }
    }

    protected static async invokeTest(method: any, args: any[]): Promise<InvocationResult> {
        let invokeResult: InvocationResult = {
            time: 0
        };

        const watch: Stopwatch = new Stopwatch();

        watch.start();

        try {
            const result: any = method(...args);

            if (result instanceof Promise) {
                result.catch((error: Error) => {
                    invokeResult.error = error;
                });

                await result;
            }
        }
        catch (error) {
            invokeResult.error = error;
        }

        invokeResult.time = watch.stop();

        return invokeResult;
    }

    protected static async processTest(test: ITest, isLast: boolean, shouldPrefix: boolean = false, measure: boolean = false): Promise<boolean> {
        // TODO: Inner array may still be referenced.
        let testArgs: Array<any[]> = [...test.args];

        // Always run test at least once.
        if (testArgs.length === 0) {
            testArgs = [[undefined]];
        }

        const errors: Error[] = [];

        let totalTime: number = 0;

        // Feed all provided in-line data.
        for await (const args of testArgs) {
            const result: InvocationResult = await Runner.invokeTest(test.instance, args);

            if (result.error !== undefined) {
                errors.push(result.error);
            }

            if (measure) {
                totalTime += result.time;
            }
        }

        const desc: string = colors.gray(test.description);
        const check: string = colors.green("√");
        const fail: string = colors.red("X");

        // Create prefix string.
        let prefixStr: string = "";

        // Append target method name if applicable.
        const target: string | undefined = (test.instance as any).$$unit_target;

        if (target !== undefined) {
            prefixStr += colors.bold.gray(target + "()");
        }

        // Append 'should' to the prefix if applicable.
        if (shouldPrefix) {
            // Append an extra space to separate target if applicable.
            if (target !== undefined) {
                prefixStr += " ";
            }

            prefixStr += colors.gray("Should")
        }

        // Append an extra space to separate from 'desc' if applicable.
        if (prefixStr !== "") {
            prefixStr += " ";
        }

        // Finally, create the time string.
        let timeStr: string = measure ? colors.gray(`${totalTime}ms `) : "";

        if (measure) {
            if (totalTime >= 3000) {
                timeStr = colors.red(timeStr);
            }
            else if (totalTime >= 1500) {
                timeStr = colors.yellow(timeStr);
            }
        }

        if (errors.length === 0) {
            console.log(`    ${timeStr}${check} ${prefixStr}${desc}`);
        }
        else {
            console.log(`    ${timeStr}${fail} ${prefixStr}${desc}\n`);

            let counter: number = 1;

            for (const error of errors) {
                console.log("      " + colors.gray(`${counter}. `) + colors.red(error.message));
                counter++;
            }

            if (!isLast) {
                console.log();
            }
        }

        return errors.length === 0;
    }
}
