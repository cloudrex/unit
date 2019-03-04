export default abstract class Util {
    /**
     * Determine whether the input is empty or missing value.
     */
    public static isEmpty(input: any): boolean {
        return input === undefined
            || input === null
            || input.toString().trim() === ""
            || (Array.isArray(input) && input.length === 0)
            || typeof input === "object" && Object.keys(input).length === 0;
    }

    public static percentage(amount: number, max: number): number {
        if (amount < 0 || max < 0) {
            throw new Error("Expecting parameters to be neutral or positive numbers");
        }

        // Prevent overflows by dividing by zero
        if (amount === 0 && max === 0) {
            return 100;
        }
        else if (max === 0) {
            return 0;
        }

        return Math.round(amount / max * 100);
    }

    public static isEven(num: number): boolean {
        return Math.abs(num) % 2 === 0;
    }

    /**
     * Extract the name of a method. Returns 'anonymous' if method has no name.
     */
    public static extractMethodName(method: any): string {
        return method.name || "anonymous";
    }
}
