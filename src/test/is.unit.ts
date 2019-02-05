import {test, unit, feed} from "../decorators";
import Assert from "../assert";
import {Is} from "../is";
import {JsType} from "../runner";

@unit("Is")
default class {
    @test("assert whether is empty")
    @feed("")
    @feed(null)
    @feed(undefined)
    @feed([])
    @feed({})
    public empty(input: any): void {
        Assert.that(input, Is.empty);
    }

    @test("assert whether is empty string")
    @feed("")
    public emptyString(input: string): void {
        Assert.that(input, Is.emptyString);
    }

    @test("assert whether is null")
    @feed(null)
    public null(input: any): void {
        Assert.that(input, Is.null);
    }

    @test("assert whether is undefined")
    @feed(undefined)
    public undefined(input: any): void {
        Assert.that(input, Is.undefined);
    }

    @test("assert whether is positive")
    @feed(1)
    public positive(input: number): void {
        Assert.that(input, Is.positive);
    }

    @test("assert whether is negative")
    @feed(-1)
    public negative(input: number): void {
        Assert.that(input, Is.negative);
    }

    @test("assert whether is neutral")
    @feed(0)
    public neutral(input: number): void {
        Assert.that(input, Is.neutral);
    }

    @test("assert whether is greater than")
    @feed(1, 0)
    @feed(-1, -2)
    @feed(0, -1)
    public greaterThan(input: number, greaterThan: number): void {
        Assert.that(input, Is.greaterThan(greaterThan));
    }

    @test("assert whether is less than")
    @feed(0, 1)
    @feed(-2, -1)
    @feed(-1, 0)
    public lessThan(input: number, lessThan: number): void {
        Assert.that(input, Is.lessThan(lessThan));
    }

    @test("assert whether is NaN")
    @feed(0 / 0)
    public NaN(input: number): void {
        Assert.that(input, Is.NaN);
    }

    @test("assert whether is array")
    @feed([])
    @feed([1, 2, 3])
    @feed([undefined, null])
    @feed([""])
    public array(input: any[]): void {
        Assert.that(input, Is.array);
    }

    @test("assert whether is array of type")
    @feed([1, 2, 3], JsType.Number)
    @feed(["john", "doe"], JsType.String)
    public arrayType(input: any[], type: JsType): void {
        Assert.that(input, Is.arrayOf(type));
    }

    @test("assert whether is odd")
    @feed(1)
    @feed(3)
    @feed(-1)
    @feed(-3)
    public odd(input: number): void {
        Assert.that(input, Is.odd);
    }

    @test("assert whether is even")
    @feed(0)
    @feed(2)
    @feed(-2)
    public even(input: number): void {
        Assert.that(input, Is.even);
    }
}
