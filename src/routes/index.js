"use strict";
/*eslint-disable */
const router = require("express").Router();
/* eslint-enable */
const MinerRepository = require("src/repository/miner.repository.js");

router.use("/miner", require("src/routes/miner.router.js"));

router.post("/getMinerInfo", (req, res) => {
  console.log(req.body.id);
  MinerRepository.getMiner(req.body.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      //console.log(error);
      res.send(400, error.name);
    });
});

router.post("/getMinerCredits", (req, res) => {
  console.log(req.body.id);
  MinerRepository.getMinerCredits(req.body.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      //console.log(error);
      res.send(400, error.name);
    });
});

module.exports = router;
