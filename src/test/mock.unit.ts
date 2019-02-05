import {test, unit} from "../decorators";
import Mock from "../mock";
import Assert from "../assert";
import {Is} from "../is";

const emptyFn = (): void => {};

@unit("Mock")
default class {
    @test("return a mock instance upon statically creating mock")
    public mockFn(): void {
        Assert.that(Mock.fn(emptyFn), Is.instanceOf(Mock));
    }

    @test("register a single mock implementation")
    public once(): void {
        const mock: Mock = Mock.fn(emptyFn);

        // Verify mock stack is empty before.
        Assert.that(mock["singleMockStack"], Is.emptyArray);

        mock.once((): void => {});

        // Verify that the mock stack contains the new mock.
        Assert.that(mock["singleMockStack"], Is.arrayWithLength(1));
    }

    @test("assign the permanent implementation")
    public always(): void {
        const mock: Mock = Mock.fn(emptyFn);

        // Verify mock permanent implementation is undefined.
        Assert.that(mock["permanentImpl"], Is.undefined);

        mock.always((): void => {});

        // Verify that the permanent implementation is assigned and that it is a function.
        Assert.that(mock["permanentImpl"], Is.function);
    }

    @test("be able to remove permanent implementation")
    public alwaysRemove(): void {
        const mock: Mock = Mock.fn(emptyFn)
            .always((): void => {})
            .always();

        Assert.that(mock["permanentImpl"], Is.undefined);
    }

    @test("invoke a mocked function")
    public invoke(): void {
        let fn = (): number => 0;

        // Mock the test function.
        fn = Mock.fn(fn).proxy;

        Assert.equal(fn(), 0);
    }

    @test("mock a function once with various implementations")
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

    @test("mock a function result once")
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
