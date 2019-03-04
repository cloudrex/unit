import {Test, Unit, Feed} from "../Decorators";
import Assert from "../Assert";

@Unit("Assert")
default class {
    @Test("should assert")
    public that(): void {
        Assert.that(null, () => {
            return null;
        });
    }

    @Test("should assert whether throws")
    public throws(): void {
        Assert.throws(() => {
            throw new Error("test");
        });
    }

    @Test("should whether throws with message")
    public throwsWithMessage(): void {
        Assert.throws(() => {
            throw new Error("test");
        }, "test");
    }

    @Test("should assert whether true")
    public true(): void {
        Assert.true(true);
    }

    @Test("should assert whether false")
    public false(): void {
        Assert.false(false);
    }

    @Test("should assert whether equal")
    @Feed("test", "test")
    @Feed(1, 1)
    @Feed(0, 0)
    @Feed(null, null)
    @Feed(undefined, undefined)
    @Feed(true, true)
    public equal(entity1: any, entity2: any): void {
        Assert.equal(entity1, entity2);
    }

    @Test("should assert whether not equal")
    @Feed("john", "doe")
    @Feed(0, 1)
    @Feed(undefined, null)
    @Feed("", "test")
    @Feed(true, false)
    public notEqual(entity1: any, entity2: any): void {
        Assert.notEqual(entity1, entity2);
    }
}
