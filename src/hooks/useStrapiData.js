import { useState, useEffect } from 'react'
import { fetchStrapi } from '../lib/strapi'

/**
 * Fetch a Strapi collection and fall back to hardcoded data if unavailable.
 *
 * @param {string} endpoint - e.g. '/portfolio-items?sort=order'
 * @param {Array}  fallback  - the original hardcoded array to use if Strapi is offline
 * @returns {{ data: Array, loading: boolean, error: Error|null }}
 */
export function useStrapiData(endpoint, fallback = []) {
  const [data, setData]       = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchStrapi(endpoint)
      .then(res => {
        if (cancelled) return
        // Strapi v5 wraps results in { data: [...] } for collections or { data: {...} } for single types
        let items = res?.data
        if (items) setData(items)
        // if CMS returns nothing yet, keep using the fallback
      })
      .catch(err => {
        if (cancelled) return
        setError(err)
        // silently fall back to hardcoded data — site still works offline
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [endpoint])

  return { data, loading, error }
}
