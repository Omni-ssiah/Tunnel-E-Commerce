import React from 'react';
import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook, AiOutlineCopyrightCircle} from 'react-icons/ai';


export const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 JSM Headphones All Rights Reserved <AiOutlineCopyrightCircle/> </p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillFacebook />
      </p>
    </div>
  )
}
export default Footer
