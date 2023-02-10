// New Chaphter
// Object Types

// Index Signatures
export interface StringArray {
  [index: number]: string
}

const myArray: StringArray = { 1: 'jjhh' }
const secondItem = myArray[1]
// Only some types are allowed for index signature properties: =>
// string, number, symbol, template string patterns, and union types consisting only of these.
interface NumberDictionary {
  [index: string]: number

  length: number // ok
  // @ts-expect-error
  name: string
}
// However, properties of different types are acceptable if the index signature is a union of the property types:
interface NumberOrStringDictionary {
  [index: string]: number | string
  length: number // ok, length is a number
  name: string // ok, name is a string
}
// Finally, you can make index signatures readonly in order to prevent assignment to their indices:
interface ReadonlyStringArray {
  readonly [index: number]: string
}

let myArray1: ReadonlyStringArray = {} as any
// myArray1[2] = "Mallory";
