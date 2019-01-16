### 🧪 Unit

The JavaScript unit testing framework for perfectionists.

### Installation

Simply run the following command to integrate Unit into your project:

```bash
$ npm install --save-dev unit
```

### Syntax

Unit's syntax is designed to be elegant, flexible and simple. It's syntax is heavily inspired by the C# unit testing framework [XUnit](https://xunit.github.io/) among others.

The use of decorators to define units and tests is preferred and encouraged.

### Examples

Let's create a simple test to determine whether 'test' equals 'test'. For this, we'll be importing the `Assert` class.

```ts
import {TestUnit, Test, Assert} from "unit";

@TestUnit()
abstract class Examples {
    @Test("'test' should equal 'test'")
    public shouldEqual(): void {
        Assert.equals("test", "test");
    }
}
```

Our output should be:

```bash
  [Examples]
    √ 'test' should equal 'test'

  1/1 {100%} passing
```
