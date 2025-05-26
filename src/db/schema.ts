import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: text("id").primaryKey().notNull().default(sql`(lower(hex(randomblob(16))))`),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publishedDate: text("published_date").notNull(),
  numberOfPages: integer("number_of_pages").notNull(),
  isbn: text("isbn"),
  genre: text("genre"),
  description: text("description"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});