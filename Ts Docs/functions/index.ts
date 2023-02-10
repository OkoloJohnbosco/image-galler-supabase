// Function Type Expressions
export type fn = (a: string) => void

function greeter(fn: fn) {
  fn('Hello, World')
}

function printToConsole(s: string) {
  console.log(s)
}

greeter(printToConsole)

// Call Signatures
type DescribableFunction = {
  description: number
  (someArg: number): boolean
}

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6))
}

// Construct Signatures
type SomeObject = {
  name: string
}
type SomeConstructor = {
  new (s: string): SomeObject
}

function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}

// Some objects, like JavaScript’s Date object, can be called with or without new.
// You can combine call and construct signatures in the same type arbitrarily:

interface CallOrConstruct {
  new (s: string): Date
  (n?: number): number
}

// Generic Functions
function firstElement<Type>(arr: Type[]): Type | undefined {
  console.log(arr[0])
  return arr[0]
}

firstElement([100, 2, 3])

// Generic Inference
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func)
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(['1', '2', '3'], (n) => parseInt(n))

// Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3])
// longerString is of type 'alice' | 'bob'
const longerString = longest('alice', 'bob')
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj
  } else {
    return { ...obj }
  }
}

// Specifying Type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}

const result = combine([1, 2, 3], [1, 2, 3])
console.log(result)

const test = combine<string | number>([1, 2, 3], ['hello'])
console.log(test)

// Guidelines for Writing Good Generic Functions
const one = console.log('Push Type Parameters Down')
function firstElement1<Type>(arr: Type[]) {
  return arr[0]
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0]
}

// a: number (good)
const a = firstElement1([1, 2, 3])
// b: any (bad)
const b = firstElement2([1, 2, 3])

const two = console.log('Use Fewer Type Parameters')
// Good
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func)
}

// bad
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func)
}

const three = console.log('Type Parameters Should Appear Twice')
// Sometimes we forget that a function might not need to be generic:

// Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}
myForEach([1, 2, 3], (a) => console.log(a))
myForEach([1, 2, 3], (a, i) => console.log(a, i))

// Function Overloads
function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}
const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)
// const d3 = makeDate(1, 3);

function len(s: string): number
function len(arr: any[]): number
function len(x: any) {
  return x.length
}
len('') // OK
len([0]) // OK
// len(Math.random() > 0.5 ? "hello" : [0]);

// Declaring this in a Function
// TypeScript will infer what the this should be in a function via code flow analysis
interface User {
  name: string
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}

// const getDB: () => DB = () => {
//   return {
//     filterUsers: (filter: (this: User) => boolean): User[]
//   }
// };

// const db = getDB();

// const admins = db.filterUsers(function (this: User) {
//   return this.admin;
// });

function fn2(x: string | number) {
  if (typeof x === 'string') {
    // do something
  } else if (typeof x === 'number') {
    // do something else
  } else {
    x // has type 'never'!
  }
}

// Rest Parameters
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x)
}
// 'a' gets value [10, 20, 30, 40]
const arr = multiply(10, 1, 2, 3, 4)

function multiply2<T extends number>(n: T, ...m: T[]) {
  return m.map((x) => n * x)
}
const arr2 = multiply2(10, 1, 2, 3, 4, 8, 9)

// Rest Arguments
const arr3 = [1, 2, 3]
const arr4 = [4, 5, 6]
arr3.push(...arr2)

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5] as const
const angle = Math.atan2(...args)
// Using rest arguments may require turning on downlevelIteration when targeting older runtimes.

// Parameter Destructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c)
  return a + b + c
}
sum({ a: 10, b: 3, c: 9 })

// Return void
//1) The void return type for functions can produce some unusual, but expected behavior.
//2) Contextual typing with a return type of void does not force functions to not return something.
//3) Another way to say this is a contextual function type with a void return type (type vf = () => void),
//4)  when implemented, can return any other value, but it will be ignored.
// 5) Thus, the following implementations of the type () => void are valid:
type voidFunc = () => void
const f1: voidFunc = () => {
  return true
}
// And when the return value of one of these functions is assigned to another variable, it will retain the type of void:
const v1 = f1()
// There is one other special case to be aware of, when a literal function definition has a void return type, that function must not return anything.
function f2(): void {
  // @ts-expect-error
  return true
}
const f3 = function (): void {
  // @ts-expect-error
  return true
}
