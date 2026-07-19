import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_SERVICE_ROLE_KEY ?? "",
);

export default async function handler(req, res) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Supabase configuration missing" });
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
