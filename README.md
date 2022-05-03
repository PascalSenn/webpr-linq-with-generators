# LinQ in JS (with generators) 

This is implementation of LinQ in JS by using Generators. 
It extends the `Generator` and `Array` prototype to make the methods available on all arrays.

Generators are generally a lot slower than built in functions. This was expected, but it's surprising by how much. 
Only when you are lucky and can reduce the size of the source a lot, then it is faster.

Some benchmarks:
```
Where/Filter => Select/Map => First/[0]

filter_map_first_LINQ_10 - total:337.57ms, avg: 0.03ms, max:1.23msms, min:0.03ms
filter_map_first_10 - total:60.47ms, avg: 0.01ms, max:0.19msms, min:0ms
filter_map_first_LINQ_1000 - total:739.61ms, avg: 0.07ms, max:0.5msms, min:0.07ms
filter_map_first_1000 - total:133.88ms, avg: 0.01ms, max:0.27msms, min:0.01ms
filter_map_first_LINQ_100_000 - total:7270.04ms, avg: 0.73ms, max:1.18msms, min:0.69ms
filter_map_first_100_000 - total:6757.52ms, avg: 0.68ms, max:2.02msms, min:0.11ms

Where/Filter id === random(1000)

filter_map_first_LINQ_1000_random - total:1342.55ms, avg: 0.13ms, max:0.63msms, min:0.03ms
filter_map_first_1000_random - total:878.47ms, avg: 0.09ms, max:0.59msms, min:0.08ms

Where/Filter id === 1

filter_map_first_LINQ_1000_early - total:17.53ms, avg: 0ms, max:0.38msms, min:0ms
filter_map_first_1000_early - total:132.69ms, avg: 0.01ms, max:0.3msms, min:0.01ms
```

