const router = require('express').Router();

const knex = require('knex');

const knexConfig = {
    client: 'sqlite3', 
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.db3', 
    },
  };

  const db = knex(knexConfig);

router.get("/:id", (req, res) => {
    db("zoos")
      .where({ id: req.params.id })
      .first()
      .then(zoo => {
        if (zoo) {
          res.status(200).json(zoo);
        } else {
          res.status(404).json({ message: "no such id exists" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

