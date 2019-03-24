import {test, unit, feed, target} from "../decorators";
import Does from "../does";
import Assert from "../assert";

@unit("Does")
default class {
    @test("Should assert whether ends with")
    @target(Does.endWith)
    @feed("john doe", "doe")
    @feed("john doe", "john doe")
    @feed("doe", "e")
    public endWith(input: string, expected: string): void {
        Assert.that(input, Does.endWith(expected));
    }

    @test("Should assert whether starts with")
    @target(Does.startWith)
    @feed("john doe", "john")
    @feed("john doe", "john doe")
    @feed("doe", "d")
    public startWith(input: string, expected: string): void {
        Assert.that(input, Does.startWith(expected));
    }

    @test("Should assert whether matches pattern")
    @target(Does.match)
    @feed("john doe", /^john/)
    @feed("john doe", /doe$/)
    public match(input: string, pattern: RegExp): void {
        Assert.that(input, Does.match(pattern));
    }

    @test("Should assert whether has property")
    @target(Does.haveProperty)
    @feed({
        name: "john"
    }, "name")
    @feed({
        name: "doe",
        age: 21
    }, "age")
    @feed([], "length")
    public haveProperty(obj: object, name: string): void {
        Assert.that(obj, Does.haveProperty(name));
    }

    @test("Should assert whether has length")
    @target(Does.haveLength)
    @feed([], 0)
    @feed(["john"], 1)
    @feed(["john", "doe"], 2)
    public haveLength(arr: any[], length: number): void {
        Assert.that(arr, Does.haveLength(length));
    }
}
