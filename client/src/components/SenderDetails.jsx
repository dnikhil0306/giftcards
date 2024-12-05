import React, { useState } from 'react';

const SenderDetails = ({ senderDetails, handleSenderDetailChange, errors }) => {
    return (
        <div>
            {/* Sender details fields */}
            <div>
                <div className='heading__container'>
                    <p>Your Information</p>
                    <hr className="custom-hr"/>
                </div>
                
                <div>
                    <form className="receiver-details-form">
                        <div className="first-last-name-container">
                            <div className="input-container">
                                <label htmlFor="sender_first-name">First Name*</label>
                                <input
                                    type="text"
                                    id="sender_first-name"
                                    name="firstName"  // Same name as in the state
                                    value={senderDetails.firstName}
                                    onChange={handleSenderDetailChange}
                                    placeholder="Enter First Name"
                                    required
                                />
                                {errors.firstName && <p className="input__error-message">{errors.firstName}</p>}
                            </div>
                            
                            <div className="input-container">
                                <label htmlFor="sender_last-name">Last Name*</label>
                                <input
                                    type="text"
                                    id="sender_last-name"
                                    name="lastName"  // Same name as in the state
                                    value={senderDetails.lastName}
                                    onChange={handleSenderDetailChange}
                                    placeholder="Enter Last Name"
                                    required
                                />
                                {errors.lastName && <p className="input__error-message">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="sender_email">Email*</label>
                            <input
                                type="email"
                                id="sender_email"
                                name="email"
                                value={senderDetails.email}
                                onChange={handleSenderDetailChange}
                                placeholder="Enter your Email"
                                required
                            />
                            {errors.email && <p className="input__error-message">{errors.email}</p>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="sender_phone">Phone*</label>
                            <input
                                type="number"
                                id="sender_phone"
                                name="phone"
                                value={senderDetails.phone}
                                onChange={handleSenderDetailChange}
                                placeholder="Enter your Phone Number"
                                required
                            />
                            {errors.phone && <p className="input__error-message">{errors.phone}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SenderDetails;
