import { Suite } from "./test.js";
import "./operations.js";

const suite = Suite("linq");

const users = [
  {
    id: 1,
    name: "Foo",
    surname: "Galoo",
    group: "A",
  },
  {
    id: 2,
    name: "Sam",
    surname: "Sampleman",
    group: "A",
  },
  {
    id: 3,
    name: "Kurt",
    surname: "Kingston",
    group: "B",
  },
  {
    id: 3,
    name: "Simon",
    surname: "Bigman",
    group: "C",
  },
];

suite.add("where", (assert) => {
  // arrange
  // act
  const result = users.where((x) => x.name == "Kurt").toArray();

  // assert
  assert.is(1, result.length);
});

suite.add("select", (assert) => {
  // arrange
  // act
  const result = users.select(({ name }) => ({ name })).toArray();

  // assert
  assert.is("Foo", result[0].name);
});

suite.add("orderBy", (assert) => {
  // arrange
  // act
  const result = users.orderBy((x) => x.name).toArray();

  // assert
  assert.is("Kurt", result[1].name);
});

suite.add("skip", (assert) => {
  // arrange
  // act
  const result = users.skip(1).toArray();

  // assert
  assert.is("Sam", result[0].name);
  assert.is(3, result.length);
});

suite.add("take", (assert) => {
  // arrange
  // act
  const result = users.take(2).toArray();

  // assert
  assert.is("Foo", result[0].name);
  assert.is(2, result.length);
});

suite.add("count", (assert) => {
  // arrange
  // act
  const result = users.count();

  // assert
  assert.is(4, result);
});

suite.add("any-true", (assert) => {
  // arrange
  // act
  const result = users.any();

  // assert
  assert.true(result);
});

suite.add("any-false", (assert) => {
  // arrange
  // act
  const result = users.where((x) => x.id === "asdef").any();

  // assert
  assert.true(!result);
});

suite.add("groupBy", (assert) => {
  // arrange
  // act
  const result = users.groupBy((x) => x.group);

  // assert
  assert.is(2, result["A"].length);
  assert.is(1, result["B"].length);
  assert.is(1, result["C"].length);
});

suite.add("first", (assert) => {
  // arrange
  // act
  const result = users.first();

  // assert
  assert.is("Foo", result.name);
});

suite.add("last", (assert) => {
  // arrange
  // act
  const result = users.last();

  // assert
  assert.is("Simon", result.name);
});

suite.run();
