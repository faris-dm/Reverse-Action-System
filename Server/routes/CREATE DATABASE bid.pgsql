 CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username  VARCHAR(50),
 email VARCHAR(255) UNIQUE,
 password_hash TEXT,
 created_at TIMESTAMPTZ  DEFAULT NOW(),
    updated_at TIMESTAMPTZ  DEFAULT NOW()

);