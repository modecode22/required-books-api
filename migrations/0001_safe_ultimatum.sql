PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_books` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`published_date` text NOT NULL,
	`number_of_pages` integer NOT NULL,
	`isbn` text,
	`genre` text,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_books`("id", "title", "author", "published_date", "number_of_pages", "isbn", "genre", "description", "created_at", "updated_at") SELECT "id", "title", "author", "published_date", "number_of_pages", "isbn", "genre", "description", "created_at", "updated_at" FROM `books`;--> statement-breakpoint
DROP TABLE `books`;--> statement-breakpoint
ALTER TABLE `__new_books` RENAME TO `books`;--> statement-breakpoint
PRAGMA foreign_keys=ON;