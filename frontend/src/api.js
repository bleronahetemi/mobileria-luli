export const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Kthen trupin e pergjigjes, ose hedh nje Error me mesazhin e serverit.
export async function request(path, options = {}) {
  let res;

  try {
    res = await fetch(`${API}${path}`, options);
  } catch (err) {
    throw new Error('Serveri nuk po pergjigjet. A eshte i ndezur?');
  }

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    // Disa pergjigje (p.sh. 500 nga proxy) nuk jane JSON.
  }

  if (!res.ok) {
    throw new Error(data?.message || `Gabim ne server (${res.status})`);
  }

  return data;
}
