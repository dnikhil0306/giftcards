import React, { useState } from 'react'
import CardItem from './CardItem'


import { DUMMY_CARDS } from '../data'

const Cards = () => {
    const [cards, setCards] = useState(DUMMY_CARDS)
  return (
    
    <section className="cards">
        { cards.length > 0 ? <div className="container cards__container">
        {
            cards.map(({id, thumbnail, category, title, price}) => 
            <CardItem key={id} cardID={id} thumbnail={thumbnail} category={category} title={title} price={price} />)
        } 
        </div> : <h2 className='center'>No Cards Found</h2> }
    </section>

  )
}

export default Cards

