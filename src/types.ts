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
}

export interface UserWithToken {
  access_token: string,
  user: User
}