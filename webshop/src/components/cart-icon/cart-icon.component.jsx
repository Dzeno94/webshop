import {CartItemContainer,ShoppingIcon,ItemCount} from'./cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () =>{
const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);
const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    

return(
    <CartItemContainer  onClick={toogleIsCartOpen}>
<ShoppingIcon />
<ItemCount>{cartCount}</ItemCount>
    </CartItemContainer>
)
}

export default CartIcon;