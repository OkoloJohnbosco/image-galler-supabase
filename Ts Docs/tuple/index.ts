// Tuple Type
// A tuple type is another sort of Array type that knows exactly
// how many elements it contains, and exactly which types it contains at specific positions.
export type StringNumberPair = [string, number]

// We can also destructure tuples using JavaScript’s array destructuring.
function doSomethingTuple(stringHash: [string, number]) {
  const [inputString, hash] = stringHash

  console.log(inputString)
  console.log(hash)
}
doSomethingTuple(['hello', 2])

// Another thing you may be interested in is that tuples can have optional properties
// by writing out a question mark (? after an element’s type).
// Optional tuple elements can only come at the end, and also affect the type of length.
type Either2dOr3d = [number, number, number?]

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord
  console.log(`Provided coordinates had ${coord.length} dimensions`)
}

// Tuples can also have rest elements, which have to be an array/tuple type.
type StringNumberBooleans = [string, number, ...boolean[]]
type StringBooleansNumber = [string, ...boolean[], number]
type BooleansStringNumber = [...boolean[], string, number]

/* StringNumberBooleans describes a tuple whose first two elements are string and number respectively, 
but which may have any number of booleans following. */

/* StringBooleansNumber describes a tuple whose first element is string and then any number
of booleans and ending with a number. */

/* BooleansStringNumber describes a tuple whose starting elements are any number of 
booleans and ending with a string then a number. */

// A tuple with a rest element has no set “length” - it only has a set of well-known elements in different positions.

// Tuples types can be used in rest parameters and arguments, so that the following:
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args

  return input
}

// readonly Tuple Types
// One final note about tuple types - tuples types have readonly variants, and can be specified by sticking a
// readonly modifier in front of them - just like with array shorthand syntax.

function doSomethingReadonlyTuple(pair: readonly [string, number]) {
  // @ts-expect-error
  pair[0] = 'hello!'
}

let point = [3, 4] as const

// function distanceFromOrigin([x, y]: readonly [number, number]) {
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2)
}
// @ts-expect-error
distanceFromOrigin(point)
// Here, distanceFromOrigin never modifies its elements, but expects a mutable tuple.
//  Since point’s type was inferred as readonly [3, 4], it won’t be compatible with [number, number]
// since that type can’t guarantee point’s elements won’t be mutated.
