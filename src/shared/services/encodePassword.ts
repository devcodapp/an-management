import * as bcrypt from 'bcrypt';

export function encodePassword(password: string): string {
  const saltOrRounds = 10;
  const hash = bcrypt.hashSync(password, saltOrRounds);

  return hash;
}
