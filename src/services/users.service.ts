interface User {
  id: number;
  name: string;
  email?: string;
}

// dummy data (nanti ganti DB)
let users: User[] = [
  { id: 1, name: "John", email: "john@mail.com" },
  { id: 2, name: "Jane", email: "jane@mail.com" },
];

export const getAllUsers = async (): Promise<User[]> => {
  return users;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const user = users.find((u) => u.id === id);
  return user || null;
};

export const createUser = async (
  name: string,
  email: string
): Promise<User> => {
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  return newUser;
};

export const updateUser = async (
  id: number,
  name: string,
  email: string
): Promise<User | null> => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return null;

  users[index] = { id, name, email };
  return users[index];
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const lengthBefore = users.length;
  users = users.filter((u) => u.id !== id);

  return users.length < lengthBefore;
};
