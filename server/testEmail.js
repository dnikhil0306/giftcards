const { sendGiftCardEmail } = require('./models/SendEmail');
require('dotenv').config();



// Debugging: Verify environment variables are loaded
console.log('Email:', process.env.EMAIL);
console.log('Password:', process.env.EMAIL_PASSWORD);

(async () => {
    try {
        await sendGiftCardEmail(
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                message: 'Happy Birthday!'
            },
            'ABC123',
            'Happy Birthday Gift Card',
            500,
            'ORDER12345',
            '2024-11-15',
            '14:30'
        );
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('Test email failed:', error);
    }
})();
