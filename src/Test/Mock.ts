import {Test, Unit, Target} from "../Decorators";
import Mock from "../Mock";
import Assert from "../Assert";
import {Is} from "../Is";

const emptyFn = (): void => {};

@Unit("Mock")
default class {
    @Test("Should return a mock instance upon statically creating mock")
    @Target(Mock.fn)
    public mockFn(): void {
        Assert.that(Mock.fn(emptyFn), Is.instanceOf(Mock));
    }

    @Test("Should register a single mock implementation")
    @Target(Mock.prototype.once)
    public once(): void {
        const mock: Mock = Mock.fn(emptyFn);

        // Verify mock stack is empty before.
        Assert.that(mock["singleMockStack"], Is.emptyArray);

        mock.once((): void => {});

        // Verify that the mock stack contains the new mock.
        Assert.that(mock["singleMockStack"], Is.arrayWithLength(1));
    }

    @Test("Should assign the permanent implementation")
    @Target(Mock.prototype.always)
    public always(): void {
        const mock: Mock = Mock.fn(emptyFn);

        // Verify mock permanent implementation is undefined.
        Assert.that(mock["permanentImpl"], Is.undefined);

        mock.always((): void => {});

        // Verify that the permanent implementation is assigned and that it is a function.
        Assert.that(mock["permanentImpl"], Is.function);
    }

    @Test("Should be able to remove permanent implementation")
    @Target(Mock.prototype.always)
    public alwaysRemove(): void {
        const mock: Mock = Mock.fn(emptyFn)
            .always((): void => {})
            .always();

        Assert.that(mock["permanentImpl"], Is.undefined);
    }

    @Test("Should invoke a mocked function")
    @Target(Mock.fn)
    public invoke(): void {
        let fn = (): number => 0;

        // Mock the test function.
        fn = Mock.fn(fn).proxy;

        Assert.equal(fn(), 0);
    }

    @Test("Should mock a function once with various implementations")
    @Target(Mock.prototype.once)
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

    @Test("Should mock a function result once")
    @Target(Mock.prototype.returnOnce)
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
