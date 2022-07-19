import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();
//function that handles the context of the cart items and price of the cart and calculates the transaction that the client has made.

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    //upon clicking add to cart, it will add the item onto the cart
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductInCart) {
            
            //checks if product is already in the cart so that instead of duplicating the card, it justs adds another quantity
            const updatesCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatesCartItems);
        }
        else{
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart`)
    }


    // removes an item of the cart and revert back the changes made on the price and quantity
    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    // shows an increase and decrease button on the item, so that if the user wants to increase an item it may do so inside the cart
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);

        if(value === 'inc'){
            setCartItems([...cartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity + 1 }, ...cartItems.slice(index + 1) ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        }
        else if (value === 'dec'){ 
            if(foundProduct.quantity > 1){
                setCartItems([...cartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity - 1 }, ...cartItems.slice(index + 1) ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }

    // increase an item quantity on the [slug].js page
    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    // decrease an item quantity on the [slug].js page, with an added if statement so that it may not decrease into the negatives
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1
        });
    }

    // wraps the entire site with context provider and all the values inside it
    return(
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                toggleCartItemQuantity,
            }}
        >
            {children}
        </Context.Provider>
    )    
}

// allows to use the state as a hook
export const useStateContext = () => useContext(Context);