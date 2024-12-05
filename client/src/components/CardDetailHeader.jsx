import React from 'react'

const CardDetailHeader = ({card}) => {
  return (
    <div>
        <div className="card-detail__header">
            <h1 className='card-detail__title'>{card.title}</h1>
            <p>{card.category}</p>
        </div>

        <div className='card-detail__container1'>
        <div>
       
        <div className="card-detail__thumbnail">
          <img src={card.thumbnail} alt=''/>
        </div>
        </div>
        <p className='card-detail__about'>{card.about}</p>
        </div>
    </div>
  )
}

export default CardDetailHeader