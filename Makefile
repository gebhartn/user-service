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

build: env-HELLO_WORLD
	echo "Hello, world!"
