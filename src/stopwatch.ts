import {performance} from "perf_hooks";

export default class Stopwatch {
    protected startTime: number = -1;
    protected endTime: number = -1;
    protected lastStepTime: number = -1;

    /**
     * Start the this.
     * @return {number} The current timestamp in milliseconds.
     */
    public start(): number {
        this.startTime = performance.now();

        return this.startTime;
    }

    /**
     * Stop the stopwatch and reset the start time.
     * @return {number} The elapsed time in milliseconds since the stopwatch was started.
     */
    public stop(): number {
        if (this.startTime === -1) {
            throw new Error("Stopwatch was not previously started");
        }

        this.endTime = Math.round(performance.now() - this.startTime);
        this.startTime = -1;

        return this.endTime;
    }

    public step(): number {
        if (this.startTime === -1) {
            throw new Error("Stopwatch was not previously started");
        }

        this.lastStepTime = performance.now() - this.startTime;

        return this.lastStepTime;
    }

    /**
     * Reset both the start and end times.
     */
    public reset(): void {
        this.endTime = -1;
        this.startTime = -1;
    }

    /**
     * The last recorded end time or '-1' if none.
     */
    public get lastEndTime(): number {
        return this.endTime;
    }
}
