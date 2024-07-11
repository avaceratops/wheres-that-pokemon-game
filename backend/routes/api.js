const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: "Where's That Pokémon" })
});

module.exports = router;
