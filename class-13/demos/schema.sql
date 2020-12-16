DROP TABLE todo;

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  due_date VARCHAR(255),
  title VARCHAR(255),
  description TEXT
);

