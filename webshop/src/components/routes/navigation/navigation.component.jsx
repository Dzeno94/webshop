import {Outlet ,Link} from "react-router-dom";
import { Fragment,useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
 import { UserContext } from "../../../contexts/user.context"; 
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
 import { CartContext } from "../../../contexts/cart.context";
 import { NavigationContainer,NavLink,NavLinks,LogoContainer } from "./navigation.styles";

const Navigation = ()=>{
  const {currentUser}= useContext(UserContext);
   const {isCartOpen}= useContext(CartContext);

    return (
      <Fragment>
       <NavigationContainer>
            <LogoContainer to='/'>
         <div><CrwnLogo className="logo"></CrwnLogo></div>  
            
            </LogoContainer>
         <NavLinks>
    <NavLink to='/shop'>
    Shop
    </NavLink>
    {
      currentUser ? (
        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
      ):
   ( <NavLink to='/auth'>
    SIGN IN
    </NavLink>)
    }
    <CartIcon/>
         </NavLinks>  
        { isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;