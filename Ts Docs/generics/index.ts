// Generic Object Types
export interface Box<Type> {
  contents: Type
}
let box: Box<string>
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents

  return box
}
console.log(setContents({ contents: 400 }, 200))
// Since type aliases, unlike interfaces, can describe more than just object types,
// we can also use them to write other kinds of generic helper types.
type OrNull<Type> = Type | null

type OneOrMany<Type> = Type | Type[]

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>

type OneOrManyOrNullStrings = OneOrManyOrNull<string>

const john: OrNull<string> = 'Okolo'

// The Array Type
Array<string>
Array<number>
Array<number | string>

// Map Map<K, V>
// Set Set<T>
// Promise Promise<T>

// The ReadonlyArray Type
// readonly string[].
const arrStr: ReadonlyArray<string> = ['string']

// One last thing to note is that unlike the readonly property modifier,
// assignability isn’t bidirectional between regular Arrays and ReadonlyArrays.
let x: readonly string[] = []
let y: string[] = []

x = y
// @ts-expect-error
y = x

// GENERICS CHAPHTER TWO
function identity<Type>(arg: Type): Type {
  return arg
}

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length) // Array has a .length, so no more error
  return arg
}
function loggingIdentity2<Type>(arg: Type[]): Type[] {
  console.log(arg.length)
  return arg
}

try {
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message)
  }
}
