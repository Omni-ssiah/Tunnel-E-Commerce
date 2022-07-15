import React from 'react'

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner} from '../components'; 

export const Home = ({ product, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Games of the Century</p>
      </div>

      <div className='products-container'>
        {product?.map((product) => <Product key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[1]}/>
    </>
  )
  
  
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const product = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { product, bannerData }
  }
}

export default Home
