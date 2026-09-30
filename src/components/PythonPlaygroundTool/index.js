'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

const STORAGE_KEY = 'fwd-python-playground-lesson';
const PROGRESS_KEY = 'fwd-python-playground-progress';

const LESSONS = [
  {
    id: 'variables',
    chapter: 'Basics',
    title: 'Variables and print',
    sub: 'Names, values, and output',
    concept: 'Python variables are names that point to values. print() writes a value to the console. The interpreter runs one line at a time from top to bottom.',
    code: `name = "Ada"
language = "Python"
year = 1991

print(name)
print(language, year)`,
    steps: [
      { line: 1, title: 'Create name', detail: 'Python stores the string "Ada" under the variable name.', memory: { name: '"Ada"' } },
      { line: 2, title: 'Create language', detail: 'A second variable points to another string value.', memory: { name: '"Ada"', language: '"Python"' } },
      { line: 3, title: 'Create year', detail: 'Numbers do not need quotes. This value is an integer.', memory: { name: '"Ada"', language: '"Python"', year: '1991' } },
      { line: 5, title: 'Print one value', detail: 'print(name) looks up the variable and writes its value.', memory: { name: '"Ada"', language: '"Python"', year: '1991' }, output: 'Ada' },
      { line: 6, title: 'Print multiple values', detail: 'print can receive several values. Python separates them with spaces.', memory: { name: '"Ada"', language: '"Python"', year: '1991' }, output: 'Python 1991' },
    ],
    prompt: 'Try changing the name or year in a real Python file and predict what each print line will show.',
  },
  {
    id: 'strings',
    chapter: 'Basics',
    title: 'Strings and methods',
    sub: 'Text, slicing, and f-strings',
    concept: 'A string is a sequence of characters. Python provides built-in methods like upper(), lower(), and replace() to transform text. Slice notation [start:end] extracts a portion. f-strings embed variables directly inside curly braces.',
    code: `word = "python"
length = len(word)
upper = word.upper()
part = word[0:3]
msg = f"Hello, {upper}!"

print(length)
print(part)
print(msg)`,
    steps: [
      { line: 1, title: 'Assign string', detail: 'word points to the six-character string "python".', memory: { word: '"python"' } },
      { line: 2, title: 'Get length', detail: 'len("python") counts six characters and returns 6.', memory: { word: '"python"', length: '6' } },
      { line: 3, title: 'Call upper()', detail: 'upper() returns a new string with every character capitalised.', memory: { word: '"python"', length: '6', upper: '"PYTHON"' } },
      { line: 4, title: 'Slice [0:3]', detail: 'Slicing starts at index 0 and stops before index 3, giving "pyt".', memory: { word: '"python"', length: '6', upper: '"PYTHON"', part: '"pyt"' } },
      { line: 5, title: 'Build f-string', detail: 'Python replaces {upper} with its current value to produce "Hello, PYTHON!".', memory: { word: '"python"', length: '6', upper: '"PYTHON"', part: '"pyt"', msg: '"Hello, PYTHON!"' } },
      { line: 7, title: 'Print length', detail: 'print(length) outputs the integer 6.', memory: { word: '"python"', length: '6', upper: '"PYTHON"', part: '"pyt"', msg: '"Hello, PYTHON!"' }, output: '6' },
      { line: 8, title: 'Print slice', detail: 'part holds the first three characters.', memory: { word: '"python"', length: '6', upper: '"PYTHON"', part: '"pyt"', msg: '"Hello, PYTHON!"' }, output: 'pyt' },
      { line: 9, title: 'Print message', detail: 'The f-string is printed with the substituted value.', memory: { word: '"python"', length: '6', upper: '"PYTHON"', part: '"pyt"', msg: '"Hello, PYTHON!"' }, output: 'Hello, PYTHON!' },
    ],
    prompt: 'Change word to "world" and predict what upper, part, and msg will become.',
    challenge: { title: 'Shorten the slice', text: 'Change the slice to word[0:1] and confirm the output is just "p".', done: false },
  },
  {
    id: 'numbers',
    chapter: 'Basics',
    title: 'Numbers and casting',
    sub: 'Arithmetic, int, float, str',
    concept: 'Python has two common number types: int (whole numbers) and float (decimals). Division / always returns a float. Floor division // discards the decimal. str(), int(), and float() convert between types.',
    code: `a = 7
b = 2
total = a + b
ratio = a / b
floored = a // b
text = str(total)
num = int("42")

print(total, ratio)
print(text, num)`,
    steps: [
      { line: 1, title: 'Assign a', detail: 'a is the integer 7.', memory: { a: '7' } },
      { line: 2, title: 'Assign b', detail: 'b is the integer 2.', memory: { a: '7', b: '2' } },
      { line: 3, title: 'Add', detail: '7 + 2 = 9. Both operands are integers so the result is an integer.', memory: { a: '7', b: '2', total: '9' } },
      { line: 4, title: 'Divide', detail: '7 / 2 = 3.5. Division always returns a float in Python 3.', memory: { a: '7', b: '2', total: '9', ratio: '3.5' } },
      { line: 5, title: 'Floor divide', detail: '7 // 2 = 3. The decimal part is discarded.', memory: { a: '7', b: '2', total: '9', ratio: '3.5', floored: '3' } },
      { line: 6, title: 'Cast to str', detail: 'str(9) turns the integer into the string "9".', memory: { a: '7', b: '2', total: '9', ratio: '3.5', floored: '3', text: '"9"' } },
      { line: 7, title: 'Cast to int', detail: 'int("42") parses the string and returns the integer 42.', memory: { a: '7', b: '2', total: '9', ratio: '3.5', floored: '3', text: '"9"', num: '42' } },
      { line: 9, title: 'Print total and ratio', detail: 'Python prints both values separated by a space.', memory: { total: '9', ratio: '3.5', floored: '3', text: '"9"', num: '42' }, output: '9 3.5' },
      { line: 10, title: 'Print text and num', detail: 'text is the string "9" and num is the integer 42.', memory: { total: '9', ratio: '3.5', floored: '3', text: '"9"', num: '42' }, output: '9 42' },
    ],
    prompt: 'Change a to 10 and b to 4. Predict ratio and floored before running.',
    challenge: { title: 'Produce a float result', text: 'Set a = 5 and b = 4. Confirm ratio prints 1.25.', done: false },
  },
  {
    id: 'conditionals',
    chapter: 'Control Flow',
    title: 'if, elif, else',
    sub: 'Branching through conditions',
    concept: 'An if statement chooses one branch. Python checks the first true condition and skips the remaining branches.',
    code: `score = 82

if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
else:
    grade = "C"

print(grade)`,
    steps: [
      { line: 1, title: 'Set the score', detail: 'The score variable starts with the integer 82.', memory: { score: '82' } },
      { line: 3, title: 'Check first branch', detail: '82 is not greater than or equal to 90, so Python skips the A branch.', memory: { score: '82' } },
      { line: 5, title: 'Check elif branch', detail: '82 is greater than or equal to 75, so this branch runs.', memory: { score: '82' } },
      { line: 6, title: 'Assign grade', detail: 'The grade variable is set to "B". The else branch will not run.', memory: { score: '82', grade: '"B"' } },
      { line: 10, title: 'Print result', detail: 'Python prints the chosen grade.', memory: { score: '82', grade: '"B"' }, output: 'B' },
    ],
    prompt: 'Change score to 94, 70, or 10 and decide which branch should run.',
  },
  {
    id: 'booleans',
    chapter: 'Control Flow',
    title: 'Booleans and operators',
    sub: 'True, False, and, or, not',
    concept: 'Boolean values are True or False. Comparison operators (>, <, ==, !=) produce booleans. Logical operators and, or, not combine them. The ternary expression value_if_true if condition else value_if_false selects a value in one line.',
    code: `x = 8
y = 3
greater = x > y
equal = x == y
both = greater and not equal
label = "pass" if greater else "fail"

print(greater, equal)
print(both, label)`,
    steps: [
      { line: 1, title: 'Assign x', detail: 'x is 8.', memory: { x: '8' } },
      { line: 2, title: 'Assign y', detail: 'y is 3.', memory: { x: '8', y: '3' } },
      { line: 3, title: 'Compare >', detail: '8 > 3 is True. greater stores this boolean.', memory: { x: '8', y: '3', greater: 'True' } },
      { line: 4, title: 'Compare ==', detail: '8 == 3 is False. equal stores this boolean.', memory: { x: '8', y: '3', greater: 'True', equal: 'False' } },
      { line: 5, title: 'and / not', detail: 'not False is True. True and True is True. both = True.', memory: { x: '8', y: '3', greater: 'True', equal: 'False', both: 'True' } },
      { line: 6, title: 'Ternary expression', detail: 'greater is True so the if branch wins: label = "pass".', memory: { x: '8', y: '3', greater: 'True', equal: 'False', both: 'True', label: '"pass"' } },
      { line: 8, title: 'Print booleans', detail: 'Python prints True then False separated by a space.', memory: { greater: 'True', equal: 'False', both: 'True', label: '"pass"' }, output: 'True False' },
      { line: 9, title: 'Print both and label', detail: 'both is True and label is "pass".', memory: { greater: 'True', equal: 'False', both: 'True', label: '"pass"' }, output: 'True pass' },
    ],
    prompt: 'Set x = 3 and y = 8. Predict what greater, equal, both, and label become.',
    challenge: { title: 'Flip the result', text: 'Set x = 2 and y = 9 so that label becomes "fail".', done: false },
  },
  {
    id: 'loops',
    chapter: 'Loops',
    title: 'for loops and lists',
    sub: 'Repeat work over items',
    concept: 'A for loop runs the same block once for each item in a sequence. The loop variable points to the current item.',
    code: `tasks = ["read", "code", "ship"]
done = []

for task in tasks:
    done.append(task.upper())

print(done)`,
    steps: [
      { line: 1, title: 'Create a list', detail: 'tasks holds three strings in order.', memory: { tasks: '["read", "code", "ship"]' } },
      { line: 2, title: 'Create an empty list', detail: 'done starts empty. The loop will append to it.', memory: { tasks: '["read", "code", "ship"]', done: '[]' } },
      { line: 4, title: 'First loop item', detail: 'task points to "read".', memory: { tasks: '["read", "code", "ship"]', done: '[]', task: '"read"' } },
      { line: 5, title: 'Append uppercase value', detail: 'task.upper() returns "READ", then append adds it to done.', memory: { tasks: '["read", "code", "ship"]', done: '["READ"]', task: '"read"' } },
      { line: 4, title: 'Second loop item', detail: 'task points to "code".', memory: { tasks: '["read", "code", "ship"]', done: '["READ"]', task: '"code"' } },
      { line: 5, title: 'Append another value', detail: 'done now has two uppercase strings.', memory: { tasks: '["read", "code", "ship"]', done: '["READ", "CODE"]', task: '"code"' } },
      { line: 4, title: 'Third loop item', detail: 'task points to "ship".', memory: { tasks: '["read", "code", "ship"]', done: '["READ", "CODE"]', task: '"ship"' } },
      { line: 5, title: 'Append final value', detail: 'The loop is finished after this item.', memory: { tasks: '["read", "code", "ship"]', done: '["READ", "CODE", "SHIP"]', task: '"ship"' } },
      { line: 7, title: 'Print the list', detail: 'The final list contains one transformed value per input task.', memory: { tasks: '["read", "code", "ship"]', done: '["READ", "CODE", "SHIP"]' }, output: "['READ', 'CODE', 'SHIP']" },
    ],
    prompt: 'Add another task to the list and trace how many loop passes will run.',
  },
  {
    id: 'while-loops',
    chapter: 'Loops',
    title: 'while loops',
    sub: 'Repeat until a condition is false',
    concept: 'A while loop runs its body as long as the condition is True. The loop variable must change inside the body, otherwise the loop runs forever. Python checks the condition before every iteration.',
    code: `count = 0
total = 0
while count < 3:
    count = count + 1
    total = total + count

print(count, total)`,
    steps: [
      { line: 1, title: 'Initialise count', detail: 'count starts at 0.', memory: { count: '0' } },
      { line: 2, title: 'Initialise total', detail: 'total starts at 0.', memory: { count: '0', total: '0' } },
      { line: 3, title: 'Check: 0 < 3', detail: '0 is less than 3, so Python enters the loop body.', memory: { count: '0', total: '0' } },
      { line: 4, title: 'Increment count', detail: 'count becomes 1.', memory: { count: '1', total: '0' } },
      { line: 5, title: 'Add to total', detail: 'total = 0 + 1 = 1.', memory: { count: '1', total: '1' } },
      { line: 3, title: 'Check: 1 < 3', detail: '1 is less than 3, so the loop runs again.', memory: { count: '1', total: '1' } },
      { line: 4, title: 'Increment count', detail: 'count becomes 2.', memory: { count: '2', total: '1' } },
      { line: 5, title: 'Add to total', detail: 'total = 1 + 2 = 3.', memory: { count: '2', total: '3' } },
      { line: 3, title: 'Check: 2 < 3', detail: '2 is less than 3, so the loop runs once more.', memory: { count: '2', total: '3' } },
      { line: 4, title: 'Increment count', detail: 'count becomes 3.', memory: { count: '3', total: '3' } },
      { line: 5, title: 'Add to total', detail: 'total = 3 + 3 = 6.', memory: { count: '3', total: '6' } },
      { line: 3, title: 'Check: 3 < 3', detail: '3 is not less than 3. The condition is False — the loop exits.', memory: { count: '3', total: '6' } },
      { line: 7, title: 'Print result', detail: 'After three iterations count is 3 and total is 6.', memory: { count: '3', total: '6' }, output: '3 6' },
    ],
    prompt: 'Change the limit to 4. How many iterations run and what does total become?',
    challenge: { title: 'Reach total 10', text: 'Change the limit from 3 to 4. Confirm total prints 10.', done: false },
  },
  {
    id: 'list-comprehensions',
    chapter: 'Loops',
    title: 'List comprehensions',
    sub: 'Build lists in one line',
    concept: 'A list comprehension creates a new list by applying an expression to each item in an iterable. Add an if clause to filter items. It is equivalent to a for loop with append, but more concise.',
    code: `numbers = [1, 2, 3, 4, 5]
squares = [n * n for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
labels = [f"item_{n}" for n in numbers]

print(squares)
print(evens)
print(labels)`,
    steps: [
      { line: 1, title: 'Create numbers', detail: 'The source list has five integers.', memory: { numbers: '[1, 2, 3, 4, 5]' } },
      { line: 2, title: 'Build squares', detail: 'For each n, n*n is computed: [1, 4, 9, 16, 25].', memory: { numbers: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]' } },
      { line: 3, title: 'Filter evens', detail: 'Only items where n % 2 == 0 pass the filter: [2, 4].', memory: { numbers: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]' } },
      { line: 4, title: 'Build labels', detail: 'An f-string turns each number into a label string.', memory: { numbers: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]', labels: '["item_1", "item_2", "item_3", "item_4", "item_5"]' } },
      { line: 6, title: 'Print squares', detail: 'The squares list is printed.', memory: { numbers: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]', labels: '["item_1",…]' }, output: '[1, 4, 9, 16, 25]' },
      { line: 7, title: 'Print evens', detail: 'Only the two even numbers are in this list.', memory: { numbers: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]', labels: '["item_1",…]' }, output: '[2, 4]' },
      { line: 8, title: 'Print labels', detail: 'Five label strings built from f-string formatting.', memory: { numbers: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]', labels: '["item_1",…]' }, output: "['item_1', 'item_2', 'item_3', 'item_4', 'item_5']" },
    ],
    prompt: 'Write a comprehension that keeps only numbers greater than 3. Predict the result.',
    challenge: { title: 'Filter odds', text: 'Change the evens filter to n % 2 != 0 and confirm the output is [1, 3, 5].', done: false },
  },
  {
    id: 'list-methods',
    chapter: 'Data',
    title: 'List methods',
    sub: 'append, sort, remove, len',
    concept: 'Lists are mutable — you can change them after creation. append() adds to the end, sort() reorders in place, remove() deletes the first matching value, and len() returns the count of items.',
    code: `fruits = ["banana", "apple", "cherry"]
fruits.append("date")
fruits.sort()
fruits.remove("banana")
count = len(fruits)
first = fruits[0]

print(fruits)
print(first, count)`,
    steps: [
      { line: 1, title: 'Create list', detail: 'Three fruit strings in original order.', memory: { fruits: '["banana", "apple", "cherry"]' } },
      { line: 2, title: 'append()', detail: '"date" is added to the end of the list.', memory: { fruits: '["banana", "apple", "cherry", "date"]' } },
      { line: 3, title: 'sort()', detail: 'sort() reorders items alphabetically in place.', memory: { fruits: '["apple", "banana", "cherry", "date"]' } },
      { line: 4, title: 'remove()', detail: '"banana" is found and deleted. Items shift left.', memory: { fruits: '["apple", "cherry", "date"]' } },
      { line: 5, title: 'len()', detail: 'Three items remain after the removal.', memory: { fruits: '["apple", "cherry", "date"]', count: '3' } },
      { line: 6, title: 'Index [0]', detail: 'fruits[0] is "apple" after sorting and removal.', memory: { fruits: '["apple", "cherry", "date"]', count: '3', first: '"apple"' } },
      { line: 8, title: 'Print list', detail: 'The current state of the list after all mutations.', memory: { fruits: '["apple", "cherry", "date"]', count: '3', first: '"apple"' }, output: "['apple', 'cherry', 'date']" },
      { line: 9, title: 'Print first and count', detail: 'first is "apple" and count is 3.', memory: { fruits: '["apple", "cherry", "date"]', count: '3', first: '"apple"' }, output: 'apple 3' },
    ],
    prompt: 'What would fruits[1] return after sorting and removing "banana"?',
    challenge: { title: 'Shrink the list', text: 'Also call fruits.remove("cherry") after the existing remove. Confirm count becomes 2.', done: false },
  },
  {
    id: 'dicts',
    chapter: 'Data',
    title: 'Dictionaries',
    sub: 'Key-value data in Python',
    concept: 'A dictionary stores values by key. Use square brackets to read or write a key, and .get() when a key might be missing.',
    code: `user = {
    "name": "Ada",
    "role": "admin"
}

user["active"] = True
role = user.get("role", "guest")

print(user["name"])
print(role)`,
    steps: [
      { line: 1, title: 'Create dictionary', detail: 'user starts with name and role keys.', memory: { user: '{name: "Ada", role: "admin"}' } },
      { line: 6, title: 'Add a key', detail: 'Assignment through square brackets adds active: True.', memory: { user: '{name: "Ada", role: "admin", active: True}' } },
      { line: 7, title: 'Read safely with get', detail: '.get("role", "guest") returns the role because it exists.', memory: { user: '{name: "Ada", role: "admin", active: True}', role: '"admin"' } },
      { line: 9, title: 'Print one dictionary value', detail: 'user["name"] reads the value stored at the name key.', memory: { user: '{name: "Ada", role: "admin", active: True}', role: '"admin"' }, output: 'Ada' },
      { line: 10, title: 'Print role', detail: 'role already contains the value returned from .get().', memory: { user: '{name: "Ada", role: "admin", active: True}', role: '"admin"' }, output: 'admin' },
    ],
    prompt: 'Ask what user.get("team", "core") would return and why.',
  },
  {
    id: 'tuples',
    chapter: 'Data',
    title: 'Tuples',
    sub: 'Immutable ordered sequences',
    concept: 'A tuple is like a list but cannot be changed after creation — it is immutable. Use parentheses to create one. Index it with [n] just like a list. Unpacking assigns all items to separate variables in one step.',
    code: `coords = (10, 20, 30)
x = coords[0]
y = coords[1]
count = len(coords)
a, b, c = coords

print(x, y, count)
print(a, b, c)`,
    steps: [
      { line: 1, title: 'Create tuple', detail: 'coords holds three integers. Parentheses mark this as a tuple.', memory: { coords: '(10, 20, 30)' } },
      { line: 2, title: 'Index [0]', detail: 'The first element is 10.', memory: { coords: '(10, 20, 30)', x: '10' } },
      { line: 3, title: 'Index [1]', detail: 'The second element is 20.', memory: { coords: '(10, 20, 30)', x: '10', y: '20' } },
      { line: 4, title: 'len()', detail: 'The tuple has three elements.', memory: { coords: '(10, 20, 30)', x: '10', y: '20', count: '3' } },
      { line: 5, title: 'Unpack', detail: 'Python assigns each element to a, b, c in order.', memory: { coords: '(10, 20, 30)', x: '10', y: '20', count: '3', a: '10', b: '20', c: '30' } },
      { line: 7, title: 'Print x, y, count', detail: 'Three values printed in one call.', memory: { coords: '(10, 20, 30)', x: '10', y: '20', count: '3', a: '10', b: '20', c: '30' }, output: '10 20 3' },
      { line: 8, title: 'Print a, b, c', detail: 'The unpacked variables hold the same values as the indexed lookups.', memory: { coords: '(10, 20, 30)', x: '10', y: '20', count: '3', a: '10', b: '20', c: '30' }, output: '10 20 30' },
    ],
    prompt: 'Why would Python raise an error if you wrote coords[0] = 99?',
    challenge: { title: 'Unpack a new tuple', text: 'Change coords to (5, 15, 25) and confirm a, b, c print 5 15 25.', done: false },
  },
  {
    id: 'sets',
    chapter: 'Data',
    title: 'Sets',
    sub: 'Unique unordered collections',
    concept: 'A set stores unique values with no duplicates and no guaranteed order. Use curly braces to create one. add() inserts an item, in tests membership, and len() counts unique items. sorted() produces a predictable order for printing.',
    code: `tags = {"python", "web", "python", "api"}
tags.add("backend")
has_web = "web" in tags
size = len(tags)

print(has_web, size)
print(sorted(tags))`,
    steps: [
      { line: 1, title: 'Create set', detail: '"python" appears twice but sets only keep one copy. Result: {"api", "python", "web"}.', memory: { tags: '{"api", "python", "web"}' } },
      { line: 2, title: 'add()', detail: '"backend" is new so it is inserted. Order is not guaranteed.', memory: { tags: '{"api", "backend", "python", "web"}' } },
      { line: 3, title: 'in operator', detail: '"web" is in the set, so has_web = True.', memory: { tags: '{"api", "backend", "python", "web"}', has_web: 'True' } },
      { line: 4, title: 'len()', detail: 'Four unique tags are in the set.', memory: { tags: '{"api", "backend", "python", "web"}', has_web: 'True', size: '4' } },
      { line: 6, title: 'Print has_web and size', detail: 'True confirms "web" was found. 4 is the unique count.', memory: { tags: '{"api", "backend", "python", "web"}', has_web: 'True', size: '4' }, output: 'True 4' },
      { line: 7, title: 'Print sorted', detail: 'sorted() converts the set to a sorted list for predictable output.', memory: { tags: '{"api", "backend", "python", "web"}', has_web: 'True', size: '4' }, output: "['api', 'backend', 'python', 'web']" },
    ],
    prompt: 'Add "python" again after line 2. Predict whether size changes.',
    challenge: { title: 'Shrink the set', text: 'Remove "api" from the initial set literal and confirm size prints 3.', done: false },
  },
  {
    id: 'functions',
    chapter: 'Functions',
    title: 'Define and call functions',
    sub: 'Inputs, return values, reuse',
    concept: 'A function packages reusable logic. Parameters receive input values. return sends a value back to the caller.',
    code: `def apply_tax(price, rate):
    tax = price * rate
    return price + tax

total = apply_tax(100, 0.18)
print(total)`,
    steps: [
      { line: 1, title: 'Define the function', detail: 'Python records the function body but does not run it yet.', memory: { apply_tax: '<function>' } },
      { line: 5, title: 'Call the function', detail: 'The call passes 100 into price and 0.18 into rate.', stack: ['apply_tax(price=100, rate=0.18)'], memory: { apply_tax: '<function>', price: '100', rate: '0.18' } },
      { line: 2, title: 'Calculate tax', detail: 'Inside the function, tax becomes 18.0.', stack: ['apply_tax(price=100, rate=0.18)'], memory: { apply_tax: '<function>', price: '100', rate: '0.18', tax: '18.0' } },
      { line: 3, title: 'Return result', detail: 'return sends 118.0 back to the call site.', stack: ['apply_tax(price=100, rate=0.18)'], memory: { apply_tax: '<function>', return: '118.0' } },
      { line: 5, title: 'Store returned value', detail: 'total receives the function result.', memory: { apply_tax: '<function>', total: '118.0' } },
      { line: 6, title: 'Print total', detail: 'The returned value is now available outside the function.', memory: { apply_tax: '<function>', total: '118.0' }, output: '118.0' },
    ],
    prompt: 'Call apply_tax(250, 0.05) and predict the returned total.',
  },
  {
    id: 'lambda',
    chapter: 'Functions',
    title: 'Lambda and map',
    sub: 'Anonymous functions and map()',
    concept: 'A lambda is a small anonymous function written in one line: lambda parameters: expression. It is useful when passing a function as an argument. map() applies a function to every item in a list.',
    code: `double = lambda x: x * 2
add = lambda a, b: a + b
nums = [3, 1, 4, 1, 5]
nums.sort()
result = list(map(double, nums))

print(add(3, 4))
print(result)`,
    steps: [
      { line: 1, title: 'Define double lambda', detail: 'double is an anonymous function that multiplies its argument by 2.', memory: { double: '<lambda>' } },
      { line: 2, title: 'Define add lambda', detail: 'add takes two arguments and returns their sum.', memory: { double: '<lambda>', add: '<lambda>' } },
      { line: 3, title: 'Create nums', detail: 'A list with five integers, some repeated.', memory: { double: '<lambda>', add: '<lambda>', nums: '[3, 1, 4, 1, 5]' } },
      { line: 4, title: 'sort()', detail: 'Sorted in ascending order in place.', memory: { double: '<lambda>', add: '<lambda>', nums: '[1, 1, 3, 4, 5]' } },
      { line: 5, title: 'map(double, nums)', detail: 'double is applied to each element: [2, 2, 6, 8, 10].', memory: { double: '<lambda>', add: '<lambda>', nums: '[1, 1, 3, 4, 5]', result: '[2, 2, 6, 8, 10]' } },
      { line: 7, title: 'Call add(3, 4)', detail: 'The lambda returns 3 + 4 = 7.', memory: { double: '<lambda>', add: '<lambda>', nums: '[1, 1, 3, 4, 5]', result: '[2, 2, 6, 8, 10]' }, output: '7' },
      { line: 8, title: 'Print result', detail: 'The mapped list with each number doubled.', memory: { double: '<lambda>', add: '<lambda>', nums: '[1, 1, 3, 4, 5]', result: '[2, 2, 6, 8, 10]' }, output: '[2, 2, 6, 8, 10]' },
    ],
    prompt: 'Write a lambda triple = lambda x: x * 3. What would map(triple, nums) return?',
    challenge: { title: 'Double the sum', text: 'Call add(double(3), double(4)) and predict the result before tracing.', done: false },
  },
  {
    id: 'scope',
    chapter: 'Functions',
    title: 'Scope',
    sub: 'Local and global variables',
    concept: 'Variables created inside a function are local — they exist only during the call. Variables created outside are global. A function can read a global, but assigning to a name inside creates a new local variable unless you use the global keyword.',
    code: `count = 0

def increment():
    local_val = 10
    return local_val + 1

result = increment()
print(count)
print(result)`,
    steps: [
      { line: 1, title: 'Global count', detail: 'count = 0 is defined in the global scope.', memory: { count: '0' } },
      { line: 3, title: 'Define increment', detail: 'The function body is stored but not yet run.', memory: { count: '0', increment: '<function>' } },
      { line: 7, title: 'Call increment()', detail: 'Python creates a new local scope for the function call.', stack: ['increment()'], memory: { count: '0', increment: '<function>' } },
      { line: 4, title: 'Create local_val', detail: 'local_val = 10 exists only inside this function call.', stack: ['increment()'], memory: { count: '0', increment: '<function>', local_val: '10' } },
      { line: 5, title: 'Return 11', detail: 'local_val + 1 = 11. The local scope is destroyed after return.', stack: ['increment()'], memory: { count: '0', increment: '<function>', return: '11' } },
      { line: 7, title: 'Store result', detail: 'result receives the returned 11. local_val is gone.', memory: { count: '0', increment: '<function>', result: '11' } },
      { line: 8, title: 'Print count', detail: 'The global count was never changed inside the function — it is still 0.', memory: { count: '0', increment: '<function>', result: '11' }, output: '0' },
      { line: 9, title: 'Print result', detail: 'result holds the value returned by increment().', memory: { count: '0', increment: '<function>', result: '11' }, output: '11' },
    ],
    prompt: 'Why is local_val not visible on line 9? What would happen if you tried to print it?',
    challenge: { title: 'Change the return', text: 'Change local_val to 20. Confirm result prints 21.', done: false },
  },
  {
    id: 'classes',
    chapter: 'OOP',
    title: 'Classes and objects',
    sub: '__init__, self, methods',
    concept: 'A class is a blueprint for objects. __init__ runs when you create an instance and sets up its attributes via self. Methods are functions defined inside the class that receive self as the first parameter.',
    code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return self.name + " says woof!"

dog = Dog("Rex", "Lab")
sound = dog.bark()

print(dog.name, dog.breed)
print(sound)`,
    steps: [
      { line: 1, title: 'Define class', detail: 'Python records the Dog class blueprint. No objects exist yet.', memory: { Dog: '<class>' } },
      { line: 9, title: 'Create instance', detail: 'Dog("Rex", "Lab") calls __init__ with name="Rex" and breed="Lab".', stack: ['Dog.__init__(name="Rex", breed="Lab")'], memory: { Dog: '<class>' } },
      { line: 3, title: 'Set self.name', detail: 'The instance attribute name is set to "Rex".', stack: ['Dog.__init__(name="Rex", breed="Lab")'], memory: { Dog: '<class>', 'self.name': '"Rex"' } },
      { line: 4, title: 'Set self.breed', detail: 'The instance attribute breed is set to "Lab".', stack: ['Dog.__init__(name="Rex", breed="Lab")'], memory: { Dog: '<class>', 'self.name': '"Rex"', 'self.breed': '"Lab"' } },
      { line: 9, title: 'Store dog', detail: '__init__ returns. dog now points to the new Dog instance.', memory: { Dog: '<class>', dog: 'Dog(name="Rex", breed="Lab")' } },
      { line: 10, title: 'Call dog.bark()', detail: 'bark() reads self.name and builds the return string.', stack: ['Dog.bark()'], memory: { Dog: '<class>', dog: 'Dog(name="Rex", breed="Lab")' } },
      { line: 6, title: 'Build return value', detail: '"Rex" + " says woof!" = "Rex says woof!". Returned to caller.', stack: ['Dog.bark()'], memory: { Dog: '<class>', dog: 'Dog(name="Rex", breed="Lab")', return: '"Rex says woof!"' } },
      { line: 10, title: 'Store sound', detail: 'sound receives the string returned by bark().', memory: { Dog: '<class>', dog: 'Dog(name="Rex", breed="Lab")', sound: '"Rex says woof!"' } },
      { line: 12, title: 'Print name and breed', detail: 'Attribute access reads the values set in __init__.', memory: { Dog: '<class>', dog: 'Dog(name="Rex", breed="Lab")', sound: '"Rex says woof!"' }, output: 'Rex Lab' },
      { line: 13, title: 'Print sound', detail: 'The return value from bark() is printed.', memory: { Dog: '<class>', dog: 'Dog(name="Rex", breed="Lab")', sound: '"Rex says woof!"' }, output: 'Rex says woof!' },
    ],
    prompt: 'Create a second Dog instance with a different name. What does calling bark() on it return?',
    challenge: { title: 'Change the dog', text: 'Change name to "Buddy" and breed to "Poodle". Confirm the output updates.', done: false },
  },
  {
    id: 'try-except',
    chapter: 'Error Handling',
    title: 'try / except',
    sub: 'Catching and handling errors',
    concept: 'Wrap risky code in a try block. If an exception is raised, Python jumps to the matching except block instead of crashing. You can catch specific exception types like ZeroDivisionError or ValueError.',
    code: `def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "error: divide by zero"

print(safe_div(10, 2))
print(safe_div(5, 0))`,
    steps: [
      { line: 1, title: 'Define safe_div', detail: 'Python stores the function. No code inside runs yet.', memory: { safe_div: '<function>' } },
      { line: 7, title: 'Call safe_div(10, 2)', detail: 'First call: a=10, b=2. A new local scope is created.', stack: ['safe_div(a=10, b=2)'], memory: { safe_div: '<function>' } },
      { line: 2, title: 'Enter try block', detail: 'Python attempts the code inside try.', stack: ['safe_div(a=10, b=2)'], memory: { safe_div: '<function>', a: '10', b: '2' } },
      { line: 3, title: 'Divide: 10 / 2', detail: '10 / 2 = 5.0. No error raised. return sends 5.0 to the caller.', stack: ['safe_div(a=10, b=2)'], memory: { safe_div: '<function>', return: '5.0' } },
      { line: 7, title: 'Print 5.0', detail: 'The returned value is printed.', memory: { safe_div: '<function>' }, output: '5.0' },
      { line: 8, title: 'Call safe_div(5, 0)', detail: 'Second call: a=5, b=0.', stack: ['safe_div(a=5, b=0)'], memory: { safe_div: '<function>' } },
      { line: 2, title: 'Enter try block', detail: 'Python attempts the division again.', stack: ['safe_div(a=5, b=0)'], memory: { safe_div: '<function>', a: '5', b: '0' } },
      { line: 3, title: 'ZeroDivisionError raised', detail: '5 / 0 cannot be computed. Python raises ZeroDivisionError and jumps to except.', stack: ['safe_div(a=5, b=0)'], memory: { safe_div: '<function>', a: '5', b: '0' } },
      { line: 4, title: 'except catches error', detail: 'ZeroDivisionError matches the except clause. The crash is prevented.', stack: ['safe_div(a=5, b=0)'], memory: { safe_div: '<function>', a: '5', b: '0' } },
      { line: 5, title: 'Return error string', detail: 'The except block returns a safe message instead of crashing.', stack: ['safe_div(a=5, b=0)'], memory: { safe_div: '<function>', return: '"error: divide by zero"' } },
      { line: 8, title: 'Print error message', detail: 'The error string from the except block is printed.', memory: { safe_div: '<function>' }, output: 'error: divide by zero' },
    ],
    prompt: 'What would happen if the except clause caught ValueError instead of ZeroDivisionError?',
    challenge: { title: 'Trigger the handler', text: 'Swap the two calls so safe_div(5, 0) prints first. Confirm error prints before 5.0.', done: false },
  },
  {
    id: 'files',
    chapter: 'Files & APIs',
    title: 'Read files and parse JSON',
    sub: 'Mocked file/API workflow',
    concept: 'Python often reads text files or JSON responses, turns them into data, then extracts fields. This playground simulates that flow without touching your filesystem or network.',
    code: `import json

text = '{"language": "Python", "version": 3}'
data = json.loads(text)

print(data["language"])
print(data["version"])`,
    steps: [
      { line: 1, title: 'Import json', detail: 'The json module provides functions for parsing JSON text.', memory: { json: '<module>' } },
      { line: 3, title: 'Receive text', detail: 'A file or API response usually arrives as a string first.', memory: { json: '<module>', text: '\'{"language": "Python", "version": 3}\'' } },
      { line: 4, title: 'Parse JSON', detail: 'json.loads turns the text into a Python dictionary.', memory: { json: '<module>', text: '\'{"language": "Python", "version": 3}\'', data: '{language: "Python", version: 3}' } },
      { line: 6, title: 'Read language', detail: 'The language key contains the string "Python".', memory: { data: '{language: "Python", version: 3}' }, output: 'Python' },
      { line: 7, title: 'Read version', detail: 'The version key contains the integer 3.', memory: { data: '{language: "Python", version: 3}' }, output: '3' },
    ],
    prompt: 'Replace version with 4 in the JSON string and predict the output.',
  },

  /* ── Comprehensions ── */
  {
    id: 'list-comprehension',
    chapter: 'Comprehensions',
    title: 'List comprehensions',
    concept: 'A list comprehension builds a new list in one line: `[expression for item in iterable]`. Add `if condition` to filter. It is faster and more readable than a for-loop with append.',
    code: `nums = [1, 2, 3, 4, 5]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
print(squares)
print(evens)`,
    steps: [
      { line: 1, title: 'Create the list', detail: 'A list of five integers.', memory: { nums: '[1, 2, 3, 4, 5]' } },
      { line: 2, title: 'Square each item', detail: 'The comprehension applies n * n to every element.', memory: { nums: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]' } },
      { line: 3, title: 'Filter with if', detail: 'Only items where n % 2 == 0 are kept.', memory: { nums: '[1, 2, 3, 4, 5]', squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]' } },
      { line: 4, title: 'Print squares', detail: 'The new list of squares.', memory: { squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]' }, output: '[1, 4, 9, 16, 25]' },
      { line: 5, title: 'Print evens', detail: 'The filtered list.', memory: { squares: '[1, 4, 9, 16, 25]', evens: '[2, 4]' }, output: '[2, 4]' },
    ],
    prompt: 'Change the filter to keep odd numbers and predict the output.',
  },
  {
    id: 'dict-set-comprehension',
    chapter: 'Comprehensions',
    title: 'Dict & set comprehensions',
    concept: 'The same syntax builds dicts and sets. `{k: v for ...}` makes a dict; `{expr for ...}` makes a set (deduplicated).',
    code: `words = ["hi", "bye", "ok"]
lengths = {w: len(w) for w in words}
unique = {len(w) for w in words}
print(lengths)
print(unique)`,
    steps: [
      { line: 1, title: 'Create the list', detail: 'Three short strings.', memory: { words: '["hi", "bye", "ok"]' } },
      { line: 2, title: 'Build a dict', detail: 'Each word maps to its length.', memory: { words: '["hi", "bye", "ok"]', lengths: '{hi: 2, bye: 3, ok: 2}' } },
      { line: 3, title: 'Build a set', detail: 'Lengths collected into a set — duplicates (2) collapse to one.', memory: { lengths: '{hi: 2, bye: 3, ok: 2}', unique: '{2, 3}' } },
      { line: 4, title: 'Print the dict', detail: 'Key/value pairs.', memory: { lengths: '{hi: 2, bye: 3, ok: 2}', unique: '{2, 3}' }, output: "{'hi': 2, 'bye': 3, 'ok': 2}" },
      { line: 5, title: 'Print the set', detail: 'Unique lengths only.', memory: { unique: '{2, 3}' }, output: '{2, 3}' },
    ],
  },

  /* ── Iterators & Generators ── */
  {
    id: 'generators',
    chapter: 'Iterators & Generators',
    title: 'Generators with yield',
    concept: 'A generator function uses `yield` instead of `return`. Calling it returns a lazy generator — the body runs only as you iterate, producing one value at a time. This is memory-efficient for large or infinite sequences.',
    code: `def count_up(n):
    i = 1
    while i <= n:
        yield i
        i += 1

gen = count_up(3)
for value in gen:
    print(value)`,
    steps: [
      { line: 7, title: 'Create the generator', detail: 'Calling count_up(3) returns a generator object. The body has NOT run yet.', memory: { gen: '<generator>' } },
      { line: 4, title: 'First yield', detail: 'The for loop calls next(): the body runs to the first yield and pauses, producing 1.', memory: { gen: '<generator>', n: '3', i: '1', value: '1' } },
      { line: 9, title: 'Print 1', detail: 'The loop body prints the first value.', memory: { i: '1', value: '1' }, output: '1' },
      { line: 4, title: 'Second yield', detail: 'Iteration resumes after the yield: i becomes 2, then yields 2.', memory: { n: '3', i: '2', value: '2' }, output: '2' },
      { line: 4, title: 'Third yield', detail: 'Resumes again: i becomes 3, yields 3.', memory: { n: '3', i: '3', value: '3' }, output: '3' },
      { line: 3, title: 'Generator exhausted', detail: 'i becomes 4, the while condition is false, the generator ends, and the loop stops.', memory: { n: '3', i: '4' } },
    ],
  },
  {
    id: 'generator-expression',
    chapter: 'Iterators & Generators',
    title: 'Generator expressions',
    concept: 'Like a list comprehension but with parentheses: `(expr for item in iterable)`. It produces values lazily instead of building a whole list — ideal to feed into `sum()`, `max()`, or `any()`.',
    code: `nums = [1, 2, 3, 4]
gen = (n * 2 for n in nums)
total = sum(gen)
print(total)`,
    steps: [
      { line: 1, title: 'Create the list', detail: 'Four integers.', memory: { nums: '[1, 2, 3, 4]' } },
      { line: 2, title: 'Create a lazy generator', detail: 'No doubling happens yet — the generator only yields on demand.', memory: { nums: '[1, 2, 3, 4]', gen: '<generator>' } },
      { line: 3, title: 'sum() consumes it', detail: 'sum pulls 2, 4, 6, 8 one at a time and adds them.', memory: { gen: '<generator>', total: '20' } },
      { line: 4, title: 'Print the total', detail: '2 + 4 + 6 + 8 = 20.', memory: { total: '20' }, output: '20' },
    ],
  },

  /* ── Decorators ── */
  {
    id: 'decorators',
    chapter: 'Decorators',
    title: 'Function decorators',
    concept: 'A decorator wraps a function to add behaviour without changing its code. `@shout` above a function means `greet = shout(greet)`. Decorators power logging, timing, caching, and access control.',
    code: `def shout(func):
    def wrapper(text):
        return func(text).upper()
    return wrapper

@shout
def greet(name):
    return "hello " + name

print(greet("ada"))`,
    steps: [
      { line: 1, title: 'Define the decorator', detail: 'shout takes a function and returns a new wrapper function.', memory: { shout: '<function>' } },
      { line: 6, title: 'Apply @shout', detail: 'greet = shout(greet). The name greet now points to wrapper.', memory: { shout: '<function>', greet: '<function wrapper>' } },
      { line: 10, title: 'Call greet("ada")', detail: 'This actually runs wrapper("ada").', memory: { greet: '<function wrapper>', text: '"ada"' } },
      { line: 3, title: 'Wrapper runs the original', detail: 'func("ada") returns "hello ada", then .upper() transforms it.', memory: { text: '"ada"' } },
      { line: 10, title: 'Print the result', detail: 'The wrapped, upper-cased greeting.', memory: {}, output: 'HELLO ADA' },
    ],
  },

  /* ── Type Hints ── */
  {
    id: 'type-hints',
    chapter: 'Type Hints',
    title: 'Type hints & annotations',
    concept: 'Type hints document the expected types: `def add(a: int, b: int) -> int`. They do NOT change runtime behaviour — Python ignores them at execution — but tools like mypy and your editor use them to catch bugs early and power autocomplete.',
    code: `def add(a: int, b: int) -> int:
    return a + b

name: str = "Ada"
age: int = 30
print(add(2, 3))
print(name, age)`,
    steps: [
      { line: 1, title: 'Annotated function', detail: 'The hints say a and b are ints and it returns an int. Python does not enforce this.', memory: { add: '<function>' } },
      { line: 4, title: 'Annotated variable', detail: 'name: str is a hint; the value is still just a string.', memory: { add: '<function>', name: '"Ada"' } },
      { line: 5, title: 'Another annotation', detail: 'age is hinted as int.', memory: { add: '<function>', name: '"Ada"', age: '30' } },
      { line: 6, title: 'Call add', detail: 'add(2, 3) returns 5 regardless of the hints.', memory: { name: '"Ada"', age: '30' }, output: '5' },
      { line: 7, title: 'Print name and age', detail: 'The annotations had no effect at runtime.', memory: { name: '"Ada"', age: '30' }, output: 'Ada 30' },
    ],
  },

  /* ── Advanced Functions ── */
  {
    id: 'args-kwargs',
    chapter: 'Advanced Functions',
    title: '*args and **kwargs',
    concept: '`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict. They let functions accept any number of arguments.',
    code: `def total(*args):
    return sum(args)

def describe(**kwargs):
    for key in kwargs:
        print(key, "=", kwargs[key])

print(total(1, 2, 3, 4))
describe(name="Ada", role="dev")`,
    steps: [
      { line: 1, title: 'Variadic function', detail: '*args gathers all positional arguments into a tuple.', memory: { total: '<function>' } },
      { line: 4, title: 'Keyword collector', detail: '**kwargs gathers keyword arguments into a dict.', memory: { total: '<function>', describe: '<function>' } },
      { line: 8, title: 'Call total', detail: 'args becomes (1, 2, 3, 4); sum returns 10.', memory: {}, output: '10' },
      { line: 5, title: 'Loop kwargs (name)', detail: 'kwargs is {name: "Ada", role: "dev"}; first key is name.', memory: { kwargs: '{name: "Ada", role: "dev"}', key: '"name"' }, output: 'name = Ada' },
      { line: 5, title: 'Loop kwargs (role)', detail: 'Second key is role.', memory: { kwargs: '{name: "Ada", role: "dev"}', key: '"role"' }, output: 'role = dev' },
    ],
  },
  {
    id: 'closures',
    chapter: 'Advanced Functions',
    title: 'Closures & nonlocal',
    concept: 'A closure is an inner function that remembers variables from the enclosing function even after it returns. `nonlocal` lets the inner function modify that captured variable — the basis for stateful functions and decorators.',
    code: `def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())
print(counter())`,
    steps: [
      { line: 9, title: 'Build the counter', detail: 'make_counter returns increment, which closes over count = 0.', memory: { counter: '<function increment>' } },
      { line: 5, title: 'First call', detail: 'nonlocal count is incremented to 1 and returned.', memory: { count: '1' }, output: '1' },
      { line: 5, title: 'Second call', detail: 'The same captured count persists and becomes 2.', memory: { count: '2' }, output: '2' },
    ],
  },

  /* ── Functional Tools ── */
  {
    id: 'map-filter-lambda',
    chapter: 'Functional Tools',
    title: 'map, filter & lambda',
    concept: 'A `lambda` is a one-line anonymous function. `map` applies a function to every item; `filter` keeps items where the function is true. Wrap them in `list()` to see the results. Many Pythonistas prefer comprehensions, but these are common in real code.',
    code: `nums = [1, 2, 3, 4]
doubled = list(map(lambda n: n * 2, nums))
evens = list(filter(lambda n: n % 2 == 0, nums))
print(doubled)
print(evens)`,
    steps: [
      { line: 1, title: 'Create the list', detail: 'Four integers.', memory: { nums: '[1, 2, 3, 4]' } },
      { line: 2, title: 'map doubles each', detail: 'The lambda n * 2 is applied to every item.', memory: { nums: '[1, 2, 3, 4]', doubled: '[2, 4, 6, 8]' } },
      { line: 3, title: 'filter keeps evens', detail: 'The lambda returns True for even numbers only.', memory: { doubled: '[2, 4, 6, 8]', evens: '[2, 4]' } },
      { line: 4, title: 'Print doubled', detail: 'Every value times two.', memory: { doubled: '[2, 4, 6, 8]', evens: '[2, 4]' }, output: '[2, 4, 6, 8]' },
      { line: 5, title: 'Print evens', detail: 'Only even values remain.', memory: { evens: '[2, 4]' }, output: '[2, 4]' },
    ],
  },

  /* ── Testing ── */
  {
    id: 'assertions-testing',
    chapter: 'Testing',
    title: 'Testing with assert',
    concept: '`assert condition` raises an AssertionError if the condition is false, and does nothing if true. Grouping asserts into `test_` functions is the foundation of automated testing with pytest and unittest.',
    code: `def is_even(n):
    return n % 2 == 0

def test_is_even():
    assert is_even(4) is True
    assert is_even(3) is False
    print("test_is_even passed")

test_is_even()`,
    steps: [
      { line: 1, title: 'Function under test', detail: 'is_even returns True for even numbers.', memory: { is_even: '<function>' } },
      { line: 4, title: 'Define the test', detail: 'A test_ function groups related assertions.', memory: { is_even: '<function>', test_is_even: '<function>' } },
      { line: 5, title: 'First assertion passes', detail: 'is_even(4) is True, so assert does nothing.', memory: {} },
      { line: 6, title: 'Second assertion passes', detail: 'is_even(3) is False, matching the expected value.', memory: {} },
      { line: 7, title: 'Report success', detail: 'All assertions held, so the test prints its pass message.', memory: {}, output: 'test_is_even passed' },
    ],
  },

  /* ── Async (overview) ── */
  {
    id: 'async-await',
    chapter: 'Async',
    title: 'async / await (overview)',
    concept: 'An `async def` defines a coroutine; `await` pauses it to let other work run, then resumes. Real async needs an event loop (`asyncio.run`). This trace models the ordering — note that code after `await` runs after the awaited work, not immediately.',
    code: `import asyncio

async def main():
    print("start")
    await asyncio.sleep(0)
    print("end")

asyncio.run(main())`,
    steps: [
      { line: 1, title: 'Import asyncio', detail: 'The asyncio module provides the event loop and sleep.', memory: { asyncio: '<module>' } },
      { line: 3, title: 'Define a coroutine', detail: 'async def creates a coroutine function — calling it does not run it directly.', memory: { asyncio: '<module>', main: '<coroutine function>' } },
      { line: 8, title: 'Run the event loop', detail: 'asyncio.run(main()) starts the loop and drives the coroutine.', memory: {} },
      { line: 4, title: 'Print start', detail: 'The coroutine runs until the first await.', memory: {}, output: 'start' },
      { line: 5, title: 'Await yields control', detail: 'await asyncio.sleep(0) pauses main and lets the loop run other tasks.', memory: {} },
      { line: 6, title: 'Resume and print end', detail: 'After the await completes, the coroutine resumes.', memory: {}, output: 'end' },
    ],
  },
];

const CHAPTERS = Array.from(new Set(LESSONS.map(lesson => lesson.chapter)));

const DEFAULT_PARAMS = {
  variables: { name: 'Ada', language: 'Python', year: '1991' },
  conditionals: { score: '82' },
  loops: { tasks: 'read, code, ship' },
  dicts: { name: 'Ada', role: 'admin' },
  functions: { price: '100', rate: '0.18' },
  files: { language: 'Python', version: '3' },
};

function quote(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function toNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function fmtNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(4)));
}

function parseTasks(value) {
  return String(value)
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function pyList(values) {
  return `[${values.map(item => quote(item)).join(', ')}]`;
}

function pyPrintedList(values) {
  return `[${values.map(item => `'${item}'`).join(', ')}]`;
}

function parseQuoted(value) {
  const match = String(value).trim().match(/^(['"])(.*)\1$/);
  return match ? match[2].replace(/\\"/g, '"').replace(/\\'/g, "'") : null;
}

function readAssignment(code, name) {
  const match = code.match(new RegExp(`^\\s*${name}\\s*=\\s*(.+?)\\s*$`, 'm'));
  return match ? match[1].trim() : null;
}

function parsePythonList(value) {
  const trimmed = String(value || '').trim();
  if (!/^\[[\s\S]*\]$/.test(trimmed)) return null;
  const body = trimmed.slice(1, -1).trim();
  if (!body) return [];
  const items = body.split(',').map(item => parseQuoted(item.trim()));
  return items.every(item => item !== null) ? items : null;
}

function parseEditableCode(lessonId, code) {
  try {
    if (lessonId === 'variables') {
      const name = parseQuoted(readAssignment(code, 'name'));
      const language = parseQuoted(readAssignment(code, 'language'));
      const year = readAssignment(code, 'year');
      if (!name || !language || !/^[-]?\d+$/.test(year || '')) {
        return { error: 'Use name = "Ada", language = "Python", and year = 1991 style assignments.' };
      }
      return { params: { name, language, year } };
    }

    if (lessonId === 'conditionals') {
      const score = readAssignment(code, 'score');
      if (!/^[-]?\d+(\.\d+)?$/.test(score || '')) {
        return { error: 'Use a numeric assignment like score = 82.' };
      }
      return { params: { score } };
    }

    if (lessonId === 'loops') {
      const tasks = parsePythonList(readAssignment(code, 'tasks'));
      if (!tasks) {
        return { error: 'Use a simple string list like tasks = ["read", "code", "ship"].' };
      }
      return { params: { tasks: tasks.join(', ') } };
    }

    if (lessonId === 'dicts') {
      const name = code.match(/"name"\s*:\s*(['"])(.*?)\1/);
      const role = code.match(/"role"\s*:\s*(['"])(.*?)\1/);
      if (!name || !role) {
        return { error: 'Keep user as a dictionary with "name" and "role" string keys.' };
      }
      return { params: { name: name[2], role: role[2] } };
    }

    if (lessonId === 'functions') {
      const call = code.match(/total\s*=\s*apply_tax\(\s*([-]?\d+(?:\.\d+)?)\s*,\s*([-]?\d+(?:\.\d+)?)\s*\)/);
      if (!call) {
        return { error: 'Keep the call as total = apply_tax(100, 0.18).' };
      }
      return { params: { price: call[1], rate: call[2] } };
    }

    if (lessonId === 'files') {
      const textValue = parseQuoted(readAssignment(code, 'text'));
      if (!textValue) {
        return { error: 'Keep text as a quoted JSON string.' };
      }
      const data = JSON.parse(textValue);
      if (typeof data.language !== 'string' || typeof data.version !== 'number') {
        return { error: 'JSON must include a string language and numeric version.' };
      }
      return { params: { language: data.language, version: String(data.version) } };
    }
  } catch {
    return { error: 'This edit is outside the safe lesson pattern. Restore the lesson or edit the highlighted values only.' };
  }

  return { error: 'This lesson does not have an editable parser yet.' };
}

function getMemoryDiff(previous = {}, current = {}) {
  const changes = [];
  Object.entries(current).forEach(([key, value]) => {
    if (!(key in previous)) changes.push({ key, kind: 'added', before: '', after: value });
    else if (previous[key] !== value) changes.push({ key, kind: 'changed', before: previous[key], after: value });
  });
  Object.entries(previous).forEach(([key, value]) => {
    if (!(key in current)) changes.push({ key, kind: 'removed', before: value, after: '' });
  });
  return changes;
}

function materializeLesson(baseLesson, params) {
  if (baseLesson.id === 'variables') {
    const name = params.name || 'Ada';
    const language = params.language || 'Python';
    const year = String(toNumber(params.year, 1991));
    return {
      ...baseLesson,
      code: `name = ${quote(name)}
language = ${quote(language)}
year = ${year}

print(name)
print(language, year)`,
      steps: [
        { line: 1, title: 'Create name', detail: `Python stores the string ${quote(name)} under the variable name.`, memory: { name: quote(name) } },
        { line: 2, title: 'Create language', detail: 'A second variable points to another string value.', memory: { name: quote(name), language: quote(language) } },
        { line: 3, title: 'Create year', detail: 'Numbers do not need quotes. This value is an integer.', memory: { name: quote(name), language: quote(language), year } },
        { line: 5, title: 'Print one value', detail: 'print(name) looks up the variable and writes its value.', memory: { name: quote(name), language: quote(language), year }, output: name },
        { line: 6, title: 'Print multiple values', detail: 'print can receive several values. Python separates them with spaces.', memory: { name: quote(name), language: quote(language), year }, output: `${language} ${year}` },
      ],
      prompt: 'Challenge: change name to Grace and year to 2026.',
      challenge: {
        title: 'Make the profile match',
        text: 'Set name to Grace and year to 2026.',
        done: name.toLowerCase() === 'grace' && year === '2026',
      },
    };
  }

  if (baseLesson.id === 'conditionals') {
    const score = toNumber(params.score, 82);
    const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : 'C';
    const branchLine = score >= 90 ? 4 : score >= 75 ? 6 : 8;
    const branchText = grade === 'A' ? 'The first if branch is true.' : grade === 'B' ? 'The elif branch is true.' : 'No earlier condition is true, so else runs.';
    return {
      ...baseLesson,
      code: `score = ${score}

if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
else:
    grade = "C"

print(grade)`,
      steps: [
        { line: 1, title: 'Set the score', detail: `The score variable starts with the integer ${score}.`, memory: { score: String(score) } },
        { line: 3, title: 'Check first branch', detail: score >= 90 ? `${score} is at least 90, so Python enters the A branch.` : `${score} is not at least 90, so Python checks the next branch.`, memory: { score: String(score) } },
        ...(score < 90 ? [{ line: 5, title: 'Check elif branch', detail: score >= 75 ? `${score} is at least 75, so this branch runs.` : `${score} is below 75, so Python falls through to else.`, memory: { score: String(score) } }] : []),
        { line: branchLine, title: 'Assign grade', detail: branchText, memory: { score: String(score), grade: quote(grade) } },
        { line: 10, title: 'Print result', detail: 'Python prints the chosen grade.', memory: { score: String(score), grade: quote(grade) }, output: grade },
      ],
      prompt: 'Challenge: change the score so the output becomes A.',
      challenge: {
        title: 'Reach the A branch',
        text: 'Set score to 90 or higher.',
        done: grade === 'A',
      },
    };
  }

  if (baseLesson.id === 'loops') {
    const tasks = parseTasks(params.tasks);
    const upper = tasks.map(item => item.toUpperCase());
    const steps = [
      { line: 1, title: 'Create a list', detail: `tasks holds ${tasks.length} string${tasks.length === 1 ? '' : 's'} in order.`, memory: { tasks: pyList(tasks) } },
      { line: 2, title: 'Create an empty list', detail: 'done starts empty. The loop will append to it.', memory: { tasks: pyList(tasks), done: '[]' } },
    ];
    tasks.forEach((task, index) => {
      steps.push({ line: 4, title: `Loop item ${index + 1}`, detail: `task points to ${quote(task)}.`, memory: { tasks: pyList(tasks), done: pyList(upper.slice(0, index)), task: quote(task) } });
      steps.push({ line: 5, title: 'Append uppercase value', detail: `${task}.upper() returns ${quote(task.toUpperCase())}, then append adds it to done.`, memory: { tasks: pyList(tasks), done: pyList(upper.slice(0, index + 1)), task: quote(task) } });
    });
    steps.push({ line: 7, title: 'Print the list', detail: 'The final list contains one transformed value per input task.', memory: { tasks: pyList(tasks), done: pyList(upper) }, output: pyPrintedList(upper) });
    return {
      ...baseLesson,
      code: `tasks = ${pyList(tasks)}
done = []

for task in tasks:
    done.append(task.upper())

print(done)`,
      steps,
      prompt: 'Challenge: add test as another comma-separated task.',
      challenge: {
        title: 'Add one more loop pass',
        text: 'Add test to the task list.',
        done: tasks.map(item => item.toLowerCase()).includes('test'),
      },
    };
  }

  if (baseLesson.id === 'dicts') {
    const name = params.name || 'Ada';
    const role = params.role || 'admin';
    return {
      ...baseLesson,
      code: `user = {
    "name": ${quote(name)},
    "role": ${quote(role)}
}

user["active"] = True
role = user.get("role", "guest")

print(user["name"])
print(role)`,
      steps: [
        { line: 1, title: 'Create dictionary', detail: 'user starts with name and role keys.', memory: { user: `{name: ${quote(name)}, role: ${quote(role)}}` } },
        { line: 6, title: 'Add a key', detail: 'Assignment through square brackets adds active: True.', memory: { user: `{name: ${quote(name)}, role: ${quote(role)}, active: True}` } },
        { line: 7, title: 'Read safely with get', detail: '.get("role", "guest") returns the role because it exists.', memory: { user: `{name: ${quote(name)}, role: ${quote(role)}, active: True}`, role: quote(role) } },
        { line: 9, title: 'Print one dictionary value', detail: 'user["name"] reads the value stored at the name key.', memory: { user: `{name: ${quote(name)}, role: ${quote(role)}, active: True}`, role: quote(role) }, output: name },
        { line: 10, title: 'Print role', detail: 'role already contains the value returned from .get().', memory: { user: `{name: ${quote(name)}, role: ${quote(role)}, active: True}`, role: quote(role) }, output: role },
      ],
      prompt: 'Challenge: change role to editor.',
      challenge: {
        title: 'Update dictionary data',
        text: 'Set role to editor.',
        done: role.toLowerCase() === 'editor',
      },
    };
  }

  if (baseLesson.id === 'functions') {
    const price = toNumber(params.price, 100);
    const rate = toNumber(params.rate, 0.18);
    const tax = price * rate;
    const total = price + tax;
    return {
      ...baseLesson,
      code: `def apply_tax(price, rate):
    tax = price * rate
    return price + tax

total = apply_tax(${fmtNumber(price)}, ${fmtNumber(rate)})
print(total)`,
      steps: [
        { line: 1, title: 'Define the function', detail: 'Python records the function body but does not run it yet.', memory: { apply_tax: '<function>' } },
        { line: 5, title: 'Call the function', detail: `The call passes ${fmtNumber(price)} into price and ${fmtNumber(rate)} into rate.`, stack: [`apply_tax(price=${fmtNumber(price)}, rate=${fmtNumber(rate)})`], memory: { apply_tax: '<function>', price: fmtNumber(price), rate: fmtNumber(rate) } },
        { line: 2, title: 'Calculate tax', detail: `Inside the function, tax becomes ${fmtNumber(tax)}.`, stack: [`apply_tax(price=${fmtNumber(price)}, rate=${fmtNumber(rate)})`], memory: { apply_tax: '<function>', price: fmtNumber(price), rate: fmtNumber(rate), tax: fmtNumber(tax) } },
        { line: 3, title: 'Return result', detail: `return sends ${fmtNumber(total)} back to the call site.`, stack: [`apply_tax(price=${fmtNumber(price)}, rate=${fmtNumber(rate)})`], memory: { apply_tax: '<function>', return: fmtNumber(total) } },
        { line: 5, title: 'Store returned value', detail: 'total receives the function result.', memory: { apply_tax: '<function>', total: fmtNumber(total) } },
        { line: 6, title: 'Print total', detail: 'The returned value is now available outside the function.', memory: { apply_tax: '<function>', total: fmtNumber(total) }, output: fmtNumber(total) },
      ],
      prompt: 'Challenge: set price to 250 and rate to 0.05.',
      challenge: {
        title: 'Calculate a new total',
        text: 'Set price to 250 and rate to 0.05.',
        done: price === 250 && rate === 0.05,
      },
    };
  }

  if (baseLesson.id === 'files') {
    const language = params.language || 'Python';
    const version = toNumber(params.version, 3);
    const text = `{"language": "${language}", "version": ${version}}`;
    return {
      ...baseLesson,
      code: `import json

text = '${text}'
data = json.loads(text)

print(data["language"])
print(data["version"])`,
      steps: [
        { line: 1, title: 'Import json', detail: 'The json module provides functions for parsing JSON text.', memory: { json: '<module>' } },
        { line: 3, title: 'Receive text', detail: 'A file or API response usually arrives as a string first.', memory: { json: '<module>', text: `'${text}'` } },
        { line: 4, title: 'Parse JSON', detail: 'json.loads turns the text into a Python dictionary.', memory: { json: '<module>', text: `'${text}'`, data: `{language: ${quote(language)}, version: ${version}}` } },
        { line: 6, title: 'Read language', detail: `The language key contains the string ${quote(language)}.`, memory: { data: `{language: ${quote(language)}, version: ${version}}` }, output: language },
        { line: 7, title: 'Read version', detail: `The version key contains the integer ${version}.`, memory: { data: `{language: ${quote(language)}, version: ${version}}` }, output: String(version) },
      ],
      prompt: 'Challenge: change version to 4.',
      challenge: {
        title: 'Update JSON data',
        text: 'Set version to 4.',
        done: version === 4,
      },
    };
  }

  return baseLesson;
}

function readStoredLesson() {
  try {
    return localStorage.getItem(STORAGE_KEY) || LESSONS[0].id;
  } catch {
    return LESSONS[0].id;
  }
}

function writeStoredLesson(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {}
}

function readProgress() {
  try {
    return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function writeProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...progress]));
  } catch {}
}

function PlayIcon({ paused }) {
  return paused ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z" /></svg>
  );
}

function CodePanel({ code, activeLine, error, onChange, onReset }) {
  const lines = code.split('\n');
  return (
    <div className={s.editorWrap}>
      <div className={s.editorSurface}>
        <div className={s.editorGutter} aria-hidden="true">
          {lines.map((_, index) => {
            const lineNo = index + 1;
            return <span key={lineNo} className={activeLine === lineNo ? s.gutterLineActive : s.gutterLine}>{lineNo}</span>;
          })}
        </div>
        <textarea
          className={s.codeTextarea}
          value={code}
          onChange={event => onChange(event.target.value)}
          spellCheck="false"
          aria-label="Editable Python lesson code"
        />
      </div>
      <div className={error ? s.editorStatusError : s.editorStatus}>
        <span>{error || 'Editable safe subset: change lesson values, then run the trace.'}</span>
        <button onClick={onReset}>Restore lesson</button>
      </div>
    </div>
  );
}

function MemoryPanel({ memory = {}, stack = [], changes = [] }) {
  const entries = Object.entries(memory);
  return (
    <div className={s.memoryPanel}>
      <div className={s.panelHeader}>
        <span>Memory</span>
        <span>{entries.length} name{entries.length === 1 ? '' : 's'}</span>
      </div>
      <div className={s.memoryList}>
        {entries.length ? entries.map(([key, value]) => (
          <div key={key} className={`${s.memoryRow} ${changes.some(item => item.key === key && item.kind === 'added') ? s.memoryAdded : ''} ${changes.some(item => item.key === key && item.kind === 'changed') ? s.memoryChanged : ''}`}>
            <span>{key}</span>
            <code>{value}</code>
          </div>
        )) : <p className={s.emptyText}>No variables yet</p>}
      </div>
      <div className={s.panelHeader}>
        <span>Call Stack</span>
        <span>{stack.length || 1} frame</span>
      </div>
      <div className={s.stackList}>
        {(stack.length ? stack : ['global frame']).map(item => <span key={item}>{item}</span>)}
      </div>
      <div className={s.panelHeader}>
        <span>Changed This Step</span>
        <span>{changes.length}</span>
      </div>
      <div className={s.diffList}>
        {changes.length ? changes.map(item => (
          <div key={`${item.kind}-${item.key}`} className={s.diffRow}>
            <span>{item.kind}</span>
            <code>{item.key}</code>
            <p>{item.kind === 'added' ? item.after : item.kind === 'removed' ? item.before : `${item.before} -> ${item.after}`}</p>
          </div>
        )) : <p className={s.emptyText}>No memory change on this line</p>}
      </div>
    </div>
  );
}

function ParamControls({ lessonId, values, onChange, onReset }) {
  const fields = {
    variables: [
      { key: 'name', label: 'name', type: 'text' },
      { key: 'language', label: 'language', type: 'text' },
      { key: 'year', label: 'year', type: 'number' },
    ],
    conditionals: [
      { key: 'score', label: 'score', type: 'number' },
    ],
    loops: [
      { key: 'tasks', label: 'tasks', type: 'text', wide: true, hint: 'comma-separated' },
    ],
    dicts: [
      { key: 'name', label: 'user name', type: 'text' },
      { key: 'role', label: 'role', type: 'text' },
    ],
    functions: [
      { key: 'price', label: 'price', type: 'number' },
      { key: 'rate', label: 'rate', type: 'number', step: '0.01' },
    ],
    files: [
      { key: 'language', label: 'language', type: 'text' },
      { key: 'version', label: 'version', type: 'number' },
    ],
  }[lessonId] || [];

  return (
    <div className={s.inputPanel}>
      <div className={s.inputHeader}>
        <span>Edit safe inputs</span>
        <button onClick={onReset}>Reset inputs</button>
      </div>
      <div className={s.paramGrid}>
        {fields.map(field => (
          <label key={field.key} className={field.wide ? s.paramFieldWide : s.paramField}>
            <span>{field.label}</span>
            <input
              type={field.type}
              step={field.step}
              value={values[field.key] ?? ''}
              onChange={event => onChange(field.key, event.target.value)}
            />
            {field.hint && <small>{field.hint}</small>}
          </label>
        ))}
      </div>
    </div>
  );
}

function ChallengeCard({ challenge }) {
  if (!challenge) return null;
  return (
    <div className={challenge.done ? s.challengeDone : s.challenge}>
      <span>{challenge.done ? 'Challenge complete' : 'Challenge'}</span>
      <strong>{challenge.title}</strong>
      <p>{challenge.text}</p>
    </div>
  );
}

export default function PythonPlaygroundTool() {
  const [activeId, setActiveId] = useState(LESSONS[0].id);
  const [stepIndex, setStepIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [paramValues, setParamValues] = useState(DEFAULT_PARAMS);
  const [codeDrafts, setCodeDrafts] = useState({});
  const [editorErrors, setEditorErrors] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    const stored = readStoredLesson();
    if (LESSONS.some(lesson => lesson.id === stored)) setActiveId(stored);
    setProgress(readProgress());
  }, []);

  const baseLesson = useMemo(() => LESSONS.find(item => item.id === activeId) || LESSONS[0], [activeId]);
  const lesson = useMemo(() => materializeLesson(baseLesson, paramValues[baseLesson.id] || DEFAULT_PARAMS[baseLesson.id] || {}), [baseLesson, paramValues]);
  const editorCode = codeDrafts[baseLesson.id] ?? lesson.code;
  const editorError = editorErrors[baseLesson.id] || '';
  const currentStep = stepIndex >= 0 ? lesson.steps[stepIndex] : null;
  const previousStep = stepIndex > 0 ? lesson.steps[stepIndex - 1] : null;
  const memoryChanges = currentStep ? getMemoryDiff(previousStep?.memory || {}, currentStep.memory || {}) : [];
  const output = useMemo(() => lesson.steps.slice(0, stepIndex + 1).filter(step => step.output).map(step => step.output), [lesson, stepIndex]);
  const progressPct = ((stepIndex + 1) / lesson.steps.length) * 100;
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const selectLesson = useCallback((id) => {
    stopTimer();
    setActiveId(id);
    setStepIndex(-1);
    setPlaying(false);
    writeStoredLesson(id);
  }, [stopTimer]);

  const applyParams = useCallback((lessonId, nextParams) => {
    setParamValues(current => ({
      ...current,
      [lessonId]: {
        ...(current[lessonId] || DEFAULT_PARAMS[lessonId]),
        ...nextParams,
      },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setStepIndex(index => {
      if (index >= lesson.steps.length - 1) {
        setPlaying(false);
        return index;
      }
      return index + 1;
    });
  }, [lesson.steps.length]);

  const reset = useCallback(() => {
    stopTimer();
    setPlaying(false);
    setStepIndex(-1);
  }, [stopTimer]);

  const markDone = useCallback(() => {
    setProgress(current => {
      const next = new Set(current);
      if (next.has(lesson.id)) next.delete(lesson.id);
      else next.add(lesson.id);
      writeProgress(next);
      return next;
    });
  }, [lesson.id]);

  const updateParam = useCallback((key, value) => {
    stopTimer();
    setPlaying(false);
    setStepIndex(-1);
    const nextParams = {
      ...(paramValues[baseLesson.id] || DEFAULT_PARAMS[baseLesson.id]),
      [key]: value,
    };
    applyParams(baseLesson.id, nextParams);
    const nextLesson = materializeLesson(baseLesson, nextParams);
    setCodeDrafts(current => ({ ...current, [baseLesson.id]: nextLesson.code }));
    setEditorErrors(current => ({ ...current, [baseLesson.id]: '' }));
  }, [applyParams, baseLesson, paramValues, stopTimer]);

  const resetParams = useCallback(() => {
    stopTimer();
    setPlaying(false);
    setStepIndex(-1);
    const nextParams = { ...DEFAULT_PARAMS[baseLesson.id] };
    applyParams(baseLesson.id, nextParams);
    const nextLesson = materializeLesson(baseLesson, nextParams);
    setCodeDrafts(current => ({ ...current, [baseLesson.id]: nextLesson.code }));
    setEditorErrors(current => ({ ...current, [baseLesson.id]: '' }));
  }, [applyParams, baseLesson, stopTimer]);

  const updateCode = useCallback((value) => {
    stopTimer();
    setPlaying(false);
    setStepIndex(-1);
    setCodeDrafts(current => ({ ...current, [baseLesson.id]: value }));
    const result = parseEditableCode(baseLesson.id, value);
    if (result.error) {
      setEditorErrors(current => ({ ...current, [baseLesson.id]: result.error }));
      return;
    }
    setEditorErrors(current => ({ ...current, [baseLesson.id]: '' }));
    applyParams(baseLesson.id, result.params);
  }, [applyParams, baseLesson.id, stopTimer]);

  const resetCode = useCallback(() => {
    resetParams();
  }, [resetParams]);

  useEffect(() => {
    stopTimer();
    if (!playing) return undefined;
    if (stepIndex >= lesson.steps.length - 1) {
      setPlaying(false);
      return undefined;
    }
    timerRef.current = setTimeout(nextStep, speed);
    return stopTimer;
  }, [lesson.steps.length, nextStep, playing, speed, stepIndex, stopTimer]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="python-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/python-playground.svg" alt="" width="24" height="24" />
          <span className={s.headerTitle}>Python <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
          <label className={s.speedControl}>
            <span>Speed</span>
            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
              <option value={1300}>Slow</option>
              <option value={900}>Normal</option>
              <option value={500}>Fast</option>
            </select>
          </label>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} />
              Python
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
          <div className={s.progress}>
            <div className={s.progressLabel}>
              <span>Progress</span>
              <span>{completedCount} / {LESSONS.length}</span>
            </div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} />
            </div>
          </div>
          <div className={s.lessonList}>
            {CHAPTERS.map(chapter => (
              <div key={chapter}>
                <div className={s.chapterLabel}>{chapter}</div>
                {LESSONS.filter(item => item.chapter === chapter).map(item => (
                  <button
                    key={item.id}
                    className={`${s.lessonBtn} ${item.id === lesson.id ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                    onClick={() => selectLesson(item.id)}
                  >
                    <span className={s.lessonDot} />
                    {item.title}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        <main className={s.main}>
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && <div className={s.conceptBody}>{lesson.concept}</div>}
          </div>

          <div className={s.toolbar}>
            <div className={s.controls}>
              <button className={s.primaryButton} onClick={() => setPlaying(value => !value)} disabled={!!editorError}>
                <PlayIcon paused={playing} />
                {playing ? 'Pause' : stepIndex < 0 ? 'Run Trace' : 'Resume'}
              </button>
              <button className={s.secondaryButton} onClick={nextStep} disabled={!!editorError || stepIndex >= lesson.steps.length - 1}>Step</button>
              <button className={s.secondaryButton} onClick={reset}>Reset</button>
              <button className={`${s.secondaryButton} ${isDone ? s.doneButton : ''}`} onClick={markDone}>{isDone ? 'Done' : 'Mark Done'}</button>
            </div>
            <span className={s.stepCounter}>{Math.max(stepIndex + 1, 0)} / {lesson.steps.length}</span>
          </div>

          <div className={s.progressTrack}>
            <div className={s.progressFill} style={{ width: `${progressPct}%` }} />
          </div>

          <section className={s.workspace}>
            <div className={s.editorPanel}>
              <div className={s.panelHeader}>
                <span>Editor</span>
                <span>{editorError ? 'Parser needs supported code' : 'Editable safe subset'}</span>
              </div>
              <CodePanel code={editorCode} activeLine={currentStep?.line} error={editorError} onChange={updateCode} onReset={resetCode} />
            </div>

            <div className={s.dragHandle} />

            <div className={s.tracePanel}>
              <div className={s.panelHeader}>
                <span>Trace & Memory</span>
                <span>{stepIndex < 0 ? 'Ready' : `Step ${stepIndex + 1}/${lesson.steps.length}`}</span>
              </div>
              <div className={s.traceScroll}>
                <ParamControls
                  lessonId={baseLesson.id}
                  values={paramValues[baseLesson.id] || DEFAULT_PARAMS[baseLesson.id]}
                  onChange={updateParam}
                  onReset={resetParams}
                />
                <ChallengeCard challenge={lesson.challenge} />
                <div className={s.stepCard}>
                  {currentStep ? (
                    <>
                      <h3>{currentStep.title}</h3>
                      <p>{currentStep.detail}</p>
                    </>
                  ) : (
                    <>
                      <h3>Press Run Trace</h3>
                      <p>This playground does not execute arbitrary Python. It plays a deterministic trace so beginners can see how code changes memory and output.</p>
                    </>
                  )}
                </div>
                <MemoryPanel memory={currentStep?.memory} stack={currentStep?.stack} changes={memoryChanges} />
                <div className={s.innerPanelHeader}>
                  <span>Console</span>
                  <span>Simulated</span>
                </div>
                <div className={s.console}>
                  {output.length ? output.map((line, index) => (
                    <div key={`${line}-${index}`} className={s.consoleLine}>
                      <span>{index + 1}</span>
                      <code>{line}</code>
                    </div>
                  )) : <p className={s.emptyText}>No output yet</p>}
                </div>
                <div className={s.practice}>
                  <span>Practice prompt</span>
                  <p>{lesson.prompt}</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
