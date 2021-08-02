const mongoose = require('mongoose');

const vaccinationSchema = mongoose.Schema({
  'vaccination-id': String,
  sourceBottle: String,
  gender: String,
  vaccinationDate: Date,
});

vaccinationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
