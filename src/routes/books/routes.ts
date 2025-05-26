import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { createErrorSchema, jsonContentRequired } from "@/lib/validators";

import { BookValidation } from "./validations";
import * as HttpStatusCodes from "stoker/http-status-codes";

const tags = ["Books"];

export const listBooks = createRoute({
  path: "/",
  method: "get",
  tags,
  summary: "Retrieve a list of all books",
  description: "Get all books with optional filtering and sorting",
  request: {
    query: BookValidation.bookQueryParams,
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "List of books",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.array(BookValidation.bookResponse),
            meta: z.object({
              pagination: z.object({
                page: z.number(),
                limit: z.number(),
                total_count: z.number(),
                total_pages: z.number(),
              }).optional(),
            }).optional(),
          }),
        },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: createErrorSchema("Invalid query parameters"),
  },
});

export const getBook = createRoute({
  path: "/{id}",
  method: "get",
  tags,
  summary: "Get details of a specific book",
  description: "Retrieve detailed information about a book by its ID",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "Book details",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: BookValidation.bookResponse,
          }),
        },
      },
    },
    [HttpStatusCodes.NOT_FOUND]: createErrorSchema("Book not found"),
  },
});

export const createBook = createRoute({
  path: "/",
  method: "post",
  tags,
  summary: "Add a new book",
  description: "Create a new book with the provided details",
  request: {
    body: jsonContentRequired(BookValidation.createBook, "Book details"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: {
      description: "Book created successfully",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: BookValidation.bookResponse,
          }),
        },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: createErrorSchema("Invalid input"),
  },
});

export const updateBook = createRoute({
  path: "/{id}",
  method: "put",
  tags,
  summary: "Update a book's details",
  description: "Update the details of an existing book",
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: jsonContentRequired(BookValidation.updateBook, "Book update details"),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "Book updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: BookValidation.bookResponse,
          }),
        },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: createErrorSchema("Invalid input"),
    [HttpStatusCodes.NOT_FOUND]: createErrorSchema("Book not found"),
  },
});

export const deleteBook = createRoute({
  path: "/{id}",
  method: "delete",
  tags,
  summary: "Delete a book",
  description: "Remove a book from the collection",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "Book deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.null(),
          }),
        },
      },
    },
    [HttpStatusCodes.NOT_FOUND]: createErrorSchema("Book not found"),
  },
});

export type ListBooksRoute = typeof listBooks;
export type GetBookRoute = typeof getBook;
export type CreateBookRoute = typeof createBook;
export type UpdateBookRoute = typeof updateBook;
export type DeleteBookRoute = typeof deleteBook;