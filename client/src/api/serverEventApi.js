const BASE = "/api/events";

export async function fetchEventsFromServer() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Falha ao buscar eventos");
  return res.json();
}

export async function fetchEventFromServer(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Evento não encontrado");
  return res.json();
}

export async function createEventOnServer(event) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Falha ao criar evento");
  return res.json();
}

export async function updateEventOnServer(id, changes) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error("Falha ao atualizar evento");
  return res.json();
}

export async function deleteEventOnServer(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao excluir evento");
  return true;
}
