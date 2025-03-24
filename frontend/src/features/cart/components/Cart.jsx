import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { truncateText } from '../../../utils/truncate';
import { decreaseQuantity, increaseQuantity } from '../cartSlice';

const Cart = () => {
  const {items, totalPrice} = useSelector((state)=>state.cart);
  console.log(items,totalPrice);

  const dispatch = useDispatch();

  return (
    <>
    <h2>Cart</h2>
    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    <h3>Total Items:{items.length}</h3>
    <div className='container row mx-auto gap-3 justify-content-center'>
        {items && items?.map((product)=>{
            return <>
    
            <div key={product?.id} className="card tw:cursor-pointer tw:flex tw:flex-col" style={{width: "18rem"}}>
                
    
    <img src={product?.image} className="tw:w-[200px] tw:h-[200px] tw:object-cover tw:self-center" alt="..."/>
              
    <div className="card-body tw:flex tw:flex-col tw:justify-between tw:h-auto">
     <h5 className="card-title">{product?.title}</h5>
     <p className="card-text">Price: {product?.price}</p>
     <p className="card-text">Rating: {product?.rating?.rate}</p>
     {/* <p className="card-text">{truncateText(product.description, 50)}</p> */}
     <button onClick={()=>dispatch(increaseQuantity(product))} className='btn btn-outline-success'>+</button>
     <button className="btn btn-primary">Quantity: {product.quantity}</button>
     <button onClick={()=>dispatch(decreaseQuantity(product))} className='btn btn-outline-danger'>-</button>
    </div>
    </div>
            </>
        })}
    </div>
    
        </>
  )
}

export default Cart