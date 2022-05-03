import "./operations.js";

const iterations = 10_000;
const warmup = 100;

/**
 *
 * @param {string} name
 * @param {()=> void} runner
 * @param {number} timesPerRun
 */
const benchmark = (name, timesPerRun, runner) => {
  for (let i = 0; i < warmup; i++) {
    runner();
  }
  const results = [];
  let total = 0;
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    for (let k = 0; k < timesPerRun; k++) {
      runner();
    }
    let current = performance.now() - start;
    total += current;
    results.push(current);
  }
  const print = (n) => Math.round(n * 100) / 100 + "ms";
  console.log(
    `${name} - total:${print(total)}, avg: ${print(
      total / iterations
    )}, max:${print(Math.max(...results))}ms, min:${print(
      Math.min(...results)
    )}`
  );
};

const data_10 = generateTestData(10);
const data_1000 = generateTestData(1000);
const data_100_000 = generateTestData(100_000);
benchmark("filter_map_first_LINQ_10", 200, () => {
  data_10
    .where((x) => x.id === 5)
    .select((x) => x.name)
    .first();
});

benchmark("filter_map_first_10", 200, () => {
  data_10.filter((x) => x.id === 5).map((x) => x.name)[0];
});

benchmark("filter_map_first_LINQ_1000", 10, () => {
  data_1000
    .where((x) => x.id === 500)
    .select((x) => x.name)
    .first();
});

benchmark("filter_map_first_1000", 10, () => {
  data_1000.filter((x) => x.id === 500).map((x) => x.name)[0];
});

benchmark("filter_map_first_LINQ_100_000", 1, () => {
  data_100_000
    .where((x) => x.id === 50000)
    .select((x) => x.name)
    .first();
});

benchmark("filter_map_first_100_000", 1, () => {
  data_100_000.filter((x) => x.id === 50000).map((x) => x.name)[0];
});
const random = (n) => Math.floor(Math.random() * n);
benchmark("filter_map_first_LINQ_1000_random", 10, () => {
  data_1000
    .where((x) => x.id === random(1000))
    .select((x) => x.name)
    .first();
});

benchmark("filter_map_first_1000_random", 10, () => {
  data_1000.filter((x) => x.id === random(1000)).map((x) => x.name)[0];
});

benchmark("filter_map_first_LINQ_1000_early", 10, () => {
  data_1000
    .where((x) => x.id === 2)
    .select((x) => x.name)
    .first();
});

benchmark("filter_map_first_1000_early", 10, () => {
  data_1000.filter((x) => x.id === 2).map((x) => x.name)[0];
});
function generateTestData(count) {
  const categories = ["A", "B", "C", "D", "E", "F"];
  const names = ["Mike", "Kurt", "Sam", "Sarah", "Sohpie", "Emily"];
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i,
      name: names[i % names.length],
      category: categories[i % categories.length],
    });
  }
  return result;
}
