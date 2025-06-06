import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_9fERDLX5SWnc@ep-steep-sun-a5dvjjy6-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});