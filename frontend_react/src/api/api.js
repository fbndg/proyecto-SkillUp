// [Frontend] 1. Conexión a la API (3h) | [US-01]
// Archivo central para todas las llamadas al Backend
// Nomenclatura oficial del cliente - Data Analyst: login y sign_up

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Helper para hacer fetch con manejo de errores MKTG Semana 2
async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
  } catch {
    // Sin conexión
    throw new Error("NO_CONNECTION");
  }

  let data = null;
  try { data = await res.json(); } catch { data = null; }

  if (!res.ok) {
    // Backend devuelve { message: "..." } o { error: "..." }
    const msg = data?.message || data?.error || "";
    const err = new Error(msg || `HTTP_${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Evento: login - [Material del Cliente - Data Analyst]
export async function login(email, password) {
  // POST /api/auth/login - retorna { token, user }
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  // Guardar sesión
  if (data?.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user || { email }));
  }
  return data;
}

// Evento: sign_up - [Material del Cliente - Data Analyst]
// Ojo: en código el evento se llama sign_up, en pantalla el botón dice "Crear mi cuenta"
export async function sign_up(name, email, password) {
  // POST /api/auth/register - Rodolfo usa /register, no /signup
  const data = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return data;
}

export async function getCourses() {
  return request("/courses", { method: "GET" });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("token");
}

export { API_URL };
export default { login, sign_up, getCourses, logout, getToken, API_URL };
