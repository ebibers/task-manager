export interface User {
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string
}

export type currentUser = Omit<User, 'password'>;