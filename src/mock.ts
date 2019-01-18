export type MockImplementation = (...args: any[]) => any;

export interface ICall {
    readonly time: number;
    readonly args: any[];
    readonly result: any;
}

export default class Mock {
    public static fn(): Mock {
        const result: Mock = new Mock();

        return result;
    }

    protected readonly calls: ICall[];
    protected readonly impl?: MockImplementation;

    public constructor() {
        this.calls = [];
        this.impl = undefined;
    }

    public invoker(...args: any[]): this {
        let result: any = undefined;

        if (this.impl !== undefined) {
            result = this.impl();
        }

        this.calls.push({
            args,
            result,
            time: Date.now()
        });

        return this;
    }
}
