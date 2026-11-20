export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const COMENZI_RESOURCE = "/comenzi";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    throw new Error(`Eroare server : ${res.status}`);
  }
  //204 No Content
  return res.status === 204 ? null : res.json();
}

export function fetchComenzi() {
  return request(COMENZI_RESOURCE);
}

export function createComanda(comanda) {
  return request(COMENZI_RESOURCE, {
    method: "POST",
    body: JSON.stringify(comanda),
  });
}

export function updateComanda(id, changes) {
  return request(`${COMENZI_RESOURCE}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteComanda(id) {
  return request(`${COMENZI_RESOURCE}/${id}`, {
    method: "DELETE",
  });
}
