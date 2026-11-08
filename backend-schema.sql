-- ساختار دیتابیس فیلم نگار (Supabase). این فایل فقط برای نگهداری نسخه است؛ کلید یا رمزی داخلش نیست.
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,20}$'),
  created_at timestamptz default now()
);
create table user_data (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
alter table user_data enable row level security;
create policy "profiles readable by signed-in" on profiles
  for select to authenticated using (true);
create policy "own profile insert" on profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on profiles
  for update to authenticated using (auth.uid() = id);
create policy "own data all" on user_data
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table shared_lists (
  id text primary key default substr(replace(gen_random_uuid()::text,'-',''),1,12),
  owner uuid not null default auth.uid() references auth.users on delete cascade,
  title text not null,
  author text,
  items jsonb not null,
  created_at timestamptz default now()
);
alter table shared_lists enable row level security;
create policy "owner manage" on shared_lists
  for all to authenticated
  using (auth.uid() = owner) with check (auth.uid() = owner);
create or replace function get_shared_list(p_id text) returns json
language sql security definer set search_path = public as $$
  select json_build_object('title', title, 'author', author, 'items', items)
  from shared_lists where id = p_id;
$$;
grant execute on function get_shared_list(text) to anon, authenticated;
