const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    receiverDetails: {
        firstName: String,
        lastName: String,
        email: String,
        message: String,
    },
    senderDetails: {
        firstName: String,
        lastName: String,
        email: String,
    },
    cardTitle: { type: String, required: true },
    cardCode: { type: String, required: true },
    orderDate: { type: String, required: true },
    orderTime: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
