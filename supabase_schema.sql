create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default now(),
  username text unique,
  display_name text,
  bio text default 'A quiet heart with many stories...',
  profile_pic text,
  banner_pic text,
  social_links jsonb default '{}'::jsonb,
  email text unique,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, email)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'display_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create Poems table
create table poems (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  tags text[] default '{}',
  likes_count int default 0
);

alter table poems enable row level security;

create policy "Poems are viewable by everyone." on poems
  for select using (true);

create policy "Authenticated users can create poems." on poems
  for insert with check (auth.uid() = author_id);

create policy "Users can update their own poems." on poems
  for update using (auth.uid() = author_id);

create policy "Users can delete their own poems." on poems
  for delete using (auth.uid() = author_id);
