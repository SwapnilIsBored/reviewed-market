-- reviewed.market — Supabase SQL schema
-- Run this in your Supabase SQL editor

-- Users table
create table public.users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text not null,
  role text not null check (role in ('buyer', 'creator')),
  avatar_url text,
  youtube_channel_id text,
  youtube_channel_name text,
  youtube_subscriber_count integer,
  created_at timestamptz default now()
);

-- Listings table
create table public.listings (
  id uuid default gen_random_uuid() primary key,
  creator_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null check (category in ('smartphones','laptops','audio','cameras','wearables','accessories','gaming','other')),
  condition text not null check (condition in ('mint','good','fair')),
  price integer not null,
  original_price integer,
  youtube_video_id text not null,
  youtube_video_title text not null,
  youtube_video_thumbnail text,
  youtube_timestamp_seconds integer,
  images text[] default '{}',
  status text not null default 'active' check (status in ('active','sold','draft','removed')),
  created_at timestamptz default now()
);

-- Orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) not null,
  buyer_id uuid references public.users(id) not null,
  creator_id uuid references public.users(id) not null,
  amount integer not null,
  platform_fee integer not null,
  creator_payout integer not null,
  stripe_payment_intent_id text unique,
  status text not null default 'pending' check (status in ('pending','paid','shipped','delivered','cancelled')),
  shipping_address jsonb,
  tracking_number text,
  created_at timestamptz default now()
);

-- Indexes
create index on public.listings(creator_id);
create index on public.listings(status);
create index on public.listings(category);
create index on public.orders(buyer_id);
create index on public.orders(creator_id);

-- Row level security
alter table public.users enable row level security;
alter table public.listings enable row level security;
alter table public.orders enable row level security;

-- Policies: listings are public to read
create policy "Anyone can view active listings"
  on public.listings for select
  using (status = 'active');

create policy "Creators can manage own listings"
  on public.listings for all
  using (auth.uid() = creator_id);

-- Orders visible to buyer and creator
create policy "Users see own orders"
  on public.orders for select
  using (auth.uid() = buyer_id or auth.uid() = creator_id);

create policy "Users see own profile"
  on public.users for select
  using (true);

create policy "Users update own profile"
  on public.users for update
  using (auth.uid() = id);
