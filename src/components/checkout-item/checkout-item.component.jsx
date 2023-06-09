import '../checkout-item/checkout-item.styles.scss';

const CheckoutItem = ({cartItem})=>{
const {name,imageUrl,price,qunatity} = cartItem;
return (
    <div className='checkout-item-container'>
        <div className='image-container'>
         <img src={imageUrl} alt={`${name}`}/>
        </div>
<span className='name'>{name}</span>
<span className='quantity'>{qunatity}</span>
<span className='price'>{price}</span>
<div className='remove-button'>&#10005;</div>
    </div>
)

}

export default CheckoutItem;