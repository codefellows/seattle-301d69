DROP TABLE location;

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  latitude NUMERIC(7, 4),
  longitude NUMERIC (7, 4)
)

-- we know the gps will be at min 1.0000 at max 222.9999