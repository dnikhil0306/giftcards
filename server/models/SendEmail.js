const nodemailer = require('nodemailer');

require('dotenv').config();

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider (e.g., 'gmail', 'hotmail')
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD // Your email password
    }
});

// Email sending function
const sendGiftCardEmail = async (receiverDetails, cardCode, cardTitle, amount, orderId, orderDate, orderTime) => {
    const { firstName, lastName, email, message } = receiverDetails;


    console.log('Received parameters:', {
        receiverDetails,
        cardCode,
        cardTitle,
        amount,
        orderId,
        orderDate,
        orderTime,
    });
    
    // Email content
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Your Gift Card: ${cardTitle}`,
        html: `
            <h2>Congratulations, ${firstName} ${lastName}!</h2>
            <p>You have received a gift card with the following details:</p>
            <ul>
                <li><strong>Card Title:</strong> ${cardTitle}</li>
                <li><strong>Card Code:</strong> ${cardCode}</li>
                <li><strong>Amount:</strong> ₹${amount}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Order Details:</p>
            <ul>
                <li><strong>Order ID:</strong> ${orderId}</li>
                <li><strong>Order Date:</strong> ${orderDate}</li>
                <li><strong>Order Time:</strong> ${orderTime}</li>
            </ul>
            <p>Enjoy your gift!</p>
        `
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error.message); // Log the error message
        console.error('Error stack trace:', error.stack); // Log stack trace for debugging
        throw error;
    }
};

module.exports = { sendGiftCardEmail };
