import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = [
  process.env.SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_URL,
].find((value) => !!value);
const SUPABASE_KEY = [
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  process.env.SUPABASE_ANON_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  process.env.VITE_SUPABASE_ANON_KEY,
].find((value) => !!value);

const getSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    const message =
      "Supabase configuration missing. Set SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) in Vercel environment variables.";
    console.error(message, {
      SUPABASE_URL: !!SUPABASE_URL,
      SUPABASE_KEY: !!SUPABASE_KEY,
      env: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      },
    });
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_KEY);
};

export default async function handler(req, res) {
  try {
    const supabase = getSupabaseClient();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const payload = req.body;
      const { data, error } = await supabase
        .from("eventos")
        .insert([payload])
        .select()
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    }

    res.setHeader("Allow", "GET,POST");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
