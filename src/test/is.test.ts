import {Unit, Test} from "../decorators";
import Assert from "../assert";
import {Is} from "../is";

@Unit("Is")
abstract class IsTests {
    @Test("should assert whether is empty")
    public thatIsEmpty(): void {
        Assert.that("", Is.empty);
    }

    @Test("should assert whether is null")
    public thatIsNull(): void {
        Assert.that(null, Is.null);
    }

    @Test("should assert whether is undefined")
    public thatIsUndefined(): void {
        Assert.that(undefined, Is.undefined);
    }

    @Test("should assert whether is positive")
    public thatIsPositive(): void {
        Assert.that(1, Is.positive);
    }

    @Test("should assert whether is negative")
    public thatIsNegative(): void {
        Assert.that(-1, Is.negative);
    }

    @Test("should assert whether is neutral")
    public thatIsNeutral(): void {
        Assert.that(0, Is.neutral);
    }

    @Test("should assert whether is greater than")
    public thatIsGreaterThan(): void {
        Assert.that(1, Is.greaterThan(0));
    }

    @Test("should assert whether is less than")
    public thatIsLessThan(): void {
        Assert.that(0, Is.lessThan(1));
    }

    @Test("should assert whether is NaN")
    public thatIsNaN(): void {
        Assert.that(0 / 0, Is.NaN);
    }
}
