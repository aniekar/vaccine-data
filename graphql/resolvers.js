const moment = require('moment');

const Order = require('../models/order');
const Vaccination = require('../models/vaccination');

const resolvers = {
  Query: {
    orderCount: async (root, args) => {
      const chosenDate = new Date(args.onDate);
      const nextDay = moment(chosenDate).add(1, 'days').toDate();

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
      const nextDay = moment(chosenDate).add(1, 'days').toDate();

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
      const nextDay = moment(chosenDate).add(1, 'days').toDate();

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
      const expiringArrivalDate = moment(chosenDate)
        .subtract(30, 'days')
        .toDate();
      const nextDay = moment(expiringArrivalDate).add(1, 'days').toDate();
      const expiredBottles = await Order.collection.countDocuments({
        arrived: {
          $gte: expiringArrivalDate,
          $lt: nextDay,
        },
      });
      return expiredBottles;
    },
  },
};

module.exports = resolvers;
