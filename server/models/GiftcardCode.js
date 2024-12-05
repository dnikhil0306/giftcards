const mongoose = require('mongoose');

const giftcardSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    cardTitle: { type: String, required: true },
    cardCode: { type: String, required: true },
    isRedeemed: { type: Boolean, required: true },

});

module.exports = mongoose.model('Giftcard', giftcardSchema);
