import React from 'react'
import Banners from '../../components/Banners/Banners';
import Categories from '../../components/Categories/Categories';

const Home = () => {
  return (
    <div className='container pt-4'>
        <Banners />
        <Categories />
    </div>
  )
}

export default Home;