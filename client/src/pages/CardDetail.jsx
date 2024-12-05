import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Replace useHistory with useNavigate
import { DUMMY_CARDS } from '../data';

import AmountInput from '../components/AmountInput';
import CardDetailHeader from '../components/CardDetailHeader';
import ReceiverDetails from '../components/ReceiverDetails';
import SenderDetails from '../components/SenderDetails';

const CardDetail = () => {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const { id } = useParams();
    const card = DUMMY_CARDS.find((card) => card.id === id);  // Find the card with the matching id

    const cardTitle = card.title;
    const cardSkin = card.thumbnail;
    const [amount, setAmount] = useState('');
    const [receiverDetails, setReceiverDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        message: ''
    });

    const [senderDetails, setSenderDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        message: '',
        phone: ''
    });

    const [generalError, setGeneralError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!card) {
        return <p>Card not found.</p>;
    }

    // Handle input changes for receiver and sender details
    const handleReceiverDetailChange = (e) => {
        const { name, value } = e.target;
        setReceiverDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
        validateForm(name, value, 'receiver');
    };

    const handleSenderDetailChange = (e) => {
        const { name, value } = e.target;
        setSenderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
        validateForm(name, value, 'sender');
    };

    // Form validation for fields
    const validateForm = (field, value, formType) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            const details = formType === 'receiver' ? receiverDetails : senderDetails;

            switch (field) {
                case 'firstName':
                    newErrors.firstName = value.trim() === '' ? 'First name is required' : '';
                    break;
                case 'lastName':
                    newErrors.lastName = value.trim() === '' ? 'Last name is required' : '';
                    break;
                case 'email':
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    newErrors.email = !emailPattern.test(value) ? 'Please enter a valid email' : '';
                    break;
                case 'phone':
                    newErrors.phone = value.trim() === '' ? 'Phone number is required' : '';
                    break;
                case 'confirmEmail':
                    newErrors.confirmEmail = value !== details.email ? 'Emails do not match' : '';
                    break;
                case 'message':
                    newErrors.message = value.length > 300 ? 'Message cannot exceed 300 characters' : '';
                    break;
                default:
                    break;
            }

            return newErrors;
        });
    };

    // Validate all fields before proceeding to checkout
    const validateAllFields = () => {
        let valid = true;
        const updatedErrors = { ...errors };

        // Validate receiver details
        for (const [key, value] of Object.entries(receiverDetails)) {
            if (key !== 'message' && value.trim() === '') {
                updatedErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                valid = false;
            } else {
                updatedErrors[key] = '';
            }
        }

        // Validate sender details
        for (const [key, value] of Object.entries(senderDetails)) {
            if (key === 'phone' && value.trim() === '') {
                updatedErrors[key] = 'Phone number is required';
                valid = false;
            } else if (key !== 'phone' && value.trim() === '') {
                updatedErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                valid = false;
            } else {
                updatedErrors[key] = '';
            }
        }

        // Validate confirm email
        if (receiverDetails.email !== receiverDetails.confirmEmail) {
            updatedErrors.confirmEmail = 'Emails do not match';
            valid = false;
        } else {
            updatedErrors.confirmEmail = '';
        }

        // Check if there are any errors
        setErrors(updatedErrors);

        // If no errors, return true
        return valid;
    };

    // Handle Proceed to Checkout
    const handleProceedToCheckout = (e) => {
        e.preventDefault();

        // Validate all fields before proceeding
        const isValid = validateAllFields();

        if (isValid) {
            // Redirect to checkout page if valid
            navigate('/payment/v1', {
                    state: {
                        cardTitle,
                        cardSkin,
                        receiverDetails,
                        senderDetails,
                        amount
                    }
            }); // use navigate instead of useHistory
        } else {
            // Show a general error message if validation fails
            setGeneralError('Please fill all fields correctly');
        }
    };

    return (
        <section className="card-detail">
            <div className="container card-detail__container">
                <CardDetailHeader card={card} />
                <AmountInput card={card} amount={amount} setAmount={setAmount} />
                <ReceiverDetails
                    receiverDetails={receiverDetails}
                    handleReceiverDetailChange={handleReceiverDetailChange}
                    errors={errors}
                />
                <SenderDetails
                    senderDetails={senderDetails}
                    handleSenderDetailChange={handleSenderDetailChange}
                    errors={errors}
                />

                {generalError && <p className="input__error-message">{generalError}</p>}

                <div className="goto_payment">
                    <button onClick={handleProceedToCheckout} className="btn sm">
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CardDetail;
