const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Order = require('../models/order');
const Vaccination = require('../models/vaccination');

async function clearData() {
  try {
    await mongoose.connection.dropCollection('orders');
    await mongoose.connection.dropCollection('vaccinations');
  } catch (e) {
    console.log(e);
  }
}

function formatJSON(data) {
  let formattedData = data.split(/\n/).join(',');
  formattedData = '[' + formattedData + ']';
  formattedData = formattedData.replace(',]', ']');
  let dataJSON = JSON.parse(formattedData);
  dataJSON.map((o) => {
    if (o.arrived) {
      o.arrived = o.arrived.substring(0, 10);
    }
  });
  return dataJSON;
}

async function loadData() {
  await clearData();
  const dataPath = path.normalize(__dirname + '/..' + '/data');

  try {
    const files = fs.readdirSync(dataPath).filter((f) => f.charAt(0) != '.');
    for (const file of files) {
      const filePath = path.join(dataPath + '/' + file);
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const formattedData = formatJSON(fileData);
      if (file == 'vaccinations.source') {
        await Vaccination.insertMany(formattedData);
      } else {
        await Order.insertMany(formattedData);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = loadData;
