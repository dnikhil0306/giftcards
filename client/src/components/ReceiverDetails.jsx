import React from 'react';

const ReceiverDetails = ({ receiverDetails, handleReceiverDetailChange, errors }) => {
    return (
        <div>
            {/* Receiver details fields */}
            <div>
                <div className='heading__container'>
                    <p>Recipient Information</p>
                    <hr className="custom-hr" />
                </div>

                <div>
                    <form className="receiver-details-form">
                        <div className="first-last-name-container">
                            <div className="input-container">
                                <label htmlFor="first-name">First Name*</label>
                                <input
                                    type="text"
                                    id="receiver_first-name"
                                    name="firstName"
                                    value={receiverDetails.firstName}
                                    onChange={handleReceiverDetailChange}
                                    placeholder="Enter First Name"
                                    required
                                />
                                {errors.firstName && <p className="input__error-message">{errors.firstName}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="receiver_last-name">Last Name*</label>
                                <input
                                    type="text"
                                    id="receiver_last-name"
                                    name="lastName"
                                    value={receiverDetails.lastName}
                                    onChange={handleReceiverDetailChange}
                                    placeholder="Enter Last Name"
                                    required
                                />
                                {errors.lastName && <p className="input__error-message">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="input-container">
                            <label htmlFor="receiver_email">Email*</label>
                            <input
                                type="email"
                                id="receiver_email"
                                name="email"
                                value={receiverDetails.email}
                                onChange={handleReceiverDetailChange}
                                placeholder="Enter receiver's Email"
                                required
                            />
                            {errors.email && <p className="input__error-message">{errors.email}</p>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="confirm_receiver_email">Confirm Email*</label>
                            <input
                                type="email"
                                id="confirm_receiver_email"
                                name="confirmEmail"
                                value={receiverDetails.confirmEmail}
                                onChange={handleReceiverDetailChange}
                                placeholder="Confirm receiver's Email"
                                required
                            />
                            {errors.confirmEmail && <p className="input__error-message">{errors.confirmEmail}</p>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="message">Message (optional)</label>
                            <textarea
                                id="message"
                                name="message"
                                value={receiverDetails.message}
                                onChange={handleReceiverDetailChange}
                                placeholder="Enter your message (max 300 words)"
                                maxLength="300"
                            />
                            {errors.message && <p className="input__error-message">{errors.message}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReceiverDetails;
