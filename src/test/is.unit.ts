import {Unit, Test, Feed} from "../decorators";
import Assert from "../assert";
import {Is} from "../is";
import {JsType} from "../runner";

@Unit("Is")
default class {
    @Test("should assert whether is empty")
    @Feed("")
    @Feed(null)
    @Feed(undefined)
    @Feed([])
    @Feed({})
    public empty(input: any): void {
        Assert.that(input, Is.empty);
    }

    @Test("should assert whether is empty string")
    @Feed("")
    public emptyString(input: string): void {
        Assert.that(input, Is.emptyString);
    }

    @Test("should assert whether is null")
    @Feed(null)
    public null(input: any): void {
        Assert.that(input, Is.null);
    }

    @Test("should assert whether is undefined")
    @Feed(undefined)
    public undefined(input: any): void {
        Assert.that(input, Is.undefined);
    }

    @Test("should assert whether is positive")
    @Feed(1)
    public positive(input: number): void {
        Assert.that(input, Is.positive);
    }

    @Test("should assert whether is negative")
    @Feed(-1)
    public negative(input: number): void {
        Assert.that(input, Is.negative);
    }

    @Test("should assert whether is neutral")
    @Feed(0)
    public neutral(input: number): void {
        Assert.that(input, Is.neutral);
    }

    @Test("should assert whether is greater than")
    @Feed(1, 0)
    @Feed(-1, -2)
    @Feed(0, -1)
    public greaterThan(input: number, greaterThan: number): void {
        Assert.that(input, Is.greaterThan(greaterThan));
    }

    @Test("should assert whether is less than")
    @Feed(0, 1)
    @Feed(-2, -1)
    @Feed(-1, 0)
    public lessThan(input: number, lessThan: number): void {
        Assert.that(input, Is.lessThan(lessThan));
    }

    @Test("should assert whether is NaN")
    @Feed(0 / 0)
    public NaN(input: number): void {
        Assert.that(input, Is.NaN);
    }

    @Test("should assert whether is array")
    @Feed([])
    @Feed([1, 2, 3])
    @Feed([undefined, null])
    @Feed([""])
    public array(input: any[]): void {
        Assert.that(input, Is.array);
    }

    @Test("should assert whether is array of type")
    @Feed([1, 2, 3], JsType.Number)
    @Feed(["john", "doe"], JsType.String)
    public arrayType(input: any[], type: JsType): void {
        Assert.that(input, Is.arrayOf(type));
    }
}
