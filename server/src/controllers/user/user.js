import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../db.js'; 

const router = express.Router();
const SECRET = 'your_jwt_secret';

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await db.collection('users').findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ name, email, password: hashedPassword });
  res.json({ message: 'Signup successful' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.collection('users').findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id, name: user.name }, SECRET, { expiresIn: '1d' });
  res.json({ token });
});

router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await db.collection('users').findOne({ _id: new db.ObjectId(decoded.userId) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
