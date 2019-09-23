export type TestCallback = () => Promise<boolean>;

export default class Unit {
    public static test(callback: TestCallback, description?: string): Unit {
        return new Unit(callback, description);
    }

    public readonly callback: TestCallback;

    public readonly description?: string;

    public constructor(callback: TestCallback, description?: string) {
        this.callback = callback;
        this.description = description;
    }

    public run(): Promise<boolean> {
        return this.callback();
    }
}
