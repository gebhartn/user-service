SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c

ifneq ("$(wildcard .env)","")
  include *.env
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

init: env-DB_USER env-DB_TEST env-DB_NAME env-DB_PASSWORD env-DB_HOST env-DB_PORT env-DATABASE_LOCAL env-DATABASE_TEST

.SILENT:
database: init
	@printf "$(ERR_COLOR)";
	@( read -p "WARNING: This will wipe the database, are you sure you want to continue? [y/N]: " sure && case "$$sure" in [yY]) true;; *) false;; esac )
	@printf "$(NO_COLOR)";
	echo "Starting a postgres database via Docker...";
	docker-compose up -d && sleep 2s && \
	PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -U ${DB_USER} -f db/create.sql &>/dev/null

run-dev: init
	echo "Starting up node server, happy hacking...";
	DATABASE_LOCAL=${DATABASE_LOCAL} DATABASE_TEST=${DATABASE_TEST} yarn start:dev

create-schemas: init
	echo "Writing schema for database(s)...";
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/schema.sql &>/dev/null && \
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_TEST} -h ${DB_HOST} -U ${DB_USER} -f db/schema.sql &>/dev/null

seed: init
	echo "Seeding database(s)...";
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/seed.sql >/dev/null && \
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_TEST} -h ${DB_HOST} -U ${DB_USER} -f db/seed.sql >/dev/null

.SILENT:
dev: database create-schemas seed run-dev

.SILENT:
build: database create-schemas seed

list: init
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/select.sql

list-test: init
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_TEST} -h ${DB_HOST} -U ${DB_USER} -f db/select.sql

drop-database: init
	PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -U ${DB_USER} -f db/drop.sql >/dev/null

clean: init drop-database
	docker stop user_db >/dev/null
