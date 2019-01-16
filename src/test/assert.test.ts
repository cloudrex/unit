import {Unit, Test, Feed} from "../decorators";
import Assert from "../assert";

@Unit("Assert")
abstract class AssertTests {
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
}
