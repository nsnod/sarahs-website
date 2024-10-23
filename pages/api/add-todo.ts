import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and Service Role Key must be set in environment variables.');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text, day } = req.body;

    const { data, error } = await supabaseAdmin
      .from('todos')
      .insert([{ text, day, completed: false }])
      .select(); 

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(500).json({ error: 'Insertion failed or returned no data.' });
    }

    return res.status(200).json(data[0]); 
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}