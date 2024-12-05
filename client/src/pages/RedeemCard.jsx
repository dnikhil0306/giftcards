
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Update with the correct path to your axiosInstance file

const RedeemCard = () => {
    const [cardCode, setCardCode] = useState('');
    const [message, setMessage] = useState('');
    const [message1, setMessage1] = useState('');
    const [cardDetails, setCardDetails] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    const handleRedeem = async () => {
        setMessage('');
        setCardDetails(null);

        if (!cardCode.trim()) {
            setMessage('Please enter a valid gift card code');
            setMessage1('');
            return;
        }

        try {
            const response = await axiosInstance.post('/redeem-giftcard', { cardCode });

            setCardDetails(response.data);
            setMessage1(response.data.message);
            setMessage('');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error);
                setMessage1('');
            } else {
                setMessage('An error occurred while redeeming the gift card');
                setMessage1('');
            }
        }
    };

    return (
        <section className="checkout-detail">
            <div>
                <div className="heading__container">
                    <p>Redeem your card here!</p>
                    <hr className="custom-hr" />
                </div>

                <div>
                    <form
                        className="receiver-details-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRedeem();
                        }}
                    >
                        <div className="input-container">
                            <label htmlFor="gift-card-code">Gift Card Code*</label>
                            <input
                                type="text"
                                id="gift-card-code"
                                value={cardCode}
                                onChange={(e) => setCardCode(e.target.value)}
                                placeholder="Gift Card Code"
                                required
                            />
                        </div>
                        <div className="goto_payment">
                            <button type="submit" className="btn sm">
                                Redeem
                            </button>
                        </div>
                    </form>

                    {message && <p className="message input__error-message">{message}</p>}
                    {message1 && <p className="message input__error-message1">{message1}</p>}
                    

                    {cardDetails && (
                        // <div className="card-details">
                        //     <p>Card Title: {cardDetails.cardTitle}</p>
                        //     <p>Amount Redeemed: ₹{cardDetails.amount}</p>
                        // </div>
                        // <section className='checkout-detail'>
                            <div className="card-details receiver__details">
                            <p>Card Title: {cardDetails.cardTitle}</p>
                            <p>Amount Redeemed: ₹{cardDetails.amount}</p>
                        </div>
                        // </section>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RedeemCard;
