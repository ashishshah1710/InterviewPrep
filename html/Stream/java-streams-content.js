const PROBLEMS = [
  // BASICS (1-15)
  { num: 1, category: 'basics', title: 'Calculate the sum of elements in a list', code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
int sum = nums.stream().mapToInt(Integer::intValue).sum();
// sum = 15` },
  { num: 2, category: 'basics', title: 'Calculate average without using average()', code: `List<Integer> nums = List.of(10, 20, 30);
double avg = nums.stream()
    .mapToInt(Integer::intValue)
    .sum() / (double) nums.size();
// avg = 20.0` },
  { num: 3, category: 'basics', title: 'Find min and max in a list', code: `List<Integer> nums = List.of(3, 1, 4, 1, 5);
int min = nums.stream().mapToInt(Integer::intValue).min().orElseThrow();
int max = nums.stream().mapToInt(Integer::intValue).max().orElseThrow();` },
  { num: 4, category: 'basics', title: 'Find 2nd highest and 2nd lowest', code: `List<Integer> nums = List.of(5, 1, 9, 3, 7);
int secondHighest = nums.stream().distinct().sorted(Comparator.reverseOrder())
    .skip(1).findFirst().orElseThrow();
int secondLowest = nums.stream().distinct().sorted()
    .skip(1).findFirst().orElseThrow();` },
  { num: 5, category: 'basics', title: 'Remove duplicates from a list', code: `List<Integer> nums = List.of(1, 2, 2, 3, 3, 3);
List<Integer> unique = nums.stream().distinct().toList();` },
  { num: 6, category: 'basics', title: 'Count elements in a list', code: `List<String> words = List.of("a", "b", "c");
long count = words.stream().count();
// count = 3` },
  { num: 7, category: 'basics', title: 'Convert strings to uppercase and lowercase', code: `List<String> names = List.of("Alice", "BOB");
List<String> upper = names.stream().map(String::toUpperCase).toList();
List<String> lower = names.stream().map(String::toLowerCase).toList();` },
  { num: 8, category: 'basics', title: 'Find the longest string', code: `List<String> words = List.of("java", "stream", "api");
String longest = words.stream()
    .max(Comparator.comparingInt(String::length))
    .orElse("");` },
  { num: 9, category: 'basics', title: 'Join strings with comma', code: `List<String> fruits = List.of("apple", "banana", "cherry");
String joined = fruits.stream().collect(Collectors.joining(", "));
// "apple, banana, cherry"` },
  { num: 10, category: 'basics', title: 'Filter out null values', code: `List<String> items = Arrays.asList("a", null, "b", null, "c");
List<String> nonNull = items.stream()
    .filter(Objects::nonNull)
    .toList();` },
  { num: 11, category: 'basics', title: 'Filter even and odd numbers', code: `List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evens = nums.stream().filter(n -> n % 2 == 0).toList();
List<Integer> odds  = nums.stream().filter(n -> n % 2 != 0).toList();` },
  { num: 12, category: 'basics', title: 'Square each element', code: `List<Integer> nums = List.of(1, 2, 3, 4);
List<Integer> squared = nums.stream()
    .map(n -> n * n)
    .toList();
// [1, 4, 9, 16]` },
  { num: 13, category: 'basics', title: 'Sort ascending and descending', code: `List<Integer> nums = List.of(3, 1, 4, 1, 5);
List<Integer> asc  = nums.stream().sorted().toList();
List<Integer> desc = nums.stream().sorted(Comparator.reverseOrder()).toList();` },
  { num: 14, category: 'basics', title: 'Count occurrences of each element', code: `List<String> words = List.of("a", "b", "a", "c", "b", "a");
Map<String, Long> freq = words.stream()
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()));` },
  { num: 15, category: 'basics', title: 'Find occurrence count of a specific element', code: `List<Integer> nums = List.of(1, 2, 2, 3, 2, 4);
long countOf2 = nums.stream().filter(n -> n == 2).count();
// countOf2 = 3` },

  // NUMERIC (16-20)
  { num: 16, category: 'numeric', title: 'Sum using IntStream', code: `int sum = IntStream.rangeClosed(1, 10).sum();
// sum = 55` },
  { num: 17, category: 'numeric', title: 'Box primitives back to List', code: `List<Integer> boxed = IntStream.of(1, 2, 3)
    .boxed()
    .toList();` },
  { num: 18, category: 'numeric', title: 'First 10 Fibonacci numbers', code: `List<Integer> fib = Stream.iterate(
        new int[]{0, 1}, p -> new int[]{p[1], p[0] + p[1]})
    .limit(10)
    .map(p -> p[0])
    .toList();` },
  { num: 19, category: 'numeric', title: 'Product using reduce', code: `List<Integer> nums = List.of(1, 2, 3, 4);
int product = nums.stream()
    .reduce(1, (a, b) -> a * b);` },
  { num: 20, category: 'numeric', title: 'map() vs mapToInt()', code: `List<String> nums = List.of("1", "2", "3");
// map: Stream<Integer> (boxed, more overhead)
List<Integer> boxed = nums.stream().map(Integer::parseInt).toList();
// mapToInt: IntStream (primitive, efficient)
int sum = nums.stream().mapToInt(Integer::parseInt).sum();` },

  // STRING (21-27)
  { num: 21, category: 'string', title: 'Character frequency map', code: `String text = "hello";
Map<Character, Long> freq = text.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(c -> c, Collectors.counting()));` },
  { num: 22, category: 'string', title: 'Find duplicate characters', code: `String text = "programming";
Set<Character> dups = text.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(c -> c, Collectors.counting()))
    .entrySet().stream()
    .filter(e -> e.getValue() > 1)
    .map(Map.Entry::getKey)
    .collect(Collectors.toSet());` },
  { num: 23, category: 'string', title: 'First non-repeated character', code: `String text = "swiss";
char first = text.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(c -> c, LinkedHashMap::new, Collectors.counting()))
    .entrySet().stream()
    .filter(e -> e.getValue() == 1)
    .map(Map.Entry::getKey)
    .findFirst()
    .orElse('\\0');` },
  { num: 24, category: 'string', title: 'Reverse words in a sentence', code: `String sentence = "Java streams are powerful";
String reversed = Arrays.stream(sentence.split(" "))
    .collect(Collectors.collectingAndThen(
        Collectors.toList(),
        list -> { Collections.reverse(list); return list; }))
    .stream()
    .collect(Collectors.joining(" "));` },
  { num: 25, category: 'string', title: 'Check if two strings are anagrams', code: `boolean isAnagram(String a, String b) {
  char[] ca = a.chars().sorted().mapToObj(c -> (char) c).toArray(Character[]::new);
  char[] cb = b.chars().sorted().mapToObj(c -> (char) c).toArray(Character[]::new);
  return Arrays.equals(ca, cb);
}` },
  { num: 26, category: 'string', title: 'Count vowels and consonants', code: `String text = "Hello World";
long vowels = text.chars()
    .filter(Character::isLetter)
    .map(Character::toLowerCase)
    .filter(c -> "aeiou".indexOf(c) >= 0)
    .count();
long consonants = text.chars()
    .filter(Character::isLetter)
    .count() - vowels;` },
  { num: 27, category: 'string', title: 'Remove special characters', code: `String dirty = "Hello@World#2024!";
String clean = dirty.chars()
    .filter(Character::isLetterOrDigit)
    .mapToObj(c -> String.valueOf((char) c))
    .collect(Collectors.joining());` },

  // EMPLOYEE (28-46)
  { num: 28, category: 'employee', title: 'Employee with highest salary', code: `record Employee(int id, String name, double salary,
    String department, String gender, LocalDate joinDate, String jobTitle) {}

Employee top = employees.stream()
    .max(Comparator.comparingDouble(Employee::salary))
    .orElseThrow();` },
  { num: 29, category: 'employee', title: 'Employee with 2nd highest salary', code: `Employee second = employees.stream()
    .sorted(Comparator.comparingDouble(Employee::salary).reversed())
    .skip(1)
    .findFirst()
    .orElseThrow();` },
  { num: 30, category: 'employee', title: 'Sort by salary then name', code: `List<Employee> sorted = employees.stream()
    .sorted(Comparator.comparingDouble(Employee::salary)
        .reversed()
        .thenComparing(Employee::name))
    .toList();` },
  { num: 31, category: 'employee', title: 'Group employees by department', code: `Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::department));` },
  { num: 32, category: 'employee', title: 'Count employees per department', code: `Map<String, Long> countByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::department, Collectors.counting()));` },
  { num: 33, category: 'employee', title: 'Average salary per department', code: `Map<String, Double> avgByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::department,
        Collectors.averagingDouble(Employee::salary)));` },
  { num: 34, category: 'employee', title: 'Partition employees by gender', code: `Map<Boolean, List<Employee>> byGender = employees.stream()
    .collect(Collectors.partitioningBy(e -> "M".equals(e.gender())));` },
  { num: 35, category: 'employee', title: 'Find oldest employee (earliest join date)', code: `Employee oldest = employees.stream()
    .min(Comparator.comparing(Employee::joinDate))
    .orElseThrow();` },
  { num: 36, category: 'employee', title: 'Top 3 highest paid employees', code: `List<Employee> top3 = employees.stream()
    .sorted(Comparator.comparingDouble(Employee::salary).reversed())
    .limit(3)
    .toList();` },
  { num: 37, category: 'employee', title: 'Collect to Map id → Employee', code: `Map<Integer, Employee> empMap = employees.stream()
    .collect(Collectors.toMap(Employee::id, e -> e));` },
  { num: 38, category: 'employee', title: 'toMap with duplicate key merge', code: `Map<String, Employee> byName = employees.stream()
    .collect(Collectors.toMap(
        Employee::name,
        e -> e,
        (existing, replacement) -> existing.salary() >= replacement.salary() ? existing : replacement));` },
  { num: 39, category: 'employee', title: 'Names starting with A', code: `List<String> namesA = employees.stream()
    .map(Employee::name)
    .filter(n -> n.startsWith("A"))
    .toList();` },
  { num: 40, category: 'employee', title: 'Join all employee names', code: `String allNames = employees.stream()
    .map(Employee::name)
    .collect(Collectors.joining(", "));` },
  { num: 41, category: 'employee', title: 'Employees joined after a given year', code: `List<Employee> recent = employees.stream()
    .filter(e -> e.joinDate().getYear() > 2020)
    .toList();` },
  { num: 42, category: 'employee', title: 'Distinct job titles', code: `List<String> titles = employees.stream()
    .map(Employee::jobTitle)
    .distinct()
    .sorted()
    .toList();` },
  { num: 43, category: 'employee', title: 'Highest paid employee per department', code: `Map<String, Employee> topPerDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::department,
        Collectors.maxBy(Comparator.comparingDouble(Employee::salary))))
    .entrySet().stream()
    .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().orElseThrow()));` },
  { num: 44, category: 'employee', title: 'Group employees by salary range', code: `Map<String, List<Employee>> byRange = employees.stream()
    .collect(Collectors.groupingBy(e -> {
        if (e.salary() < 50000) return "LOW";
        if (e.salary() < 100000) return "MID";
        return "HIGH";
    }));` },
  { num: 45, category: 'employee', title: 'Flatten department lists to single stream', code: `Map<String, List<Employee>> deptMap = /* grouped */;
List<Employee> flat = deptMap.values().stream()
    .flatMap(List::stream)
    .toList();` },
  { num: 46, category: 'employee', title: 'collectingAndThen — sorted names per dept', code: `Map<String, List<String>> sortedNames = employees.stream()
    .collect(Collectors.groupingBy(Employee::department,
        Collectors.collectingAndThen(
            Collectors.mapping(Employee::name, Collectors.toList()),
            list -> { Collections.sort(list); return list; })));` },

  // OPTIONAL (47-50)
  { num: 47, category: 'optional', title: 'findFirst with Optional', code: `Optional<Integer> firstEven = IntStream.of(1, 3, 4, 5)
    .filter(n -> n % 2 == 0)
    .boxed()
    .findFirst();
int value = firstEven.orElse(-1);` },
  { num: 48, category: 'optional', title: 'Factorial using reduce', code: `int n = 5;
int factorial = IntStream.rangeClosed(1, n)
    .reduce(1, (a, b) -> a * b);
// 120` },
  { num: 49, category: 'optional', title: 'Concatenate strings using reduce', code: `List<String> words = List.of("Java", "Streams", "API");
String result = words.stream()
    .reduce("", (a, b) -> a.isEmpty() ? b : a + " " + b);` },
  { num: 50, category: 'optional', title: 'Longest string using reduce', code: `List<String> words = List.of("cat", "elephant", "dog");
String longest = words.stream()
    .reduce((a, b) -> a.length() >= b.length() ? a : b)
    .orElse("");` },

  // COLLECTORS (51-57)
  { num: 51, category: 'collectors', title: 'Sort map entries by value', code: `Map<String, Integer> map = Map.of("a", 3, "b", 1, "c", 2);
Map<String, Integer> sorted = map.entrySet().stream()
    .sorted(Map.Entry.comparingByValue())
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
        (a, b) -> a, LinkedHashMap::new));` },
  { num: 52, category: 'collectors', title: 'Sort map entries by key', code: `Map<String, Integer> map = Map.of("c", 1, "a", 2, "b", 3);
Map<String, Integer> sorted = map.entrySet().stream()
    .sorted(Map.Entry.comparingByKey())
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
        (a, b) -> a, LinkedHashMap::new));` },
  { num: 53, category: 'collectors', title: 'Map values to stream and filter', code: `Map<String, Integer> scores = Map.of("Alice", 90, "Bob", 45, "Carol", 85);
List<String> passed = scores.entrySet().stream()
    .filter(e -> e.getValue() >= 60)
    .map(Map.Entry::getKey)
    .toList();` },
  { num: 54, category: 'collectors', title: 'Build EnumMap from stream', code: `enum Day { MON, TUE, WED }
Map<Day, String> schedule = Stream.of(Day.values())
    .collect(Collectors.toMap(d -> d, d -> "Work",
        (a, b) -> a, () -> new EnumMap<>(Day.class)));` },
  { num: 55, category: 'collectors', title: 'Frequency map with counting collector', code: `List<String> words = List.of("a", "b", "a", "c", "b", "a");
Map<String, Long> freq = words.stream()
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()));` },
  { num: 56, category: 'collectors', title: 'Partition list by predicate', code: `List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
Map<Boolean, List<Integer>> parts = nums.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));` },
  { num: 57, category: 'collectors', title: 'Collect to immutable collection', code: `List<String> names = List.of("Alice", "Bob");
List<String> immutable = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.collectingAndThen(Collectors.toList(), List::copyOf));` },

  // FLATTENING (58-61)
  { num: 58, category: 'flattening', title: 'Flatten list of lists', code: `List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4));
List<Integer> flat = nested.stream()
    .flatMap(List::stream)
    .toList();
// [1, 2, 3, 4]` },
  { num: 59, category: 'flattening', title: 'Flatten map values to stream', code: `Map<String, List<Integer>> map = Map.of("a", List.of(1, 2), "b", List.of(3));
List<Integer> all = map.values().stream()
    .flatMap(List::stream)
    .toList();` },
  { num: 60, category: 'flattening', title: 'FlatMap over array of arrays', code: `Integer[][] arrays = {{1, 2}, {3, 4}, {5}};
List<Integer> flat = Arrays.stream(arrays)
    .flatMap(Arrays::stream)
    .toList();` },
  { num: 61, category: 'flattening', title: 'Strings to characters stream', code: `List<String> words = List.of("hi", "go");
List<Character> chars = words.stream()
    .flatMap(s -> s.chars().mapToObj(c -> (char) c))
    .toList();` },

  // DATETIME (62-64)
  { num: 62, category: 'datetime', title: 'Sort employees by LocalDate', code: `List<Employee> byDate = employees.stream()
    .sorted(Comparator.comparing(Employee::joinDate))
    .toList();` },
  { num: 63, category: 'datetime', title: 'Group by join year', code: `Map<Integer, List<Employee>> byYear = employees.stream()
    .collect(Collectors.groupingBy(e -> e.joinDate().getYear()));` },
  { num: 64, category: 'datetime', title: 'Filter employees by date range', code: `LocalDate start = LocalDate.of(2020, 1, 1);
LocalDate end   = LocalDate.of(2023, 12, 31);
List<Employee> inRange = employees.stream()
    .filter(e -> !e.joinDate().isBefore(start) && !e.joinDate().isAfter(end))
    .toList();` },

  // STATISTICAL (65-70)
  { num: 65, category: 'statistical', title: 'Count elements greater than threshold', code: `List<Integer> nums = List.of(10, 25, 30, 5, 40);
long count = nums.stream().filter(n -> n > 20).count();` },
  { num: 66, category: 'statistical', title: 'Numbers starting or ending with digit', code: `List<Integer> nums = List.of(101, 205, 310, 7);
List<Integer> startWith1 = nums.stream()
    .filter(n -> String.valueOf(n).startsWith("1"))
    .toList();
List<Integer> endWith0 = nums.stream()
    .filter(n -> String.valueOf(n).endsWith("0"))
    .toList();` },
  { num: 67, category: 'statistical', title: 'Word frequency in a sentence', code: `String text = "java is great and java is fun";
Map<String, Long> freq = Arrays.stream(text.split(" "))
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()));` },
  { num: 68, category: 'statistical', title: 'Most repeated word', code: `Map<String, Long> freq = /* word counts */;
String mostRepeated = freq.entrySet().stream()
    .max(Map.Entry.comparingByValue())
    .map(Map.Entry::getKey)
    .orElse("");` },
  { num: 69, category: 'statistical', title: 'Sort map by frequency (descending)', code: `Map<String, Long> freq = Map.of("a", 3, "b", 1, "c", 2);
List<Map.Entry<String, Long>> sorted = freq.entrySet().stream()
    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
    .toList();` },
  { num: 70, category: 'statistical', title: 'Remove stop words from text', code: `Set<String> stopWords = Set.of("the", "is", "a", "an");
List<String> filtered = Arrays.stream("the cat is a pet".split(" "))
    .filter(w -> !stopWords.contains(w.toLowerCase()))
    .toList();` },

  // ADVANCED (71-86)
  { num: 71, category: 'advanced', title: 'Parallel vs sequential stream', code: `List<Integer> nums = IntStream.range(0, 1_000_000).boxed().toList();
long seq = nums.stream().mapToInt(n -> n * 2).sum();
long par = nums.parallelStream().mapToInt(n -> n * 2).sum();` },
  { num: 72, category: 'advanced', title: 'Custom collector — summary statistics', code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
IntSummaryStatistics stats = nums.stream()
    .collect(Collectors.summarizingInt(Integer::intValue));
// stats.getAverage(), getMax(), getMin(), getSum()` },
  { num: 73, category: 'advanced', title: 'collect() vs toList()', code: `List<String> names = List.of("a", "b");
List<String> viaCollect = names.stream()
    .collect(Collectors.toList()); // mutable ArrayList
List<String> viaToList   = names.stream().toList(); // unmodifiable` },
  { num: 74, category: 'advanced', title: 'Infinite stream with iterate + limit', code: `List<Integer> powersOf2 = Stream.iterate(1, n -> n * 2)
    .limit(10)
    .toList();
// [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]` },
  { num: 75, category: 'advanced', title: 'peek() vs map() — side effect vs transform', code: `List<String> result = List.of("a", "bb", "ccc").stream()
    .peek(s -> System.out.println("before: " + s)) // debug only
    .map(String::toUpperCase)                       // transforms
    .toList();` },
  { num: 76, category: 'advanced', title: 'sorted() is stateful — requires encounter order', code: `// sorted() buffers all elements before emitting
List<Integer> sorted = Stream.of(3, 1, 4, 1, 5)
    .sorted()
    .toList();
// Use sorted() after filter/map on finite streams` },
  { num: 77, category: 'advanced', title: 'Create stream from Iterable', code: `Iterable<String> iterable = List.of("a", "b", "c");
List<String> list = StreamSupport.stream(iterable.spliterator(), false)
    .toList();` },
  { num: 78, category: 'advanced', title: 'Handle checked exceptions in streams', code: `List<String> urls = List.of("https://example.com");
List<String> bodies = urls.stream()
    .map(url -> {
        try { return fetch(url); }
        catch (IOException e) { throw new UncheckedIOException(e); }
    })
    .toList();` },
  { num: 79, category: 'advanced', title: 'Supplier — stream can be used only once', code: `Supplier<Stream<Integer>> supplier = () -> Stream.of(1, 2, 3);
long count = supplier.get().count();
List<Integer> list = supplier.get().toList(); // fresh stream` },
  { num: 80, category: 'advanced', title: 'Collect to TreeSet (sorted unique)', code: `List<String> names = List.of("bob", "alice", "charlie", "alice");
TreeSet<String> set = names.stream()
    .collect(Collectors.toCollection(TreeSet::new));` },
  { num: 81, category: 'advanced', title: 'Top K using PriorityQueue collector', code: `List<Integer> nums = List.of(3, 1, 4, 1, 5, 9, 2);
List<Integer> top3 = nums.stream()
    .sorted(Comparator.reverseOrder())
    .limit(3)
    .toList();` },
  { num: 82, category: 'advanced', title: 'Sort while preserving duplicate count', code: `List<Integer> nums = List.of(3, 1, 4, 1, 5);
List<Integer> sorted = nums.stream()
    .sorted()
    .toList();
// size unchanged: duplicates preserved` },
  { num: 83, category: 'advanced', title: 'skip() first N elements', code: `List<Integer> nums = List.of(10, 20, 30, 40, 50);
List<Integer> afterSkip = nums.stream().skip(2).toList();
// [30, 40, 50]` },
  { num: 84, category: 'advanced', title: 'limit() first N elements', code: `List<Integer> nums = List.of(10, 20, 30, 40, 50);
List<Integer> first3 = nums.stream().limit(3).toList();
// [10, 20, 30]` },
  { num: 85, category: 'advanced', title: 'Primitive arrays to boxed List', code: `int[] arr = {1, 2, 3};
List<Integer> boxed = Arrays.stream(arr).boxed().toList();` },
  { num: 86, category: 'advanced', title: 'String array to CSV line', code: `String[] fields = {"Alice", "Engineer", "50000"};
String csv = Arrays.stream(fields)
    .collect(Collectors.joining(","));` },

  // PRACTICAL (87-100)
  { num: 87, category: 'practical', title: 'Find median of a list', code: `List<Integer> nums = List.of(3, 1, 4, 1, 5);
List<Integer> sorted = nums.stream().sorted().toList();
double median = sorted.size() % 2 == 0
    ? (sorted.get(sorted.size()/2 - 1) + sorted.get(sorted.size()/2)) / 2.0
    : sorted.get(sorted.size()/2);` },
  { num: 88, category: 'practical', title: 'Find mode (most frequent element)', code: `List<Integer> nums = List.of(1, 2, 2, 3, 2, 4);
int mode = nums.stream()
    .collect(Collectors.groupingBy(n -> n, Collectors.counting()))
    .entrySet().stream()
    .max(Map.Entry.comparingByValue())
    .map(Map.Entry::getKey)
    .orElseThrow();` },
  { num: 89, category: 'practical', title: 'Spiral matrix — stream rows', code: `int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
List<int[]> rows = Arrays.stream(matrix).toList();
List<Integer> spiral = new ArrayList<>();
// use streams to process each row, then spiral logic on indices
rows.forEach(row -> Arrays.stream(row).forEach(spiral::add));` },
  { num: 90, category: 'practical', title: 'Validate all elements are unique', code: `List<Integer> nums = List.of(1, 2, 3, 4);
boolean allUnique = nums.stream().distinct().count() == nums.size();` },
  { num: 91, category: 'practical', title: 'Partition numbers into even and odd', code: `List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
Map<Boolean, List<Integer>> parts = nums.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));` },
  { num: 92, category: 'practical', title: 'Find palindromes in a list', code: `List<String> words = List.of("madam", "hello", "level");
List<String> palindromes = words.stream()
    .filter(w -> w.equals(new StringBuilder(w).reverse().toString()))
    .toList();` },
  { num: 93, category: 'practical', title: 'Remove first and last element', code: `List<Integer> nums = List.of(10, 20, 30, 40, 50);
List<Integer> trimmed = nums.stream().skip(1)
    .limit(nums.size() - 2)
    .toList();
// [20, 30, 40]` },
  { num: 94, category: 'practical', title: 'Combine two lists and deduplicate', code: `List<Integer> a = List.of(1, 2, 3);
List<Integer> b = List.of(3, 4, 5);
List<Integer> combined = Stream.concat(a.stream(), b.stream())
    .distinct()
    .toList();` },
  { num: 95, category: 'practical', title: 'Group strings by length', code: `List<String> words = List.of("hi", "java", "go", "stream");
Map<Integer, List<String>> byLen = words.stream()
    .collect(Collectors.groupingBy(String::length));` },
  { num: 96, category: 'practical', title: 'Distinct words grouped by length', code: `List<String> words = List.of("hi", "go", "hi", "java");
Map<Integer, List<String>> distinctByLen = words.stream()
    .distinct()
    .collect(Collectors.groupingBy(String::length));` },
  { num: 97, category: 'practical', title: 'Sum of digits in a number', code: `int num = 12345;
int digitSum = String.valueOf(num).chars()
    .map(c -> c - '0')
    .sum();
// 15` },
  { num: 98, category: 'practical', title: 'Map strings to their lengths', code: `List<String> words = List.of("java", "stream", "api");
Map<String, Integer> lenMap = words.stream()
    .collect(Collectors.toMap(w -> w, String::length));` },
  { num: 99, category: 'practical', title: 'Shuffle list using streams trick', code: `List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5));
Collections.shuffle(nums);
// or: nums.stream().collect(Collectors.toCollection(() -> {
//   List<Integer> shuffled = new ArrayList<>(nums);
//   Collections.shuffle(shuffled); return shuffled; }))` },
  { num: 100, category: 'practical', title: 'Sort with zeros at end + peek debug', code: `List<Integer> nums = List.of(0, 3, 0, 1, 0, 2);
List<Integer> sorted = nums.stream()
    .peek(n -> System.out.println("processing: " + n))
    .sorted((a, b) -> {
        if (a == 0 && b != 0) return 1;
        if (a != 0 && b == 0) return -1;
        return Integer.compare(a, b);
    })
    .toList();
// [1, 2, 3, 0, 0, 0]` }
];

const CATEGORY_TITLES = {
  basics: 'Stream Basics (Problems 1–15)',
  numeric: 'Numeric Streams (Problems 16–20)',
  string: 'String Manipulation (Problems 21–27)',
  employee: 'Employee Operations (Problems 28–46)',
  optional: 'Optional & Reduce (Problems 47–50)',
  collectors: 'Collectors API (Problems 51–57)',
  flattening: 'Flattening with flatMap (Problems 58–61)',
  datetime: 'Date & Time Streams (Problems 62–64)',
  statistical: 'Statistical Problems (Problems 65–70)',
  advanced: 'Advanced Stream Concepts (Problems 71–86)',
  practical: 'Practical Interview Problems (Problems 87–100)',
  all: 'All 100 Java Stream Problems'
};

function buildCategoryHtml(category, problems) {
  const title = CATEGORY_TITLES[category] || category;
  const problemHtml = problems.map(p => `
<div class="interview-q">
  <div class="q">#${p.num}. ${p.title}</div>
  <pre><code class="language-java">${p.code.trim()}</code></pre>
</div>`).join('\n');

  return `<h2>${title}</h2>\n${problemHtml}`;
}

function problemsByCategory(cat) {
  return PROBLEMS.filter(p => p.category === cat);
}

const TOPICS = {
  basics: {
    title: 'Stream Basics',
    html: buildCategoryHtml('basics', problemsByCategory('basics'))
  },
  numeric: {
    title: 'Numeric Streams',
    html: buildCategoryHtml('numeric', problemsByCategory('numeric'))
  },
  string: {
    title: 'String Manipulation',
    html: buildCategoryHtml('string', problemsByCategory('string'))
  },
  employee: {
    title: 'Employee Operations',
    html: buildCategoryHtml('employee', problemsByCategory('employee'))
  },
  optional: {
    title: 'Optional & Reduce',
    html: buildCategoryHtml('optional', problemsByCategory('optional'))
  },
  collectors: {
    title: 'Collectors API',
    html: buildCategoryHtml('collectors', problemsByCategory('collectors'))
  },
  flattening: {
    title: 'Flattening',
    html: buildCategoryHtml('flattening', problemsByCategory('flattening'))
  },
  datetime: {
    title: 'Date & Time',
    html: buildCategoryHtml('datetime', problemsByCategory('datetime'))
  },
  statistical: {
    title: 'Statistical',
    html: buildCategoryHtml('statistical', problemsByCategory('statistical'))
  },
  advanced: {
    title: 'Advanced',
    html: buildCategoryHtml('advanced', problemsByCategory('advanced'))
  },
  practical: {
    title: 'Practical',
    html: buildCategoryHtml('practical', problemsByCategory('practical'))
  },
  all: {
    title: 'All 100 Problems',
    html: buildCategoryHtml('all', PROBLEMS)
  }
};
