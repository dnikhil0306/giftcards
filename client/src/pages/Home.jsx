import React, {useEffect} from 'react'
import Cards from '../components/Cards'

const Home = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Cards/>
  )
}

export default Home