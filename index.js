const pg = require("pg");
const express = require("express");
const morgan = require("morgan");

// client for DB
const client = new pg.Client(
  process.env.DATABASE_URL || "postgress://localhost/acme_database_shop"
);

const server = express();

async function init() {
  await client.connect();
  console.log("connected to the db");

  let SQL = `
    DROP TABLE IF EXISTS flavors;
    CREATE TABLE flavors(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      is_favorite BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    );
  `;
  await client.query(SQL);
  console.log("tables created");

  SQL = `
    INSERT INTO flavors(name, is_favorite) VALUES('Matcha', true);
    INSERT INTO flavors(name) VALUES('Chocolate');
    INSERT INTO flavors(name, is_favorite) VALUES('Chai', true);
  `;
  await client.query(SQL);
  console.log("data seeded");

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

init();
