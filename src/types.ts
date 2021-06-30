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
  onMission: boolean
}

export interface Spacecraft {
  id: string,
  name: string,
  type: string,
  weight: number,
  onMission: boolean,
  destroyed: boolean,
  seats: number,
  tankCapacity: number,
  tankCondition: number,
  motorImpulse: number,
  fridge: number,
  img: string
}

export interface UserWithToken {
  access_token: string,
  user: User
}

export interface Destination {
  name: string,
  coordX: number,
  coordY: number,
  coordZ: number,
}

export interface Mission {
  spacecraft: Spacecraft,
  astronauts: User[],
  status: string,
  fridge: number,
  fuel: number,
  totalWeight: number,
  blastOff: string,
  landing: string,
  startLocation: string,
  endLocation: string,
  distance: number
  time: string
}