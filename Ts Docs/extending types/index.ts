// Extending Types
export interface BasicAddress {
  name?: string
  street: string
  city: string
  country: string
  postalCode: string
}

interface AddressWithUnit extends BasicAddress {
  unit: string
}

interface Colorful {
  color: string
}

interface CircleNew {
  radius: number
}

interface Colorfulrect extends Colorful, CircleNew {}

const cc: Colorfulrect = {
  color: 'red',
  radius: 42,
}

// Intersection Types
// interfaces allowed us to build up new types from other types by extending them.
//  TypeScript provides another construct called intersection types that is mainly used to combine existing object types.
// An intersection type is defined using the & operator.
interface Colorful {
  color: string
}
interface CircleSecond {
  radius: number
}

type ColorfulCircle = Colorful & CircleSecond
// Here, we’ve intersected Colorful and Circle to produce a new type that has all the members of Colorful and Circle.

// Interfaces vs. Intersections
// The principle difference between the two is how conflicts are handled,
// and that difference is typically one of the main reasons why you’d pick
// one over the other between an interface and a type alias of an intersection type.
