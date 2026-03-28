const BASE = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

/**
 * Fetch from Strapi REST API.
 * @param {string} path - e.g. '/portfolio-items?sort=order'
 * @returns {Promise<any>}
 */
export async function fetchStrapi(path) {
  // Add a timestamp query parameter to bypass any intermediate caching
  const separator = path.includes('?') ? '&' : '?'
  const url = `${BASE}/api${path}${separator}t=${Date.now()}`
  
  const res = await fetch(url, {
    cache: 'no-store', // Tell the browser not to use its cache
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`)
  return res.json()
}
