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

database: env-DB_USER env-DB_PASSWORD env-DB_HOST env-DB_PORT env-DB_NAME
	echo "Starting a postgres database via Docker";
	echo;
	docker run --rm --name pg-docker \
		-e POSTGRES_USER=${DB_USER} \
		-e POSTGRES_PASSWORD=${DB_PASSWORD} \
		-p ${DB_PORT} \
		-d ${DB_NAME} && sleep 2s

run-dev: env-DB_USER env-DB_PASSWORD env-DB_HOST env-DB_PORT
	echo "Starting up node server, happy hacking";
	echo;
	yarn start:dev

refresh: env-DB_USER env-DB_PASSWORD env-DB_HOST env-DB_PORT env-DB_NAME
	echo "Writing database schema";
	echo;
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/schema.sql

.SILENT:
dev: database refresh run-dev
	echo "Starting local"

list:
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/select.sql

seed:
	PGPASSWORD=${DB_PASSWORD} psql -d ${DB_NAME} -h ${DB_HOST} -U ${DB_USER} -f db/seed.sql
