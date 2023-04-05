import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import  Button  from '../button/button.component.jsx';
import CartItem from '../cart-item/cart-item.component';
import '../cart-dropdown/cart-dropdown.styles.scss';



const CartDropdown = ()=>{
const {cartItems} = useContext(CartContext);
const navigate = useNavigate();

const goToCheckoutHendler = ()=>{
    navigate('/checkout')
}

return(
<div className='cart-dropdown-container'>
<div className='cart-items'>
{cartItems.map((item)=><CartItem key={item.id} cartItem={item}/>)}

</div>
<Button onClick={goToCheckoutHendler}>GO TO CHECKOUT</Button>
</div>
);
}

export default CartDropdown;