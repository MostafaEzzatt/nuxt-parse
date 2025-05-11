import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const parse = sqliteTable("parse", {
  id: int().primaryKey(),
  type: text().notNull(),
  content: text().notNull(),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
