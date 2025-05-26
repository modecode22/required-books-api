# Books API

A modern REST API for managing books, built with Hono framework on Cloudflare Workers and D1 database.

## 🚀 Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: [Hono](https://hono.dev/) with OpenAPI support
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Validation**: Zod schemas
- **Documentation**: OpenAPI 3.0 with Scalar UI
- **Language**: TypeScript

## 📋 Features

- **CRUD Operations**: Create, read, update, and delete books
- **Advanced Filtering**: Filter by title, author, genre
- **Sorting**: Sort by title, author, published date, or creation date
- **Pagination**: Configurable page size and navigation
- **Input Validation**: Comprehensive request validation with Zod
- **API Documentation**: Interactive OpenAPI docs at `/reference`
- **Health Check**: Status endpoint at `/health`
- **CORS Support**: Cross-origin requests enabled

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Cloudflare account

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
Environment=development
PORT=9999
D1_TOKEN=your_d1_token
ACCOUNT_ID=your_cloudflare_account_id
DATABASE_ID=your_d1_database_id
```

### Wrangler Configuration

Create a `wrangler.toml` file:

```toml
name = "required-books-api"
main = "src/index.ts"
compatibility_date = "2025-04-29"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "books-api"
database_id = "your_database_id"
migrations_dir = "migrations"

[vars]
Environment = "development"
# Add other environment variables as needed
```

### Database Setup

```bash
# Generate types based on Worker configuration
npm run cf-typegen

# Run database migrations (if any)
npx drizzle-kit push:sqlite
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

## 📚 API Documentation

### Interactive Documentation

Visit `/reference` for the complete interactive API documentation powered by Scalar.

### Base URL

```
Production: https://required-books-api.aissaouimoncefdev.workers.dev/reference
Development: http://localhost:8787
```

### Authentication

Currently, the API operates without authentication. Future versions may include Bearer token authentication.

## 🔗 API Endpoints

### Health Check

```http
GET /health
```

Returns API status.

### Books

#### List Books

```http
GET /api/books
```

**Query Parameters:**
- `title` (string, optional) - Filter by book title
- `author` (string, optional) - Filter by author name
- `genre` (string, optional) - Filter by genre
- `sortBy` (string, optional) - Sort field: `title`, `author`, `publishedDate`, `createdAt`
- `sortOrder` (string, optional) - Sort direction: `asc`, `desc`
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)

#### Get Book

```http
GET /api/books/{id}
```

#### Create Book

```http
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedDate": "1925-04-10",
  "numberOfPages": 180,
  "isbn": "978-0-7432-7356-5",
  "genre": "Fiction",
  "description": "A classic American novel..."
}
```

#### Update Book

```http
PUT /api/books/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "numberOfPages": 200
}
```

#### Delete Book

```http
DELETE /api/books/{id}
```

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total_count": 50,
      "total_pages": 5
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🗄️ Database Schema

### Books Table

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT (PK) | Unique identifier (generated) |
| title | TEXT | Book title (required) |
| author | TEXT | Author name (required) |
| publishedDate | TEXT | Publication date (ISO format) |
| numberOfPages | INTEGER | Page count (required) |
| isbn | TEXT | ISBN number (optional) |
| genre | TEXT | Book genre (optional) |
| description | TEXT | Book description (optional) |
| createdAt | TEXT | Creation timestamp |
| updatedAt | TEXT | Last update timestamp |

## 🚀 Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

### Required Cloudflare Resources

1. **D1 Database**: Create a D1 database in your Cloudflare dashboard
2. **Workers**: Deploy the API as a Cloudflare Worker
3. **Environment Variables**: Set up required variables in Workers settings

### Environment Variables for Production

- `Environment`: Set to `production`
- `D1_TOKEN`: Your D1 API token
- `ACCOUNT_ID`: Your Cloudflare account ID
- `DATABASE_ID`: Your D1 database ID

## 📝 Development Notes

### Code Structure

```
src/
├── app.ts              # Main application setup
├── index.ts            # Entry point
├── db/                 # Database configuration
│   ├── index.ts        # Database connection
│   ├── schema.ts       # Drizzle schema definitions
│   └── validation-schema.ts # Zod validation schemas
├── lib/                # Utility functions
├── middlewares/        # Custom middlewares
├── routes/             # API routes
│   └── books/          # Books module
└── types/              # TypeScript definitions
```

### Adding New Routes

1. Create route definitions in `routes/{module}/routes.ts`
2. Implement handlers in `routes/{module}/handlers.ts`
3. Define validations in `routes/{module}/validations.ts`
4. Register routes in `routes/{module}/index.ts`
5. Add to main app in `src/app.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [OpenAPI Specification](https://swagger.io/specification/)