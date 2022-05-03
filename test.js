let total = 0;
// The test "framework", exports the Suite function plus a total of how many assertions have been tested

export { Suite };

// appends blanks to the right until the string is of size extend
// padRight :: String, Int -> String
function padRight(str, extend) {
  return "" + str + fill(str, extend);
}

// appends blanks to the left until the string is of size extend
// padLeft :: String, Int -> String
function padLeft(str, extend) {
  return "" + fill(str, extend) + str;
}

function fill(str, extend) {
  const len = str.toString().length; // in case str is not a string
  if (len > extend) {
    return "";
  }
  return " ".repeat(extend - len);
}

// ----------- Data structures

const Pair = (first) => (second) =>
  Object.seal((selector) => selector(first)(second)); // seal to disallow using functions as objects

const fst = (arg_1) => (arg_2) => arg_1;
const snd = (arg_1) => (arg_2) => arg_2;

// function id(x) { return x; }, \x.x
const id = (x) => x;

const Tuple = (n) => {
  if (n < 1) throw new Error("Tuple must have first argument n > 0");

  return [
    TupleCtor(n)([]), // ctor curries all values and then waits for the selector
    // every selector is a function that picks the value from the curried ctor at the same position
    ...Array.from({ length: n }, (it, idx) => (values) => values[idx]),
  ];
};

const nApply = (n) => (f) => n === 0 ? f : (g) => nApply(n - 1)(f(g)); // a curried functions that eats so many arguments

const Choice = (n) => {
  // number of ctors
  if (n < 1) throw new Error("Choice must have first argument n > 0");

  return [
    ...Array.from({ length: n }, (it, idx) => ChoiceCtor(idx + 1)(n + 1)([])), // first arg is the ctor state
    (choice) => nApply(n)(choice), // takes n + 1 args and returns arg[0] (arg[1]) (arg[2]) ... (arg[n])
  ];
};

// private implementation details ---------------------

const TupleCtor = (n) => (values) => {
  if (n === 0) {
    // we have curried all ctor args, now
    return Object.seal((selector) => selector(values)); // return a function that waits for the selector
  }
  return (value) => {
    // there are still values to be curried
    return TupleCtor(n - 1)([...values, value]); // return the ctor for the remaining args
  };
};

const ChoiceCtor = (position) => (n) => (choices) => {
  if (n === 0) {
    // we have curried all ctor args, now
    return Object.seal(choices[position](choices[0])); // we call the chosen function with the ctor argument
  }
  return (choice) => {
    // there are still choices to be curried
    return ChoiceCtor(position)(n - 1)([...choices, choice]); // return the ctor for the remaining args
  };
};

function Assert() {
  const results = []; // [Bool], true if test passed, false otherwise
  return {
    results: results,
    true: (testResult) => {
      if (!testResult) {
        console.error("test failed");
      }
      results.push(testResult);
    },
    is: (expected, actual) => {
      const testResult = actual === expected;
      if (!testResult) {
        console.error(
          "test failure. Got '" + actual + "', expected '" + expected + "'"
        );
      }
      results.push(testResult);
    },
  };
}

const [Test, name, logic] = Tuple(2); // data type to capture test to-be-run

function test(name, callback) {
  const assert = Assert();
  callback(assert);
  report(name, assert.results);
}

function Suite(suiteName) {
  const tests = []; // [Test]
  const suite = {
    /**
     * @param {String} testName
     * @param {(assert: Assert) => void} callback
     * @returns
     */
    test: (testName, callback) => test(suiteName + "-" + testName, callback),
    /**
     * @param {String} testName
     * @param {(assert: Assert) => void} callback
     * @returns
     */
    add: (testName, callback) => tests.push(Test(testName)(callback)),
    run: () => {
      const suiteAssert = Assert();
      tests.forEach((test) => test(logic)(suiteAssert));
      total += suiteAssert.results.length;
      if (suiteAssert.results.every(id)) {
        // whole suite was ok, report whole suite
        report("suite " + suiteName, suiteAssert.results);
      } else {
        // some test in suite failed, rerun tests for better error indication
        tests.forEach((test) => suite.test(test(name), test(logic)));
      }
    },
  };
  return suite;
}

// test result report
// report :: String, [Bool] -> DOM ()
function report(origin, ok) {
  const extend = 20;
  if (ok.every((elem) => elem)) {
    write(
      " " +
        padLeft(ok.length, 3) +
        " tests in " +
        padRight(origin, extend) +
        " ok."
    );
    return;
  }
  let reportLine = "    Failing tests in " + padRight(origin, extend);
  bar(reportLine.length);
  write("|" + reportLine + "|");
  for (let i = 0; i < ok.length; i++) {
    if (!ok[i]) {
      write("|    Test #" + padLeft(i, 3) + " failed                     |");
    }
  }
  bar(reportLine.length);
}

function write(message) {
  console.log(message);
}

function bar(extend) {
  write("+" + "-".repeat(extend) + "+");
}
