import { z } from "zod";

import { 
  selectBooksSchema, 
  insertBooksSchema, 
  updateBooksSchema
} from "@/db/validation-schema";

export const BookValidation = {
  // Response schema for book
  bookResponse: selectBooksSchema,
  
  // For creating a new book
  createBook: insertBooksSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  
  // For updating a book
  updateBook: updateBooksSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).partial(),
  
  // Book ID parameter
  bookIdParam: z.object({
    id: z.string(),
  }),
  
  // Query parameters for filtering books
  bookQueryParams: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    sortBy: z.enum(["title", "author", "publishedDate", "createdAt"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
  }),
};