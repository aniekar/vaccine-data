const moment = require('moment');

const Order = require('../models/order');
const Vaccination = require('../models/vaccination');

const resolvers = {
  Query: {
    orderCount: async (root, args) => {
      let orders;
      if (args.manufacturer) {
        orders = await Order.collection.countDocuments({
          arrived: {
            $eq: new Date(args.onDate),
          },
          vaccine: args.manufacturer,
        });
      } else {
        orders = await Order.collection.countDocuments({
          arrived: {
            $eq: new Date(args.onDate),
          },
        });
      }
      return orders;
    },
  },
};

module.exports = resolvers;
