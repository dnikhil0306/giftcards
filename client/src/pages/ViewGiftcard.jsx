import React, {useEffect} from 'react'
import Thumbnail from '../images/Giftcard Thumbnail.png'
import { Link, useLocation } from 'react-router-dom'

const ViewGiftcard = () => {


    const location = useLocation();
    const { cardTitle, cardSkin, receiverDetails, senderDetails, amount, cardCode } = location.state || {};  // Check if data exists


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    
  return (
    <section className='checkout-detail'>
      
        <div className="checkout-detail__header">
            <h2 className='checkout-detail__title'>Giftcard delivered successfully.</h2>
        </div>


        <div className="receiver__details">
            <p>eGift Details</p>
            <div className="checkout-detail__thumbnail">
                <img src={cardSkin} alt=''/>
            </div>

            <div>
            <div className='order-summary__details'>
                <p>Receiver Name:</p>
                <p>{receiverDetails.firstName} {receiverDetails.lastname}</p>
            </div>
            
            <div className='order-summary__details'>
                <p>Receiver E-mail:</p>
                <p>{receiverDetails.email}</p>
            </div>
            <div className='order-summary__details'>
                <p>Card Brand:</p>
                <p>{cardTitle}</p>
            </div>
            <div className='order-summary__details'>
                <p>Card Code:</p>
                <p>{cardCode}</p>
            </div>
            </div>

            <div className='goto_payment'>
                <Link to={'/'} className='btn sm'>Shop more cards.</Link>
            </div>
        </div>

    </section>
  )
}

export default ViewGiftcard