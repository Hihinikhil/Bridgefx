'use strict';

/**
 * Lets browsers cache public REST reads so repeat visits don't wait on cold Strapi.
 * Skips routes that typically carry auth or shouldn't be shared caches.
 */
module.exports = () => {
  return async (ctx, next) => {
    await next();

    if (ctx.method !== 'GET' || ctx.status !== 200) return;
    if (!ctx.path.startsWith('/api/')) return;
    if (ctx.request.header.authorization) return;

    const p = ctx.path;
    if (p.startsWith('/api/users') || p.startsWith('/api/upload')) return;

    ctx.set(
      'Cache-Control',
      'public, max-age=120, s-maxage=300, stale-while-revalidate=600'
    );
  };
};
