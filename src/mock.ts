export type MockImplementation = (...args: any[]) => any;
export type Pipe = (call: ICall) => void;

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

    public readonly calls: ICall[];

    protected readonly mockStack: MockImplementation[];
    protected readonly pipes: Pipe[];

    protected impl?: MockImplementation;

    public constructor() {
        this.calls = [];
        this.mockStack = [];
        this.pipes = [];
    }

    public invoker(...args: any[]): this {
        let result: any = undefined;

        if (this.impl !== undefined) {
            result = this.impl();
        }

        const call: ICall = {
            args,
            result,
            time: Date.now()
        };

        this.calls.push(call);

        for (const pipe of this.pipes) {
            pipe(call);
        }

        return this;
    }

    public once(impl: MockImplementation): this {
        if (this.impl !== undefined) {
            throw new Error("Implementation has been previously locked as 'always'");
        }

        this.mockStack.push(impl);

        return this;
    }

    public always(impl?: MockImplementation): this {
        this.impl = impl;

        return this;
    }

    public pipe(...callbacks: Pipe[]): this {
        this.pipes.push(...callbacks);

        return this;
    }

    public reset(): this {
        this.impl = undefined;
        this.mockStack.length = 0;
        this.pipes.length = 0;

        return this;
    }
}
