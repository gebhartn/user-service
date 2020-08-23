SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c

ifneq ("$(wildcard .env)","")
  include .env
  export
endif

NO_COLOR  := \x1b[0m
ERR_COLOR := \x1b[31;01m

env-%:
	@if [ "${${*}}" = "" ]; then \
		printf "$(ERR_COLOR)"; \
		echo "ERROR: Required environment variable $* not set"; \
		printf "$(NO_COLOR)"; \
		echo; \
		exit 1; \
	fi

.SILENT:
database: env-DB_USER env-DB_TEST env-DB_NAME env-DB_PASSWORD env-DB_HOST
	echo "Starting a postgres database via Docker...";
	docker-compose up -d && sleep 2s && \
	PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -U ${DB_USER} -f db/create.sql &>/dev/null

run-dev: env-DB_USER env-DB_TEST env-DB_NAME env-DB_PASSWORD env-DB_HOST
	echo "Starting up node server, happy hacking...";
	yarn start:dev

create-schemas:
	echo "Writing schema for database(s)...";
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/schema.sql &>/dev/null && \
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_TEST} -h ${DB_HOST} -U ${DB_USER} -f db/schema.sql &>/dev/null

seed:
	echo "Seeding database(s)...";
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/seed.sql >/dev/null && \
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_TEST} -h ${DB_HOST} -U ${DB_USER} -f db/seed.sql >/dev/null

.SILENT:
dev: database create-schemas seed run-dev

list: env-DB_USER env-DB_TEST env-DB_NAME env-DB_PASSWORD env-DB_HOST
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/select.sql

list-test: env-DB_USER env-DB_TEST env-DB_NAME env-DB_PASSWORD env-DB_HOST
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_TEST} -h ${DB_HOST} -U ${DB_USER} -f db/select.sql

drop-database:
	PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -U ${DB_USER} -f db/drop.sql >/dev/null

clean: drop-database
	docker stop user_db
