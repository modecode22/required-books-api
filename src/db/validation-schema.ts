import { z } from "zod";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

import { books } from "./schema";

// Books
export const selectBooksSchema = createSelectSchema(books);
export const insertBooksSchema = createInsertSchema(books, {
  title: (schema) => schema.min(1).max(255),
  author: (schema) => schema.min(1).max(255),
  publishedDate: (schema) => schema.refine((date) => {
    return !isNaN(Date.parse(date));
  }, "Invalid date format"),
  numberOfPages: (schema) => schema.int().positive(),
});
export const updateBooksSchema = createUpdateSchema(books);

// App types 
export type InsertBooksSchema = z.infer<typeof insertBooksSchema>;
export type UpdateBooksSchema = z.infer<typeof updateBooksSchema>;
export type SelectBooksSchema = z.infer<typeof selectBooksSchema>;