# Users Service

[![Maintainability](https://api.codeclimate.com/v1/badges/1085a7c8e0eac2e53638/maintainability)](https://codeclimate.com/github/gebhartn/user-service/maintainability)

This is a standalone service for managing users in a distributed system, with the eventual intent of being connected to a more purposeful network of services.

## Documentation

TODO

## Local development

In order to run the service locally, you must have Postgres, Node, Docker and Make installed. Also, Yarn is better than NPM.

A valid .env configuration is required before getting started:

```
DB_USER=postgres
DB_NAME=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432:5432
```

Once you've got a valid configuration file, you can use the `Makefile` to get started.

The easiest way to run the service for the first time would be `make dev` which will spin up a PG container, write the schema, install dependencies, and start the development server.

## Running tests

TODO


## Author

- [Nicholas Gebhart](https://nicholasgebhart.com)

## License

This project is open source and available under the [MIT License](LICENSE).
