const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    id: String,
    healthCareDistrict: String, 
    orderNumber: Number, 
    responsiblePerson: String,
    injections: Number, 
    arrived: Date, 
    vaccine: String 
})

orderSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
