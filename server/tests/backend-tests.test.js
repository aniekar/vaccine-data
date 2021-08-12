const { createTestClient } = require('apollo-server-testing');
const mongoose = require('mongoose');

const {
  connectToMongoDBAndInitializeData,
  createServer,
} = require('../server');

jest.setTimeout(90 * 10000);

describe('Backend tests', () => {
  let server;
  beforeAll(() => {
    server = createServer();
    return connectToMongoDBAndInitializeData();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  test('Total number of vaccinations should be 7000', async () => {
    const { query } = createTestClient(server);

    const GET_VACCINATION_COUNT = `
    {
        totalVaccinationCount
    }
    `;

    const response = await query({ query: GET_VACCINATION_COUNT });
    expect(response.data.totalVaccinationCount).toEqual(7000);
  });

  test('Total number of orders should be 5000', async () => {
    const { query } = createTestClient(server);

    const GET_ORDER_COUNT = `
    {
        totalOrderCount
    }
    `;

    const response = await query({ query: GET_ORDER_COUNT });
    expect(response.data.totalOrderCount).toEqual(5000);
  });

  test('Order count for 2021-03-20 should be 61', async () => {
    const { query } = createTestClient(server);

    const GET_ORDER_COUNT = `
    {
        orderCount(onDate: "2021-03-20")
    }
    `;

    const response = await query({ query: GET_ORDER_COUNT });
    expect(response.data.orderCount).toEqual(61);
  });
  test('Expired vaccines when counting from 2021-04-12T11:10:06.473587Z should be 12590', async () => {
    const { query } = createTestClient(server);

    const GET_EXPIRED_VACCINE_COUNT = `
    {
        vaccinesExpiredBeforeUsage(onDate: "2021-04-12T11:10:06.473587Z")
    }
    `;

    const response = await query({ query: GET_EXPIRED_VACCINE_COUNT });
    expect(response.data.vaccinesExpiredBeforeUsage).toEqual(12590);
  });
  test('On 2021-01-02 1 vaccination was done', async () => {
    const { query } = createTestClient(server);

    const GET_VACCINATION_COUNT_FOR_DATE = `
    {
        vaccinesUsed(onDate: "2021-01-02")
    }
    `;

    const response = await query({ query: GET_VACCINATION_COUNT_FOR_DATE });
    expect(response.data.vaccinesUsed).toEqual(1);
  });
  test('On 2021-04-11 256 vaccines arrived', async () => {
    const { query } = createTestClient(server);

    const GET_VACCINE_COUNT_FOR_DATE = `
    {
        vaccineCount(onDate: "2021-04-11")
    }
    `;

    const response = await query({ query: GET_VACCINE_COUNT_FOR_DATE });
    expect(response.data.vaccineCount).toEqual(256);
  });
  test('On 2021-04-11 70 Zerpfy vaccines arrived', async () => {
    const { query } = createTestClient(server);

    const GET_VACCINE_COUNT_FOR_DATE = `
    {
        vaccineCount(onDate: "2021-04-11", manufacturer: "Zerpfy")
    }
    `;

    const response = await query({ query: GET_VACCINE_COUNT_FOR_DATE });
    expect(response.data.vaccineCount).toEqual(70);
  });
  test('96 vaccines will expire within 10 days when counting from 2021-01-23', async () => {
    const { query } = createTestClient(server);

    const GET_VACCINES_EXPIRING_WITHIN_10_DAYS = `
    {
      vaccinesExpiringWithinTenDays(onDate: "2021-01-23")
    }
    `;

    const response = await query({
      query: GET_VACCINES_EXPIRING_WITHIN_10_DAYS,
    });
    expect(response.data.vaccinesExpiringWithinTenDays).toEqual(96);
  });
  test('16 Antiqua vaccines will expire within 10 days when counting from 2021-01-23', async () => {
    const { query } = createTestClient(server);

    const GET_VACCINES_EXPIRING_WITHIN_10_DAYS = `
    {
      vaccinesExpiringWithinTenDays(onDate: "2021-01-23", manufacturer: "Antiqua")
    }
    `;

    const response = await query({
      query: GET_VACCINES_EXPIRING_WITHIN_10_DAYS,
    });
    expect(response.data.vaccinesExpiringWithinTenDays).toEqual(16);
  });
});
