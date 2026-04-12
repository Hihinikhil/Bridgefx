const BASE = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

/**
 * Fetch from Strapi REST API.
 * @param {string} path - e.g. '/portfolio-items?sort=order'
 * @returns {Promise<any>}
 */
export async function fetchStrapi(path) {
  const url = `${BASE}/api${path.startsWith('/') ? path : `/${path}`}`

  const res = await fetch(url, {
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`)
  return res.json()
}
