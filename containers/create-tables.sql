CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR(50),
    is_admin BOOLEAN NOT NULL default false,
    created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP
);