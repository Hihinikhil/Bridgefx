const BASE = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

/**
 * Fetch from Strapi REST API.
 * @param {string} path - e.g. '/portfolio-items?sort=order'
 * @returns {Promise<any>}
 */
export async function fetchStrapi(path) {
  const res = await fetch(`${BASE}/api${path}`)
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`)
  return res.json()
}
