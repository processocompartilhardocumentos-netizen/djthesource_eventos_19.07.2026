import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_KEY ?? "",
);

export default async function handler(req, res) {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return res.status(500).json({ error: "Supabase configuration missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY." });
    }

    const { id } = req.query;

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", id)
        .single();
      if (error) return res.status(404).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const changes = req.body;
      const { data, error } = await supabase
        .from("eventos")
        .update(changes)
        .eq("id", id)
        .select()
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const { error } = await supabase.from("eventos").delete().eq("id", id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(204).end();
    }

    res.setHeader("Allow", "GET,PUT,DELETE");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
