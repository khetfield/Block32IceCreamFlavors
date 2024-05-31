const express = require("express");
const router = express.Router();
const pg = require("pg");
const client = new pg.Client("postgres://localhost/Ice_Cream");
client.connect();

// get all flavors
router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM Ice_Cream`
    );
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

// get flavor using id
router.get("/:id", async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM Ice_Cream WHERE id = $1`, [
      req.params.id,
    ]);
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

// add flavor
router.post("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO Ice_Cream(name, is_favorite) VALUES($1, $2)`,
      [req.body.name, req.body.is_favorite]
    );
    res.send({
      name: req.body.name,
      is_favorite: req.body.is_favorite,
    });
  } catch (err) {
    next(err);
  }
});

// delete flavor
router.delete("/:id", async (req, res, next) => {
  try {
    const response = await client.query(`DELETE from Ice_Cream WHERE id =$1`, [
      Number(req.params.id),
    ]);
    res
      .send({
        id: req.params.id,
      })
      .sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// update database
router.put("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `UPDATE Ice_Cream SET name=$1, is_favorite=$2, updated_at=now() WHERE id=$3 RETURNING *`,
      [req.body.name, req.body.is_favorite, Number(req.params.id)]
    );
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;