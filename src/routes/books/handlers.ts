import { and, eq, sql, count, desc, asc, like } from "drizzle-orm";
import { nanoid } from "nanoid";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";
import { initDbConnect } from "@/db";
import { books } from "@/db/schema";
import { errorResponse, successResponse } from "@/lib/response-helper";

import type {
  ListBooksRoute,
  GetBookRoute,
  CreateBookRoute,
  UpdateBookRoute,
  DeleteBookRoute,
} from "./routes";

// List all books
export const listBooks: AppRouteHandler<ListBooksRoute> = async (c) => {
  try {
    const db = initDbConnect(c.env.DB);
    const query = c.req.query();

    // Default pagination parameters
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "10", 10);
    const offset = (page - 1) * limit;

    // Build query conditions dynamically
    let conditions: any[] = [];

    // Apply filters if provided
    if (query.title) {
      conditions.push(like(books.title, `%${query.title}%`));
    }

    if (query.author) {
      conditions.push(like(books.author, `%${query.author}%`));
    }

    if (query.genre) {
      conditions.push(like(books.genre, `%${query.genre}%`));
    }

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: count() })
      .from(books)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .get();

    const totalCount = totalCountResult?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Determine sort order
    const sortField = query.sortBy || "createdAt";
    const sortDirection = query.sortOrder === "asc" ? asc : desc;

    let sortColumn;
    switch (sortField) {
      case "title":
        sortColumn = books.title;
        break;
      case "author":
        sortColumn = books.author;
        break;
      case "publishedDate":
        sortColumn = books.publishedDate;
        break;
      case "createdAt":
      default:
        sortColumn = books.createdAt;
    }

    // Execute the query with filtering, sorting, and pagination
    const filteredBooks = await db
      .select()
      .from(books)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(sortDirection(sortColumn))
      .limit(limit)
      .offset(offset)
      .all();

    return successResponse(
      c,
      filteredBooks,
      "Books retrieved successfully",
      HttpStatusCodes.OK,
      {
        page,
        limit,
        total_count: totalCount,
        total_pages: totalPages,
      }
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    return errorResponse(c, "Error fetching books", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Get a book by ID
export const getBook: AppRouteHandler<GetBookRoute> = async (c) => {
  try {
    const id = c.req.param("id");
    const db = initDbConnect(c.env.DB);
    
    const book = await db.select().from(books).where(eq(books.id, id)).get();
    
    if (!book) {
      return errorResponse(c, "Book not found", HttpStatusCodes.NOT_FOUND);
    }
    
    return successResponse(
      c,
      book,
      "Book retrieved successfully",
      HttpStatusCodes.OK,
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    return errorResponse(c, "Error fetching book", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Create a new book
export const createBook: AppRouteHandler<CreateBookRoute> = async (c) => {
  try {
    const data = c.req.valid("json");
    const db = initDbConnect(c.env.DB);
    
    const id = nanoid();
    const now = new Date().toISOString();
    
    const [book] = await db
      .insert(books)
      .values({
        id,
        title: data.title,
        author: data.author,
        publishedDate: data.publishedDate,
        numberOfPages: data.numberOfPages,
        isbn: data.isbn,
        genre: data.genre,
        description: data.description,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    
    return successResponse(
      c,
      book,
      "Book created successfully",
      HttpStatusCodes.CREATED,
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return errorResponse(c, "Error creating book", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Update a book
export const updateBook: AppRouteHandler<UpdateBookRoute> = async (c) => {
  try {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const db = initDbConnect(c.env.DB);
    
    const existingBook = await db.select().from(books).where(eq(books.id, id)).get();
    
    if (!existingBook) {
      return errorResponse(c, "Book not found", HttpStatusCodes.NOT_FOUND);
    }
    
    const [updatedBook] = await db
      .update(books)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(books.id, id))
      .returning();
    
    return successResponse(
      c,
      updatedBook,
      "Book updated successfully",
      HttpStatusCodes.OK,
    );
  } catch (error) {
    console.error("Error updating book:", error);
    return errorResponse(c, "Error updating book", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Delete a book
export const deleteBook: AppRouteHandler<DeleteBookRoute> = async (c) => {
  try {
    const id = c.req.param("id");
    const db = initDbConnect(c.env.DB);
    
    const existingBook = await db.select().from(books).where(eq(books.id, id)).get();
    
    if (!existingBook) {
      return errorResponse(c, "Book not found", HttpStatusCodes.NOT_FOUND);
    }
    
    await db.delete(books).where(eq(books.id, id));
    
    return successResponse(
      c,
      null,
      "Book deleted successfully",
      HttpStatusCodes.OK,
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return errorResponse(c, "Error deleting book", HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
