import {test, unit, feed, target} from "../decorators";
import Assert from "../assert";

@unit("Assert")
default class {
    @test("should assert")
    @target(Assert.that)
    public that(): void {
        Assert.that(null, () => {
            return null;
        });
    }

    @test("should assert whether throws")
    @target(Assert.throws)
    public throws(): void {
        Assert.throws(() => {
            throw new Error("test");
        });
    }

    @test("should whether throws with message")
    @target(Assert.throws)
    public throwsWithMessage(): void {
        Assert.throws(() => {
            throw new Error("test");
        }, "test");
    }

    @test("should assert whether true")
    @target(Assert.true)
    public true(): void {
        Assert.true(true);
    }

    @test("should assert whether false")
    @target(Assert.false)
    public false(): void {
        Assert.false(false);
    }

    @test("should assert whether equal")
    @target(Assert.equal)
    @feed("test", "test")
    @feed(1, 1)
    @feed(0, 0)
    @feed(null, null)
    @feed(undefined, undefined)
    @feed(true, true)
    public equal(entity1: any, entity2: any): void {
        Assert.equal(entity1, entity2);
    }

    @test("should assert whether not equal")
    @target(Assert.notEqual)
    @feed("john", "doe")
    @feed(0, 1)
    @feed(undefined, null)
    @feed("", "test")
    @feed(true, false)
    public notEqual(entity1: any, entity2: any): void {
        Assert.notEqual(entity1, entity2);
    }
}
