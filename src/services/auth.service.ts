interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// dummy user store (nanti DB)
let users: User[] = [];

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<Omit<User, "password">> => {
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password, // nanti di-hash
  };

  users.push(newUser);

  // jangan balikin password
  const { password: _, ...safeUser } = newUser;
  return safeUser;
};

export const login = async (
  email: string,
  password: string
): Promise<Omit<User, "password">> => {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const { password: _, ...safeUser } = user;
  return safeUser;
};
