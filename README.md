### 🧪 Unit

The JavaScript unit testing framework for perfectionists.

### Installation

Simply run the following command to integrate Unit into your project:

```bash
$ npm install --save-dev unit
```

### Syntax

Unit's syntax is designed to be elegant, flexible and simple. It is heavily inspired by the C# unit testing framework [XUnit](https://xunit.github.io/) among others.

The use of decorators to define units and tests is preferred and encouraged.


### Suggested Practices

Below are some suggested practices to follow when using Unit for unit testing.

1. Declare one unit per file

2. Use anonymous classes for the units:

```ts
@Unit("My Unit")
default class { // Anonymous class declaration
    //
}
```

3. Suffix unit files with ".unit" (ex. `utils.unit.ts` or `fun.unit.js`)

4. Import all units and run tests from a single file

5. Use `@Feed` to provide in-line data whenever possible

6. Do not export unit classes (There's no need!)

### Examples

#### 1. Your First Unit
Let's create a simple test to determine whether 'test' equals 'test'. For this, we'll be importing the `Assert` class.

```ts
import {Unit, Test, Assert, Runner} from "unit";

@Unit("My Unit")
default class {
    @Test("'test' should equal 'test'")
    public shouldEqual(): void {
        Assert.equals("test", "test");
    }
}

// Run tests
Runner.test();
```

Our output should be:

```bash
  [Examples]
    √ 'test' should equal 'test'

  1/1 {100%} passing
```

#### 2. Feeding

Instead of writing many assert statements, we can use the clever `@Feed` decorator. It's job is to provide (thus "feed") the test method with in-line data.

For simplicity's sake, the import statements have been ommitted.

```ts
@Unit("My Unit")
default class {
    @Test("should determine if entities are equal")
    @Feed("hello", "hello")
    @Feed("world", "world")
    public shouldEqual(entity1: any, entity2: any): void {
        Assert.equals(entity1, entity2);
    }
}
```

As you can see, this makes the process a whole lot easier. You can, of course, provide as much in-line data as your heart desires.
