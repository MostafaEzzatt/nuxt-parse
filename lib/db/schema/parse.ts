// zod schema for auth email and password

import type { InferSelectModel } from "drizzle-orm";

import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./auth";

export const parse = sqliteTable("parse", {
  id: int().primaryKey(),
  type: text().notNull(),
  content: text().notNull(),
  userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const parseInsertSchema = createInsertSchema(parse, {
  content: field => field.min(1),
  type: field => field.min(1),
}).omit({ id: true, userId: true, createdAt: true, updatedAt: true });

export type parseSchemaType = InferSelectModel<typeof parse>;
