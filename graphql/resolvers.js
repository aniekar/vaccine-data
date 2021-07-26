const moment = require('moment');

const Order = require('../models/order');
const Vaccination = require('../models/vaccination');

const resolvers = {
  Query: {
    orderCount: async (root, args) => {
      let orderCount;
      if (args.manufacturer) {
        orderCount = await Order.collection.countDocuments({
          arrived: {
            $eq: new Date(args.onDate),
          },
          vaccine: args.manufacturer,
        });
      } else {
        orderCount = await Order.collection.countDocuments({
          arrived: {
            $eq: new Date(args.onDate),
          },
        });
      }
      return orderCount;
    },
    vaccineCount: async (root, args) => {
      let vaccines = await Order.find({
        arrived: {
          $eq: new Date(args.onDate),
        },
      });
      if (args.manufacturer) {
        vaccines = vaccines.filter((v) => v.vaccine === args.manufacturer);
      }
      const vaccineCount = vaccines.reduce((a, b) => a + b.injections, 0);
      return vaccineCount;
    },
  },
};

module.exports = resolvers;
