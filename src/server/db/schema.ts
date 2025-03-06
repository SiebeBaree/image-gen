import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `image-gen_${name}`);

export const posts = createTable(
    "post",
    {
        id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
        name: text("name", { length: 256 }),
        createdAt: int("created_at", { mode: "timestamp" })
            .default(sql`(unixepoch())`)
            .notNull(),
        updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    },
    (t) => [index("name_idx").on(t.name)],
);
