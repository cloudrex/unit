import {test, unit, feed} from "../decorators";
import Does from "../does";
import Assert from "../assert";

@unit("Does")
default class {
    @test("assert whether ends with")
    @feed("john doe", "doe")
    @feed("john doe", "john doe")
    @feed("doe", "e")
    public endWith(input: string, expected: string): void {
        Assert.that(input, Does.endWith(expected));
    }

    @test("assert whether starts with")
    @feed("john doe", "john")
    @feed("john doe", "john doe")
    @feed("doe", "d")
    public startWith(input: string, expected: string): void {
        Assert.that(input, Does.startWith(expected));
    }

    @test("assert whether matches pattern")
    @feed("john doe", /^john/)
    @feed("john doe", /doe$/)
    public match(input: string, pattern: RegExp): void {
        Assert.that(input, Does.match(pattern));
    }

    @test("assert whether has property")
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

    @test("assert whether has length")
    @feed([], 0)
    @feed(["john"], 1)
    @feed(["john", "doe"], 2)
    public haveLength(arr: any[], length: number): void {
        Assert.that(arr, Does.haveLength(length));
    }
}
