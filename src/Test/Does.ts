import {Test, Unit, Feed} from "../Decorators";
import Does from "../Does";
import Assert from "../Assert";

@Unit("Does")
default class {
    @Test("should assert whether ends with")
    @Feed("john doe", "doe")
    @Feed("john doe", "john doe")
    @Feed("doe", "e")
    public endWith(input: string, expected: string): void {
        Assert.that(input, Does.endWith(expected));
    }

    @Test("should assert whether starts with")
    @Feed("john doe", "john")
    @Feed("john doe", "john doe")
    @Feed("doe", "d")
    public startWith(input: string, expected: string): void {
        Assert.that(input, Does.startWith(expected));
    }

    @Test("should assert whether matches pattern")
    @Feed("john doe", /^john/)
    @Feed("john doe", /doe$/)
    public match(input: string, pattern: RegExp): void {
        Assert.that(input, Does.match(pattern));
    }

    @Test("should assert whether has property")
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

    @Test("should assert whether has length")
    @Feed([], 0)
    @Feed(["john"], 1)
    @Feed(["john", "doe"], 2)
    public haveLength(arr: any[], length: number): void {
        Assert.that(arr, Does.haveLength(length));
    }
}
