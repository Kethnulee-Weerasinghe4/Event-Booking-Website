import bcrypt from "bcrypt";

let users = [];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    passwordHash,
    tickets: [],
    history: [],
    payment: { lastPayment: "-", totalSpent: 0 },
  };

  users.push(newUser);

  return res.status(201).json({ message: "User created successfully" });
}

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}
