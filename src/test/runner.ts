import Runner from "../runner";

// Import tests. Please note that order is important.
import "./assert.unit";
import "./is.unit";
import "./does.unit";
import "./mock.unit";

Runner.test({
    shouldPrefix: true
});
