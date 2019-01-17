import {Unit, Test, Feed} from "../decorators";
import Assert from "../assert";
import {Is} from "../is";
import {JsType} from "../runner";

@Unit("Is")
default class {
    @Test("should assert whether is empty")
    public empty(): void {
        Assert.that("", Is.empty);
    }

    @Test("should assert whether is null")
    public null(): void {
        Assert.that(null, Is.null);
    }

    @Test("should assert whether is undefined")
    public undefined(): void {
        Assert.that(undefined, Is.undefined);
    }

    @Test("should assert whether is positive")
    public positive(): void {
        Assert.that(1, Is.positive);
    }

    @Test("should assert whether is negative")
    public negative(): void {
        Assert.that(-1, Is.negative);
    }

    @Test("should assert whether is neutral")
    public neutral(): void {
        Assert.that(0, Is.neutral);
    }

    @Test("should assert whether is greater than")
    public greaterThan(): void {
        Assert.that(1, Is.greaterThan(0));
    }

    @Test("should assert whether is less than")
    public lessThan(): void {
        Assert.that(0, Is.lessThan(1));
    }

    @Test("should assert whether is NaN")
    public NaN(): void {
        Assert.that(0 / 0, Is.NaN);
    }

    @Test("should assert whether is array")
    public array(): void {
        Assert.that([], Is.array);
        Assert.that([1, 2, 3], Is.array);
        Assert.that([undefined, null], Is.array);
        Assert.that([""], Is.array);
    }

    @Test("should assert whether is array of type")
    @Feed([1, 2, 3], JsType.Number)
    @Feed(["john", "doe"], JsType.String)
    public arrayType(input: any[], type: JsType): void {
        Assert.that(input, Is.arrayOf(type));
    }
}
