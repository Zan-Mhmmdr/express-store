import { register } from "../service/auth.service";

export const registerAuth = (req: any, res: any) => {
  const data = req.body;
  register(data);
  res.send("User registered successfully");
};

export const loginAuth = (req: any, res: any) => {
  const data = req.body;
  // Implement login logic here
  res.send("User logged in successfully");
};
