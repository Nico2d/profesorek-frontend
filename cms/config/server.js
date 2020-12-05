module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '7f3a43d876e22e69e1495236a0af9389'),
    },
  },
});
