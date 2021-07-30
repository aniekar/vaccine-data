const Order = require('../models/order');
const Vaccination = require('../models/vaccination');

const resolvers = {
  Query: {
    orderCount: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const nextDay = new Date(args.onDate);
      nextDay.setUTCDate(chosenDate.getUTCDate() + 1);

      let orderCount;
      if (args.manufacturer) {
        orderCount = await Order.collection.countDocuments({
          arrived: {
            $gte: chosenDate,
            $lt: nextDay,
          },
          vaccine: args.manufacturer,
        });
      } else {
        orderCount = await Order.collection.countDocuments({
          arrived: {
            $gte: chosenDate,
            $lt: nextDay,
          },
        });
      }
      return orderCount;
    },
    vaccineCount: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const nextDay = new Date(args.onDate);
      nextDay.setUTCDate(chosenDate.getUTCDate() + 1);

      let vaccines = await Order.find({
        arrived: {
          $gte: chosenDate,
          $lt: nextDay,
        },
      });
      if (args.manufacturer) {
        vaccines = vaccines.filter((v) => v.vaccine === args.manufacturer);
      }
      const vaccineCount = vaccines.reduce((a, b) => a + b.injections, 0);
      return vaccineCount;
    },
    vaccinesUsed: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const nextDay = new Date(args.onDate);
      nextDay.setUTCDate(chosenDate.getUTCDate() + 1);

      const vaccinations = await Vaccination.collection.countDocuments({
        vaccinationDate: {
          $gte: chosenDate,
          $lt: nextDay,
        },
      });
      return vaccinations;
    },
    bottlesExpired: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const expiringArrivalDate = newDate(args.onDate).setUTCDate(
        expiringArrivalDate.getUTCDate() - 30
      );
      const nextDay = new Date(args.onDate).setUTCDate(
        chosenDate.getUTCDate() + 1
      );

      const expiredBottles = await Order.collection.countDocuments({
        arrived: {
          $gte: expiringArrivalDate,
          $lt: nextDay,
        },
      });
      return expiredBottles;
    },
    vaccinesExpiredBeforeUsage: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const expiringArrivalDate = new Date(args.onDate).setUTCDate(
        chosenDate.getUTCDate() - 30
      );

      let expiredBottles;

      if (args.manufacturer) {
        expiredBottles = await Order.find({
          arrived: {
            $lt: expiringArrivalDate,
          },
          vaccine: args.manufacturer,
        });
      } else {
        expiredBottles = await Order.find({
          arrived: {
            $lt: expiringArrivalDate,
          },
        });
      }

      const bottleIdentifiers = expiredBottles.map((b) => b.id);

      const usedCount = await Vaccination.collection.countDocuments({
        vaccinationDate: {
          $lt: chosenDate,
        },
        sourceBottle: { $in: bottleIdentifiers },
      });

      let numberOfVaccines = expiredBottles.reduce(
        (a, b) => a + b.injections,
        0
      );

      return numberOfVaccines - usedCount;
    },
    vaccinesExpiringWithinTenDays: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const expiringArrivalDate = new Date(args.onDate).setUTCDate(
        chosenDate.getUTCDate() - 30
      );
      const expiringWithin10Days = new Date(args.onDate).setUTCDate(
        chosenDate.getUTCDate() - 20
      );

      const expiredBottles = await Order.find({
        arrived: {
          $lt: expiringWithin10Days,
          $gt: expiringArrivalDate,
        },
      });

      const bottleIdentifiers = expiredBottles.map((b) => b.id);

      const usedCount = await Vaccination.collection.countDocuments({
        vaccinationDate: {
          $lt: chosenDate,
        },
        sourceBottle: { $in: bottleIdentifiers },
      });

      let numberOfVaccines = expiredBottles.reduce(
        (a, b) => a + b.injections,
        0
      );

      return numberOfVaccines - usedCount;
    },
    vaccinesLeft: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      let expiringArrivalDate = new Date(args.onDate);
      expiringArrivalDate.setUTCDate(chosenDate.getUTCDate() - 30);

      const bottles = await Order.find({
        arrived: {
          $lte: chosenDate,
          $gt: expiringArrivalDate,
        },
      });

      console.log(chosenDate);
      console.log(expiringArrivalDate);

      const bottleIdentifiers = bottles.map((b) => b.id);

      const usedCount = await Vaccination.collection.countDocuments({
        vaccinationDate: {
          $lt: chosenDate,
        },
        sourceBottle: { $in: bottleIdentifiers },
      });

      let numberOfVaccines = bottles.reduce((a, b) => a + b.injections, 0);

      return numberOfVaccines - usedCount;
    },
  },
};

module.exports = resolvers;
