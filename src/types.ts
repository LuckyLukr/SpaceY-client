export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: number,
  birth: string,
  role: string,
  consum: number,
  weight: number,
  status: string
}

export interface Spacecraft {
  id: string,
  name: string,
  type: string,
  weight: number,
  status: string,
  destroyed: boolean,
  seats: number,
  tankCapacity: number,
  tankCondition: number,
  motorImpulse: number,
  fuelConsumption: number,
  startCombustion: number,
  landingCombustion: number,
  fridge: number,
  img: string
}

export interface UserWithToken {
  access_token: string,
  user: User
}

export interface Destination {
  name: string,
  distance: number,
  image: string,
}

export interface Mission {
  id: number,
  name: string,
  spacecraft: Spacecraft,
  astronauts: User[],
  status: string,
  blastOff: string,
  landing: string,
  destination: string,
  distance: number,
  time: string
}