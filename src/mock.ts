import {Action} from "./runner";

/**
 * Represents a mock function implementation.
 */
export type MockImpl = (...args: any[]) => any;

/**
 * Represents a pipe callback function.
 */
export type Pipe = (call: ICall) => void;

/**
 * A registered function call.
 */
export interface ICall {
    readonly time: number;

    readonly args: any[];

    readonly result: any;
}

export default class Mock {
    /**
     * Create a Mock instance with the specified function. Proxy is automatically applied.
     * @param {*} target The target function to mock.
     * @return {Mock} A new mock class instance.
     */
    public static fn(target: any): Mock {
        return new Mock(target).apply();
    }

    /**
     * An empty function.
     */
    public static get emptyFn(): Action {
        return (): void => {};
    }

    /**
     * The calls performed against the target function or mocked implementation.
     */
    public readonly calls: ICall[];

    protected readonly singleMockStack: MockImpl[];

    protected readonly pipes: Pipe[];

    protected readonly original: any;

    protected target: any;

    protected permanentImpl?: MockImpl;

    /**
     * @param {*} target The target function to mock.
     */
    public constructor(target: any) {
        // Ensure target is a function
        if (typeof target !== "function") {
            throw new Error("Expecting target to be a function");
        }

        this.calls = [];
        this.singleMockStack = [];
        this.pipes = [];
        this.original = target;
        this.target = target;

        // Bind proxy with the local context.
        this.proxy = this.proxy.bind(this);
    }

    /**
     * Apply the proxy to the target, permanently overriding the target function with the proxy.
     */
    public apply(): this {
        this.target = this.proxy;

        return this;
    }

    /**
     * The invocation function that handles mocking of the target.
     * @param {Array<*>} args Arguments that will be passed to the target or mocked implementation.
     * @return {*} The returned result of the target or mocked implementation.
     */
    public proxy(...args: any[]): any {
        let result: any = undefined;

        // Create and register the call before invoking the implementation.
        const call: ICall = {
            args,
            result,
            time: Date.now()
        };

        this.calls.push(call);

        // Invoke the permanent implementation with priority.
        if (this.permanentImpl !== undefined) {
            result = this.permanentImpl(...args);
        }
        // Otherwise, invoke next mock in the stack.
        else if (this.singleMockStack.length > 0) {
            result = this.singleMockStack[0](...args);
            this.singleMockStack.splice(0, 1);
        }
        // Finally, if the single-mock stack is empty, invoke the original function.
        else {
            result = this.original(...args);
        }

        // Invoke all registered pipes.
        for (const pipe of this.pipes) {
            pipe(call);
        }

        return result;
    }

    /**
     * Mock the target's implementation once.
     * @param {MockImpl} impl The implementation.
     */
    public once(impl: MockImpl): this {
        // Permanent implementation cannot be set at this point.
        if (this.permanentImpl !== undefined) {
            throw new Error("Mock implementation has been previously locked as 'always'");
        }

        this.singleMockStack.push(impl);

        return this;
    }

    /**
     * Permanently mock the target's implementation.
     * @param {MockImpl | undefined} impl The implementation or undefined to remove permanent implementation.
     */
    public always(impl?: MockImpl): this {
        this.permanentImpl = impl;

        return this;
    }

    /**
     * Mock the target's return value once.
     */
    public returnOnce(result: any): this {
        return this.once((): any => result);
    }

    /**
     * Permanently mock the target's return value.
     */
    public returnAlways(result: any): this {
        return this.always((): any => result);
    }

    /**
     * Register callbacks which will be invoked after the target is invoked.
     * @param {Pipe[]} callbacks The calback(s) to register.
     */
    public pipe(...callbacks: Pipe[]): this {
        this.pipes.push(...callbacks);

        return this;
    }

    /**
     * Reset implementations and restore target to it's original state.
     */
    public get reset(): this {
        this.permanentImpl = undefined;
        this.singleMockStack.length = 0;
        this.pipes.length = 0;

        return this;
    }
}
