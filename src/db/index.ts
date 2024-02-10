import { v1 } from "uuid";

type User = {
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
