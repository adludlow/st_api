create role st with password 'st_password' login createrole;
create schema authorization st;
alter role st set search_path to st, public;
