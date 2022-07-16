import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

export const UpperBanner = ({ upperBanner }) => {
  return (
    <div className='upper-banner-container'>
        <div>
            <p className='Smalltext'>{upperBanner.smallText}</p>.
            <h3>{upperBanner.midText}</h3>
            <h1>{upperBanner.largeText1}</h1>
            <img src={urlFor(upperBanner.image)} alt="Image" className='upper-banner-image' />

            <div>
               
                <div className='desc'>
                    <h5>Description</h5>
                    <p>{upperBanner.desc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default UpperBanner
