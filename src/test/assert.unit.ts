import {test, unit, feed} from "../decorators";
import Assert from "../assert";

@unit("Assert")
default class {
    @test("assert")
    public that(): void {
        Assert.that(null, () => {
            return null;
        });
    }

    @test("assert whether throws")
    public throws(): void {
        Assert.throws(() => {
            throw new Error("test");
        });
    }

    @test("whether throws with message")
    public throwsWithMessage(): void {
        Assert.throws(() => {
            throw new Error("test");
        }, "test");
    }

    @test("assert whether true")
    public true(): void {
        Assert.true(true);
    }

    @test("assert whether false")
    public false(): void {
        Assert.false(false);
    }

    @test("assert whether equal")
    @feed("test", "test")
    @feed(1, 1)
    @feed(0, 0)
    @feed(null, null)
    @feed(undefined, undefined)
    @feed(true, true)
    public equal(entity1: any, entity2: any): void {
        Assert.equal(entity1, entity2);
    }

    @test("assert whether not equal")
    @feed("john", "doe")
    @feed(0, 1)
    @feed(undefined, null)
    @feed("", "test")
    @feed(true, false)
    public notEqual(entity1: any, entity2: any): void {
        Assert.notEqual(entity1, entity2);
    }
}
