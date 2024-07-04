export interface User {
  id: string,
  roles: Array<string>,
  firstName: string,
  lastName: string,
  username: string,
  password: string
}

export type currentUser = Omit<User, 'password'>;

export type newUser = Omit<User, 'id'>;