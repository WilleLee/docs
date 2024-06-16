import bcrypt from "bcrypt";
import { User } from "./definitions";

const RAW_PASSWORD = process.env.MOCK_PASSWORD || "";
const HASH_ROUND = 3;

export async function getUsers() {
  const hashedPassword = await bcrypt.hash(RAW_PASSWORD, HASH_ROUND);
  const users: User[] = [
    {
      id: "0",
      email: "aaa@bbb.com",
      password: hashedPassword,
    },
    {
      id: "1",
      email: "ccc@ddd.com",
      password: hashedPassword,
    },
  ];
  return users;
}
