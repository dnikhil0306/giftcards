import React from 'react'
import {Link} from 'react-router-dom'

const CardItem = ({cardID, category, title, price, thumbnail}) => {
  return (
    <article className='card'>
      <div className="card__thumbnail">
        <img src={thumbnail} alt='title' />
      </div>

      <div className="card__content">
      
        <Link to={`/cards/${cardID}`}>
          <h3>{title}</h3>
        </Link>
        <p>{price}</p>
        <Link to={`/cards/categories/${category}`} className='card_category'>{category}</Link>

        <div className="card__footer">
        <Link to={`/cards/${cardID}`} className='btn sm'>Buy Now</Link>
        </div>
      </div>

    </article>
  )
}

export default CardItem;