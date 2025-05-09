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

server.use(express.json());
server.use(morgan("dev"));

// get
server.get("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `SELECT * FROM flavors ORDER BY created_at DESC;`;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

server.get("/api/flavors/:id", async (req, res, next) => {
  try {
    const SQL = `SELECT * FROM flavors WHERE id = $1;`;
    const response = await client.query(SQL, [req.params.id]);
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

// post
server.post("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `INSERT INTO flavors(name, is_favorite) VALUES($1, $2) RETURNING *;`;
    const response = await client.query(SQL, [
      req.body.name,
      req.body.is_favorite,
    ]);
    res.status(201).json(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

// put
server.put("/api/flavors/:id", async (req, res, next) => {
  try {
    const SQL = `UPDATE flavors SET name=$1, is_favorite=$2, updated_at=now() WHERE id=$3 RETURNING *;`;
    const response = await client.query(SQL, [
      req.body.name,
      req.body.is_favorite,
      req.params.id,
    ]);
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

// delete
server.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    const SQL = `DELETE FROM flavors WHERE id=$1;`;
    const response = await client.query(SQL, [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
