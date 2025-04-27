ALTER TABLE "users" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "age" TO "lastName";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;