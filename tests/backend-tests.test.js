const { createTestClient } = require('apollo-server-testing');
const mongoose = require('mongoose');

const { connectToMongoDBAndInitializeData, createServer } = require('../server');

jest.setTimeout(90 * 1000);

describe('Backend tests', () => {
  let server;
  beforeAll(() => {
    server = createServer();
    return connectToMongoDBAndInitializeData();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  test('Total number of orders should be 5000', async () => {
    const { query } = createTestClient(server);

    const GET_ORDERS = `
    {
        totalOrderCount
    }
    `;

    const response = await query({ query: GET_ORDERS });
    console.log(response);
    expect(response.data.totalOrderCount).toEqual(5000);
  });

  test('Order count for 2021-03-20 should be 61', async () => {
    const { query } = createTestClient(server);

    const GET_ORDERS = `
    {
        orderCount(onDate: "2021-03-20")
    }
    `;

    const response = await query({ query: GET_ORDERS });
    console.log(response);
    expect(response.data.orderCount).toEqual(61);
  });
});
