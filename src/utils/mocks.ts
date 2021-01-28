export interface User {
  id: string,
  username: string,
  email: string,
  password?: string,
  token?: string,
  refreshToken?: string
}

export const users: User[] = [
  { id: '1', username: 'abdiel', email: 'abdielprime@gmail.com', password: 'secret' },
  { id: '1', username: 'abdullah', email: 'abdullah@gmail.com', password: 'secret' },
]
