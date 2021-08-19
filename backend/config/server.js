module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('STRAPI_URL', '/strapi',
  admin: {
    url: env('STRAPI_ADMIN', 'strapi/admin'),
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f0c9bea93b57172a3f37374f08f932c2'),
    },
  },
});
