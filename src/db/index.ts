import { v1 } from "uuid";

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

const DATABASE: User[] = [];

export const findAll = async () => {
  return Promise.resolve(DATABASE);
};

export const findOne = async (id: string): Promise<User | undefined> => {
  const result = DATABASE.find((user) => user.id === id);

  if (result) {
    return Promise.resolve(result);
  } else {
    return Promise.reject(`Not found: ${id}`);
  }
};

export const create = (body: Omit<User, "id">) => {
  const user: User = { ...body, id: v1() };
  DATABASE.push(user);

  return Promise.resolve(user);
};
