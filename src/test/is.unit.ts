import {Unit, Test} from "../decorators";
import Assert from "../assert";
import {Is} from "../is";

@Unit("Is")
default class {
    @Test("should assert whether is empty")
    public isEmpty(): void {
        Assert.that("", Is.empty);
    }

    @Test("should assert whether is null")
    public isNull(): void {
        Assert.that(null, Is.null);
    }

    @Test("should assert whether is undefined")
    public isUndefined(): void {
        Assert.that(undefined, Is.undefined);
    }

    @Test("should assert whether is positive")
    public isPositive(): void {
        Assert.that(1, Is.positive);
    }

    @Test("should assert whether is negative")
    public isNegative(): void {
        Assert.that(-1, Is.negative);
    }

    @Test("should assert whether is neutral")
    public isNeutral(): void {
        Assert.that(0, Is.neutral);
    }

    @Test("should assert whether is greater than")
    public isGreaterThan(): void {
        Assert.that(1, Is.greaterThan(0));
    }

    @Test("should assert whether is less than")
    public isLessThan(): void {
        Assert.that(0, Is.lessThan(1));
    }

    @Test("should assert whether is NaN")
    public isNaN(): void {
        Assert.that(0 / 0, Is.NaN);
    }
}
