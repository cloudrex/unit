import {Unit, Test, Feed} from "../decorators";
import Assert from "../assert";

@Unit("Assert")
default class {
    @Test("assert")
    public that(): void {
        Assert.that(null, () => {
            return null;
        });
    }

    @Test("assert whether throws")
    public throws(): void {
        Assert.throws(() => {
            throw new Error("test");
        });
    }

    @Test("whether throws with message")
    public throwsWithMessage(): void {
        Assert.throws(() => {
            throw new Error("test");
        }, "test");
    }

    @Test("assert whether true")
    public true(): void {
        Assert.true(true);
    }

    @Test("assert whether false")
    public false(): void {
        Assert.false(false);
    }

    @Test("assert whether equal")
    @Feed("test", "test")
    @Feed(1, 1)
    @Feed(0, 0)
    @Feed(null, null)
    @Feed(undefined, undefined)
    @Feed(true, true)
    public equal(entity1: any, entity2: any): void {
        Assert.equal(entity1, entity2);
    }

    @Test("assert whether not equal")
    @Feed("john", "doe")
    @Feed(0, 1)
    @Feed(undefined, null)
    @Feed("", "test")
    @Feed(true, false)
    public notEqual(entity1: any, entity2: any): void {
        Assert.notEqual(entity1, entity2);
    }
}
