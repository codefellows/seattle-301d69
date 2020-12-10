DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS weather;

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query TEXT, -- showing another type here, varchar is better
  latitude DECIMAL(9, 6),
  longitude NUMERIC(9,6)
);

CREATE TABLE weather ( -- just for fun not lab
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  forecast VARCHAR(255),
  time VARCHAR(255)
);