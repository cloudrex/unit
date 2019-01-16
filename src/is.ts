import {TestConstraint, JsType} from "./unit";
import Util from "./util";

export abstract class Is {
    public static get null(): TestConstraint {
        return (input: any) => {
            if (input === null) {
                return null;
            }

            return `Expected '${input}' to be null`;
        };
    }

    public static get undefined(): TestConstraint {
        return (input: any) => {
            if (input === undefined) {
                return null;
            }

            return `Expected '${input}' to be undefined`;
        };
    }

    public static inRange(from: number, to: number): TestConstraint {
        return (input: number) => {
            if (typeof input !== "number") {
                return `Expected '${input}' to be a number`;
            }
            else if (input >= from && input <= to) {
                return null;
            }

            return `Expected '${input}' to be within range ${from}-${to}`;
        };
    }

    public static get empty(): TestConstraint {
        return (input: any) => {
            if (Util.isEmpty(input)) {
                return null;
            }

            return `Expected '${input}' to be empty`;
        };
    }

    public static type(type: JsType): TestConstraint {
        return (input: any) => {
            const inputType: JsType = typeof input as JsType;

            if (inputType === type) {
                return null;
            }

            return `Expected '${input}' to be of type '${type}' but got '${inputType}'`;
        };
    }
}
