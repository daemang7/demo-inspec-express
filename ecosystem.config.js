module.exports = {
  apps: [
    {
      name: "demo-inspec-express",
      script: "dist/server/index.js",
      cwd: "C:/Users/daemang7/demo-inspec-express", // 작업 디렉토리 명시
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        // PORT: 3010,
      },
    },
  ],
};
