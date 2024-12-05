import React, {useEffect} from 'react'
import { Link, useLocation , useNavigate } from 'react-router-dom'

const Checkout = () => {

    const navigate = useNavigate(); 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    const { cardTitle, cardSkin, receiverDetails, senderDetails, amount } = location.state || {};  // Check if data exists

    if (!receiverDetails || !senderDetails) {
        return <p>Error: No data passed from the previous page.</p>;
    }


        // Handle Proceed to Checkout
        const handleProceedToPayment = (e) => {
            e.preventDefault();
                
            navigate('/payment/sdf', {
                    state: {
                        cardTitle,
                        cardSkin,
                        receiverDetails,
                        senderDetails,
                        amount
                    }
            }); 
        };



  return (
   
    <section className='checkout-detail'>
      
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
            <div className="goto_payment">
                    <button onClick={handleProceedToPayment} className="btn sm">
                        Proceed to Payment
                    </button>
            </div>
        </div>

    </section>

  )
}

export default Checkout