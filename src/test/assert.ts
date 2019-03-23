import {Test, Unit, Feed, Target} from "../decorators";
import Assert from "../assert";

@Unit("Assert")
default class {
    @Test("Should assert")
    @Target(Assert.that)
    public that(): void {
        Assert.that(null, () => {
            return null;
        });
    }

    @Test("Should assert whether throws")
    @Target(Assert.throws)
    public throws(): void {
        Assert.throws(() => {
            throw new Error("test");
        });
    }

    @Test("Should whether throws with message")
    @Target(Assert.throws)
    public throwsWithMessage(): void {
        Assert.throws(() => {
            throw new Error("test");
        }, "test");
    }

    @Test("Should assert whether true")
    @Target(Assert.true)
    public true(): void {
        Assert.true(true);
    }

    @Test("Should assert whether false")
    @Target(Assert.false)
    public false(): void {
        Assert.false(false);
    }

    @Test("Should assert whether equal")
    @Target(Assert.equal)
    @Feed("test", "test")
    @Feed(1, 1)
    @Feed(0, 0)
    @Feed(null, null)
    @Feed(undefined, undefined)
    @Feed(true, true)
    public equal(entity1: any, entity2: any): void {
        Assert.equal(entity1, entity2);
    }

    @Test("Should assert whether not equal")
    @Target(Assert.notEqual)
    @Feed("john", "doe")
    @Feed(0, 1)
    @Feed(undefined, null)
    @Feed("", "test")
    @Feed(true, false)
    public notEqual(entity1: any, entity2: any): void {
        Assert.notEqual(entity1, entity2);
    }
}
