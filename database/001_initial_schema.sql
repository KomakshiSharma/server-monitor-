create extension if not exists pgcrypto;


create table servers (

    id uuid primary key
    default gen_random_uuid(),

    hostname text
    not null
    unique,

    environment text
    default 'production',

    created_at timestamptz
    default now()
);





create table server_metrics (

    id bigint generated always as identity
    primary key,

    server_id uuid
    references servers(id),

    cpu_usage numeric not null,

    ram_usage numeric not null,

    disk_usage numeric not null,

    created_at timestamptz
    default now()
);




create table alerts (

    id bigint generated always as identity
    primary key,

    server_id uuid
    references servers(id),

    severity text,

    message text,

    resolved boolean
    default false,

    created_at timestamptz
    default now()
);




alter publication supabase_realtime
add table server_metrics;
