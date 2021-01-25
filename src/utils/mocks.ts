export interface User {
  id: number,
  username: string,
  email: string,
  password: string
}

export const users: User[] = [
  { id: 1, username: 'abdiel', email: 'abdielprime@gmail.com', password: 'secret' },
  { id: 2, username: 'abdullah', email: 'abdullah@gmail.com', password: 'secret' },
]
