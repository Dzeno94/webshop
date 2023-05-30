import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import  Button  from '../button/button.component.jsx';
import CartItem from '../cart-item/cart-item.component';
import {CartDropdownContainer,EmptyMessage,CartItems} from '../cart-dropdown/cart-dropdown.styles.jsx';



const CartDropdown = ()=>{
const {cartItems} = useContext(CartContext);
const navigate = useNavigate();

const goToCheckoutHendler = ()=>{
    navigate('/checkout')
}

return(
<CartDropdownContainer>
<CartItems>
    {cartItems.length > 0 ? cartItems.map((item)=><CartItem key={item.id} cartItem={item}/>) : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
    { console.log(cartItems.length > 0 )}
    { console.log(cartItems.length )}




</CartItems>
<Button onClick={goToCheckoutHendler}>GO TO CHECKOUT</Button>
</CartDropdownContainer>
);
}

export default CartDropdown;