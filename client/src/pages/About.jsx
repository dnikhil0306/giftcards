import React, {useEffect} from 'react'

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="card-detail">
            <div className="container card-detail__container gap__1">
                <h3>About Us</h3>
                <hr class="custom-hr1"/>
                <p>Welcome to Gift Cards, your one-stop destination for the perfect gift!</p>
                <p>We believe that every occasion deserves a thoughtful gesture, and what better way to express your care than with the versatility of a gift card? Whether it’s a birthday, anniversary, holiday, or just a random act of kindness, our gift cards are designed to bring smiles and create lasting memories.</p>
                <p>At <b>Gift Cards</b>, we aim to make gifting simple, personalized, and hassle-free. Here’s what sets us apart:</p>
                <ul>
                    <li><b>Wide Variety of Options:</b> From retail and dining to travel and entertainment, our curated collection ensures you’ll find the perfect gift card for any occasion.</li>
                    <li><b>Instant Delivery:</b> Forgot to buy a gift? No worries! Our digital gift cards are delivered instantly to your loved one’s inbox.</li>
                    <li><b>Secure Payments:</b> Shop with confidence knowing that our payment process is quick, secure, and reliable.</li>
                </ul>
                <p>We’re passionate about making gifting meaningful and convenient. With our platform, you can skip the stress of searching for the perfect present and give the gift of choice, flexibility, and joy.</p>
                <p>Thank you for choosing <b>Gift Cards</b>. Let’s make every moment special together!</p>
            </div>
        </section>
  )
}

export default About