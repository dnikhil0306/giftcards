const express = require('express');
const Order = require('../models/OrderModel');
const Giftcard = require('../models/GiftcardCode')
const {sendGiftCardEmail} = require('../models/SendEmail')
const router = express.Router();
const Razorpay =require("razorpay")
require('dotenv').config();


// Route to save order details
router.post('/save-order', async (req, res) => {
    const { orderId, amount, receiverDetails, senderDetails, cardTitle, cardCode, orderDate, orderTime } = req.body;

    try {
        const newOrder = new Order({
            orderId,
            amount,
            receiverDetails,
            senderDetails,
            cardTitle,
            cardCode,
            orderDate,
            orderTime,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save order' });
    }
});


// Route to giftcard details
router.post('/save-giftcard', async (req, res) => {
    const {amount, cardTitle, cardCode, isRedeemed } = req.body;

    try { 
        const newGiftcard = new Giftcard({
            amount,
            cardTitle,
            cardCode,
            isRedeemed,
        });

        await newGiftcard.save();
        res.status(201).json({ message: 'Giftcard details saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save Giftcard details' });
    }
});


// Redeem Gift Card
router.post('/redeem-giftcard', async (req, res) => {
    const { cardCode } = req.body;

    try {
        const giftcard = await Giftcard.findOne({ cardCode });

        if (!giftcard) {
            return res.status(404).json({ error: 'Invalid gift card code' });
        }

        if (giftcard.isRedeemed) {
            return res.status(400).json({ error: 'This gift card is already redeemed' });
        }

        giftcard.isRedeemed = true;
        await giftcard.save();

        res.status(200).json({
            message: 'Gift card redeemed successfully',
            cardTitle: giftcard.cardTitle,
            amount: giftcard.amount,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to redeem the gift card' });
    }
});



router.post('/send-email', async (req, res) => {
    const { receiverDetails, cardCode, cardTitle, amount, orderId, orderDate, orderTime } = req.body;

    try {
        await sendGiftCardEmail(receiverDetails, cardCode, cardTitle, amount, orderId, orderDate, orderTime);
        console.log('OrderRoutes: ', receiverDetails, cardCode, cardTitle, amount, orderId, orderDate, orderTime)
        res.status(200).json({ message: 'Gift card email sent successfully!' });
    } catch (error) {
        console.error('Error in /send-email:', error); // Log detailed error
        res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
});



module.exports = router;
