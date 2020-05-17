"use strict";

const MinerRepository = require("src/repository/miner.repository.js");

const axios = require("axios");

const mq = require("src/util/mq.js");

const logger = require("src/util/logger.js").core;
const DB = require("src/util/db.js");

const MinerMetricsService = {
  convertShareToHashrate: (shares, difficulty, timestamp, minerId) => {
    return 100;
  },

  computeAward: (miner_hashrate, network_hashrate, block_reward) => {
    return (miner_hashrate / network_hashrate) * 0.9 * 10 ** 7 * block_reward;
  },

  processData: async (data) => {
    try {
      console.log("adding miner to database");
      await MinerRepository.insertShare({
        minerId: data.minerId,
        share: data.share,
        difficulty: data.difficulty,
        blockHeight: data.blockHeight,
        time: new Date(data.time),
      });
      // We can also calculate these on the frontend side with heavy math
      // await MinerMetricsService.calculateHashrates();
      // await MinerMetricsService.calculateRewards();
    } catch (err) {
      logger.error(err);
    }
  },

  calculateHashrates: async () => {
    return true;
  },

  calculateRewards: async (totalReward, poolHashrate) => {
    return true;
  },
  init: () => {
    return mq.registerConsumer(MinerMetricsService.processData);
  },
};

module.exports = MinerMetricsService;
