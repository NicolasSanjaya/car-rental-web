export type User = {
  email?: string;
  full_name?: string;
  id: string; // Assuming id is a unique identifier for the user
  role?: "admin" | "user"; // Assuming roles are either 'admin' or 'user'
};
