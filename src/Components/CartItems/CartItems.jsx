import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItem = ({ product, quantity, onRemove }) => (
  <div className="cartitems-format cartitems-format-main">
    <img src={product.image} alt={product.name} className='carticon-product-icon' />
    <p>{product.name}</p>
    <p>₹{product.new_price}</p>
    <button className='cartitems-quantity'>{quantity}</button>
    <p>₹{product.new_price * quantity}</p>
    <img
      className='cartitems-remove-icon'
      src={remove_icon}
      onClick={onRemove}
      alt="Remove item"
      aria-label={`Remove ${product.name} from cart`}
    />
  </div>
);

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  const renderCartItems = () => {
    return all_product.map((product) => {
      const quantity = cartItems[product.id];
      if (quantity > 0) {
        return (
          <div key={product.id}>
            <CartItem
              product={product}
              quantity={quantity}
              onRemove={() => removeFromCart(product.id)}
            />
            <hr />
          </div>
        );
      }
      return null;
    });
  };

  const cartTotal = getTotalCartAmount();

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {renderCartItems()}
      {all_product.length === 0 || Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>₹{cartTotal}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>₹{cartTotal}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
