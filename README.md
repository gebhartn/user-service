# Users Service

[![Maintainability](https://api.codeclimate.com/v1/badges/1085a7c8e0eac2e53638/maintainability)](https://codeclimate.com/github/gebhartn/user-service/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1085a7c8e0eac2e53638/test_coverage)](https://codeclimate.com/github/gebhartn/user-service/test_coverage)

This is a standalone service for managing users in a distributed system, with the eventual intent of being connected to a more purposeful network of services.

## Documentation

| Route    | Description   |
|----------|:-------------:|
| /v1/health | Health endpoint |
| /v1/docs    | Swagger documentation |
| /v1/users/*  |  API root route   |

## Local development

In order to run the service locally, you must have Postgres, Node, Docker, docker-compose and Make installed. Also, Yarn is better than NPM.

A valid .env configuration is required before getting started:

```
DATABASE_LOCAL="postgres://userapp:postgres@localhost:5432/users"
DATABASE_TEST="postgres://userapp:postgres@localhost:5432/users_test"

DB_USER=userapp
DB_TEST=users_test
DB_NAME=users
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

Once you've got a valid configuration file, you can use the [Makefile](Makefile) to get started.

The easiest way to run the service for the first time would be `make dev` which will spin up a PG container, write the schema, install dependencies, and start the development server.

Alternatively, the [Makefile](Makefile) exposes a means of teardown via `make clean` which will destroy the container.

## Running tests

The [ci](./.github/workflows) script will run the coverage suite automatically upon pushing to master, but to run locally you may use `yarn coverage` or `yarn test` to generate coverage or run the test suite respectively.

## Author

- [Nicholas Gebhart](https://nicholasgebhart.com)

## License

This project is open source and available under the [MIT License](LICENSE).
