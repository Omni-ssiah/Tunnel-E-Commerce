import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
//function that handles the contents of the products.
export const Product = ({ product: {image, name, slug, price} }) => {

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img src= {urlFor(image && image [0])}
          width={250}
          height={250}
          className="product-image"
          />

          <p className='product-name'>
            {name}
          </p>
          <p className='product-price'>
            ₱{price}
          </p>
        </div>
      </Link>
    </div>
  )
}
export default Product