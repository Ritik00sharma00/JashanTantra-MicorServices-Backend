module.exports = {
  apps: [
    {
      name: "gateway",
      script: "./dist/apps/gateway/main.js",
      env: {
        PORT: 3000 
      }
    },
    {
      name: "user-service",
      script: "./dist/apps/user-service/main.js",
      env: {
        PORT: 3001 
      }
    },
    {
      name: "jashan_tantra",
      script: "./dist/apps/jashan_tantra/main.js",
      env: {
        PORT: 3002 
      }
    }
  ]
}