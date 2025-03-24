
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../productsSlice';
import { addToCart } from '../../cart/cartSlice';
import { truncateText } from '../../../utils/truncate';


const Products = () => {

    const {products,status,error} = useSelector((state)=>state.products)
    console.log(products);

    const dispatch = useDispatch()

    

    useEffect(()=>{
        if(status=="idle"){
        dispatch(fetchProducts())
        }
    },[dispatch, status])
    if(status==="loading"){
        return <p className='text-center'>Loading...</p>
    }
    if(status==="failed"){
        return <p>Error:{error}</p>
    }

   
    
   
    


  return (
    <>
    
<div className='container row mx-auto gap-3 justify-content-center'>
    {products && products.map((product)=>{
        return <>

        <div key={product.id} className="card tw:cursor-pointer tw:flex tw:flex-col" style={{width: "18rem"}}>
            

<img src={product.image} className="tw:w-[200px] tw:h-[200px] tw:object-cover tw:self-center" alt="..."/>
          
<div className="card-body tw:flex tw:flex-col tw:justify-between tw:h-auto">
 <h5 className="card-title">{truncateText(product.title, 50)}</h5>
 <p className="card-text">Price: {product.price}</p>
 <p className="card-text">Rating: {product.rating.rate}</p>
 <p className="card-text">{truncateText(product.description, 50)}</p>
 <button className="btn btn-primary" onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
</div>
</div>
        </>
    })}
</div>
    </>
  )
}

export default Products;