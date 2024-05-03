import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

type Data = {
  success?: boolean;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { password } = req.body;
    const correctPassword = process.env.SECRET_PASSWORD;

    if (password === correctPassword) {
      // sets cookie
      res.setHeader('Set-Cookie', serialize('auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',  
        path: '/',
        maxAge: 2 * 24 * 60 * 60 // 
      }));
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: 'Incorrect Password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
