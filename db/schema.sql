drop table if exists users;

create table users (
  id serial primary key not null,
  email text unique not null,
  "firstName" text,
  "lastName" text,
  password text not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "updatedBy" int,
  hash text
);

create index users_email_idx on users(email);

create or replace function trigger_set_timestamp()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$ language plpgsql;

create trigger set_timestamp
before update on users
for each row
execute procedure trigger_set_timestamp();
