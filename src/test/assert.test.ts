import {TestUnit, Test} from "../decorators";
import Assert from "../assert";
import {Is} from "../is";

@TestUnit("Assert.throws")
export abstract class AssertThrows {
    @Test("should assert")
    public throws(): void {
        Assert.throws(() => {
            throw new Error("test");
        });
    }

    @Test("should assert with message")
    public throwsWithMessage(): void {
        Assert.throws(() => {
            throw new Error("test");
        }, "test");
    }
}

@TestUnit("Assert.true")
export abstract class AssertTrue {
    @Test("should assert")
    public true(): void {
        Assert.true(true);
    }
}

@TestUnit("Assert.false")
export abstract class AssertFalse {
    @Test("should assert")
    public false(): void {
        Assert.false(false);
    }
}

@TestUnit("Assert.that")
export abstract class AssertThat {
    @Test("should assert")
    public that(): void {
        Assert.that(null, () => {
            return null;
        });
    }

    @Test("should assert whether input is empty")
    public thatIsEmpty(): void {
        Assert.that("", Is.empty);
    }
}
