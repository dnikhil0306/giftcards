// AmountInput.js
import React, { useState } from 'react';

const AmountInput = ({ card, amount, setAmount }) => {
    // const [amount, setAmount] = useState('');
    const [error, setError] = useState('');


    const handleAmountChange = (e) => {
        const value = e.target.value;
        if(value < 200 || value > 5000){
            setError("Amount must be between ₹200 and ₹5000.")
        }else{
            setError('')
        }
        setAmount(value);
    };

    const handlePresetAmount = (value) => {
        setAmount(value);
        setError('');
    };



    return (
        <div className='giftcard__details' >
            <div className='gift__type'>
                <p>eGift 📱</p>
            </div>

        {/* Amount Fields */}
            <div className='heading__container '>
                <p>Amount (<span>{card.price}</span>)</p>
                <hr class="custom-hr"/>
            </div>

            <div className='amount-container'>
                <label for="amount">₹</label>
                <input 
                    type="number" 
                    id="amount" 
                    name="amount" 
                    min="200" 
                    max="5000" 
                    value={amount} 
                    onChange={handleAmountChange} 
                    placeholder="Enter amount" 
                />
            </div>
            {error && <p className='input__error-message'>{error}</p>}

            <div className='amount-input-btn'>
                <button onClick={() => handlePresetAmount(250)}>₹250</button>
                <button onClick={() => handlePresetAmount(500)}>₹500</button>
                <button onClick={() => handlePresetAmount(1000)}>₹1000</button>
                <button onClick={() => handlePresetAmount(2000)}>₹2000</button>
                <button onClick={() => handlePresetAmount(3000)}>₹3000</button>
                <button onClick={() => handlePresetAmount(5000)}>₹5000</button>
            </div>
        </div>
    );
};

export default AmountInput;
