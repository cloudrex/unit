### 🧪 Unit

The JavaScript unit testing framework for perfectionists.

### Installation

Run the following command to integrate Unit into your existing project:

```bash
$ npm install --save-dev unit
```

### Syntax

Unit's syntax is designed to be elegant, flexible and simple. It is heavily inspired by the C# unit testing framework [XUnit](https://xunit.github.io/) among others.

The use of decorators to define units and tests is preferred and encouraged.


### Suggested practices

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
  [My Unit]
    √ 'test' should equal 'test'

  1/1 {100%} passing
```

#### 2. Feeding tests with in-line data

Instead of writing many assert statements, we can use the clever `@Feed` decorator. It's job is to provide (thus "feed") the test method with in-line data.

For simplicity's sake, the import statements have been ommitted.

```ts
@Unit("My Unit")
default class {
    @Test("Should determine if entities are equal")
    @Feed("hello", "hello")
    @Feed("world", "world")
    public shouldEqual(entity1: any, entity2: any): void {
        Assert.equals(entity1, entity2);
    }
}
```

As you can see, this makes the process a whole lot easier. You can, of course, provide as much in-line data as your heart desires.

#### 3. Mocking

In simple terms, mocking is the process of replacing or modifying existing functionality with custom implementations with the purpose of debugging and/or simplifying certain processes that would otherwise make our tests fragile, and dependent of the environment.

Fortunately, Unit provides elegant mocking utilities built with simplicitly in mind.

**Mocking return values**

```ts
import {Mock} from "unit";

let existingFn = (): number => 0;
```

In this simple example, we would like to mock the function `existingFn` so thats it returns `1` instead of `0` the *next time it is called*.

We can easily accomplish this functionality using the `returnOnce` helper function:

```ts
...

existingFn = Mock.fn(existingFn) // Prepare the function to be mocked.
    .returnOnce(1) // We specify that we want the function to return '1' the next time it is called.
    .invoker; // Finally we replace the function with our mock invoker.

console.log(existingFn()); // 1
console.log(existingFn()); // 0
```

Interestingly, the second call to the `existingFn` function returns `0`, which is what we would expect.

**Mocking implementations**

In some cases, we may need to not only mock a function's return value, but it's implementation.

This can be achived using the `once` helper function:

```ts
let square = (num: number): number => num ** 2;

square = Mock.fn(square)
    // Implement the target once.
    .once((num: number): number => num * 2)

    // Assign our invoker.
    .invoker;

console.log(square(4)); // 16
console.log(square(4)); // 8
```

### Why use Unit?

What makes Unit different from the other various JavaScript testing frameworks, and why should I consider using it?

* Simple, elegant decorator-based syntax which makes writing tests a breeze.
* Built-in mocking utilities.
* Broad range of useful assertion utilities.
* Chainable methods with simple names; Less writing, more doing.
* Cleverly self-tested codebase.
* Full TypeScript support (It's written in it!).
