set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."guestListManager" (
	"guestId" serial NOT NULL,
	"guestFirstName" TEXT NOT NULL,
	"guestLastName" TEXT NOT NULL,
	"guestEmail" TEXT NOT NULL,
	"guestRelationship" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "guestListManager_pk" PRIMARY KEY ("guestId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."foodListManager" (
	"foodId" serial NOT NULL,
	"foodName" TEXT NOT NULL,
	"foodCategory" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "foodListManager_pk" PRIMARY KEY ("foodId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."budgeter" (
	"itemId" serial NOT NULL,
	"item" TEXT NOT NULL,
	"cost" FLOAT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "budgeter_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."weddingCheckList" (
	"checkListId" serial NOT NULL,
	"checkListToDo" TEXT NOT NULL,
	"checkListCategory" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "weddingCheckList_pk" PRIMARY KEY ("checkListId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "guestListManager" ADD CONSTRAINT "guestListManager_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "foodListManager" ADD CONSTRAINT "foodListManager_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "budgeter" ADD CONSTRAINT "budgeter_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "weddingCheckList" ADD CONSTRAINT "weddingCheckList_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
