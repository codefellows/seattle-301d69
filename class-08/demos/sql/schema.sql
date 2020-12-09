DROP TABLE cookie;

CREATE TABLE cookie (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);
-- VARCHAR(255) varying characters up to 255
-- SERIAL increments by one PRIMARY sets it to this table's key, KEY is what gives it referenceable behavior
-- /q exits psql