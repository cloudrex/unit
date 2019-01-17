import {Unit, Test, Feed} from "../decorators";
import {Assert} from "..";
import Does from "../does";

@Unit("Does")
abstract class DoesTests {
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
}
