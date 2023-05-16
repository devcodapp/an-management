export class UserAlreadExists extends Error {
  constructor() {
    super('User alread exists');
  }
}
