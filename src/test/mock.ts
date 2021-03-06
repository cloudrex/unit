import {test, unit, target} from "../decorators";
import Mock from "../mock";
import Assert from "../assert";
import {Is} from "../is";

const emptyFn = (): void => {};

@unit("Mock")
default class {
    @test("should return a mock instance upon statically creating mock")
    @target(Mock.fn)
    public mockFn(): void {
        Assert.that(Mock.fn(emptyFn), Is.instanceOf(Mock));
    }

    @test("should register a single mock implementation")
    @target(Mock.prototype.once)
    public once(): void {
        const mock: Mock = Mock.fn(emptyFn);

        // Verify mock stack is empty before.
        Assert.that(mock["singleMockStack"], Is.emptyArray);

        mock.once((): void => {});

        // Verify that the mock stack contains the new mock.
        Assert.that(mock["singleMockStack"], Is.arrayWithLength(1));
    }

    @test("should assign the permanent implementation")
    @target(Mock.prototype.always)
    public always(): void {
        const mock: Mock = Mock.fn(emptyFn);

        // Verify mock permanent implementation is undefined.
        Assert.that(mock["permanentImpl"], Is.undefined);

        mock.always((): void => {});

        // Verify that the permanent implementation is assigned and that it is a function.
        Assert.that(mock["permanentImpl"], Is.function);
    }

    @test("should be able to remove permanent implementation")
    @target(Mock.prototype.always)
    public alwaysRemove(): void {
        const mock: Mock = Mock.fn(emptyFn)
            .always((): void => {})
            .always();

        Assert.that(mock["permanentImpl"], Is.undefined);
    }

    @test("should invoke a mocked function")
    @target(Mock.fn)
    public invoke(): void {
        let fn = (): number => 0;

        // Mock the test function.
        fn = Mock.fn(fn).proxy;

        Assert.equal(fn(), 0);
    }

    @test("should mock a function once with various implementations")
    @target(Mock.prototype.once)
    public onceMultiple(): void {
        let fn = (): number => 1;

        fn = Mock.fn(fn)
            .once((): number => 2)
            .once((): number => 3)
            .proxy;

        Assert.equal(fn(), 2);
        Assert.equal(fn(), 3);
        Assert.equal(fn(), 1);
    }

    @test("should mock a function result once")
    @target(Mock.prototype.returnOnce)
    public onceResult(): void {
        let fn = (): number => 1;

        // Mock the test function.
        fn = Mock.fn(fn)
            .returnOnce(2)
            .proxy;

        Assert.equal(fn(), 2);
        Assert.equal(fn(), 1);
    }
}
