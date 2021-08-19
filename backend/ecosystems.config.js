module.exports = {
  apps: [
    {
      name: 'linktree-backend',
      script: 'npm',
      args: 'start',
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
