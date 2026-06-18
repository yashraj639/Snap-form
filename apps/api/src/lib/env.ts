export const config = {
    port: process.env.PORT || 3000,
    //should throw error early if env not available
    databaseUrl: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
    auth: {
      secret: process.env.BETTER_AUTH_SECRET || "dummy-secret-change-me",
      url: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    },
  };
  