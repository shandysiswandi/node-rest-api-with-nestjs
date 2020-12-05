import * as bcrypt from 'bcrypt';

const rounds = 10;

export async function hashBcrypt(password: string): Promise<string> {
  const hashPassword = await bcrypt.hash(password, rounds);

  return hashPassword;
}

export async function compareBcrypt(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);

  return isMatch;
}
