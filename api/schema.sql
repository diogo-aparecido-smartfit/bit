CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    author VARCHAR(255) NOT NULL,
    post_date TIMESTAMP NOT NULL
);