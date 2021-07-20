const mongoose = require('mongoose')

const vaccinationSchema = mongoose.Schema({
	vaccinationId: String,
	gender: String,
    sourceBottle: String,
	injected: Date
})

vaccinationSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Vaccination = mongoose.model('Vaccination', vaccinationSchema)

module.exports = Vaccination 
