import app from "./app";
import { config } from "./lib/env";

const server = app.listen(config.port, () => {
  console.log(`Express API running on port ${config.port}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${config.port} is already in use`);
  } else {
    console.error("Server error:", err);
  }
  process.exit(1);
});


const shutdown = () => {
  console.log("Shutting down API server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
