import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(config.env.databaseUrl);

// @ts-ignore
export const db = drizzle({ client: sql });
