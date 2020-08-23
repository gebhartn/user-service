drop table if exists users;

create table users (
  id serial primary key not null,
  email text unique not null,
  first_name text,
  last_name text,
  password text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by_user_id int,
  hash_code text
);

create index users_email_idx on users(email);

create or replace function trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_timestamp
before update on users
for each row
execute procedure trigger_set_timestamp();
