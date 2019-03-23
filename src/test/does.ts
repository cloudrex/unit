import {Test, Unit, Feed, Target} from "../decorators";
import Does from "../does";
import Assert from "../assert";

@Unit("Does")
default class {
    @Test("Should assert whether ends with")
    @Target(Does.endWith)
    @Feed("john doe", "doe")
    @Feed("john doe", "john doe")
    @Feed("doe", "e")
    public endWith(input: string, expected: string): void {
        Assert.that(input, Does.endWith(expected));
    }

    @Test("Should assert whether starts with")
    @Target(Does.startWith)
    @Feed("john doe", "john")
    @Feed("john doe", "john doe")
    @Feed("doe", "d")
    public startWith(input: string, expected: string): void {
        Assert.that(input, Does.startWith(expected));
    }

    @Test("Should assert whether matches pattern")
    @Target(Does.match)
    @Feed("john doe", /^john/)
    @Feed("john doe", /doe$/)
    public match(input: string, pattern: RegExp): void {
        Assert.that(input, Does.match(pattern));
    }

    @Test("Should assert whether has property")
    @Target(Does.haveProperty)
    @Feed({
        name: "john"
    }, "name")
    @Feed({
        name: "doe",
        age: 21
    }, "age")
    @Feed([], "length")
    public haveProperty(obj: object, name: string): void {
        Assert.that(obj, Does.haveProperty(name));
    }

    @Test("Should assert whether has length")
    @Target(Does.haveLength)
    @Feed([], 0)
    @Feed(["john"], 1)
    @Feed(["john", "doe"], 2)
    public haveLength(arr: any[], length: number): void {
        Assert.that(arr, Does.haveLength(length));
    }
}
