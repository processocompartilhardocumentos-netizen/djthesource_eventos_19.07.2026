import { supabase } from "../lib/supabaseClient";

const TABLE = "eventos";

export async function fetchEvents() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchEventById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function addEvent(event) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([event])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id, changes) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(changes)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
  return true;
}
