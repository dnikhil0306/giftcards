import React, {useEffect, useState} from 'react'
import { Link, useLocation , useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance';
import axios from 'axios';

const PaymentPage = () => {

  const navigate = useNavigate(); 
  const location = useLocation();
  const { cardTitle, cardSkin, receiverDetails, senderDetails, amount } = location.state || {};  // Check if data exists



//   const [responseId, setResponseId] = React.useState("");

  const [paymentStatus, setPaymentStatus] = useState(false); // Tracks payment processing messages
  const [showInvoice, setShowInvoice] = useState(false);  // Tracks when to show the order invoice
  const [orderId, setorderId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [cardCode, setCardCode] = useState('');



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);










  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
    })
  }

//   const createRazorpayOrder = (amount) => {
//     let data = JSON.stringify({
//       amount: amount * 100,
//       currency: "INR"
//     })

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:5000/api/orders/orders",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: data
//     }

//     axios.request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data))
//         handleRazorpayScreen(response.data.amount)
//       })
//       .catch((error) => {
//         console.log("error at", error)
//       })
//   }

const createRazorpayOrder = async (amount) => {
    try {
        // Create Razorpay order via backend API
        const response = await axiosInstance.post('/orders', {
            amount: amount * 100, // Convert to smallest unit (paise for INR)
            currency: "INR",
        });

        console.log('Order created:', response.data);
        handleRazorpayScreen(response.data);
    } catch (error) {
        console.error('Error creating Razorpay order:', error.response?.data || error.message);
    }
};


const handleRazorpayScreen = async (orderData) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const options = {
        key: 'rzp_test_mYrxFk25VdC4K4', // Replace with your Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Gift Cards",
        description: "Payment to Gift Cards",
        order_id: orderData.order_id, // Pass the Razorpay order ID
        handler: async function (response) {
            console.log('Payment successful:', response);
            setResponseId(response.razorpay_payment_id);
            generateOrderTime()
            setShowInvoice(true)
            await saveOrderDetails();
            // await saveGiftcardDetails();
        },
        prefill: {
            name: "Gift Cards",
            email: "fksait9038@gmail.com",
        },
        theme: {
            color: "#F4C430",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};















  const handlePayment = () => {
    // Set initial payment message
    generateOrderTime()
    setPaymentStatus('Processing payment...');
    
    // Simulate 3-second payment processing delay
    setTimeout( async () => {
        setPaymentStatus('Payment successful');
        // After another 3 seconds, replace payment details with the invoice
        setTimeout( async () => {
            setShowInvoice(true);
            // generateOrderId()
            // generateCardCode()
            
            await saveOrderDetails();
            
        }, 3000);
    }, 3000);
};

  const generateCardCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cardCode = '';
    for (let i = 0; i < 12; i++) {
        cardCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCardCode(cardCode)
    return cardCode;
};

const generateOrderId = () => {
  const characters = '0123456789';
  let orderId = '';
  for (let i = 0; i < 6; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  setorderId(orderId)
  return orderId;
};


  const generateOrderTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // e.g., "11/14/2024"
    const formattedTime = now.toLocaleTimeString(); // e.g., "10:34:56 AM"

            setOrderDate(formattedDate);
            setOrderTime(formattedTime);
  }




  const saveOrderDetails = async () => {

    const orderId0 = generateOrderId() || 'default-order-id';   
    const cardTitle0 = cardTitle || 'default-card-title';
    const amount0 = amount || 0;
    const receiverDetails0 = receiverDetails || { firstName: '', lastName: '', email: '', message: '' };
    const senderDetails0 = senderDetails || { firstName: '', lastName: '', email: '' };
    const cardCode0 = generateCardCode() || 'default-code';
    const orderDate0 = orderDate || new Date().toLocaleDateString();
    const orderTime0 = orderTime || new Date().toLocaleTimeString();
    const isRedeemed0 = false;



    const orderDetails = {
        orderId: orderId0,
        amount: amount0,
        receiverDetails: {
            firstName: receiverDetails0.firstName,
            lastName: receiverDetails0.lastName,
            email: receiverDetails0.email,
            message: receiverDetails0.message,
        },
        senderDetails: {
            firstName: senderDetails0.firstName,
            lastName: senderDetails0.lastName,
            email: senderDetails0.email,
        },
        cardTitle: cardTitle0,
        cardCode: cardCode0,
        orderDate: orderDate0,
        orderTime: orderTime0,
    };

    const giftcardDetails = {
        
        amount: amount0,
        cardTitle: cardTitle0,
        cardCode: cardCode0,
        isRedeemed: isRedeemed0,
    };

    try {
        const response = await axiosInstance.post('/save-order', orderDetails);
        const response1 = await axiosInstance.post('/save-giftcard', giftcardDetails);
        console.log(response.data.message); // "Order saved successfully!"
        console.log(response1.data.message); // "Order saved successfully!"
    } catch (error) {
        console.error('Error saving order:', error.response?.data?.error || error.message);
    }
  };



  const saveGiftcardDetails = async () => {

    const cardTitle1 = cardTitle || 'default-card-title';
    const amount1 = amount || 0;
    const cardCode1 = cardCode || 'default-code';
    const isRedeemed1 = false;

    const giftcardDetails = {
        
        amount: amount1,
        cardTitle: cardTitle1,
        cardCode: cardCode1,
        isRedeemed: isRedeemed1,
    }; 

    try {
        const response = await axiosInstance.post('/save-giftcard', giftcardDetails);
        console.log(response.data.message); // "Order saved successfully!"
    } catch (error) {
        console.error('Error saving order:', error.response?.data?.error || error.message);
    }
  };




  const sendGiftCardEmail = async () => {
    const emailDetails = {
        receiverDetails,
        cardCode,
        cardTitle,
        amount,
        orderId,
        orderDate,
        orderTime,
    };

    try {
        const response = await axiosInstance.post('/send-email', emailDetails);
        console.log(response.data.message); // Success message
    } catch (error) {
        console.error('Error sending gift card email:', error.response?.data?.error || error.message);
    }
};






  // Handle Proceed to Checkout
  const handleViewGiftCard = (e) => {
    e.preventDefault();

    // const cardCode = generateCardCode();
    sendGiftCardEmail();
    navigate('/gift-card/view', {
            state: {
                cardTitle,
                cardSkin,
                receiverDetails,
                senderDetails,
                amount,
                cardCode,
                orderId,
                orderDate,
                orderTime
            }
    });
};

  


  return (
    <section className='checkout-detail'>
      
        <div className="checkout-detail__header">
            {/* <h2 className='checkout-detail__title'>Payment Page</h2> */}
        </div>

        {/* checkout-page payment__details */}
        {/* <div className='checkout-page'>         
        <div className='payment__details'> */}
        {showInvoice ? (
               

      // <section className='checkout-detail'>
      
        <div>
          <div className="checkout-detail__header">
            <h2 className='checkout-detail__title'>eGift Order Receipt</h2>
        </div>


        <div className="receiver__details">
            
            

            <div>
            <div className='order-summary__details'>
                <p>Billing Name:</p>
                <p>{senderDetails.firstName} {senderDetails.lastName}</p>
            </div>
            
            <div className='order-summary__details'>
                <p>OrderId:</p>
                <p>#<span>{orderId}</span></p>
            </div>
            <div className='order-summary__details'>
                <p>R Id:</p>
                <p>#<span>{responseId}</span></p>
            </div>
            <div className='order-summary__details'>
                <p>Order Date:</p>
                <p>{orderDate}</p>
            </div>
            <div className='order-summary__details'>
                <p>Order Time:</p>
                <p>{orderTime}</p>
            </div>
            <div className='order-summary__details'>
                <p>Card:</p>
                <p>{cardTitle}</p>
            </div>
            <div className='order-summary__details'>
                <p>Amount Received</p>
                <p>₹<span>{amount}</span></p>
            </div>
            </div>

            <div className="goto_payment">
                <button onClick={handleViewGiftCard} className="btn sm">
                View Card Details            </button>
            </div>
        </div>
        </div>

        // </section>
                
                
            ) : (
            //   <div className='checkout-page'>
            //     <div className='payment__details'>
            //         <h2>Payment Gateway (Demo)</h2>
            //         {/* <div className='payment__input-container'>
            //             <label htmlFor="cardNumber">Card Number</label>
            //             <input type="text" id="cardNumber" placeholder="Enter your card number" />

            //             <label htmlFor="expiry">Expiry Date</label>
            //             <input type="text" id="expiry" placeholder="MM/YY" />

            //             <label htmlFor="cvv">CVV</label>
            //             <input type="text" id="cvv" placeholder="Enter CVV" />

            //             <label htmlFor="nameOnCard">Name on Card</label>
            //             <input type="text" id="nameOnCard" placeholder="Enter name as on card" />
            //         </div> */}


                    
            //         {/* <button onClick={handlePayment} className='pay-button'>Pay</button> */}
            //         {/* <button onClick={() => createRazorpayOrder(500)} className='pay-button'>Pay</button> */}
                    // <div>
                    //     <button onClick={() => createRazorpayOrder(amount)} className='pay-button '>Pay {amount}</button>
                    //     {responseId && <p>Payment Successful! Payment ID: {responseId}</p>}
                    // </div>
            //         {paymentStatus && <p className='payment-status-message'>{paymentStatus}</p>}
            //     </div>
            //     </div>
            
      
                    <div>
                        <div className="checkout-detail__header">
                        <h2 className='checkout-detail__title'>Review your cart</h2>
                    </div>
                    
                    <div className="receiver__details">
                    <hr class="custom-hr1"/>
                        <div>
                            <div className='order-summary__details'>
                                <p>Receiver Name:</p>
                                <p>{receiverDetails.firstName} {receiverDetails.lastName}</p>
                            </div>
                            <div className='order-summary__details'>
                                <p>Receiver E-mail:</p>
                                <p>{receiverDetails.email}</p>
                            </div>
                            <div className='order-summary__details'>
                                    <p>Card:</p>
                                    <p>{cardTitle}</p>
                            </div>
                        </div>
                        
                        <div className="checkout-detail__thumbnail">
                            <img src={cardSkin} alt=''/>
                        </div>

                        <div>
                            <p>Order Summary</p>
                            <div className='order-summary__details'>
                                <p>Card Value:</p>
                                <p>₹<span>{amount}</span></p>
                            </div>
                            <div className='order-summary__details'>
                                <p>Discount:</p>
                                <p>₹0</p>
                            </div>
                            <hr class="custom-hr1"/>
                            <div className='order-summary__details'>
                                <p>Order Total:</p>
                                <p>₹<span>{amount}</span></p>
                            </div>
                        </div>

                        {/* <div className='goto_payment'>
                            <Link to={'/payment/sdf'} className='btn sm'>Proceed to Payment</Link>
                        </div> */}
                        {/* <div className="goto_payment">
                                <button onClick={handleProceedToPayment} className="btn sm">
                                    Proceed to Payment
                                </button>
                        </div> */}
                        <div className='goto_payment'>
                            <button onClick={() => createRazorpayOrder(amount)} className='btn sm'>Proceed to Pay</button>
                            {responseId && <p>Payment Successful! Payment ID: {responseId}</p>}
                        </div>
                    </div>
                    </div>

                
            )}
        {/* </div>
        </div> */}
        
        

        
    </section>
  )
}

export default PaymentPage






