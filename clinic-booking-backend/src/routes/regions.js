const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: "reg_1", name: "Jakarta" },
    { id: "reg_2", name: "Bandung" }
  ]);
});

module.exports = router;

console.log("REGIONS FILE HIT");