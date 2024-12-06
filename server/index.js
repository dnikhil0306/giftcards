const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes')

const nodemailer = require('nodemailer');

const Razorpay =require('razorpay')

require('dotenv').config();

const app = express();


app.use(cors({
  origin: 'https://giftcards-client.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,
  optionsSuccessStatus: 200,  // This is to handle some older browsers
}), (req, res, next) => {
  console.log("CORS headers set for:", req.method, req.path);
  next();
});


// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(express.json());






console.log("Razorpay Credentials:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mYrxFk25VdC4K4",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "uyOzIcOcHea72b7Z0NOhYZ8S",
});


app.post('/api/orders/orders', async (req, res) => {
  console.log("Razorpay Credentials:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

  const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Ensure these values match your API Keys
      key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
      amount: parseInt(req.body.amount), // Convert amount to an integer
      currency: req.body.currency || "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
  };

  try {
      const response = await razorpay.orders.create(options);
      res.json({
          order_id: response.id,
          currency: response.currency,
          amount: response.amount,
      });
  } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).send("Internal server error");
  }
});

// Route: Fetch Razorpay Payment Details
app.get('/api/orders/payment/:paymentId', async (req, res) => {
  const { paymentId } = req.params;

  try {
      const payment = await razorpay.payments.fetch(paymentId);

      if (!payment) {
          return res.status(404).json("Payment not found");
      }

      res.json({
          status: payment.status,
          method: payment.method,
          amount: payment.amount,
          currency: payment.currency,
      });
  } catch (error) {
      console.error("Error fetching payment details:", error);
      res.status(500).json("Failed to fetch payment details");
  }
});









// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));



      app.use('/api/orders', orderRoutes);
    // app.use('/payment/sdf', paymentRoutes);



    
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


