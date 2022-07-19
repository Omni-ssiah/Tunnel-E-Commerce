import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlineShopping, AiOutlinePlus, AiOutlineLeft} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getstripe';

export const Cart = () => {
  //cart function for our project that handles the contents inside the cart
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();
//handle checkout function that handles the payment function of the project
    const handleCheckout = async () => {
      const stripe = await getStripe();
  
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });
  
      if(response.statusCode === 500) return;
      
      const data = await response.json();
  
      toast.loading('Redirecting...');
  
      stripe.redirectToCheckout({ sessionId: data.id });
    }
  
  //this shows the actual apperance of the cart function
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>

        {/* it mutates the showCart state into false */}
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>

        </button>

        {/* if the cart items are less than 1 than it shows "Your Cart is Empty" */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your Cart is Empty</h3>
            <Link href='/'>
              <button type='button' onClick={() => setShowCart(false)} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* if the cart has more than and equal to 1 item inside it, it must show the image, name, price, and quantity of the item */}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) =>  (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image"/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>₱{item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                  <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                          <AiOutlineMinus />
                        </span>
                        <span className='num' onClick="">
                          {item.quantity}
                        </span>
                        <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                          <AiOutlinePlus />
                        </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div> 
            ))}

        </div>

        {/* this shows the subtotal of all the items inside the cart */}
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal: </h3>
              <h3>₱{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>Pay Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Cart