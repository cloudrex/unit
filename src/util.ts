export default abstract class Util {
    /**
     * Determine whether an object or string is empty or missing value
     * @param {*} input
     * @return {boolean}
     */
    public static isEmpty(input: any): boolean {
        return input === undefined || input === null || input.toString().trim() === "" || (Array.isArray(input) && input.length === 0);
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
}
